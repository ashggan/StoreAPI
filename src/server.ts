import express from "express";
import products_route from "./controllers/productsController";
import bodyParser from "body-parser";
import Category_route from "./controllers/CategoryController";
import users_route from "./controllers/UserController";
import orders_route from "./controllers/OrderContoller";
import routes from "./routes";

const app: express.Application = express();
const address: string = "0.0.0.0:3001";

// middleeware
app.use(bodyParser.json());

// route
products_route(app);
Category_route(app);
users_route(app);
orders_route(app);
routes(app);

// server listen on port 3000
app.listen(3001, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
