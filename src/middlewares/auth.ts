import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

const authenticate = async (req: Request, res: Response, next: Function) => {
  try {
    const token = req.headers.authorization as string;
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    res.status(401);
    res.send("Invalid token ");
    return;
  }
};

export default authenticate;
