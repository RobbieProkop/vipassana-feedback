import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const testDbConnection = async (): Promise<string | boolean> => {
  let retries = 2;
  while (retries) {
    try {
      const now = await pool.query('SELECT NOW()');
      console.log('Database successfully connected');
      console.log('now :>> ', now.rows[0].now);
      return `Connected at: ${now.rows[0].now}`;

    } catch (error: unknown) {
      console.log('error: Database failed to connect :>> ', error);
      retries -= 1;
      console.log('retries left:>> ', retries);
      await new Promise<void>(res => setTimeout(res, 5000))
    }
  }
  return false;
}

export default pool;
