const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: "./.env.local" });

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

async function createAdmin() {
  const username = "user";
  const plainPassword = "Admin@12345"; // Use a strong password here

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(plainPassword, salt);

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    await connection.execute(
      "INSERT INTO users (username, password_hash) VALUES (?, ?)",
      [username, passwordHash]
    );
    console.log(`✅ Admin user '${username}' created successfully.`);
  } catch (error) {
    console.error("❌ Error creating admin user:", error.message);
  } finally {
    if (connection) await connection.end();
  }
}

createAdmin();
