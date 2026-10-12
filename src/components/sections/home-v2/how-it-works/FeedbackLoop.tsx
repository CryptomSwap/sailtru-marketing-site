import { useTranslations } from "next-intl";

const STEPS = ["baseline", "implemented", "observation", "next"] as const;

export function FeedbackLoop() {
  const t = useTranslations("homeV2.howItWorks.engine");

  return (
    <div className="intel-cycle">
      <ol data-progress>
      <li className="intel-kicker">{t("illustrative")}</li>
      {STEPS.map((step, index) => (
        <li key={step} data-cycle={step}>
          <span aria-hidden>{index + 1}</span>
          {t(`cycle.${step}`)}
        </li>
      ))}
      </ol>
    </div>
  );
}
