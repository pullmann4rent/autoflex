import { ICar } from "~/components/CarBoxRenew/types";

export type ICarNewImg = Omit<ICar, 'images'> & {
  images: string[];
}

export interface IModalAddCar {
  car: ICarNewImg | null;
  isEdit: boolean;
  onPressClose: () => void;
  revalidate: () => void;
}