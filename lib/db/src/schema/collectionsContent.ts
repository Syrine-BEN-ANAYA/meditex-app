import { integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const collectionsContentTable = pgTable("collections_content", {
  id: varchar("id", { length: 100 }).primaryKey(),
  titleEn: text("title_en").notNull().default(""),
  titleAr: text("title_ar").notNull().default(""),
  subtitleEn: text("subtitle_en").notNull().default(""),
  subtitleAr: text("subtitle_ar").notNull().default(""),
  coverImage: text("cover_image"),
  displayOrder: integer("display_order").default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const productsContentTable = pgTable("products_content", {
  id: varchar("id", { length: 200 }).primaryKey(),
  collectionId: varchar("collection_id", { length: 100 }).notNull(),
  titleEn: text("title_en").notNull().default(""),
  titleAr: text("title_ar").notNull().default(""),
  descEn: text("desc_en").notNull().default(""),
  descAr: text("desc_ar").notNull().default(""),
  image: text("image"),
  displayOrder: integer("display_order").default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type CollectionContent = typeof collectionsContentTable.$inferSelect;
export type ProductContent = typeof productsContentTable.$inferSelect;
