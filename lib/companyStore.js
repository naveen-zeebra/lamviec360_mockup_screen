// Company / Employer workspace store — localStorage backed, mirrors lib/seekerStore.js.
// Everything here is prototype data. No real backend.

const KEY = "lv360-company-store-v1";

export const ROLES = ["Company Admin", "HR / Recruiter", "Viewer"];

export const PIPELINE_STAGES = [
  "Applied",
  "Screening",
  "Shortlisted",
  "Interview Scheduled",
  "Offer Sent",
  "Hired",
  "Rejected",
];

export const JOB_STATUSES = ["Draft", "Published", "Paused", "Closed"];

export const PLANS = [
  { id: "Freemium", name: "Freemium", price: "0 VND", postingLimit: 3, blurb: "For occasional hiring" },
  { id: "Professional", name: "Professional", price: "2,900,000 VND / mo", postingLimit: 25, blurb: "For growing teams" },
  { id: "Enterprise", name: "Enterprise", price: "Custom", postingLimit: Infinity, blurb: "For high-volume hiring" },
];

// RBAC — see Company doc §11
const PERMISSIONS = {
  "Company Admin": ["jobs.manage", "candidates.manage", "candidates.view", "team.manage", "billing.manage", "settings.manage", "overview.view"],
  "HR / Recruiter": ["jobs.manage", "candidates.manage", "candidates.view", "overview.view"],
  Viewer: ["candidates.view", "overview.view"],
};

export function can(role, action) {
  return (PERMISSIONS[role] || []).includes(action);
}

export const ROLE_SUMMARY = {
  "Company Admin": "Full access: company settings, jobs, candidates, interviews, billing and team management.",
  "HR / Recruiter": "Jobs, candidate pipeline, candidate communication and interviews. No billing or team administration.",
  Viewer: "Read-only access. Cannot create jobs, manage candidates or access billing.",
};

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

function emptyStore() {
  return {
    initialized: false,
    auth: { loggedIn: false, name: "", email: "", role: "Company Admin" },
    company: {
      name: "",
      regNumber: "",
      industry: "",
      size: "",
      website: "",
      description: "",
      logo: "",
      verified: false,
      plan: "Freemium",
    },
    quota: { plan: "Freemium", used: 0 },
    jobs: [],
    candidates: [],
    team: [],
    invitations: [],
    notifications: [],
    settings: {
      notifications: { newApplications: true, interviewReminders: true, teamActivity: true, billing: true, marketing: false },
      security: { twoFactor: true },
      pipeline: { autoRejectEmail: true, delayRejectionEmail: false },
    },
  };
}

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}
function write(store) {
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
  } catch (e) {}
  return store;
}

export function getStore() {
  return read() || write(emptyStore());
}

// ---- seed -------------------------------------------------------------------

