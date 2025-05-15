import { useEffect, useRef, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsCheck2, BsDot } from "react-icons/bs";
import { useRanger, Ranger } from '@tanstack/react-ranger'
import { DayPicker, Footer } from 'react-day-picker';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { IoCalendarOutline } from "react-icons/io5";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import { json } from "@remix-run/node";
import pool2 from "~/data/db.server";
import _ from 'lodash';
import { ICar } from "~/components/CarBoxRenew/types";
import { Header } from "~/components/Header/Header";
import { sortByHighest, sortByLowest } from "~/utils/sortBy";
import '../styles/shared.css';
import '../styles/index.css';
import "react-day-picker/style.css";

const removeTimezone = (date: Date) => {
  var timeZoneDifference = (date.getTimezoneOffset() / 60) * -1; //convert to positive value.
  date.setTime(date.getTime() + timeZoneDifference * 60 * 60 * 1000);
  date.toISOString();

  return date.toISOString();
};

export interface ICarAbo {
  id: number;
  brand: string; // Marke
  model: string; // Modell
  fuel: string; // Kraftstoff
  car_type: string; // Fahrzeugtyp
  price: number; // Preis
  duration: number; // Laufzeit
  availability: string; // Verfügbarkeit
  engine: string; // Getriebe
  card_annotation: string;
  image: string;
  images: string[];
}

export interface ICarAboCard {
  id: number;
  image: string;
  images: string[];
  name: string;
  card_annotation: string;
  engine: string;
  fuel: string;
  price: number;
}

export const cars: ICarAboCard[] = [
  {
    id: 1,
    name: 'Mercedes-Benz C63s AMG',
    image: 'https://res.cloudinary.com/do8ssnxjw/image/upload/v1708533144/nvcejxhzb75kwbvhq3rc.png',
    card_annotation: 'RS',
    engine: 'Automatik',
    fuel: 'Benzin',
    price: 49,
    images: []
  },
  {
    id: 2,
    name: 'Audi R8',
    image: 'https://res.cloudinary.com/do8ssnxjw/image/upload/v1708533003/sdjxkv1a3l9cfjoiiwc6.png',
    card_annotation: 'RS',
    engine: 'Automatik',
    fuel: 'Benzin',
    price: 519,
    images: []
  },
  {
    id: 3,
    name: 'Audi RS3',
    image: 'https://res.cloudinary.com/do8ssnxjw/image/upload/v1708533093/awg9swnxkpyj11l349wm.png',
    card_annotation: 'RS',
    engine: 'Automatik',
    fuel: 'Benzin',
    price: 499,
    images: []
  },
  {
    id: 4,
    name: 'Audi R8',
    image: 'https://res.cloudinary.com/do8ssnxjw/image/upload/v1708533003/sdjxkv1a3l9cfjoiiwc6.png',
    card_annotation: 'RS',
    engine: 'Automatik',
    fuel: 'Benzin',
    price: 519,
    images: []
  },
  {
    id: 5,
    name: 'Audi RS3',
    image: 'https://res.cloudinary.com/do8ssnxjw/image/upload/v1708533093/awg9swnxkpyj11l349wm.png',
    card_annotation: 'RS',
    engine: 'Automatik',
    fuel: 'Benzin',
    price: 499,
    images: []
  }
]

export const brands: string[] = ['Mercedes-Benz', 'BMW', 'Opel']; 

export const tires: string[] = ['Ganzjahresreifen', 'Sommerreifen', 'Winterreifen'];

