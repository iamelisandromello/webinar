export const variables = {
  port: process.env.PORT,
  mongoUrl: process.env.MONG_URL,
  postgresUrl: process.env.POSTGRES_URL ?? 'undefined',
  dbName: process.env.DB_NAME
}
