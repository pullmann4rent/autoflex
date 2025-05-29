import { Footer } from "~/components/Footer/Footer";
import { Header } from "~/components/Header/Header";
import '../styles/index.css';
import '../styles/dashboard.css';
import '../styles/cars.css';
import { useEffect, useState } from "react";
import ModalAddCar from "~/components/Modal/ModalAddCar/ModalAddCar";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import pool from "~/data/db.server";
import { useActionData, useLoaderData, useRevalidator, useSearchParams } from "@remix-run/react";
import { ICarNewImg } from "~/components/Modal/ModalAddCar/types";
import RemoveIcon from "~/components/RemoveIcon/RemoveIcon";
import ModalDeleteCar from "~/components/Modal/ModalDeleteCar/ModalDeleteCar";
import { deleteCar } from "~/data/db/deleteCar";
import { CarBoxSmall2 } from "~/components/CarBoxSmall2/CarBoxSmall2";
import _ from "lodash";
import { SignIn } from "@clerk/remix";
import { login, requireUserSession } from "~/data/auth.server";
import AuthForm from "~/components/AuthForm/AuthForm";

export default function Dashboard() {
  const revalidate = useRevalidator();
  const {
    cars,
    logged
  }: { cars: ICarNewImg[]; logged: string | boolean } = useLoaderData<typeof loader>();
  const actionData = useActionData();
  const [carId, setCarId] = useState<string | null>(null);
  const [currentCar, setCurrentCar] = useState<ICarNewImg | null>(null);
  const [openModalAddCar, setOpenModalAddCar] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [t, setT] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const params = new URLSearchParams();

  const [brand, setBrand] = useState<string | null>(null);
  const [model, setModel] = useState<string | null>(null);
  const [fuel, setFuel] = useState<string | null>(null);
  const [firstregistration, setFirstregistration] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [engine, setEngine] = useState<string | null>(null);
  const [km, setKM] = useState<string | null>(null);
 
  useEffect(() => {
    if(brand) {
      params.set('brand', brand);
    } else {
      params.delete('brand');
    }

    if(model) {
      params.set('model', model);
    } else {
      params.delete('model');
    }

    if(fuel) {
      params.set('fuel', fuel);
    } else {
      params.delete('fuel');
    }

    if(firstregistration) {
      params.set('firstregistration', firstregistration);
    } else {
      params.delete('firstregistration');
    }

    if(type) {
      params.set('type', type);
    } else {
      params.delete('type');
    }

    if(engine) {
      params.set('engine', engine);
    } else {
      params.delete('engine');
    }

    if(km) {
      params.set('km', km);
    } else {
      params.delete('km');
    }
  }, [brand, model, fuel, firstregistration, type, engine, km]);

  const handleEditCar = (car: ICarNewImg) => {
    setCurrentCar(car);
    setOpenModalAddCar(true);
  };

 useEffect(() => {
    if(actionData) {
      (setOpenModalDelete(false), setCarId(null))
    }
  }, [actionData]);

  if(!logged) {
    return 'NOT ALLOWED';
  }

  return (
    <section>
      <Header />
      <section className="container dashboard">
        <section className="header-container flex w-100 jc-sb ai-c f-wrap">
          <h2>Deine Autos ({cars.length})</h2>
          <button type="button" onClick={() => (setOpenModalAddCar(true), setCurrentCar(null))}>Auto hinzufügen</button>
        </section>
        <section className="flex ai-c f-wrap">
          {
            cars.map((el) => {
              return (
                <section className="relative dashboard-carbox-container">
                  <RemoveIcon onPress={() => (setOpenModalDelete(true), setCarId(el.id))} className="remove-btn-car" />
                  <CarBoxSmall2 {...el} isDashboard onClick={() => handleEditCar(el)} />
                </section>
              )
            })
          }
        </section>
      </section>
      {
        openModalAddCar && (
          <ModalAddCar 
            car={currentCar}
            isEdit={!!currentCar}
            onPressClose={() => setOpenModalAddCar(false)}
            revalidate={() => revalidate.revalidate()}
          />
        )
      }

      {
        openModalDelete && carId && (
          <ModalDeleteCar
            car_id={carId}
            onPressClose={() => (setOpenModalDelete(false), setCarId(null))}
          />
        )
      }

      <Footer />
    </section>
  )
}

export const action: ActionFunction = async ({request, response}) => {
  try {
    const userLogged = await requireUserSession(request);
    if(!userLogged) {
      return 'NOT ALLOWED';
    }
    const form = await request.formData();

    console.log(form.get('form'));
   
    const obj: { car_id: string; } = Object.fromEntries(form) as {car_id: string};

    switch(form.get('form')) {
      case 'delete_car':
        await deleteCar(obj.car_id);
      break;
      case 'login':
        await login({password: form.get('password')});
      break;
    }

    return true;
  } catch(e) {
    console.log(e);
    return e;
  }
};

export const loader: LoaderFunction = async ({params, request}) => {
  try {
    const userID = await requireUserSession(request);

    console.log(userID);
    const getCars = await pool.query(`
      SELECT
      c.id,
      c.model,
      c.description,
      c.environment,
      c.equipment,
      c.ps,
      c.tuv,
      c.cover,
      c.brand,
      c.price,
      c.engine,
      c.fuel,
      c.firstregistration,
      c.rate24,
      c.rate24_anzahlung,
      c.rate24_schlussrate,
      c.rate36,
      c.rate36_anzahlung,
      c.rate36_schlussrate,
      c.rate48,
      c.rate48_anzahlung,
      c.rate48_schlussrate,
      c.car_designation,
      c.km,
      c.color,
      c.video,
      c.consumption_image,
      c.type,
      c.show,
      c.sit_place,
      array_agg(ci.image) as images
      FROM cars c

      LEFT JOIN cars_images ci
      ON ci.car_id = c.id

      GROUP BY c.id
    `);

    let eqs = await pool.query('SELECT car_id as id, array_agg(name) as equipments FROM cars_equipment GROUP BY car_id');

    var merged = _.merge(_.keyBy(eqs.rows, 'id'), _.keyBy(getCars.rows, 'id'));
  
    let cars = _.values(merged);

 
    return {
      cars,
      logged: userID
    };
  } catch(e) {
    console.log(e);
    return e;
  }
}