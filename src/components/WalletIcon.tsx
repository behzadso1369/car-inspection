type WalletIconProps = {
  size?: number;
  className?: string;
};

export function WalletIcon({ size = 24, className }: WalletIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8.2 7.1V6.35c0-.75.6-1.35 1.35-1.35h4.9c.75 0 1.35.6 1.35 1.35V7.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <rect
        x="3.75"
        y="7.1"
        width="16.5"
        height="12.4"
        rx="2.4"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M15.35 13.3h4.9v2.7h-4.9a1.35 1.35 0 0 1 0-2.7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="16.15" cy="14.65" r="0.7" fill="currentColor" />
    </svg>
  );
}
