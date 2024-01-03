import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { connect } from '@planetscale/database';

const connection = connect({
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  });

const db = drizzle(connection);