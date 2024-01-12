// import { int, mysqlEnum, mysqlTable, uniqueIndex, varchar, serial, autoIncrement, json, unique } from 'drizzle-orm/mysql-core';

// export const questions = mysqlTable('BlogQuestions', {
//     id: serial("id").primaryKey(),
//     title: varchar('title', { length: 128 }).notNull(),
//     body: varchar('body', { length: 512 }).notNull(),
// });

// export const comments = mysqlTable('BlogComments', {
//     id: serial("id").primaryKey(),
//     user: int('user').references(() => users, "id").notNull(),
//     body: varchar('body', { length: 512 }).notNull(),
//     question: int('question').references(() => questions, "id").notNull(),
// });



