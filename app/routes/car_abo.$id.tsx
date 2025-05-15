import { json } from "@remix-run/node";
import { Form, Link, Links, Meta, Scripts, useActionData, useLoaderData, useNavigate, useRouteError } from "@remix-run/react";
import { format } from "date-fns";
import { FormEvent, useEffect, useState } from "react";
import pool2 from "~/data/db.server";
import { IoIosStar } from "react-icons/io";
import { IoArrowBack, IoCalendarOutline, IoCheckbox, IoCloseOutline } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";
import _ from 'lodash';
import { DayPicker, Footer } from "react-day-picker";
import { de } from "date-fns/locale";
import { ICar } from "~/components/CarBoxRenew/types";
import { Header } from "~/components/Header/Header";
import '../styles/index.css';
import '../styles/car.css';
import '../styles/shared.css';
import ModalSliderAbo from "~/components/ModalSlider/ModalSliderAbo";
import PaymentStripe from "./payment";
import { Question } from "~/components/Faqs";
import '../styles/faq_new.css';

const faqs = [
  {
    question: "Was ist Abomiete und wie funktioniert sie?",
    answer: "Die Abomiete bei Renting24 ist eine flexible Mietoption, die es Kunden ermöglicht, ein Fahrzeug für einen kürzeren Zeitraum als bei der Langzeitmiete zu nutzen. Typischerweise beträgt die Mindestdauer für ein Abo bei Renting24 1 Monat. Kunden können ein Fahrzeug für einen Monat oder länger mieten und von den Vorteilen eines neuen Fahrzeugs ohne langfristige Verpflichtungen profitieren."
  },
  {
    question: "Welche Vorteile bietet die Abomiete im Vergleich zu anderen Mietoptionen?",
    answer: "Die Abomiete bietet Kunden Flexibilität und Bequemlichkeit. Sie ermöglicht es Kunden, ein Fahrzeug für einen kurzen Zeitraum zu nutzen, ohne sich langfristig zu binden. Bei Renting24 sind in der monatlichen Mietgebühr auch Versicherung und Wartung enthalten, was zusätzliche Kosten und Aufwand erspart."
  },
  {
    question: "Kann ich während des Abos mein Fahrzeug bei Renting24 austauschen oder aktualisieren?",
    answer: "Ja, bei Renting24 bieten wir unseren Kunden die Möglichkeit, ihr Fahrzeug während der Abozeit auszutauschen oder zu aktualisieren. Dies ermöglicht es Kunden, flexibel auf ihre sich ändernden Bedürfnisse oder Präferenzen zu reagieren. Es können jedoch zusätzliche Gebühren anfallen."
  },
];


const abomiete = {
  title: <section className='faq-title-container flex'>
  <p>Abomiete FAQs</p>
</section>,
  rows: [
    {
      title: "Was ist Abomiete und wie funktioniert sie?",
      content: <>
        <p>Die Abomiete bei Renting24 ist eine flexible Mietoption, die es Kunden ermöglicht, ein Fahrzeug für einen kürzeren Zeitraum als bei der Langzeitmiete zu nutzen. Typischerweise beträgt die Mindestdauer für ein Abo bei Renting24 1 Monat. Kunden können ein Fahrzeug für einen Monat oder länger mieten und von den Vorteilen eines neuen Fahrzeugs ohne langfristige Verpflichtungen profitieren.</p>
      </>
    },
    {
      title: "Welche Vorteile bietet die Abomiete im Vergleich zu anderen Mietoptionen?",
      content: <>
        <p>Die Abomiete bietet Kunden Flexibilität und Bequemlichkeit. Sie ermöglicht es Kunden, ein Fahrzeug für einen kurzen Zeitraum zu nutzen, ohne sich langfristig zu binden. Bei Renting24 sind in der monatlichen Mietgebühr auch Versicherung und Wartung enthalten, was zusätzliche Kosten und Aufwand erspart.</p>
      </>
    },
    {
      title: "Kann ich während des Abos mein Fahrzeug bei Renting24 austauschen oder aktualisieren?",
      content: <>
        <p>Ja, bei Renting24 bieten wir unseren Kunden die Möglichkeit, ihr Fahrzeug während der Abozeit auszutauschen oder zu aktualisieren. Dies ermöglicht es Kunden, flexibel auf ihre sich ändernden Bedürfnisse oder Präferenzen zu reagieren. Es können jedoch zusätzliche Gebühren anfallen.</p>
      </>
    },
]
}

