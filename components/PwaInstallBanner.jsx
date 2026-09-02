"use client";
import { useEffect, useState } from "react";
import Icon from "./ds/Icon";
import { Button } from "./ds";
import { useLang, t } from "../utils/lang";

const DISMISS_KEY = "lv360-pwa-dismissed";

export default function PwaInstallBanner() {
  const [lang] = useLang();
  const [deferred, setDeferred] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(DISMISS_KEY) === "1";
    } catch (e) {}
    if (dismissed) return;

    const onPrompt = (e) => {
      e.preventDefault();
      setDeferred(e);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch (e) {}
  };

  const install = async () => {
    if (!deferred) return;
    deferred.prompt();
    try {
      await deferred.userChoice;
    } catch (e) {}
    dismiss();
  };

  return (
    <div className="lv-pwa-banner" role="status">
      <div className="lv-pwa-banner-icon">
        <Icon name="download" size={18} />
      </div>
      <div className="lv-pwa-banner-body">
        <strong>{t(lang, "Install LàmViệc360")}</strong>
        <span>{t(lang, "Add the app to your home screen for quick access.")}</span>
      </div>
      <div className="lv-pwa-banner-actions">
        <Button variant="primary" size="sm" onClick={install}>
          {t(lang, "Install")}
        </Button>
        <button className="lv-pwa-banner-close" aria-label={t(lang, "Dismiss")} onClick={dismiss}>
          <Icon name="x" size={16} />
        </button>
      </div>
    </div>
  );
}
