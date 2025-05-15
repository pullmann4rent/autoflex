import { ICar } from "~/components/CarBoxRenew/types";

export const sortByLowest = (arr: ICar[]) => {
  return arr.sort((a, b) => {
    const highestPriceA = Math.min(...a.durationcontract.map(item => parseFloat(item.price)));
    const highestPriceB = Math.min(...b.durationcontract.map(item => parseFloat(item.price)));
  
    if (highestPriceA !== highestPriceB) {
      return highestPriceA - highestPriceB;
    } else {
      const lowestPriceA = Math.min(...a.durationcontract.map(item => parseFloat(item.price)));
      const lowestPriceB = Math.min(...b.durationcontract.map(item => parseFloat(item.price)));
      return lowestPriceA - lowestPriceB;
    }
  });
}

export const sortByHighest = (arr: ICar[]) => {
  return arr.sort((a, b) => {
    const highestPriceA = Math.max(...a.durationcontract.map(item => parseFloat(item.price)));
    const highestPriceB = Math.max(...b.durationcontract.map(item => parseFloat(item.price)));
  
    if (highestPriceA !== highestPriceB) {
      return highestPriceB - highestPriceA;
    } else {
      const lowestPriceA = Math.min(...a.durationcontract.map(item => parseFloat(item.price)));
      const lowestPriceB = Math.min(...b.durationcontract.map(item => parseFloat(item.price)));
      return lowestPriceA - lowestPriceB;
    }
  });
}
