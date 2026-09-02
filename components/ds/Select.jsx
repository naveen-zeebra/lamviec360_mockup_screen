export default function Select({ label, options = [], value, onChange, placeholder = "Chọn..." }) {
  return (
    <div className="flex flex-col gap-1.5 font-body">
      {label && <label className="text-sm font-semibold text-ink">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className={[
          "rounded-md border-[1.5px] border-line bg-card px-3.5 py-[11px] font-body text-base",
          "focus:border-line-brand focus:outline-none focus:ring-[3px] focus:ring-blue-100",
          value ? "text-ink" : "text-faint",
        ].join(" ")}
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
