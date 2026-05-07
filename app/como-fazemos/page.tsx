import Image from "next/image";
import { ContactBand, Footer, InteriorHero, ArrowLink } from "../site";
import { services } from "../data";

export default function ComoFazemosPage() {
  return (
    <main>
      <InteriorHero
        image="/assets/banner-como-fazemos.jpg"
        title="Como fazemos"
        eyebrow="Suporte completo em consultoria, educação e planejamento financeiro"
      />

      <section className="intro-section">
        <p>
          Nosso objetivo é proporcionar um suporte completo em consultoria,
          educação e planejamento financeiro, acompanhando você em cada passo rumo
          às suas metas. Queremos que você se sinta confiante em suas decisões.
        </p>
        <h2>Entenda por onde começar</h2>
      </section>

      <section className="service-grid">
        {services.map((service) => (
          <article className="service-card" key={service.slug}>
            <Image src={service.icon} alt="" width={140} height={120} className="service-icon" />
            <h2>{service.title}</h2>
            <p>{service.summary}</p>
            <ArrowLink href={`/${service.slug}`}>SAIBA MAIS</ArrowLink>
          </article>
        ))}
      </section>

      <section className="image-break">
        <Image src="/assets/foto-como-fazemos.jpg" alt="" width={1920} height={650} />
      </section>

      <ContactBand />
      <Footer />
    </main>
  );
}
