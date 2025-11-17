import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_hero_type" ADD VALUE 'homeHero';
  ALTER TYPE "public"."enum__pages_v_version_hero_type" ADD VALUE 'homeHero';
  CREATE TABLE "pages_blocks_recent_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Posts',
  	"limit" numeric DEFAULT 5,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_recent_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Posts',
  	"limit" numeric DEFAULT 5,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages" ADD COLUMN "hero_greeting_text" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_current_project_label" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_project_name" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_bio_paragraph1" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_bio_paragraph2" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_bio_paragraph3" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_greeting_text" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_current_project_label" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_project_name" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_bio_paragraph1" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_bio_paragraph2" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_bio_paragraph3" varchar;
  ALTER TABLE "pages_blocks_recent_posts" ADD CONSTRAINT "pages_blocks_recent_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_recent_posts" ADD CONSTRAINT "_pages_v_blocks_recent_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_recent_posts_order_idx" ON "pages_blocks_recent_posts" USING btree ("_order");
  CREATE INDEX "pages_blocks_recent_posts_parent_id_idx" ON "pages_blocks_recent_posts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_recent_posts_path_idx" ON "pages_blocks_recent_posts" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_recent_posts_order_idx" ON "_pages_v_blocks_recent_posts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_recent_posts_parent_id_idx" ON "_pages_v_blocks_recent_posts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_recent_posts_path_idx" ON "_pages_v_blocks_recent_posts" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_recent_posts" CASCADE;
  DROP TABLE "_pages_v_blocks_recent_posts" CASCADE;
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DATA TYPE text;
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DEFAULT 'lowImpact'::text;
  DROP TYPE "public"."enum_pages_hero_type";
  CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DEFAULT 'lowImpact'::"public"."enum_pages_hero_type";
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DATA TYPE "public"."enum_pages_hero_type" USING "hero_type"::"public"."enum_pages_hero_type";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DATA TYPE text;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DEFAULT 'lowImpact'::text;
  DROP TYPE "public"."enum__pages_v_version_hero_type";
  CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DEFAULT 'lowImpact'::"public"."enum__pages_v_version_hero_type";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DATA TYPE "public"."enum__pages_v_version_hero_type" USING "version_hero_type"::"public"."enum__pages_v_version_hero_type";
  ALTER TABLE "pages" DROP COLUMN "hero_greeting_text";
  ALTER TABLE "pages" DROP COLUMN "hero_current_project_label";
  ALTER TABLE "pages" DROP COLUMN "hero_project_name";
  ALTER TABLE "pages" DROP COLUMN "hero_bio_paragraph1";
  ALTER TABLE "pages" DROP COLUMN "hero_bio_paragraph2";
  ALTER TABLE "pages" DROP COLUMN "hero_bio_paragraph3";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_greeting_text";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_current_project_label";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_project_name";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_bio_paragraph1";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_bio_paragraph2";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_bio_paragraph3";`)
}
