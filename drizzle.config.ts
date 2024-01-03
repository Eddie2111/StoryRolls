import { defineConfig } from 'drizzle-kit'
import type { Config } from "drizzle-kit";
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
export default ({
 schema: 'src/db/schema/Main-Schema.ts',
 out: 'src/db/models',
  driver: 'mysql2',
  dbCredentials: {
    uri: 'mysql://ytirf00jnd1e748pbugk:pscale_pw_8Ls3IdfWg3e4EQjUaWV4kkIF8fbNy8nCucCike1TA0p@aws.connect.psdb.cloud/main?ssl={"rejectUnauthorized":true}',
  },
  verbose: true,
  strict: true,
}) satisfies Config;