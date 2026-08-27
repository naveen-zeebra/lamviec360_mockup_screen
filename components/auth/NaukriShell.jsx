import Link from "next/link";
import Icon from "../ds/Icon";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

export default function NaukriShell({ lang, setLang, app, title, bullets, ctaText, ctaHref, children }) {
  return (
    <>
      <Header lang={lang} setLang={setLang} app={app} />
      <main className="lv-login-wrap">
        <div className="lv-login-container">
          {/* Left Panel */}
          <div className="lv-login-left">
            <h2>{title}</h2>
            <ul>
              {bullets.map((p, i) => (
                <li key={i}>
                  <Icon name="check" size={20} />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <Link 
              href={ctaHref} 
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px 24px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                color: "#4f46e5",
                fontWeight: 600,
                width: "fit-content",
                background: "#fff"
              }}
            >
              {ctaText}
            </Link>
            <div style={{ flex: 1 }} />
            <div style={{ textAlign: "center", opacity: 0.8 }}>
              <img src="/logo-cropped.png" alt="Logo" style={{ height: 60, opacity: 0.1, objectFit: "contain" }} />
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="lv-login-right">
            {children}
          </div>
        </div>
      </main>
      <Footer lang={lang} setLang={setLang} app={app} />
    </>
  );
}
