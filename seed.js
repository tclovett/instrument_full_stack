const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.POSTGRES_USER || 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.POSTGRES_DB || 'instrument',
    password: process.env.POSTGRES_PASSWORD || 'password',
    port: 5432
})

const create_users = `
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  age INT
);
`;
const create_instruments = `
CREATE TABLE instruments (
  id SERIAL PRIMARY KEY,
  type VARCHAR(255) NOT NULL,
  make VARCHAR(255) NOT NULL,
  model VARCHAR(255) NOT NULL,
  user_key INT
);
`;
client.query(create_users);
client.query(create_instruments);

const userQuery = `
INSERT INTO users (id, first_name, last_name, age) VALUES (1, 'John', 'Doe', 21)(2, 'John', 'Doe', 21)(3, 'John', 'Doe', 21)(4, 'John', 'Doe', 21)
(5, 'John', 'Doe', 21)(6, 'John', 'Doe', 21)(7, 'John', 'Doe', 21)(8, 'John', 'Doe', 21)(9, 'John', 'Doe', 21)(10, 'John', 'Doe', 21)
(11, 'John', 'Doe', 21)(12, 'John', 'Doe', 21)(13, 'John', 'Doe', 21)(14, 'John', 'Doe', 21)(15, 'John', 'Doe', 21);
`;
const instrumentQuery = `
INSERT INTO instruments (id, type, make, model, user_key) VALUES (1, 'tuba', 'miraphone', '2189', 1)(2, 'tuba', 'miraphone', '2189', 2)(3, 'tuba', 'miraphone', '2189', 2)
(4, 'tuba', 'miraphone', '2189', 3)(5, 'tuba', 'miraphone', '2189', 4)(6, 'tuba', 'miraphone', '2189', 4)(7, 'tuba', 'miraphone', '2189', 4)(8, 'tuba', 'miraphone', '2189', 5)
(9, 'tuba', 'miraphone', '2189', 6)(10, 'tuba', 'miraphone', '2189', 7)(11, 'tuba', 'miraphone', '2189', 8)(12, 'tuba', 'miraphone', '2189', 9)(13, 'tuba', 'miraphone', '2189', 9)
(14, 'tuba', 'miraphone', '2189', 1)(15, 'tuba', 'miraphone', '2189', 1);
`;

client.query(userQuery);
client.query(instrumentQuery);
client.end();