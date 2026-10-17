"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export const HOW_CHAPTERS = ["discover", "understand", "implement", "measure"] as const;

export type HowChapterId = (typeof HOW_CHAPTERS)[number];

const SOURCES = [
  { id: "chatgpt", kind: "major", src: "/images/brands/openai-white.svg" },
  { id: "google", kind: "major", src: "/images/brands/google-color.svg" },
  { id: "perplexity", kind: "major", src: "/images/brands/perplexity-color.svg" },
  { id: "competitors", kind: "minor", src: "/images/brands/semrush-color.svg" },
  { id: "analytics", kind: "minor", src: "/images/brands/googleanalytics-color.svg" },
  { id: "workflows", kind: "minor", src: "/images/brands/n8n-color.svg" },
  { id: "crm", kind: "minor", src: "/images/brands/hubspot-color.svg" }
] as const;

const INSIGHTS = ["answers", "search", "citations"] as const;

const SERVICES = ["found", "ahead", "automate", "build"] as const;

function ChapterTitle({ id }: { id: HowChapterId }) {
  const t = useTranslations("homeV2.howItWorks");

  return (
    <header className="hsw-ch__local">
      <p className="hsw-ch__local-kicker">
        <span>{t(`chapters.${id}.index`)}</span>
        {t(`chapters.${id}.kicker`)}
      </p>
      <h3 className="hsw-ch__local-title">{t(`chapters.${id}.headline`)}</h3>
    </header>
  );
}

function IllustrativeMark() {
  const t = useTranslations("homeV2.howItWorks");
  return <p className="hsw-ch__note">{t("chapters.illustrative")}</p>;
}

function Wires({ id, paths }: { id: HowChapterId; paths: string[] }) {
  return (
    <svg className="hsw-ch__wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
      {paths.map((d) => (
        <g key={d}>
          <path className="hsw-ch__path hsw-ch__path--glow" data-chapter-line={id} d={d} />
          <path className="hsw-ch__path" data-chapter-line={id} d={d} />
        </g>
      ))}
    </svg>
  );
}

function DiscoverChapter() {
  const t = useTranslations("homeV2.howItWorks");

  return (
    <article className="hsw-ch" data-chapter-panel="discover">
      <ChapterTitle id="discover" />
      <div className="hsw-ch__board hsw-ch__discover">
        <ul className="hsw-ch__sources">
          {SOURCES.map((source) => (
            <li key={source.id} className={`hsw-ch__source hsw-ch__source--${source.kind}`}>
              <Image src={source.src} alt="" width={16} height={16} unoptimized className="hsw-ch__mark" />
              <span>{t(`signals.${source.id}`)}</span>
            </li>
          ))}
        </ul>
        <Wires
          id="discover"
          paths={[
            "M22 18 C22 40 50 42 50 68",
            "M50 16 C50 40 50 42 50 68",
            "M78 18 C78 40 50 42 50 68"
          ]}
        />
        <div className="hsw-ch__core">
          <Image src="/images/sailtru-lockup.png" alt="" width={148} height={36} className="hsw-ch__lockup" />
          <p className="hsw-ch__core-label">{t("chapters.discover.core")}</p>
        </div>
      </div>
    </article>
  );
}

function UnderstandChapter() {
  const t = useTranslations("homeV2.howItWorks");

  return (
    <article className="hsw-ch" data-chapter-panel="understand">
      <ChapterTitle id="understand" />
      <div className="hsw-ch__board">
        <IllustrativeMark />
        <ul className="hsw-ch__insights">
          {INSIGHTS.map((id) => (
            <li key={id} className="hsw-ch__insight">
              <div className="hsw-ch__insight-head">
                <span>{t(`chapters.understand.rows.${id}.label`)}</span>
                <span className="hsw-ch__state">{t(`chapters.understand.rows.${id}.state`)}</span>
              </div>
              <div className="hsw-ch__compare" aria-hidden>
                <span className="hsw-ch__compare-label">{t("chapters.you")}</span>
                <span className="hsw-ch__track">
                  <span className={`hsw-ch__fill hsw-ch__fill--you hsw-ch__fill--${id}`} />
                </span>
                <span className="hsw-ch__compare-label">{t("chapters.field")}</span>
                <span className="hsw-ch__track">
                  <span className={`hsw-ch__fill hsw-ch__fill--field hsw-ch__fill--${id}`} />
                </span>
              </div>
            </li>
          ))}
        </ul>
        <p className="hsw-ch__priority">{t("chapters.understand.priority")}</p>
      </div>
    </article>
  );
}

function ImplementChapter() {
  const t = useTranslations("homeV2.howItWorks");

  return (
    <article className="hsw-ch" data-chapter-panel="implement">
      <ChapterTitle id="implement" />
      <div className="hsw-ch__board hsw-ch__implement">
        <div className="hsw-ch__pair">
          <p className="hsw-ch__finding">{t("chapters.implement.finding")}</p>
          <svg className="hsw-ch__stem" viewBox="0 0 4 48" aria-hidden>
            <path className="hsw-ch__path hsw-ch__path--glow" data-chapter-line="implement" d="M2 0 L2 48" />
            <path className="hsw-ch__path" data-chapter-line="implement" d="M2 0 L2 48" />
          </svg>
          <article className="hsw-ch__service hsw-ch__service--chosen">
            <p className="hsw-ch__service-title">{t("outcomes.found.title")}</p>
            <p className="hsw-ch__service-body">{t("outcomes.found.body")}</p>
          </article>
        </div>
        <ul className="hsw-ch__services">
          {SERVICES.filter((id) => id !== "found").map((id) => (
            <li key={id} className="hsw-ch__service">
              <p className="hsw-ch__service-title">{t(`outcomes.${id}.title`)}</p>
              <p className="hsw-ch__service-body">{t(`outcomes.${id}.body`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function MeasureChapter() {
  const t = useTranslations("homeV2.howItWorks");

  return (
    <article className="hsw-ch" data-chapter-panel="measure">
      <ChapterTitle id="measure" />
      <div className="hsw-ch__board">
        <IllustrativeMark />
        <ul className="hsw-ch__meters">
          {SERVICES.map((id) => (
            <li key={id} className="hsw-ch__meter">
              <div className="hsw-ch__meter-head">
                <span className="hsw-ch__service-title">{t(`outcomes.${id}.title`)}</span>
                <span>{t(`chapters.measure.statuses.${id}`)}</span>
              </div>
              <span className="hsw-ch__track" aria-hidden>
                <span className={`hsw-ch__meter-fill hsw-ch__meter-fill--${id}`} data-chapter-meter={id} />
              </span>
            </li>
          ))}
        </ul>
        <a className="hsw-ch__cta" href="#hero">
          {t("chapters.measure.cta")}
        </a>
      </div>
    </article>
  );
}

export function HowChapters() {
  const t = useTranslations("homeV2.howItWorks");

  return (
    <>
      <div className="hsw-ch__stack">
        <DiscoverChapter />
        <UnderstandChapter />
        <ImplementChapter />
        <MeasureChapter />
      </div>
      <ol className="hsw-ch__rail" aria-hidden>
        {HOW_CHAPTERS.map((id) => (
          <li key={id} data-chapter-tick={id}>
            <span>{t(`chapters.${id}.index`)}</span>
            {t(`chapters.${id}.kicker`)}
          </li>
        ))}
      </ol>
    </>
  );
}
