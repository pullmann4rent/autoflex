export interface ISelectCar {
  count: number; 
  onChange: ({type, value}: {type: string; value: string}) => void; 
  onSearch: () => void;
  selectBrands: string[];
  selectModels: string[] | null;
  urlSelectedType: string | null;
  urlSelectedBrand: string | null;
  urlSelectedFuel: string | null;
}