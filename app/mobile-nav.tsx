"use client";

import Link from "next/link";
import { Instagram, Linkedin, Menu, X } from "lucide-react";
import { useState } from "react";

type NavItem = {
  label: string;
  href: string;
};

export function MobileNav({ items }: { items: NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="menu-button"
        type="button"
        aria-label="Abrir menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
      >
        <Menu size={28} />
      </button>

      <div className={`mobile-menu ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen}>
        <button
          className="mobile-menu-backdrop"
          type="button"
          aria-label="Fechar menu"
          onClick={() => setIsOpen(false)}
        />
        <aside className="mobile-sidebar" aria-label="Menu principal">
          <button
            className="mobile-close"
            type="button"
            aria-label="Fechar menu"
            onClick={() => setIsOpen(false)}
          >
            <X size={26} />
          </button>

          <nav>
            {items.map((item) => (
              <Link href={item.href} key={item.href} onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mobile-social">
            <Link href="https://www.instagram.com/avanessaconta" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={22} />
            </Link>
            <Link href="https://www.linkedin.com/in/vanortega" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={21} />
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
