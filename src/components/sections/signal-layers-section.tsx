"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { ProductStage } from "@/components/ui/product-stage";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";

export function SignalLayersSection() {
  const t = useTranslations("signalLayers");
  const layers = t.raw("layers") as string[];
  const [activeLayer, setActiveLayer] = useState(layers[0]);

  return (
    <SectionShell id="signal-layers" ruled>
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

          <div className="layer-stage">
            <Reveal>
              <nav className="layer-pills" aria-label={t("navLabel")}>
                {layers.map((layer) => (
                  <button
                    key={layer}
                    type="button"
                    onClick={() => setActiveLayer(layer)}
                    className={`layer-pill ${activeLayer === layer ? "layer-pill--active" : ""}`}
                    aria-current={activeLayer === layer ? "true" : undefined}
                  >
                    {layer}
                  </button>
                ))}
              </nav>
            </Reveal>

            <Reveal>
              <div className="layer-detail">
                <h3 className="layer-detail__title">{activeLayer}</h3>
                <p className="layer-detail__body">{t("detailBody", { layer: activeLayer })}</p>
                <p className="mono-metric layer-detail__metric">{t("detailMetric")}</p>
              </div>
            </Reveal>
          </div>
        </ProductStage>
      </Container>
    </SectionShell>
  );
}
