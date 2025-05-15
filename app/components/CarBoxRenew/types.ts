import { UUID } from "node:crypto";

export interface ICar {
  id: number;
  name: string;
  image: string;
  images: string[];
  availability: string;
  annotation: string;
  model: string;
  brand: string;
  tires: string;
  model_year: number;
  ps: number;
  sit_places: number;
  consumption: string;
  details?: {
    type?: string;
    engine: string;
    fuel: string;
  }
  durationcontract: {
    id: number;
    price: string;
    duration: string;
  }[];
  km: {
    id: number;
    price: string;
    duration: string;
  }[]
}

export type TKM = {
  id: number;
  car_id: number;
  price: string;
  duration: string;
}

export type TContract = {
  id: number;
  car_id: number;
  price: string;
  duration: string;
}

export type TImages = {
  id: number;
  image: string;
  position: number;
  car_id: number;
}

export const brands: string[] = ['Mercedes-Benz', 'BMW', 'Opel', 'Audi', 'Volkswagen', 'MAN', 'Land Rover']; 

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
      'Movano',
      'Movano L4H3',
      'Movano L3H2',
      'Movano L2H2',
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

      'CLE 200',
      'CLE 220',
      'CLE 250',
      'CLE 300',
      'CLE 350',
      'CLE 500',

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
      'Sprinter L4H2',
  
    ]
  },
  {
    car_id: 4,
    name: 'BMW',
    model: [
      '114',
      '116',
      '118i',
      '118d',
      '118e',
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
      '320d',
      '320e',
      '320i',
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
      'X50 m',
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
  },
  {
    car_id: 5,
    name: 'Volkswagen',
    model: [
      'Golf 8 GTI',
      'Passat',
      'Crafter',
      'Crafter Kasten',
      'Crafter Kasten L4H2'
    ]
  },
  {
    car_id: 6,
    name: 'MAN',
    model: [
      'TGE',
      'TGE L2H2',
      'TGE L4H3',
      'TGE L3H2',
      'Transporter'
    ]
  },
  {
    car_id: 7,
    name: 'Land Rover',
    model: [
      'Range Rover',
      'Range Rover Evoque',
      'Range Rover Sport',
      'Range Rover Velar',
      'Freelander'
    ]
  }
];

export type Brand = 'Mercedes-Benz' | 'BMW' | 'Opel';

export type Engine = 'Automatik' | 'Schaltgetriebe';

export type Fuel = 'Diesel' | 'Benzin' | 'Hybrid (Elektro/Diesel)' | 'Hybrid (Elektro/Benzin)'  | 'Elektro';

export type Type = 'Kleinwagen' | 'Sportwagen' | 'SUV/Pickup' | 'Limousine' | 'Kombi' | 'Coupé' | 'Van/Kleinbus' | 'Cabrio' | 'Nutzfahrzeuge' | 'PKW';