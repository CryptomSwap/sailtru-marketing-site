"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { ProductStage } from "@/components/ui/product-stage";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion/presets";

export function ProblemSection() {
  const t = useTranslations("problem");
  const signals = t.raw("signals") as Array<{ title: string; note: string }>;

  return (
    <SectionShell id="problem" ruled>
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

          <motion.ul
            className="signal-matrix"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {signals.map((signal) => (
              <motion.li key={signal.title} className="signal-matrix__cell" variants={staggerItem}>
                <h3 className="signal-matrix__title">{signal.title}</h3>
                <p className="signal-matrix__note">{signal.note}</p>
              </motion.li>
            ))}
          </motion.ul>
        </ProductStage>
      </Container>
    </SectionShell>
  );
}
