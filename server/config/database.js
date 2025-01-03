import pg from "pg";
import "./dotenv.js";
const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  ssl: {
    rejectUnauthorized: false, // Allow connection even if the certificate is not trusted
  },
};

export const pool = new pg.Pool(config);
