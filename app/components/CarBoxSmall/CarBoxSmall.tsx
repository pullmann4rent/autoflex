import { MdSchedule } from 'react-icons/md';
import Lion from '../../assets/lion.png';
import { ICarNewImg } from '../Modal/ModalAddCar/types';
import { Link } from '@remix-run/react';
import numeral from 'numeral';
import { FaRegCheckCircle } from 'react-icons/fa';

export function CarBoxSmall({
  id,
  name,
  image,
  fuel,
  engine,
  type,
  images,
  availability,
  annotation,
  model_year,
  tires,
  sit_places,
  consumption,
  details,
  brand,
  model,
  ps,
  km,
  durationcontract,
  onClick
}: ICarNewImg & {onClick: (id: string) => void}) {
  return (
    <a href={`/car_abo/${id}`} className="cbss cb-first">
      
      <div className="c-hd-img-con">
        <img src={image} alt="cover" />
      </div>

      <div className="c-car-main">
        <div className="c-hd">
          <h2>{brand} {annotation}</h2>

          <div className="c-hd-span">
            <span>{type}</span>
          </div>
        </div>

        <p className="c-price">{parseFloat(durationcontract[0].price).toFixed(2)}€/Monat</p>
      
        <ul className="details">
          <li>
            <div>
              Sitzplätze
            </div>

            <span>{sit_places}</span>
          </li>
          <li>
            <div>
              PS
            </div>

            <span>{ps}</span>
          </li>
          <li>
            <div>
              Motor
            </div>

            <span>{engine}</span>
          </li>
        </ul>      

{/*         <div className="c-more-d">
          <div>
            <FaRegCheckCircle color="green" style={{marginRight: 6}} size={14} />
            <span>{fuel}</span>
          </div>

          <div>
            <FaRegCheckCircle color="green" style={{marginRight: 6}} size={14} />
            <span>{tires}</span>
          </div>
        </div> */}

        <button type="button" className="c-btn-car">Zum Auto</button>

      </div>

    </a>
  )
}