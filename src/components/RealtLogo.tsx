interface RealtLogoProps {
  className?: string;
}

export function RealtLogo({ className = 'h-7' }: RealtLogoProps) {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Realt geometric architectural icon */}
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7 shrink-0"
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="7" fill="#10B981" />
        <path
          d="M8 21.5V14.5L16 8L24 14.5V21.5C24 22.3284 23.3284 23 22.5 23H9.5C8.67157 23 8 22.3284 8 21.5Z"
          fill="white"
        />
        <circle cx="16" cy="17" r="2.5" fill="#10B981" />
      </svg>

      {/* Brand Wordmark */}
      <div className="flex items-baseline">
        <span className="font-display text-xl font-bold tracking-tight text-slate-900">
          realt
        </span>
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 ml-0.5 mb-1" />
      </div>
    </div>
  );
}
