CREATE TABLE if NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(120),
    last_name VARCHAR(120),
    password VARCHAR(200)
);