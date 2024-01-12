// import { int, mysqlEnum, mysqlTable, uniqueIndex, varchar, serial, autoIncrement, json, unique } from 'drizzle-orm/mysql-core';

// export const blogs = mysqlTable('BlogPosts', {
//     id: serial("id").primaryKey(),
//     title: varchar('name', { length: 128 }).notNull(),
//     body: varchar('body', { length: 8192 }).notNull(),
//     user: int('user').references(() => users, "id").notNull(),
// });

// export const BlogPostComments = mysqlTable('BlogPostComments', {
//     id: serial("id").primaryKey(),
//     user: int('user').references(() => users, "id").notNull(),
//     body: varchar('body', { length: 512 }).notNull(),
//     blog: int('blog').references(() => blogs, "id").notNull(),
//     replyTo: int('replyTo').references(() => BlogPostComments, "id"),
// });