const SEED_JOBS = [
  {
    id: "JOB-2001",
    title: "Senior Backend Engineer",
    department: "Engineering",
    type: "Full-time",
    location: "Ho Chi Minh City",
    salaryMin: "25000000",
    salaryMax: "40000000",
    negotiable: false,
    jd: "We are looking for a Senior Backend Engineer to design and scale the services behind our hiring platform. You will own core APIs, mentor engineers and drive technical decisions.\n\nResponsibilities:\n- Design, build and operate backend services\n- Improve reliability, performance and observability\n- Review code and mentor mid-level engineers",
    skills: ["Node.js", "PostgreSQL", "AWS", "Microservices"],
    experience: "5",
    education: "Bachelor's Degree",
    deadline: daysAhead(21),
    vacancies: "2",
    documents: ["CV / Resume", "Cover Letter"],
    status: "Published",
    createdAt: daysAgo(6),
    aiGenerated: false,
  },
  {
    id: "JOB-2002",
    title: "Product Designer (UI/UX)",
    department: "Design",
    type: "Full-time",
    location: "Remote — Vietnam",
    salaryMin: "18000000",
    salaryMax: "28000000",
    negotiable: true,
    jd: "Own the end-to-end design of key product areas, from research through polished UI. Partner closely with product and engineering.",
    skills: ["Figma", "Design systems", "Prototyping", "User research"],
    experience: "3",
    education: "Bachelor's Degree",
    deadline: daysAhead(12),
    vacancies: "1",
    documents: ["CV / Resume", "Portfolio"],
    status: "Published",
    createdAt: daysAgo(3),
    aiGenerated: true,
  },
  {
    id: "JOB-2003",
    title: "HR Operations Specialist",
    department: "People",
    type: "Full-time",
    location: "Hanoi",
    salaryMin: "14000000",
    salaryMax: "20000000",
    negotiable: false,
    jd: "Support the full employee lifecycle: onboarding, records, payroll coordination and compliance with Vietnamese labour law.",
    skills: ["Onboarding", "Labour law", "HRIS"],
    experience: "2",
    education: "Bachelor's Degree",
    deadline: daysAhead(30),
    vacancies: "1",
    documents: ["CV / Resume"],
    status: "Draft",
    createdAt: daysAgo(1),
    aiGenerated: false,
  },
  {
    id: "JOB-2004",
    title: "Content Marketing Lead",
    department: "Marketing",
    type: "Full-time",
    location: "Ho Chi Minh City",
    salaryMin: "20000000",
    salaryMax: "30000000",
    negotiable: true,
    jd: "Build and lead our content engine across blog, social and email. Bilingual EN/VI storytelling for an employer audience.",
    skills: ["Content strategy", "SEO", "EN/VI", "Editorial"],
    experience: "4",
    education: "Bachelor's Degree",
    deadline: daysAgo(4),
    vacancies: "1",
    documents: ["CV / Resume", "Portfolio"],
    status: "Closed",
    createdAt: daysAgo(40),
    aiGenerated: false,
  },
];

const FIRST = ["Minh", "Lan", "Huy", "Thao", "Quang", "Nhi", "Duc", "Trang", "Phuc", "Anh", "Khoa", "My"];
const LAST = ["Nguyen", "Tran", "Le", "Pham", "Hoang", "Vu", "Dang", "Bui", "Do", "Ngo"];
const EDU = ["High School", "Associate Degree", "Bachelor's Degree", "Master's Degree"];

