import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

function getSslConfig(): object | undefined {
  if (process.env.MYSQL_SSL !== "true") return undefined;

  // Option 1: base64-encoded cert in env var
  if (process.env.MYSQL_CA) {
    return { ca: Buffer.from(process.env.MYSQL_CA, "base64").toString() };
  }

  // Option 2: path to .pem file
  if (process.env.MYSQL_CA_PATH) {
    const caPath = path.resolve(process.cwd(), process.env.MYSQL_CA_PATH);
    if (fs.existsSync(caPath)) {
      return { ca: fs.readFileSync(caPath) };
    }
  }

  // Option 3: skip cert verification (less secure, works without .pem)
  return { rejectUnauthorized: false };
}

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "127.0.0.1",
  port: Number(process.env.MYSQL_PORT) || 3306,
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "grammar_police",
  ...(getSslConfig() ? { ssl: getSslConfig() } : {}),
  waitForConnections: true,
  connectionLimit: 3,
  queueLimit: 0,
});

export default pool;
