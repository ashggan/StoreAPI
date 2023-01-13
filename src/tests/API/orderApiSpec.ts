import supertest from "supertest";
import { Order } from "../../models/OrderModel";
import app from "../../server";

const request = supertest(app);
const index = "/orders"; // GET - authenticate
const show = "/orders/1"; // GET - authenticate
const change_status = "/orders/1"; // POST - authenticate
const order_per_user = "/users/1/orders/1"; // GET - authenticate
const user_orders = "/users/1/orders"; // GET - authenticate

const order: Order = {
  status: "completed",
  user_id: 1,
};

const status: string = "new";

describe("orders endpoint testing ", () => {
  it("GET /orders returns a list of orders", () => {
    request.get(index).expect(401);
  });

  it("GET /orders/:id show an order", () => {
    request.get(show).expect(401);
  });

  it("POST /orders/:id change the order status", () => {
    request.post(change_status).send(status).expect(401);
  });

  it("GET /users/:user_id/orders/:order_id show an order for specific user", () => {
    request.get(order_per_user).expect(401);
  });

  it("GET /users/:user_id/orders show all orders for specific user", () => {
    request.get(user_orders).expect(401);
  });
});
