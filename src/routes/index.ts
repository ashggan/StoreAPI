import { Application, Request, Response } from "express";
import addProductToOrder from "../services/cart";

// const cart = new addProductToOrder()

// add product to cart
const addProduct = async (req: Request, res: Response) => {
  try {
    const product_id = req.params.product_id;
    const user_id = req.body.user_id;
    const quantity = req.body.quantity;

    const addedProduct = await addProductToOrder(
      +product_id,
      +user_id,
      +quantity
    );
    res.status(200).json(addedProduct);
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

const routes = (app: Application) => {
  app.post("/add-product/:product_id", addProduct);
};

export default routes;
