import type { InferInsertModel, InferSelectModel} from "drizzle-orm";
import { sql } from "drizzle-orm";
import { int, text, timestamp, varchar } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";

export const contactRequest = mySqlTable("contactRequest", {
    id: int("id").primaryKey().autoincrement(),
    contactPerson: text("contactPerson"),
    companyName: text("companyName"),
    email: text("email"),
    phone: text("phone"),
    message: text('message'),
    readAt: timestamp("read_at"),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
});

export type ContactRequest = InferSelectModel<typeof contactRequest>
export type NewContactRequest = InferInsertModel<typeof contactRequest>