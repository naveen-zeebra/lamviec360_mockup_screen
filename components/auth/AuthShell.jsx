import Header from "../layout/Header";

export default function AuthShell({ lang, setLang, app, children, side, reverse = false }) {
  return (
    <>
      <Header lang={lang} setLang={setLang} app={app} />
      <main className={`lv-auth ${reverse ? "lv-auth-reverse" : ""}`}>
        <div className="lv-auth-form">
          <div className="lv-auth-inner">{children}</div>
        </div>
        <aside className="lv-auth-side">{side}</aside>
      </main>
    </>
  );
}
