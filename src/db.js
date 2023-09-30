import {createPool} from 'mysql2/promise'
import 'dotenv/config'
import { configDotenv } from 'dotenv'

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: configDotenv.DATABASE_PASSWORD,
    port: 3306,
    database: 'companydb'
})