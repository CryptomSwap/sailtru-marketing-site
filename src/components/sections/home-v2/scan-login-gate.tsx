"use client";

import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useId, useState } from "react";
import "./scan-login-gate.css";

type ScanLoginGateProps = {
  host?: string;
};

export function ScanLoginGate({ host = "" }: ScanLoginGateProps) {
  const t = useTranslations("freemium.gate");
  const router = useRouter();
  const titleId = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(false);
    const response = await fetch("/api/freemium/session", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, host }),
    });
    if (!response.ok) {
      setPending(false);
      setError(true);
      return;
    }
    router.push("/dashboard");
  }

  return (
    <div className="scan-gate">
      <div className="scan-gate__panel" aria-labelledby={titleId}>
        <p className="scan-gate__kicker">{t("kicker")}</p>
        <h1 id={titleId} className="scan-gate__title">
          {t("title")}
        </h1>
        <p className="scan-gate__body">{host ? t("body", { host }) : t("bodyNoHost")}</p>
        <form className="scan-gate__form" onSubmit={onSubmit}>
          <label className="scan-gate__label" htmlFor="scan-gate-email">
            {t("emailLabel")}
          </label>
          <input
            id="scan-gate-email"
            className="scan-gate__input"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder={t("emailPlaceholder")}
            value={email}
            required
            autoFocus
            onChange={(event) => setEmail(event.target.value)}
          />
          {error ? <p className="scan-gate__error">{t("error")}</p> : null}
          <p className="scan-gate__note">{t("note")}</p>
          <div className="scan-gate__actions">
            <button className="scan-gate__submit" type="submit" disabled={pending}>
              {pending ? t("pending") : t("submit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
