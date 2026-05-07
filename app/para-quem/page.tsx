import Image from "next/image";
import { ContactBand, Footer, InteriorHero } from "../site";
import { paraQuemQuestions } from "../data";

export default function ParaQuemPage() {
  return (
    <main>
      <InteriorHero
        image="/assets/banner-para-quem.jpeg"
        title="Para quem?"
        eyebrow="Você sabe quanto gasta por mês?"
      />

      <section className="intro-section para-intro">
        <p>
          Quanto precisa poupar para se aposentar ou para fazer a viagem dos seus
          sonhos? Vanessa Ortega conversa com quem quer clareza, autonomia e
          decisões financeiras mais conscientes.
        </p>
      </section>

      <section className="question-section">
        <div className="question-mark">
          <Image src="/assets/seta-12.png" alt="" width={105} height={103} />
        </div>
        <div className="question-list">
          {paraQuemQuestions.map((question) => (
            <article key={question}>
              <p>{question}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="image-break">
        <Image src="/assets/foto-para-quem.jpg" alt="" width={1920} height={651} />
      </section>

      <ContactBand />
      <Footer />
    </main>
  );
}
