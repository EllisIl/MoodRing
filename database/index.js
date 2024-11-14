import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

/* ***************
 * Connection Pool
 * SSL Object needed for local testing of app
 * But will cause problems in production environment
 * If - else will make determination which to use
 * *************** */
let pool;
if (process.env.NODE_ENV === "development") {
  pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  pool = new Pool({
    connectionString: process.env.DB_URL,
  });
}

// Export the query function and pool
export const query = async (text, params) => {
  try {
    const res = await pool.query(text, params);
    console.log("executed query", { text });
    return res;
  } catch (error) {
    console.error("error in query", { text, error });
    throw error;
  }
};

export { pool };
