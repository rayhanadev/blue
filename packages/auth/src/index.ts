import { encodeBase32LowerCaseNoPadding } from "@oslojs/encoding";
import { eq, type InferSelectModel } from "drizzle-orm";

import { db, schema as s } from "@repo/db";
import { SHA256 } from "bun";

type User = InferSelectModel<typeof s.users>;
type Session = InferSelectModel<typeof s.sessions>;

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(
  token: string,
  userId: number,
): Promise<Session> {
  const hasher = new Bun.CryptoHasher("sha256");
  hasher.update(new TextEncoder().encode(token));
  const sessionId = hasher.digest("hex").toLowerCase();

  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };

  await db.insert(s.sessions).values(session);
  return session;
}

export async function validateSessionToken(
  token: string,
): Promise<SessionValidationResult> {
  const hasher = new Bun.CryptoHasher("sha256");
  hasher.update(new TextEncoder().encode(token));
  const sessionId = hasher.digest("hex").toLowerCase();

  const result = await db
    .select({ user: s.users, session: s.sessions })
    .from(s.sessions)
    .innerJoin(s.users, eq(s.sessions.userId, s.users.id))
    .where(eq(s.sessions.id, sessionId));

  if (result.length < 1) {
    return { session: null, user: null };
  }

  const { user, session } = result[0];

  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(s.sessions).where(eq(s.sessions.id, session.id));
    return { session: null, user: null };
  }

  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    await db
      .update(s.sessions)
      .set({
        expiresAt: session.expiresAt,
      })
      .where(eq(s.sessions.id, session.id));
  }

  return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(s.sessions).where(eq(s.sessions.id, sessionId));
}

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };
