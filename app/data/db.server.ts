import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  host: 'aws-0-eu-central-1.pooler.supabase.com',
  user: 'postgres.vxbfpcytxnopnqkmiizo',
  database: 'postgres',
  password: 'Serverport123!!',
  ssl: { rejectUnauthorized: false },
  port: 5432,
  max: 15,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 20000,
});

export default pool;