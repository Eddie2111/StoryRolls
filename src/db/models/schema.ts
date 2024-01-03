import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, unique, int, varchar, mysqlEnum, datetime } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const user = mysqlTable("User", {
	id: int("id").autoincrement().notNull(),
	email: varchar("email", { length: 191 }).notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	nid: varchar("nid", { length: 191 }).notNull(),
	phone: varchar("phone", { length: 191 }).notNull(),
	gender: mysqlEnum("gender", ['MALE','FEMALE','OTHER']).notNull(),
	maritalStatus: mysqlEnum("maritalStatus", ['SINGLE','MARRIED','DIVORCED','WIDOWED']).notNull(),
	location: varchar("location", { length: 191 }).notNull(),
	password: varchar("password", { length: 191 }).notNull(),
	createdAt: datetime("createdAt", { mode: 'string', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
},
(table) => {
	return {
		userId: primaryKey({ columns: [table.id], name: "User_id"}),
		userEmailKey: unique("User_email_key").on(table.email),
		userNidKey: unique("User_nid_key").on(table.nid),
		userPhoneKey: unique("User_phone_key").on(table.phone),
	}
});