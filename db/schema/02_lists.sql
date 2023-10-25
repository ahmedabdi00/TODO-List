-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS lists CASCADE;
CREATE TABLE lists (
  id SERIAL PRIMARY KEY NOT NULL,
  content VARCHAR(255) NOT NULL,
  checked BOOLEAN NOT NULL DEFAULT false
);