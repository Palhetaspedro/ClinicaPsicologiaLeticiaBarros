import React, { useState, useEffect } from "react";
import { S, btn } from "../styles/theme";
import { CONFIG } from "../constants/config";
import { NAV_LINKS } from "../constants/navLinks";

interface FooterProps {
  onAgendar: () => void;
}

export default function Footer({ onAgendar }: FooterProps) {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth <= 768);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ background: "#111", padding: isMobile ? "48px 20px 32px" : "60px 24px 32px", fontFamily: S.font as string, color: "#888" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr",
          gap: isMobile ? 32 : 48,
          marginBottom: 48,
        }} className="grid-3">

          {/* Coluna 1: Logo e Descrição */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 16 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke={S.green as string} strokeWidth="2" style={{ width: 22, height: 22 }}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span style={{ fontWeight: 700, fontSize: 16, color: "#fff" }}>{CONFIG.name}</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.75, maxWidth: 280, color: "#666" }}>
              Cuidado psicológico com empatia, responsabilidade e compromisso com o seu bem-estar.
            </p>
            <div style={{ marginTop: 20, fontSize: 13, color: S.green as string }}>{CONFIG.crp}</div>
          </div>

          {/* Coluna 2: Navegação */}
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 16, letterSpacing: 1, textTransform: "uppercase" }}>
              Navegação
            </p>
            {NAV_LINKS.map(l => (
              <button
                key={l.href}
                onClick={() => {
                  if (l.href === "#home" || l.href === "#inicio" || l.label.toLowerCase() === "início") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    scrollTo(l.href);
                  }
                }}
                style={{
                  display: "block", background: "none", border: "none", color: "#666",
                  fontSize: 14, cursor: "pointer", fontFamily: S.font as string,
                  padding: "4px 0", textAlign: "left", transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = S.green as string)}
                onMouseLeave={e => (e.currentTarget.style.color = "#666")}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Coluna 3: Contato */}
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 16, letterSpacing: 1, textTransform: "uppercase" }}>Contato</p>
            <p style={{ fontSize: 14, color: "#666", marginBottom: 6 }}>{CONFIG.instagram}</p>
            <p style={{ fontSize: 14, color: "#666", marginBottom: 6 }}>{CONFIG.email}</p>
            <button
              style={{ ...(btn.primary as React.CSSProperties), marginTop: 12, padding: "10px 20px", fontSize: 13, width: isMobile ? "100%" : "auto" }}
              onClick={onAgendar}
              onMouseEnter={e => (e.currentTarget.style.background = S.greenHover as string)}
              onMouseLeave={e => (e.currentTarget.style.background = S.green as string)}
            >
              Agendar
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: "1px solid #222", paddingTop: 24,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "center" : "center",
          textAlign: isMobile ? "center" : "left",
          flexWrap: "wrap", gap: 12,
        }}>
          <p style={{ fontSize: 13, color: "#444", margin: 0 }}>© 2026 {CONFIG.name}. Todos os direitos reservados.</p>
          <p style={{ fontSize: 13, color: "#333", margin: 0 }}>Psicóloga · {CONFIG.crp}</p>
        </div>
      </div>
    </footer>
  );
}