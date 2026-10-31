"use client";

import { useId, useState } from "react";
import { submitHomepageScanStub } from "@/lib/homepage-scan-stub";
import { getJourneyContent } from "./journey-content";

type Props = { locale: string; compact?: boolean };

export function JourneyScanForm({ locale, compact = false }: Props) {
  const t = getJourneyContent(locale);
  const id = useId();
  const [value, setValue] = useState("");
  const [message, setMessage] = useState<string>(t.hero.expectation);
  const [state, setState] = useState<"idle" | "error" | "ready">("idle");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = submitHomepageScanStub(value);
    if (!result.ok) {
      setState("error");
      setMessage(t.form.invalid);
      return;
    }
    setState("ready");
    setMessage(`${result.host}: ${t.form.accepted}`);
  }

  return (
    <form className={`ij-scan${compact ? " ij-scan--compact" : ""}`} onSubmit={submit} noValidate>
      <label htmlFor={id}>{t.hero.label}</label>
      <div className="ij-scan__control">
        <span className="ij-scan__globe" aria-hidden>◎</span>
        <input
          id={id}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          type="text"
          inputMode="url"
          autoComplete="url"
          dir="ltr"
          placeholder={t.hero.placeholder}
          aria-describedby={`${id}-note`}
        />
        <button type="submit">{t.hero.submit}<span aria-hidden>→</span></button>
      </div>
      <p id={`${id}-note`} className={`ij-scan__note ij-scan__note--${state}`} aria-live="polite">
        {message}
      </p>
      <span className="ij-scan__integration">{t.form.integration}</span>
    </form>
  );
}

