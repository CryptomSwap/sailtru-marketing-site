import Image from "next/image";

type Props = { size: "distant" | "small" | "medium" | "close"; className?: string };

export function JourneyBoat({ size, className = "" }: Props) {
  const sources = {
    distant: "/images/journey/sailtru-boat-low-front.webp",
    small: "/images/journey/sailtru-boat-turn-left.webp",
    medium: "/images/journey/sailtru-boat-turn-right.webp",
    close: "/images/journey/sailtru-boat-front.webp"
  } as const;

  return (
    <Image
      className={`ij-static-boat ij-static-boat--${size} ${className}`}
      src={sources[size]}
      alt=""
      aria-hidden="true"
      width="683"
      height="1024"
      priority={size === "distant"}
      sizes={size === "close" ? "(max-width: 899px) 240px, 420px" : "(max-width: 899px) 180px, 240px"}
    />
  );
}

