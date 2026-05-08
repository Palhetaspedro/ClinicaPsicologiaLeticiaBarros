import React, { useState } from "react";
import { S } from "../styles/theme";
import { CONFIG } from "../constants/config";

// Tipagem para os itens de contato
interface ContactItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}

export default function ContactCards() {
  const contacts: ContactItem[] = [
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 28, height: 28 }}><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>,
      label: "Instagram", value: CONFIG.instagram, href: CONFIG.instagramUrl,
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 28, height: 28 }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
      label: "WhatsApp", value: "(62) 99318-0772", href: `https://wa.me/${CONFIG.whatsapp}`,
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 28, height: 28 }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
      label: "E-mail", value: CONFIG.email, href: `mailto:${CONFIG.email}`,
    },
  ];

  return (
    <section id="contato" style={{ padding: "100px 24px", background: S.white as string, fontFamily: S.font as string }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: S.green as string, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Entre em contato</p>
        <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, color: S.dark as string, margin: "0 0 12px", letterSpacing: -1 }}>
          Vamos <span style={{ color: S.green as string, fontStyle: "italic" }}>conversar?</span>
        </h2>
        <p style={{ fontSize: 16, color: S.gray as string, marginBottom: 56 }}>Psicóloga {CONFIG.name} · {CONFIG.crp}<br />Entre em contato por qualquer um dos canais abaixo</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="grid-3">
          {contacts.map(c => <ContactCard key={c.label} c={c} />)}
        </div>
      </div>
    </section>
  );
}

// Sub-componente com tipagem das props
function ContactCard({ c }: { c: ContactItem }) {
  const [hov, setHov] = useState(false);

  // Estilos compartilhados
  const commonStyles: React.CSSProperties = {
    background: hov ? S.greenBg as string : S.white as string,
    border: `1.5px solid ${hov ? S.green : S.border}`,
    borderRadius: S.radius as string,
    padding: "36px 24px",
    boxShadow: hov ? S.shadowHover as string : S.shadow as string,
    transition: "all .25s",
    textAlign: "center",
    textDecoration: "none", // Remove sublinhados se for link
    display: "block",
  };

  // Conteúdo interno do card
  const content = (
    <>
      <div style={{ color: S.green as string, marginBottom: 16, display: "flex", justifyContent: "center" }}>
        {c.icon}
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, color: S.dark as string, marginBottom: 6 }}>
        {c.label}
      </div>
      <div style={{ fontSize: 14, color: S.gray as string }}>
        {c.value}
      </div>
    </>
  );

  // SE TIVER HREF E NÃO FOR EMAIL -> RENDERIZA LINK
  if (c.href && c.label !== "E-mail") {
    return (
      <a
        href={c.href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{ ...commonStyles, cursor: "pointer" }}
      >
        {content}
      </a>
    );
  }

  // CASO CONTRÁRIO (EMAIL OU SEM HREF) -> RENDERIZA APENAS DIV
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ ...commonStyles, cursor: "default" }}
    >
      {content}
    </div>
  );
}