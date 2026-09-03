import { JOBS } from "./data";

const KEY = "lv360-seeker-store-v1";

export const STAGES = [
  "Applied",
  "Under Review",
  "Shortlisted",
  "Interview Scheduled",
  "Offer Sent",
  "Hired",
  "Rejected",
  "Withdrawn",
];

export const STAGE_TYPICAL = {
  Applied: "Typical: 1-2 days",
  "Under Review": "Typical: 2-4 days",
  Shortlisted: "Typical: 3-5 days",
  "Interview Scheduled": "Typical: 5-7 days",
  "Offer Sent": "Typical: 2-3 days",
  Hired: "",
  Rejected: "",
  Withdrawn: "",
};

function emptyStore() {
  return {
    initialized: false,
    auth: { loggedIn: false, emailVerified: false, name: "", email: "" },
    profile: {
      personal: { fullName: "", photo: "", phone: "", location: "" },
      professional: { title: "", experience: "", industry: "", skills: [] },
      languages: [],
      education: [],
      experience: [],
      resume: { fileName: "", uploadedAt: "", size: 0, type: "", dataUrl: "" },
      preferences: { roles: [], locations: [], workMode: "", salary: "" },
    },
    savedJobs: [],
    applications: [],
    notifications: [],
    settings: {
      notifications: { jobRecs: true, appUpdates: true, interviewAlerts: true, marketing: false },
      privacy: { profileVisibility: "Public to employers", resumeVisibility: "Visible when I apply" },
    },
  };
}

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function write(store) {
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
  } catch (e) {
    // ignore (private browsing / storage denied)
  }
  try {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("lv360-store"));
    }
  } catch (e) {}
  return store;
}

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

