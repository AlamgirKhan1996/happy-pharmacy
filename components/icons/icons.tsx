type IconProps = {
  className?: string;
};

const iconClass = "size-5";

export function SearchIcon({ className = iconClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="6.25" stroke="currentColor" strokeWidth="1.7" />
      <path d="m16 16 3.2 3.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function UserIcon({ className = iconClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M5.8 18.4c1.4-2.6 3.6-3.9 6.2-3.9s4.8 1.3 6.2 3.9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HeartIcon({ className = iconClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 19s-6.4-3.8-8.3-7.3C2.1 9.2 3.3 6.4 6.2 6c1.7-.2 3.2.6 3.8 2 .6-1.4 2.1-2.2 3.8-2 2.9.4 4.1 3.2 2.5 5.7C18.4 15.2 12 19 12 19Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BagIcon({ className = iconClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6.4 8.2h11.2l-.8 10.1a1.6 1.6 0 0 1-1.6 1.5H8.8a1.6 1.6 0 0 1-1.6-1.5L6.4 8.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M9 8.1V6.8A3 3 0 0 1 12 3.8 3 3 0 0 1 15 6.8v1.3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MenuIcon({ className = iconClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4.5 7h15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M4.5 12h15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M4.5 17h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronLeftIcon({ className = iconClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m14.5 6-6 6 6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronRightIcon({ className = iconClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m9.5 6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronDownIcon({ className = iconClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PauseIcon({ className = iconClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M8 6.5h2.4v11H8zM13.6 6.5H16v11h-2.4z" fill="currentColor" />
    </svg>
  );
}

export function PlayIcon({ className = iconClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8.5 6.8v10.4L18 12 8.5 6.8Z" />
    </svg>
  );
}

export function CloseIcon({ className = iconClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m7 7 10 10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M17 7 7 17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function HomeIcon({ className = iconClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4.8 11.2 12 5.4l7.2 5.8V19a1.2 1.2 0 0 1-1.2 1.2h-4.2v-5.1H10.2V20.2H6a1.2 1.2 0 0 1-1.2-1.2v-7.8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GridIcon({ className = iconClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="4.5" y="4.5" width="6.2" height="6.2" rx="1.1" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13.3" y="4.5" width="6.2" height="6.2" rx="1.1" stroke="currentColor" strokeWidth="1.7" />
      <rect x="4.5" y="13.3" width="6.2" height="6.2" rx="1.1" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13.3" y="13.3" width="6.2" height="6.2" rx="1.1" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function WhatsAppIcon({ className = iconClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 4.5A7.46 7.46 0 0 0 4.6 11.9a7.4 7.4 0 0 0 1.1 3.9L4.5 19.5l2.8-1.15a7.5 7.5 0 0 0 12.2-5.45 7.46 7.46 0 0 0-7.46-8.4Zm0 13.66a6.16 6.16 0 0 1-3.14-.86l-.22-.13-2.06.85.83-2-.15-.23a6.16 6.16 0 1 1 4.74 2.37Zm3.38-4.62c.18.1.3.16.35.26.05.1.05.58-.13 1.14-.18.55-1.05 1.06-1.47 1.13-.38.06-.87.09-1.4-.09-.32-.1-.74-.24-1.27-.48-2.24-.97-3.7-3.22-3.81-3.37-.11-.16-.9-1.2-.9-2.29 0-1.08.57-1.61.77-1.83.2-.22.44-.28.58-.28h.42c.14 0 .32-.04.5.38.18.45.62 1.55.68 1.66.05.11.09.24.02.4-.08.16-.12.26-.23.4-.12.13-.24.3-.35.4-.12.11-.24.23-.1.45.14.22.62 1.02 1.33 1.65.91.82 1.68 1.07 1.92 1.19.24.11.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12Z" />
    </svg>
  );
}