export const colors: ('black' | 'white' | 'silver')[] = ['black', 'silver', 'white'];

export default function CarID() {
  const car: ICar = useLoaderData<ICar>();
  const actionData = useActionData();

  const navigate = useNavigate();

  console.log(actionData);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [price, setPrice] = useState<number>();

  const [load, setLoad] = useState<boolean>(false);

  const [step, setStep] = useState<number>(1);

  const [init, setInit] = useState<number>(0);

  const [showSlider, setShowSlider] = useState<boolean>(false);

  const [selectedContract, setSelectedContract] = useState<number | null>(null);
  const [selectedKM, setSelectedKM] = useState<number | null>(null);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);

  const [selectedColor, setSelectedColor] = useState<'black' | 'silver' | 'white'>('black');

  const [fullContract, setFullContract] = useState<{ id: number; duration: number; price: number; } | null>(null);
  const [fullKM, setFullKM] = useState<{ id: number; duration: number; price: number; } | null>(null);

  const today = new Date();

  useEffect(() => {
    if(actionData && actionData?.success === true) {
      setLoad(false);
      setStep(3);
    }

    setLoad(false)
  }, [actionData]);

  useEffect(() => {
    const available = new Date(car.availability);

    if(
        today.getFullYear() === available.getFullYear() && 
        today.getMonth() === available.getMonth() &&
        today.getDate() === available.getDate()
    ) {
      setIsAvailable(true);
    } else if(available.getTime() < today.getTime()) {
      setIsAvailable(true);
    } else {
      setIsAvailable(false);
    }
  }, []);

  useEffect(() => {
    console.log('MAKEEEEEEEE');
    const findLowestDuration = Math.min(...car.durationcontract.map((el => parseFloat(el.duration))));
    const findPriceFromDuration = car.durationcontract.find((el => parseFloat(el.duration) === findLowestDuration));

    const findLowestKM = Math.min(...car.km.map((el => parseFloat(el.duration))));
    const findKM = car.km.find((el => parseFloat(el.duration) === findLowestKM));

    console.log('LOW');
    console.log(findLowestDuration);


    setPrice(findPriceFromDuration.price);
    setSelectedContract(findPriceFromDuration.id);

    setFullContract(findPriceFromDuration);
    setFullKM(findKM);

    setSelectedKM(findKM?.id ?? null)
  }, []);


  const handlePressNext = () => {
    setShowModal(true);

    setTimeout(() => {
      setShowAnimation(true);
    }, 10);
  };

  const handleCloseModal = () => {
    setShowAnimation(false);

    setTimeout(() => {
      setShowModal(false);
    }, 200);
  };

  const getNameOfColor = () => {
    if(selectedColor === 'black') {
      return 'Schwarz';
    } else if(selectedColor === 'silver') {
      return 'Silber';
    } else if(selectedColor === 'white') {
      return 'Weiß';
    } else {
      return 'Schwarz';
    }
  };

  useEffect(() => {
    if(selectedContract && selectedKM) {
      const contract = car.durationcontract.find((el => el.id === selectedContract));
      const km = car.km.find((el => el.id === selectedKM));

      setPrice(parseFloat(km.price) + parseFloat(contract.price));
    }
  }, [selectedKM, selectedContract]);

  const handlePriceContract = (val) => {
    const contract = car.durationcontract.find((el => el.id === val.id));

    setSelectedContract(contract?.id);
    setFullContract(contract);
  };

  const handlePriceKM = (val) => {
    const km = car.km.find((el => el.id === val.id));

    setSelectedKM(km.id);
    setFullKM(km);
  };

  const handleSubmitForm = (e: FormEvent) => {
    setLoad(true);
  };

  console.log(car)

  const handleStepPayment = () => {
    window.localStorage.setItem('car_data', JSON.stringify({
      color: selectedColor,
      contract: fullContract,
      km: fullKM,
      price
    }));

    setStep(2);

   // navigate('/payment');
  };

  const [form1, setForm1] = useState<boolean>(true);
  const [form2, setForm2] = useState<boolean>(false);
  const [form3, setForm3] = useState<boolean>(false);
  const [openPayment, setOpenPayment] = useState(false);

  const [chooseClient, setChooseClient] = useState<'privat' | 'legal'>('privat');

  const [surname, setSurname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [mail, setMail] = useState<string>('');
   
  const [street, setStreet] = useState<string>('');
  const [streetNumber, setStreetNumber] = useState<string>('');
  const [plz, setPLZ] = useState<string>('');
  const [city, setCity] = useState<string>('');

  const [unternehmen, setUnternehmen] = useState<string>('');
  const [rechtsform, setRechtsform] = useState<string>('');

  const [checkbox1, setCheckbox1] = useState<boolean>(false);
  const [checkbox2, setCheckbox2] = useState<boolean>(false);

  const [shippingDate, setShippingDate] = useState<string>(new Date());

  const [showErr, setShowErr] = useState<string>('');

  const handleFinishForm1 = () => {
    const isEmpty = surname === '' || lastname === '' || phone === '' || birthday === '' || mail === '';
    if(!isEmpty) {
      setForm1(false);
      setForm2(true);
    }
  };

  const handleFinishForm2 = () => {
    const isEmpty = street === '' || streetNumber === '' || plz === '' || city === '';
    console.log(isEmpty);
    if(!isEmpty && checkbox1 && checkbox2) {
      setForm2(false);
      setForm3(true);
      setShowErr('');
    } else {
      setShowErr('Bitte alles ausfüllen und akzeptieren Sie unten die beiden Angaben.');
    }
  };

  const handleFinishForm3 = () => {
    setForm3(false);
    setOpenPayment(true);
  };

  const [showPicker, setShowPicker] = useState<boolean>(false);

  const handleSelectDate = (e: any) => {
    setShippingDate(e);
    setShowPicker(false);
  };
  if(step === 1) {
  return (
    <>
      <Header />
      <section className="container">

        <section className="flex cid-container width100 as flex-between">
          
          <section className="cid cid-1">
            <ul>
              <li>Autoabo</li>
              <li>-</li>
              <li>{car.brand}</li>
              <li>-</li>
              <li>{car.model}</li>
            </ul>

            {
              <section className="ca-img-con">
                <img onClick={() => (setInit(0), setShowSlider(true))} src={car.image} alt="Auto" className="cid-cover" />
              </section>
            }
            <section className="flex flex-wrap cid-images">
              {
                car.images.length > 0 &&
                  car.images.map((el, i) => (
                  <>
                    <section onClick={() => (setInit(i + 1), setShowSlider(true))} className="ca-img-con">
                      <img src={el} alt="Auto" className="cid-images" />
                    </section>
                  </>
                ))
              }
            </section>
          </section>

          <section className="cid cid-2">
            <p className="cid-available">Verfügbar ab  { isAvailable === null ? '' : !isAvailable ? format(new Date(car.availability), 'dd.MM.yyyy') : 'sofort' }</p> 
            <p className="cid-title">{car.name}</p>
            <p className="cid-annot">{car.annotation}</p>

            <section className="cid-colors-container">
              <p className="cid-color-name">Farbe: {getNameOfColor()}</p>
              <ul className="cid-colors">
              { colors.map((el => (
                <li onClick={() => setSelectedColor(el)} className={el === selectedColor ? 'active-color' : ''} key={el}>
                  <div style={{backgroundColor: el === 'white' ? '#f1f1f1' : el}} />
                </li>
              )))
              }
              </ul>
            </section>

            <section className="cid-price-container">
              <p className="cid-price">{price}€</p>
              <p className="cid-small">pro Monat inkl. MwSt.</p>
            </section>

            <button type="button" onClick={handlePressNext} className="cid-btn">Weiter</button>

            <section className="cid-rating-container">
              <p className="cid-text-happy">Mehr als <span className="cid-colored">100+</span> zufriedene Kunden</p>

              <section className="cid-rating">
                <ul>
                  {
                    new Array(5).fill('').map((el => (
                      <>
                        <li><IoIosStar color="orange" /></li>
                      </>
                    )))
                  }
                </ul>
                <p className="cid-rating-text">Komplett sorgenfreies Paket für Ihre Mobilität: Wir kümmern uns um alles, von der Fahrzeugzulassung bis zum Reifenwechsel. Flexible Kilometer und Laufzeiten nach Ihren Bedürfnissen.</p>
                <p className="cid-rating-name">Jonas Maier - CEO Renting24</p>
              </section>
            </section>

          </section>

        </section>

        <h3 className="cid-cardata-title">Fahrzeugdaten</h3>

        <section className="cid-cardata flex flex-wrap">
          
          <section className="cid-cardata-sec">
            <p className="cid-cardata-light">Modelljahr</p>
            <p className="cid-cardata-bold">{car.model_year}</p>
          </section>

          <section className="cid-cardata-sec">
            <p className="cid-cardata-light">Fahrzeugtyp</p>
            <p className="cid-cardata-bold">{car?.details[0]?.type}</p>
          </section>

          <section className="cid-cardata-sec">
            <p className="cid-cardata-light">Sitzplätze</p>
            <p className="cid-cardata-bold">{car.sit_places}</p>
          </section>

          <section className="cid-cardata-sec">
            <p className="cid-cardata-light">Kraftstoff</p>
            <p className="cid-cardata-bold">{car?.details[0].fuel}</p>
          </section>

          <section className="cid-cardata-sec">
            <p className="cid-cardata-light">Schaltung</p>
            <p className="cid-cardata-bold">{car?.details[0].engine}</p>
          </section>

          <section className="cid-cardata-sec">
            <p className="cid-cardata-light">Leistung</p>
            <p className="cid-cardata-bold">{car.ps} PS</p>
          </section>

          <section className="cid-cardata-sec">
            <p className="cid-cardata-light">Verbrauch</p>
            <p className="cid-cardata-bold">{car.consumption}</p>
          </section>

          <section className="cid-cardata-sec">
            <p className="cid-cardata-light">Reifen</p>
            <p className="cid-cardata-bold">{car.tires}</p>
          </section>

        </section>

        <section className="cid-faqs flex flex-between">
            
        <section className="cid-faqs-sec cid-f1">
              <h3>Fragen übers Autoabo?</h3>
            </section>

            <section className="cid-faqs-sec cid-f2">
                     {faqs.map((que) => (
        <Question faqObject={que} key={que.question} />
      ))
    }
            </section>

        </section>

      </section>

      { showModal &&
        <section className="modal" onClick={handleCloseModal}>
          <section className={`modal-content-new relative ${showAnimation && 'active-md'}`} onClick={(e) => e.stopPropagation()}>

            <section className="cid-c cid-modal-header flex flex-between">
              <p>Konfigurieren Sie Ihr Abonoment</p>
              <button type="button" onClick={handleCloseModal}><IoCloseOutline size={28} /></button>
            </section>

            <section className="cid-c cid-modal-main">

              <section className="flex cid-modal-main-car">
                <section className="ca-img-con">
                  <img src={car.image} alt="Auto" />
                </section>
                <section>
                  <p>{car.name}</p>
                  <p>{car.annotation}</p>
                </section>
              </section>

              <section className="cid-modal-main-contract">
                <p className="cid-dc-title">Vertragslaufzeit</p>
                <section className="flex flex-wrap cid-dc-container">
                  {
                    car.durationcontract.map((el => (
                      <>
                      <div onClick={() => handlePriceContract(el)} className={`cid-autosize ${el.id === selectedContract && 'active-border-cid-modal'}`}>
                        <section className="cid-modal-choose-btn flex fd fd-column">
                          <p className="cid-dc">{el.duration} Monate</p>
                          <p className="cid-modal-price">{el.price}€</p>
                        </section>
                      </div>
                      </>
                    )))
                  }
                </section>
              </section>

              <section className="cid-modal-main-contract">
                <p className="cid-dc-title">Kilometer pro Monat</p>
                <section className="flex flex-wrap cid-dc-container">
                  {
                    car.km.map((el => (
                      <>
                       <div onClick={() => handlePriceKM(el)} className={`cid-autosize ${el.id === selectedKM && 'active-border-cid-modal'}`}>
                        <section className="cid-modal-choose-btn flex fd fd-column">
                          <p className="cid-dc">+{el.duration} km</p>
                          <p className="cid-modal-price">{el.price === '0' ? 'Kostenlos' : `${el.price}€`}</p>
                        </section>
                        </div>
                      </>
                    )))
                  }
                </section>
              </section>

              <p className="cid-info">
                Mehrkilometer über Ihr Kilometerpaket hinaus kosten Sie 0,25€ pro km (inkl. MwSt.) Die zusätzlichen Kosten werden nach der Rückgabe des Fahrzeugs abgerechnet.
              </p>

            </section>

            <section className="cid-c cid-modal-footer flex flex-between">
              <section>
                <p className="cid-price">{price}€</p>
                <p className="cid-small">pro Monat inkl. MwSt.</p>
              </section>

              <section>
                <button type="button" onClick={handleStepPayment} className="cid-btn cid-modal-btn">Weiter</button>
              </section>
            </section>

          </section>
        </section>
      }
      
      {
        showSlider &&
        <ModalSliderAbo
          cover={car.image}
          init={init}
          images={car.images}
          onPressClose={() => setShowSlider(false)}
        />
      }
      <Footer />
    </>
  )
  } else if(step === 2) {
    return (
      <>
        <Header />
        { showPicker &&
          <section className="modal" onClick={() => setShowPicker(false)}>
            <section className="modal-content md-date" onClick={(e) => e.stopPropagation()}>
              <DayPicker
                mode="single"
                selected={shippingDate}
                onSelect={handleSelectDate}
                locale={de}
              />
            </section>
          </section>
          }
          <section className="container">
            
            <section className="flex flex-between cid2-container">

              <section className="cid2">
                <h2>Ihr Abbonoment:</h2>
                
                <section className="flex cid2-img-container">
                  <section className="ca-img-con">
                    <img src={car.image} alt="Auto" />
                  </section>
                  <section>
                    <p>{car.name}</p>
                    <p>{car.annotation}</p>
                  </section>
                </section>

                <section className="cid2-info">

                  <p className="flex">Farbe: <ul className="cid-colors ul-cid2"><li className="active-color"><div /></li></ul></p>

                  <p>Vertragslaufzeit: { car.durationcontract.find((el => el.id === selectedContract))?.duration ?? '0' } Monate ({car.durationcontract.find((el => el.id === selectedContract))?.price}€)</p>

                  <p>Kilometer: +{ car.km.find((el => el.id === selectedKM))?.duration ?? '0' } Kilometer ({ car.km.find((el => el.id === selectedKM))?.price}€)</p>

                  <p className="cid-available">Verfügbar ab  { isAvailable === null ? '' : !isAvailable ? format(new Date(car.availability), 'dd.MM.yyyy') : 'sofort' }</p> 

                </section>
                
                <section className="cid-price-container">
                  <p className="cid-price">{price}€</p>
                  <p className="cid-small">pro Monat inkl. MwSt.</p>
                </section>

              </section>

              <section className="cid2">

              <section>
                <section className="flex flex-between w100 w-100">
                  <h2>Kontaktdaten</h2>
                  <p className="pointer" onClick={() => setForm1(true)}>Bearbeiten</p>
                </section>

                {
                  !form1 &&
                  (
                    <section className="flex cid2-form-con cid2-form">

                      <section>
                        <p>Name: {surname} {lastname}</p>
                        <p>Mobilnummer: { phone }</p>
                        <p>E-Mail: {mail}</p>
                        <p>Geburtstag: {birthday}</p>
                      </section>
                    </section>
                  )
                }
              </section>

              { form1 &&
                <Form onSubmit={() => {}} method="POST" className="flex fd fd-column">
                  <input type="text" name="surname" placeholder="Vorname" value={surname} onChange={(e) => setSurname(e.target.value)} />
                  <input type="text" name="lastname" placeholder="Nachname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                  <input type="text" name="email" placeholder="E-Mail" value={mail} onChange={(e) => setMail(e.target.value)} />
                  <input type="text" name="phone" placeholder="Tel/Mobilnummer" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  <input type="text" name="birthday" placeholder="Geburtstag" className="no-mb" value={birthday} onChange={(e) => setBirthday(e.target.value)} />

                  <section className="flex flex-between btn-cid2-con">
                    <button type="button" onClick={() => setForm1(false)}>Abbrechen</button>
                    <button type="button" onClick={handleFinishForm1}>Speichern</button>
                  </section>
                </Form>
              }

              <section>
                <section className="flex flex-between w100 w-100">
                  <h2 className="h2-pay">Rechnungsadresse</h2>
                  <p className="pointer" onClick={() => setForm2(true)}>Bearbeiten</p>
                </section>

                {
                  !form2 &&
                  (
                    <>
                      <section className="flex cid2-form-con cid2-form">
                        <section>
                          <p>Straße: {street} {streetNumber}</p>
                          <p>PLZ: { plz }</p>
                          <p>Stadt: {city}</p>
                        </section>
                      </section>
                    </>
                  )
                }

              { form2 &&
                <>
                  <section className="flex flex-between cid2border">
                    <button className={chooseClient === 'privat' && 'active-border-color'} type="button" onClick={() => setChooseClient('privat')}>Privatkunde</button>
                    <button className={chooseClient === 'legal' && 'active-border-color'} type="button" onClick={() => setChooseClient('legal')}>Gewerbekunde</button>
                  </section>
                  { showErr !== '' && <p style={{maxWidth: 400, color: 'red', marginBottom: 12}}>{showErr}</p> }
                  <Form onSubmit={() => {}} method="POST" className="flex fd fd-column cid2-pay-form">
                    { chooseClient === 'legal' &&
                      <>
                        <input type="text" name="surname" placeholder="Unternehmen" value={unternehmen} onChange={(e) => setUnternehmen(e.target.value)} />
                        <select onChange={(e) => setRechtsform(e.target.value)}>
                          <option value="0">Rechtsform</option>
                          <option value="GmbH /UG">GmbH/UG</option>
                          <option value="Eingetragene Einzelfirma">Eingetragene Einzelfirma</option>
                          <option value="Kein Handelsregistereintrag">Kein Handelsregistereintrag</option>
                          <option value="Aktiengesellschaft">Aktiengesellschaft</option>
                          <option value="BGB-Gesellschaft (GBR)">BGB-Gesellschaft (GBR)</option>
                          <option value="Genossenschaft">Genossenschaft</option>
                          <option value="GmbH & Co.KG">GmbH & Co.KG</option>
                          <option value="KG">KG</option>
                          <option value="Eingetragener Verein">Eingetragener Verein</option>
                          <option value="Stiftung">Stiftung</option>
                        </select>
                      </>
                    }
                    <input type="text" name="surname" placeholder="Straße" value={street} onChange={(e) => setStreet(e.target.value)} />
                    <input type="text" name="lastname" placeholder="Nr" value={streetNumber} onChange={(e) => setStreetNumber(e.target.value)} />
                    <input type="text" name="email" placeholder="PLZ" value={plz} onChange={(e) => setPLZ(e.target.value)} />
                    <input type="text" name="phone" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />

                    <section className="cid2-checkbox-container">
                      <section onClick={() => setCheckbox1(!checkbox1)} className="flex">
                        { checkbox1 ? <IoCheckbox size={19} /> : <div className="cid2-checkbox" /> }
                        <p>Meine Lieferadresse ist identisch mit der oben genannten Rechnungsadresse.</p>
                      </section>
                      <section onClick={() => setCheckbox2(!checkbox2)} className="flex">
                      { checkbox2 ? <IoCheckbox size={19} /> : <div className="cid2-checkbox" /> }
                        <p>Ich bin damit einverstanden, dass meine übermittelten Informationen zur Bearbeitung meiner Anfrage gespeichert werden. Ich bin mit einer Bonitätsprüfung einverstanden.</p>
                      </section>
                    </section>

                    <section className="flex flex-between">
                      <button type="button" onClick={() => setForm2(false)}>Abbrechen</button>
                      <button type="button" onClick={handleFinishForm2}>Speichern</button>
                    </section>
                  </Form>
                </>
              }

            <section>
            <section className="flex flex-between w100 w-100">
              <h2 className="h2-pay">Lieferdatum</h2>
              <p className="pointer" onClick={() => setForm3(true)}>Bearbeiten</p>
            </section>
            <section className="flex cid2-form-con cid2-form">
              <section>
                <p>Vorrausichtliches Lieferdatum: { format(new Date(shippingDate), 'dd.MM.yyyy', { locale: de })}</p>
              </section>
            </section>
              {
                form3 &&
                (
                  <>
                  <section className="flex">
                    <IoCalendarOutline size={20} className="icon-calendar" />
                    <button type="button" className="price-date" onClick={() => setShowPicker(true)}>
                      {
                        shippingDate ? 
                        format(new Date(shippingDate), 'dd.MM.yyyy', { locale: de })
                        :
                        'Datum auswählen'
                      }
                    </button>
                  </section>
                  <section className="flex flex-between">
                    <button type="button" onClick={() => setForm3(false)}>Abbrechen</button>
                    <button type="button" onClick={handleFinishForm3}>Speichern</button>
                  </section>
                  </>
                )
              }

            </section>
     
              </section>
              { selectedKM && selectedContract && fullContract && fullKM &&
                <PaymentStripe 
                    shipping_date={shippingDate} 
                    price={price ?? 0} 
                    car_id={car.id} 
                    car={car.name} 
                    km_id={selectedKM} 
                    km={fullKM.duration} 
                    contract={fullContract.duration}  
                    color={selectedColor} 
                    contract_id={selectedContract} 
                    metadata={{
                      surname,
                      lastname,
                      email: mail,
                      birthday,
                      phone,
                      city,
                      plz,
                      client: chooseClient,
                      street,
                      streetNumber,
                      legalForm: rechtsform,
                      company: unternehmen,
                    }} />
              }
  
              </section>

            </section>

          </section>
        <Footer />
      </>
    )
  } else {
    return (
      <>
        <Header />

        <section className="container flex cid-success">

        <FaCircleCheck size={60} color="#25cd13" />

        <h2>Vielen Dank!</h2>
        <h3>Wir werden uns umgehend bei Ihnen melden.</h3>

        <Link to="/autoabo">Zurück zu den Autos</Link>

        </section>

        <Footer />
      </>
    )
  }
}

