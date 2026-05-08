"use client";

import { useState, useEffect } from "react";

type Status = "idle" | "sending" | "success" | "error";

function Spinner() {
  return (
    <svg className="cf-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
    </svg>
  );
}

function CheckAnim() {
  return (
    <svg className="cf-check" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <circle className="cf-check-circle" cx="28" cy="28" r="26" stroke="currentColor" strokeWidth="2" />
      <path className="cf-check-tick" d="M16 29l8 8 16-16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Toast({ status, message, onClose }: { status: "success" | "error"; message: string; onClose: () => void }) {
  useEffect(() => {
    if (status === "success") {
      const t = setTimeout(onClose, 6000);
      return () => clearTimeout(t);
    }
  }, [status, onClose]);

  return (
    <div className={`cf-toast cf-toast--${status}`} role="alert" aria-live="assertive">
      <div className="cf-toast-icon">
        {status === "success" ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="22" height="22">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <circle cx="12" cy="16" r="0.5" fill="currentColor" />
          </svg>
        )}
      </div>
      <span className="cf-toast-msg">{message}</span>
      <button type="button" className="cf-toast-close" onClick={onClose} aria-label="Fechar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="16" height="16">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

export function LeadForm({ onSuccess }: { onSuccess?: () => void }) {
  const [status, setStatus]     = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [toast, setToast]       = useState<{ type: "success" | "error"; msg: string } | null>(null);

  function dismissToast() { setToast(null); }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setToast(null);

    const form = e.currentTarget;
    const data = {
      name:  (form.elements.namedItem("name")  as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value.trim(),
    };

    try {
      const res  = await fetch("/api/lead", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      });

      let json: { ok?: boolean; error?: string } = {};
      try { json = await res.json(); } catch {}

      if (!res.ok) {
        throw new Error(json.error || `Erro ${res.status} — tente novamente.`);
      }

      setStatus("success");
      form.reset();
      setToast({ type: "success", msg: "Agradecemos o interesse! Entraremos em contato." });
      
      if (onSuccess) {
        setTimeout(onSuccess, 1500);
      }

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Não foi possível enviar. Tente novamente.";
      setStatus("error");
      setErrorMsg(msg);
      setToast({ type: "error", msg });
    }
  }

  // Format phone number live
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 2) value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    if (value.length > 9) value = `${value.slice(0, 10)}-${value.slice(10)}`;
    e.target.value = value;
  };

  return (
    <>
      {toast && <Toast status={toast.type} message={toast.msg} onClose={dismissToast} />}

      {status === "success" ? (
        <div className="contact-form cf-success-panel" style={{ minHeight: '300px' }}>
          <CheckAnim />
          <h3 className="cf-success-title">Obrigada!</h3>
          <p className="cf-success-sub">Seus dados foram enviados.<br />Em breve entraremos em contato com mais informações.</p>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          {status === "error" && (
            <div className="cf-error-banner" role="alert">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="18" height="18" aria-hidden="true">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><circle cx="12" cy="16" r="0.5" fill="currentColor" />
              </svg>
              <span>{errorMsg}</span>
              <button type="button" className="cf-error-close" onClick={() => setStatus("idle")} aria-label="Fechar">✕</button>
            </div>
          )}

          <label className="cf-label">
            <span>Nome <em>*</em></span>
            <input type="text" name="name" required placeholder="Seu nome completo" />
          </label>
          <label className="cf-label">
            <span>E-mail <em>*</em></span>
            <input type="email" name="email" required placeholder="seu@email.com" />
          </label>
          <label className="cf-label">
            <span>Telefone <em>*</em></span>
            <input type="tel" name="phone" required placeholder="(11) 99999-9999" onChange={handlePhoneChange} />
          </label>

          <button
            type="submit"
            className={`cf-submit${status === "sending" ? " cf-submit--loading" : ""}`}
            disabled={status === "sending"}
          >
            {status === "sending" ? <><Spinner /> Enviando…</> : "Quero saber mais →"}
          </button>
        </form>
      )}
    </>
  );
}
