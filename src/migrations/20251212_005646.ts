import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_posts_post_type" AS ENUM('post', 'stream');
  CREATE TYPE "public"."enum__posts_v_version_post_type" AS ENUM('post', 'stream');
  CREATE TABLE "pages_blocks_recent_content_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"posts_title" varchar DEFAULT 'Posts',
  	"streams_title" varchar DEFAULT 'Streams',
  	"posts_limit" numeric DEFAULT 5,
  	"streams_limit" numeric DEFAULT 5,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_recent_content_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"posts_title" varchar DEFAULT 'Posts',
  	"streams_title" varchar DEFAULT 'Streams',
  	"posts_limit" numeric DEFAULT 5,
  	"streams_limit" numeric DEFAULT 5,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "posts" ADD COLUMN "post_type" "enum_posts_post_type" DEFAULT 'post';
  ALTER TABLE "_posts_v" ADD COLUMN "version_post_type" "enum__posts_v_version_post_type" DEFAULT 'post';
  ALTER TABLE "pages_blocks_recent_content_grid" ADD CONSTRAINT "pages_blocks_recent_content_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_recent_content_grid" ADD CONSTRAINT "_pages_v_blocks_recent_content_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_recent_content_grid_order_idx" ON "pages_blocks_recent_content_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_recent_content_grid_parent_id_idx" ON "pages_blocks_recent_content_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_recent_content_grid_path_idx" ON "pages_blocks_recent_content_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_recent_content_grid_order_idx" ON "_pages_v_blocks_recent_content_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_recent_content_grid_parent_id_idx" ON "_pages_v_blocks_recent_content_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_recent_content_grid_path_idx" ON "_pages_v_blocks_recent_content_grid" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_recent_content_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_recent_content_grid" CASCADE;
  ALTER TABLE "posts" DROP COLUMN "post_type";
  ALTER TABLE "_posts_v" DROP COLUMN "version_post_type";
  DROP TYPE "public"."enum_posts_post_type";
  DROP TYPE "public"."enum__posts_v_version_post_type";`)
}
