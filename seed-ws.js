const { Pool, neonConfig } = require('@neondatabase/serverless');
const ws = require('ws');
const bcrypt = require('bcryptjs');

neonConfig.webSocketConstructor = ws;

async function main() {
  const connectionString = "postgresql://neondb_owner:npg_9wfjQnvs1Wig@ep-billowing-paper-b8ao6vkq.c-14.us-east-1.aws.neon.tech/neondb?sslmode=require";
  const pool = new Pool({ connectionString });
  
  try {
    const client = await pool.connect();
    const hash = await bcrypt.hash('Password123!', 10);
    
    // Check if user exists
    const res = await client.query('SELECT * FROM "User" WHERE email = $1', ['admin@nexus.com']);
    if (res.rows.length === 0) {
      await client.query('INSERT INTO "User" (email, "passwordHash", role, "isVerified") VALUES ($1, $2, $3, $4)', ['admin@nexus.com', hash, 'admin', true]);
      console.log('Admin account seeded to cloud via WS!');
    } else {
      console.log('Admin account already exists.');
    }
    client.release();
  } catch (e) {
    console.error("Error executing SQL:", e);
  } finally {
    await pool.end();
  }
}

main();
