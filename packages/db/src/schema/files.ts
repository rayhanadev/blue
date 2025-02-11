import { pgTable, integer, varchar, text, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { workspaces } from "./workspaces";

export const files = pgTable(
  "files",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    path: text("path").notNull(),
    remoteUrl: text("remote_url").notNull(),
    workspaceId: integer("workspace_id")
      .notNull()
      .references(() => workspaces.id),
  },
  (table) => ({
    workspaceIdx: index("workspace_idx").on(table.workspaceId),
  }),
);

export const filesRelations = relations(files, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [files.workspaceId],
    references: [workspaces.id],
  }),
}));
