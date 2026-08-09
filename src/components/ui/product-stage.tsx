import { ReactNode } from "react";

type ProductStageProps = {
  children: ReactNode;
  className?: string;
  size?: "narrow" | "default" | "wide";
};

const sizeClass = {
  narrow: "product-stage product-stage--narrow",
  default: "product-stage",
  wide: "product-stage product-stage--wide",
} as const;

export function ProductStage({
  children,
  className = "",
  size = "default",
}: ProductStageProps) {
  return <div className={`${sizeClass[size]} ${className}`}>{children}</div>;
}
