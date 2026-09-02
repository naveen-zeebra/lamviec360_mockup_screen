"use client";
import SeekerHeader from "./SeekerHeader";
import SeekerBottomNav from "./SeekerBottomNav";
import Footer from "../layout/Footer";
import { useLang } from "../../utils/lang";

export default function SeekerShell({ children }) {
  const [lang, setLang] = useLang();
  return (
    <>
      <SeekerHeader lang={lang} setLang={setLang} />
      <main className="lv-seeker-main">{children}</main>
      <Footer lang={lang} setLang={setLang} app="seeker" />
      <SeekerBottomNav lang={lang} />
    </>
  );
}
