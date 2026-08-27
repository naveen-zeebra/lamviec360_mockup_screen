import { useLang, t } from "../../utils/lang";

export default function SocialAuth({ lang, providers }) {
  return (
    <div className="lv-social">
      {providers.map((p) => (
        <button key={p.label} type="button" className="lv-social-btn" onClick={(e) => e.preventDefault()}>
          <span className="lv-social-mark" aria-hidden="true">
            {p.mark}
          </span>
          {t(lang, "Continue with ")}
          {p.label}
        </button>
      ))}
    </div>
  );
}
