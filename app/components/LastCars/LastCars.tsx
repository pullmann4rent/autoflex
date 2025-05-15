import { useNavigate } from "@remix-run/react";
import { Advantages } from "../Advantages/Advantages";
import { CarBox } from "../CarBox/CarBox";
import { CarBoxSmall2 } from "../CarBoxSmall2/CarBoxSmall2";
import { ICarNewImg } from "../Modal/ModalAddCar/types";

export function LastCars({allCars}:{allCars: ICarNewImg[]}) {
  const navigate = useNavigate();
  return (
    <section>
      <h3 className="last-car-title">Unsere neusten Fahrzeuge</h3>

      <section className="flex ai-c f-wrap">
        {
          allCars.map((el => (
            <CarBoxSmall2 {...el} onClick={() => navigate(`/car/${el.id}`)} />
          )))
        }
      </section>
    </section>
  )
}