function daysAhead(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

export function computeCompleteness(profile) {
  const checks = [
    !!profile.personal.fullName,
    !!profile.personal.phone,
    !!profile.personal.location,
    !!profile.professional.title,
    !!profile.professional.industry,
    profile.professional.skills.length > 0,
    profile.education.length > 0,
    profile.experience.length > 0,
    !!profile.resume.fileName,
    profile.preferences.roles.length > 0,
  ];
  const done = checks.filter(Boolean).length;
  return Math.round((done / checks.length) * 100);
}

export function getStore() {
  const existing = read();
  if (existing) {
    if (existing.profile) {
      existing.profile.resume = { fileName: "", uploadedAt: "", size: 0, type: "", dataUrl: "", ...existing.profile.resume };
    }
    return existing;
  }
  return write(emptyStore());
}

export function ensureSeeded() {
  const store = getStore();
  if (store.initialized) return store;

  const job1 = JOBS.find((j) => j.id === 1);
  const job7 = JOBS.find((j) => j.id === 7);
  const job11 = JOBS.find((j) => j.id === 11);
  const job6 = JOBS.find((j) => j.id === 6);

  store.initialized = true;
  store.auth = { loggedIn: true, emailVerified: true, name: "Minh Tran", email: "minh.tran@example.com" };
  store.profile = {
    personal: { fullName: "Minh Tran", photo: "", phone: "090 123 4567", location: "Ho Chi Minh City" },
    professional: { title: "Frontend Engineer", experience: "3-5 years", industry: "Technology", skills: ["React", "TypeScript", "Node.js", "CSS"] },
    languages: ["Vietnamese", "English"],
    education: [{ degree: "B.Sc. Computer Science", institution: "HCMC University of Technology", year: "2019" }],
    experience: [
      { company: "Nhat Tin Software", title: "Frontend Engineer", start: "2022", end: "Present", responsibilities: "Building and maintaining customer-facing web applications." },
    ],
    resume: { fileName: "Minh_Tran_CV.pdf", uploadedAt: daysAgo(20), size: 248000, type: "application/pdf", dataUrl: "" },
    preferences: { roles: ["Frontend Engineer", "Fullstack Engineer"], locations: ["Ho Chi Minh City", "Remote"], workMode: "Hybrid", salary: "25M - 35M VND" },
  };

  store.savedJobs = [job11 ? job11.id : 11, job6 ? job6.id : 6];

  store.applications = [
    job1 && {
      id: "APP-1001",
      jobId: job1.id,
      appliedDate: daysAgo(2),
      stage: "Applied",
      closed: false,
      timeline: [{ stage: "Applied", date: daysAgo(2) }],
      resumeFileName: "Minh_Tran_CV.pdf",
      coverLetter: "",
      answers: {},
    },
    job7 && {
      id: "APP-1002",
      jobId: job7.id,
      appliedDate: daysAgo(9),
      stage: "Interview Scheduled",
      closed: false,
      interviewAt: daysAhead(3) + " 14:00",
      interview: {
        status: "invited",
        at: daysAhead(3) + " 14:00",
        durationMin: 45,
        mode: "video",
        location: "",
        meetingLink: "https://meet.lamviec360.vn/abc-frontend-r1",
        round: "First round – Hiring Manager",
        interviewers: [{ name: "Trang Bui", role: "Engineering Manager" }],
        instructions: "Please be ready 5 minutes early. We will cover your recent projects and a short live coding exercise (React).",
        documents: ["CV / Resume", "Portfolio link"],
        responseAt: "",
      },
      timeline: [
        { stage: "Applied", date: daysAgo(9) },
        { stage: "Under Review", date: daysAgo(7) },
        { stage: "Shortlisted", date: daysAgo(5) },
        { stage: "Interview Scheduled", date: daysAgo(1) },
      ],
      resumeFileName: "Minh_Tran_CV.pdf",
      coverLetter: "",
      answers: {},
    },
    {
      id: "APP-1003",
      jobId: 2,
      appliedDate: daysAgo(30),
      stage: "Hired",
      closed: true,
      timeline: [
        { stage: "Applied", date: daysAgo(30) },
        { stage: "Under Review", date: daysAgo(27) },
        { stage: "Shortlisted", date: daysAgo(23) },
        { stage: "Interview Scheduled", date: daysAgo(18) },
        { stage: "Offer Sent", date: daysAgo(10) },
        { stage: "Hired", date: daysAgo(7) },
      ],
      resumeFileName: "Minh_Tran_CV.pdf",
      coverLetter: "",
      answers: {},
    },
    {
      id: "APP-1004",
      jobId: 9,
      appliedDate: daysAgo(15),
      stage: "Rejected",
      closed: true,
      timeline: [
        { stage: "Applied", date: daysAgo(15) },
        { stage: "Under Review", date: daysAgo(12) },
        { stage: "Rejected", date: daysAgo(6) },
      ],
      resumeFileName: "Minh_Tran_CV.pdf",
      coverLetter: "",
      answers: {},
    },
  ].filter(Boolean);

  store.notifications = [
    { id: "N1", type: "interview", title: "Interview scheduled", message: `Your interview for ${job7 ? job7.title : "the role"} is confirmed.`, date: daysAgo(1), read: false, applicationId: "APP-1002" },
    { id: "N2", type: "status", title: "Application shortlisted", message: `You were shortlisted for ${job7 ? job7.title : "a role"} at ${job7 ? job7.company : ""}.`, date: daysAgo(5), read: false, applicationId: "APP-1002" },
    { id: "N3", type: "offer", title: "Offer sent", message: "Sen Vang Group sent you an offer.", date: daysAgo(10), read: true, applicationId: "APP-1003" },
    { id: "N4", type: "cv_view", title: "Your CV was viewed", message: `${job1 ? job1.company : "A company"} viewed your resume.`, date: daysAgo(2), read: false },
    { id: "N5", type: "confirmation", title: "Application submitted", message: `Your application for ${job1 ? job1.title : "a role"} was received.`, date: daysAgo(2), read: true, applicationId: "APP-1001" },
  ];

  return write(store);
}

export function registerDraft(name, email) {
  const store = getStore();
  store.initialized = true;
  store.auth = { loggedIn: true, emailVerified: false, name, email };
  store.profile.personal.fullName = name;
  return write(store);
}

export function verifyEmail() {
  const store = getStore();
  store.auth.emailVerified = true;
  return write(store);
}

export function login() {
  const store = ensureSeeded();
  store.auth.loggedIn = true;
  store.auth.emailVerified = true;
  return write(store);
}

export function logout() {
  const store = getStore();
  store.auth.loggedIn = false;
  return write(store);
}

export function isLoggedIn() {
  return !!getStore().auth.loggedIn;
}

export function getAuth() {
  return getStore().auth;
}

export function getProfile() {
  const store = ensureSeeded();
  return store.profile;
}

export function saveProfile(patch) {
  const store = getStore();
  store.profile = { ...store.profile, ...patch };
  return write(store).profile;
}

export function getProfileCompleteness() {
  return computeCompleteness(getProfile());
}

// ---- resume --------------------------------------------------------------

export function getResume() {
  const r = getProfile().resume || {};
  return { fileName: "", uploadedAt: "", size: 0, type: "", dataUrl: "", ...r };
}

export function saveResume({ fileName, size, type, dataUrl }) {
  const store = getStore();
  store.profile = {
    ...store.profile,
    resume: {
      fileName: fileName || "",
      size: size || 0,
      type: type || "",
      dataUrl: dataUrl || "",
      uploadedAt: new Date().toISOString().slice(0, 10),
    },
  };
  return write(store).profile.resume;
}

export function removeResume() {
  const store = getStore();
  store.profile = { ...store.profile, resume: { fileName: "", uploadedAt: "", size: 0, type: "", dataUrl: "" } };
  return write(store).profile.resume;
}

export function isSaved(jobId) {
  return ensureSeeded().savedJobs.includes(jobId);
}

export function listSavedJobs() {
  return ensureSeeded().savedJobs;
}

export function toggleSavedJob(jobId) {
  const store = ensureSeeded();
  const has = store.savedJobs.includes(jobId);
  store.savedJobs = has ? store.savedJobs.filter((id) => id !== jobId) : [...store.savedJobs, jobId];
  write(store);
  return !has;
}

export function listApplications() {
  return ensureSeeded().applications.slice().sort((a, b) => (a.appliedDate < b.appliedDate ? 1 : -1));
}

export function getApplication(id) {
  return ensureSeeded().applications.find((a) => a.id === id) || null;
}

export function hasAppliedToJob(jobId) {
  return ensureSeeded().applications.some((a) => a.jobId === jobId);
}

export function addApplication(app) {
  const store = ensureSeeded();
  const id = "APP-" + (2000 + store.applications.length + Math.floor(Math.random() * 100));
  const record = {
    id,
    jobId: app.jobId,
    appliedDate: new Date().toISOString().slice(0, 10),
    stage: "Applied",
    closed: false,
    timeline: [{ stage: "Applied", date: new Date().toISOString().slice(0, 10) }],
    resumeFileName: app.resumeFileName || store.profile.resume.fileName,
    coverLetter: app.coverLetter || "",
    answers: app.answers || {},
  };
  store.applications = [...store.applications, record];
  write(store);
  return record;
}

export function withdrawApplication(id) {
  const store = ensureSeeded();
  const today = new Date().toISOString().slice(0, 10);
  store.applications = store.applications.map((a) =>
    a.id === id
      ? { ...a, stage: "Withdrawn", closed: true, timeline: [...a.timeline, { stage: "Withdrawn", date: today }] }
      : a
  );
  write(store);
  return store.applications.find((a) => a.id === id) || null;
}

// ---- interviews ---------------------------------------------------------

export function listInterviews() {
  return ensureSeeded()
    .applications.filter((a) => a.interview && a.interview.at)
    .slice()
    .sort((a, b) => (a.interview.at < b.interview.at ? -1 : 1));
}

export function getInterviewByApplication(appId) {
  const app = getApplication(appId);
  return app && app.interview ? { ...app.interview, applicationId: app.id, jobId: app.jobId } : null;
}

export function respondToInterview(appId, status, note) {
  const store = ensureSeeded();
  const today = new Date().toISOString().slice(0, 10);
  store.applications = store.applications.map((a) => {
    if (a.id !== appId || !a.interview) return a;
    return { ...a, interview: { ...a.interview, status, responseAt: today, responseNote: note || "" } };
  });
  write(store);
  const app = store.applications.find((a) => a.id === appId);
  const job = app && JOBS.find((j) => j.id === app.jobId);
  addNotification({
    type: "interview",
    title: status === "confirmed" ? "Interview confirmed" : "Interview declined",
    message:
      status === "confirmed"
        ? `You confirmed your interview for ${job ? job.title : "the role"}.`
        : `You declined the interview for ${job ? job.title : "the role"}.`,
    applicationId: appId,
  });
  return app ? app.interview : null;
}

export function listNotifications() {
  return ensureSeeded().notifications.slice().sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function unreadNotificationCount() {
  return ensureSeeded().notifications.filter((n) => !n.read).length;
}

export function markNotificationRead(id) {
  const store = ensureSeeded();
  store.notifications = store.notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
  return write(store).notifications;
}

export function markAllNotificationsRead() {
  const store = ensureSeeded();
  store.notifications = store.notifications.map((n) => ({ ...n, read: true }));
  return write(store).notifications;
}

export function deleteNotification(id) {
  const store = ensureSeeded();
  store.notifications = store.notifications.filter((n) => n.id !== id);
  return write(store).notifications;
}

export function addNotification(n) {
  const store = ensureSeeded();
  const record = { id: "N" + Date.now() + Math.floor(Math.random() * 1000), read: false, date: new Date().toISOString().slice(0, 10), ...n };
  store.notifications = [record, ...store.notifications];
  write(store);
  return record;
}

export function getSettings() {
  return ensureSeeded().settings;
}

export function saveSettings(patch) {
  const store = getStore();
  store.settings = { ...store.settings, ...patch };
  return write(store).settings;
}

export function resetAll() {
  write(emptyStore());
}
