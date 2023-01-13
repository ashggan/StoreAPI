CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(120),
    user_id INTEGER UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);