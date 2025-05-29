let pc_24_anzahlung = 26;
let pc_24_monatsrate = 3;

let pc_36_anzahlung = 21;
let pc_36_monatsrate = 2.2;

let pc_48_anzahlung = 16;
let pc_48_monatsrate = 1.8;

// 10% more from the whole price of 24 rate
let pc_more_then_pc_24 = 10;

let pc_more_then_pc_36 = 20;

export const formel24 = (price: number) => {
  let anzahlung = ((pc_24_anzahlung / 100) * price);

  let monatsrate = price - anzahlung;

  let monats24 = ((pc_24_monatsrate / 100) * monatsrate);

  let monatEnd = 23 * monats24;

  let schlussrate = monatsrate - monatEnd

  return {
    anzahlung: anzahlung.toFixed(2),
    monatsrate: monats24.toFixed(2),
    schlussrate: schlussrate.toFixed(2)
  }
};

export const formel36 = (price: number) => {
  let price36 = ((pc_more_then_pc_24 / 100) * price);

  let price36_full = price36 + price;
  
  
  let anzahlung36 = ((pc_36_anzahlung / 100) * price36_full);
  
  console.log(anzahlung36)
  
  let monatsrate36 = price36_full - anzahlung36;
  
  let monats36 = ((pc_36_monatsrate / 100) * monatsrate36);
  
  let monatEnd36 = 35 * monats36;
  
  let schlussrate36 = monatsrate36 - monatEnd36
  
  return {
    anzahlung: anzahlung36.toFixed(2),
    monatsrate: monats36.toFixed(2),
    schlussrate: schlussrate36.toFixed(2)
  }
};

export const formel48 = (price: number) => {
  let price48 = ((pc_more_then_pc_36 / 100) * price);

  let price48_full = price48 + price;
  
  
  let anzahlung48 = ((pc_48_anzahlung / 100) * price48_full);
  
  console.log(anzahlung48)
  let monatsrate48 = price48_full - anzahlung48;
  
  let monats48 = ((pc_48_monatsrate / 100) * monatsrate48);
  
  let monatEnd48 = 47 * monats48;
  
  let schlussrate48 = monatsrate48 - monatEnd48
  
  return {
    anzahlung: anzahlung48.toFixed(2),
    monatsrate: monats48.toFixed(2),
    schlussrate: schlussrate48.toFixed(2)
  }
};