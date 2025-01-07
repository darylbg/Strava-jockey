const db = require("./connection");
require("dotenv").config();

// run from server with db/migrate.js
const createTables = async () => {
  try {
    // Drop the tables if they exist (to ensure we recreate them)
    await db.query(`DROP TABLE IF EXISTS orders CASCADE;`);
    await db.query(`DROP TABLE IF EXISTS jockeys CASCADE;`);
    await db.query(`DROP TABLE IF EXISTS admins CASCADE;`);
    await db.query(`DROP TYPE IF EXISTS order_status_type;`);
    await db.query(`DROP TYPE IF EXISTS payment_status_type;`);
    await db.query(`DROP TYPE IF EXISTS role_type;`); // Drop role_type type

    console.log("Existing tables dropped successfully!");

    // Create order_status_type ENUM type
    await db.query(`
      CREATE TYPE order_status_type AS ENUM ('pending', 'complete', 'cancelled', 'shipped');
    `);

    // Create payment_status_type ENUM type
    await db.query(`
      CREATE TYPE payment_status_type AS ENUM ('pending', 'paid', 'refunded');
    `);

    // Create role_type ENUM type
    await db.query(`
      CREATE TYPE role_type AS ENUM ('jockey', 'admin');
    `);

    // Enable postgres UUID extension
    await db.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    // Create `jockeys` table
    await db.query(`
      CREATE TABLE IF NOT EXISTS jockeys (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        role role_type DEFAULT 'jockey', -- Set default role as 'jockey'
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create `orders` table
    await db.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        customer_email VARCHAR(255) NOT NULL,
        customer_name VARCHAR(255) NOT NULL,
        access_token UUID DEFAULT uuid_generate_v4(),
        order_status order_status_type DEFAULT 'pending', -- Default value 'pending'
        amount NUMERIC NOT NULL,
        payment_status payment_status_type DEFAULT 'pending', -- Default value 'pending'
        stripe_session_id TEXT,
        jockey_id INT,
        jockey_notes VARCHAR(500),
        distance NUMERIC(10, 2) NOT NULL,
        pace INTERVAL NOT NULL,
        start_anywhere BOOLEAN NOT NULL,
        start_postcode VARCHAR(255),
        customer_notes VARCHAR(500),
        gpx_file BYTEA,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        -- Foreign key constraint for jockey_id
        CONSTRAINT fk_jockey FOREIGN KEY (jockey_id) REFERENCES jockeys(id)
      );
    `);

    console.log("Tables created successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error creating tables:", err);
    process.exit(1);
  }
};

createTables();
