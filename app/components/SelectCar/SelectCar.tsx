import { ISelectCar } from "./types";

export function SelectCar({count, onChange, onSearch, selectBrands, selectModels, urlSelectedBrand, urlSelectedFuel, urlSelectedType}: ISelectCar) {
  return (
   <section className="select-car">
    <h2 className="w-100">Fahrzeugsuche</h2>

    <section className="flex f-col s-con">

      <select className="select-car-1" onChange={(e) => onChange({type: 'brand', value: e.target.value})}>
        <option value="0">Marke auswählen</option>
        {
          selectBrands.map((el => (
            <option value={el} selected={el === urlSelectedBrand}>{el}</option>
          )))
        }
      </select>

      <select onChange={(e) => onChange({type: 'type', value: e.target.value})}>
        <option value="0">Modell auswählen</option>
        {
          selectModels &&
          selectModels.map((el) => (
            <option value={el} selected={el === urlSelectedType}>{el}</option>
          ))
          
        }
      </select>
      
      
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