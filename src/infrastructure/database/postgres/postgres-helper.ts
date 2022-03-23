import { PropertiesGlobal } from '@/main/config/global'
import { variables } from '@/main/config/variables'

declare const global: PropertiesGlobal

export async function PostgresHelper() {
  const pathString: string = variables.postgresUrl

  if (global.connection)
      return global.connection.connect();

  const { Pool } = require('pg');
  const pool = new Pool({
      connectionString: pathString
  });

  const client = await pool.connect();

/*   const res = await client.query('SELECT NOW()');
  console.log(res.rows[0]); */
  client.release();

  global.connection = pool;
  return pool.connect();
}

module.exports = { PostgresHelper }
