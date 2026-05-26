type IconProps = {
  className?: string;
};

export function AcousticGuitarIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`shrink-0 rotate-45 text-forest ${className}`}
    >
      <path
        fill="currentColor"
        d="M12 2a1.8 1.8 0 1 0 0 3.6A1.8 1.8 0 0 0 12 2Zm-4.2 5.4c-2.4 0-4.3 2-4.3 4.4 0 1.8 1 3.3 2.5 4v5.1c0 1.2 1 2.2 2.2 2.2h7.6c1.2 0 2.2-1 2.2-2.2v-5.1a4.5 4.5 0 0 0 2.5-4c0-2.4-1.9-4.4-4.3-4.4H7.8Zm0 2.2h8.4c1.2 0 2.1 1 2.1 2.2a2.1 2.1 0 0 1-2.1 2.2H7.8a2.1 2.1 0 0 1-2.1-2.2c0-1.2.9-2.2 2.1-2.2Zm1.1 4.4h6.2v4.9H8.9v-4.9Z"
      />
    </svg>
  );
}
