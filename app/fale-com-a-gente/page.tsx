import Image from "next/image";
import { ContactBand, Footer, InteriorHero } from "../site";
import { ContactForm } from "./contact-form";

export default function FalePage() {
  return (
    <main>
      <InteriorHero
        image="/assets/banner-contato.jpg"
        title="Fale com a gente"
        eyebrow="Vamos conversar sobre seus objetivos"
      />

      <section className="contact-page">
        <div className="contact-photo-wrap">
          <Image
            src="/assets/foto-contato.jpg"
            alt=""
            fill
            sizes="(max-width: 767px) 100vw, min(1100px, calc(100vw - 40px))"
            className="contact-photo"
          />
        </div>

        <div className="contact-page-body">
          <div className="contact-copy">
            <h2>Entre em contato</h2>
            <p>
              Conte para a gente em que momento financeiro você está. A partir
              disso, indicamos o melhor caminho para começar.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      <ContactBand />
      <Footer />
    </main>
  );
}
