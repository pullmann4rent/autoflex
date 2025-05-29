import { LoaderFunction, json } from "@remix-run/node"
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { HiPhone } from "react-icons/hi";
import Umwelt from '../assets/umwelt.png';
import '../styles/index.css';
import '../styles/car.css';
import '../styles/dashboard.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Header } from "~/components/Header/Header";
import { Footer } from "~/components/Footer/Footer";
import { GoCheckCircleFill, GoChevronLeft } from "react-icons/go";
import { ICarNewImg } from "~/components/Modal/ModalAddCar/types";
import pool from "~/data/db.server";
import { QueryResult } from "pg";
import { useEffect, useRef, useState } from "react";
import { IoCheckmarkSharp } from "react-icons/io5";
import _, { merge } from 'lodash';
import ModalSlider from "~/components/ModalSlider/ModalSlider";
import { BsZoomIn } from "react-icons/bs";

export default function Car() {
  const car = useLoaderData<typeof loader>();

  const [modalImage, setModalImage] = useState<boolean>(false);

  const mailer = useFetcher();

  const [Slider, setSlider] = useState();
  const [init, setInit] = useState<number>(0);
  
  useEffect(() => {
    import("react-slick").then((Module) => {
      setSlider(() => Module.default);
    });
  }, []);

  const handleSendMail = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as any);
    
    mailer.submit(formData, {
      method: 'POST',
      action: '/sendMail'
    });
  };

  useEffect(() => {
    console.log(mailer.data);
  }, [mailer.data]);

  const {
    id,
    brand,
    model,
    cover,
    video,
    price,
    tuv,
    fsk,
    type,
    sit_place,
    engine,
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
    fuel,
    firstregistration,
    ps,
    km,
    color,
    equipment,
    consumption_image,
    equipments,
    description,
    environment,
    show,
    images,
  } = car.car;

  const refDiv = useRef<HTMLDivElement>(null);
  
  const handleScrollToContact = () => {
    if(refDiv.current) {
/*       const dv = (100 * refDiv.current.clientHeight ) / 56;
      window.scrollTo({behavior: 'smooth', top: dv - refDiv.current.clientHeight}); */
      refDiv.current.scrollIntoView();
    }
  }
  return (
    <div>
      <Header />
        <section className="container car-full flex jc-sb ai-s">
          <section className="car-full-box car-full-box-1">
            <a href="/cars" className="flex ai-c link-back mb-6">
              <GoChevronLeft size={18} />
              <span className="ml-6">Zurück zu den Autos</span>
            </a>
          
          <section className="relative">
            <button type="button" className="zoom-btn" onClick={() => (setModalImage(true), setInit(0))}>
              <BsZoomIn size={24} color="#fff" />
            </button>
           <img onClick={() => (setModalImage(true), setInit(0))} src={cover} alt="Car" />
          </section>
             
          <aside className="car-full-box car-full-box-2 ai-s car-full car-full-info-box aside-car-id">
          <section className="bg-white car-full-info-box">
            <section className="flex ai-s jc-sb cf-sec1">

              <section className="car-full-name-container">
                <p className="big-text">{brand} {model} {car_designation}</p>
              </section>

              <section className="car-full-name-price-container">
                <p className="price">{new Intl.NumberFormat("de-DE").format(price)} €</p>
                <p className="mwst">MwSt. ausweisbar</p>
              </section>

            </section>

            <section id="contact2" className="car-full-aside-footer-container">
              <section className="flex jc-sb ai-s cf-sec2">
                <section>
                  <small>Fahrzeugdetails</small>
                  <ul className="flex fd-col">
                    <li>
                      {type}
                    </li>
                    <li>
                      EZ {firstregistration}
                    </li>
                    <li>
                      {km} KM
                    </li>
                    <li>
                      {ps} PS
                    </li>
                    <li>
                      {fuel}
                    </li>
                    <li>
                      {engine}
                    </li>
                    <li>
                      {color}
                    </li>
                    <li>
                      Fzg.Nr: RC32
                    </li>
                  </ul>
                </section>

                <section>
                  <a className="now-contact pointer" onClick={handleScrollToContact}>Jetzt Anfragen</a>
                  <p>oder rufen Sie uns an</p>
                  <section className="car-full-phone-text-container flex ai-c">
                    <HiPhone />
                    <a href="tel:+491782498927">0178 2498927</a>
                  </section>
                </section>
              </section>
              </section>
            </section>


            <section className="flex jc-sb ai-c rate-box">
              <section className="bg-white car-full-info-box as-box as-box-1">
                <h5>Beispiel 24 Monate</h5>
                <p>Anzahlung: <span className="bold">{new Intl.NumberFormat("de-DE").format(rate24_anzahlung)} €</span></p>
                <p>Monatsrate: <span className="bold">{new Intl.NumberFormat("de-DE").format(rate24)} €</span></p>
                <p>Schlussrate: <span className="bold">{new Intl.NumberFormat("de-DE").format(rate24_schlussrate)} €</span></p>
              </section>

              <section className="bg-white car-full-info-box as-box as-box-2">
              <h5>Beispiel 36 Monate</h5>
                <p>Anzahlung: <span className="bold">{new Intl.NumberFormat("de-DE").format(rate36_anzahlung)} €</span></p>
                <p>Monatsrate: <span className="bold">{new Intl.NumberFormat("de-DE").format(rate36)} €</span></p>
                <p>Schlussrate: <span className="bold">{new Intl.NumberFormat("de-DE").format(rate36_schlussrate)} €</span></p>
              </section>
            </section>

            </aside>

            <h3>Umwelt</h3>

            <section className="flex jc-sb ai-s umwelt car-full-info-box">
              <section>
                <div dangerouslySetInnerHTML={{__html:environment}}></div>
              </section>

              <img src={consumption_image} />
            </section>


            <h3>Ausstattung</h3>
            <section className="car-full-content-box car-full-info-box eq-box">
              <ul>
                {
                  equipments.map((el => (
                    <li className="flex ai-c jc-sb">

                      <span>{el}</span>

                      <IoCheckmarkSharp />
                    </li>
                  )))
                }
              </ul>
            </section>

            <h3>Beschreibung</h3>
            <section className="car-full-content-box car-full-info-box">
              <div dangerouslySetInnerHTML={{__html:description}}></div>
            </section>

            <h3>Fotos</h3>
            <ul className="flex ai-s f-wrap photos">
              {
                images && images.length > 0 && images.map((el: string, i: number) => (
                  <li>
                    <img src={el} onClick={() => (setModalImage(true), setInit(i + 1))} key={i} />
                  </li>
                ))
              }
            </ul>
            
            <h3 ref={refDiv}>Kontakt</h3>

            <section className="car-full-content-box car-full-contact car-full-info-box" id="contact3">
              {
                mailer?.data?.message && <p>{mailer.data.message}</p>
              }

              {
                mailer?.data === true && <p>Vielen Dank! Wir werden uns umgehend bei Ihnen melden.</p>
              }
              <form method="POST" className="flex fd-col ai-s jc-c" onSubmit={handleSendMail}>
                <input type="text" name="name" placeholder="Name*" />
                <input type="email" name="email" placeholder="E-Mail Adresse*" />
                <input type="text" name="phone" placeholder="Telefonnummer" />
                <textarea name="anliegen" defaultValue={`Ich interessiere mich für das Angebot bei ${brand} ${model}`}></textarea>
                <button type="submit">{mailer.state !== 'idle' ? 'Ladet...' : 'Anfrage senden'}</button>
              </form>
            </section>
          </section>
        
          <aside className="car-full-box car-full-box-2 ai-s car-full car-full-info-box aside-car-id-main aside-p">
              <section className="bg-white car-full-info-box">
            <section className="flex ai-s jc-sb cf-sec1">

              <section className="car-full-name-container">
                <p className="big-text">{brand} {model} {car_designation}</p>
              </section>

              <section className="car-full-name-price-container">
                <p className="price">{new Intl.NumberFormat("de-DE").format(price)} €</p>
                <p className="mwst">MwSt. ausweisbar</p>
              </section>

            </section>

            <section id="contact2" className="car-full-aside-footer-container">
              <section className="flex jc-sb ai-s cf-sec2">
                <section>
                  <small>Fahrzeugdetails</small>
                  <ul className="flex fd-col">
                    <li>
                      {type}
                    </li>
                    <li>
                      EZ {firstregistration}
                    </li>
                    <li>
                      {km} KM
                    </li>
                    <li>
                      {ps} PS
                    </li>
                    <li>
                      {fuel}
                    </li>
                    <li>
                      {engine}
                    </li>
                    <li>
                      {color}
                    </li>
                    <li>
                      Fzg.Nr: RC32
                    </li>
                  </ul>
                </section>

                <section>
                  <a className="now-contact pointer" onClick={handleScrollToContact}>Jetzt Anfragen</a>
                  <p>oder rufen Sie uns an</p>
                  <section className="car-full-phone-text-container flex ai-c">
                    <HiPhone />
                    <a href="tel:+491782498927">0178 2498927</a>
                  </section>
                </section>
              </section>

            </section>

            </section>

            <section className="flex jc-sb ai-c f-wrap">
              <section className="bg-white car-full-info-box as-box as-box-1">
                <h5>Beispiel 24 Monate</h5>
                <p>Anzahlung: <span className="bold">{new Intl.NumberFormat("de-DE").format(rate24_anzahlung)} €</span></p>
                <p>Monatsrate: <span className="bold">{new Intl.NumberFormat("de-DE").format(rate24)} €</span></p>
                <p>Schlussrate: <span className="bold">{new Intl.NumberFormat("de-DE").format(rate24_schlussrate)} €</span></p>
              </section>

              <section className="bg-white car-full-info-box as-box as-box-2">
              <h5>Beispiel 36 Monate</h5>
                <p>Anzahlung: <span className="bold">{new Intl.NumberFormat("de-DE").format(rate36_anzahlung)} €</span></p>
                <p>Monatsrate: <span className="bold">{new Intl.NumberFormat("de-DE").format(rate36)} €</span></p>
                <p>Schlussrate: <span className="bold">{new Intl.NumberFormat("de-DE").format(rate36_schlussrate)} €</span></p>
              </section>

              <section className="bg-white car-full-info-box as-box as-box-2 as-box-3">
              <h5>Beispiel 48 Monate</h5>
                <p>Anzahlung: <span className="bold">{new Intl.NumberFormat("de-DE").format(rate48_anzahlung)} €</span></p>
                <p>Monatsrate: <span className="bold">{new Intl.NumberFormat("de-DE").format(rate48)} €</span></p>
                <p>Schlussrate: <span className="bold">{new Intl.NumberFormat("de-DE").format(rate48_schlussrate)} €</span></p>
              </section>
            </section>

          </aside>

        { modalImage &&
          <ModalSlider
            images={images}
            cover={cover}
            onPressClose={() => setModalImage(false)}
            init={init}
          />
        }
        </section>

      <Footer />
    </div>
  )
}

export const loader: LoaderFunction = async ({params}) => {
  const id = params.id;
 
  let getCar: QueryResult<ICarNewImg> = await pool.query(`
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
    c.km,
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
    c.color,
    c.consumption_image,
    c.video,
    c.type,
    c.show,
    c.sit_place,
    array_agg(ci.image) as images
    FROM cars c

    LEFT JOIN cars_images ci
    ON c.id = ci.car_id

   WHERE c.show IS TRUE AND c.id = $1 

   GROUP BY c.id

   LIMIT 1;
  `, [id]);


  let eqs = await pool.query('SELECT car_id as id, array_agg(name) as equipments FROM cars_equipment WHERE car_id = $1 GROUP BY car_id;', [id]);

  console.log(getCar.rows);
  let cars = {
    ...getCar.rows[0],
    equipments: eqs.rows.length > 0 ? eqs.rows[0].equipments : []
  }

  console.log(cars);


  console.log('Hmm')
  console.log(cars);
  

  // let cc = getCar.rows.m
  return json({car: cars})
}