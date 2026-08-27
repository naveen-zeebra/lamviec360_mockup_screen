export default function Select({ label, options = [], value, onChange, placeholder = "Chọn..." }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "var(--font-body)" }}>
      {label && (
        <label style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-primary)" }}>{label}</label>
      )}
      <select
        value={value}
        onChange={onChange}
        style={{
          padding: "11px 14px",
          borderRadius: "var(--radius-md)",
          border: "1.5px solid var(--border-default)",
          background: "var(--surface-card)",
          fontSize: "var(--text-base)",
          color: value ? "var(--text-primary)" : "var(--text-tertiary)",
          fontFamily: "var(--font-body)",
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((o, i) => (
          <option key={i} value={o.value || o}>
            {o.label || o}
          </option>
        ))}
      </select>
    </div>
  );
}
