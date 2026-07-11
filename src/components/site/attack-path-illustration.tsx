export function AttackPathIllustration() {
  return (
    <svg
      aria-hidden
      className="attack-path-illustration"
      viewBox="0 0 720 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeWidth="1">
        <path d="M48 286L164 218L276 246L394 124L512 169L674 70" />
        <path d="M164 218L226 106L394 124" strokeDasharray="4 12" />
        <path d="M276 246L438 292L512 169" strokeDasharray="4 12" />
        <path d="M394 124L438 292L620 278" />
        <path d="M512 169L620 278L674 70" strokeDasharray="4 12" />
      </g>
      <g stroke="currentColor" strokeWidth="1">
        <circle cx="48" cy="286" r="7" />
        <circle cx="164" cy="218" r="11" />
        <circle cx="226" cy="106" r="6" />
        <circle cx="276" cy="246" r="7" />
        <circle cx="394" cy="124" r="14" />
        <circle cx="438" cy="292" r="6" />
        <circle cx="512" cy="169" r="9" />
        <circle cx="620" cy="278" r="7" />
        <circle cx="674" cy="70" r="12" />
        <path d="M386 124H402M394 116V132" />
        <path d="M666 70H682M674 62V78" />
      </g>
    </svg>
  );
}
