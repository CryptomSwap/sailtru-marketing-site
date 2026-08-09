import { ReactNode } from "react";

type SectionHeadingProps = {
  index?: string;
  kicker?: string;
  title: ReactNode;
  description?: string;
};

export function SectionHeading({ index, kicker, title, description }: SectionHeadingProps) {
  return (
    <header className="product-heading">
      {(index || kicker) && (
        <div className="product-heading__rail">
          {index ? <span className="product-heading__index">{index}</span> : null}
          {index && kicker ? <span className="product-heading__line" aria-hidden /> : null}
          {kicker ? <span className="product-heading__kicker">{kicker}</span> : null}
        </div>
      )}
      <h2 className="product-heading__title">{title}</h2>
      {description ? <p className="product-heading__body">{description}</p> : null}
    </header>
  );
}
