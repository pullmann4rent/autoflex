import { Form, useActionData, useFetcher, useNavigation } from "@remix-run/react";
import { IModalAddCar } from "./types";
import { useEffect, useState } from "react";
import Modal from "~/utils/Modal";
import { AiOutlineClose } from "react-icons/ai";
import ImagePreview from "~/components/ImagePreview/ImagePreview";
import { brands, model } from "~/components/CarBoxRenew/types";
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ClientOnly } from "remix-utils/client-only";
import { TextEditor } from "~/components/Editor/Editor";
import { airbags, anhängerkupplung, einparkhilfe, eqs, extras, farbe_innenausstattung, geschwindigkeitsregulierung, innenausstattung, klimatisierung, kurvenlicht, pannenhilfe, radio, scheinwerfer, security, sport, tagfahrlicht } from "~/utils/equipments";
import { formel24, formel36, formel48 } from "~/utils/formel";

export const firstregistrationArr: string[] = [
  '1990',
  '1991',
  '1992',
  '1993',
  '1994',
  '1995',
  '1996',
  '1997',
  '1998',
  '1999',
  '2000',
  '2001',
  '2002',
  '2003',
  '2004',
  '2005',
  '2006',
  '2007',
  '2008',
  '2009',
  '2010',
  '2011',
  '2012',
  '2013',
  '2014',
  '2015',
  '2016',
  '2017',
  '2018',
  '2019',
  '2020',
  '2021',
  '2022',
  '2023',
  '2024',
  '2025',
  '2026',
  '2027',
  '2028'
];

export const engine: string[] = [
  'Automatik',
  'Schaltgetriebe',
  'Halbautomatik'
];

export const sitPlaces: string[] = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12'
];

