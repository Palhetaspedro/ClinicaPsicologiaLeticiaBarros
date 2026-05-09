import React, { useState, useEffect, useRef } from "react";
import { S } from "../styles/theme";
import { CONFIG } from "../constants/config";

export default function About() {
  const [vis, setVis] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVis(true);
    }, { threshold: 0.15 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth <= 768);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const photoSize = isMobile ? { width: "100%", maxWidth: 300, height: 340 } : { width: 380, height: 460 };

  return (
    <section id="sobre" ref={ref} style={{ padding: isMobile ? "60px 20px" : "100px 24px", background: S.grayLight as string, fontFamily: S.font as string }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: isMobile ? 60 : 120 }}>

        {/* BLOCO 1: LETÍCIA BARROS */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 36 : 80,
          alignItems: "center",
        }} className="grid-2">

          {/* Photo col */}
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateX(-30px)", transition: "all .8s ease", display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative" }}>
              <div style={{
                ...photoSize,
                borderRadius: "80px 24px 80px 24px",
                background: `linear-gradient(160deg,${S.greenLight},${S.greenBg})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 20px 56px rgba(82,183,136,0.2)`, overflow: "hidden",
              }}>
                <img
                  src="/leticiabarros.png"
                  alt={`Psicóloga ${CONFIG.name}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "24px", border: `6px solid ${S.white}`, transition: "transform 0.3s ease" }}
                />
                <div style={{ position: "absolute", bottom: "20px", right: "10%", background: S.white as string, padding: "12px 20px", borderRadius: "12px", boxShadow: S.shadow as string, zIndex: 2, textAlign: "center", border: `1.5px solid ${S.border}` }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: S.dark as string }}>{CONFIG.name}</div>
                  <div style={{ fontSize: 11, color: S.green as string, fontWeight: 600 }}>{CONFIG.crp}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Text col */}
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateX(30px)", transition: "all .8s ease .1s" }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800, color: S.dark as string, margin: "0 0 24px", letterSpacing: -1 }}>
              Sobre <span style={{ color: S.green as string, fontStyle: "italic" }}>Mim</span>
            </h2>
            <p style={{ fontSize: 16, color: S.gray as string, lineHeight: 1.85, marginBottom: 20 }}>
              Sou <strong style={{ color: S.dark as string }}>Letícia Barros</strong>, psicóloga, mãe, esposa e cristã. Acredito na importância de um acolhimento empático e respeitoso, oferecendo um espaço seguro para que cada pessoa se sinta ouvida e compreendida.
            </p>
            <p style={{ fontSize: 16, color: S.gray as string, lineHeight: 1.85, marginBottom: 36 }}>
              Com sensibilidade e compromisso, promovo o cuidado emocional, o autoconhecimento e o fortalecimento pessoal, utilizando a abordagem da <strong style={{ color: S.green as string }}>Terapia Cognitivo-Comportamental (TCC)</strong> e respeitando a individualidade e os valores de cada paciente.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[["💚", "Empatia"], ["🧩", "TCC"], ["🌱", "Autoconhecimento"], ["🔒", "Sigilo"]].map(([ic, lb]) => (
                <div key={lb} style={{ display: "flex", alignItems: "center", gap: 8, background: S.greenLight as string, borderRadius: 50, padding: "8px 16px" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: S.dark as string }}>{ic} {lb}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DIVISOR */}
        <hr style={{ border: "none", height: "1px", background: S.border as string, opacity: 0.5 }} />

        {/* BLOCO 2: MIRIAM PIMENTA */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 36 : 80,
          alignItems: "center",
        }} className="grid-2">

          {/* Text col */}
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateX(-30px)", transition: "all .8s ease .2s" }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: S.green as string, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Atendimento</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800, color: S.dark as string, margin: "0 0 24px", letterSpacing: -1 }}>
              Funcionamento da <span style={{ color: S.green as string, fontStyle: "italic" }}>Clínica</span>
            </h2>
            <div style={{ background: S.white as string, padding: "24px", borderRadius: 20, boxShadow: S.shadow as string, marginBottom: 30 }}>
              <p style={{ fontSize: 16, color: S.dark as string, fontWeight: 700, marginBottom: 8 }}>Horários de Atendimento:</p>
              <p style={{ fontSize: 16, color: S.gray as string, lineHeight: 1.6 }}>
                Segunda a sexta <br />
                <strong>08:00 às 12:00</strong> — <strong>14:00 às 19:00</strong>
              </p>
            </div>
            <p style={{ fontSize: 16, color: S.gray as string, lineHeight: 1.85, marginBottom: 10 }}>
              Contamos com o suporte de <strong style={{ color: S.dark as string }}>Miriam Pimenta</strong>, nossa Musicoterapeuta, garantindo um atendimento multidisciplinar e focado no bem-estar integral.
            </p>
            <p style={{ fontSize: 14, color: S.gray as string, marginBottom: 24 }}>
              <strong>Telefone:</strong> (62) 99171005
            </p>
          </div>

          {/* Photo col (Miriam) — vai abaixo do texto no mobile */}
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateX(30px)", transition: "all .8s ease .2s", display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative" }}>
              <div style={{
                ...photoSize,
                borderRadius: "24px 80px 24px 80px",
                background: `linear-gradient(160deg,${S.greenBg},${S.greenLight})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 20px 56px rgba(82,183,136,0.15)`, overflow: "hidden",
              }}>
                <img
                  src="/miriam.png"
                  alt="Miriam Pimenta - Musicoterapeuta"
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "24px", border: `6px solid ${S.white}` }}
                />
                <div style={{ position: "absolute", bottom: "20px", left: "10%", background: S.white as string, padding: "12px 20px", borderRadius: "12px", boxShadow: S.shadow as string, zIndex: 2, textAlign: "center", border: `1.5px solid ${S.border}` }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: S.dark as string }}>Miriam Pimenta</div>
                  <div style={{ fontSize: 11, color: S.green as string, fontWeight: 600 }}>ABMT 506 GO</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}