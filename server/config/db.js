// ------------------------------------------------------------------
//  MySQL connection pool
//  A pool keeps a few connections open so we do not open a new
//  connection for every single request. It is faster and safer.
// ------------------------------------------------------------------
const mysql = require('mysql2/promise');

// dotenv reads the .env file and gives us process.env
require('dotenv').config();

// createPool builds a group of reusable connections
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the connection once when the server starts, so a wrong
// password is reported immediately instead of failing silently later.
async function testConnection() {
  const connection = await pool.getConnection();
  console.log('MySQL connected to database:', process.env.DB_NAME);
  connection.release(); // give the connection back to the pool
}

module.exports = { pool, testConnection };