export default function ModalAddCar({
  car,
  isEdit,
  revalidate,
  onPressClose
}: IModalAddCar) {
  const [desc, setDesc] = useState(isEdit ? car?.description : '');
  const [umwelt, setUmwelt] = useState(isEdit ? car?.environment : '');
  const [ausstattungen, setAusstattungen] = useState(isEdit ? car?.equipment : '');
  const navigation = useNavigation();
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [compareImages, setCompareImages] = useState<string[] | []>([]);
  const [video, setVideo] = useState(car && car?.video && car?.video !== '' ? car.video : '');

  const [type, setType] = useState<string>('1');
  const [load, setLoad] = useState<boolean>(false);
  const [loadVideo, setLoadVideo] = useState<boolean>(false);
  const [backendData, setBackendData] = useState<[]>([]);
  const [tg, setTg] = useState<boolean>(false);
  const [load2, setLoad2] = useState<boolean>(false);

  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(isEdit ? car?.model : null);

  const data = useActionData();

  const fetcher = useFetcher();

  const [trigger, setTrigger] = useState<boolean>(false);
  const [triggerStop, setTriggerStop] = useState<boolean>(false);
  const [triggerData, setTriggerData] = useState<boolean>(false);
  
  const [load3, setLoad3] = useState<boolean>(false);

  const [consumption, setConsumption] = useState(car?.consumption_image ?? '');
  
  const handleChange = async (e: any) => {
    try {
    if(!e.target.files) {
      return;
    }
    setTriggerStop(false);
    setTrigger(true);
    const formData = new FormData();
    const sec = document.querySelector('.image-container');

    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("images", e.target.files[i]);
/* 
      var img_data = document.createElement('img');

      var close = document.createElement('button');

      img_data.src = URL.createObjectURL(e.target.files[i]);

      sec?.appendChild(img_data); 
    
      setPreviewImages(prev => [...prev, e.target.files[i]]); */
     
    }
   // fetcher.submit(formData, { method: 'post', action: '/imagesAdd', encType: 'multipart/form-data' });
    setLoad(true);
    const d = await fetch('/imagesAdd', {
      method: 'POST',
      body: formData
    });


    const res = await d.text();

    const datasSecure = JSON.parse(res);

    setBackendData(datasSecure.secureURLS)
    setLoad(false);
    setTg(!tg);
   

    console.log(res);
   
    // @ts-ignore
    document.querySelector('.fl').value = '';
    } catch(e) {
      console.log(e);
      return e;
    }
  }

  const handleChange2 = async (e: any) => {
    try {
    if(!e.target.files) {
      return;
    }
    setTriggerStop(false);
    setTrigger(true);
    const formData = new FormData();
    
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("images", e.target.files[i]);
    }

    setLoad3(true);
    const d = await fetch('/imagesAdd', {
      method: 'POST',
      body: formData
    });


    const res = await d.text();

    const datasSecure = JSON.parse(res);

    console.log(datasSecure);
    console.log('SECURe')
    setConsumption(datasSecure.secureURLS[0])
    setLoad3(false);
    setTg(!tg);
   

    console.log(res);
    } catch(e) {
      console.log(e);
      return e;
    }
  }

  const handleSubmitForm = async (e: React.ChangeEvent<HTMLFormElement>) => {
   try {
    console.log('A')
    e.preventDefault();
    setTriggerStop(true);
    setTriggerData(true);

    let dc = document.querySelector('.car-form')

    let formData = new FormData(dc as any);

    console.log(formData);
    setLoad2(true);

    let des = await fetch('/addCars', {
      method: 'POST',
      body: formData
    });

    let response = await des.text();
    setLoad2(false);
    const parseit = JSON.parse(response);

    if(parseit.success === true) {
      onPressClose();
      revalidate()
    }
    
    //submit(e.currentTarget)
   } catch(e) {
    console.log(e);
    return e;
   }
  };

  const handleRemoveImage = (imgUrl: string) => setPreviewImages(prev => prev.filter((el => el !== imgUrl)));

  useEffect(() => {
    console.log('fetcher State' + fetcher.state);
    console.log('fetcher data' + fetcher.data);
    console.log(car?.id)
    console.log(isEdit)
    if(isEdit) {
      console.log('YEES');
    const edit = async () => {
     try {
      const d = await fetch(`/imagesApi?id=${car?.id}`, {
        method: 'GET',
      });

      const res = await d.text();

      if(res) {
      const datasSecure = JSON.parse(res);
      setPreviewImages(datasSecure.images);
      setBackendData(datasSecure.images);
      
      console.log('Hi')
      console.log(datasSecure.secureURLS)
      console.log(res);
      }
     } catch(e) {
      console.log(e);
      return e;
     }
    };

    edit();
  
    }
   }, []);

   useEffect(() => {

    if(!triggerStop) {
  
      (!backendData.every((val: any) => previewImages.includes(val))) && (setPreviewImages(prev => [...prev, ...backendData]));
    }

    !trigger && (setCompareImages(backendData), setTrigger(true))
   }, [tg]);

   useEffect(() => {
    // @ts-ignore
    if(triggerData && data?.success === true) {
      onPressClose();
    }
   }, [navigation]);

   const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const modelFind = model.find((el => el.name === e.target.value));
    if(modelFind) {
      setBrandModel(el => modelFind.model);
    }
   }

   const handleChangeTwo = async (e: any) => {
    try {

    setTriggerStop(false);
    setTrigger(true);
    const formData = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("images", e.target.files[i]);
      console.log(e.target.files[i]);
/* 
      var img_data = document.createElement('img');

      var close = document.createElement('button');

      img_data.src = URL.createObjectURL(e.target.files[i]);

      sec?.appendChild(img_data); 
    
      setPreviewImages(prev => [...prev, e.target.files[i]]); */
     
    }

    setLoadVideo(true);
    const d = await fetch('/videoAdd', {
      method: 'POST',
      body: formData
    });

    const res = await d.text();

    const datasSecure = JSON.parse(res);

    setVideo(datasSecure.secureURLS);
    setLoadVideo(false);
    setTg(!tg);
   

    console.log(res);
   
    // @ts-ignore
    document.querySelector('.fl').value = '';
    } catch(e) {
      console.log(e);
      return e;
    }
  }

  const [brandModel, setBrandModel] = useState<string[]>([]);

  useEffect(() => {
   if(isEdit) {
     const modelFind = model.find((el => el.name === car?.brand));
     console.log('MOdel find');
     console.log(modelFind?.model);
     if(modelFind) {
       setBrandModel(modelFind?.model)
     }
   }
  }, []);

  const [showCar, setShowCar] = useState<boolean>(isEdit ? car?.show : true);

  const handleRemoveVideo = () => setVideo('');

  const [equipments, setEquipments] = useState<string[]>(isEdit ? (car?.equipments ?? []) : []);

  const handleToggle = (e: InputEvent) => {
    if(equipments.includes(e.target.value)) {
      setEquipments(prev => prev.filter((el => el !== e.target.value)));
    } else {
      setEquipments(prev => [...prev, e.target.value]);
    }
  };

  const handleToggleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if(e.target.value === 'a1') {
      for(let i = 0; i < geschwindigkeitsregulierung.length; i++) {
        setEquipments(prev => prev.filter((el => el !== geschwindigkeitsregulierung[i])));
      }
    } else if(e.target.value === 'a2') {
      for(let i = 0; i < anhängerkupplung.length; i++) {
        setEquipments(prev => prev.filter((el => el !== anhängerkupplung[i])));
      }
    } else if(e.target.value === 'a3') {
      for(let i = 0; i < klimatisierung.length; i++) {
        setEquipments(prev => prev.filter((el => el !== klimatisierung[i])));
      }
    } else if(e.target.value === 'a4') {
      for(let i = 0; i < airbags.length; i++) {
        setEquipments(prev => prev.filter((el => el !== airbags[i])));
      }
    } else if(e.target.value === 'a5') {
      for(let i = 0; i < scheinwerfer.length; i++) {
        setEquipments(prev => prev.filter((el => el !== scheinwerfer[i])));
      }
    } else if(e.target.value === 'a6') {
      for(let i = 0; i < pannenhilfe.length; i++) {
        setEquipments(prev => prev.filter((el => el !== pannenhilfe[i])));
      }
    } else if(e.target.value === 'a7') {
      for(let i = 0; i < tagfahrlicht.length; i++) {
        setEquipments(prev => prev.filter((el => el !== tagfahrlicht[i])));
      }
    } else if(e.target.value === 'a8') {
      for(let i = 0; i < kurvenlicht.length; i++) {
        setEquipments(prev => prev.filter((el => el !== kurvenlicht[i])));
      }
    } else {
      if(equipments.includes(e.target.value)) {
        setEquipments(prev => prev.filter((el => el !== e.target.value)))
      } else {
        setEquipments(prev => [...prev, e.target.value]);
      }
    }
  }

