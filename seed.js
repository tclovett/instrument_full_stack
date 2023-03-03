const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.POSTGRES_USER || 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.POSTGRES_DB || 'instrument',
    password: process.env.POSTGRES_PASSWORD || 'password',
    port: 5432
})
client.connect();
const create_users = `
CREATE TABLE users (
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  age INT,
  user_key INT
);
`;
const create_instruments = `
CREATE TABLE instruments (
  type VARCHAR(255) NOT NULL,
  make VARCHAR(255) NOT NULL,
  model VARCHAR(255) NOT NULL,
  user_key INT
);
`;
client.query(create_users);
client.query(create_instruments);

const userQuery = `
INSERT INTO users (first_name, last_name, age, user_key) VALUES ('John', 'Doe', 21, 1)('John', 'Doe', 21, 2);
`;
const instrumentQuery = `
INSERT INTO instruments (type, make, model, user_key) VALUES (tuba', 'miraphone', '2189', 1)('tuba', 'miraphone', '2189', 2);
`;

client.query(userQuery);
client.query(instrumentQuery);
client.end();