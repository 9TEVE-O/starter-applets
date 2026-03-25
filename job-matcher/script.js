/**
 * Job Matcher – script.js
 *
 * CV profile for Steve is defined in CV_PROFILE below.
 * To update keywords, click "Edit Keywords" in the UI, or edit
 * the `keywords` array in CV_PROFILE directly.
 *
 * Data sources:
 *   - "demo"   → bundled realistic mock listings (no API key needed)
 *   - "adzuna" → live Adzuna API (free key from https://developer.adzuna.com/)
 */

// ─── CV Profile ────────────────────────────────────────────────────────────
const CV_PROFILE = {
  name: "Steve",
  location: "Palmerston / Darwin, NT, Australia",
  targetRoles: [
    "Senior Ranger",
    "Events Manager",
    "Operations Manager",
    "Community Safety Officer",
    "Compliance Officer",
    "Ranger",
    "Festival Manager",
    "Emergency Response",
  ],
  keywords: [
    "ranger",
    "events manager",
    "operations manager",
    "compliance",
    "enforcement",
    "by-law",
    "bylaw",
    "OH&S",
    "WHS",
    "health and safety",
    "risk management",
    "emergency response",
    "stakeholder engagement",
    "community programs",
    "festival",
    "event management",
    "audio production",
    "live sound",
    "regulatory",
    "community safety",
    "local government",
    "council",
    "senior ranger",
    "parks",
    "patrol",
    "incident management",
    "crowd management",
    "sustainability",
    "NT",
    "Northern Territory",
    "Darwin",
    "Palmerston",
  ],
  targetSalaryAUD: 90000,
};

// ─── Mock / Demo Data ───────────────────────────────────────────────────────
const MOCK_JOBS = [
  {
    id: "mock-1",
    title: "Senior Ranger",
    company: "City of Darwin",
    location: "Darwin, NT",
    salary: "$88,000 – $95,000",
    description:
      "Senior Ranger responsible for by-law enforcement, community safety patrols, stakeholder engagement, and emergency response coordination across Darwin's CBD and parks.",
    url: "https://www.darwin.nt.gov.au/careers",
    source: "City of Darwin",
  },
  {
    id: "mock-2",
    title: "Events & Operations Manager",
    company: "Northern Territory Major Events Company",
    location: "Darwin, NT",
    salary: "$92,000 – $105,000",
    description:
      "Manage large-scale events (up to 20,000 attendees), including festival management, OH&S compliance, audio production oversight, risk management, and contractor management.",
    url: "https://www.ntmec.com.au/careers",
    source: "NTMEC",
  },
  {
    id: "mock-3",
    title: "Compliance Officer – Local Government",
    company: "Palmerston City Council",
    location: "Palmerston, NT",
    salary: "$85,000 – $91,000",
    description:
      "Regulatory enforcement, by-law compliance, community programs delivery, and operational reporting for Palmerston City Council.",
    url: "https://www.palmerston.nt.gov.au/careers",
    source: "Palmerston City Council",
  },
  {
    id: "mock-4",
    title: "Community Safety Officer",
    company: "NT Government – Department of Infrastructure",
    location: "Darwin, NT (Hybrid)",
    salary: "$90,000",
    description:
      "Community safety initiatives, incident management, stakeholder engagement, and coordination of emergency response activities across Northern Territory communities.",
    url: "https://jobs.nt.gov.au",
    source: "NT Government Jobs",
  },
  {
    id: "mock-5",
    title: "Events Manager – Festival Programs",
    company: "Darwin Festival",
    location: "Darwin, NT",
    salary: "$85,000 – $95,000",
    description:
      "End-to-end event and festival management role, including live sound and audio production, crowd management, WHS planning, and community engagement for Darwin's premier arts festival.",
    url: "https://www.darwinfestival.org.au/jobs",
    source: "Darwin Festival",
  },
  {
    id: "mock-6",
    title: "Operations Manager – Parks & Recreation",
    company: "Territory Land Corporation",
    location: "Darwin, NT",
    salary: "$95,000 – $110,000",
    description:
      "Oversee parks operations, ranger teams, compliance and enforcement programs, risk management frameworks, and stakeholder liaison with NT Government agencies.",
    url: "https://jobs.nt.gov.au",
    source: "NT Government Jobs",
  },
  {
    id: "mock-7",
    title: "Senior Ranger – National Park",
    company: "Parks Australia",
    location: "NT (Remote/Regional)",
    salary: "$82,000 – $93,000",
    description:
      "Senior Ranger for Kakadu National Park region. Responsibilities include patrol operations, emergency response, regulatory enforcement, and community education programs.",
    url: "https://www.parksaustralia.gov.au/careers",
    source: "Parks Australia",
  },
  {
    id: "mock-8",
    title: "Emergency Management Coordinator",
    company: "NT Emergency Services",
    location: "Darwin, NT",
    salary: "$88,000 – $98,000",
    description:
      "Coordinate emergency response operations, WHS frameworks, incident reporting, and stakeholder engagement for NT Emergency Services across the greater Darwin region.",
    url: "https://jobs.nt.gov.au",
    source: "NT Government Jobs",
  },
  {
    id: "mock-9",
    title: "Events Coordinator – Remote",
    company: "Live Nation Australia",
    location: "Remote (NT/QLD)",
    salary: "$75,000 – $85,000",
    description:
      "Event coordination for regional Australia, including logistics, audio production, OH&S compliance, crowd management and on-site operations.",
    url: "https://www.livenation.com.au/careers",
    source: "Live Nation",
  },
  {
    id: "mock-10",
    title: "Ranger / Compliance Officer",
    company: "Litchfield Council",
    location: "Batchelor, NT",
    salary: "$80,000 – $88,000",
    description:
      "By-law enforcement, community safety patrols, local government compliance, and community programs across the Litchfield Council area.",
    url: "https://www.litchfield.nt.gov.au/council/employment",
    source: "Litchfield Council",
  },
];

