import pool from "../db.server";

export const getModels = async (brand: string) => {
  try {
    const q = await pool.query('SELECT model FROM cars WHERE brand = $1;', [brand]);

    let models: string[] = [];
    
    q.rows.map((el => {
      models.push(el.model);
    }))

    return models;
  } catch(e) {
    console.log(e);
    return e;
  }
}