import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const testDbConnection = async () => {
  let retries = 1;
  while (retries) {
    try {
      await pool.query('SELECT NOW()');
      console.log('Database successfully connected');
      break
    } catch (error) {
      console.log('error: Database failed to connect :>> ', error);
      retries -= 1;
      console.log('retries left:>> ', retries);
      await new Promise(res => setTimeout(res, 5000))
    }
  }
}

export default pool;
