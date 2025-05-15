export interface ICar {
  id: number;
  brand: string;
  model: string;
  cover: string;
  video: string;
  price: string;
  fsk: number;
  sit_place: number;
  type: Type;
  tuv: string;
  engine: Engine;
  fuel: Fuel;
  firstRegistration: string;
  ps: number;
  km: string;
  color: string;
  environment: string;
  equipment: string;
  description: string;
  images: {
    id: number;
    uri: string;
  }[]
}

export type Engine = 'Automatik' | 'Schaltgetriebe';

export type Fuel = 'Diesel' | 'Automatik' | 'Hybrid (Elektro/Diesel)' | 'Hybrid (Elektro/Benzin)'  | 'Elektro';

export type Type = 'Kleinwagen' | 'Sportwagen' | 'SUV/Pickup' | 'Limousine' | 'Kombi' | 'Coupé' | 'Van/Kleinbus' | 'Cabrio' | 'Nutzfahrzeuge';