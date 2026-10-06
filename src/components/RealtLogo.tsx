interface RealtLogoProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export function RealtLogo({ className = '', theme = 'light' }: RealtLogoProps) {
  const isDark = theme === 'dark';

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

      {/* Brand Wordmark - proportional, authentic, crisp */}
      <div className="flex items-baseline leading-none">
        <span
          className={`font-sans text-xl font-extrabold tracking-tight transition-colors ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
          style={{ letterSpacing: '-0.03em' }}
        >
          realt
        </span>
        <span
          className={`inline-block w-1.5 h-1.5 rounded-full ml-0.5 mb-0.5 ${
            isDark ? 'bg-emerald-400' : 'bg-emerald-500'
          }`}
        />
      </div>
    </div>
  );
}
