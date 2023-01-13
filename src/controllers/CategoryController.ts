import { Request, Response, Application } from "express";
import { CategoryStore } from "../models/CategoryModel";

const store = new CategoryStore();

const index = async (req: Request, res: Response) => {
  try {
    const categorys = await store.index();
    res.status(200).json(categorys);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const category = {
      name: req.body.name,
    };
    const NewCategory = await store.create(category);
    res.status(201).json(NewCategory);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const category = await store.show(+id);
    res.status(200).json(category);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const category = {
        name: req.body.name,
      },
      id = req.params.id;
    const updatedCategory = await store.update(category, +id);
    res.status(200).json(updatedCategory);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const category = await store.delete(+id);
    res.status(200).json(category);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const Category_route = (app: Application) => {
  app.get("/categories", index);
  app.get("/categories/:id", show);
  app.post("/categories", create);
  app.put("/categories/:id", update);
  app.delete("/categories/:id", remove);
};

export default Category_route;
