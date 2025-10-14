import mysql from "mysql2/promise";

// Create a connection pool with SSL configuration
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
  // ADD THIS SSL CONFIGURATION
  ssl: {
    // This tells the connection to use SSL, but you don't need to provide a specific certificate
    // as modern hosts like Hostinger are usually covered by standard Certificate Authorities.
    rejectUnauthorized: true,
  },
});

export default pool;
