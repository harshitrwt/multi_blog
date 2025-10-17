ALTER TABLE "posts" DROP CONSTRAINT "posts_category_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "post_categories" ALTER COLUMN "category_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "published" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" DROP COLUMN "category_id";