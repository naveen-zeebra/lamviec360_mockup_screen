import Icon from "./Icon";
import Button from "./Button";

export default function ErrorState({ title, desc, onRetry, retryLabel = "Try again" }) {
  return (
    <div className="lv-empty" role="alert">
      <Icon name="alert-triangle" size={28} style={{ color: "var(--color-error)", margin: "0 auto 12px" }} />
      <h3>{title}</h3>
      {desc && <p>{desc}</p>}
      {onRetry && (
        <div style={{ marginTop: 20 }}>
          <Button variant="secondary" onClick={onRetry}>
            {retryLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