function seedCandidates() {
  const out = [];
  let n = 0;
  const perJob = {
    "JOB-2001": ["Applied", "Applied", "Screening", "Shortlisted", "Interview Scheduled", "Offer Sent", "Rejected"],
    "JOB-2002": ["Applied", "Screening", "Screening", "Shortlisted", "Hired", "Rejected"],
    "JOB-2004": ["Applied", "Interview Scheduled", "Hired"],
  };
  Object.entries(perJob).forEach(([jobId, stages]) => {
    stages.forEach((stage, i) => {
      n += 1;
      const name = `${FIRST[(n * 3) % FIRST.length]} ${LAST[(n * 7) % LAST.length]}`;
      out.push({
        id: `CAND-${3000 + n}`,
        jobId,
        name,
        email: `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
        phone: `09${(10000000 + n * 137891).toString().slice(0, 8)}`,
        experienceYears: 1 + ((n * 2) % 9),
        educationLevel: EDU[(n + i) % EDU.length],
        appliedDate: daysAgo(2 + ((n * 3) % 25)),
        stage,
        matchScore: 55 + ((n * 13) % 44),
        resumeFileName: `${name.split(" ")[0]}_CV.pdf`,
        notes:
          i === 3
            ? [{ id: "NOTE-1", text: "Strong portfolio, good communication in the screening call.", author: "Lan Tran", at: daysAgo(3) }]
            : [],
      });
    });
  });
  return out;
}

export function ensureSeeded() {
  const store = getStore();
  if (store.initialized) return store;

  store.initialized = true;
  store.auth = { loggedIn: true, name: "Lan Tran", email: "lan.tran@abctech.vn", role: "Company Admin" };
  store.company = {
    name: "ABC Technologies",
    regNumber: "0312345678",
    industry: "Technology",
    size: "51–200",
    website: "https://abctech.vn",
    description: "A Vietnamese software company building hiring and workforce products for the region.",
    logo: "",
    verified: true,
    plan: "Freemium",
  };
  store.quota = { plan: "Freemium", used: SEED_JOBS.filter((j) => j.status === "Published" || j.status === "Paused").length };
  store.jobs = SEED_JOBS;
  store.candidates = seedCandidates();
  store.team = [
    { id: "TM-1", name: "Lan Tran", email: "lan.tran@abctech.vn", role: "Company Admin", joinDate: daysAgo(240), lastLogin: "Today", status: "Active" },
    { id: "TM-2", name: "Huy Nguyen", email: "huy.nguyen@abctech.vn", role: "HR / Recruiter", joinDate: daysAgo(120), lastLogin: daysAgo(1), status: "Active" },
    { id: "TM-3", name: "Thao Pham", email: "thao.pham@abctech.vn", role: "HR / Recruiter", joinDate: daysAgo(64), lastLogin: daysAgo(3), status: "Active" },
    { id: "TM-4", name: "Quang Le", email: "quang.le@abctech.vn", role: "Viewer", joinDate: daysAgo(20), lastLogin: daysAgo(6), status: "Active" },
    { id: "TM-5", name: "Nhi Vu", email: "nhi.vu@abctech.vn", role: "HR / Recruiter", joinDate: daysAgo(90), lastLogin: daysAgo(30), status: "Inactive" },
  ];
  store.invitations = [
    { id: "INV-1", email: "duc.hoang@abctech.vn", role: "HR / Recruiter", sentDate: daysAgo(2), expiry: daysAhead(5), status: "Pending", message: "Welcome aboard — you'll be helping with engineering hiring." },
    { id: "INV-2", email: "trang.bui@abctech.vn", role: "Viewer", sentDate: daysAgo(9), expiry: daysAgo(2), status: "Expired", message: "" },
  ];
  store.notifications = [
    { id: "CN1", type: "application", title: "New application", message: "A candidate applied to Senior Backend Engineer.", date: daysAgo(0), read: false },
    { id: "CN2", type: "interview", title: "Interview tomorrow", message: "Interview with a shortlisted candidate for Product Designer.", date: daysAgo(1), read: false },
    { id: "CN3", type: "team", title: "Invitation accepted", message: "Quang Le activated their account as Viewer.", date: daysAgo(20), read: true },
    { id: "CN4", type: "quota", title: "Free posting quota", message: "You have used 2 of 3 free job postings.", date: daysAgo(3), read: false },
  ];

  return write(store);
}

// ---- auth -----------------------------------------------------------------

export function login() {
  const store = ensureSeeded();
  store.auth.loggedIn = true;
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
  return ensureSeeded().auth;
}
export function setRole(role) {
  const store = getStore();
  store.auth.role = role;
  return write(store).auth;
}

// ---- company / plan -------------------------------------------------------

export function getCompany() {
  return ensureSeeded().company;
}
export function saveCompany(patch) {
  const store = getStore();
  store.company = { ...store.company, ...patch };
  return write(store).company;
}
export function getPlan() {
  const store = ensureSeeded();
  return PLANS.find((p) => p.id === store.company.plan) || PLANS[0];
}
export function setPlan(planId) {
  const store = getStore();
  store.company.plan = planId;
  store.quota.plan = planId;
  return write(store).company;
}
export function getQuota() {
  const store = ensureSeeded();
  const plan = PLANS.find((p) => p.id === store.company.plan) || PLANS[0];
  const used = store.jobs.filter((j) => j.status === "Published" || j.status === "Paused").length;
  return { plan: plan.id, limit: plan.postingLimit, used, remaining: plan.postingLimit === Infinity ? Infinity : Math.max(0, plan.postingLimit - used) };
}

// ---- jobs ---------------------------------------------------------------

export function listJobs() {
  return ensureSeeded().jobs.slice().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}
export function getJob(id) {
  return ensureSeeded().jobs.find((j) => j.id === id) || null;
}
export function saveJob(job) {
  const store = ensureSeeded();
  if (job.id && store.jobs.some((j) => j.id === job.id)) {
    store.jobs = store.jobs.map((j) => (j.id === job.id ? { ...j, ...job } : j));
    write(store);
    return store.jobs.find((j) => j.id === job.id);
  }
  const id = "JOB-" + (2100 + store.jobs.length + Math.floor(Math.random() * 100));
  const record = { id, status: "Draft", createdAt: new Date().toISOString().slice(0, 10), aiGenerated: false, ...job };
  store.jobs = [record, ...store.jobs];
  write(store);
  return record;
}
export function setJobStatus(id, status) {
  const store = ensureSeeded();
  store.jobs = store.jobs.map((j) => (j.id === id ? { ...j, status } : j));
  return write(store).jobs;
}
export function duplicateJob(id) {
  const store = ensureSeeded();
  const src = store.jobs.find((j) => j.id === id);
  if (!src) return null;
  const copy = { ...src, id: "JOB-" + (2100 + store.jobs.length + Math.floor(Math.random() * 100)), title: src.title + " (Copy)", status: "Draft", createdAt: new Date().toISOString().slice(0, 10) };
  store.jobs = [copy, ...store.jobs];
  write(store);
  return copy;
}

// ---- candidates -------------------------------------------------------

export function listCandidates() {
  return ensureSeeded().candidates.slice();
}
export function getCandidate(id) {
  return ensureSeeded().candidates.find((c) => c.id === id) || null;
}
export function setCandidateStage(id, stage) {
  const store = ensureSeeded();
  store.candidates = store.candidates.map((c) => (c.id === id ? { ...c, stage } : c));
  return write(store).candidates;
}
export function bulkSetCandidateStage(ids, stage) {
  const store = ensureSeeded();
  store.candidates = store.candidates.map((c) => (ids.includes(c.id) ? { ...c, stage } : c));
  return write(store).candidates;
}
export function addCandidateNote(id, text, author) {
  const store = ensureSeeded();
  store.candidates = store.candidates.map((c) =>
    c.id === id ? { ...c, notes: [...c.notes, { id: "NOTE-" + Date.now(), text, author, at: new Date().toISOString().slice(0, 10) }] } : c
  );
  return write(store).candidates.find((c) => c.id === id);
}

// ---- team / invitations --------------------------------------------

export function listTeam() {
  return ensureSeeded().team.slice();
}
export function updateMemberRole(id, role) {
  const store = ensureSeeded();
  store.team = store.team.map((m) => (m.id === id ? { ...m, role } : m));
  return write(store).team;
}
export function revokeMember(id) {
  const store = ensureSeeded();
  store.team = store.team.map((m) => (m.id === id ? { ...m, status: "Inactive" } : m));
  return write(store).team;
}
export function reactivateMember(id) {
  const store = ensureSeeded();
  store.team = store.team.map((m) => (m.id === id ? { ...m, status: "Active" } : m));
  return write(store).team;
}
export function listInvitations() {
  return ensureSeeded().invitations.slice();
}
export function addInvitation({ email, role, message }) {
  const store = ensureSeeded();
  const record = {
    id: "INV-" + Date.now(),
    email,
    role,
    message: message || "",
    sentDate: new Date().toISOString().slice(0, 10),
    expiry: daysAhead(7),
    status: "Pending",
  };
  store.invitations = [record, ...store.invitations];
  write(store);
  return record;
}
export function resendInvitation(id) {
  const store = ensureSeeded();
  store.invitations = store.invitations.map((i) =>
    i.id === id ? { ...i, sentDate: new Date().toISOString().slice(0, 10), expiry: daysAhead(7), status: "Pending" } : i
  );
  return write(store).invitations;
}
export function revokeInvitation(id) {
  const store = ensureSeeded();
  store.invitations = store.invitations.map((i) => (i.id === id ? { ...i, status: "Revoked" } : i));
  return write(store).invitations;
}

// ---- notifications --------------------------------------------------

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

// ---- settings -----------------------------------------------------

export function getSettings() {
  return ensureSeeded().settings;
}
export function saveSettings(patch) {
  const store = getStore();
  store.settings = { ...store.settings, ...patch };
  return write(store).settings;
}

// ---- dashboard rollups ------------------------------------------

export function getDashboard() {
  const store = ensureSeeded();
  const activeJobs = store.jobs.filter((j) => j.status === "Published").length;
  const quota = getQuota();
  const applications = store.candidates.length;
  const interviewsThisWeek = store.candidates.filter((c) => c.stage === "Interview Scheduled").length;
  const filledMtd = store.candidates.filter((c) => c.stage === "Hired").length;
  return { activeJobs, quota, applications, interviewsThisWeek, filledMtd, plan: getPlan() };
}

export function resetAll() {
  write(emptyStore());
}
