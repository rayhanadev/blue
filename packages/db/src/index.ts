import { drizzle } from "drizzle-orm/bun-sql";
import { SQL } from "bun";

import { env } from "@repo/env";

import { files, filesRelations } from "./schema/files";
import { permissions, permissionsRelations } from "./schema/permissions";
import { sessions, sessionRelations } from "./schema/sessions";
import {
  userToWorkspaces,
  usersToWorkspacesRelations,
} from "./schema/user_to_workspaces";
import { users, usersRelations } from "./schema/users";
import { workspaces, workspacesRelations } from "./schema/workspaces";

export const schema = {
  files,
  filesRelations,
  permissions,
  permissionsRelations,
  sessions,
  sessionRelations,
  userToWorkspaces,
  usersToWorkspacesRelations,
  users,
  usersRelations,
  workspaces,
  workspacesRelations,
};

export const client = new SQL(env.DATABASE_URL);
export const db = drizzle({
  client,
  schema,
});
