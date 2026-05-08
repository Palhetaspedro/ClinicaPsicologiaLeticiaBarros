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