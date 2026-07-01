import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const siteContentTable = pgTable("site_content", {
  key: varchar("key", { length: 255 }).primaryKey(),
  valueEn: text("value_en").notNull().default(""),
  valueAr: text("value_ar").notNull().default(""),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type SiteContent = typeof siteContentTable.$inferSelect;
export type InsertSiteContent = typeof siteContentTable.$inferInsert;
