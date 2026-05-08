import React, { useState, useEffect } from "react";
import { S, btn } from "../styles/theme";
import { CONFIG } from "../constants/config";
import { NAV_LINKS } from "../constants/navLinks";

interface HeaderProps {
  onAgendar: () => void;
}

export default function Header({ onAgendar }: HeaderProps) {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mob, setMob] = useState<boolean>(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  
  const scrollIntoView = (id: string) => {
    setMob(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scroll = (id: string) => {
    setMob(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.08)" : "none",
      transition: "all .3s", fontFamily: S.font as string,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer" }} onClick={() => scroll("inicio")}>
          <svg viewBox="0 0 24 24" fill="none" stroke={S.green as string} strokeWidth="2" style={{ width: 26, height: 26 }}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span style={{ fontWeight: 700, fontSize: 17, color: S.dark as string, letterSpacing: -.3 }}>{CONFIG.name}</span>
        </div>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", gap: 4 }}>
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollIntoView(l.href)}
                style={{
                  background: "none",
                  border: "none",
                  padding: "8px 14px",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 500,
                  color: S.gray as string,
                  fontFamily: S.font as string,
                  borderRadius: 8,
                  transition: "all .15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = S.green as string)}
                onMouseLeave={(e) => (e.currentTarget.style.color = S.gray as string)}
              >
                {l.label}
              </button>
            ))}
          </div>

          <button
            style={{
              ...(btn.primary as React.CSSProperties),
              padding: "10px 24px",
              fontSize: 14,
              marginLeft: 8
            }}
            onClick={onAgendar}
            onMouseEnter={(e) => (e.currentTarget.style.background = S.greenHover as string)}
            onMouseLeave={(e) => (e.currentTarget.style.background = S.green as string)}
          >
            Agendar
          </button>
        </nav>
      </div>
    </header>
  );
}