"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button, Select, Avatar } from "../../../components/ds";
import Icon from "../../../components/ds/Icon";
import Skeleton from "../../../components/ds/Skeleton";
import Toast, { useToast } from "../../../components/ds/Toast";
import StatusBadge from "../../../components/company/StatusBadge";
import { useLang, t } from "../../../utils/lang";
import {
  getAuth,
  listJobs,
  listCandidates,
  getCandidate,
  setCandidateStage,
  bulkSetCandidateStage,
  addCandidateNote,
  PIPELINE_STAGES,
  can,
} from "../../../lib/companyStore";

const SORTS = [
  { value: "date", label: "Application Date" },
  { value: "score", label: "AI Match Score" },
  { value: "experience", label: "Experience" },
  { value: "education", label: "Education Level" },
];

const STAGE_SELECT =
  "mt-0.5 w-full rounded-sm border-[1.5px] border-line bg-card px-2 py-1.5 font-body text-xs text-ink";
const SCORE = "inline-flex items-center gap-[3px] rounded-pill bg-brand-subtle px-2 py-0.5 text-[11px] font-bold text-brand";
const OVERLAY = "fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(21,23,27,0.5)] p-6";
const MODAL = "w-full max-w-[560px] rounded-xl bg-card p-6 shadow-lg";
const MODAL_HEAD = "mb-3 flex items-center justify-between gap-3";
const ICON_BTN = "inline-flex rounded-sm border border-transparent p-1.5 text-muted hover:bg-sunken hover:text-ink";
const ERRBOX = "rounded-md border border-red-100 bg-danger-bg px-4 py-3 text-sm leading-relaxed text-danger-fg";
const ACTIONS = "mt-4 flex gap-3 max-sm:flex-col-reverse [&_button]:max-sm:w-full";

