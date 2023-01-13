import supertest from "supertest";
import { User } from "../../models/UserModel";
import app from "../../server";

const request = supertest(app);
const index = "/users";
const create = "/users";
const show = "/users/1";
const user: User = {
  first_name: "Maya",
  last_name: "H",
  password: "secert",
};

describe("users endpoint testing ", () => {
  it("GET /users returns a list of users", () => {
    request.get(index).expect(200);
  });

  it("POST /users creates a new user", async () => {
    request.post(create).send(user).expect(201);
  });

  it("GET /users/:id show a user ", () => {
    request.get(show).expect(200);
  });
});
