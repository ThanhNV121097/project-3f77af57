/**
 * Đi Ngược's mark: the profile of a pass — up, over, down and up again — with
 * one square blocked out on the way down. The same shape as the month bar
 * that runs through the whole guide: the good months open, the bad one filled.
 * Drawn in currentColor, except the blocked square, which is the warning.
 */
export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
      <path d="M4 24 L12 9 L18.5 19 L28 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" />
      <rect x="18" y="20" width="5" height="5" className="fill-accent" />
    </svg>
  );
}
