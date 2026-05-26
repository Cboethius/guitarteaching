type IconProps = {
  className?: string;
};

export function ElectricGuitarIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`shrink-0 rotate-45 text-forest ${className}`}
    >
      <path
        fill="currentColor"
        d="M14.5 2.5 13 4v2.2l-1.8 1.8V9l-2.2 2.2V14l-1.5 1.5v2.8L5 20.5 6.5 22l3.2-3.2h2.8L14 17.3V15.8L16.2 13.6V11.4L18 9.6V7.4l1.5-1.5V3.5L18 2l-3.5 3.5V7L14 8.5V6.5L15.5 5V2.5Zm-1 4.2 1.8 1.8v1.6l-1.8 1.8v1.6l-1.5 1.5v1.3l-1.8 1.8H8.4l-1.3-1.3 1.8-1.8v-1.3l1.5-1.5v-1.6l1.8-1.8V6.7Z"
      />
    </svg>
  );
}
