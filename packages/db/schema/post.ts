import { sql } from "drizzle-orm";
import { int, timestamp, varchar } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";

export const post = mySqlTable("post", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("name", { length: 255 }).notNull(),
  content: varchar("content", { length: 255 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});
