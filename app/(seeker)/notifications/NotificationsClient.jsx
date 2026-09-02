"use client";
import { useEffect, useState } from "react";
import Icon from "../../../components/ds/Icon";
import { useLang, t } from "../../../utils/lang";
import { listNotifications, markNotificationRead } from "../../../lib/seekerStore";

const TYPE_ICON = {
  confirmation: "send",
  cv_view: "eye",
  status: "list-checks",
  interview: "calendar",
  offer: "gift",
};

export default function NotificationsClient() {
  const [lang] = useLang();
  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    setNotifications(listNotifications());
  }, []);

  if (notifications === null) return null;

  const read = (id) => {
    markNotificationRead(id);
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <div className="lv-page-container">
      <div className="lv-dash-welcome">
        <h1>{t(lang, "Notifications")}</h1>
        <p>{t(lang, "Application confirmations, status changes, interview invitations and offers.")}</p>
      </div>

      {notifications.length ? (
        <div className="lv-notif-list">
          {notifications.map((n) => (
            <button key={n.id} className={`lv-notif-row ${n.read ? "" : "unread"}`} onClick={() => read(n.id)}>
              <span className="lv-notif-icon">
                <Icon name={TYPE_ICON[n.type] || "bell"} size={18} />
              </span>
              <span className="lv-notif-body">
                <strong>{n.title}</strong>
                <span>{n.message}</span>
                <em>{n.date}</em>
              </span>
              {!n.read && <span className="lv-notif-dot" aria-label={t(lang, "Unread")} />}
            </button>
          ))}
        </div>
      ) : (
        <div className="lv-empty">
          <h3>{t(lang, "No notifications yet")}</h3>
          <p>{t(lang, "Updates about your applications and interviews will show up here.")}</p>
        </div>
      )}
    </div>
  );
}