export const model: {
  car_id: number;
  name: string;
  model: string[]
}[] = [
  {
    car_id: 1,
    name: 'Audi',
    model: [
      'A1',
      'A2',
      'A3',
      'A4',
      'A4 Allrad',
      'A5',
      'A6',
      'A6  Allrad',
      'A7',
      'A8',
      'Cabriolet',
      'Coupe',
      'e-tron',
      'e-tron GT',
      'Q1',
      'Q2',
      'Q3',
      'Q4 e-tron',
      'Q5',
      'Q7',
      'Q8',
      'Q8 e-tron',
      'QUATTRO',
      'R8',
      'RS',
      'RS e-tron GT',
      'RS Q3',
      'RS Q5',
      'RS Q8',
      'RS2',
      'RS3',
      'RS4',
      'RS5',
      'RS6',
      'RS7',
      'S1',
      'S2',
      'S3',
      'S4',
      'S5',
      'S6',
      'S7',
      'S8',
      'SQ2',
      'SQ3',
      'SQ5',
      'SQ7',
      'SQ8',
      'SQ8 e-tron',
      'TT',
      'TT RS',
      'TTS',
      'V8'

      ]
  },
  {
    car_id: 2,
    name: 'Opel',
    model: [
      'Adam',
      'Agila',
      'Ampera',
      'Ampera-E',
      'Antara',
      'Arena',
      'Ascona',
      'Astra',
      'Calibra',
      'Campo',
      'Cascada',
      'Combo',
      'Combo Life',
      'Combo-e',
      'Combo-e Life',
      'Commodore',
      'Corsa',
      'Corsa-e',
      'Crossland',
      'Crossland X',
      'Diplomat',
      'Frontera',
      'Grandland',
      'Grandland X',
      'GT',
      'Insignia',
      'Kadett',
      'Karl',
      'Manta',
      'Meriva',
      'Mokka',
      'Mokka X',
      'Mokka-E',
      'Monterey',
      'Omega',
      'Rekord',
      'Rocks-e',
      'Senator',
      'Signum',
      'Sintra',
      'Speedster',
      'Tigra',
      'Vectra',
      'Vivaro',
      'Vivaro-e',
      'Zafira',
      'Zafira Life',
      'Zafira Tourer'
    ]
  },
  {
    car_id: 3,
    name: 'Mercedes-Benz',
    model: [
      'A 140',
      'A 150',
      'A 160',
      'A 170',
      'A 180',
      'A 190',
      'A 200',
      'A 210',
      'A 220',
      'A 250',
      'A 35 AMG',
      'A 45 AMG',
      'Actros',
      'AMG GT',
      'B 150',
      'B 160',
      'B 170',
      'B 180',
      'B 200',
      'B 220',
      'B 250',
      'B Electric Drive',
      'C 160',
      'C 180',
      'C 200',
      'C 220',
      'C 230',
      'C 240',
      'C 250',
      'C 270',
      'C 280',
      'C 30 AMG',
      'C 300',
      'C 32 AMG',
      'C 320',
      'C 350',
      'C 36 AMG',
      'C 400',
      'C 43 AMG',
      'C 450',
      'C 55 AMG',
      'C 63 AMG',
      'C 63s AMG',

      'CE 200',
      'CE 220',
      'CE 230',
      'CE 280',
      'CE 300',
      'Citan',

      'CL 160',
      'CL 180',
      'CL 200',
      'CL 220',
      'CL 230',
      'CL 320',
      'CL 420',
      'CL 500',
      'CL 55 AMG',
      'CL 600',
      'CL 63 AMG',
      'CL 65 AMG',

      'CLA 180',
      'CLA 200',
      'CLA 220',
      'CLA 250',
      'CLA 35 AMG',
      'CLA 45 AMG',

      'CLK 200',
      'CLK 220',
      'CLK 230',
      'CLK 240',
      'CLK 270',

      'CLK 280',
      'CLK 320',
      'CLK 350',
      'CLK 430',
      'CLK 500',

      'CLK 55 AMG',
      'CLK 63 AMG',

      'CLS 220',
      'CLS 250',
      'CLS 280',
      'CLS 300',
      'CLS 350',
      'CLS 400',
      'CLS 450',
      'CLS 500',
      'CLS 53 AMG',
      'CLS 55 AMG',
      'CLS 63 AMG',

      'E 200',
      'E 220',
      'E 230',
      'E 240',
      'E 250',
      'E 260',
      'E 270',
      'E 280',
      'E 290',

      'E 300',
      'E 320',
      'E 350',
      'E 36 AMG',
      'E 400',
      'E 420',
      'E 43 AMG',
      'E 430',
      'E 450',

      'E 50 AMG',
      'E 500',
      'E 53 AMG',
      'E 60 AMG',
      'E 63 AMG',

      'EQA 250',
      'EQA 300',
      'EQA 350',

      'EQB 250',
      'EQB 300',
      'EQB 350',

      'EQC 400',

      'EQE 300',
      'EQE 350',

      'EQE 43 AMG',
      'EQE 500',
      'EQE 53 AMG',
      'EQE SUV',

      'EQS',
      'EQS SUV',
      'EQT',
      'EQV 250',
      'EQV 300',

      'G 230',
      'G 240',
      'G 250',
      'G 270',
      'G 280',
      'G 290',
      'G 300',
      'G 320',
      'G 350',
      'G 400',
      'G 500',
      'G 55 AMG',
      'G 63 AMG',
      'G 65 AMG',
      'G 650',

      'GL 320',
      'GL 350',
      'GL 400',
      'GL 420',
      'GL 450',
      'GL 500',
      'GL 55 AMG',
      'GL 63 AMG',

      'GLA 180',
      'GLA 200',
      'GLA 220',
      'GLA 250',
      'GLA 35 AMG',
      'GLA 45 AMG',
      
      'GLB 180',
      'GLB 200',
      'GLB 220',
      'GLB 250',
      'GLB 35 AMG',

      'GLC 200',
      'GLC 220',
      'GLC 250',
      'GLC 300',
      'GLC 350',
      'GLC 400',
      'GLC 43 AMG',
      'GLC 450',
      'GLC 63 AMG',

      'GLE 250',
      'GLE 300',
      'GLE 350',
      'GLE 400',
      'GLE 43 AMG',
      'GLE 450',
      'GLE 500',
      'GLE 53 AMG',
      'GLE 580',
      'GLE 63 AMG',

      'GLK 200',
      'GLK 220',
      'GLK 250',
      'GLK 280',
      'GLK 300',
      'GLK 320',
      'GLK 350',

      'GLS 350',
      'GLS 400',
      'GLS 450',
      'GLS 500',
      'GLS 580',
      'GLS 600',
      'GLS 63 AMG',

      'ML 230',
      'ML 250',
      'ML 270',
      'ML 280',
      'ML 300',
      'ML 320',
      'ML 350',
      'ML 400',
      'ML 420',
      'ML 430',
      'ML 450',
      'ML 500',
      'ML 55 AMG',
      'ML 63 AMG',
      
      'Maybach GLS',
      'Maybach S-Klasse',

      'S 250',
      'S 260',
      'S 280',
      'S 300',
      'S 320',
      'S 350',
      'S 380',
      'S 400',
      'S 420',
      'S 430',
      'S 450',
      'S 500',
      'S 55 AMG',
      'S 550',
      'S 560',
      'S 560 E',
      'S 580',
      'S 600',
      'S 63 AMG',
      'S 65 AMG',
      'S 650',
      'S 680',

      'SL 230',
      'SL 250',
      'SL 280',
      'SL 300',
      'SL 320',
      'SL 350',
      'SL 380',
      'SL 400',
      'SL 420',
      'SL 43 AMG',
      'SL 450',
      'SL 500',
      'SL 55 AMG',
      'SL 560',
      'SL 60 AMG',
      'SL 63 AMG',
      'SL 65 AMG',
      'SL 70 AMG',
      'SL 73 AMG',

      'SLK 200',
      'SLK 230',
      'SLK 250',
      'SLK 280',
      'SLK 300',
      'SLK 32 AMG',
      'SLK 320',
      'SLK 350',
      'SLK 55 AMG',
      'SLR',
      'SLS',
      'Sprinter',
      'V 200',
      'V 220',
      'V 230',
      'V 250',
      'V 280',
      'V 300',
      'Vito',
      'Vaneo',
      'Vario',
      'Viano',
    ]
  },
  {
    car_id: 4,
    name: 'BMW',
    model: [
      '114',
      '116',
      '118',
      '120',
      '123',
      '125',
      '128',
      '130',
      '135',
      '140',
      
      '214',
      '216',
      '218',
      '220',
      '223',
      '225',
      '228',
      '230',
      '235',
      '240',

      '315',
      '316',
      '318',
      '320',
      '323',
      '324',
      '325',
      '328',
      '330',
      '335',
      '340',

      'Active Hybrid 3',

      '418',
      '420',
      '425',
      '430',
      '435',
      '440',
      
      '518',
      '520',
      '523',
      '524',
      '525',
      '528',
      '530',
      '535',
      '540',
      '545',
      '550',
      'Active Hybrid 5',

      '620',
      '628',
      '630',
      '633',
      '635',
      '640',
      '645',
      '650',

      '725',
      '728',
      '730',
      '732',
      '735',
      '740',
      '745',
      '750',
      '760',
      'Active Hybrid 7',

      '830',
      '840',
      '850',

      'i3',
      'i4',
      'i5',
      'i7',
      'i8',
      'iX',
      'iX1',
      'iX2',
      'iX3',
      
      'M1',
      'M2',
      'M3',
      'M4',
      'M5',
      'M 550',
      'M6',
      'M8',
      'M 850',
      'Active Hybrid X6',
      'X1',
      'X2',
      'X2 M',
      'X3',
      'X3 M',
      'X4',
      'X4 M',
      'X5',
      'X5 M',
      'X6',
      'X6 M',
      'X7',
      'X7 M',
      'XM',

      'Z1',
      'Z3',
      'Z3 M',
      'Z4',
      'Z4 M',
      'Z8'
    ]
  }
];

