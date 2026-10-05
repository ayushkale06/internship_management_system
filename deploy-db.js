const { Pool, neonConfig } = require('@neondatabase/serverless');
const ws = require('ws');
const fs = require('fs');

neonConfig.webSocketConstructor = ws;

async function main() {
  const connectionString = "postgresql://neondb_owner:npg_9wfjQnvs1Wig@ep-billowing-paper-b8ao6vkq.c-14.us-east-1.aws.neon.tech/neondb?sslmode=require";
  const pool = new Pool({ connectionString });
  
  try {
    const client = await pool.connect();
    const sql = fs.readFileSync('setup.sql', 'utf8');
    
    // Split by statement (;) and execute
    const statements = sql.split(';').map(s => s.trim()).filter(s => s.length > 0);
    
    for (const stmt of statements) {
      console.log("Executing:", stmt.substring(0, 50) + "...");
      await client.query(stmt);
    }
    
    console.log("SUCCESS! All database tables created on the cloud!");
    client.release();
  } catch (e) {
    console.error("Error executing SQL:", e);
  } finally {
    await pool.end();
  }
}

main();
