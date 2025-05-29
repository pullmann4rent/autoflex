import { Footer } from "~/components/Footer/Footer";
import { Header } from "~/components/Header/Header";
import '../styles/index.css';
import '../styles/fleet.css';

export default function Fleet() {
  return (
    <>
      <Header />
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d19488.87788237673!2d9.6993!3d52.3684302!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b074f351c01031%3A0xa72cb0445d34c687!2sF%C3%B6ssestra%C3%9Fe%2099A%2C%2030453%20Hannover!5e0!3m2!1sde!2sde!4v1717598812049!5m2!1sde!2sde" width="600" height="450" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      <section className="container fleet">

        <h1>Furhparklösungen</h1>
        <h3>Langzeitmiete mit Kaufoption</h3>
        <section className="flex jc-sb fleet-content">
          <section className="fleet-box">
            <p>
              Als Mietkäufer mieten Sie das Fahrzeug und zahlen dafür eine monatliche Miete. Eine Laufzeit wird vorher vereinbart. Nach Beendigung der Laufzeit gehört das Auto dem Mieter. Die gezahlten Monatsraten werden für die Tilgung berechnet.
            </p>
            <br />
            <p>Von Monatsmieten bis Langzeitmiete mit Kaufoption - Wir haben jede Menge Möglichkeiten. Erstellen Sie heute noch ein unverbindliches Angebot mit einem unserer Fachberater.</p>
            <br />
            <p>Wir bieten spezielle Angebote für Flottenkunden und unterstützen Unternehmen bei der Kaufentscheidung von Fahrzeugen, die ihren Anforderungen entsprechen.</p>
          </section>

          <section className="fleet-box">
            <form method="POST" className="flex fd-col">
              <input type="text" name="name" placeholder="Dein Name" />
              <input type="email" name="email" placeholder="Deine E-Mail" />
              <textarea className="area-white" placeholder="Dein Anliegen....">
                
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