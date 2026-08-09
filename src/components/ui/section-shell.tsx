import { ReactNode } from "react";

type SectionShellProps = {
  id: string;
  children: ReactNode;
  className?: string;
  ruled?: boolean;
};

export function SectionShell({
  id,
  children,
  className = "",
  ruled = false,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={`product-section relative w-full py-20 md:py-28 ${ruled ? "product-section--ruled" : ""} ${className}`}
    >
      <div className="product-section__grid-bg" aria-hidden />
      <div className="relative z-[1]">{children}</div>
    </section>
  );
}
