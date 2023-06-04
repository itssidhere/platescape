import { Pool } from 'pg';

// Create a new Postgres connection pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'platescape',
    password: 'toor',
    port: 5432
});

export default pool;