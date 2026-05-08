import React, { useState, useEffect, useRef } from "react";
import { S, btn, inp } from "../styles/theme";
import { CONFIG } from "../constants/config";
import { TIMES } from "../constants/navLinks";
import { utils } from "../utils/validators";

// --- COMPONENTES AUXILIARES (FORA DO COMPONENTE PRINCIPAL PARA NÃO PERDER O FOCO) ---

const Field = ({ label, err, children }: { label: string, err?: string, children: React.ReactNode }) => (
  <div style={{ marginBottom: 20 }}>
    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: S.dark as string, marginBottom: 7, fontFamily: S.font as string }}>
      {label}
    </label>
    {children}
    {err && <p style={{ color: "#EF4444", fontSize: 12, marginTop: 5, fontFamily: S.font as string }}>{err}</p>}
  </div>
);

// --- COMPONENTE PRINCIPAL ---

interface AppointmentModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  msg: string;
  lgpd: boolean;
}

export default function AppointmentModal({ open: isOpen, onClose }: AppointmentModalProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", date: "", time: "", msg: "", lgpd: false });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSent(false);
      setErrors({});
      setForm({ name: "", email: "", phone: "", date: "", time: "", msg: "", lgpd: false });
    }
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [isOpen, onClose]);

  const updateField = (k: keyof FormState, v: any) => setForm(f => ({ ...f, [k]: v }));

  const validate1 = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim() || form.name.trim().split(" ").length < 2) e.name = "Digite seu nome completo";
    if (!utils.isEmail(form.email)) e.email = "E-mail inválido";
    if (form.phone.replace(/\D/g, "").length < 10) e.phone = "Telefone inválido";
    if (!form.lgpd) e.lgpd = "Aceite obrigatório para continuar";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const validate2 = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.date) e.date = "Selecione uma data";
    if (!form.time) e.time = "Selecione um horário";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const next = () => { if (validate1()) setStep(2); };

  const send = () => {
    if (!validate2()) return;
    const txt = `Olá, gostaria de realizar um agendamento.%0ANome: ${encodeURIComponent(form.name)}%0ATelefone: ${encodeURIComponent(form.phone)}%0AE-mail: ${encodeURIComponent(form.email)}%0AData: ${form.date}%0AHorário: ${form.time}${form.msg ? `%0AMensagem: ${encodeURIComponent(form.msg)}` : ""}`;
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${txt}`, "_blank");
    setSent(true);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", padding: 16,
    }}>
      <div ref={ref} style={{
        background: S.white as string, borderRadius: 24, padding: "0", width: "100%", maxWidth: 480,
        boxShadow: "0 24px 64px rgba(0,0,0,0.18)", fontFamily: S.font as string, overflow: "hidden", maxHeight: "90vh", overflowY: "auto",
      }}>
        
        {/* Header */}
        <div style={{ padding: "28px 32px 24px", borderBottom: `1px solid ${S.border}`, position: "relative" }}>
          {step === 2 && !sent && (
            <button onClick={() => { setStep(1); setErrors({}); }} style={{
              background: "none", border: "none", cursor: "pointer", color: S.gray as string, fontSize: 13,
              fontFamily: S.font as string, display: "flex", alignItems: "center", gap: 6, marginBottom: 12, padding: 0,
            }}> ← Voltar </button>
          )}
          <button onClick={onClose} style={{
            position: "absolute", top: 20, right: 20, background: S.grayLight as string, border: "none",
            borderRadius: 50, width: 32, height: 32, cursor: "pointer", fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center", color: S.gray as string,
          }}>✕</button>

          {!sent && (
            <>
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {[1, 2].map(n => (
                  <div key={n} style={{ flex: 1, height: 4, borderRadius: 4, background: step >= n ? S.green as string : S.border as string, transition: "background .3s" }} />
                ))}
              </div>
              <p style={{ fontSize: 12, color: S.gray as string, margin: "0 0 6px" }}>Passo {step} de 2</p>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: S.dark as string, margin: 0 }}>
                {step === 1 ? "Seus dados" : "Escolha o horário"}
              </h2>
            </>
          )}
          {sent && <h2 style={{ fontSize: 22, fontWeight: 800, color: S.dark as string, margin: 0 }}>Quase lá! </h2>}
        </div>

        {/* Body */}
        <div style={{ padding: "28px 32px 32px" }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
              <button style={{ ...(btn.primary as React.CSSProperties), width: "100%" }} onClick={onClose}>Fechar</button>
            </div>
          ) : step === 1 ? (
            <>
              <Field label="Nome completo" err={errors.name}>
                <input 
                  value={form.name} 
                  onChange={e => updateField("name", e.target.value)} 
                  placeholder="Seu nome completo"
                  style={{ ...(inp.base as React.CSSProperties), ...(errors.name ? (inp.error as React.CSSProperties) : {}) }} 
                />
              </Field>
              
              <Field label="E-mail" err={errors.email}>
                <input 
                  value={form.email} 
                  onChange={e => updateField("email", e.target.value)} 
                  placeholder="seu@email.com" 
                  type="email"
                  style={{ ...(inp.base as React.CSSProperties), ...(errors.email ? (inp.error as React.CSSProperties) : {}) }} 
                />
              </Field>

              <Field label="Telefone" err={errors.phone}>
                <input 
                  value={form.phone} 
                  onChange={e => updateField("phone", e.target.value.replace(/\D/g, ""))} 
                  placeholder="Somente números (DDD + Número)"
                  type="tel"
                  style={{ ...(inp.base as React.CSSProperties), ...(errors.phone ? (inp.error as React.CSSProperties) : {}) }} 
                />
              </Field>

              <div style={{ marginBottom: 28 }}>
                <label style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer" }}>
                  <input type="checkbox" checked={form.lgpd} onChange={() => updateField("lgpd", !form.lgpd)} />
                  <span style={{ fontSize: 13, color: S.gray as string }}>Concordo com o tratamento dos dados.</span>
                </label>
                {errors.lgpd && <p style={{ color: "#EF4444", fontSize: 12, marginTop: 6 }}>{errors.lgpd}</p>}
              </div>

              <button style={{ ...(btn.primary as React.CSSProperties), width: "100%" }} onClick={next}>Continuar →</button>
            </>
          ) : (
            <>
              <Field label="Data" err={errors.date}>
                <input type="date" value={form.date} min={utils.today()} onChange={e => updateField("date", e.target.value)} style={{ ...(inp.base as React.CSSProperties) }} />
              </Field>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: S.dark as string, marginBottom: 10 }}>Horário</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
                  {TIMES.map(t => (
                    <button key={t} onClick={() => updateField("time", t)} style={{
                      padding: "10px 4px", borderRadius: 10, fontSize: 13, fontWeight: 600,
                      border: `1.5px solid ${form.time === t ? S.green : S.border}`,
                      background: form.time === t ? S.green as string : S.white as string,
                      color: form.time === t ? "#fff" : S.gray as string, cursor: "pointer",
                    }}>{t}</button>
                  ))}
                </div>
              </div>

              <button style={{ ...(btn.primary as React.CSSProperties), width: "100%" }} onClick={send}>Confirmar via WhatsApp</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}