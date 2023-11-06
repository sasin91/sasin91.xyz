import { sql } from "drizzle-orm";
import { int, timestamp, varchar } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";

export const player = mySqlTable("player", {
  id: varchar("id", { length: 255 }).unique().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  password: varchar("password", { length: 255 }),
  health: int("health").default(100),
  mana: int("mana").default(100),
  x: int("x").default(0),
  y: int("y").default(2),
  z: int("z").default(-1),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});
