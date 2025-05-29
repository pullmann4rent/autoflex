import { ICar } from "~/components/CarBoxRenew/types";
import pool from "../db.server";

export const editCar = async ({
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
  fuel,
  firstregistration,
  ps,
  km,
  color,
  rate24,
  rate24_anzahlung,
  rate24_schlussrate,
  rate36,
  rate36_anzahlung,
  rate36_schlussrate,
  rate48,
  rate48_anzahlung,
  rate48_schlussrate,
  car_designation,
  equipment,
  consumption_image,
  description,
  environment,
  equipments,
  show,
  images
}: Omit<ICar, 'images'> & {
  images: string[];
}) => {
  const t = await pool.connect();
  console.log('HERREE');
  console.log(rate24);
 
  try {
    await t.query('BEGIN');

    if(cover !== '' && consumption_image !== '') {
      let v = await t.query(`
        UPDATE cars SET brand = $1, model = $2, cover = $3, video = $4, price = $5, tuv = $6, type = $7, sit_place = $8, firstregistration = $9, ps = $10, km = $11, color = $12, equipment = $13,
        description = $14, environment = $15, show = $16, fuel = $17, engine = $18, consumption_image = $19, rate24 = $20, rate24_anzahlung = $21, rate24_schlussrate = $22, rate36 = $23, rate36_anzahlung = $24, rate36_schlussrate = $25, rate48 = $25, rate48_anzahlung = $26, rate48_schlussrate = $27, car_designation = $28 WHERE id = $29;
      `, [brand, model, cover, video, price, tuv, type, sit_place, firstregistration, ps, km, color, equipment, description, environment, show, fuel, engine, consumption_image, rate24, rate24_anzahlung, rate24_schlussrate, rate36, rate36_anzahlung, rate36_schlussrate, rate48, rate48_anzahlung, rate48_schlussrate, car_designation,  id]);  
      console.log(v);
    } else if(cover === '' && consumption_image !== '') {
      let v = await t.query(`
        UPDATE cars SET brand = $1, model = $2, consumption_image = $3, video = $4, price = $5, tuv = $6, type = $7, sit_place = $8, firstregistration = $9, ps = $10, km = $11, color = $12, equipment = $13,
        description = $14, environment = $15, show = $16, fuel = $17, engine = $18, rate24 = $19, rate24_anzahlung = $20, rate24_schlussrate = $21, rate36 = $22, rate36_anzahlung = $23, rate36_schlussrate = $24, rate48 = $25, rate48_anzahlung = $26, rate48_schlussrate = $27, car_designation = $28 WHERE id = $29;
      `, [brand, model, consumption_image, video, price, tuv, type, sit_place, firstregistration, ps, km, color, equipment, description, environment, show, fuel, engine, rate24, rate24_anzahlung, rate24_schlussrate, rate36, rate36_anzahlung, rate36_schlussrate, rate48, rate48_anzahlung, rate48_schlussrate, car_designation, id]);  
      console.log(v);
    } else if(cover !== '' && consumption_image === '') {
      let v = await t.query(`
        UPDATE cars SET brand = $1, model = $2, cover = $3, video = $4, price = $5, tuv = $6, type = $7, sit_place = $8, firstregistration = $9, ps = $10, km = $11, color = $12, equipment = $13,
        description = $14, environment = $15, show = $16, fuel = $17, engine = $18, rate24 = $19, rate24_anzahlung = $20, rate24_schlussrate = $21, rate36 = $22, rate36_anzahlung = $23, rate36_schlussrate = $24, rate48 = $25, rate48_anzahlung = $26, rate48_schlussrate = $27, car_designation = $28 WHERE id = $29;
      `, [brand, model, cover, video, price, tuv, type, sit_place, firstregistration, ps, km, color, equipment, description, environment, show, fuel, engine, rate24, rate24_anzahlung, rate24_schlussrate, rate36, rate36_anzahlung, rate36_schlussrate, rate48, rate48_anzahlung, rate48_schlussrate, car_designation, id]);  
      console.log(v);
    } else {
      let b = await t.query(`
        UPDATE cars SET brand = $1, model = $2, video = $3, price = $4, tuv = $5, type = $6, sit_place = $7, firstregistration = $8, ps = $9, km = $10, color = $11, equipment = $12,
        description = $13, environment = $14, show = $15, fuel = $16, engine = $17, rate24 = $18, rate24_anzahlung = $19, rate24_schlussrate = $20, rate36 = $21, rate36_anzahlung = $22, rate36_schlussrate = $23, rate48 = $24, rate48_anzahlung = $25, rate48_schlussrate = $26, car_designation = $27  WHERE id = $28;
      `, [brand, model, video, price, tuv, type, sit_place, firstregistration, ps, km, color, equipment, description, environment, show, fuel, engine, rate24, rate24_anzahlung, rate24_schlussrate, rate36, rate36_anzahlung, rate36_schlussrate, rate48, rate48_anzahlung, rate48_schlussrate, car_designation, id]);
        console.log(b);
    }

    for(let i = 0; i < equipments.length; i++) {
      await t.query('DELETE FROM cars_equipment WHERE car_id = $1;', [id]);
    }

    if(equipments.length > 0) {
      for(let s = 0; s < equipments.length; s++) {
        await t.query('INSERT INTO cars_equipment (name, car_Id) VALUES ($1, $2);', [equipments[s], id]);
      }
    }

    await t.query('DELETE FROM cars_images WHERE car_id = $1;', [id]);

    for(let i = 0; i < images.length; i++) {
      await t.query('INSERT INTO cars_images (image, car_id) values ($1, $2);', [images[i], id]);
    }

    await t.query('COMMIT');
    return true;
  } catch(e) {
    console.log(e);
    await t.query('ROLLBACK')
    throw e;
  } finally {
    t.release();
  }
}