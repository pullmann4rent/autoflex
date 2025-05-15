import { useNavigate } from '@remix-run/react';
import Lion from '../../assets/lion.png';
import { ICarNewImg } from '../Modal/ModalAddCar/types';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';

export function CarBoxSmall2({
  id,
  brand,
  model,
  cover,
  video,
  price,
  tuv,
  fsk,
  type,
  sit_place,
  engine,
  fuel,
  firstregistration,
  car_designation,
  ps,
  km,
  color,
  equipment,
  description,
  environment,
  show,
  images,
  isDashboard,
  onClick
}: ICarNewImg & {onClick: (id: string) => void; isDashboard?: boolean;}) {
  const navigate = useNavigate();
  return (
    <section onClick={isDashboard ? () => onClick(id) : () => navigate(`/car/${id}`)} className="cb-r flex ai-s jc-sb relative">
      <img src={Lion} className="car-lion" />
      <section className="cb-r-1">
        <p className="brand">{brand}</p>
        <p className="model">{model} {car_designation}</p>

        <img src={cover} />
      </section>

      <section className="cb-r-2">
        <p className="type">{type}</p>

        <ul className="flex ai-c f-wrap">
          <li className="flex ai-c">
            <img src={Lion} alt="Lion" />
            <span>{engine}</span>
          </li>
          <li className="flex ai-c">
            <img src={Lion} alt="Lion" />
            <span>{fuel}</span>
          </li>
          <li className="flex ai-c">
            <img src={Lion} alt="Lion" />
            <span>EZ {firstregistration}</span>
          </li>
          <li className="flex ai-c">
            <img src={Lion} alt="Lion" />
            <span>{km} km</span>
          </li>
          <li className="flex ai-c">
            <img src={Lion} alt="Lion" />
            <span>{ps} PS</span>
          </li>
          <li className="flex ai-c">
            <img src={Lion} alt="Lion" />
            <span>TV. {tuv}</span>
          </li>
        </ul>

        <section className="flex ai-e jc-sb cb-r-footer-right">
          <p className="small">TÜV bis {tuv}</p>
          <section className="flex ai-c price-container">
            <p className="price">{price.toFixed(2)} €</p>
          </section>
        </section>
      </section>

    </section>
  )
}