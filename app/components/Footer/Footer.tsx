import { AiFillInstagram, AiFillTikTok } from 'react-icons/ai';
import Logo from '../../assets/logo_1.png';
import { Link } from '@remix-run/react';
import { FiChevronRight } from 'react-icons/fi';

export function Footer() {
  return (
    <section className="footer">
      <section className="container">
      
      <section className="flex jc-sb w-100 ai-s f-header f-wrap">
        <section className="flex">
          <img src={Logo} alt="Logo" />
        </section>

        <section>
          <h3>Kontakmöglichkeiten</h3>
          <ul>
            <li>
              <Link to="/impressum_datenschutz">Impressum</Link>
            </li>
            <li>
              <Link to="/datenschutz">Datenschutz</Link>
            </li>
            <li>
              <Link to="/fleet">Fuhrparklösungen</Link>
            </li>
          </ul>
        </section>

        <section>
          <h3>Nützliche Links</h3>
          <ul>
            <li>
              <Link to="/cars">Fahrzeuge</Link>
            </li>
            <li>
              <Link to="/fleet">Fuhrparklösungen</Link>
            </li>
            <li>
              <Link to="/about_us">Über uns</Link>
            </li>
            <li>
              <Link to="/contact">Kontakt</Link>
            </li>
          </ul>
        </section>

        <section>
          <h3>Newsletter</h3>
          <p>Abboniere unseren Newsletter!</p>
          <section className="flex ai-c">
            <input type="text" name="newsletter" placeholder="E-Mail Adresse" />
            <button type="button"><FiChevronRight size={20} color="#fff" /></button>
          </section>
        </section>

      </section>

      <section className="flex ai-c jc-c f-f">
        <span>&copy; 24Mobility 2024</span>
      </section>

      </section>
    </section>
  )
}