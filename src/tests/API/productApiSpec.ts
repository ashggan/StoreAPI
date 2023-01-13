import supertest from "supertest";
import { Product } from "../../models/productsModel";
import app from "../../server";

const request = supertest(app);
const index = "/products"; // GET
const create = "/products"; // POST - authenticate
const show = "/products/1"; // GET
const showCategory = "/category/1/products"; // GET

const product: Product = {
  product_name: "IPhone 5",
  price: 540.99,
  category_id: 1,
};

describe("products endpoint testing ", () => {
  it("GET /users returns a list of users", () => {
    request.get(index).expect(200);
  });

  it("POST /products creates a new user [Unauthorized]", async () => {
    request.post(create).send(product).expect(401);
  });
  it("GET /products/:id show a user ", () => {
    request.get(show).expect(200);
  });

  it("GET /category/1/products show a list of prodcts by category ", () => {
    request.get(showCategory).expect(200);
  });
});
