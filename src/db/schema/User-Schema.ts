import { int, mysqlEnum, mysqlTable, uniqueIndex, varchar, serial, autoIncrement, json, unique } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('BlogUsers', {
    id: serial("id").primaryKey(),
    name: varchar('name', { length: 32 }).notNull(),
    email: varchar('email', { length: 35 }).notNull().unique(),
    password: varchar('password', { length: 128 }).notNull(),
    age: int('age'),
    profession: varchar('profession', { length: 32 })
});




