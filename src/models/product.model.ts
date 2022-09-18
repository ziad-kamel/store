import db from "../database";
import Product from "../types/product.type";

class ProductModel {
  async create(product: Product): Promise<Product> {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO products (name, price) values ($1, $2) returning id, name, price`;
      const result = await connection.query(sql, [product.name, product.price]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to create ${product.name}, ${(error as Error).message}`
      );
    }
  }
  async getMany(): Promise<Product[]> {
    try {
      const connection = await db.connect();
      const sql = `SELECT * FROM products`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Error at retriving Product ${(error as Error).message}`);
    }
  }
  async getOne(id: string): Promise<Product> {
    try {
      const connection = await db.connect();
      const sql = `SELECT * FROM products WHERE id=($1)`;
      const result = await connection.query(sql, [id]);
      connection.release;
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `could not find user ${id} , ${(error as Error).message}`
      );
    }
  }
}

export default ProductModel;
