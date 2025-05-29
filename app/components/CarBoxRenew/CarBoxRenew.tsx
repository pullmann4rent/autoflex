import { SlPicture } from 'react-icons/sl';
import Lion from '../../assets/lion.png';
import { Link } from '@remix-run/react';
import { ICar } from './types';

export function CarBoxRenew({
  id
}: ICar) {
  return (
    <section>
      <section className="car-box car-box-small relative pointer">

        <img src={Lion} alt="Löwe" className="lion-car" />

        <p className="car-title">BMW 520d M Paket</p>
        <p className="car-subtitle">Sportwagen</p>

        <section className="flex ai-c">

          <section className="w-100">
            <img src="https://res.cloudinary.com/do8ssnxjw/image/upload/v1714408231/uploads/qxn8er4ayntf86wuymsg.png" />
          </section>
  
        </section>

      </section>

      <section className="car-box-footer">
        <section className="flex jc-sb ai-c">
          <button type="button" className="car-box-picture-btn flex ai-c">
            <SlPicture />
            <span className="ml-6">7 Fotos</span>
          </button>
          <p className="car-box-small-price">29.999 €</p>
        </section>

        <ul className="flex f-wrap jc-sb">
          <li>Automatik</li>
          <li>Diesel</li>
          <li>12.2022</li>
          <li>164 PS</li>
          <li>45000 km</li>
          <li>Grau</li>
        </ul>

        <section className="flex jc-c">
          <Link to={`/car/${id}`} type="button" className="car-box-small-btn-offer">
            Angebot anschauen
          </Link>
        </section>
      </section>
    </section>
  )
}