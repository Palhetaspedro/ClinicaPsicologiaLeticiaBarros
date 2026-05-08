export const utils = {
  isEmail: (v: string): boolean => 
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),

  maskPhone: (v: string): string => {
    const d = v.replace(/\D/g, "");
    if (d.length <= 10) {
      return d.replace(/(\d{0,2})(\d{0,4})(\d{0,4})/, (_, a, b, c) => 
        [a && `(${a}`, b && `) ${b}`, c && `-${c}`].filter(Boolean).join("").replace(/^\(/, "(")
      );
    }
    return d.replace(/(\d{0,2})(\d{0,5})(\d{0,4})/, (_, a, b, c) => 
      [a && `(${a}`, b && `) ${b}`, c && `-${c}`].filter(Boolean).join("").replace(/^\(/, "(")
    );
  },

  sanitize: (v: string): string => 
    v.replace(/[<>{}]/g, "").trim(),

  today: (): string => 
    new Date().toISOString().split("T")[0],
};