import { UserStore, User } from "../models/UserModel";
import { CategoryStore, Category } from "../models/CategoryModel";
import { ProductStore, Product } from "../models/productsModel";
import { OrderStore, Order } from "../models/OrderModel";

const category_store = new CategoryStore();
const user_store = new UserStore();
const product_store = new ProductStore();
const order_store = new OrderStore();
const user: User = {
  first_name: "Maya",
  last_name: "H",
  password: "secert",
};

describe("Create user and product Testing", () => {
  describe("User Model testing", () => {
    it("should return list of users to be defined", () => {
      expect(user_store.index).toBeDefined;
    });

    it("should create new User", async () => {
      expect(await user_store.create(user)).toBeDefined();
    });

    it("should show a user", async () => {
      expect(await user_store.show(1)).toBeDefined();
    });
  });

  describe("Category Model testing", () => {
    it("should return list of categories to be defined", () => {
      expect(category_store.index).toBeDefined;
    });

    it("should create new category", async () => {
      const category: Category = {
        name: "Electronic",
      };
      const NewItem = await category_store.create(category);
      expect(NewItem).toEqual({
        id: 1,
        name: "Electronic",
      });
    });

    it("should show a category", async () => {
      const category = await category_store.show(1);
      expect(category).toEqual({
        id: 1,
        name: "Electronic",
      });
    });
  });

  describe("Product Model testing", () => {
    it("index should be defined", () => {
      expect(product_store.index).toBeDefined;
    });

    it("should return list of Products", async () => {
      const products = await product_store.index();
      expect(products).toEqual([]);
    });

    it("should create new Product", async () => {
      const product: Product = {
        product_name: "IPhone 5",
        price: 540.99,
        category_id: 1,
      };
      const NewItem = await product_store.create(product);
      expect(NewItem).toEqual({
        id: 1,
        product_name: "IPhone 5",
        price: "540.99",
        category_id: 1,
      });
    });

    it("should show a product", async () => {
      const category = await product_store.show(1);
      expect(category).toEqual({
        id: 1,
        product_name: "IPhone 5",
        price: "540.99",
        category_id: 1,
      });
    });

    it("should show a list products by category", async () => {
      // const category = await product_store.products_by_category(1);
      expect(await product_store.products_by_category(1)).toBeDefined();
    });
  });
});

describe("Order Model testing", () => {
  // list of orders by a user
  it("should return list of orders", async () => {
    const orders = await order_store.index();
    expect(orders).toEqual([]);
  });
});
