import client from "../database";
import { Order, OrderStore } from "../models/OrderModel";

const store = new OrderStore();

const addProductToOrder = async (
  product_id: number,
  user_id: number,
  quantity: number
): Promise<Order> => {
  try {
    const conn = await client.connect();
    // get the order id from orders by user id
    const orderSql = `SELECT * FROM orders WHERE user_id = $1`;
    const res = await conn.query(orderSql, [user_id]);
    const order = res.rows[0];

    // if user doesn't have open order
    // create new one
    if (!order) {
      let newOreder: Order = {
        user_id: user_id,
        status: "pending",
      };
      const order = await store.create(newOreder);
    }

    // add product to order.products;
    const sql = `INSERT INTO product_order (order_id, product_id , quantity) VALUES ($1, $2, $3)`;
    const resaults = await conn.query(sql, [order.id, product_id, quantity]);

    const addProduct = resaults.rows[0];
    return addProduct;
  } catch (error) {
    throw new Error(`Couldn't order product. ${error}`);
  }
};

// most popular products

// const getMostPopularProducts = async (user_id: number) => {
//   try {
//     const conn = await client.connect();
//     // get the order id from orders by user id
//     // SELECT product_name , price , quantity FROM product_order INNER JOIN products ON products.id = product_order.product_id ;
//   } catch {
//     throw new Error(`couldn't get products`);
//   }
// };

export default addProductToOrder;
