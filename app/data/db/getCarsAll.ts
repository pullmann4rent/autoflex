import { QueryResult } from "pg";
import pool from "../db.server";

export const getCarsAll = async () => {
  try {
    const q = await pool.query('SELECT id, brand, model FROM cars LIMIT 2500;');

    return q.rows;
  } catch(e) {
    console.log(e);
    return e;
  }
}