import { QueryResult } from "pg";
import pool from "../db.server";

export const getBrands = async () => {
  try {
    const q = await pool.query('SELECT brand FROM car_abo GROUP BY brand;');

    let brands: string[] = [];

    q.rows.map((el => {
      brands.push(el.brand);
    }))
    return brands;
  } catch(e) {
    console.log(e);
    return e;
  }
}


export const getModels = async (brand: string) => {
  try {
    const q = await pool.query('SELECT model FROM car_abo WHERE brand = $1 GROUP BY model;', [brand]);

    let brands: string[] = [];

    q.rows.map((el => {
      brands.push(el.model);
    }));
    return brands;
  } catch(e) {
    console.log(e);
    return e;
  }
}