export const fuel: string[] = ['Benzin', 'Diesel', 'Elektro'];

export const car_type: string[] = ['Coupé', 'Cabrio', 'Kombi', 'Kleinwagen', 'Limousine', 'SUV', 'Van'];

export const duration: string[] = ["12 Monate", "24 Monate", "32 Monate", "48 Monate"];

export const engine: string[] = ["Automatik", "Manuell"];

const options = [
  {
    value: 1,
    label: 'Normal'
  },
  {
    value: 2,
    label: 'Preis aufsteigend'
  },
  {
    value: 3,
    label: 'Preis absteigend'
  },
  {
    value: 4,
    label: 'Schnellste Verfügbarkeit'
  },
];

export default function Autoabo() {
  const loader: ICar[] = useLoaderData() as ICar[];

  const [searchParams, setSearchParams] = useSearchParams();

  const params = new URLSearchParams();

  const [Select, setSelect] = useState();

    useEffect(() => {
    import("react-dropdown-select").then((Module) => {
      setSelect(() => Module.default);
    });
  }, []);

  const [open, setOpen] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string[]>([]);
  const [selectedFuel, setSelectedFuel] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState<string[]>([]);
  const [selectedEngine, setSelectedEngine] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<number | null>(null);

  const [showPicker, setShowPicker] = useState<boolean>(false);

  const rangerRef = useRef<HTMLDivElement>(null)
  const [values, setValues] = useState<ReadonlyArray<number>>([
    49, 2000,
  ]);

  const [models, setModels] = useState<{
    car_id: number;
    name: string;
    model: string[]
  }[]>([]);

  const rangerInstance = useRanger<HTMLDivElement>({
    getRangerElement: () => rangerRef.current,
    values,
    min: 49,
    max: 2000,
    stepSize: 1,
    onChange: (instance: Ranger<HTMLDivElement>) =>
      setValues(instance.sortedValues),
  })

  const handleOpen = (val: string) => {
    if(!open.includes(val)) {
      setOpen(el => ([...el, val]));
    } else {
      setOpen(el => el.filter((e => e !== val)))
    }
  };

  useEffect(() => {
    if(selectedBrands.length > 0) {
      params.set('brands', `${selectedBrands.join(',')}`);
    } else if(searchParams.get('brands')) {
      params.set('brands', searchParams.get('brands'));
    } else if(selectedBrands.length === 0) {
      params.delete('brands');
    }

    if(selectedModel.length > 0) {
      params.set('models', `${selectedModel.join(',')}`);
    } else if(searchParams.get('models')) {
      params.set('models', searchParams.get('models'));
    } else if(selectedModel.length === 0) {
      params.delete('models');
    }

    if(selectedFuel.length > 0) {
      params.set('fuel', `${selectedFuel.join(',')}`);
    } else if(selectedFuel.length === 0) {
      params.delete('fuel');
    }

    if(selectedType.length > 0) {
      params.set('type', `${selectedType.join(',')}`);
    } else if(selectedType.length === 0) {
      params.delete('type');
    }

    if(values[0] !== 49) {
      params.set('price_min', `${values[0]}`);
    } else {
      params.delete('price_min');
    }

    if(values[1] !== 2000) {
      params.set('price_max', `${values[1]}`);
    } else {
      params.delete('price_max');
    }

    if(selectedDuration.length > 0) {
      let v = selectedDuration.map((el => el.slice(0, 2)));
      params.set('duration', `${v.join(',')}`);
    } else if(selectedDuration.length === 0) {
      params.delete('duration');
    }

    if(selectedDate) {
      params.set('available', selectedDate.toISOString());
    } else {
      params.delete('available');
    }

    if(selectedEngine.length > 0) {
      params.set('engine', `${selectedEngine.join(',')}`);
    } else if(selectedEngine.length === 0) {
      params.delete('engine');
    }

    if(sortBy !== null) {
      params.set('sort_by', `${sortBy}`);
    } else {
      params.delete('sort_by');
    }

    setSearchParams(params, {
      preventScrollReset: true,
    });
  }, [
    selectedBrands,
    selectedModel,
    selectedFuel,
    selectedType,
    values,
    selectedDuration,
    selectedDate,
    selectedEngine,
    sortBy
  ]);

  const handleSelectBrands = (val: string) => {
    if(!selectedBrands.includes(val)) {
      setSelectedBrands(el => ([...el, val]));
      const car =  model.find((e => e.name === val));
      if(car) {
        setModels(el => [...el, car]);
      }
    } else {
      setModels(el => el.filter((el => el.name !== val)));
      setSelectedBrands(el => el.filter((e => e !== val)));
    }
  };

  useEffect(() => {
   // console.log(models);
  }, [models]);

  const handleSelectModel = (val: string) => {
    if(!selectedModel.includes(val)) {
      setSelectedModel(el => ([...el, val]));
    } else {
      setSelectedModel(el => el.filter((e => e !== val)));
    }
  };

  const handleSelectFuel = (val: string) => {
    if(!selectedFuel.includes(val)) {
      setSelectedFuel(el => ([...el, val]));
    } else {
      setSelectedFuel(el => el.filter((e => e !== val)));
    }
  };

  const handleSelectType = (val: string) => {
    if(!selectedType.includes(val)) {
      setSelectedType(el => ([...el, val]));
    } else {
      setSelectedType(el => el.filter((e => e !== val)));
    }
  };

  const handleSelectDuration = (val: string) => {
    if(!selectedDuration.includes(val)) {
      setSelectedDuration(el => ([...el, val]));
    } else {
      setSelectedDuration(el => el.filter((e => e !== val)));
    }
  };

  const handleSelectEngine = (val: string) => {
    if(!selectedEngine.includes(val)) {
      setSelectedEngine(el => ([...el, val]));
    } else {
      setSelectedEngine(el => el.filter((e => e !== val)));
    }
  };

  const handleSelectDate = (e: any) => {
    setSelectedDate(e);
    setShowPicker(false);
  };
  return (
    <>
      <Header />
 
      <section className="container container-lg carabo">

        <h3>Auto Abo</h3>
        <h4>Fahrzeuge</h4>

        { showPicker &&
          <section className="modal" onClick={() => setShowPicker(false)}>
            <section className="modal-content md-date" onClick={(e) => e.stopPropagation()}>
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={handleSelectDate}
                locale={de}
              />
            </section>
          </section>
          }

        <section className="flex flex-wrap carabo-inner">

          <section className="search-list">

            <section className="search-item">
              <section onClick={() => handleOpen('brand')} className="search-header flex flex-between as">
                <p>Marke</p>
                <MdOutlineKeyboardArrowDown className={`${open.includes('brand') && 'animate-arrow'}`} size={24} color={'#333'} />
              </section>

              <section className={`search-data search-brand ${open.includes('brand') && 'open-search'}`}>
                {
                  brands.map((el => {
                    return (
                      <section onClick={() => handleSelectBrands(el)} key={el} className="search-inner flex">
                        { selectedBrands.includes(el) ?
                          <div className="checkbox-search search-black">
                            <BsCheck2 color="#fff" size={18} />
                          </div>
                          :
                          <div className="checkbox-search" />
                        }
                        <li>{el}</li>
                      </section>
                    )
                  }))
                }
              </section>
            </section>

            <section className="search-item">
            <section onClick={() => handleOpen('model')} className="search-header flex flex-between as">
                <p className={`modell ${models.length === 0 && 'grey-marked'}`}>Modell</p>
                <MdOutlineKeyboardArrowDown 
                  className={`${open.includes('model') && models.length > 0 && 'animate-arrow'}`} 
                  size={24} 
                  color={`${models.length === 0 ? '#999' : '#333'}`} />
              </section>

              <section className={`search-data search-model ${open.includes('model') && models.length > 0 && 'open-search'}`}>
                {
                  models.map((el => {
                    return (
                      <section key={el.car_id} className="search-inner">
                        <h3>{el.name}</h3>
                        {
                          el.model.map((e => {
                            return (
                              <section key={e} onClick={() => models.length > 0 ? handleSelectModel(e) : {}} className="search-inner flex">
                                { selectedModel.includes(e) ?
                                  <div className="checkbox-search search-black">
                                    <BsCheck2 color="#fff" size={18} />
                                  </div>
                                  :
                                  <div className="checkbox-search" />
                                }
                                <li>{e}</li>
                              </section>
                            )
                          }))
                        }
                      </section>
                    )
                  }))
                }
              </section>
            </section>

            <section className="search-item">
              <section onClick={() => handleOpen('fuel')} className="search-header flex flex-between as">
                <p>Kraftstoff</p>
                <MdOutlineKeyboardArrowDown className={`${open.includes('fuel') && 'animate-arrow'}`} size={24} color={'#333'} />
              </section>

              <section className={`search-data search-fuel ${open.includes('fuel') && 'open-search'}`}>
                {
                  fuel.map((el => {
                    return (
                      <section onClick={() => handleSelectFuel(el)} key={el} className="search-inner flex">
                        { selectedFuel.includes(el) ?
                          <div className="checkbox-search search-black">
                            <BsCheck2 color="#fff" size={18} />
                          </div>
                          :
                          <div className="checkbox-search" />
                        }
                        <li>{el}</li>
                      </section>
                    )
                  }))
                }
              </section>
            </section>

            <section className="search-item">
              <section onClick={() => handleOpen('type')} className="search-header flex flex-between as">
                <p>Fahrzeugtyp</p>
                <MdOutlineKeyboardArrowDown className={`${open.includes('type') && 'animate-arrow'}`} size={24} color={'#333'} />
              </section>

              <section className={`search-data search-type ${open.includes('type') && 'open-search'}`}>
                {
                  car_type.map((el => {
                    return (
                      <section onClick={() => handleSelectType(el)} key={el} className="search-inner flex">
                        { selectedType.includes(el) ?
                          <div className="checkbox-search search-black">
                            <BsCheck2 color="#fff" size={18} />
                          </div>
                          :
                          <div className="checkbox-search" />
                        }
                        <li>{el}</li>
                      </section>
                    )
                  }))
                }
              </section>
            </section>

            <section className="search-item">
              <section onClick={() => handleOpen('price')} className="search-header flex flex-between as">
                <p>Preis</p>
                <MdOutlineKeyboardArrowDown className={`${open.includes('price') && 'animate-arrow'}`} size={24} color={'#333'} />
              </section>
              
              <section className={`search-data search-price ${open.includes('price') && 'open-search'}`}>
                <section style={{height: 50, padding: 16}}>
                  <div
                    ref={rangerRef}
                    style={{
                      position: 'relative',
                      userSelect: 'none',
                      height: '4px',
                      background: '#e5e5e5',
                      borderRadius: '2px',
                    }}
                  >
                    {rangerInstance
                      .handles()
                      .map(
                        (
                          {
                            value,
                            onKeyDownHandler,
                            onMouseDownHandler,
                            onTouchStart,
                            isActive,
                          },
                          i,
                        ) => (
                          <button
                            key={i}
                            onKeyDown={onKeyDownHandler}
                            onMouseDown={onMouseDownHandler}
                            onTouchStart={onTouchStart}
                            role="slider"
                            aria-valuemin={rangerInstance.options.min}
                            aria-valuemax={rangerInstance.options.max}
                            aria-valuenow={value}
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: `${rangerInstance.getPercentageForValue(value)}%`,
                              zIndex: isActive ? '1' : '0',
                              transform: 'translate(-50%, -50%)',
                              width: '20px',
                              height: '20px',
                              outline: 'none',
                              borderRadius: '100%',
                              background: '#fff',
                              border: 'solid 1px #ccc',
                            }}
                          />
                        ),
                      )}
                  </div>

                </section>
                
                <section className="flex flex-center carabo-price">
                    <section className="box-min">
                      <h3>Min. Preis</h3>
                      <section className="flex flex-center">
                        <input type="number" onChange={(e) => setValues([e.target.value.toString().replace('.', ''), values[1]])} value={values[0]} defaultValue={values[0]} max={2000} />
                        <span className="eur">€</span>
                      </section>
                    </section>

                    <section className="box-max">
                      <h3>Max. Preis</h3>
                        <section className="flex flex-center">
                          <input type="number" onChange={(e) => setValues([values[0], e.target.value.toString().replace('.', '')])} value={values[1]} defaultValue={values[1]} max={2000} />
                        <span className="eur">€</span>
                      </section>
                    </section>
                  </section>
                  <section className="flex flex-center">
                    <button type="button" className="reset-price" onClick={() => setValues([49, 2000])}>Zurücksetzen</button>
                  </section>
              </section>
            </section>

            <section className="search-item">
              <section onClick={() => handleOpen('duration')} className="search-header flex flex-between as">
                <p>Laufzeit</p>
                <MdOutlineKeyboardArrowDown className={`${open.includes('duration') && 'animate-arrow'}`} size={24} color={'#333'} />
              </section>

              <section className={`search-data search-duration ${open.includes('duration') && 'open-search'}`}>
                {
                  duration.map((el => {
                    return (
                      <section onClick={() => handleSelectDuration(el)} key={el} className="search-inner flex">
                        { selectedDuration.includes(el) ?
                          <div className="checkbox-search search-black">
                            <BsCheck2 color="#fff" size={18} />
                          </div>
                          :
                          <div className="checkbox-search" />
                        }
                        <li>{el}</li>
                      </section>
                    )
                  }))
                }
              </section>
            </section>

            <section className="search-item">
              <section onClick={() => handleOpen('availability')} className="search-header flex flex-between as">
                <p>Verfügbarkeit</p>
                <MdOutlineKeyboardArrowDown className={`${open.includes('availability') && 'animate-arrow'}`} size={24} color={'#333'} />
              </section>

              <section className={`search-data search-availability flex flex-center fd relative ${open.includes('availability') && 'open-search'}`}>
                <section className="flex">
                  <IoCalendarOutline size={20} className="icon-calendar" />
                  <button type="button" className="price-date" onClick={() => setShowPicker(true)}>
                    {
                      selectedDate ? 
                      format(new Date(selectedDate), 'dd.MM.yyyy', { locale: de })
                      :
                      'Datum auswählen'
                    }
                  </button>
                </section>

                <button type="button" className="reset-date" onClick={() => setSelectedDate(null)}>Zurücksetzen</button>
              </section>
            </section>

            <section className="search-item">
              <section onClick={() => handleOpen('engine')} className="search-header flex flex-between as">
                <p>Getriebe</p>
                <MdOutlineKeyboardArrowDown className={`${open.includes('engine') && 'animate-arrow'}`} size={24} color={'#333'} />
              </section>

              <section className={`search-data search-engine ${open.includes('engine') && 'open-search'}`}>
                {
                  engine.map((el => {
                    return (
                      <section onClick={() => handleSelectEngine(el)} key={el} className="search-inner flex">
                        { selectedEngine.includes(el) ?
                          <div className="checkbox-search search-black">
                            <BsCheck2 color="#fff" size={18} />
                          </div>
                          :
                          <div className="checkbox-search" />
                        }
                        <li>{el}</li>
                      </section>
                    )
                  }))
                }
              </section>
            </section>

          </section>

          <section className="car-list">

            <section className="car-list-header flex flex-between">
              <section className="clh1">
                <p>{loader.length} Fahrzeuge</p>
              </section>

              <section className="clh1">
                { Select &&
                  <Select
                    options={options} 
                    onChange={(values) => setSortBy(values[0].value === 1 ? null : values[0].value)} 
                    style={{width: 230}}
                    placeholder="Sortieren Nach"
                  />
                }
              </section>
            </section>
              
            <section className="cars flex flex-wrap">
              {
                loader.map((el => (
                  <>
                    <Link to={`/car_abo/${el.id}`} className="carabo-card">
                      <section className="ca-img-con">
                        <img src={el.image} alt="Auto" />
                      </section>
                      <p className="ca-name">{el.name}</p>
                      <ul className="ca-ul">
                        <li>{el.annotation}</li>
                        <span className="ca-dot"><BsDot /></span>
                        <li>{el.details[0].engine}</li>
                        <span className="ca-dot"><BsDot /></span>
                        <li>{el.details[0].fuel}</li>
                      </ul>
                      <section className="ca-price-con flex">
                        <p>ab {el.durationcontract[0].price}€</p>
                        <span>pro Monat</span>
                      </section>
                    </Link>
                  </>
                )))
              }
            </section>

          </section>

        </section>

      </section>
      <Footer />
    </>
  )
}

