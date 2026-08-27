"use client";

export default function Card({ children, padding = "20px", hoverable = false, style }) {
  return (
    <div
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-sm)",
        padding,
        transition: "box-shadow var(--duration-normal) var(--ease-standard), transform var(--duration-normal)",
        cursor: hoverable ? "pointer" : "default",
        ...style,
      }}
      onMouseEnter={
        hoverable
          ? (e) => {
              e.currentTarget.style.boxShadow = "var(--shadow-md)";
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
