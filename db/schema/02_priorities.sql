DROP TABLE IF EXISTS priorities CASCADE;
CREATE TABLE priorities (
  id SERIAL PRIMARY KEY NOT NULL,
  priority SMALLINT NOT NULL DEFAULT 0
);