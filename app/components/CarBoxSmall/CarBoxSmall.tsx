import { MdSchedule } from 'react-icons/md';
import Lion from '../../assets/lion.png';
import { ICarNewImg } from '../Modal/ModalAddCar/types';
import { Link } from '@remix-run/react';
import numeral from 'numeral';

export function CarBoxSmall({
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
  car_designation,
  firstregistration,
  ps,
  km,
  color,
  equipment,
  description,
  environment,
  show,
  images,
  onClick
}: ICarNewImg & {onClick: (id: string) => void}) {
  return (
    <a href={`/car/${id}`} className="cbss cb-first">
      <section className="car-box car-box-small car-box-renew relative pointer relative">

        <img src={cover} alt="Car" />   

        <img src={Lion} className="car-lion" />
      </section>

      <section className="car-box-footer">
        <section className="flex jc-sb ai-c cbf-1">
          <section>
            <p className="small">{brand}</p>
            <p className="full_name_car">{model} {car_designation}</p>
          </section>
          <section>
            <p className="car-box-small-price">{new Intl.NumberFormat("de-DE").format(price)} €</p>
            <p className="small">Mwst. ausweisbar</p>
          </section>
        </section>

        <ul className="flex f-wrap jc-sb cbf-2">
          <li className="flex ai-c">
            <img src={Lion} alt="Logo" className="lion-li" />
            <span className="ml-6">{engine}</span>
          </li>
          <li className="flex ai-c">
            <img src={Lion} alt="Logo" className="lion-li" />
            <span className="ml-6">{fuel}</span>
          </li>
          <li className="flex ai-c">
            <img src={Lion} alt="Logo" className="lion-li" />
            <span className="ml-6">{firstregistration}</span>
          </li>
          <li className="flex ai-c">
            <img src={Lion} alt="Logo" className="lion-li" />
            <span className="ml-6">{ps} PS</span>
          </li>
          <li className="flex ai-c">
            <img src={Lion} alt="Logo" className="lion-li" />
            <span className="ml-6">{new Intl.NumberFormat("de-DE").format(km)} km</span>
          </li>
          <li className="flex ai-c">
            <img src={Lion} alt="Logo" className="lion-li" />
            <span className="ml-6">TÜV {tuv}</span>
          </li>
        </ul>

        <p className="garantie">Garantie</p>

        <section className="flex jc-c">
          <button type="button" onClick={() => onClick(id)} className="car-box-small-btn-offer">
            Angebot anschauen
          </button>
        </section>
      </section>
    </a>
  )
}