// ─── Scoring Engine ─────────────────────────────────────────────────────────
function scoreJob(job, keywords) {
  const haystack =
    `${job.title} ${job.company} ${job.location} ${job.description}`.toLowerCase();

  const matched = keywords.filter((kw) =>
    haystack.includes(kw.toLowerCase())
  );

  // Weighted: title matches count double
  const titleLower = job.title.toLowerCase();
  const titleMatches = keywords.filter((kw) =>
    titleLower.includes(kw.toLowerCase())
  );

  const rawScore =
    (matched.length + titleMatches.length) /
    keywords.length || 0;

  const pct = Math.min(100, Math.round(rawScore * 100 * 1.4)); // scale for readability
  return { score: pct, matchedKeywords: matched };
}

// ─── Adzuna Fetch ───────────────────────────────────────────────────────────
async function fetchAdzuna(appId, appKey, query, location) {
  // Adzuna AU country code: "au"
  const params = new URLSearchParams({
    app_id: appId,
    app_key: appKey,
    results_per_page: 20,
    what: query,
    where: location,
  });

  const url = `https://api.adzuna.com/v1/api/jobs/au/search/1?${params}`;

  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Adzuna API error: ${res.status} ${res.statusText}`);

  const data = await res.json();

  return (data.results || []).map((r) => ({
    id: r.id,
    title: r.title,
    company: r.company?.display_name || "Unknown",
    location: r.location?.display_name || "",
    salary:
      r.salary_min && r.salary_max
        ? `$${Math.round(r.salary_min).toLocaleString()} – $${Math.round(r.salary_max).toLocaleString()}`
        : r.salary_min
        ? `From $${Math.round(r.salary_min).toLocaleString()}`
        : null,
    description: r.description || "",
    url: r.redirect_url || "#",
    source: "Adzuna",
  }));
}

// ─── HTML Helpers ────────────────────────────────────────────────────────────
function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function safeUrl(url) {
  try {
    const u = new URL(url);
    if (u.protocol === "https:" || u.protocol === "http:") return esc(url);
  } catch (_) { /* fall through */ }
  return "#";
}

// ─── Render Helpers ──────────────────────────────────────────────────────────
function scoreClass(pct) {
  if (pct >= 60) return "score-high";
  if (pct >= 35) return "score-mid";
  return "score-low";
}

function renderCard(job, score, matchedKeywords) {
  const tagHtml = matchedKeywords
    .slice(0, 8)
    .map((k) => `<span class="match-tag">${esc(k)}</span>`)
    .join("");

  const salaryHtml = job.salary
    ? `<span class="job-salary">💰 ${esc(job.salary)}</span>`
    : "";

  return `
    <div class="result-card">
      <div class="card-main">
        <div class="job-title">
          <a href="${safeUrl(job.url)}" target="_blank" rel="noopener">${esc(job.title)}</a>
        </div>
        <div class="job-meta">
          <span>🏢 ${esc(job.company)}</span>
          <span>📍 ${esc(job.location)}</span>
          ${salaryHtml}
          <span style="color:var(--muted)">via ${esc(job.source)}</span>
        </div>
        <div class="match-tags">${tagHtml || '<span style="color:var(--muted);font-size:11px">no keyword matches</span>'}</div>
      </div>
      <div class="card-score">
        <div class="score-badge ${scoreClass(score)}">
          ${score}%<small>match</small>
        </div>
      </div>
    </div>`;
}

// ─── State ───────────────────────────────────────────────────────────────────
let currentResults = [];
let sortKey = "score";
let keywords = [...CV_PROFILE.keywords];

// ─── DOM ──────────────────────────────────────────────────────────────────────
const keywordTagsEl = document.getElementById("keyword-tags");
const keywordInput = document.getElementById("keyword-input");
const keywordEditor = document.getElementById("keyword-editor");
const editBtn = document.getElementById("edit-keywords-btn");
const saveBtn = document.getElementById("save-keywords-btn");
const apiSource = document.getElementById("api-source");
const adzunaFields = document.getElementById("adzuna-fields");
const searchBtn = document.getElementById("search-btn");
const resultsContainer = document.getElementById("results-container");
const resultCount = document.getElementById("result-count");
const sortBar = document.getElementById("sort-bar");

function renderKeywordTags() {
  keywordTagsEl.innerHTML = keywords
    .map((k) => `<span class="tag">${esc(k)}</span>`)
    .join("");
}

function renderResults() {
  if (!currentResults.length) {
    resultsContainer.innerHTML = '<p class="placeholder">No results match the current filter.</p>';
    sortBar.classList.add("hidden");
    resultCount.textContent = "";
    return;
  }

  const sorted = [...currentResults].sort((a, b) => {
    if (sortKey === "score") return b.score - a.score;
    if (sortKey === "title") return a.job.title.localeCompare(b.job.title);
    if (sortKey === "salary") {
      const salA = a.job.salary ? parseInt(a.job.salary.replace(/[^0-9].*/, ""), 10) : 0;
      const salB = b.job.salary ? parseInt(b.job.salary.replace(/[^0-9].*/, ""), 10) : 0;
      return salB - salA;
    }
    return 0;
  });

  sortBar.classList.remove("hidden");
  resultCount.textContent = `(${sorted.length} found)`;
  resultsContainer.innerHTML = sorted
    .map(({ job, score, matchedKeywords }) => renderCard(job, score, matchedKeywords))
    .join("");
}

// ─── Event Listeners ─────────────────────────────────────────────────────────
editBtn.addEventListener("click", () => {
  keywordInput.value = keywords.join(", ");
  keywordEditor.classList.toggle("hidden");
});

saveBtn.addEventListener("click", () => {
  keywords = keywordInput.value
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
  renderKeywordTags();
  keywordEditor.classList.add("hidden");
  // Re-score existing results with new keywords
  if (currentResults.length) {
    currentResults = currentResults.map(({ job }) => {
      const { score, matchedKeywords } = scoreJob(job, keywords);
      return { job, score, matchedKeywords };
    });
    renderResults();
  }
});

apiSource.addEventListener("change", () => {
  adzunaFields.style.display = apiSource.value === "adzuna" ? "" : "none";
});

document.querySelectorAll(".sort-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".sort-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    sortKey = btn.dataset.sort;
    renderResults();
  });
});

searchBtn.addEventListener("click", async () => {
  const source = apiSource.value;
  const query = document.getElementById("search-query").value.trim();
  const location = document.getElementById("search-location").value.trim();
  const minScore = parseInt(document.getElementById("min-score").value, 10) || 0;

  searchBtn.disabled = true;
  resultsContainer.innerHTML = '<div class="spinner"></div>';
  sortBar.classList.add("hidden");
  resultCount.textContent = "";

  try {
    let jobs = [];

    if (source === "demo") {
      // Simulate a short network delay for realism
      await new Promise((r) => setTimeout(r, 600));

      // Filter mock jobs by query/location keywords if provided
      const qLower = query.toLowerCase();
      const lLower = location.toLowerCase();
      jobs = MOCK_JOBS.filter((j) => {
        const text = `${j.title} ${j.description} ${j.location}`.toLowerCase();
        const matchesQuery = qLower.split(" ").some((w) => w && text.includes(w));
        const matchesLoc =
          !lLower ||
          j.location.toLowerCase().includes(lLower.split(" ")[0]) ||
          j.location.toLowerCase().includes("nt") ||
          j.location.toLowerCase().includes("remote");
        return matchesQuery || matchesLoc;
      });
    } else if (source === "adzuna") {
      const appId = document.getElementById("adzuna-app-id").value.trim();
      const appKey = document.getElementById("adzuna-app-key").value.trim();
      if (!appId || !appKey) throw new Error("Please enter your Adzuna App ID and App Key.");
      jobs = await fetchAdzuna(appId, appKey, query, location);
    }

    // Score all jobs and filter by minScore
    currentResults = jobs
      .map((job) => {
        const { score, matchedKeywords } = scoreJob(job, keywords);
        return { job, score, matchedKeywords };
      })
      .filter(({ score }) => score >= minScore);

    renderResults();
  } catch (err) {
    resultsContainer.innerHTML = `<div class="error-msg">Error: ${esc(err.message)}</div>`;
    resultCount.textContent = "";
  } finally {
    searchBtn.disabled = false;
  }
});

// ─── Init ─────────────────────────────────────────────────────────────────────
renderKeywordTags();