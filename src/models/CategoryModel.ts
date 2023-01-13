import client from "../database";

export type Category = {
  id?: number;
  name: string;
};

export class CategoryStore {
  async index(): Promise<Category[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM  category`;
      const res = await conn.query(sql);
      const category = res.rows;
      return category;
    } catch (error) {
      throw new Error(`Couldn't get all Categorys . ${error}`);
    }
  }

  async show(id: number): Promise<Category> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM  category WHERE id=(${id})`;
      const res = await conn.query(sql);
      const category = res.rows[0];
      return category;
    } catch (error) {
      throw new Error(`Couldn't get all Categorys . ${error}`);
    }
  }

  async create(c: Category): Promise<Category> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO category ( name  ) VALUES($1) RETURNING *`;
      const res = await conn.query(sql, [c.name]);

      const Category = res.rows[0];
      return Category;
    } catch (error) {
      throw new Error(`Couldn't get all Categorys . ${error}`);
    }
  }

  async update(c: Category, id: number): Promise<Category> {
    try {
      const conn = await client.connect();
      const sql = `UPDATE category SET  name = $1    WHERE id = ${id}  RETURNING *`;
      const res = await conn.query(sql, [c.name]);
      const Category = res.rows[0];
      return Category;
    } catch (error) {
      throw new Error(`Couldn't update category with id ${id} . ${error}`);
    }
  }

  async delete(id: number): Promise<Category> {
    try {
      const conn = await client.connect();
      const sql = `DELETE FROM category WHERE id = ${id}  RETURNING *`;
      const res = await conn.query(sql);
      const Category = res.rows[0];
      return Category;
    } catch (error) {
      throw new Error(`Couldn't delete category with id ${id} . ${error}`);
    }
  }
}
