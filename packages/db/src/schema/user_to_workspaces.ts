import { relations } from "drizzle-orm";
import { pgTable, integer, varchar, primaryKey } from "drizzle-orm/pg-core";

import { users } from "./users";
import { workspaces } from "./workspaces";

export const userToWorkspaces = pgTable(
  "user_to_workspaces",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    workspaceId: integer("workspace_id")
      .notNull()
      .references(() => workspaces.id),
  },
  (table) => [primaryKey({ columns: [table.userId, table.workspaceId] })],
);

export const usersToWorkspacesRelations = relations(
  userToWorkspaces,
  ({ one }) => ({
    user: one(users, {
      fields: [userToWorkspaces.userId],
      references: [users.id],
    }),
    workspace: one(workspaces, {
      fields: [userToWorkspaces.workspaceId],
      references: [workspaces.id],
    }),
  }),
);
