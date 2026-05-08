export const S = {
  green: "#52B788",
  greenHover: "#40916C",
  greenLight: "#D8F3DC",
  greenBg: "#F0FAF4",
  dark: "#1B1B1B",
  gray: "#6B7280",
  grayLight: "#F3F4F6",
  border: "#E5E7EB",
  white: "#FFFFFF",
  shadow: "0 4px 24px rgba(0,0,0,0.07)",
  shadowHover: "0 8px 32px rgba(82,183,136,0.18)",
  radius: "16px",
  radiusSm: "10px",
  font: "'Inter', 'Poppins', system-ui, sans-serif",
};

export const btn = {
  primary: {
    background: S.green, color: "#fff", border: "none", borderRadius: 50,
    padding: "13px 32px", fontWeight: 600, fontSize: 15, cursor: "pointer",
    fontFamily: S.font, transition: "all .2s", letterSpacing: .3,
    boxShadow: "0 4px 16px rgba(82,183,136,0.3)",
  },
  outline: {
    background: "transparent", color: S.green, border: `1.5px solid ${S.green}`,
    borderRadius: 50, padding: "11px 28px", fontWeight: 600, fontSize: 14,
    cursor: "pointer", fontFamily: S.font, transition: "all .2s",
  },
};

export const inp = {
  base: {
    width: "100%", padding: "13px 16px", borderRadius: S.radiusSm,
    border: `1.5px solid ${S.border}`, fontFamily: S.font, fontSize: 15,
    color: S.dark, background: S.white, outline: "none", transition: "border .2s",
    boxSizing: "border-box" as const,
  },
  error: { borderColor: "#EF4444" },
};