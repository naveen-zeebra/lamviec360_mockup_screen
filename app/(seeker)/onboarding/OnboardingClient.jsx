"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Select } from "../../../components/ds";
import Icon from "../../../components/ds/Icon";
import Stepper from "../../../components/ds/Stepper";
import Toast, { useToast } from "../../../components/ds/Toast";
import { useLang, t } from "../../../utils/lang";
import { getProfile, saveProfile, computeCompleteness } from "../../../lib/seekerStore";

const STEP_LABELS = ["Personal", "Professional", "Education", "Experience", "Resume & Preferences", "Completion"];
const EXPERIENCE_RANGES = ["Less than 1 year", "1-3 years", "3-5 years", "5-10 years", "10+ years"];
const INDUSTRIES = ["Technology", "Retail & Commerce", "Media & Creative", "Transport & Logistics", "Manufacturing", "Finance & Banking", "Other"];
const WORK_MODES = ["Remote", "Hybrid", "On-site"];
const MAX_RESUME_MB = 10;

function emptyEducation() {
  return { degree: "", institution: "", year: "" };
}
function emptyExperience() {
  return { company: "", title: "", start: "", end: "", responsibilities: "" };
}

export default function OnboardingClient() {
  const [lang, setLang] = useLang();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState(null);
  const [skillInput, setSkillInput] = useState("");
  const [err, setErr] = useState("");
  const [toast, setToast] = useToast();

  useEffect(() => {
    setProfile(getProfile());
  }, []);

  if (!profile) return null;

  const persist = (patch) => {
    const next = { ...profile, ...patch };
    setProfile(next);
    saveProfile(patch);
    return next;
  };

  const goNext = () => {
    if (step === 1 && !profile.personal.fullName.trim()) {
      setErr(t(lang, "Please enter your full name."));
      return;
    }
    if (step === 2 && !profile.professional.title.trim()) {
      setErr(t(lang, "Please enter your current job title."));
      return;
    }
    setErr("");
    setStep((s) => Math.min(6, s + 1));
  };
  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const addSkill = () => {
    const v = skillInput.trim();
    if (!v) return;
    if (!profile.professional.skills.includes(v)) {
      persist({ professional: { ...profile.professional, skills: [...profile.professional.skills, v] } });
    }
    setSkillInput("");
  };
  const removeSkill = (s) => persist({ professional: { ...profile.professional, skills: profile.professional.skills.filter((x) => x !== s) } });

  const updateEducation = (i, field, value) => {
    const list = profile.education.slice();
    list[i] = { ...list[i], [field]: value };
    persist({ education: list });
  };
  const addEducation = () => persist({ education: [...profile.education, emptyEducation()] });
  const removeEducation = (i) => persist({ education: profile.education.filter((_, idx) => idx !== i) });

  const updateExperience = (i, field, value) => {
    const list = profile.experience.slice();
    list[i] = { ...list[i], [field]: value };
    persist({ experience: list });
  };
  const addExperience = () => persist({ experience: [...profile.experience, emptyExperience()] });
  const removeExperience = (i) => persist({ experience: profile.experience.filter((_, idx) => idx !== i) });

  const onResumeChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const okTypes = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];
    const ext = "." + file.name.split(".").pop().toLowerCase();
    if (!okTypes.includes(ext)) {
      setErr(t(lang, "Unsupported file type. Use PDF, DOC, DOCX, JPG or PNG."));
      return;
    }
    if (file.size > MAX_RESUME_MB * 1024 * 1024) {
      setErr(t(lang, "File is larger than 10MB."));
      return;
    }
    setErr("");
    persist({ resume: { fileName: file.name, uploadedAt: new Date().toISOString().slice(0, 10) } });
  };

  const preferenceList = (key, value) => {
    const list = profile.preferences[key];
    const has = list.includes(value);
    const next = has ? list.filter((v) => v !== value) : [...list, value];
    persist({ preferences: { ...profile.preferences, [key]: next } });
  };

  const completeness = computeCompleteness(profile);
  const finish = () => {
    saveProfile(profile);
    router.push("/dashboard");
  };

  return (
    <>
      <div className="lv-onboard-wrap">
        <div className="lv-onboard-head">
          <h1>{t(lang, "Set up your profile")}</h1>
          <p>{t(lang, "This helps us match you with the right jobs. You can edit everything later in Settings.")}</p>
        </div>
        <Stepper steps={STEP_LABELS.map((l) => t(lang, l))} current={step} />

        <div className="lv-onboard-card">
          {step === 1 && (
            <div className="lv-form-grid">
              <Input label={t(lang, "Full Name")} value={profile.personal.fullName} onChange={(e) => persist({ personal: { ...profile.personal, fullName: e.target.value } })} placeholder="Nguyen Van A" />
              <Input label={t(lang, "Phone")} value={profile.personal.phone} onChange={(e) => persist({ personal: { ...profile.personal, phone: e.target.value } })} placeholder="090 123 4567" />
              <Input label={t(lang, "Location")} value={profile.personal.location} onChange={(e) => persist({ personal: { ...profile.personal, location: e.target.value } })} placeholder="Ho Chi Minh City" />
              <div>
                <label style={{ fontSize: "var(--text-sm)", fontWeight: 600, display: "block", marginBottom: 6 }}>{t(lang, "Profile Photo")}</label>
                <input type="file" accept="image/*" onChange={(e) => e.target.files[0] && persist({ personal: { ...profile.personal, photo: e.target.files[0].name } })} />
                {profile.personal.photo && <p className="lv-file-chip"><Icon name="image" size={14} />{profile.personal.photo}</p>}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="lv-form-grid">
              <Input label={t(lang, "Current Job Title")} value={profile.professional.title} onChange={(e) => persist({ professional: { ...profile.professional, title: e.target.value } })} placeholder="Frontend Engineer" />
              <Select label={t(lang, "Experience")} value={profile.professional.experience} onChange={(e) => persist({ professional: { ...profile.professional, experience: e.target.value } })} options={EXPERIENCE_RANGES.map((v) => ({ value: v, label: t(lang, v) }))} placeholder={t(lang, "Select range")} />
              <Select label={t(lang, "Industry")} value={profile.professional.industry} onChange={(e) => persist({ professional: { ...profile.professional, industry: e.target.value } })} options={INDUSTRIES.map((v) => ({ value: v, label: t(lang, v) }))} placeholder={t(lang, "Select industry")} />
              <div>
                <label style={{ fontSize: "var(--text-sm)", fontWeight: 600, display: "block", marginBottom: 6 }}>{t(lang, "Skills")}</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <Input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} placeholder={t(lang, "e.g. React")} />
                  <Button type="button" variant="secondary" onClick={addSkill}>
                    {t(lang, "Add")}
                  </Button>
                </div>
                <div className="lv-job-tags" style={{ marginTop: 12 }}>
                  {profile.professional.skills.map((s) => (
                    <span key={s} className="lv-chip">
                      {s}
                      <button type="button" aria-label={t(lang, "Remove") + " " + s} onClick={() => removeSkill(s)}>
                        <Icon name="x" size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {profile.education.length === 0 && <p style={{ color: "var(--text-tertiary)", fontSize: "var(--text-sm)" }}>{t(lang, "No education added yet.")}</p>}
              {profile.education.map((ed, i) => (
                <div key={i} className="lv-repeat-card">
                  <div className="lv-form-grid">
                    <Input label={t(lang, "Degree")} value={ed.degree} onChange={(e) => updateEducation(i, "degree", e.target.value)} placeholder="B.Sc. Computer Science" />
                    <Input label={t(lang, "Institution")} value={ed.institution} onChange={(e) => updateEducation(i, "institution", e.target.value)} placeholder="HCMC University of Technology" />
                    <Input label={t(lang, "Graduation Year")} value={ed.year} onChange={(e) => updateEducation(i, "year", e.target.value)} placeholder="2022" />
                  </div>
                  <button type="button" className="lv-repeat-remove" onClick={() => removeEducation(i)}>
                    <Icon name="trash-2" size={14} /> {t(lang, "Remove")}
                  </button>
                </div>
              ))}
              <Button type="button" variant="secondary" onClick={addEducation} style={{ alignSelf: "flex-start" }}>
                <Icon name="plus" size={16} /> {t(lang, "Add education")}
              </Button>
            </div>
          )}

          {step === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {profile.experience.length === 0 && <p style={{ color: "var(--text-tertiary)", fontSize: "var(--text-sm)" }}>{t(lang, "No experience added yet.")}</p>}
              {profile.experience.map((ex, i) => (
                <div key={i} className="lv-repeat-card">
                  <div className="lv-form-grid">
                    <Input label={t(lang, "Company")} value={ex.company} onChange={(e) => updateExperience(i, "company", e.target.value)} placeholder="ABC Technologies" />
                    <Input label={t(lang, "Job Title")} value={ex.title} onChange={(e) => updateExperience(i, "title", e.target.value)} placeholder="Software Engineer" />
                    <Input label={t(lang, "Start Date")} value={ex.start} onChange={(e) => updateExperience(i, "start", e.target.value)} placeholder="2021" />
                    <Input label={t(lang, "End Date")} value={ex.end} onChange={(e) => updateExperience(i, "end", e.target.value)} placeholder={t(lang, "Present")} />
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <label style={{ fontSize: "var(--text-sm)", fontWeight: 600, display: "block", marginBottom: 6 }}>{t(lang, "Responsibilities")}</label>
                    <textarea className="lv-textarea" rows={3} value={ex.responsibilities} onChange={(e) => updateExperience(i, "responsibilities", e.target.value)} placeholder={t(lang, "Key responsibilities and achievements")} />
                  </div>
                  <button type="button" className="lv-repeat-remove" onClick={() => removeExperience(i)}>
                    <Icon name="trash-2" size={14} /> {t(lang, "Remove")}
                  </button>
                </div>
              ))}
              <Button type="button" variant="secondary" onClick={addExperience} style={{ alignSelf: "flex-start" }}>
                <Icon name="plus" size={16} /> {t(lang, "Add position")}
              </Button>
            </div>
          )}

          {step === 5 && (
            <div className="lv-form-grid">
              <div>
                <label style={{ fontSize: "var(--text-sm)", fontWeight: 600, display: "block", marginBottom: 6 }}>{t(lang, "Resume")}</label>
                <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={onResumeChange} />
                <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 6 }}>{t(lang, "PDF, DOC, DOCX, JPG or PNG. Max 10MB.")}</p>
                {profile.resume.fileName && (
                  <p className="lv-file-chip">
                    <Icon name="file-text" size={14} />
                    {profile.resume.fileName}
                  </p>
                )}
              </div>
              <Select label={t(lang, "Preferred Work Mode")} value={profile.preferences.workMode} onChange={(e) => persist({ preferences: { ...profile.preferences, workMode: e.target.value } })} options={WORK_MODES.map((v) => ({ value: v, label: t(lang, v) }))} placeholder={t(lang, "Select mode")} />
              <Input label={t(lang, "Preferred Role")} value={profile.preferences.roles[0] || ""} onChange={(e) => persist({ preferences: { ...profile.preferences, roles: e.target.value ? [e.target.value] : [] } })} placeholder="Frontend Engineer" />
              <Input label={t(lang, "Preferred Location")} value={profile.preferences.locations[0] || ""} onChange={(e) => persist({ preferences: { ...profile.preferences, locations: e.target.value ? [e.target.value] : [] } })} placeholder="Ho Chi Minh City" />
              <Input label={t(lang, "Desired Salary")} value={profile.preferences.salary} onChange={(e) => persist({ preferences: { ...profile.preferences, salary: e.target.value } })} placeholder="25M - 35M VND" />
            </div>
          )}

          {step === 6 && (
            <div className="lv-completion">
              <div className="lv-completion-ring" style={{ "--pct": completeness }}>
                <strong>{completeness}%</strong>
              </div>
              <h2 style={{ fontSize: "var(--text-xl)", margin: "16px 0 8px" }}>{t(lang, "Your profile is ready")}</h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", maxWidth: 420, margin: "0 auto 24px" }}>
                {t(lang, "You can keep improving your profile from Settings at any time to get better job matches.")}
              </p>
              <Button variant="primary" size="lg" onClick={finish}>
                {t(lang, "Complete Profile")}
              </Button>
            </div>
          )}

          {err && (
            <p className="lv-error" role="alert" style={{ marginTop: 20 }}>
              <Icon name="alert-circle" size={16} />
              <span>{err}</span>
            </p>
          )}

          {step < 6 && (
            <div className="lv-reg-actions">
              {step > 1 && (
                <Button type="button" variant="secondary" onClick={goBack}>
                  {t(lang, "Back")}
                </Button>
              )}
              <Button type="button" variant="primary" onClick={goNext} style={{ marginLeft: "auto" }}>
                {t(lang, "Save & Continue")}
              </Button>
            </div>
          )}
        </div>
      </div>
      <Toast msg={toast} />
    </>
  );
}
