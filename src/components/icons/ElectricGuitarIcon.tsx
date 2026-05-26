type IconProps = {
  className?: string;
};

/** Silhouette icon — tinted via CSS mask to match site forest green */
export function ElectricGuitarIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 origin-center rotate-45 bg-forest ${className}`}
      style={{
        WebkitMaskImage: "url(/icons/electric-guitar.png)",
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskImage: "url(/icons/electric-guitar.png)",
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
      }}
    />
  );
}
