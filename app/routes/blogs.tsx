
import Image from '~/assets/lambo.jpg';
import Amg from '../assets/blog_4.jpg';
import Img2 from '../assets/blog4.jpg';
import { Footer } from '~/components/Footer/Footer';
import { Header } from '~/components/Header/Header';
import '../styles/index.css';
import '../styles/blog.css';

export default function Blogs() {
  return (
    <>
      <Header />
        <main className="main container blog-main" role="main">
          <h2>Blog</h2>
          <h3>Alle Neuigkeiten auf einen Blick</h3>

          <section className="blog-d">

            <section className="blog first-blog">

              <section className="blog-box blog-first">
                <section>
                  <img src={Amg} className="img-blog" />
                </section>

                <section className="blog-card">
                  <small>Montag, 24.06.2024</small>
                  <h4>Langzeitmiete + Kaufoption</h4>
                  <p>
                    Die Langzeitmiete mit Kaufoption, auch bekannt als Mietkauf oder Leasing mit Kaufoption, ist ein Mietverhältnis, bei dem der Mieter das Recht hat, das gemietete Objekt nach Ablauf der Mietdauer zu kaufen.
                  </p>
                  <a href="/bloglangzeitmiete">Mehr Lesen</a>
                </section>

              </section>

            </section>

          </section>

          
          <section className="blog-d blog-two">

            <section className="blog">

              <section className="blog-box">
                <section>
                  <img src={Image} className="img-blog" />
                </section>

                <section className="blog-card">
                  <small>Montag, 23.04.2024</small>
                  <h4>Mietkauf</h4>
                  <p>In der heutigen Zeit suchen viele Menschen nach flexiblen und erschwinglichen Möglichkeiten, um an hochwertige Produkte zu gelangen, sei es ein Auto, ein Elektrogerät oder sogar eine Immobilie. Eine Option, die immer beliebter wird, ist der Mietkauf. In diesem Blogbeitrag werfen wir einen genaueren Blick auf das Konzept des Mietkaufs und wie Renting24 Ihnen dabei helfen kann, Ihre Mobilitätsbedürfnisse zu erfüllen.</p>
                  <a href="/blogmietkauf">Mehr Lesen</a>
                </section>

              </section>

            </section>

            <section className="blog">

              <section className="blog-box">
                <section>
                  <img src={Img2} className="img-blog" />
                </section>

                <section className="blog-card">
                  <small>Montag, 20.07.2024</small>
                  <h4>Neue Flotte</h4>
                  <p>Bald Verfügbar</p>
                  <a href="#">Mehr Lesen</a>
                </section>

              </section>

              </section>

          </section>

          <section className="pagni">
            <section className="pagni-container">
              <section className="pagni-btn-container"> 
                <i className="fa-solid fa-arrow-left"></i>
                <button type="button">1</button>
                <i className="fa-solid fa-arrow-right"></i>
              </section>
            </section>
          </section>
        </main>
      <Footer />
    </>
  )
}