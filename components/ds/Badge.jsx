const TONES = {
  neutral: { bg: "var(--gray-100)", fg: "var(--text-secondary)" },
  brand: { bg: "var(--surface-brand-subtle)", fg: "var(--text-brand)" },
  success: { bg: "var(--color-success-bg)", fg: "var(--color-success-text)" },
  warning: { bg: "var(--color-warning-bg)", fg: "var(--color-warning-text)" },
  error: { bg: "var(--color-error-bg)", fg: "var(--color-error-text)" },
};

export default function Badge({ tone = "neutral", children }) {
  const t = TONES[tone] || TONES.neutral;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: "var(--font-body)",
        fontWeight: 600,
        fontSize: "var(--text-xs)",
        padding: "3px 10px",
        borderRadius: "var(--radius-pill)",
        background: t.bg,
        color: t.fg,
        letterSpacing: "var(--tracking-wide)",
      }}
    >
      {children}
    </span>
  );
}
