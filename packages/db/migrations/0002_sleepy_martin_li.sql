CREATE TABLE "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "files" RENAME COLUMN "remoteUrl" TO "remote_url";--> statement-breakpoint
ALTER TABLE "files" RENAME COLUMN "workspaceId" TO "workspace_id";--> statement-breakpoint
ALTER TABLE "permissions" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "permissions" RENAME COLUMN "workspaceId" TO "workspace_id";--> statement-breakpoint
ALTER TABLE "user_to_workspaces" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "user_to_workspaces" RENAME COLUMN "workspaceId" TO "workspace_id";--> statement-breakpoint
ALTER TABLE "workspaces" RENAME COLUMN "ownerId" TO "owner_id";--> statement-breakpoint
ALTER TABLE "files" DROP CONSTRAINT "files_workspaceId_workspaces_id_fk";
--> statement-breakpoint
ALTER TABLE "permissions" DROP CONSTRAINT "permissions_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "permissions" DROP CONSTRAINT "permissions_workspaceId_workspaces_id_fk";
--> statement-breakpoint
ALTER TABLE "user_to_workspaces" DROP CONSTRAINT "user_to_workspaces_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "user_to_workspaces" DROP CONSTRAINT "user_to_workspaces_workspaceId_workspaces_id_fk";
--> statement-breakpoint
ALTER TABLE "workspaces" DROP CONSTRAINT "workspaces_ownerId_users_id_fk";
--> statement-breakpoint
DROP INDEX "workspace_idx";--> statement-breakpoint
DROP INDEX "owner_idx";--> statement-breakpoint
ALTER TABLE "permissions" DROP CONSTRAINT "permissions_userId_workspaceId_pk";--> statement-breakpoint
ALTER TABLE "user_to_workspaces" DROP CONSTRAINT "user_to_workspaces_userId_workspaceId_pk";--> statement-breakpoint
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_user_id_workspace_id_pk" PRIMARY KEY("user_id","workspace_id");--> statement-breakpoint
ALTER TABLE "user_to_workspaces" ADD CONSTRAINT "user_to_workspaces_user_id_workspace_id_pk" PRIMARY KEY("user_id","workspace_id");--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_to_workspaces" ADD CONSTRAINT "user_to_workspaces_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_to_workspaces" ADD CONSTRAINT "user_to_workspaces_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "workspace_idx" ON "files" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "owner_idx" ON "workspaces" USING btree ("owner_id");