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

export const brands: string[] = ['Mercedes-Benz', 'BMW', 'Audi', 'Opel', 'VW', 'Ford', 'Toyota', 'Fiat']; 

export const tires: string[] = ['Ganzjahresreifen', 'Sommerreifen', 'Winterreifen'];

export const model: {
  car_id: number;
  name: string;
  model: string[]
}[] = [
  {
    car_id: 1,
    name: 'Audi',
    model: []
  },
  {
    car_id: 2,
    name: 'Opel',
    model: []
  },
  {
    car_id: 3,
    name: 'Mercedes-Benz',
    model: []
  },
  {
    car_id: 4,
    name: 'BMW',
    model: []
  },
  {
    name: 'Ford',
    car_id: 5,
    model: []
  },
  {
    name: 'Toyota',
    car_id: 6,
    model: []
  },
  {
    name: 'VW',
    car_id: 7,
    model: []
  },
  {
    name: 'Fiat',
    car_id: 8,
    model: []
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
  const [selectedBrands, setSelectedBrands] = useState<string[]>(searchParams.get('brands')?.split(',') ?? []);
  const [selectedModel, setSelectedModel] = useState<string[]>(searchParams.get('models')?.split(',') ?? []);
  const [selectedFuel, setSelectedFuel] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState<string[]>([]);
  const [selectedEngine, setSelectedEngine] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<number | null>(null);

  const [allModels, setAllModels] = useState<{
  car_id: number;
  name: string;
  model: string[]
}[]>(model);


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

  useEffect(() => {

    let bmw: string[] = [];
 let audi: string[] = [];
  let benz: string[] = [];
   let vw: string[] = [];
    let toyota: string[] = [];
     let ford: string[] = [];
      let fiat: string[] = [];
       let opel: string[] = [];


    loader.map((el) => {
      if(el.brand === 'BMW') {
        if(!bmw.includes(el.model)) {
          bmw.push(el.model)
        }
      }
    })

    loader.map((el) => {
      if(el.brand === 'Mercedes-Benz') {
        if(!benz.includes(el.model)) {
          benz.push(el.model)
        }
      }
    })

    loader.map((el) => {
      if(el.brand === 'Audi') {
        if(!audi.includes(el.model)) {
          audi.push(el.model)
        }
      }
    })

      loader.map((el) => {
      if(el.brand === 'VW') {
        if(!vw.includes(el.model)) {
          vw.push(el.model)
        }
      }
    })

    loader.map((el) => {
      if(el.brand === 'Ford') {
        if(!ford.includes(el.model)) {
          ford.push(el.model)
        }
      }
    })

     loader.map((el) => {
      if(el.brand === 'Fiat') {
        if(!fiat.includes(el.model)) {
          fiat.push(el.model)
        }
      }
    })

       loader.map((el) => {
      if(el.brand === 'Toyota') {
        if(!toyota.includes(el.model)) {
          toyota.push(el.model)
        }
      }
    })

       loader.map((el) => {
      if(el.brand === 'Opel') {
        if(!opel.includes(el.model)) {
          opel.push(el.model)
        }
      }
    })

    
    setAllModels(prev => prev.map((el) => {
      if(el.name === 'BMW') {
        return {
          ...el,
          model: bmw
        }
      } else if(el.name === 'Mercedes-Benz') {
        return {
          ...el,
          model: benz
        }
      } else if(el.name === 'Audi') {
        return {
          ...el,
          model: audi
        }
      } else if(el.name === 'VW') {
        return {
          ...el,
          model: vw
        }
      } else if(el.name === 'Toyota') {
        return {
          ...el,
          model: toyota
        }
      } else if(el.name === 'Ford') {
        return {
          ...el,
          model: ford
        }
      } else if(el.name === 'Fiat') {
        return {
          ...el,
          model: fiat
        }
      }  else if(el.name === 'Opel') {
        return {
          ...el,
          model: opel
        }
      } else {
        return {
          ...el
        }
      }
    }))
 
  }, [loader]);

  console.log('All moels');
  console.log(allModels);


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
      console.log('1');
      params.set('brands', `${selectedBrands.join(',')}`);
    } else if(selectedBrands.length === 0) {
      console.log('3');
      params.delete('brands');
    }

    if(selectedModel.length > 0) {
      params.set('models', `${selectedModel.join(',')}`);
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
      const car =  allModels.find((e => e.name === val));
      if(car) {
        setModels(el => [...el, car]);
      }
    } else {
      setModels(el => el.filter((el => el.name !== val)));
      setSelectedBrands(el => el.filter((e => e !== val)));
    }
  };

  useEffect(() => {
    console.log('SSSSSSSS')
   const md = searchParams.get('models')?.split(',');

   md?.map((el) => {
    console.log(el);
    const allModels2 = allModels.map((e) => {
      if(e.model.includes(el)) {
        setModels(prev => [...prev, {
          car_id: e.car_id,
          model: e.model,
          name: e.name
        }])
      }
    })
   });
  }, []);


  console.log('MODELS');
  console.log(models);
  useEffect(() => {
    console.log('SSSSSSSS')
   const brands = searchParams.get('brands')?.split(',');

   brands?.map((el) => {
    model.map((e) => {
      if(e.name === el) {
        setModels(prev => [...prev, {
          car_id: e.car_id,
          model: e.model,
          name: e.name
        }])
      }
    })
   })

    setModels(prev => prev.reverse().filter((v, i, a) => a.map(e => e.car_id).indexOf(v.car_id) === i))
  }, []);

  console.log(models);
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
                    return (console.log(el),
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

                        <div className="search-inner-content">
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
                        </div>
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
                        <p className="bold-p">ab {parseFloat(el.durationcontract[0].price).toFixed(2)}€</p>
                        <p className="pro-month">pro Monat</p>
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