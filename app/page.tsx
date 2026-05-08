import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Instagram, MessageCircle } from "lucide-react";
import { Header } from "./site";

const heroSlides = [
  {
    image: "/assets/banner-1.jpg",
    title: "Consultoria,\nEducação &\nPlanejamento\nFinanceiro",
  },
  {
    image: "/assets/banner-2.jpg",
    title: "Educação\nfinanceira para\nsuas escolhas",
  },
  {
    image: "/assets/banner-3.jpg",
    title: "Planejamento\npara cada fase\nda vida",
  },
  {
    image: "/assets/banner-4.jpg",
    title: "Decisões mais\nconscientes e\nseguras",
  },
];

const cards = [
  {
    title: "PARA QUEM?",
    text: "Saiba para quem e\ncomo podemos ajudar",
    href: "/para-quem",
    tone: "lilac",
  },
  {
    title: "PALESTRAS",
    text: "Educação financeira\nempresarial, Rodas de\nconversa e Workshops",
    href: "/palestra-educacao",
    tone: "cyan",
  },
  {
    title: "DIAGNÓSTICO",
    text: "Faça seu diagnóstico\ncom a gente agora",
    href: "/diagnostico",
    tone: "purple",
  },
];

function Hero() {
  return (
    <section className="hero" aria-label="Vanessa Ortega">
      <div className="hero-slider">
        {heroSlides.map((slide, index) => (
          <div className="hero-slide" key={slide.image}>
            <Image
              src={slide.image}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="hero-image"
            />
          </div>
        ))}
      </div>

      <Header />

      <div className="hero-content">
        <h1>{heroSlides[0].title}</h1>
        <Link className="hero-cta" href="/saiba-mais">
          <span>Saiba Mais</span>
          <ArrowUpRight size={17} />
        </Link>
      </div>

      <div className="hero-dots" aria-hidden="true">
        <span className="dot active" />
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    </section>
  );
}

function FeatureCards() {
  return (
    <section className="feature-wrap" aria-label="Caminhos de atendimento">
      <div className="feature-cards">
        {cards.map((card) => (
          <Link className={`feature-card ${card.tone}`} href={card.href} key={card.href}>
            <div>
              <h2>{card.title}</h2>
              <p>{card.text}</p>
            </div>
            <ArrowUpRight className="feature-arrow" size={42} strokeWidth={1.8} />
          </Link>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about-section" id="quem-somos">
      <div className="about-inner">
        <div className="about-image">
          <Image
            src="/assets/home-quem-somos.png"
            alt="Atendimento Verena Finanças"
            width={320}
            height={324}
            sizes="(max-width: 900px) 100vw, 48vw"
          />
        </div>

        <div className="about-copy">
          <p className="lead">
            Vanessa Ortega tem o propósito de inspirar você a ser mais
            consciente das suas escolhas e decisões financeiras — e a se
            tornar protagonista da sua própria jornada de vida.
          </p>
          <p>
            Com uma sólida trajetória no mercado financeiro, repleta de
            experiências e conexões valiosas, Vanessa traz uma vision
            humana e precisa para quem quer tomar as rédeas da própria
            vida financeira.
          </p>
          <p>
            Seu compromisso é acolher e empoderar quem busca clareza com
            o dinheiro — especialmente mulheres, mas aberto a todos que
            desejam uma orientação financeira personalizada, honesta e
            verdadeiramente focada nos seus objetivos.
          </p>
        </div>
      </div>
    </section>
  );
}

function FinancialStudyCTA() {
  return (
    <section className="home-cta-section">
      <div className="home-cta-inner">
        <span className="home-cta-tag">Novidade Exclusiva</span>
        <h2 className="home-cta-title">Quanto falta para sua liberdade financeira?</h2>
        <p className="home-cta-text">
          Visualize sua jornada e descubra como atingir seus objetivos de patrimônio 
          e renda vitalícia com nosso novo simulador exclusivo de curva financeira.
        </p>
        <Link href="/saiba-mais" className="home-cta-btn">
          <span>Simular Minha Curva Agora</span>
          <ArrowUpRight size={22} />
        </Link>
      </div>
    </section>
  );
}

function ContactBand() {
  return (
    <section className="contact-band" aria-label="Contatos">
      <article>
        <h2>Vanessa Ortega</h2>
        <p>vanessa@vanessaortega.com.br</p>
        <div className="contact-icons">
          <Link href="https://www.instagram.com/avanessaconta" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram size={29} />
          </Link>
          <Link href="https://wa.me/5511955541470" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <MessageCircle className="whatsapp" size={29} />
          </Link>
          <span>11 95554-1470</span>
        </div>
      </article>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />
      <FeatureCards />
      <About />
      <FinancialStudyCTA />
      <ContactBand />
    </main>
  );
}

