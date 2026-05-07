import { notFound } from "next/navigation";
import Image from "next/image";
import { ContactBand, Footer, InteriorHero } from "../site";
import { services } from "../data";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <main>
      <InteriorHero image={service.image} title={service.title} eyebrow="Vanessa Ortega" />
      <section className="service-detail">
        <div className="service-detail-icon">
          <Image src={service.icon} alt="" width={150} height={130} />
        </div>
        <div>
          <h2>{service.title}</h2>
          <p>{service.summary}</p>
          <p>
            Em uma próxima etapa, esta página pode receber o texto completo do
            WordPress original, depoimentos, perguntas frequentes e um formulário
            conectado para conversão.
          </p>
        </div>
      </section>
      <ContactBand />
      <Footer />
    </main>
  );
}
