import Link from "next/link";
import Icon from "../ds/Icon";
import { LANGS, useLang, t } from "../../utils/lang";

export default function Footer({ lang, setLang, app = "seeker" }) {
  const emp = app === "employer";
  const cols = emp
    ? [
        {
          t: ["Giải pháp", "Solutions"],
          links: [
            [["Đăng tin tuyển dụng", "Job Posting"], "/solutions#posting"],
            [["Tìm kiếm ứng viên", "Candidate Search"], "/solutions#search"],
            [["Quản lý ứng tuyển", "Applicant Tracking"], "/solutions#tracking"],
            [["Quản lý phỏng vấn", "Interview Management"], "/solutions#interviews"],
            [["Phân tích tuyển dụng", "Hiring Analytics"], "/solutions#analytics"],
          ],
        },
        {
          t: ["Doanh nghiệp", "Company"],
          links: [
            [["Bảng giá", "Pricing"], "/pricing"],
            [["Tài nguyên", "Resources"], "/employer-resources"],
            [["Đăng nhập Doanh nghiệp", "Employer Login"], "/employer-login"],
            [["Đăng ký doanh nghiệp", "Company Registration"], "/company-register"],
          ],
        },
        {
          t: ["Người tìm việc", "Job Seekers"],
          links: [
            [["Trang Người tìm việc", "Job Seeker Home"], "/"],
            [["Tìm việc làm", "Find Jobs"], "/jobs"],
            [["Công ty", "Companies"], "/companies"],
            [["Cẩm nang nghề nghiệp", "Career Resources"], "/resources"],
          ],
        },
        {
          t: ["Pháp lý", "Legal"],
          links: [
            [["Chính sách bảo mật", "Privacy Policy"], "/employers#privacy"],
            [["Điều khoản dịch vụ", "Terms of Service"], "/employers#terms"],
            [["Bảo vệ dữ liệu", "Data Protection"], "/employers#data"],
            [["Minh bạch về AI", "AI Transparency"], "/employers#ai"],
          ],
        },
      ]
    : [
        {
          t: ["Người tìm việc", "Job Seekers"],
          links: [
            [["Tìm việc làm", "Find Jobs"], "/jobs"],
            [["Công ty", "Companies"], "/companies"],
            [["Cẩm nang nghề nghiệp", "Career Resources"], "/resources"],
            [["Hồ sơ của tôi", "My Profile"], "/login"],
            [["Đơn ứng tuyển của tôi", "My Applications"], "/login"],
          ],
        },
        {
          t: ["Tài khoản", "Account"],
          links: [
            [["Đăng nhập", "Login"], "/login"],
            [["Tạo tài khoản", "Create Account"], "/register"],
            [["Việc đã lưu", "Saved Jobs"], "/login"],
            [["Chuẩn bị phỏng vấn", "Interview Preparation"], "/resources"],
          ],
        },
        {
          t: ["Nhà tuyển dụng", "Employers"],
          links: [
            [["Trang Nhà tuyển dụng", "Employer Home"], "/employers"],
            [["Giải pháp", "Solutions"], "/solutions"],
            [["Bảng giá", "Pricing"], "/pricing"],
            [["Đăng nhập Doanh nghiệp", "Employer Login"], "/employer-login"],
          ],
        },
        {
          t: ["Pháp lý", "Legal"],
          links: [
            [["Chính sách bảo mật", "Privacy Policy"], "/#privacy"],
            [["Điều khoản dịch vụ", "Terms of Service"], "/#terms"],
            [["Chính sách Cookie", "Cookie Policy"], "/#cookies"],
            [["Minh bạch về AI", "AI Transparency"], "/#ai"],
          ],
        },
      ];

  return (
    <footer className="lv-footer">
      <div className="lv-footer-inner">
        <div className="lv-footer-brand">
          <img src="/logo-cropped.png" alt="LàmViệc360" className="lv-footer-logo" />
          <p>{t(lang, "Connecting Talent with Opportunity.")}</p>
          <Link href={emp ? "/" : "/employers"} className="lv-footer-switch">
            {emp ? t(lang, "Looking for a job?") : t(lang, "Are you hiring?")} <Icon name="arrow-right" size={14} />
          </Link>
        </div>
        {cols.map((c) => (
          <div key={c.t[1]} className="lv-footer-col">
            <h4>{(lang === "VN" || lang === "VI" ? c.t[0] : c.t[1])}</h4>
            {c.links.map(([lbl, href]) => (
              <Link key={lbl[1]} href={href}>
                {(lang === "VN" || lang === "VI" ? lbl[0] : lbl[1])}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="lv-footer-lang">
        {LANGS.map((l) => (
          <a
            key={l.code}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setLang && setLang(l.code);
            }}
            style={{ color: lang === l.code ? "var(--text-inverse)" : undefined, fontWeight: lang === l.code ? 700 : 400 }}
          >
            {l.label}
          </a>
        ))}
      </div>
      <div className="lv-footer-bottom">{t(lang, "© LàmViệc360. All rights reserved.")}</div>
    </footer>
  );
}
