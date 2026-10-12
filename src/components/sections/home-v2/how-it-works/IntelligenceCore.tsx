import { useTranslations } from "next-intl";

export function IntelligenceCore() {
  const t = useTranslations("homeV2.howItWorks");

  return (
    <div className="intel-core" data-engine>
      <div className="intel-core__glow" data-engine-glow aria-hidden />
      <div className="intel-core__plate">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="intel-core__mark" src="/images/sailtrue-mark.svg" alt="" width={64} height={64} />
        <p className="intel-core__label">{t("intelLabel")}</p>
        <span className="intel-core__traces" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="intel-core__dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
      </div>
    </div>
  );
}
