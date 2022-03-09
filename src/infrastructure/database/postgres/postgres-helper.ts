import { PropertiesGlobal } from '@/main/config/global'

declare const global: PropertiesGlobal

export async function PostgresHelper() {
  if (global.connection)
      return global.connection.connect();

  const { Pool } = require('pg');
  const pool = new Pool({
      connectionString: 'postgres://citizix_user:S3cret@localhost:5432/postgres'
  });

  const client = await pool.connect();

/*   const res = await client.query('SELECT NOW()');
  console.log(res.rows[0]); */
  client.release();

  global.connection = pool;
  return pool.connect();
}

module.exports = { PostgresHelper }
