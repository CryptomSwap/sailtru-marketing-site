"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { ProductStage } from "@/components/ui/product-stage";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";

export function ProcessSection() {
  const t = useTranslations("process");
  const processSteps = t.raw("steps") as Array<{ label: string; body: string }>;

  return (
    <SectionShell id="process" ruled>
      <Container>
        <ProductStage size="narrow">
          <Reveal>
            <SectionHeading
              index={t("index")}
              kicker={t("kicker")}
              title={t("title")}
              description={t("description")}
            />
          </Reveal>

          <div className="process-stack">
            {processSteps.map((step, index) => (
              <Reveal key={step.label}>
                <div>
                  {index > 0 ? <div className="process-stack__divider" aria-hidden /> : null}
                  <div className="process-stack__step">
                    <span className="process-stack__index">0{index + 1}</span>
                    <h3 className="process-stack__label">{step.label}</h3>
                    <p className="process-stack__body">{step.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </ProductStage>
      </Container>
    </SectionShell>
  );
}
