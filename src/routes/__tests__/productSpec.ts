import supertest from "supertest";
import db from "../../database";
import ProductModel from "../../models/product.model";
import UserModel from "../../models/user.model";
import Product from "../../types/product.type";
import User from "../../types/user.type";
import app from "../../index";

const productModel = new ProductModel();
const userModel = new UserModel();
const request = supertest(app);
let token = "";

describe("Test Product API endpoints", () => {
  const user = {
    email: "testo@test.com",
    user_name: "TestUser",
    first_name: "Test",
    last_name: "User",
    password: "test123",
  } as User;

  const product = {
    name: "egg1",
    price: 3,
  } as Product;

  beforeAll(async () => {
    const createUser = await userModel.create(user);
    user.id = createUser.id;

    const createProduct = await productModel.create(product);
    product.id = createProduct.id;
  });
  afterAll(async () => {
    const connection = await db.connect();
    const sql = `DELETE FROM products;`;
    await connection.query(sql);

    const sql2 = `DELETE FROM users;`;
    await connection.query(sql2);

    connection.release();
  });

  describe("Test Authenticate method ", () => {
    it("should be able to authenticate to get token", async () => {
      const res = await request
        .post("/api/users/authenticate")
        .set("Content-type", "application/json")
        .send({
          email: "testo@test.com",
          password: "test123",
        });
      expect(res.status).toBe(200);
      const { id, email, token: userToken } = res.body.data;
      expect(id).toBe(user.id);
      expect(email).toBe("testo@test.com");
      token = userToken;
    });

    it("should be failed to authenticate whith wrong email", async () => {
      const res = await request
        .post("/api/users/authenticate")
        .set("Content-type", "application/json")
        .send({
          email: "wrong@test.com",
          password: "test123",
        });
      expect(res.status).toBe(404);
    });
  });

  describe("Test CRUD API method for Products", () => {
    it("should create new product", async () => {
      const res = await request
        .post("/api/products/Create/")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "fairouz",
          price: 6,
        } as Product);
      expect(res.status).toBe(200);
      const { name, price } = res.body.data;
      expect(name).toBe("fairouz");
      expect(price).toBe(6);
    });

    it("should get list of products", async () => {
      const res = await request
        .get("/api/products/Index/")
        .set("Content-type", "application/json");
      expect(res.status).toBe(200);

      expect(Object.keys(res.body.data).length).toBe(2);
    });

    it("should get product info ", async () => {
      const res = await request
        .get(`/api/products/Show/${product.id}`)
        .set("Content-type", "application/json");
      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe("egg1");
      expect(res.body.data.price).toBe(3);
    });
  });
});
