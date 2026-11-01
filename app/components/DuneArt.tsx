// Decorative desert-at-dusk illustration for the left panel
export default function DuneArt() {
  return (
    <svg
      viewBox="0 0 400 600"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="auth-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b2d86" />
          <stop offset="0.5" stopColor="#594ba0" />
          <stop offset="1" stopColor="#86819e" />
        </linearGradient>
        <linearGradient id="auth-dune-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#625d73" />
          <stop offset="1" stopColor="#41394f" />
        </linearGradient>
        <linearGradient id="auth-dune-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#41394f" />
          <stop offset="1" stopColor="#261f32" />
        </linearGradient>
      </defs>
      <rect width="400" height="600" fill="url(#auth-sky)" />
      <path
        d="M0 330 C80 300 150 225 230 248 C300 268 350 318 400 328 L400 600 L0 600 Z"
        fill="url(#auth-dune-back)"
      />
      <path
        d="M0 430 C100 385 200 400 262 452 C312 492 360 502 400 496 L400 600 L0 600 Z"
        fill="url(#auth-dune-front)"
      />
    </svg>
  );
}
