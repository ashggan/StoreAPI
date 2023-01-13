import client from "../database";

export type Product = {
  id?: number;
  product_name: string;
  price: number | string;
  category_id?: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM  products`;
      const res = await conn.query(sql);

      const products = res.rows;
      return products;
    } catch (error) {
      throw new Error(`Couldn't get all products . ${error}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM  products WHERE id=${id}`;
      const res = await conn.query(sql);

      const product = res.rows[0];
      return product;
    } catch (error) {
      throw new Error(`Couldn't get all products . ${error}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO products ( price , product_name ,category_id) VALUES($1, $2, $3 ) RETURNING *`;
      const res = await conn.query(sql, [
        p.price,
        p.product_name,
        p.category_id,
      ]);

      const product = res.rows[0];
      return product;
    } catch (error) {
      throw new Error(`Couldn't get all products . ${error}`);
    }
  }

  async products_by_category(category_id: number): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM products WHERE category_id = ${category_id}`;
      const res = await conn.query(sql);
      const products = res.rows;
      return products;
    } catch (error) {
      throw new Error(`caould find products in this category.${error}`);
    }
  }
  // SELECT product_name , price , quantity , COUNT(DISTINCT  product_id ) FROM product_order INNER JOIN products ON products.id = product_order.product_id  GROUP BY product_id ORDER BY product_id DESC LIMIT 5 ;
  // the product with the most orders accounts
  async popular_products(): Promise<Product[]> {
    {
      try {
        const conn = await client.connect();
        const sql = `SELECT * FROM products ORDER BY price DESC LIMIT 10`;

        const res = await conn.query(sql);
        const products = res.rows;
        return products;
      } catch (error) {
        throw new Error(`Couldn't get all products. ${error}`);
      }
    }
  }
}
