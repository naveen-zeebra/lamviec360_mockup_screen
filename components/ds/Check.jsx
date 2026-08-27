"use client";
import { useRef } from "react";

export default function Check({ label, checked, onChange, id }) {
  const ref = useRef("chk-" + Math.random().toString(36).slice(2, 9));
  const cid = id || ref.current;
  return (
    <div className="lv-check">
      <input type="checkbox" id={cid} checked={!!checked} onChange={onChange} />
      <label htmlFor={cid}>{label}</label>
    </div>
  );
}
