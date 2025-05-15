import { useState } from "react";
import { GoCheckCircle, GoIssueClosed } from "react-icons/go";

export function LongTermRental() {
  const [step, setStep] = useState<number>(1);
  return (
    <section className="flex jc-sb ai-c fd-row-rev long-term container">
      <section>
        <iframe 
          src="https://www.youtube.com/embed/repLXt92EbI"
          className="iframe-short"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          title="24Mobility"
          >
        </iframe>
      </section>

      <section>
        <h2>Ablauf beim Mietkauf</h2>
        <h3>Auto mietkaufen auch ohne Bonität</h3>

        {
          step === 1 &&
          <section className="long-term-ablauf-container">
            <section className="flex ai-c long-term-ablauf-header">
              <span className="long-term-round mr-6">{step}</span>
              <span className="ml-6">Wunschfahrzeug auswählen</span>
            </section>

            <section>
              <p>
              Im ersten Schritt wählen Sie bitte ein Auto aus unserem Angebot aus. Wir bieten eine breite Palette an Fahrzeugen an, von herkömmlichen Autos bis hin zu Sportwagen. Sollten Sie an einem speziellen Modell interessiert sein, das wir nicht auf Lager haben, können Sie uns gerne kontaktieren.
              </p>

              <section className="flex ai-c long-term-btn-container">
                <button type="button" disabled={step === 1} >
                  Zurück
                </button>

                <button type="button" onClick={() => setStep(2)} className="btn-primary">
                  Weiter
                </button>
              </section>
            </section>
          </section>
        }

        {
          step === 2 &&
          <section className="long-term-ablauf-container">
            <section className="flex ai-c long-term-ablauf-header">
              <span className="long-term-round mr-6">{step}</span>
              <span className="ml-6">Termin vereinbarung</span>
            </section>

            <section>
              <p>
              Sobald Sie Ihr Auto ausgewählt und eine Anfrage gesendet haben, vereinbaren wir telefonisch einen Termin mit Ihnen. Bitte bringen Sie zu diesem Termin die folgenden Dokumente mit:

                <ul className="ul-long-term">
                  <li className="flex ai-c">
                    <GoCheckCircle color="limegreen" size={20} className="mr-6" />
                    <span>Führerschein</span>
                  </li>
                  <li className="flex ai-c">
                    <GoCheckCircle color="limegreen" size={20} className="mr-6" />
                    <span>Ausweis mit deutschem Wohnsitz</span>
                  </li>
                  <li className="flex ai-c">
                    <GoCheckCircle color="limegreen" size={20} className="mr-6" />
                    <span>ggl. Gewerbeschein</span>
                  </li>
                </ul>
              </p>

              <section className="flex ai-c long-term-btn-container">
                <button type="button" onClick={() => setStep(1)}>
                  Zurück
                </button>

                <button type="button" onClick={() => setStep(3)} className="btn-primary">
                  Weiter
                </button>
              </section>
            </section>
          </section>
        }

        {
          step === 3 &&
          <section className="long-term-ablauf-container">
            <section className="flex ai-c long-term-ablauf-header">
              <span className="long-term-round mr-6">{step}</span>
              <span className="ml-6">Anzahlen & Auto genießen</span>
            </section>

            <section>
              <p>
                Sobald Sie Ihre Anzahlung abgegeben haben können Sie ihr Auto mitnehmen.
                Schöne Fahrt!
              </p>

              <section className="flex ai-c long-term-btn-container">
                <button type="button" onClick={() => setStep(2)}>
                  Zurück
                </button>

                <button type="button" disabled className="btn-primary">
                  Weiter
                </button>
              </section>
            </section>
          </section>
        }
      </section>
    </section>
  )
}