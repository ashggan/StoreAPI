CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(120),
    price DECIMAL,
    category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES category(id)
);