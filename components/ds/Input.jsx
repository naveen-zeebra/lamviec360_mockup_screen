"use client";
import { useState } from "react";

export default function Input({ label, placeholder, type = "text", value, onChange, error, icon, iconRight, onIconRightClick, size = "md" }) {
  const [focused, setFocused] = useState(false);
  const pad = size === "sm" ? "8px 12px" : "11px 14px";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "var(--font-body)" }}>
      {label && (
        <label style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-primary)" }}>{label}</label>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: pad,
          borderRadius: "var(--radius-md)",
          border: "1.5px solid " + (error ? "var(--color-error)" : focused ? "var(--border-focus)" : "var(--border-default)"),
          background: "var(--surface-card)",
          boxShadow: focused ? "var(--focus-ring)" : "none",
          transition: "box-shadow var(--duration-fast)",
        }}
      >
        {icon && <img src={icon} alt="" style={{ width: 16, height: 16, opacity: 0.6 }} />}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            border: "none",
            outline: "none",
            flex: 1,
            fontSize: "var(--text-base)",
            fontFamily: "var(--font-body)",
            background: "transparent",
            color: "var(--text-primary)",
          }}
        />
        {iconRight && (
          <span style={{ cursor: "pointer", display: "flex", alignItems: "center" }} onClick={onIconRightClick}>
            {iconRight}
          </span>
        )}
      </div>
      {error && <span style={{ fontSize: "var(--text-xs)", color: "var(--color-error)" }}>{error}</span>}
    </div>
  );
}
