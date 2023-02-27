if (!process.env.DATABASE_URL && process.env['apps.cloudtreasury.db']) {
  const databaseUrl = new URL(process.env['apps.cloudtreasury.db']);
  if (!databaseUrl.username) {
    databaseUrl.username = process.env['apps.cloudtreasury.db_user'];
  }
  if (!databaseUrl.password) {
    databaseUrl.password = process.env['apps.cloudtreasury.db_PASSWORD'];
  }
  process.env.DATABASE_URL = databaseUrl.toString();
}