import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import ServiceCards from "./components/ServiceCards";
import ContactCards from "./components/ContactCards";
import Footer from "./components/Footer";
import AppointmentModal from "./components/AppointmentModal";

import { S } from "./styles/theme";

export default function Page() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div style={{ fontFamily: S.font, overflowX: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: ${S.green}; border-radius: 3px; }
        input, textarea, select { font-family: inherit; }

        @media (max-width: 768px) {
          .grid-2 { grid-template-columns: 1fr !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .hide-mob { display: none !important; }

          /* Textos grandes ficam legíveis */
          h1 { font-size: clamp(2rem, 10vw, 3.5rem) !important; }
          h2 { font-size: clamp(1.4rem, 6vw, 2rem) !important; }

          /* Seções com padding lateral confortável */
          section { padding-left: 20px !important; padding-right: 20px !important; }

          /* Cards ocupam largura total */
          [class*="card"] { width: 100% !important; min-width: unset !important; }

          /* Imagens não vazam */
          img { max-width: 100% !important; height: auto !important; }

          /* Botões empilham e ficam full-width */
          [class*="btnRow"], [class*="btn-row"] {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 12px !important;
          }
          [class*="btnRow"] button,
          [class*="btnRow"] a,
          [class*="btn-row"] button,
          [class*="btn-row"] a {
            width: 100% !important;
            text-align: center !important;
          }

          /* Modal ocupa tela toda */
          [class*="modal"] > div {
            width: 100% !important;
            max-width: 100% !important;
            min-height: 90dvh !important;
            border-radius: 20px 20px 0 0 !important;
            margin: 0 !important;
          }

          /* Layouts lado-a-lado viram coluna */
          [class*="layout"], [class*="row"] {
            flex-direction: column !important;
          }

          /* Espaçamento interno dos cards */
          [class*="card"] { padding: 24px 18px !important; }
        }

        /* Telas muito pequenas (iPhone SE etc) */
        @media (max-width: 390px) {
          h1 { font-size: 1.9rem !important; }
          section { padding-left: 16px !important; padding-right: 16px !important; }
        }

        /* Safe area iPhone (notch / barra home) */
        @supports (padding: env(safe-area-inset-bottom)) {
          footer {
            padding-bottom: calc(16px + env(safe-area-inset-bottom)) !important;
          }
        }
      `}} />

      <Header onAgendar={() => setModalOpen(true)} />
      
      <main>
        <Hero onAgendar={() => setModalOpen(true)} />
        <ServiceCards />
        <About />
        <ContactCards />
      </main>

      <Footer onAgendar={() => setModalOpen(true)} />
      
      <AppointmentModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
      />
    </div>
  );
}