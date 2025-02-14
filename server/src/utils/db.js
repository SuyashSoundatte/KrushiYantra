import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: {
    rejectUnauthorized: false
  }
});

const ConnectDB = async()=>{
  try {
    await pool.connect()
    console.log("DB Connected....");
  } catch (error) {
    console.log("DB Connection Failed Error: ", error);
    process.exit(1);
  }
}

export { ConnectDB, pool }