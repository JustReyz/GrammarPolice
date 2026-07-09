import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "127.0.0.1",
  port: Number(process.env.MYSQL_PORT) || 3306,
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "grammar_police",
  ...(process.env.MYSQL_SSL === "true"
    ? {
        ssl: process.env.MYSQL_CA
          ? { ca: Buffer.from(process.env.MYSQL_CA, "base64").toString() }
          : { rejectUnauthorized: true },
      }
    : {}),
  waitForConnections: true,
  connectionLimit: 3,
  queueLimit: 0,
});

export default pool;
