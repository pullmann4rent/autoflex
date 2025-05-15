import pool from "../db.server";

export const deleteCar = async (id: string) => {

  const t = await pool.connect();
  try {
    await t.query('BEGIN');

    await t.query('DELETE FROM cars_equipment WHERE car_id = $1;', [id]);

    await t.query('DELETE FROM cars_images WHERE car_id = $1;', [id]);

    await t.query('DELETE FROM cars WHERE id = $1;', [id]);

    await t.query('COMMIT');

    return true;
  } catch(e) {
    console.log(e);
    await t.query('ROLLBACK');
    throw e;
  } finally {
    t.release();
  }
}