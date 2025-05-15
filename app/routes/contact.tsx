import { Footer } from "~/components/Footer/Footer";
import { Header } from "~/components/Header/Header";
import '../styles/index.css';
import '../styles/fleet.css';
import { SlCallEnd, SlEnvolope, SlLocationPin } from "react-icons/sl";

export default function Fleet() {
  return (
    <>
      <Header />
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d19488.87788237673!2d9.6993!3d52.3684302!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b074f351c01031%3A0xa72cb0445d34c687!2sF%C3%B6ssestra%C3%9Fe%2099A%2C%2030453%20Hannover!5e0!3m2!1sde!2sde!4v1717598812049!5m2!1sde!2sde" width="600" height="450" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      <section className="container ctn fleet">

        <h1>Kontakt</h1>
        <h3>Kontaktieren Sie uns</h3>

        <section className="flex jc-sb contact-main">
          <section className="fleet-box contact-info">
            <ul>
              <li className="flex ai-c">
                <SlCallEnd size={32} className="contact-icon" />
                <span>0178 2498927</span>
              </li>
              <li className="flex ai-c">
                <SlEnvolope size={32} className="contact-icon" />
                <span>service@sportscarsrental.de</span>
              </li>
              <li className="flex ai-c">
                <SlLocationPin size={32} className="contact-icon" />
                <span>Fössestraße 99a, 30453 Hannover</span>
              </li>
            </ul>
          </section>

          <section className="fleet-box">
            <form method="POST" className="flex fd-col">
              <input type="text" name="name" placeholder="Dein Name" />
              <input type="email" name="email" placeholder="Deine E-Mail" />
              <textarea placeholder="Dein Anliegen....">
                
              </textarea>
              <button type="button">Jetzt Anfragen</button>
            </form>
          </section>
        </section>

      </section>
      <Footer />
    </>
  )
}