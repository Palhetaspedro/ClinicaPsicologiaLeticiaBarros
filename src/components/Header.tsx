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
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth <= 768);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
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
      background: scrolled || mob ? "rgba(255,255,255,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.08)" : "none",
      transition: "all .3s", fontFamily: S.font as string,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        
        {/* Logo — inalterado */}
        <div style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer" }} onClick={() => scroll("inicio")}>
          <svg viewBox="0 0 24 24" fill="none" stroke={S.green as string} strokeWidth="2" style={{ width: 26, height: 26 }}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span style={{ fontWeight: 700, fontSize: 17, color: S.dark as string, letterSpacing: -.3 }}>{CONFIG.name}</span>
        </div>

        {/* Desktop Nav — inalterado, some no mobile */}
        {!isMobile && (
          <nav style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", gap: 4 }}>
              {NAV_LINKS.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scrollIntoView(l.href)}
                  style={{
                    background: "none", border: "none", padding: "8px 14px",
                    cursor: "pointer", fontSize: 14, fontWeight: 500,
                    color: S.gray as string, fontFamily: S.font as string,
                    borderRadius: 8, transition: "all .15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = S.green as string)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = S.gray as string)}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <button
              style={{ ...(btn.primary as React.CSSProperties), padding: "10px 24px", fontSize: 14, marginLeft: 8 }}
              onClick={onAgendar}
              onMouseEnter={(e) => (e.currentTarget.style.background = S.greenHover as string)}
              onMouseLeave={(e) => (e.currentTarget.style.background = S.green as string)}
            >
              Agendar
            </button>
          </nav>
        )}

        {/* Hambúrguer — só no mobile */}
        {isMobile && (
          <button
            onClick={() => setMob(!mob)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5 }}
            aria-label="Menu"
          >
            <span style={{ display: "block", width: 24, height: 2, background: S.dark as string, borderRadius: 2, transition: "all .3s", transform: mob ? "translateY(7px) rotate(45deg)" : "none" }} />
            <span style={{ display: "block", width: 24, height: 2, background: S.dark as string, borderRadius: 2, transition: "all .3s", opacity: mob ? 0 : 1 }} />
            <span style={{ display: "block", width: 24, height: 2, background: S.dark as string, borderRadius: 2, transition: "all .3s", transform: mob ? "translateY(-7px) rotate(-45deg)" : "none" }} />
          </button>
        )}
      </div>

      {/* Drawer mobile */}
      {isMobile && mob && (
        <div style={{ background: S.white as string, borderTop: `1px solid ${S.border}`, padding: "8px 24px 24px" }}>
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollIntoView(l.href)}
              style={{
                display: "block", width: "100%", textAlign: "left",
                background: "none", border: "none", borderBottom: `1px solid ${S.border}`,
                padding: "16px 0", fontSize: 16, fontWeight: 500,
                color: S.dark as string, fontFamily: S.font as string, cursor: "pointer",
              }}
            >
              {l.label}
            </button>
          ))}
          <button
            style={{ ...(btn.primary as React.CSSProperties), width: "100%", marginTop: 20, fontSize: 16, padding: "14px 0" }}
            onClick={() => { setMob(false); onAgendar(); }}
          >
            Agendar Consulta
          </button>
        </div>
      )}
    </header>
  );
}