export default function CandidatesClient() {
  const [lang] = useLang();
  const params = useSearchParams();
  const jobParam = params.get("job") || "";

  const [ready, setReady] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [role, setRole] = useState("Viewer");
  const [jobFilter, setJobFilter] = useState(jobParam);
  const [sortBy, setSortBy] = useState("date");
  const [openId, setOpenId] = useState(null);
  const [selected, setSelected] = useState([]);
  const [noteDraft, setNoteDraft] = useState("");
  const [confirmBulk, setConfirmBulk] = useState(null);
  const [undo, setUndo] = useState(null);
  const [toast, setToast] = useToast();

  const refresh = () => setCandidates(listCandidates());

  useEffect(() => {
    setRole(getAuth().role);
    const timer = setTimeout(() => {
      setJobs(listJobs());
      refresh();
      setReady(true);
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!undo) return;
    const timer = setTimeout(() => setUndo(null), 5 * 60 * 1000);
    return () => clearTimeout(timer);
  }, [undo]);

  const manage = can(role, "candidates.manage");

  const visible = useMemo(() => {
    let list = candidates.filter((c) => !jobFilter || c.jobId === jobFilter);
    list = list.slice().sort((a, b) => {
      if (sortBy === "score") return b.matchScore - a.matchScore;
      if (sortBy === "experience") return b.experienceYears - a.experienceYears;
      if (sortBy === "education") return a.educationLevel.localeCompare(b.educationLevel);
      return a.appliedDate < b.appliedDate ? 1 : -1;
    });
    return list;
  }, [candidates, jobFilter, sortBy]);

  const columns = PIPELINE_STAGES.map((stage) => ({ stage, items: visible.filter((c) => c.stage === stage) }));
  const open = openId ? getCandidate(openId) : null;
  const jobOf = (id) => jobs.find((j) => j.id === id);

  const move = (id, stage) => {
    setCandidateStage(id, stage);
    refresh();
    setToast(`${t(lang, "Moved to")} ${t(lang, stage)}`);
  };

  const toggleSel = (id) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const runBulk = (stage) => {
    const prev = {};
    selected.forEach((id) => {
      const c = candidates.find((x) => x.id === id);
      if (c) prev[id] = c.stage;
    });
    bulkSetCandidateStage(selected, stage);
    refresh();
    setUndo({ ids: [...selected], prev, stage });
    setSelected([]);
    setConfirmBulk(null);
    setToast(`${selected.length} ${t(lang, "candidates moved to")} ${t(lang, stage)}`);
  };

  const doUndo = () => {
    Object.entries(undo.prev).forEach(([id, stage]) => setCandidateStage(id, stage));
    refresh();
    setUndo(null);
    setToast(t(lang, "Change undone"));
  };

  if (!ready) {
    return (
      <>
        <Skeleton width={240} height={30} style={{ marginBottom: 24 }} />
        <Skeleton height={320} />
      </>
    );
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="mb-1.5 text-2xl font-extrabold">{t(lang, "Candidate Pipeline")}</h1>
        <p className="text-sm text-muted">{t(lang, "Move candidates between stages with the dropdown on each card.")}</p>
      </div>

      <div className="mb-5 flex flex-wrap gap-3">
        <div className="min-w-[200px]">
          <Select
            value={jobFilter}
            onChange={(e) => setJobFilter(e.target.value)}
            placeholder={t(lang, "All jobs")}
            options={jobs.map((j) => ({ value: j.id, label: j.title }))}
          />
        </div>
        <div className="min-w-[180px]">
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} options={SORTS.map((s) => ({ value: s.value, label: t(lang, s.label) }))} />
        </div>
        <span className="self-center text-sm text-muted">
          {visible.length} {t(lang, "candidates")}
        </span>
      </div>

      {manage && selected.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-3 rounded-md border border-line-brand bg-card px-3.5 py-2.5">
          <span className="text-sm font-bold">
            {selected.length} {t(lang, "selected")}
          </span>
          <Select
            value=""
            placeholder={t(lang, "Move selected to…")}
            onChange={(e) => {
              if (!e.target.value) return;
              if (e.target.value === "Rejected") setConfirmBulk({ stage: "Rejected", phase: 1 });
              else runBulk(e.target.value);
            }}
            options={PIPELINE_STAGES.map((s) => ({ value: s, label: t(lang, s) }))}
          />
          <Button variant="ghost" size="sm" onClick={() => setSelected([])}>
            {t(lang, "Clear")}
          </Button>
        </div>
      )}

      {undo && (
        <div className="mb-5 flex flex-wrap items-center gap-5 rounded-lg border border-line bg-card p-5">
          <Icon name="rotate-ccw" size={18} />
          <span className="flex-1 text-sm">
            {undo.ids.length} {t(lang, "candidates moved to")} {t(lang, undo.stage)}. {t(lang, "You can undo this within 5 minutes.")}
          </span>
          <Button variant="secondary" size="sm" onClick={doUndo}>
            {t(lang, "Undo")}
          </Button>
        </div>
      )}

      <div className="grid grid-cols-[repeat(7,minmax(200px,1fr))] gap-3 overflow-x-auto pb-2 max-md:grid-cols-[repeat(7,minmax(220px,80vw))]">
        {columns.map((col) => (
          <div key={col.stage} className="flex min-w-[200px] flex-col gap-2.5 rounded-md bg-sunken p-2.5">
            <div className="flex items-center justify-between px-1 py-0.5">
              <h5 className="m-0 text-[11px] font-bold uppercase tracking-[0.02em] text-faint">{t(lang, col.stage)}</h5>
              <span className="rounded-pill bg-card px-2 py-px text-[11px] font-bold text-muted">{col.items.length}</span>
            </div>
            <div className="flex min-h-[60px] flex-col gap-2">
              {col.items.map((c) => (
                <div key={c.id} className="rounded-md border border-line bg-card p-2.5">
                  <div className="flex items-start gap-2">
                    {manage && (
                      <input
                        type="checkbox"
                        aria-label={t(lang, "Select") + " " + c.name}
                        checked={selected.includes(c.id)}
                        onChange={() => toggleSel(c.id)}
                        className="mt-[3px] accent-blue-600"
                      />
                    )}
                    <button className="flex w-full items-center gap-2 p-0 text-left font-body" onClick={() => { setOpenId(c.id); setNoteDraft(""); }}>
                      <Avatar name={c.name} size={30} />
                      <span className="min-w-0">
                        <strong className="block text-[13px] text-ink">{c.name}</strong>
                        <em className="block max-w-[140px] truncate text-[11px] not-italic text-faint">{jobOf(c.jobId)?.title}</em>
                      </span>
                    </button>
                  </div>
                  <div className="my-2 flex items-center gap-2.5 text-[11px] text-faint">
                    <span className={SCORE} title={t(lang, "AI Match Score")}>
                      <Icon name="sparkles" size={10} /> {c.matchScore}%
                    </span>
                    <span>
                      {c.experienceYears} {t(lang, "yrs")}
                    </span>
                  </div>
                  {manage ? (
                    <select
                      className={STAGE_SELECT}
                      value={c.stage}
                      onChange={(e) => move(c.id, e.target.value)}
                      aria-label={t(lang, "Change stage for") + " " + c.name}
                    >
                      {PIPELINE_STAGES.map((s) => (
                        <option key={s} value={s}>
                          {t(lang, s)}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="mt-2">
                      <StatusBadge kind="stage" value={c.stage} lang={lang} />
                    </div>
                  )}
                </div>
              ))}
              {col.items.length === 0 && <p className="py-3 text-center text-xs text-faint">{t(lang, "No candidates")}</p>}
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-[200] flex justify-end bg-[rgba(21,23,27,0.4)]" onClick={() => setOpenId(null)}>
          <aside
            className="h-full w-full max-w-[460px] animate-[lv-slide-in_0.2s_var(--ease-out)] overflow-y-auto bg-card shadow-lg"
            role="dialog"
            aria-modal="true"
            aria-label={open.name}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-start justify-between gap-3 border-b border-line bg-card p-5">
              <div className="flex items-center gap-3">
                <Avatar name={open.name} size={44} />
                <div>
                  <strong className="text-md">{open.name}</strong>
                  <p className="text-sm text-faint">{jobOf(open.jobId)?.title}</p>
                </div>
              </div>
              <button className={ICON_BTN} aria-label={t(lang, "Close")} onClick={() => setOpenId(null)}>
                <Icon name="x" size={18} />
              </button>
            </div>

            <div className="p-5">
              <div className="mb-4 flex flex-wrap gap-2">
                <StatusBadge kind="stage" value={open.stage} lang={lang} />
                <span className={SCORE}>
                  <Icon name="sparkles" size={10} /> {open.matchScore}% {t(lang, "match")}
                </span>
              </div>

              <dl className="mb-5 flex flex-col gap-3 [&_div]:flex [&_div]:justify-between [&_div]:gap-4 [&_div]:border-b [&_div]:border-line [&_div]:pb-3 [&_div:last-child]:border-0 [&_div:last-child]:pb-0 [&_dt]:m-0 [&_dt]:text-faint [&_dd]:m-0 [&_dd]:text-right [&_dd]:font-semibold [&_dd]:[overflow-wrap:anywhere]">
                <div>
                  <dt>{t(lang, "Email")}</dt>
                  <dd>{open.email}</dd>
                </div>
                <div>
                  <dt>{t(lang, "Phone")}</dt>
                  <dd>{open.phone}</dd>
                </div>
                <div>
                  <dt>{t(lang, "Experience")}</dt>
                  <dd>{open.experienceYears} {t(lang, "years")}</dd>
                </div>
                <div>
                  <dt>{t(lang, "Education")}</dt>
                  <dd>{t(lang, open.educationLevel)}</dd>
                </div>
                <div>
                  <dt>{t(lang, "Applied")}</dt>
                  <dd>{open.appliedDate}</dd>
                </div>
                <div>
                  <dt>{t(lang, "Resume")}</dt>
                  <dd>
                    <span className="inline-flex items-center gap-2 rounded-md bg-sunken px-3.5 py-2 text-sm">
                      <Icon name="file-text" size={13} /> {open.resumeFileName}
                    </span>
                  </dd>
                </div>
              </dl>

              {manage && (
                <div className="mb-5">
                  <label className="mb-1.5 block text-sm font-semibold text-ink">{t(lang, "Move to stage")}</label>
                  <select className={`${STAGE_SELECT} w-full`} value={open.stage} onChange={(e) => move(open.id, e.target.value)}>
                    {PIPELINE_STAGES.map((s) => (
                      <option key={s} value={s}>
                        {t(lang, s)}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <h3 className="mb-2.5 text-base font-bold">{t(lang, "Internal Notes")}</h3>
                <p className="mb-3 text-xs text-faint">{t(lang, "Visible to Company Admin and HR only. Edits are logged.")}</p>
                <div className="mb-3 flex flex-col gap-2.5">
                  {open.notes.length === 0 && <p className="text-sm text-faint">{t(lang, "No notes yet.")}</p>}
                  {open.notes.map((n) => (
                    <div key={n.id} className="rounded-md bg-sunken px-3 py-2.5">
                      <p className="mb-1 text-sm">{n.text}</p>
                      <em className="text-[11px] not-italic text-faint">
                        {n.author} · {n.at}
                      </em>
                    </div>
                  ))}
                </div>
                {manage && (
                  <div className="flex gap-2">
                    <textarea
                      className="min-h-[64px] w-full resize-y rounded-md border-[1.5px] border-line px-3.5 py-[11px] font-body text-base text-ink focus:border-line-brand focus:outline-none focus:ring-[3px] focus:ring-blue-100"
                      value={noteDraft}
                      onChange={(e) => setNoteDraft(e.target.value)}
                      placeholder={t(lang, "Add an internal note…")}
                    />
                    <Button
                      variant="secondary"
                      onClick={() => {
                        if (!noteDraft.trim()) return;
                        addCandidateNote(open.id, noteDraft.trim(), getAuth().name);
                        setNoteDraft("");
                        refresh();
                        setToast(t(lang, "Note added"));
                      }}
                    >
                      {t(lang, "Add")}
                    </Button>
                  </div>
                )}
              </div>

              {manage && (
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button variant="secondary" size="sm" onClick={() => setToast(t(lang, "Email composer is not part of this prototype"))}>
                    <Icon name="mail" size={14} /> {t(lang, "Email candidate")}
                  </Button>
                  {open.stage !== "Rejected" && (
                    <Button variant="ghost" size="sm" className="text-danger" onClick={() => move(open.id, "Rejected")}>
                      {t(lang, "Reject")}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>
      )}

      {confirmBulk && (
        <div className={OVERLAY} role="dialog" aria-modal="true" aria-label={t(lang, "Confirm bulk rejection")}>
          <div className={MODAL}>
            <div className={MODAL_HEAD}>
              <strong className="text-md">{t(lang, "Reject")} {selected.length} {t(lang, "candidates?")}</strong>
              <button className={ICON_BTN} aria-label={t(lang, "Close")} onClick={() => setConfirmBulk(null)}>
                <Icon name="x" size={16} />
              </button>
            </div>
            {confirmBulk.phase === 1 ? (
              <>
                <p className="text-sm text-muted">
                  {t(lang, "This moves every selected candidate to Rejected. You'll be asked to confirm once more.")}
                </p>
                <div className={ACTIONS}>
                  <Button variant="secondary" onClick={() => setConfirmBulk(null)}>
                    {t(lang, "Cancel")}
                  </Button>
                  <Button variant="danger" onClick={() => setConfirmBulk({ stage: "Rejected", phase: 2 })}>
                    {t(lang, "Continue")}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p className={ERRBOX} role="alert">
                  {t(lang, "Final confirmation: reject these candidates. This can be undone within 5 minutes.")}
                </p>
                <div className={ACTIONS}>
                  <Button variant="secondary" onClick={() => setConfirmBulk(null)}>
                    {t(lang, "Cancel")}
                  </Button>
                  <Button variant="danger" onClick={() => runBulk("Rejected")}>
                    {t(lang, "Reject candidates")}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <Toast msg={toast} />
    </>
  );
}
