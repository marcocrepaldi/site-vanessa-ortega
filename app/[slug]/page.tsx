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
          
          {slug === "diagnostico" && (
            <p>
              Estamos criando a <strong>CASA</strong>, nossa nova plataforma exclusiva que vai transformar 
              a maneira como você gerencia sua vida financeira. Um espaço pensado para acolher, 
              organizar e impulsionar seus objetivos com tecnologia e humanidade.
            </p>
          )}

          <p>
            Para saber mais sobre como este serviço ou nossa nova plataforma podem 
            transformar sua realidade financeira, entre em contato conosco. 
            Estamos prontos para desenhar a melhor estratégia para os seus objetivos.
          </p>
        </div>
      </section>
      <ContactBand />
      <Footer />
    </main>
  );
}
