import React, { useState, useEffect } from "react";
import { S, btn } from "../styles/theme";
import { CONFIG } from "../constants/config";
import { NAV_LINKS } from "../constants/navLinks";

interface HeaderProps {
  onAgendar: () => void;
}

export default function Header({ onAgendar }: HeaderProps) {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Fecha menu ao redimensionar para desktop
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  const scrollIntoView = (id: string) => {
    setMenuOpen(false);
    if (id === "inicio") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled || menuOpen ? "rgba(255,255,255,0.97)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
        boxShadow: scrolled || menuOpen ? S.shadow : "none",
        transition: "all .3s",
        fontFamily: S.font,
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "0 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between", height: 68,
        }}>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer" }}
            onClick={() => scrollIntoView("inicio")}>
            <svg viewBox="0 0 24 24" fill="none" stroke={S.green} strokeWidth="2" style={{ width: 26, height: 26 }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span style={{ fontWeight: 700, fontSize: 17, color: S.dark, letterSpacing: -0.3 }}>
              Crer&amp;Ser
            </span>
          </div>

          {/* Desktop Nav */}
          {!isMobile && (
            <nav style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", gap: 4 }}>
                {NAV_LINKS.map((l) => (
                  <button key={l.href} onClick={() => scrollIntoView(l.href)} style={{
                    background: "none", border: "none", padding: "8px 14px", cursor: "pointer",
                    fontSize: 14, fontWeight: 500, color: S.gray, fontFamily: S.font,
                    borderRadius: 8, transition: "all .15s",
                  }}>
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
          )}

          {/* Mobile: botão hambúrguer */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen((o) => !o)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "8px", borderRadius: 8, display: "flex",
                flexDirection: "column", gap: 5, alignItems: "center", justifyContent: "center",
              }}
              aria-label="Menu"
            >
              {/* Ícone hambúrguer → X animado */}
              <span style={{
                display: "block", width: 22, height: 2, borderRadius: 2,
                background: S.dark,
                transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
                transition: "transform .25s",
              }} />
              <span style={{
                display: "block", width: 22, height: 2, borderRadius: 2,
                background: S.dark,
                opacity: menuOpen ? 0 : 1,
                transition: "opacity .25s",
              }} />
              <span style={{
                display: "block", width: 22, height: 2, borderRadius: 2,
                background: S.dark,
                transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
                transition: "transform .25s",
              }} />
            </button>
          )}
        </div>

        {/* Mobile dropdown menu */}
        {isMobile && (
          <div style={{
            maxHeight: menuOpen ? 400 : 0,
            overflow: "hidden",
            transition: "max-height .3s ease",
            background: "rgba(255,255,255,0.97)",
            borderTop: menuOpen ? `1px solid ${S.border}` : "none",
          }}>
            <div style={{ padding: "12px 24px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
              {NAV_LINKS.map((l) => (
                <button key={l.href} onClick={() => scrollIntoView(l.href)} style={{
                  background: "none", border: "none", padding: "12px 0",
                  cursor: "pointer", fontSize: 16, fontWeight: 500,
                  color: S.dark, fontFamily: S.font, textAlign: "left",
                  borderBottom: `1px solid ${S.border}`,
                }}>
                  {l.label}
                </button>
              ))}
              <button
                style={{ ...(btn.primary as React.CSSProperties), marginTop: 12, width: "100%", padding: "14px", fontSize: 15 }}
                onClick={() => { setMenuOpen(false); onAgendar(); }}
              >
                Agendar Consulta
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Overlay escuro ao abrir menu */}
      {isMobile && menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 99,
            background: "rgba(0,0,0,0.3)",
          }}
        />
      )}
    </>
  );
}