import Link from "next/link";
import Icon from "../ds/Icon";
import { useLang, t } from "../../utils/lang";

export default function PageHead({ lang, crumb, title, desc, children, home = "/" }) {
  return (
    <section className="lv-page-head">
      <div className="lv-page-head-inner">
        <div className="lv-crumbs">
          <Link href={home}>{t(lang, "Home")}</Link>
          <Icon name="chevron-right" size={14} />
          <span>{crumb}</span>
        </div>
        <h1>{title}</h1>
        {desc && <p>{desc}</p>}
        {children}
      </div>
    </section>
  );
}
