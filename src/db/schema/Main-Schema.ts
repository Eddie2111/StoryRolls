import { int, mysqlEnum, mysqlTable, uniqueIndex, varchar, serial, autoIncrement, json, unique, foreignKey } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('BlogUsers', {
    id: serial("id").primaryKey(),
    name: varchar('name', { length: 32 }).notNull(),
    email: varchar('email', { length: 35 }).notNull().unique(),
    password: varchar('password', { length: 128 }).notNull(),
    age: int('age'),
    profession: varchar('profession', { length: 32 })
});
export const questions = mysqlTable('BlogQuestions', {
    id: serial("id").primaryKey(),
    title: varchar('title', { length: 128 }).notNull(),
    body: varchar('body', { length: 512 }).notNull(),
});

export const comments = mysqlTable('BlogComments', {
    id: serial("id").primaryKey(),
    user: int('user').references(() => users, "id").notNull(),
    body: varchar('body', { length: 512 }).notNull(),
    question: int('question').references(() => questions, "id").notNull(),
});
export const followers = mysqlTable('BlogFollowers', {
    id: serial("id").primaryKey(),
    followee: int('followee').references(() => users, "id").notNull(),
    follower: int('follower').references(() => users, "id").notNull(),
});
export const blogs = mysqlTable('BlogPosts', {
    id: serial("id").primaryKey(),
    title: varchar('name', { length: 128 }).notNull(),
    body: varchar('body', { length: 8192 }).notNull(),
    user: int('user').references(() => users, "id").notNull(),
});

export const BlogPostComments = mysqlTable('BlogPostComments', {
    id: serial("id").primaryKey(),
    user: int('user').references(() => users, "id").notNull(),
    body: varchar('body', { length: 512 }).notNull(),
    blog: int('blog').references(() => blogs, "id").notNull(),
    replyTo: int('replyTo').references(() => BlogPostComments, "id"),
});




