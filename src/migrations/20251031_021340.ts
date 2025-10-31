import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "trees" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"icon" varchar,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tree_segments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"tree_id" integer NOT NULL,
  	"parent_id" integer,
  	"order" numeric DEFAULT 0,
  	"description" varchar,
  	"details" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "trees_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "tree_segments_id" integer;
  ALTER TABLE "tree_segments" ADD CONSTRAINT "tree_segments_tree_id_trees_id_fk" FOREIGN KEY ("tree_id") REFERENCES "public"."trees"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tree_segments" ADD CONSTRAINT "tree_segments_parent_id_tree_segments_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tree_segments"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "trees_slug_idx" ON "trees" USING btree ("slug");
  CREATE INDEX "trees_updated_at_idx" ON "trees" USING btree ("updated_at");
  CREATE INDEX "trees_created_at_idx" ON "trees" USING btree ("created_at");
  CREATE UNIQUE INDEX "tree_segments_slug_idx" ON "tree_segments" USING btree ("slug");
  CREATE INDEX "tree_segments_tree_idx" ON "tree_segments" USING btree ("tree_id");
  CREATE INDEX "tree_segments_parent_idx" ON "tree_segments" USING btree ("parent_id");
  CREATE INDEX "tree_segments_updated_at_idx" ON "tree_segments" USING btree ("updated_at");
  CREATE INDEX "tree_segments_created_at_idx" ON "tree_segments" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_trees_fk" FOREIGN KEY ("trees_id") REFERENCES "public"."trees"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tree_segments_fk" FOREIGN KEY ("tree_segments_id") REFERENCES "public"."tree_segments"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_trees_id_idx" ON "payload_locked_documents_rels" USING btree ("trees_id");
  CREATE INDEX "payload_locked_documents_rels_tree_segments_id_idx" ON "payload_locked_documents_rels" USING btree ("tree_segments_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "trees" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tree_segments" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "trees" CASCADE;
  DROP TABLE "tree_segments" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_trees_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_tree_segments_fk";
  
  DROP INDEX "payload_locked_documents_rels_trees_id_idx";
  DROP INDEX "payload_locked_documents_rels_tree_segments_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "trees_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "tree_segments_id";`)
}
