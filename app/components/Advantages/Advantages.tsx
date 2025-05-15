import { AiFillEuroCircle } from "react-icons/ai";
import Lion from '../../assets/lion.png';

export function Advantages() {
  return (
    <section className="flex jc-sb ai-c">
      <section className="flex w-100 ai-c adv">
        <section className="bg-deko flex ai-c jc-c">
          <h3>Was bieten wir ?</h3>
        </section>

        <section className="flex jc-c ai-c offer-box-content">

        <section className="offer-box flex">
            <section className="offer-header-box flex fd-col ai-c">
              <h3>Flexible & Günstig</h3>
              <p>
              Unser Mobility-Konzept ermöglicht Ihnen finanzielle Flexibilität und schont zudem Ihre Bonität, unabhängig von Ihrer Schufa, Ihrem Credit-Rating oder Ihrem Verschuldungsgrad.
              </p>
              <img src={Lion} alt="Lion" />
            </section>
          </section>

          <section className="offer-box flex">
            <section className="offer-header-box flex fd-col ai-c">
              <h3>Große Auswahl</h3>
              <p>
              Bei uns haben Sie Zugang zu einer breiten Palette von Fahrzeugen. Wählen Sie das Modell, dass am besten zu Ihren Bedürfnissen und Anforderungen passt.
              </p>
              <img src={Lion} alt="Lion" />
            </section>
          </section>

          <section className="offer-box flex">
            <section className="offer-header-box flex fd-col ai-c">
              <h3>Unterstützung</h3>
              <p>
              Wir unterstützen junge Unternehmen wie z.B Handwerksbetriebe, Speditionen und Werkstätten ihr Geschäft zu erweitern.
              </p>
              <img src={Lion} alt="Lion" />
            </section>
          </section>

        </section>
      </section>
    </section>
  )
}