export const loader = async ({ request, params }) => {
  const search = new URL(request.url).searchParams;

  const brands = search.get('brands')?.split(',');

  const models = search.get('models')?.split(',');

  const fuel = search.get('fuel')?.split(',');

  const type = search.get('type')?.split(',');

  const price_min = search.get('price_min');

  const price_max = search.get('price_max');

  const duration = search.get('duration')?.split(',');

  const available = search.get('available');

  const engine = search.get('engine')?.split(',');
  
  const sort_by = search.get('sort_by');

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

    json_agg(json_build_object(
      'fuel', ca.fuel, 
      'engine', ca.engine,
      'type', ca.type
    )) AS details

    FROM car_abo ca GROUP BY ca.id

  `);

  const res2 = await pool2.query(`
      SELECT car_id as id, ARRAY_AGG(image) as images FROM car_images GROUP BY car_images.car_id
  `);

  const res3 = await pool2.query(`
      SELECT cc.car_id as id, json_agg(json_build_object(
        'price', cc.price, 
        'duration', cc.duration
      )) AS durationcontract FROM car_contract cc GROUP BY cc.car_id
  `);
  
  const res4 = await pool2.query(`
      SELECT ck.car_id as id, json_agg(json_build_object(
        'price', ck.price, 
        'duration', ck.duration
      )) AS km FROM car_km ck GROUP BY ck.car_id
  `);

  var merged = _.merge(_.keyBy(res.rows, 'id'), _.keyBy(res2.rows, 'id'), _.keyBy(res3.rows, 'id'), _.keyBy(res4.rows, 'id'));
  var values: ICar[] = _.values(merged);

let b = values;

if(brands) {
  b = b.filter((el => brands.includes(el.brand)));
}

if(brands && models) {
  b = b.filter((el => models.includes(el.model)));
}

if(fuel) {
 b = b.filter((el => fuel.includes(el?.details[0]?.fuel)));
}

if(type) {
  b = b.filter((el => type.includes(el?.details[0]?.type)));
}

if(duration) {
  b = b.filter((el => el.durationcontract.some((e => duration.includes(e.duration)))));


  b = b.map(el => {
    return {
      ...el,
      durationcontract: el.durationcontract.filter((e => duration.includes(e.duration)))
    }
  })
}

if(engine) {
  b = b.filter((el => engine.includes(el?.details[0]?.engine)));
}

if(available) {
  b = b.filter((el => new Date(available).getTime() >= new Date(removeTimezone(new Date(el.availability))).getTime()));
}

if(price_min && !price_max) {
  b = b.filter((el => el.durationcontract.some(e => (parseInt(e.price) > parseInt(price_min)))))
}

if(!price_min && price_max) {
  b = b.filter((el => el.durationcontract.some(e => parseInt(e.price) < parseInt(price_max))))
}

if(price_min && price_max) {
  b = b.filter((el => el.durationcontract.some(e => (parseInt(e.price) > parseInt(price_min)) && parseInt(e.price) < parseInt(price_max))))
}

if(sort_by) {
  if(sort_by === '2') {
    b = sortByLowest(b);
  } else if(sort_by === '3') {
    b = sortByHighest(b);
  } else if(sort_by === '4') {
    b = b.sort((a, b) => new Date(a.availability).getTime() - new Date(b.availability).getTime())
  }
}
  
  return json(b);
  } catch(e) {
    console.log(e);
    return json({err: 'Es ist ein Fehler unterlaufen.'});
  }
};