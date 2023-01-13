import { Request, Response, Application } from "express";
import authenticate from "../middlewares/auth";
import { OrderStore, Order } from "../models/OrderModel";

const store = new OrderStore();

const index = async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.status(200).json(orders);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const order = await store.show(+id);
    res.status(200).json(order);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const change_status = async (req: Request, res: Response) => {
  try {
    const status = req.body.status;
    const id = req.params.id;
    const order = await store.change_status(+id, status);
    res.status(200).json(order);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const user_orders = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.user_id;
    const orders = await store.user_orders(+user_id);
    res.status(200).json(orders);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const order_per_user = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.user_id;
    const order_id = req.params.order_id;
    // console.log(req.params);
    const order = await store.order_per_user(+user_id, +order_id);
    res.status(200).json(order);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const orders_route = (app: Application) => {
  app.get("/orders", authenticate, index);
  app.get("/orders/:id", authenticate, show);
  app.post("/orders/:id", authenticate, change_status);

  app.get("/users/:user_id/orders/:order_id", authenticate, order_per_user);
  app.get("/users/:user_id/orders", authenticate, user_orders);
};

export default orders_route;
