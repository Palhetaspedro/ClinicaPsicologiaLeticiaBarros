export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Início", href: "inicio" },
  { label: "Sobre Mim", href: "sobre" },
  { label: "Serviços", href: "servicos" },
  { label: "Contato", href: "contato" },
];

export const TIMES: string[] = [
  "08:00", "09:00", "10:00", "11:00", "13:00", 
  "14:00", "15:00", "16:00", "17:00", "18:00"
];