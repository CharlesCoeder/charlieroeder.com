import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_posts_hero_style" AS ENUM('minimal', 'featured');
  CREATE TYPE "public"."enum__posts_v_version_hero_style" AS ENUM('minimal', 'featured');
  ALTER TABLE "posts" ADD COLUMN "hero_style" "enum_posts_hero_style" DEFAULT 'minimal';
  ALTER TABLE "_posts_v" ADD COLUMN "version_hero_style" "enum__posts_v_version_hero_style" DEFAULT 'minimal';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" DROP COLUMN "hero_style";
  ALTER TABLE "_posts_v" DROP COLUMN "version_hero_style";
  DROP TYPE "public"."enum_posts_hero_style";
  DROP TYPE "public"."enum__posts_v_version_hero_style";`)
}
