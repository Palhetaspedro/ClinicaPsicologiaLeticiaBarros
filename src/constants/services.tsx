import React from 'react';

export const SERVICES = [
 {
    id: 1,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:32,height:32}}>
        <rect x="3" y="4" width="18" height="18" rx="3"/>
        <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    title: "Agendamento Fácil",
    desc: "Escolha data e horário em poucos cliques, sem burocracia ou espera.",
  },
  {
    id: 2,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:32,height:32}}>
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
    title: "Consulta Online",
    desc: "Atendimento via Google Meet com a mesma qualidade do presencial.",
  },
  {
    id: 3,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:32,height:32}}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: "Acolhimento Empático",
    desc: "Um espaço seguro para que você se sinta ouvido e compreendido.",
  },
  {
    id: 4,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:32,height:32}}>
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    title: "TCC",
    desc: "Terapia Cognitivo-Comportamental para transformar pensamentos e comportamentos.",
  },
];