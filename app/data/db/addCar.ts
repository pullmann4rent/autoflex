import { ICar } from "~/components/CarBoxRenew/types";
import pool from "../db.server";

export const addCar = async ({
  id,
  brand,
  model,
  cover,
  video,
  price,
  tuv,
  type,
  sit_place,
  engine,
  car_designation,
  fuel,
  firstregistration,
  rate24,
  rate24_anzahlung,
  rate24_schlussrate,
  rate36,
  rate36_anzahlung,
  rate36_schlussrate,
  rate48,
  rate48_anzahlung,
  rate48_schlussrate,
  ps,
  km,
  color,
  equipment,
  description,
  environment,
  equipments,
  consumption_image,
  show,
  images
}: Omit<ICar, 'images'> & {
  images: string[];
}) => {
 
  const t = await pool.connect();
  try {
    await t.query('BEGIN');

    const id = await t.query(`
      INSERT INTO cars (brand, model, cover, video, price, tuv, type,
         sit_place, firstRegistration, ps, km, color, equipment, description, environment, show, fuel, 
         engine, consumption_image, car_designation, rate24, rate24_anzahlung, rate24_schlussrate, rate36, rate36_anzahlung, rate36_schlussrate,rate48, rate48_anzahlung, rate48_schlussrate)
      VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29) RETURNING ID;
    `, [brand, model, cover, video, price, tuv, type, sit_place, firstregistration, ps, km, color, equipment, description, environment, 
      show, fuel, engine, consumption_image, car_designation, rate24, rate24_anzahlung, rate24_schlussrate, rate36, rate36_anzahlung, rate36_schlussrate, rate48, rate48_anzahlung, rate48_schlussrate]);
console.log()
const uuid = id.rows[0].id;
    if(equipments.length > 0) {
      for(let s = 0; s < equipments.length; s++) {
        await t.query('INSERT INTO cars_equipment (name, car_id) VALUES ($1, $2);', [equipments[s], uuid]);
      }
    }

  
    if(images.length > 0) {
      for(let i = 0; i < images.length; i++) {
        await t.query('INSERT INTO cars_images (image, car_id) values ($1, $2)  ;', [images[i], uuid]);
      }
    }

    await t.query('COMMIT');
    return id;
    
  } catch(e) {
    await t.query('ROLLBACK')
    console.log(e);
    throw e;
  } finally {
    t.release();
  }
}