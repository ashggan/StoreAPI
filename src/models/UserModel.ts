import client from "../database";
import bcrypt from "bcrypt";

const { SALT_ROUNDS, BCRYPT_PASSWORD } = process.env;
export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM  users`;
      const res = await conn.query(sql);

      const users = res.rows;
      return users;
    } catch (error) {
      throw new Error(`Couldn't get all users . ${error}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM  users WHERE id=${id}`;
      const res = await conn.query(sql);

      const user = res.rows[0];
      return user;
    } catch (error) {
      throw new Error(`Couldn't get all user . ${error}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO users ( first_name , last_name ,password) VALUES($1, $2, $3 ) RETURNING *`;
      const hash = bcrypt.hashSync(
        u.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      );

      const res = await conn.query(sql, [u.first_name, u.last_name, hash]);

      const user = await res.rows[0];
      return user;
    } catch (error) {
      throw new Error(`Couldn't create  user . ${error}`);
    }
  }
}
