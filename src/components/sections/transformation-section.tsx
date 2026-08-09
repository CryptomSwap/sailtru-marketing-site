"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { ProductStage } from "@/components/ui/product-stage";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";

export function TransformationSection() {
  const t = useTranslations("transformation");
  const paths = t.raw("paths") as Array<{ title: string; body: string }>;

  return (
    <SectionShell id="transformation" ruled>
      <Container>
        <ProductStage>
          <Reveal>
            <SectionHeading
              index={t("index")}
              kicker={t("kicker")}
              title={t("title")}
              description={t("description")}
            />
          </Reveal>

          <div className="path-stack">
            {paths.map((path, index) => (
              <Reveal key={path.title}>
                <article
                  className={`path-stack__item ${index === 0 ? "path-stack__item--lead" : ""}`}
                >
                  <h3 className="path-stack__title">{path.title}</h3>
                  <p className="path-stack__body">{path.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </ProductStage>
      </Container>
    </SectionShell>
  );
}