export const loader = async ({ request, params }) => {
  let id = null;

  if(!params?.id) {
    throw new Error('Kein Auto gefunden.');
  }

  id = parseInt(params.id);


  console.log('ID');
  console.log(params.id);
  console.log(id);
  if(typeof id !== 'number') {
    throw new Error('No Integer')
  }

  if(id <= 0) {
    throw new Error('To Small');
  }

  if(id > 1000000) {
    throw new Error('Error');
  }

  try {
    const res = await pool2.query(`
    SELECT 
    ca.id,
    ca.name,
    ca.image,
    ca.availability,
    ca.annotation,
    ca.brand,
    ca.model,
    ca.model_year,
    ca.sit_places,
    ca.ps,
    ca.consumption,
    ca.tires,

    json_agg(json_build_object(
      'fuel', ca.fuel, 
      'engine', ca.engine,
      'type', ca.type
    )) AS details

    FROM car_abo ca WHERE ca.id = $1 GROUP BY ca.id

      LIMIT 1;
    `, [id]);

    const res2 = await pool2.query(`
    SELECT car_id as id, ARRAY_AGG(image) as images FROM car_images WHERE car_images.car_id = $1 GROUP BY car_images.car_id
`, [id]);

const res3 = await pool2.query(`
    SELECT cc.car_id as id, json_agg(json_build_object(
      'id', cc.id,
      'price', cc.price, 
      'duration', cc.duration
    )) AS durationcontract FROM car_contract cc WHERE cc.car_id = $1 GROUP BY cc.car_id
`, [id]);

const res4 = await pool2.query(`
    SELECT ck.car_id as id, json_agg(json_build_object(
      'id', ck.id,
      'price', ck.price, 
      'duration', ck.duration
    )) AS km FROM car_km ck WHERE ck.car_id = $1 GROUP BY ck.car_id
`, [id]);

var merged = _.merge(_.keyBy(res.rows, 'id'), _.keyBy(res2.rows, 'id'), _.keyBy(res3.rows, 'id'), _.keyBy(res4.rows, 'id'));
var values: ICar[] = _.values(merged);
return json(values[0]);

/*     if(res.rows.length > 0 && res2.rows.length > 0) {
      console.log('HERE');
      return json({
        ...res.rows[0],
        images: res2.rows[0].images
      });
    } else if(res.rows.length > 0 && res2.rows.length === 0) {
      console.log('HM')
      return json({
        ...res.rows[0],
        images: []
      });
    } else {
      console.log('ERR')
      throw new Error('Es wurde kein Auto gefunden.')
    } */


  } catch(e) {
    console.log(e);
    return e;
  }
};

export const action = async ({
  request,
  params
}) => {
  try {
    function validateEmail(email) {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
    }
    const formData = await request.formData();

    const fullname = formData.get('fullname') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const anliegen = formData.get('anliegen') as string;

    console.log(email);
    if(!validateEmail(email)) {
      return json({message: 'Deine Email ist nicht korrekt.', success: false});
    }

    if(fullname.length <= 2) {
      return json({message: 'Dein Name muss mehr als 2 Zeichen enthalten.', success: false});
    }

    if(email.length <= 5) {
      return json({message: 'Deine Email muss mehr als 5 Zeichen enthalten.', success: false});
    }

/*     const res = await Mail({
      surname: fullname,
      lastname: '',
      mail: email,
      phone,
      anliegen
    }); */

    console.log(res);

    return json({message: 'Erfolgreich.', success: true});
    

  } catch(e) {
    console.log(e);
    return json({err: 'Es ist ein Fehler unterlaufen'});
  }
};
