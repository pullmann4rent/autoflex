import { ISelectCar } from "./types";
import BMW from '../../assets/bmw.png';
import Opel from '../../assets/opel.png';
import Benz from '../../assets/mercedes.png';
import Peugeot from '../../assets/peugeot.png';
import Kia from '../../assets/kia.png';
import { useEffect, useRef, useState } from "react";
import { clickOutside } from "../ClickOutside/ClickOutside";
import { useClickOutside } from "../outsideClick";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export function SelectCar({count, onChange, onSearch, selectBrands, selectModels, urlSelectedBrand, urlSelectedFuel, urlSelectedType}: ISelectCar) {
  const [openBrands, setOpenBrands] = useState<boolean>(false);
  const [openModels, setOpenModels] = useState<boolean>(false);

  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const refSelect = useRef(null);
  const refSelect2 = useRef(null);

  useClickOutside(refSelect, () => setOpenBrands(false));
  useClickOutside(refSelect, () => setOpenModels(false));
  
  useEffect(() => {
    onChange({type: 'type', value: null});
    setSelectedModel(null);
  }, [selectedBrand]);
  
  return (
   <section className="select-car">
    <h2 className="w-100">Fahrzeugsuche</h2>

    <section className="flex f-col s-con">

      <div ref={refSelect} className="custom-select relative">

        <div className="custom-select-header" onClick={() => (setOpenBrands(!openBrands), setOpenModels(false))}>
          {
            selectedBrand ?
            (
              selectedBrand === 'BMW' ?
              <div className="header-selected-brand">

                <img src={BMW} alt="bmw" />
                
                <p>{selectedBrand}</p>

              </div>
              : (selectedBrand === 'Kia' ? 
              
              <div className="header-selected-brand">

                <img src={Kia} alt="Kia" />
                
                <p>{selectedBrand}</p>

              </div>
              
              : 
              
              
              (selectedBrand === 'Mercedes-Benz' ? 
              
              <div className="header-selected-brand">

                <img src={Benz} alt="Benz" />
                
                <p>{selectedBrand}</p>

              </div>
              
              
              : (selectedBrand === 'Peugeot' ? 
              
              <div className="header-selected-brand">

                <img src={Peugeot} alt="Peugeot" />
                
                <p>{selectedBrand}</p>

              </div>
              
              : 
              
              
                <div className="header-selected-brand">

                <img src={Opel} alt="Opel" />
                
                <p>{selectedBrand}</p>

              </div>
            
            
            )))
            )
            :
            <p>Marke auswählen</p>
          }
          { openBrands ?
            <IoIosArrowUp />
            :
            <IoIosArrowDown />
          }
        </div>
       
        { openBrands && 
          <div className="custom-select-content">
            <ul>
              <li>
                <img src={BMW} alt="BMW" onClick={() => (onChange({type: 'brand', value: 'BMW'}), setSelectedBrand('BMW'), setOpenBrands(false))} />
              </li>
              <li>
                <img src={Kia} alt="Kia" onClick={() => (onChange({type: 'brand', value: 'Kia'}), setSelectedBrand('Kia'), setOpenBrands(false))} />
              </li>
              <li>
                <img src={Benz} alt="Mercedes-Benz" onClick={() => (onChange({type: 'brand', value: 'Mercedes-Benz'}), setSelectedBrand('Mercedes-Benz'), setOpenBrands(false))} />
              </li>
              <li>
                <img src={Opel} alt="Opel" onClick={() => (onChange({type: 'brand', value: 'Opel'}), setSelectedBrand('Opel'), setOpenBrands(false))} />
              </li>
              <li>
                <img src={Peugeot} alt="Peugeot" onClick={() => (onChange({type: 'brand', value: 'Peugeot'}), setSelectedBrand('Peugeot'), setOpenBrands(false))} />
              </li>
            </ul>
          </div>
        }
        
      </div>

     <div ref={refSelect} className="custom-select relative">

        <div className="custom-select-header" onClick={() => setOpenModels(!openModels)}>
          { selectedModel ?
          <p>{selectedModel}</p>
          :
            <p>Modell auswählen</p>
          }
         { openModels ?
            <IoIosArrowUp />
            :
            <IoIosArrowDown />
          }
        </div>
       
        { openModels && 
          <div className="custom-select-content csc-model">
            <ul>
              {
                selectModels && selectModels.map((el) => (
                  <li onClick={() => (onChange({type: 'type', value: el}), setSelectedModel(el), setOpenModels(false))}>
                    {
                      el
                    }
                  </li>
                ))
              }
            </ul>
          </div>
        }
        
      </div>

      
      
{/*       <select onChange={(e) => onChange({type: 'fuel', value: e.target.value})}>
        <option value="0">Kraftstoff wählen</option>
        <option value="Diesel">Diesel</option>
          <option value="Benzin">Benzin</option>
          <option value="Elektro">Elektro</option>
          <option value="Hybrid (Elektro/Diesel)">Hybrid (Elektro/Diesel)</option>
          <option value="Hybrid (Elektro/Benzin)">Hybrid (Elektro/Benzin)</option>
      </select>
       */}

      <button type="button" onClick={onSearch} className="select-car-btn">
        {count} Treffer
      </button>
    </section>
   </section>
  )
}