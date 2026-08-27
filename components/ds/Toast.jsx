"use client";
import { useEffect, useState } from "react";
import Icon from "./Icon";

export default function Toast({ msg }) {
  return msg ? (
    <div className="lv-toast" role="status">
      <Icon name="check-circle" size={16} />
      {msg}
    </div>
  ) : null;
}

export function useToast() {
  const [msg, setMsg] = useState("");
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(""), 2400);
    return () => clearTimeout(t);
  }, [msg]);
  return [msg, setMsg];
}
