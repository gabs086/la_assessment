import { Pool } from 'pg';

import * as dotenv from 'dotenv';
dotenv.config();

const connection = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

export default connection;
