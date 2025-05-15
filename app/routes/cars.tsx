import '../styles/index.css';
import '../styles/cars.css';
import { Header } from "~/components/Header/Header";
import { Footer } from "~/components/Footer/Footer";
import { CarBoxSmall } from '~/components/CarBoxSmall/CarBoxSmall';
import { LoaderFunction } from '@remix-run/node';
import pool from '~/data/db.server';
import { useFetcher, useLoaderData, useNavigate, useSearchParams } from '@remix-run/react';
import { ICarNewImg } from '~/components/Modal/ModalAddCar/types';
import { useEffect, useRef, useState } from 'react';
import { QueryResult } from 'pg';
import { getBrands } from '~/data/db/getBrands';
import { action } from './_index';
import { engine as exportEngine, firstregistrationArr } from '~/components/Modal/ModalAddCar/ModalAddCar';
import { CarBoxSmall2 } from '~/components/CarBoxSmall2/CarBoxSmall2';
import { GoFilter } from 'react-icons/go';
import { clickOutside } from '~/components/ClickOutside/ClickOutside';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';
import _ from 'lodash';


export default function Cars() {
  const navigate = useNavigate();
  const data: {cars: ICarNewImg[]; brands: string[]} = useLoaderData<typeof loader>();

  const [searchParams, setSearchParams] = useSearchParams();

  const params = new URLSearchParams();

  const [brand, setBrand] = useState<string | null>(searchParams.get('brand') ?? null);
  const [model, setModel] = useState<string | null>(searchParams.get('model') ?? null);
  const [fuel, setFuel] = useState<string | null>(searchParams.get('fuel') ?? null);
  const [firstregistration, setFirstregistration] = useState<string | null>(searchParams.get('firstregistration') ?? null);
  const [type, setType] = useState<string | null>(searchParams.get('type') ?? null);
  const [engine, setEngine] = useState<string | null>(searchParams.get('engine') ?? null);
  const [km, setKM] = useState<string | null>(searchParams.get('km') ?? null);
  const [price, setPrice] = useState<string | null>(searchParams.get('price') ?? null);

  const [showFilter, setShowFilter] = useState<boolean>(false);

  const [selectedModels, setSelectedModels] = useState<string[] | null>(null);

  const models = useFetcher<typeof action>();
  
  // @ts-ignore
  const refFilter = useRef<HTMLDivElement>('filter-ref');

  clickOutside(refFilter, () => {
    setShowFilter(false);
  });

  useEffect(() => {
    if(brand) {
      console.log('here')
      models.load(`/selectDatas?brand=${brand}`);
    } else {
      setSelectedModels(null);
    }
  }, [brand]);

  useEffect(() => {
    if(models.data) {
      console.log('daa');
      console.log(models.data);
      setSelectedModels(models.data);
    }
  }, [models]);

  useEffect(() => {
    if(brand) {
      params.set('brand', brand);
    } else {
      params.delete('brand');
      params.delete('model');
      setSelectedModels(null);
    }

    if(model && brand) {
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

    if(price) {
      params.set('price', price);
    } else {
      params.delete('price');
    }

    setSearchParams(params, {
      preventScrollReset: true,
    });
  }, [brand, model, fuel, firstregistration, type, engine, km, price]);
  return (
    <>
      <Header />
      <section className="container cars flex jc-sb ai-s relative">
      
        <aside ref={refFilter} className={`c-box c-box-filter filter-ref`}>
          <h2 className="c-filter-title">Filter</h2>
          <section className="filter flex ai-c jc-e f-wrap">
            <select name="marke" onChange={(e) => setBrand(e.target.value !== '0' ? e.target.value : null)}>
              <option value="0">Marke wählen</option>
              {
                data.brands.map((el, i) => (
                  <option value={el} selected={brand === el} key={i}>{el}</option>
                ))
              }
            </select>
            <select name="modell" onChange={(e) => setModel(e.target.value !== '0' ? e.target.value : null)}>
              <option value="0">Modell wählen</option>
              {
                selectedModels && selectedModels.length > 0 && selectedModels.map((el, i) => (
                  <option value={el} selected={model === el} key={i}>{el}</option>
                ))
              }
            </select>
            <select name="fuel" onChange={(e) => setFuel(e.target.value !== '0' ? e.target.value : null)}>
              <option value="0">Kraftstoff</option>
              <option value="Diesel" selected={fuel === 'Diesel'}>Diesel</option>
              <option value="Benzin" selected={fuel === 'Benzin'}>Benzin</option>
              <option value="Elektro" selected={fuel === 'Elektro'}>Elektro</option>
              <option value="Hybrid (Elektro/Diesel)" selected={fuel === 'Hybrid (Elektro/Diesel)'}>Hybrid (Elektro/Diesel)</option>
              <option value="Hybrid (Elektro/Benzin)" selected={fuel === 'Hybrid (Elektro/Benzin)'}>Hybrid (Elektro/Benzin)</option>
            </select>
            <select name="firstregistration" onChange={(e) => setFirstregistration(e.target.value !== '0' ? e.target.value : null)}>
              <option value="0">Erstzulassung</option>
              {
                firstregistrationArr.map((el, i) => (
                  <option value={el} key={i} selected={el === firstregistration}>{el}</option>
                ))
              }
            </select>
            <select name="type" onChange={(e) => setType(e.target.value !== '0' ? e.target.value : null)}>
              <option value="0">Aufbauart</option>
              <option value="PKW" selected={type === 'PKW'}>PKW</option>
              <option value="Nutzfahrzeuge" selected={type === 'Nutzfahrzeuge'}>Nutzfahrzeuge</option>
            </select>
            <select name="engine" onChange={(e) => setEngine(e.target.value !== '0' ? e.target.value : null)}>
              <option value="0">Schaltung</option>
              {
                exportEngine.map((el, i) => (
                  <>
                    <option value={el} key={i} selected={engine === el}>{el}</option>
                  </>
                ))
              }
            </select>
            <select name="km" onChange={(e) => setKM(e.target.value !== '0' ? e.target.value : null)}>
              <option value="0">Km bis</option>
              <option value="1000" selected={km === '1000'}>1.000</option>
              <option value="10000" selected={km === '10000'}>10.000</option>
              <option value="30000" selected={km === '30000'}>30.000</option>
              <option value="50000" selected={km === '50000'}>50.000</option>
              <option value="100000" selected={km === '100000'}>100.000</option>
              <option value="150000" selected={km === '150000'}>150.000</option>
            </select>
            <select name="price" onChange={(e) => setPrice(e.target.value !== '0' ? e.target.value : null)}>
              <option value="0">Preis bis</option>
              <option value="10000" selected={price === '10000'}>10000</option>
              <option value="25000" selected={price === '25000'}>25000</option>
              <option value="50000" selected={price === '50000'}>50000</option>
              <option value="75000" selected={price === '75000'}>75000</option>
              <option value="100000" selected={price === '100000'}>100000</option>
              <option value="150000" selected={price === '150000'}>150000</option>
            </select>


          <button type="button" className="filter-btn modal-filter-btn" onClick={() => setShowFilter(false)}>Fertig</button>
          </section>
        </aside>
      
        <section className={`c-box ${data.cars.length <= 2 && 'cb-container'}`}>
          <section className="flex ai-c jc-sb hd-cars-hd">
            <span className="c-title">Wir haben {data.cars.length} {data.cars.length === 1 ? 'Fahrzeug' : 'Fahrzeuge'} für Sie</span>
          </section>

          <section className={`flex f-wrap cars-con`}>
            {
              data.cars.map(el => {
                return (
                  <CarBoxSmall
                    {...el}
                    onClick={() => {}}
                  />
                )
              })
            }
          </section>
        </section>
      </section>

      <Footer />
    </>
  )
}

export const loader: LoaderFunction = async ({request}) => {
  try {
    const search = new URL(request.url).searchParams;

    const brand = search.get('brand');

    const model = search.get('model');

    const fuel = search.get('fuel');

    const type = search.get('type');

    const price = search.get('price');

    const firstregistration = search.get('firstregistration');

    const engine = search.get('engine');

    const km = search.get('km');

    const brands = await getBrands();

    let getCars: QueryResult<ICarNewImg> = await pool.query(`
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
      c.car_designation,
      c.km,
      c.color,
      c.video,
      c.type,
      c.show,
      c.sit_place,
      array_agg(ci.image) as images
      FROM cars c

      LEFT JOIN cars_images ci
      ON ci.car_id = c.id

      WHERE c.show IS TRUE

      GROUP BY c.id
    `);

    let eqs = await pool.query('SELECT car_id as id, array_agg(name) as equipments FROM cars_equipment GROUP BY car_id');

    var merged = _.merge(_.keyBy(eqs.rows, 'id'), _.keyBy(getCars.rows, 'id'));
  
    let cars = _.values(merged);

    if(cars.length > 0) {

      // brand
      if(brand) {
        cars = cars.filter((el => el.brand === brand));
      }

      // model
      if(model) {
        cars = cars.filter((el => el.brand === brand && el.model === model));
      }

      // fuel
      if(fuel) {
        cars = cars.filter((el => el.fuel === fuel));
      }

      // type
      if(type) {
        cars = cars.filter((el => el.type === type));
      }

      // engine
      if(engine) {
        cars = cars.filter((el => el.engine === engine));
      }

      // firstregistration
      if(firstregistration) {
        cars = cars.filter((el => el.firstregistration === parseInt(firstregistration)));
      }

      // km
      if(km) {
        cars = cars.filter((el => el.km <= parseInt(km)));
      }

      // price
      if(price) {
        cars = cars.filter((el => el.price <= parseInt(price)));
      }

    }

    return {
      cars,
      brands
    };
  } catch(e) {
    console.log(e);
    return e;
  }
}