const [price, setPrice] = useState<number>(0);

const [mon24_anzahlung, setMon24_anzahlung] = useState(car?.rate24_anzahlung ?? 0);
const [mon24_rate, setMon24_rate] = useState(car?.rate24?? 0);
const [mon24_schlussrate, setMon24_schlussrate] = useState(car?.rate24_schlussrate ?? 0);

const [mon36_anzahlung, setMon36_anzahlung] = useState(car?.rate36_anzahlung ?? 0);
const [mon36_rate, setMon36_rate] = useState(car?.rate36?? 0);
const [mon36_schlussrate, setMon36_schlussrate] = useState(car?.rate36_schlussrate ?? 0);

const [mon48_anzahlung, setMon48_anzahlung] = useState(car?.rate48_anzahlung ?? 0);
const [mon48_rate, setMon48_rate] = useState(car?.rate48?? 0);
const [mon48_schlussrate, setMon48_schlussrate] = useState(car?.rate48_schlussrate ?? 0);

const handleChangePrice = (e: string) => {
  setPrice(parseInt(e));
}

useEffect(() => {
  if(price > 0) {
    let formel = formel24(price);
    let formel2 = formel36(price);
    let formel3 = formel48(price);

    setMon24_anzahlung(formel.anzahlung);
    setMon24_rate(formel.monatsrate);
    setMon24_schlussrate(formel.schlussrate);

    setMon36_anzahlung(formel2.anzahlung);
    setMon36_rate(formel2.monatsrate);
    setMon36_schlussrate(formel2.schlussrate);

    setMon48_anzahlung(formel3.anzahlung);
    setMon48_rate(formel3.monatsrate);
    setMon48_schlussrate(formel3.schlussrate);
  }
}, [price])
  return (
    <Modal className="modal-content-addcar" onClose={onPressClose}>
      <section className="request car-request">
        <section className="flex jc-sb mt-6 modal-info">

          <h2>{ isEdit ? 'Auto bearbeiten' : 'Auto hinzufügen' }</h2>
          <button type="button" onClick={onPressClose}>
            <AiOutlineClose size={24} color='#222' />
          </button>
        </section>
        <Form method="post" onSubmit={handleSubmitForm} name="add-car-form" className="flex fd-col jc-c car-form" encType="multipart/form-data" data-netlify="true">
          <input type="hidden" name="compare_images" value={compareImages} />
          <input type="hidden" name="images" value={previewImages} />
          <input type="hidden" name="form-name" value="add-car-form" />
          <input type="hidden" name="form" value={isEdit ? 'edit_car' : 'add_car'} />
          <input type="hidden" name="type" value={type} />
          <input type="hidden" name="car_id" defaultValue={car?.id} />
          <input type="hidden" name="video" value={video} />
          <input type="hidden" name="show" value={showCar ? 'true' : 'false'} />
          <input type="hidden" name="model" value={selectedModel ?? ''} />
          <input type="hidden" name="description" value={desc} />
          <input type="hidden" name="equipment" value={ausstattungen} />
          <input type="hidden" name="environment" value={umwelt} />
          <input type="hidden" name="id" value={car?.id ?? ''} />
          <input type="hidden" name="equipments" value={equipments} />
          <input type="hidden" name="consumption_image" value={consumption} />
     
          <section className="test-imgs"></section>

          <section className="flex jc-sb ai-c w-100">
            <select name="brand" className="select-type stp" onChange={handleChangeSelect}>
              <option value="0">Marke auswählen</option>
              {
                brands.map((el, i) => (
                  <>
                    <option value={el} selected={car?.brand === el}>{el}</option>
                  </>
                ))
              }
            </select>

              { brandModel && brandModel.length > 0 &&
              <Select className="select-type stp" onChange={(e) => setSelectedModel(e.value)} defaultValue={isEdit ? brandModel.map((el => ({
                value: el,
                label: el
                })))[brandModel.findIndex(el => el === car?.model)] : []} options={brandModel.map((el => ({
                  value: el,
                  label: el
                })))} />
              }
          </section>

          <section className="flex jc-sb w-100">
            <input type="text" name="car_designation" placeholder="Bezeichnung" className="car-d-input" defaultValue={car?.car_designation} />
          </section>

          <section className="flex jc-sb w-100">
            <input type="text" name="price" className="input-left" onChange={(e) => handleChangePrice(e.target.value)} placeholder="Preis" defaultValue={car?.price} />
            <input type="number" name="ps" className="input-right" placeholder="PS" defaultValue={car?.ps} />
          </section>

          <section className="flex jc-sb w-100">
            <input type="text" name="color" className="input-left" placeholder="Farbe" defaultValue={car?.color} />
            <select name="fuel" className="select-type stp" onChange={handleChangeSelect}>
              <option value="Diesel" selected={car?.fuel === 'Diesel'}>Diesel</option>
              <option value="Benzin" selected={car?.fuel === 'Benzin'}>Benzin</option>
              <option value="Elektro" selected={car?.fuel === 'Elektro'}>Elektro</option>
              <option value="Hybrid (Elektro/Diesel)" selected={car?.fuel === 'Hybrid (Elektro/Diesel)'}>Hybrid (Elektro/Diesel)</option>
              <option value="Hybrid (Elektro/Benzin)" selected={car?.fuel === 'Hybrid (Elektro/Benzin)'}>Hybrid (Elektro/Benzin)</option>
            </select>
          </section>

          <section className="flex jc-sb w-100">
            <input type="text" name="km" className="input-left" placeholder="KM-Stand" defaultValue={car?.km} />
            <input type="number" name="tuv" className="input-right" placeholder="Tüv bis" defaultValue={car?.tuv} />
          </section>
          
          <section className="flex jc-sb w-100">
            <input type="number" name="rate24" className="input-left" placeholder="Monatliche Rate 24" value={mon24_rate} defaultValue={car?.rate24 ?? 0} />
            <input type="number" name="rate24_anzahlung" className="input-right" placeholder="Anzahlung 24" value={mon24_anzahlung} defaultValue={car?.rate24_anzahlung ?? 0} />
            <input type="number" name="rate24_schlussrate" className="input-right" placeholder="Schlussrate 24" value={mon24_schlussrate} defaultValue={car?.rate24_schlussrate ?? 0} />
          </section>

          <section className="flex jc-sb w-100">
            <input type="number" name="rate36" className="input-left" placeholder="Monatliche Rate 36" value={mon36_rate} defaultValue={car?.rate36 ?? 0} />
            <input type="number" name="rate36_anzahlung" className="input-right" placeholder="Anzahlung 36" value={mon36_anzahlung} defaultValue={car?.rate36_anzahlung ?? 0} />
            <input type="number" name="rate36_schlussrate" className="input-right" placeholder="Schlussrate 36" value={mon36_schlussrate} defaultValue={car?.rate36_schlussrate ?? 0} />
          </section>

          <section className="flex jc-sb w-100">
            <input type="number" name="rate48" className="input-left" placeholder="Monatliche Rate 48" value={mon48_rate} defaultValue={car?.rate48 ?? 0} />
            <input type="number" name="rate48_anzahlung" className="input-right" placeholder="Anzahlung 48" value={mon48_anzahlung} defaultValue={car?.rate48_anzahlung ?? 0} />
            <input type="number" name="rate48_schlussrate" className="input-right" placeholder="Schlussrate 48" value={mon48_schlussrate} defaultValue={car?.rate48_schlussrate ?? 0} />
          </section>

          <section className="flex jc-sb w-100">
            <select name="engine" className="select-type stp" onChange={handleChangeSelect}>
              <option value="0">Getriebe auswählen</option>
              {
                engine.map((el, i) => (
                  <>
                    <option value={el} selected={car?.engine === el}>{el}</option>
                  </>
                ))
              }
            </select>
            <select name="sit_place" className="select-type stp" onChange={handleChangeSelect}>
              <option value="0">Sitzplätze auswählen</option>
              {
                sitPlaces.map((el, i) => (
                  <>
                    <option value={el} selected={car?.sit_place === parseInt(el)}>{el}</option>
                  </>
                ))
              }
            </select>
          </section>

          <section className="flex jc-sb w-100">
            <select name="firstregistration" className="select-type stp" onChange={handleChangeSelect}>
              <option value="0">Erstzulassung</option>
              {
                firstregistrationArr.map((el, i) => (
                  <>
                    <option value={el} selected={car?.firstregistration === parseInt(el)}>{el}</option>
                  </>
                )).reverse()
              }
            </select>
            <select name="type" className="select-type" onChange={handleChangeSelect}>
              <option value="PKW" selected={car?.type === 'PKW'}>PKW</option>
              <option value="Nutzfahrzeuge" selected={car?.type === 'Nutzfahrzeuge'}>Nutzfahrzeuge</option>
            </select>
          </section>
          
          <section className="flex jc-sb ai-c w-100">
            <p>Titelbild</p>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="input-right"
              />
          </section>

          <section className="flex jc-sb ai-c w-100">
            <p>Verbraucherbild</p>
            <input
              id="file-upload-verbrauch"
              name="file-upload-verbrauch"
              type="file"
              className="input-right"
              onChange={handleChange2}
              />
          </section>
          {
            load3 && <p>Ladet...</p>
          }

          <section className="flex jc-sb ai-c w-100">
            <p>Videos</p>
            <input
              id="videos"
              name="videos"
              type="file"
              multiple
              onChange={handleChangeTwo}
              className="input-right"
            />
          </section>
          {
            video !== '' && <button type="button" onClick={handleRemoveVideo} className="rv-video-btn">Video entfernen</button>
          }
          {
            loadVideo && <p>Video wird geladen...</p>
          }

          <section className="flex jc-sb ai-c w-100">
            <p>Bilder</p>
            <input type="file" name="files" className="fl" multiple onChange={handleChange} />

          </section>

          <section className="flex jc-sb w-100 show-car-container">
            <div onClick={() => setShowCar(!showCar)} className="flex ac-container pointer">
              <div className={`ac-c ${showCar && 'ac-active'}`} />
              <p className="ml-6">Auto Anzeigen</p>
            </div>
          </section>

            {
              load && <p>Bilder werden geladen...</p>
            }
            <section className="flex image-container">
             {
                previewImages.length > 0 && previewImages.map((el) => (
                  <ImagePreview imgUrl={el} key={el} onPressRemove={handleRemoveImage} />
                ))
              } 
            </section>

            <p className="list-title">Ausstattungen</p>
            <section className="col-2">
              {
                eqs.map((el => (
                  <section className="flex ai-c">
                    <input type="checkbox" id={`checkbox-${el}`} name="eq" value={el} checked={equipments.includes(el)} onChange={handleToggle} />
                    <label for={`checkbox-${el}`}>{el}</label>
                  </section>
                )))
              }
            </section>

            <p className="list-title">Tuner/Radio</p>
            <section className="col-2">
              {
                radio.map((el => (
                  <section className="flex ai-c">
                    <input type="checkbox" id={`checkbox-${el}`} name="eq" value={el} checked={equipments.includes(el)} onChange={handleToggle} />
                    <label for={`checkbox-${el}`}>{el}</label>
                  </section>
                )))
              }
            </section>

            <section className="flex w-100 jc-sb ai-c">
              <select name="x1" className="select-type stp" onChange={handleToggleSelect}>
                <option value="a1">Geschwindigkeitsregulierung</option>
                {
                  geschwindigkeitsregulierung.map((el, i) => (
                    <>
                      <option value={el} selected={equipments.includes(el)}>{el}</option>
                    </>
                  ))
                }
              </select>

              <select name="x2" className="select-type stp" onChange={handleToggleSelect}>
                <option value="a2">Anhängerkupplung</option>
                {
                  anhängerkupplung.map((el, i) => (
                    <>
                      <option value={el} selected={equipments.includes(el)}>{el}</option>
                    </>
                  ))
                }
              </select>
            </section>

            <section className="flex w-100 jc-sb ai-c">
              <select name="x3" className="select-type stp" onChange={handleToggleSelect}>
                <option value="a3">Klimatieserung</option>
                {
                  klimatisierung.map((el, i) => (
                    <>
                      <option value={el} selected={equipments.includes(el)}>{el}</option>
                    </>
                  ))
                }
              </select>

              <select name="x4" className="select-type stp" onChange={handleToggleSelect}>
                <option value="a4">Airbags</option>
                {
                  airbags.map((el, i) => (
                    <>
                      <option value={el} selected={equipments.includes(el)}>{el}</option>
                    </>
                  ))
                }
              </select>
            </section>

            <section className="flex w-100 jc-sb ai-c">
              <select name="x5" className="select-type stp" onChange={handleToggleSelect}>
                <option value="a5">Hauptscheinwerfer</option>
                {
                  scheinwerfer.map((el, i) => (
                    <>
                      <option value={el} selected={equipments.includes(el)}>{el}</option>
                    </>
                  ))
                }
              </select>

              <select name="x4" className="select-type stp" onChange={handleToggleSelect}>
                <option value="a6">Pannenhilfe</option>
                {
                  pannenhilfe.map((el, i) => (
                    <>
                      <option value={el} selected={equipments.includes(el)}>{el}</option>
                    </>
                  ))
                }
              </select>
            </section>

            <section className="flex w-100 jc-sb ai-c">
              <select name="x5" className="select-type stp" onChange={handleToggleSelect}>
                <option value="a7">Tagfahrlicht (Art)</option>
                {
                  tagfahrlicht.map((el, i) => (
                    <>
                      <option value={el} selected={equipments.includes(el)}>{el}</option>
                    </>
                  ))
                }
              </select>

              <select name="x4" className="select-type stp" onChange={handleToggleSelect}>
                <option value="a8">Kurvenlicht (Art)</option>
                {
                  kurvenlicht.map((el, i) => (
                    <>
                      <option value={el} selected={equipments.includes(el)}>{el}</option>
                    </>
                  ))
                }
              </select>
            </section>

            <p className="list-title">Sicherheit</p>
            <section className="col-2">
              {
                security.map((el => (
                  <section className="flex ai-c">
                    <input type="checkbox" id={`checkbox-${el}`} name="eq" value={el} checked={equipments.includes(el)} onChange={handleToggle} />
                    <label for={`checkbox-${el}`}>{el}</label>
                  </section>
                )))
              }
            </section>

            <p className="list-title">Einparkhilfe</p>
            <section className="col-2">
              {
                einparkhilfe.map((el => (
                  <section className="flex ai-c">
                    <input type="checkbox" id={`checkbox-${el}`} name="eq" value={el} checked={equipments.includes(el)} onChange={handleToggle} />
                    <label for={`checkbox-${el}`}>{el}</label>
                  </section>
                )))
              }
            </section>

            <p className="list-title">Sport</p>
            <section className="col-2">
              {
                sport.map((el => (
                  <section className="flex ai-c">
                    <input type="checkbox" id={`checkbox-${el}`} name="eq" value={el} checked={equipments.includes(el)} onChange={handleToggle} />
                    <label for={`checkbox-${el}`}>{el}</label>
                  </section>
                )))
              }
            </section>

            <p className="list-title">Extras</p>
            <section className="col-2">
              {
                extras.map((el => (
                  <section className="flex ai-c">
                    <input type="checkbox" id={`checkbox-${el}`} name="eq" value={el} checked={equipments.includes(el)} onChange={handleToggle} />
                    <label for={`checkbox-${el}`}>{el}</label>
                  </section>
                )))
              }
            </section>

            <p className="list-title">Innenausstattungen</p>
            <section className="col-2">
              {
                innenausstattung.map((el => (
                  <section className="flex ai-c">
                    <input type="checkbox" id={`checkbox-${el}`} name="eq" value={el} checked={equipments.includes(el)} onChange={handleToggle} />
                    <label for={`checkbox-${el}`}>{el}</label>
                  </section>
                )))
              }
            </section>

            <p className="list-title">Farbe der Innenausstattung</p>
            <section className="col-2">
              {
                farbe_innenausstattung.map((el => (
                  <section className="flex ai-c">
                    <input type="checkbox" id={`checkbox-${el}`} name="eq" value={el} checked={equipments.includes(el)} onChange={handleToggle} />
                    <label for={`checkbox-${el}`}>{el}</label>
                  </section>
                )))
              }
            </section>

            <section className="box-editor">
              <p className="mb-6">Beschreibung: </p>

              <TextEditor
                theme="snow"
                placeholder="Write description"
                onChange={setDesc}
                value={desc}
                className="editor-modal"
              />
            </section>

            <section className="box-editor">
              <p className="mb-6">Umwelt: </p>

              <TextEditor
                theme="snow"
                placeholder="Write description"
                onChange={setUmwelt}
                value={umwelt}
                className="editor-modal"
              />
            </section>


            <section className="box-editor">
              <p className="mb-6">Ratenplan: </p>

              <TextEditor
                theme="snow"
                placeholder="Write description"
                onChange={setAusstattungen}
                value={ausstattungen}
                className="editor-modal"
              />
            </section>

          

          <button type="submit" className="request-button">
            { load2 ? 'Ladet...' :  isEdit ? 'Auto bearbeiten' : 'Auto hinzufügen'}
          </button>
        </Form>
      </section>
    </Modal>
  )
}