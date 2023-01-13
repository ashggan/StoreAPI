import { Request, Response, Application } from "express";
import authenticate from "../middlewares/auth";
import { ProductStore, Product } from "../models/productsModel";

const store = new ProductStore();

const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.status(200).json(products);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await store.show(+id);
    res.status(200).json(product);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      product_name: req.body.product_name,
      price: req.body.price,
      category_id: req.body.category_id,
    };
    const NewProduct = await store.create(product);
    res.status(201).json(NewProduct);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const category_products = async (req: Request, res: Response) => {
  try {
    const category_id = req.params.category_id;
    const products = await store.products_by_category(+category_id);
    res.status(200).json(products);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const products_route = (app: Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", authenticate, create);
  app.get("/category/:category_id/products", category_products);
};

export default products_route;
