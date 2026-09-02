export default function Stepper({ steps, current }) {
  return (
    <ol className="lv-stepper">
      {steps.map((label, i) => {
        const n = i + 1;
        const state = n < current ? "done" : n === current ? "current" : "";
        return (
          <li key={label} className={`lv-stepper-item ${state}`}>
            <span className="lv-stepper-dot">{n < current ? "✓" : `0${n}`}</span>
            <span className="lv-stepper-label">{label}</span>
          </li>
        );
      })}
    </ol>
  );
}
