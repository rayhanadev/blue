import {
  pgTable,
  integer,
  varchar,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { files } from "./files";
import { permissions } from "./permissions";
import { userToWorkspaces } from "./user_to_workspaces";
import { users } from "./users";

export const workspaces = pgTable(
  "workspaces",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    language: varchar("language").notNull(),
    name: varchar("name").notNull(),
    code: varchar("code").notNull().unique(),
    ownerId: integer("owner_id")
      .notNull()
      .references(() => users.id),
  },
  (table) => ({
    codeIdx: uniqueIndex("code_idx").on(table.code),
    ownerIdx: index("owner_idx").on(table.ownerId),
  }),
);

export const workspacesRelations = relations(workspaces, ({ one, many }) => ({
  owner: one(users, {
    fields: [workspaces.ownerId],
    references: [users.id],
    relationName: "owner",
  }),
  members: many(userToWorkspaces),
  files: many(files),
  permissions: many(permissions),
}));
