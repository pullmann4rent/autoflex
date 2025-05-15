import type { ActionFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { Header } from "~/components/Header/Header";
import { SelectCar } from "~/components/SelectCar/SelectCar";
import '../styles/index.css';
import { Advantages } from "~/components/Advantages/Advantages";
import { LongTermRental } from "~/components/LongTermRental/LongTermRental";
import { Reviews } from "~/components/Reviews/Reviews";
import { Footer } from "~/components/Footer/Footer";
import pool from "~/data/db.server";
import { QueryResult } from "pg";
import { ICarNewImg } from "~/components/Modal/ModalAddCar/types";
import { useFetcher, useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { getBrands, getModels } from "~/data/db/getBrands";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/cars.css';
import Logo from '../assets/logo_1.png';
import { TfiAngleLeft, TfiAngleRight, TfiArrowLeft, TfiArrowRight } from "react-icons/tfi";
import { CarBoxSmall2 } from "~/components/CarBoxSmall2/CarBoxSmall2";
import { CarBoxSmall } from "~/components/CarBoxSmall/CarBoxSmall";
import { MeetingCalendar } from "~/components/MeetingCalendar/MeetingCalendar";
import { IoCalendarOutline } from "react-icons/io5";
import ModalCalendar from "~/components/ModalCalendar/ModalCalendar";
import Img from '../assets/bg.jpeg';

export const meta: MetaFunction = () => {
  return [
    { title: "24Mobility - Die besten Mietkauf-Angebote in Hannover und Umgebung!" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    cssEase: "linear",
  };

  var settingsNewCars = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const brands = useFetcher();

  const models = useFetcher<typeof action>();
  const [selectedModels, setSelectedModels] = useState<string[] | null>(null);

  const params = new URLSearchParams();

  const [brand, setBrand] = useState<string | null>(searchParams.get('brand') ?? null);
  const [type, setType] = useState<string | null>(searchParams.get('type') ?? null);
  const [fuel, setFuel] = useState<string | null>(searchParams.get('fuel') ?? null);

  const [Slider, setSlider] = useState();
  
  useEffect(() => {
    import("react-slick").then((Module) => {
      setSlider(() => Module.default);
    });
  }, []);

  const refSlider = useRef(null);

  const refSlider2 = useRef(null);

  const data: {
    brands: string[];
    carsCount: number;
    models: string[] | null;
    allCars: ICarNewImg[];
  } = useLoaderData<typeof loader>();

  const handleSearch = () => {
    if(brand && !type) {
      navigate(`/autoabo?brands=${brand}`);
    } else if(brand && type) {
      navigate(`/autoabo?brands=${brand}&models=${type}`);
    } else if(type && !brand) {
      navigate(`/autoabo?models=${type}`);
    } else {
      navigate('/autoabo');
    }
  }

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
    }

    if(type) {
      params.set('type', type);
    } else {
      params.delete('type');
    }

    if(fuel) {
      params.set('fuel', fuel);
    } else {
      params.delete('fuel');
    }

    setSearchParams(params, {
      preventScrollReset: true,
    });
  }, [brand, type, fuel]);

  const handleChange = ({type, value}: {type: string; value: string;}) => {

    console.log(type)
    if(type === 'brand') {
      console.log('Ssasa')
      if(value !== '0') {
        setBrand(value);
      } else {
        setBrand(null);
      }
    }

    if(type === 'type') {
      if(value !== '0') {
        setType(value);
      } else {
        setType(null);
      }
    }

    if(type === 'fuel') {
      if(value !== '0') {
        setFuel(value);
      } else {
        setFuel(null);
      }
    }
  }

  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  if(Slider) {
  return (
    <>
      <Header />

      <section className="relative main-main">
        <img src={Img} alt="IMG" className="main-img" />
        <section className="text-left">
          <p>Rent.</p>
          <p>Drive.</p>
          <p>Repeat.</p>
        </section>

        <section className="text-right">
          <p>Our mission</p>
          <p>is your</p>
          <p>need.</p>
        </section>
        <section className="container flex fd-col ai-c slider-content">
          <h1>Entdecken Sie jetzt die besten Mietkauf-Angebote</h1>
          <h2 className="bg-subtitle">Suche jetzt dein Traumfahrzeug</h2>
          <SelectCar
            count={data.carsCount}
            onSearch={handleSearch}
            onChange={handleChange}
            selectBrands={data.brands}
            selectModels={data.models}
            urlSelectedType={type}
            urlSelectedBrand={brand}
            urlSelectedFuel={fuel}
          />
   
        </section>

        <section className="relative">
          <button className="prev" onClick={() => refSlider?.current?.slickPrev()}><TfiArrowLeft size={24} color="#fff" /></button>
            <Slider ref={refSlider} {...settings}>
              <div className="bg relative">

              </div>

              <div className="bg relative">
        
              </div>

              <div className="bg relative">
        
              </div>
            </Slider>
          <button className="next" onClick={() => refSlider?.current?.slickNext()}><TfiArrowRight size={24} color="#fff" /></button>
        </section>
      </section>

      <section className="container">
        <section>
        <h3 className="last-car-title">Unsere Neuzugänge</h3>

        <section className="index-cb-r relative">
        <button className="prev prev-2" onClick={() => refSlider2?.current?.slickPrev()}><TfiAngleLeft size={24} color="grey" /></button>
          <Slider ref={refSlider2} {...settingsNewCars}>
            { 
              data.allCars.map((el) => (
                <div className="relative" key={el.id}>
                  <CarBoxSmall {...el} onClick={() => navigate(`/car/${el.id}`)} />
                </div>
              ))
            }
          </Slider>
          <button className="next next-2" onClick={() => refSlider2?.current?.slickNext()}><TfiAngleRight size={24} color="grey" /></button>
        </section>
      </section>
      </section>
      <section className="cal-icon-content" onClick={() => setShowCalendar(true)}>
        <IoCalendarOutline size={20} className="cal-icon" />
      </section>

      { showCalendar &&
        <ModalCalendar onPressClose={() => setShowCalendar(false)} />
      }
      <Advantages />
      <LongTermRental />
      <Reviews />
      <Footer />
    </>
  )
  } else {
    return (
      <section className="flex jc-c ai-c not-loaded-container">
        <img src={Logo} alt="Logo" />
      </section>
    )
  }
}

