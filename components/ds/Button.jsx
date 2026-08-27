"use client";

const SIZES = {
  sm: { padding: "6px 14px", fontSize: "var(--text-sm)" },
  md: { padding: "10px 20px", fontSize: "var(--text-base)" },
  lg: { padding: "13px 26px", fontSize: "var(--text-md)" },
};

const VARIANTS = {
  primary: { background: "var(--surface-brand)", color: "var(--text-inverse)", border: "1px solid transparent" },
  secondary: { background: "var(--surface-card)", color: "var(--text-brand)", border: "1.5px solid var(--border-brand)" },
  ghost: { background: "transparent", color: "var(--text-primary)", border: "1px solid transparent" },
  danger: { background: "var(--color-error)", color: "var(--text-inverse)", border: "1px solid transparent" },
};

export default function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  disabled = false,
  children,
  onClick,
  type = "button",
  style,
}) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;
  const iconEl = icon ? (
    <img
      src={icon}
      alt=""
      style={{
        width: 16,
        height: 16,
        filter: variant === "primary" || variant === "danger" ? "invert(1) brightness(2)" : "none",
      }}
    />
  ) : null;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        fontFamily: "var(--font-body)",
        fontWeight: 600,
        borderRadius: "var(--radius-md)",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        transition: "background var(--duration-fast) var(--ease-standard), opacity var(--duration-fast)",
        opacity: disabled ? 0.5 : 1,
        ...v,
        ...s,
        ...style,
      }}
    >
      {icon && iconPosition === "left" ? iconEl : null}
      {children}
      {icon && iconPosition === "right" ? iconEl : null}
    </button>
  );
}
