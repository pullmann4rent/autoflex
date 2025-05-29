import pool from "../db.server";

export const getImages = async (car_id: string) => {
  try {
    const data = await pool.query('SELECT id, image from cars_images WHERE car_id = $1;', [car_id]);

    return data.rows;
  } catch(e) {
    console.log(e);
    throw e;
  }
}