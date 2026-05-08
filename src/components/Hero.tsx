import React, { useState, useEffect } from "react";
import { S, btn } from "../styles/theme";
import { CONFIG } from "../constants/config";
import { NAV_LINKS } from "../constants/navLinks";

interface HeaderProps {
  onAgendar: () => void;
}

export default function Header({ onAgendar }: HeaderProps) {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollIntoView = (id: string) => {
  // Se for início, ou se o ID não for encontrado, sobe pro topo
  if (id === "inicio") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Plano B: Se clicou e não achou o ID, volta pro topo
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
};

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      boxShadow: scrolled ? S.shadow : "none",
      transition: "all .3s",
      fontFamily: S.font,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer" }} onClick={() => scrollIntoView("inicio")}>
          <svg viewBox="0 0 24 24" fill="none" stroke={S.green} strokeWidth="2" style={{ width: 26, height: 26 }}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span style={{ fontWeight: 700, fontSize: 17, color: S.dark, letterSpacing: -0.3 }}>{CONFIG.name}</span>
        </div>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", gap: 4 }}>
            {NAV_LINKS.map((l) => (
              <button 
                onClick={() => scrollIntoView(l.href)} 
                style={{
                  background: "none", border: "none", padding: "8px 14px", cursor: "pointer",
                  fontSize: 14, fontWeight: 500, color: S.gray, fontFamily: S.font,
                  borderRadius: 8, transition: "all .15s",
                }}
              >
                {l.label}
              </button>
            ))}
          </div>
          <button 
            style={{ ...(btn.primary as React.CSSProperties), padding: "10px 24px", fontSize: 14, marginLeft: 8 }}
            onClick={onAgendar}
          >
            Agendar
          </button>
        </nav>
      </div>
    </header>
  );
}