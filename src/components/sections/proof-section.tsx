"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { ProductStage } from "@/components/ui/product-stage";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";

export function ProofSection() {
  const t = useTranslations("proof");
  const stats = t.raw("stats") as string[];
  const logos = t.raw("logos") as string[];

  return (
    <SectionShell id="proof" ruled>
      <Container>
        <ProductStage size="wide">
          <Reveal>
            <SectionHeading
              index={t("index")}
              kicker={t("kicker")}
              title={t("title")}
              description={t("description")}
            />
          </Reveal>

          <Reveal>
            <div className="metric-strip">
              {stats.map((stat) => (
                <div key={stat} className="metric-strip__item">
                  <p className="metric-strip__text">{stat}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <blockquote className="pull-quote">
              <p className="pull-quote__text">&ldquo;{t("quote")}&rdquo;</p>
              <cite className="pull-quote__attrib">{t("attribution")}</cite>
            </blockquote>
          </Reveal>

          <Reveal>
            <div className="proof-logos">
              {logos.map((logo) => (
                <span key={logo} className="proof-logos__item">
                  {logo}
                </span>
              ))}
            </div>
          </Reveal>
        </ProductStage>
      </Container>
    </SectionShell>
  );
}
