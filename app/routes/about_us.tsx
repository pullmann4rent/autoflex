import { Footer } from "~/components/Footer/Footer";
import { Header } from "~/components/Header/Header";
import Car from '~/assets/about.jpg';
import Logo from '~/assets/lion.png';
import '../styles/index.css';
import '../styles/about.css';
import { GoCheckCircleFill } from "react-icons/go";

export default function AboutUs() {
  return (
    <section>
      <Header />
      <section className="about_us container">
        <h1>Über uns</h1>
        <h3>Langzeitmiete & Kaufoption</h3>

        <section className="flex ai-s jc-sb ab-content">
          <section className="about-box">
            <p>
              PKW & Nutzfahrzeuge Mietkauf ohne SCHUFA Abfrage Wir halten Sie mobil! Geschäftlich oder Privat soll es Ihnen niemals an Mobilität fehlen. Wir sind Ihr Partner für Autovermietung, Langzeitmiete, Autofinanzierung ohne Schufa und den passenden Mietkauf zum Auto oder Nutzfahrzeug. Sie suchen nach einem PKW für Ihren Gebrauch oder nach einem Nutzfahrzeug für Ihr Unternehmen? Für Sie als Privatperson oder Gewerbebetreibender ist SCR-Langzeitmiete mit Kaufoption ohne Schufa die interessante Finanzierungsalternative. Bei uns finden Sie die Lösung, wenn z.B. die Bank „nein“ sagt. Negative SCHUFA? Kein Problem! Alles was wir benötigen sind lediglich ein Personalausweis, ein Führerschein und eine entsprechende Anzahlung für das gewünschte Fahrzeug. Die Laufzeit für Ihre Autofinanzierung ohne Schufa kann 12 bis 36 Monate betragen. Sollten Sie längerfristig planen wollen, werden wir das selbstverständlich gerne für Sie prüfen. Da sich fast jede Bank bei der SCHUFA Daten über Ihre Kreditwürdigkeit einholt, ist es fast unmöglich geworden oft nur mit einem kleinen Negativeintrag ein KFZ auf dem normalen Finanzierungsweg zu bekommen. Für Unternehmer ist eine turbulente Gründungsphase, weitreichende Investitionen oder finanzielle Herausforderungen maßgeblich. PKW- Mietkauf bietet maßgeschneiderte Finanzierungslösungen für Ihren Fuhrpark oder für Sie als Privatperson. Wir erstellen Unsere Vorteile auf einen Blick:
            </p>
            <br />
            <ul>
              <li className="flex ai-c">
                  <GoCheckCircleFill size={22} color="limegreen" />
                  <span className="ml-6">Keine Schufa Abfrage</span>
                </li>
              <li>
                  <GoCheckCircleFill size={22} color="limegreen" />
                  <span className="ml-6">Ohne Bankauskunft</span>
              </li>
              <li>
                  <GoCheckCircleFill size={22} color="limegreen" />
                  <span className="ml-6">Auch mit negativem Schufa-Eintrag</span>
              </li>
              <li>
                  <GoCheckCircleFill size={22} color="limegreen" />
                  <span className="ml-6">Keine versteckten Kosten</span>
              </li>
              <li>
                  <GoCheckCircleFill size={22} color="limegreen" />
                  <span className="ml-6">Riesiges Angebot an Fahrzeugen</span>
              </li>
              <li>
                  <GoCheckCircleFill size={22} color="limegreen" />
                  <span className="ml-6">Faire Konditionen</span>
              </li>
              <li>
                  <GoCheckCircleFill size={22} color="limegreen" />
                  <span className="ml-6">Mwst. Ausweisbar für Gewerbekunden</span>
              </li>
            </ul>
            <br />
            <p>
              Profitieren Sie von unserer langjährigen und geschulten Erfahrung und vereinbaren noch heute einen Beratungstermin mit einem unserer Kundenberater. Vergleichen Sie jetzt unsere Konditionen und fragen noch heute Ihren persönlichen Favoriten an. 
              Wir von PKW-Mietkauf sind die Tochtergesellschaft von Sports Cars Rental, einer Autovermietung für Kleinwagen, Sportwagen, Hochzeitswagen & SUV‘s (<a href="https://renting24.de" target="_blank">www.renting24.de</a>)
            </p>
          </section>

          <section className="about-box">
            <img src={Car} alt="Auto" />

            <section className="about-lion flex jc-c ai-c fd-col">
              <img src={Logo} alt="Logo" />
              <p>Mietkauf in Hannover und Umgebung</p>
            </section>
          </section>
        </section>
      </section>
      <Footer />
    </section>
  )
}