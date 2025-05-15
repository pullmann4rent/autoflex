import { useEffect, useRef, useState } from "react";
import { clickOutside } from "../ClickOutside/ClickOutside";
import { Link } from "@remix-run/react";
import Logo from '../../assets/logo_1.png';
import { BsCheck2Square } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { ValidatedForm } from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import { MyInput } from "../MyInput/MyInput";
import { MySelect2 } from "../MySelect2/MySelect2";
import { MySubmitButton } from "../MySubmitButton/MySubmitButton";
import { MySelect } from "../MySelect/MySelect";
import { MyTextArea } from "../MyTextarea/MyTextarea";
import { ICarNewImg } from "../Modal/ModalAddCar/types";

export interface IFormData {
  surname: string;
  lastname: string;
  phone: string;
  email: string;
  company: string;
  legal_form: string;
  info: string;
  car: { id: number; brand: string; model: string; } | null;
}

export function MeetingRequest({
  open,
  handleClose
}: { handleClose: (open: boolean) => void; open: boolean; }) {
  const [step, setStep] = useState<number>(1);
  const refWrapper = useRef<HTMLDivElement>(null);

  const [cars, setCars] = useState<{id: number; brand: string; model: string;}[]>([]);
  const [selectedCar, setSelectedCar] = useState<{id: number; brand: string; model: string;} | null>(null);

  const [legal, setLegal] = useState<string>('Einzelunternehmen');

  const [terminData, setTerminData] = useState<IFormData>({
    surname: '',
    lastname: '',
    phone: '',
    email: '',
    company: '',
    legal_form: '',
    info: '',
    car: null
  });


  const [addAnimation, setAddAnimation] = useState<boolean>(false);

  useEffect(() => {
    const to = setTimeout(() => setAddAnimation(true), 1);

    return () => clearTimeout(to);
  }, []);

  useEffect(() => {
    const getCars = async () => {
       try {
        const res = await fetch('/getCars', {
          method: 'GET',
        });

        const json:{id: number; brand: string; model: string;}[] = await res.json();

        setCars(json);
        setSelectedCar(json[0]);
        return json;
       } catch(e) {
        console.log(e);
       }
    };

    getCars();
  }, []);


  console.log(cars);
// Using yup in this example, but you can use anything
const validator = withZod(
  z.object({
    surname: z.string({
      required_error: 'Dein Vorname muss ausgefüllt werden.'
    }).min(1, 'Dein Vorname muss ausgefüllt werden.').max(50, 'Maximal 50 Zeichen im Vornamen erlaubt.'),
    lastname: z.string({
      required_error: 'Dein Nachname muss ausgefüllt werden.'
    }).min(1, 'Dein Nachname muss ausgefüllt werden.').max(50, 'Maximal 50 Zeichen im Nachnamen erlaubt.'),
    email: z.string({
      required_error: 'Deine E-Mail muss ausgefüllt werden.'
    }).min(3, 'Deine E-Mail ist ungültig.').max(100).email('Deine E-Mail ist nicht gültig.'),
    phone: z.string({
      required_error: 'Deine Telefonnummer muss ausgefüllt werden.'
    }).min(4, 'Deine Telefonnummer ist ungültig.').max(24, 'Maximal 24 Zeichen erlaubt in der Telefonnummer.').refine((value) => /^(?=.*\d)[\d ]+$/.test(value), 'Deine Telefonnummer ist ungültig.')
  })
);

  // Using yup in this example, but you can use anything
  const validator2 = withZod(
    z.object({
      company: z.string({
        required_error: 'Dein Unternehmen muss ausgefüllt werden.'
      }).min(1, 'Dein Unternehmen muss ausgefüllt werden.').max(100, 'Maximal 100 Zeichen im Unternehmen erlaubt.'),
    })
  );

  // Using yup in this example, but you can use anything
  const validator3 = withZod(
    z.object({
      info: z.string({
        required_error: 'Bitte gebe eine Beschreibung an.'
      }).min(1, 'Mindestens 10 Zeichen eingeben.').max(2500, 'Maximal 2500 Zeichen erlaubt.'),
    })
  );

  clickOutside(refWrapper, () => {
    handleClose(false);
  })
  return (
    <>
     <section ref={refWrapper}>
          <section className={`termin-inner ${addAnimation && 'add-animation'}`}>
            <section className="container termin-container flex">

              <section className="termin-first">
                <Link to="/" className="logo-link flex">
                  <img src={Logo} alt="Logo" />
                </Link>
                <h3 className="mb-6">KOSTENLOSES GESPRÄCH</h3>
                <h4 className="mb-6">Jedes Projekt beginnt mit einem persöhnlichen Gespräch auf Augenhöhe.</h4>
                <ul className="termin-ul">
                  <li><BsCheck2Square size={24} color='orange' className="check-icon" />Welche, Wünsche Ziele und Vorstellung haben Sie?</li>
                  <li><BsCheck2Square size={24} color='orange' className="check-icon" />Welche, Möglichkeiten gibt es und was ist für Sie sinnvoll?</li>
                  <li><BsCheck2Square size={24} color='orange' className="check-icon" />In welchen Preisrahmen bewegen wir uns, um Ihre Ziele zu erreichen?</li>
                </ul>
                <p>Selbstverständlich ist das erste Kennenlerngespräch für Sie unverbindlich.</p>
                <p>Senden Sie uns einige Informationen, damit wir uns auf das Gespräch vorbereiten können und zwei Terminvorschläge, die Ihnen am Besten passen würden.</p>
              </section>

              <section className="termin-second relative">
                <section className="close-termin-btn">
                  <button type="button" onClick={() => handleClose(false)}>
                    <AiOutlineClose size={28} color="#fff" />
                  </button>
                </section>
                <h2 className="mb-24">In nur drei Schritten zum Wunschfahrzeug</h2>
                <section className="form-process">
                  <span className="line-form" />
                  <ul className="process-ul flex">
                    <li className="flex ai-c">
                      <span className={`${step === 1 ? 'active-step' : ''}`}>1</span>
                      <p>Ihre Informationen</p>
                    </li>

                    <li className="flex ai-c">
                      <span className={`${step === 2 ? 'active-step' : ''}`}>2</span>
                      <p>Unternehemensinformationen</p>
                    </li>

                    <li className="flex ai-c">
                      <span className={`${step === 3 ? 'active-step' : ''}`}>3</span>
                      <p>Terminvorschlag</p>
                    </li>
                  </ul>
                </section>

                { step === 1 &&
                <ValidatedForm method="post" onSubmit={async (e) => {
                  console.log(e);
                  try {
                    setTerminData({
                      ...terminData,
                      surname: e.surname,
                      lastname: e.lastname,
                      phone: e.phone,
                      email: e.email,
                      car: selectedCar
                    });
                    setStep(2);
                    return null;
                  } catch(e) {
                    console.log(e);
                    return e;
                  }
                }} validator={validator} className="process-form">
                  <input type="hidden" name="form" value="process-form" />
                  
                  <section className="field">
                    <MyInput type="text" className="input-alone" name="surname" placeholder="Vorname" />
                    <MyInput type="text" className="input-alone" name="lastname" placeholder="Nachname" />
                  </section>

                  <section className="field">
                    <MyInput type="text" className="input-alone" name="phone" placeholder="Telefonnummer" />
                    <MyInput type="text" className="input-alone" name="email" placeholder="E-Mail" />
                  </section>

                  <section className="field">
                   <MySelect2 onChange={(e) => setSelectedCar(cars.find((el => el.id === e.currentTarget.value)))} className="input-alone" name="car">
                      {
                        cars.map((el, i) => (
                          <option key={el.id} value={el.id}>{el.brand} {el.model}</option>
                        ))
                      }
                    </MySelect2>
                  </section>

                  <MySubmitButton />
                </ValidatedForm>
              }
              
              { step === 2 &&
                <ValidatedForm method="post" onSubmit={async (e) => {
                  try {
                    setTerminData({
                      ...terminData,
                      company: e.company,
                      legal_form: legal
                    });
                    setStep(3);
                    return null;
                  } catch(e) {
                    console.log(e);
                    return e;
                  }
                }} validator={validator2} className="process-form">
                  <input type="hidden" name="form" value="process-form" />
                  
                  <section className="field no-dc">
                    <MyInput type="text" className="input-alone" name="company" placeholder="Ihr Unternehmen" />
                    <MySelect onChange={(e) => setLegal(e.currentTarget.value)} className="input-alone" name="legal_form" />
                  </section>

                  <MySubmitButton />
                </ValidatedForm>
              }

              { step === 3 &&
                <ValidatedForm method="post" onSubmit={async (e) => {
                  console.log(e);
                  try {
                    const data = await fetch('/form', {
                      method: 'POST',
                      
                      body: JSON.stringify({
                        ...terminData,
                        info: e.info
                      })
                    });

                    const res = await data.json();

                    console.log(res);
                    setStep(4);
                    return null;
                  } catch(e) {
                    console.log(e);
                    return e;
                  }
                }} validator={validator3} className="process-form">
                  <input type="hidden" name="form" value="process-form" />
                  
                  <section className="field field-area">
                    <MyTextArea name="info" className="textarea-input" placeholder="Terminvorschläge und Hintergrundinformationen" />
                  </section>

                  <MySubmitButton />
                </ValidatedForm>
              }

              {
                step === 4 && (
                  <>
                    <h3>Vielen Dank für Ihr Interesse!</h3>
                    <p>Wir werden uns umgehend bei Ihnen melden.</p>
                  </>
                )
              }
              </section>

            </section>
          </section>
        </section>
    </>
  )
}