import React, { useState, useEffect, useRef } from "react";
import { S } from "../styles/theme";

// Definição dos serviços
const SERVICES = [
  {
    id: 1,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 32, height: 32 }}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: "Terapia Individual",
    desc: "Acolhimento personalizado para adultos e adolescentes, focando no seu desenvolvimento pessoal.",
  },
  {
    id: 2,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 32, height: 32 }}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Ansiedade e Depressão",
    desc: "Tratamento especializado utilizando a TCC para lidar com transtornos de humor e ansiedade.",
  },
  {
    id: 3,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 32, height: 32 }}>
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
    title: "Autoconhecimento",
    desc: "Um processo profundo de descoberta para fortalecer sua autoestima e tomada de decisões.",
  },
];

interface ServiceProps {
  s: {
    id: number;
    icon: React.ReactNode;
    title: string;
    desc: string;
  };
  delay: number;
}

export default function ServiceCards() {
  return (
    <section id="servicos" style={{ padding: "100px 24px", background: S.white as string, fontFamily: S.font as string }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Container da Logo no Topo com Destaque Artístico */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          position: "relative", // Necessário para o efeito de fundo
          marginBottom: 48,
          padding: "20px 0"
        }}>

          {/* Efeito de Brilho Suave (Atrás da Logo) */}
          <div style={{
            position: "absolute",
            width: "400px",
            height: "300px",
            background: S.greenBg as string, // Cor suave do seu tema
            borderRadius: "50%",
            filter: "blur(60px)", // Cria a névoa suave
            opacity: 0.6,
            zIndex: 0
          }} />

          <img
            src="/crerser.png"
            alt="Logo Clínica Crer & Ser"
            style={{
              height: "350px",
              width: "auto",
              objectFit: "contain",
              position: "relative", // Garante que a logo fique sobre o brilho
              zIndex: 1,
              // Sombra suave para dar relevo à logo
              filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.08))"
            }}
          />
        </div>

        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: S.green as string, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>
            O que ofereço
          </p>
          <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, color: S.dark as string, margin: 0, letterSpacing: -1 }}>
            Serviços & <span style={{ color: S.green as string, fontStyle: "italic" }}>Diferenciais</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24 }}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} s={s} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ s, delay }: ServiceProps) {
  const [hov, setHov] = useState(false);
  const [vis, setVis] = useState(false);

  // Tipagem do Ref para o observador de interseção
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setTimeout(() => setVis(true), delay);
      },
      { threshold: 0.1 }
    );

    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? (S.greenBg as string) : (S.white as string),
        borderRadius: S.radius as string,
        padding: "36px 28px",
        border: `1.5px solid ${hov ? S.green : S.border}`,
        boxShadow: hov ? (S.shadowHover as string) : (S.shadow as string),
        cursor: "default",
        transition: "all .25s ease",
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(24px)",
      }}
    >
      <div style={{ color: S.green as string, marginBottom: 20 }}>{s.icon}</div>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: S.dark as string, margin: "0 0 10px" }}>{s.title}</h3>
      <p style={{ fontSize: 14, color: S.gray as string, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
    </div>
  );
}