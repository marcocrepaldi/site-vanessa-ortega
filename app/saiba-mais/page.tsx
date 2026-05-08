"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ContactBand, Footer, InteriorHero } from "../site";
import { LeadForm } from "./lead-form";
import { FinancialCalculator } from "./financial-calculator";

export default function SaibaMaisPage() {
  const [showCalculator, setShowCalculator] = useState(false);

  return (
    <main>
      <InteriorHero
        image="/assets/banner-1.jpg"
        title={showCalculator ? "Seu Estudo Financeiro" : "Dê o primeiro passo"}
        eyebrow={showCalculator ? "Personalizado para Vanessa Ortega" : "Consultoria, Educação e Planejamento Financeiro"}
      />

      <section className="contact-page">
        <div className="contact-page-inner max-w-[1280px] mx-auto px-5">
          {!showCalculator ? (
            <div className="contact-page-body" style={{ gridTemplateColumns: "1.2fr 1fr", gap: "60px", alignItems: "center" }}>

              <div className="contact-copy">
                <h2>Transforme sua relação com o dinheiro</h2>
                <p style={{ fontSize: "17px", lineHeight: "1.7" }}>
                  Nosso propósito é inspirar você a ter mais consciência sobre suas escolhas financeiras e se tornar protagonista da sua jornada.
                </p>
                <p style={{ fontSize: "17px", lineHeight: "1.7" }}>
                  Descubra sua curva financeira e planeje seu futuro. Insira seus dados abaixo para visualizar sua jornada até a independência financeira.
                </p>
                <p style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--lilac)", fontWeight: 600 }}>
                  Acesse gratuitamente nossa calculadora de planejamento para visualizar sua projeção de patrimônio e renda.
                </p>
              </div>

              <LeadForm onSuccess={() => setShowCalculator(true)} />
            </div>
          ) : (
            <FinancialCalculator />
          )}
        </div>
      </section>

      <ContactBand />
      <Footer />
    </main>
  );
}
