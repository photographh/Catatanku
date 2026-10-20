import mysql from "mysql2/promise";

let pool;
let ready;

function getPool() {
  if (!pool) {
    const ssl = process.env.DB_CA
      ? { ca: process.env.DB_CA.replace(/\\n/g, "\n") }
      : { rejectUnauthorized: false };

    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl,
      waitForConnections: true,
      connectionLimit: 2, // kecil aja, serverless + free tier Aiven jatah koneksinya dikit
    });
  }
  return pool;
}

export async function query(sql, params = []) {
  const p = getPool();

  if (!ready) {
    ready = p
      .query(
        `CREATE TABLE IF NOT EXISTS notes (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(150) NOT NULL,
          content TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`
      )
      .catch((err) => {
        ready = undefined;
        throw err;
      });
  }
  await ready;

  const [rows] = await p.query(sql, params);
  return rows;
}
