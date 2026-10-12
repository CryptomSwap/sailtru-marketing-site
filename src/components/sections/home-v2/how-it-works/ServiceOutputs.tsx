import { useTranslations } from "next-intl";
import { OUTPUTS, pct } from "@/components/sections/home-v2/how-it-works/circuit-geometry";

export function ServiceOutputs() {
  const t = useTranslations("homeV2.howItWorks");

  return (
    <>
      {OUTPUTS.map((output) => (
        <article key={output.id} className={`intel-out intel-out--${output.id}`} style={pct(output.x, output.y)}>
          <div data-output={output.id}>
            <h3>{t(`outcomes.${output.id}.title`)}</h3>
            <p>{t(`outcomes.${output.id}.body`)}</p>
          </div>
        </article>
      ))}
    </>
  );
}