export const loader: LoaderFunction = async ({request, params}) => {
  try {
    const search = new URL(request.url).searchParams;

    const brand = search.get('brand');

    const type = search.get('type'); // modelle

    const fuel = search.get('fuel');

    const brands = await getBrands();

    let models = null;

    if(brand) {
      models = await getModels(brand);
    }
    
    let getCars: QueryResult<ICarNewImg & { created_at: Date; }> = await pool.query(`
      SELECT
      c.id,
      c.image as cover,
      c.name,
      c.model,
      c.brand,
      c.type,
      c.engine,
      c.fuel,
      c.annotation,
      c.availability,
      c.model_year,
      c.sit_places,
      c.ps,
      c.consumption,
      c.tires,
      c.created_at,
      array_agg(ci.image) as images,
      json_agg(DISTINCT jsonb_build_object('id', ct.id, 'price', ct.price, 'duration', ct.duration)) as contract,
      json_agg(DISTINCT jsonb_build_object('id', km.id, 'price', km.price, 'duration', km.duration)) as km
      FROM car_abo c

      LEFT JOIN car_images ci
      ON ci.car_id = c.id
      
      LEFT JOIN car_contract ct
      ON ct.car_id = c.id

      LEFT JOIN car_km km
      ON km.car_id = c.id

      GROUP BY c.id
    `);

    let allCars = getCars.rows;
    let cars = getCars.rows;

    let c = allCars.sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
    
    // brand
    if(brand) {
      cars = cars.filter((el => el.brand === brand));
    }

    console.log('CAR 1')
    console.log(cars)

    // model
    if(type) {
      cars = cars.filter((el => el.model === type));
    }

    console.log(type);
    console.log('CARS 2')
    console.log(cars);

/*     // fuel
    if(fuel) {
      cars = cars.filter((el => el.fuel === fuel));
    } */

    return {
      brands,
      models,
      allCars: c.slice(0, 5),
      carsCount: cars.length
    };
  } catch(e) {
    return e;
  }
}

export const action: ActionFunction = async ({ request }) => {
  try {
    const cloneRq = request.clone();

    
    const formDatas = await cloneRq.formData();
    console.log('ASS')

    console.log(Object.fromEntries(formDatas));
    return null;
  } catch(e) {
    console.log(e);
    return null;
  }
};
