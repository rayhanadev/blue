ALTER TABLE "permissions" ADD CONSTRAINT "permissions_userId_workspaceId_pk" PRIMARY KEY("userId","workspaceId");--> statement-breakpoint
ALTER TABLE "user_to_workspaces" ADD CONSTRAINT "user_to_workspaces_userId_workspaceId_pk" PRIMARY KEY("userId","workspaceId");--> statement-breakpoint
CREATE INDEX "workspace_idx" ON "files" USING btree ("workspaceId");--> statement-breakpoint
CREATE UNIQUE INDEX "username_idx" ON "users" USING btree ("username");--> statement-breakpoint
CREATE UNIQUE INDEX "code_idx" ON "workspaces" USING btree ("code");--> statement-breakpoint
CREATE INDEX "owner_idx" ON "workspaces" USING btree ("ownerId");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_username_unique" UNIQUE("username");--> statement-breakpoint
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_code_unique" UNIQUE("code");