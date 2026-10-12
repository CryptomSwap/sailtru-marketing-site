import { useTranslations } from "next-intl";

export function InsightOverlay() {
  const t = useTranslations("homeV2.howItWorks.engine");

  return (
    <>
      <article className="intel-insight intel-insight--visibility" data-insight="visibility">
        <p className="intel-kicker">{t("illustrative")}</p>
        <h3>{t("visibilityTitle")}</h3>
        <div className="intel-bar">
          <span className="intel-bar__name">{t("you")}</span>
          <span className="intel-bar__track">
            <span className="intel-bar__fill intel-bar__fill--you" data-bar="you" />
          </span>
        </div>
        <div className="intel-bar">
          <span className="intel-bar__name">{t("field")}</span>
          <span className="intel-bar__track">
            <span className="intel-bar__fill intel-bar__fill--field" data-bar="field" />
          </span>
        </div>
      </article>

      <article className="intel-insight intel-insight--gap" data-insight="gap">
        <p className="intel-kicker">{t("illustrative")}</p>
        <h3>{t("gapTitle")}</h3>
        <p>{t("gapBody")}</p>
      </article>

      <article className="intel-opportunity">
        <div data-opportunity>
        <p className="intel-kicker">{t("illustrative")}</p>
        <h3>{t("opportunityTitle")}</h3>
        <p>{t("opportunityBody")}</p>
        </div>
      </article>
    </>
  );
}
