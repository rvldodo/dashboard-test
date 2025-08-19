import { bigserial, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const userSchema = pgTable("users", {
	id: bigserial({ mode: "bigint" }).notNull().primaryKey(),
	email: text().notNull(),
	password: text().notNull(),
	createdTime: timestamp("created_time", {
		withTimezone: true,
		mode: "string",
	})
		.notNull()
		.defaultNow(),
	updatedTime: timestamp("updated_time", {
		withTimezone: true,
		mode: "string",
	})
		.notNull()
		.defaultNow(),
});
