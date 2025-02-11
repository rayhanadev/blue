import { pgTable, integer, varchar, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { workspaces } from "./workspaces";
import { users } from "./users";

export const permissions = pgTable(
  "permissions",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    workspaceId: integer("workspace_id")
      .notNull()
      .references(() => workspaces.id),
    bits: varchar("bits", {
      length: 3,
      enum: ["r", "rw", "rwx"],
    }).notNull(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.workspaceId] })],
);

export const permissionsRelations = relations(permissions, ({ one }) => ({
  user: one(users, {
    fields: [permissions.userId],
    references: [users.id],
  }),
  workspace: one(workspaces, {
    fields: [permissions.workspaceId],
    references: [workspaces.id],
  }),
}));
