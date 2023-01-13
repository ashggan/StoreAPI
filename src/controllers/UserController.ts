import { Request, Response, Application } from "express";
import { UserStore, User } from "../models/UserModel";
import jwt from "jsonwebtoken";
import authenticate from "../middlewares/auth";

const store = new UserStore();

const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.status(200).json(users);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await store.show(+id);
    res.status(200).json(user);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
    };
    const newUser = await store.create(user);
    const token = jwt.sign({ user: newUser }, <string>process.env.JWT_SECRET);
    res.status(201).json(token);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const users_route = (app: Application) => {
  app.get("/users", authenticate, index);
  app.get("/users/:id", authenticate, show);
  app.post("/users", create);
};

export default users_route;
