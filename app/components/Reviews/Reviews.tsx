import { ReviewsBox } from '../ReviewsBox/ReviewsBox';

export function Reviews() {
  return (
    <section className="container r-main">
      <h2>Kundenbewertung</h2>
      <h3>Wir sind dann zufrieden, wenn Sie es sind</h3>
      <section className="flex jc-sb ai-s review-container">
        <ReviewsBox
          name="Maxim Gerhard"
          text="Ich bin absolut begeistert von dem Service, den ich bei 24Mobility erhalten habe. Das Team war stets freundlich, professionell und hilfsbereit. Der gesamte Prozess des Mietkaufs war unkompliziert und transparent. Besonders beeindruckt hat mich die Flexibilität, die mir geboten wurde, um die besten Bedingungen für meine Bedürfnisse zu finden."
        />
        <ReviewsBox
          name="Mehmet Celik"
          text="Die Vertragsbedingungen sind fair und transparent, ohne versteckte Kosten. Ich schätze besonders die Flexibilität, die mir ermöglicht hat, das Fahrzeug je nach Bedarf anzupassen. Der Kundenservice ist hervorragend und immer erreichbar, wenn man Fragen hat."
        />
        <ReviewsBox
          name="Alina Neuhaus"
          text="Ich habe mich für den Mietkauf bei 24Mobility entschieden und könnte nicht zufriedener sein. Die Mietkaufoptionen sind sehr attraktiv und haben mir ermöglicht, ein hochwertiges Fahrzeug zu fahren, ohne sofort den vollen Kaufpreis bezahlen zu müssen. Der gesamte Prozess wurde professionell abgewickelt, und ich fühlte mich stets gut betreut."
        />
      </section>
    </section>
  )
}