import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

import * as auth from "./schema/auth";
import * as contact from "./schema/contact";
import * as player from "./schema/player";
import * as post from "./schema/post";

export const schema = { ...auth, ...post, ...contact, ...player };

export { mySqlTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

const poolConnection = mysql.createPool(process.env.DATABASE_URL!);

export const db = drizzle(poolConnection);
