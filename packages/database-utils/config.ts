export const dbConfigMysql = {
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root",
  password: "haosql",
  database: "test",
  port: 3306
};

export const dbConfigMssql = {
  user: "sa",
  password: "Junlian123",
  server: "192.168.1.4",
  database: "test2",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};
