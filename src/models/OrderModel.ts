import client from "../database";

export type Order = {
  id?: number;
  status: string;
  user_id: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM  orders`;
      const res = await conn.query(sql);

      const orders = res.rows;
      return orders;
    } catch (error) {
      throw new Error(`Couldn't get all orders . ${error}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM  orders WHERE id=${id}`;
      const res = await conn.query(sql);

      const order = res.rows[0];
      return order;
    } catch (error) {
      throw new Error(`Couldn't show an order . ${error}`);
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO orders ( status , user_id ) VALUES($1, $2 ) RETURNING *`;
      const res = await conn.query(sql, [o.status, o.user_id]);
      const order = res.rows[0];
      return order;
    } catch (error) {
      throw new Error(`Couldn't  create new order . ${error}`);
    }
  }

  // change the order status
  async change_status(id: number, status: string): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = `UPDATE orders SET status = $1 WHERE id = ${id} RETURNING *`;

      const res = await conn.query(sql, [status]);
      const order = res.rows[0];
      return order;
    } catch (error) {
      throw new Error(`Couldn't change status. ${error}`);
    }
  }

  // all orders by a user
  async user_orders(user_id: number): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM  orders WHERE user_id = $1`;
      const res = await conn.query(sql, [user_id]);
      const orders = res.rows;
      return orders;
    } catch (error) {
      throw new Error(`Couldn't get orders. ${error}`);
    }
  }

  // an order by specific user
  async order_per_user(user_id: number, order_id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM  orders WHERE user_id = $1 AND id = $2`;
      const res = await conn.query(sql, [user_id, order_id]);
      const order = res.rows[0];
      return order;
    } catch (error) {
      throw new Error(`Couldn't get orders. ${error}`);
    }
  }
}
