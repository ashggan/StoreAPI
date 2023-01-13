import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const {
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_DB_USER,
  POSTGRES_DB_HOST,
  POSTGRES_DB_PASSOWROD,
  ENV,
} = process.env;

let DB;
if (ENV === "test") {
  DB = POSTGRES_DB_TEST;
} else if (ENV === "dev") {
  DB = POSTGRES_DB;
}

console.log(DB);

const client = new Pool({
  database: DB,
  password: POSTGRES_DB_PASSOWROD,
  host: POSTGRES_DB_HOST,
  user: POSTGRES_DB_USER,
});

export default client;
