CREATE TABLE IF NOT EXISTS product_order (
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    product_id INTEGER,
    order_id INTEGER,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (order_id) REFERENCES orders(id)
);