import Lion from '../../assets/lion.png';

export function CarBox() {
  return (
    <section className="car-box relative pointer">

      <img src={Lion} alt="Löwe" className="lion-car" />

      <p className="car-title">BMW 520d M Paket</p>
      <p className="car-subtitle">Sportwagen</p>

      <section className="flex ai-c">

        <section className="w-50">
          <img src="https://res.cloudinary.com/do8ssnxjw/image/upload/v1714408231/uploads/qxn8er4ayntf86wuymsg.png" />
        </section>

        <section className="w-50 right-info flex jc-c">
          <ul className="flex f-wrap jc-c">
            <li>435 PS</li>
            <li>Automatik</li>
            <li>5-Sitzer</li>
            <li>2018</li>
            <li>TÜV 2025</li>
            <li>140.000 KM</li>
            <li className="price">89.999€</li>
          </ul>
        </section>
      
      </section>

      <section className="flex ai-c jc-sb btn-container fd-row-rev">
        <section className="flex ai-c">
          <button className="request-btn">Jetzt Anfragen</button>
        </section>

        <section className="flex jc-c ai-c">
          <button type="button">Ausstattungen</button>
          <button type="button">Konditionen</button>
          <button type="button">Bedingungen</button>
        </section>
      </section>

    </section>
  )
}