import { Pool } from 'pg';

// Create a single connection pool for the PostgreSQL database
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'internship_db',
  password: process.env.DB_PASSWORD || 'postgres',
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

// Helper to quickly execute queries
export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};

export default pool;
