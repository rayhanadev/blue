import { relations } from "drizzle-orm";
import { pgTable, integer, varchar, uniqueIndex } from "drizzle-orm/pg-core";

import { permissions } from "./permissions";
import { workspaces } from "./workspaces";
import { userToWorkspaces } from "./user_to_workspaces";
import { sessions } from "./sessions";

export const users = pgTable(
  "users",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    username: varchar("username").notNull().unique(),
  },
  (table) => ({
    usernameIdx: uniqueIndex("username_idx").on(table.username),
  }),
);

export const usersRelations = relations(users, ({ many }) => ({
  permissions: many(permissions),
  workspaces: many(workspaces),
  membership: many(userToWorkspaces),
  sessions: many(sessions),
}));
