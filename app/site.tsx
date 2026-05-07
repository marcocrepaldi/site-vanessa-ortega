import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { MobileNav } from "./mobile-nav";

const navItems = [
  { label: "Quem Somos", href: "/" },
  { label: "Como fazemos", href: "/como-fazemos" },
  { label: "Fale com a gente", href: "/fale-com-a-gente" },
];

export function Header() {
  return (
    <header className="site-header">
      <Link className="logo-link" href="/" aria-label="Verena">
        <Image src="/assets/logo-verena.png" alt="Vanessa Ortega" width={285} height={64} priority />
      </Link>

      <nav className="main-nav" aria-label="Principal">
        {navItems.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="social-links" aria-label="Redes sociais">
        <Link href="https://www.instagram.com/avanessaconta" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <Instagram size={19} strokeWidth={2.3} />
        </Link>
        <Link href="https://www.linkedin.com/in/vanortega" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <Linkedin size={18} strokeWidth={2.3} />
        </Link>
      </div>

      <MobileNav items={navItems} />
    </header>
  );
}

export function InteriorHero({
  image,
  title,
  eyebrow,
}: {
  image: string;
  title: string;
  eyebrow?: string;
}) {
  return (
    <section className="interior-hero">
      <Image src={image} alt="" fill priority sizes="100vw" className="interior-hero-image" />
      <Header />
      <div className="interior-hero-copy">
        {eyebrow ? <p>{eyebrow}</p> : null}
        <h1>{title}</h1>
      </div>
    </section>
  );
}

export function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link className="arrow-link" href={href}>
      <span>{children}</span>
      <ArrowUpRight size={25} />
    </Link>
  );
}

export function ContactBand() {
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

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <Image src="/assets/logo-verena.png" alt="Vanessa Ortega" width={220} height={49} />
        <p>Consultoria, Educação e Planejamento Financeiro</p>
      </div>
      <nav aria-label="Rodapé">
        {navItems.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
