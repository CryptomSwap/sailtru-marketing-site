"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { ProductStage } from "@/components/ui/product-stage";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";

export function MethodologySection() {
  const t = useTranslations("methodology");
  const steps = t.raw("steps") as Array<{ title: string; body: string }>;

  return (
    <SectionShell id="methodology" ruled>
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

          <div className="method-rail">
            {steps.map((step, index) => (
              <Reveal key={step.title}>
                <article className="method-rail__step">
                  <span className="method-rail__index">0{index + 1}</span>
                  <h3 className="method-rail__title">{step.title}</h3>
                  <p className="method-rail__body">{step.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </ProductStage>
      </Container>
    </SectionShell>
  );
}
