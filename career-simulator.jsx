import React, { useState, useRef, useEffect, useMemo } from "react";

// ============================================================
// THEME — light + dark tokens
// ============================================================
const LIGHT = {
  bg: "#F6F5F1",
  bgAlt: "#EFEDE6",
  panel: "#FFFFFF",
  panelAlt: "#FBFAF6",
  ink: "#141519",
  sub: "#6B7280",
  faint: "#9CA3AF",
  line: "#E5E1D8",
  lineStrong: "#D6D1C4",
  brand: "#4B3AF7",       // deep indigo
  brandSoft: "#E8E5FF",
  brandInk: "#2E22B5",
  accent: "#F97066",      // coral
  accentSoft: "#FFE4E1",
  amber: "#D97706",
  amberSoft: "#FEF3C7",
  green: "#059669",
  greenSoft: "#D1FAE5",
  red: "#DC2626",
  redSoft: "#FEE2E2",
};

const DARK = {
  bg: "#0B0C10",
  bgAlt: "#0F1117",
  panel: "#161821",
  panelAlt: "#1C1F2A",
  ink: "#F5F5F1",
  sub: "#9CA3AF",
  faint: "#6B7280",
  line: "#262A36",
  lineStrong: "#333846",
  brand: "#8B7CFF",
  brandSoft: "#221F45",
  brandInk: "#C9C2FF",
  accent: "#FB8A80",
  accentSoft: "#3A1E1B",
  amber: "#FBBF24",
  amberSoft: "#3B2A0E",
  green: "#34D399",
  greenSoft: "#0B2E22",
  red: "#F87171",
  redSoft: "#3A1414",
};

const FONTS = {
  mono: "'JetBrains Mono', 'IBM Plex Mono', 'SFMono-Regular', Consolas, monospace",
  display: "'Instrument Serif', 'Fraunces', Georgia, serif",
  sans: "'Inter', system-ui, -apple-system, sans-serif",
};

// ============================================================
// CAREER LIBRARY (grouped, simple descriptions)
// ============================================================
const CAREERS = [
  // Business & money
  { id: "ib", label: "Investment Banker", group: "Business & Money", plain: "Helps big companies buy other companies. Long hours, high pay, lots of spreadsheets.", tag: "M&A analyst at a bulge bracket bank" },
  { id: "consult", label: "Management Consultant", group: "Business & Money", plain: "Companies hire you to solve their biggest problems. Lots of travel, slide decks, meetings.", tag: "MBB firm, client on-site" },
  { id: "quant", label: "Quant Trader", group: "Business & Money", plain: "Uses math and code to trade stocks and make (or lose) money fast.", tag: "prop desk, systematic strategies" },
  { id: "founder", label: "Startup Founder", group: "Business & Money", plain: "Starts a company from scratch. High risk, high freedom, mostly chaos.", tag: "early-stage founder, pre-revenue" },
  { id: "pm", label: "Product Manager", group: "Business & Money", plain: "Decides what an app or product should do next. Talks to everyone all day.", tag: "B2C app, growth stage" },
  { id: "marketing", label: "Brand Marketer", group: "Business & Money", plain: "Builds how people feel about a brand. Half creative, half data.", tag: "D2C brand, performance + creative" },

  // Tech & science
  { id: "swe", label: "Software Engineer", group: "Tech & Science", plain: "Writes code to build apps, websites, or systems. Deep focus work.", tag: "product team at a scale-up" },
  { id: "ml", label: "AI / ML Engineer", group: "Tech & Science", plain: "Trains computers to learn from data — like the systems behind ChatGPT.", tag: "applied ML at a tech company" },
  { id: "designer", label: "Product Designer", group: "Tech & Science", plain: "Designs how apps look and feel. Sketches, prototypes, and lots of feedback.", tag: "UX/UI at a product startup" },
  { id: "econ", label: "Economist", group: "Tech & Science", plain: "Studies how money, jobs, and markets work at the country level.", tag: "central bank / policy research" },

  // Impact & people
  { id: "doctor", label: "Doctor", group: "People & Impact", plain: "Diagnoses and treats patients. Years of training, high stakes, real lives.", tag: "hospital medicine, residency" },
  { id: "law", label: "Corporate Lawyer", group: "People & Impact", plain: "Writes and negotiates contracts for big deals. Detail-obsessed and deadline-driven.", tag: "M&A practice, big firm" },
  { id: "teacher", label: "Teacher", group: "People & Impact", plain: "Explains hard ideas so 30 kids get them. Endless energy required.", tag: "high school teacher, public school" },
  { id: "journalist", label: "Journalist", group: "People & Impact", plain: "Digs up stories that matter. Interviews, writing, tight deadlines.", tag: "news reporter at a major outlet" },

  // Creative
  { id: "director", label: "Film Director", group: "Creative", plain: "Turns a script into a movie. Leads a huge team through months of chaos.", tag: "narrative feature, mid-budget" },
  { id: "architect", label: "Architect", group: "Creative", plain: "Designs buildings people will live and work in for decades.", tag: "design firm, urban projects" },
  { id: "chef", label: "Chef", group: "Creative", plain: "Runs a professional kitchen. Physical, precise, and unforgiving.", tag: "head chef, fine dining" },
];

const CAREER_GROUPS = ["Business & Money", "Tech & Science", "People & Impact", "Creative"];

// ============================================================
// QUIZZES — 4 assessments, each tags answers with dimensions
// ============================================================

// INTERESTS — simplified Holland RIASEC-style
const INTERESTS_QUIZ = {
  key: "interests",
  title: "What actually interests you?",
  subtitle: "12 quick questions. No wrong answers.",
  scale: ["Not me at all", "Kinda not me", "Neutral", "Kinda me", "Very me"],
  dimensions: {
    analytical: "Analytical",
    creative: "Creative",
    social: "Social",
    practical: "Practical / Building",
    entrepreneurial: "Entrepreneurial",
    investigative: "Investigative",
  },
  items: [
    { q: "I like breaking down messy problems into logical steps.", tags: { analytical: 2, investigative: 1 } },
    { q: "I get lost in drawing, writing, or making things look good.", tags: { creative: 2 } },
    { q: "I feel energized after a long conversation with someone new.", tags: { social: 2 } },
    { q: "I'd rather build something with my hands than just talk about it.", tags: { practical: 2 } },
    { q: "I've thought about starting my own thing — a business, a club, a channel.", tags: { entrepreneurial: 2 } },
    { q: "I ask 'but why?' a lot, even when people are tired of it.", tags: { investigative: 2, analytical: 1 } },
    { q: "Numbers, patterns, and puzzles genuinely excite me.", tags: { analytical: 2 } },
    { q: "I care a lot about helping people — even strangers.", tags: { social: 2 } },
    { q: "I'd pick a hands-on project over a research paper every time.", tags: { practical: 2 } },
    { q: "I like being in charge and convincing people to try my ideas.", tags: { entrepreneurial: 2, social: 1 } },
    { q: "I lose track of time when I'm making art, music, or writing.", tags: { creative: 2 } },
    { q: "I want to understand how something works, not just use it.", tags: { investigative: 2 } },
  ],
};

// STRENGTHS — pick your top skills
const STRENGTHS_QUIZ = {
  key: "strengths",
  title: "What are you actually good at?",
  subtitle: "Rate yourself honestly. This isn't a school report.",
  scale: ["Not a strength", "Below average", "Okay", "Strong", "Really strong"],
  dimensions: {
    logic: "Logic & math",
    writing: "Writing & words",
    speaking: "Speaking & persuading",
    creativity: "Creativity",
    focus: "Focus & discipline",
    leadership: "Leading others",
    empathy: "Reading people",
    hands: "Hands-on skill",
  },
  items: [
    { q: "Solving hard math or logic problems.", tags: { logic: 2 } },
    { q: "Writing something so clearly a stranger gets it in one read.", tags: { writing: 2 } },
    { q: "Talking in front of a room without freezing.", tags: { speaking: 2 } },
    { q: "Coming up with ideas nobody else thought of.", tags: { creativity: 2 } },
    { q: "Sitting with one hard task for hours without giving up.", tags: { focus: 2 } },
    { q: "Getting a group to actually finish a project.", tags: { leadership: 2 } },
    { q: "Noticing when a friend is upset before they say anything.", tags: { empathy: 2 } },
    { q: "Fixing, building, or making something physical work.", tags: { hands: 2 } },
    { q: "Spotting the flaw in someone's argument.", tags: { logic: 1, writing: 1 } },
    { q: "Convincing someone to change their mind.", tags: { speaking: 2 } },
  ],
};

// WEAKNESSES — the flip side, self-awareness
const WEAKNESSES_QUIZ = {
  key: "weaknesses",
  title: "Where do you struggle?",
  subtitle: "Being honest here makes the report way more useful.",
  scale: ["Never a problem", "Rarely", "Sometimes", "Often", "Constant issue"],
  dimensions: {
    procrastination: "Procrastination",
    focus: "Losing focus",
    conflict: "Avoiding conflict",
    boredom: "Getting bored fast",
    perfectionism: "Perfectionism",
    detail: "Missing details",
    social: "Social energy drain",
  },
  items: [
    { q: "I put off tasks until the last possible minute.", tags: { procrastination: 2 } },
    { q: "I open a book, then I'm on my phone 10 minutes later.", tags: { focus: 2 } },
    { q: "I avoid saying what I think if it might upset someone.", tags: { conflict: 2 } },
    { q: "I quit projects when they get boring, even if they matter.", tags: { boredom: 2 } },
    { q: "I redo work until it's 'perfect' and miss deadlines.", tags: { perfectionism: 2 } },
    { q: "I skim the fine print and later realize I missed something.", tags: { detail: 2 } },
    { q: "Being around people all day exhausts me.", tags: { social: 2 } },
    { q: "I need someone else to keep me on track.", tags: { focus: 1, procrastination: 1 } },
  ],
};

// VALUES — what actually matters to you
const VALUES_QUIZ = {
  key: "values",
  title: "What do you actually want out of work?",
  subtitle: "Pick what matters MOST to you — not what sounds good.",
  scale: ["Doesn't matter", "Slightly matters", "Matters some", "Matters a lot", "Non-negotiable"],
  dimensions: {
    money: "Money",
    impact: "Impact on world",
    freedom: "Freedom & autonomy",
    prestige: "Prestige & status",
    stability: "Stability & safety",
    growth: "Learning & growth",
    balance: "Work-life balance",
    creativity: "Creative expression",
  },
  items: [
    { q: "Earning a lot — enough to buy what I want without thinking.", tags: { money: 2 } },
    { q: "Actually helping people or the planet in a real way.", tags: { impact: 2 } },
    { q: "Setting my own schedule and being my own boss.", tags: { freedom: 2 } },
    { q: "Working somewhere people recognize the name.", tags: { prestige: 2 } },
    { q: "Knowing my paycheck will show up every month, no surprises.", tags: { stability: 2 } },
    { q: "Learning something new almost every week.", tags: { growth: 2 } },
    { q: "Being home for dinner, weekends off, real vacations.", tags: { balance: 2 } },
    { q: "Making things — writing, designing, building — that are mine.", tags: { creativity: 2 } },
  ],
};

// WORK STYLE — how you work best
const WORKSTYLE_QUIZ = {
  key: "workstyle",
  title: "How do you work best?",
  subtitle: "Pick the option that feels more like you.",
  binary: true,
  items: [
    { q: "You'd rather work…", opts: [{ label: "Alone, deep focus", tag: "solo" }, { label: "In a team, bouncing ideas", tag: "team" }] },
    { q: "You'd rather have…", opts: [{ label: "A clear plan for the day", tag: "structured" }, { label: "Freedom to figure it out", tag: "flexible" }] },
    { q: "You care more about…", opts: [{ label: "The big picture", tag: "bigpicture" }, { label: "Getting every detail right", tag: "detail" }] },
    { q: "You'd rather…", opts: [{ label: "Move fast, ship, iterate", tag: "fast" }, { label: "Go slow, get it right", tag: "careful" }] },
    { q: "Risk-wise, you're more…", opts: [{ label: "Bet big, could lose", tag: "risk" }, { label: "Steady, safe wins", tag: "safe" }] },
    { q: "You'd rather learn by…", opts: [{ label: "Reading and studying first", tag: "theory" }, { label: "Just doing it and failing", tag: "doing" }] },
    { q: "You lead by…", opts: [{ label: "Being the loudest voice", tag: "front" }, { label: "Making others look good", tag: "back" }] },
    { q: "You'd rather…", opts: [{ label: "One deep obsession", tag: "specialist" }, { label: "Many things at once", tag: "generalist" }] },
  ],
};

const QUIZZES = [INTERESTS_QUIZ, STRENGTHS_QUIZ, WEAKNESSES_QUIZ, VALUES_QUIZ, WORKSTYLE_QUIZ];

// ============================================================
// LLM CALLS
// ============================================================
async function askClaude(messages, system, maxTokens = 1200) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: maxTokens,
      system,
      messages,
    }),
  });
  const data = await res.json();
  const text = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("\n");
  const clean = text.replace(/```json|```/g, "").trim();
  const start = clean.indexOf("{");
  const end = clean.lastIndexOf("}");
  return JSON.parse(clean.slice(start, end + 1));
}

const SIM_SYSTEM = `You run realistic career day simulations for a curious high school student (around Grade 10) in India who has NOT yet chosen a career path. You simulate ONE representative working day in a given career, in second-person present tense ("You're at your desk when…").

CRITICAL RULES ON LANGUAGE:
- Assume ZERO prior industry knowledge. The student is 15-16 and has never worked a real job.
- If you use ANY technical term, acronym, or piece of jargon, IMMEDIATELY explain it in plain words in parentheses. Example: "The MD (Managing Director — the senior boss) wants a DCF (a spreadsheet that estimates what a company is really worth) by 6pm."
- Prefer simple words. Instead of "stakeholder" say "person who cares"; instead of "leverage" say "use"; instead of "iterate" say "keep trying different versions".
- Never assume they know finance/tech/medicine/law lingo. Explain everything.

WHAT TO SIMULATE:
- Show the REAL feel of the job: the boring parts, the politics, the pressure, the small wins.
- Each turn: give a clock time, describe the situation (2-3 short vivid sentences), then a decision with 3 real tradeoff options. No obvious right answer.
- Reference the user's earlier choices. Bad calls have consequences later in the day.
- The day spans ~6 decisions from morning to evening, then wrap.

Respond ONLY with raw JSON, no markdown:
{"time":"9:15 AM","scene":"...","choices":["...","...","..."],"stat":{"label":"short status e.g. 'Boss is waiting'","tone":"neutral|good|bad"},"done":false}
When ~6 decisions have passed, set done:true, choices:[], and make scene the closing beat of the day.`;

const VERDICT_SYSTEM = `You are a blunt, insightful career coach analyzing how a Grade 10 student behaved during a simulated day at a specific career. Based on their profile, quiz results, and every choice they made, produce a fit report. Be honest — if it's a bad fit, say so and why. No flattery, but be encouraging about what DID work.

Use simple, warm language. Avoid jargon.

Respond ONLY with raw JSON:
{"score":72,"headline":"one punchy sentence verdict","energized":["...","..."],"drained":["...","..."],"reality":"2-3 sentences of blunt reality about this career they should know (hours, real path, what actually gets people ahead in India + globally)","fitFor":"one sentence describing the kind of person this job IS right for"}`;

const COMPARE_SYSTEM = `You are a career coach. The student has simulated multiple careers AND completed personality/interest/values quizzes. Compare all their data and tell them which career actually fits them best.

Respond ONLY with raw JSON:
{"winner":"career name","ranking":[{"career":"...","score":72,"oneLiner":"..."}],"reasoning":"3-4 sentences on why the winner fits, referencing specific behavior AND quiz results","nextStep":"one concrete thing to do in the next 6 months to test this in real life"}`;

const REPORT_SYSTEM = `You are a career coach writing a comprehensive Career Compass Report for a Grade 10 student in India. You have their full profile: interests, strengths, weaknesses, values, work style, and any career simulations they've completed.

Write in warm, direct, jargon-free language a 15-year-old will understand. Be specific and actionable.

Respond ONLY with raw JSON:
{
  "headline": "one-sentence summary of who this student is (as a future worker)",
  "profile": "3-4 sentence portrait of their personality and how they work best",
  "topFields": [{"field":"e.g. Finance & Strategy","fit":85,"why":"one sentence"}, ...],
  "topCareers": [{"career":"specific job title","fit":88,"why":"one sentence using their actual quiz results"}, ...],
  "avoid": [{"career":"specific job title","why":"one sentence"}, ...],
  "superpowers": ["short phrase", "short phrase", "short phrase"],
  "watchouts": ["short phrase", "short phrase"],
  "sixMonthPlan": ["specific thing to try", "specific thing to try", "specific thing to try"]
}
Include 3-5 topFields, 4-6 topCareers, 2-3 avoid, 3 superpowers, 2-3 watchouts, 3 plan items.`;

// ============================================================
// STORAGE HELPERS
// ============================================================
const store = {
  get(k, fallback) {
    try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
  },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

// ============================================================
// UI PRIMITIVES
// ============================================================
function useT() {
  const [dark, setDark] = useState(() => store.get("cc_dark", false));
  useEffect(() => { store.set("cc_dark", dark); }, [dark]);
  const T = dark ? DARK : LIGHT;
  return { T, dark, setDark };
}

function Badge({ children, tone = "neutral", T }) {
  const tones = {
    neutral: { bg: T.bgAlt, fg: T.sub },
    good: { bg: T.greenSoft, fg: T.green },
    bad: { bg: T.redSoft, fg: T.red },
    warn: { bg: T.amberSoft, fg: T.amber },
    brand: { bg: T.brandSoft, fg: T.brandInk },
    accent: { bg: T.accentSoft, fg: T.accent },
  }[tone];
  return (
    <span style={{
      background: tones.bg, color: tones.fg, fontFamily: FONTS.mono, fontSize: 11,
      padding: "3px 8px", borderRadius: 4, letterSpacing: 0.3, fontWeight: 500,
      display: "inline-block", whiteSpace: "nowrap",
    }}>{children}</span>
  );
}

function Btn({ children, onClick, kind = "primary", disabled, style, T, size = "md" }) {
  const sizes = {
    sm: { padding: "8px 14px", fontSize: 13 },
    md: { padding: "12px 20px", fontSize: 14 },
    lg: { padding: "16px 26px", fontSize: 15 },
  };
  const base = {
    fontFamily: FONTS.sans, fontWeight: 600, ...sizes[size],
    borderRadius: 10, border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    transition: "transform .08s ease, background .2s ease, box-shadow .2s ease",
    display: "inline-flex", alignItems: "center", gap: 8, whiteSpace: "nowrap",
    ...style,
  };
  const kinds = {
    primary: { background: T.brand, color: "#fff", boxShadow: `0 1px 0 rgba(0,0,0,.06)` },
    ghost: { background: "transparent", color: T.ink, border: `1px solid ${T.lineStrong}` },
    subtle: { background: T.bgAlt, color: T.ink },
    accent: { background: T.accent, color: "#fff" },
    danger: { background: "transparent", color: T.red, border: `1px solid ${T.line}` },
  };
  return (
    <button
      onClick={disabled ? undefined : onClick}
      style={{ ...base, ...kinds[kind] }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(.98)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >{children}</button>
  );
}

function Card({ children, T, style, padded = true }) {
  return (
    <div style={{
      background: T.panel, border: `1px solid ${T.line}`, borderRadius: 16,
      padding: padded ? 22 : 0, ...style,
    }}>{children}</div>
  );
}

function Spinner({ label, T }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, color: T.sub, fontFamily: FONTS.mono, fontSize: 13, padding: "16px 0" }}>
      <span style={{
        width: 14, height: 14, border: `2px solid ${T.line}`, borderTopColor: T.brand,
        borderRadius: "50%", display: "inline-block", animation: "spin .7s linear infinite",
      }} />
      {label}
    </div>
  );
}

function ScoreRing({ score, T, size = 88 }) {
  const r = size / 2 - 10;
  const c = 2 * Math.PI * r;
  const color = score >= 75 ? T.green : score >= 50 ? T.amber : T.red;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={T.line} strokeWidth="8" />
      <circle
        cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="8"
        strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)}
        strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{ transition: "stroke-dashoffset .8s ease" }}
      />
      <text x={size/2} y={size/2} textAnchor="middle" dominantBaseline="central"
        style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: size * 0.28, fill: T.ink }}>
        {score}
      </text>
    </svg>
  );
}

function ThemeToggle({ dark, setDark, T }) {
  return (
    <button
      onClick={() => setDark((d) => !d)}
      aria-label="Toggle theme"
      style={{
        background: T.bgAlt, border: `1px solid ${T.line}`, borderRadius: 999,
        width: 52, height: 28, position: "relative", cursor: "pointer", padding: 0,
        transition: "background .2s ease",
      }}
    >
      <span style={{
        position: "absolute", top: 2, left: dark ? 26 : 2,
        width: 22, height: 22, borderRadius: "50%",
        background: dark ? T.brand : "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,.15)",
        transition: "left .2s ease, background .2s ease",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, color: dark ? "#fff" : T.amber,
      }}>{dark ? "☾" : "☀"}</span>
    </button>
  );
}

function ProgressBar({ value, T }) {
  return (
    <div style={{ height: 6, background: T.bgAlt, borderRadius: 999, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${value}%`, background: T.brand, transition: "width .4s ease" }} />
    </div>
  );
}

// ============================================================
// APP
// ============================================================
export default function CareerCompassApp() {
  const { T, dark, setDark } = useT();
  const [screen, setScreen] = useState(() => store.get("cc_screen", "landing"));
  const [user, setUser] = useState(() => store.get("cc_user", null));
  const [quizAnswers, setQuizAnswers] = useState(() => store.get("cc_quizAnswers", {})); // { quizKey: { itemIdx: value } }
  const [completedSims, setCompletedSims] = useState(() => store.get("cc_sims", []));
  const [report, setReport] = useState(() => store.get("cc_report", null));

  useEffect(() => store.set("cc_screen", screen), [screen]);
  useEffect(() => store.set("cc_user", user), [user]);
  useEffect(() => store.set("cc_quizAnswers", quizAnswers), [quizAnswers]);
  useEffect(() => store.set("cc_sims", completedSims), [completedSims]);
  useEffect(() => store.set("cc_report", report), [report]);

  const globalStyles = (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
      @keyframes spin { to { transform: rotate(360deg); } }
      @keyframes rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes shimmer { 0%{background-position:-200% 0;} 100%{background-position:200% 0;} }
      * { box-sizing: border-box; }
      html, body, #root { background: ${T.bg}; color: ${T.ink}; }
      body { margin: 0; }
      button:focus-visible, input:focus-visible, select:focus-visible {
        outline: 2px solid ${T.brand}; outline-offset: 2px;
      }
      input, textarea, select { color: ${T.ink}; }
      ::placeholder { color: ${T.faint}; opacity: 1; }
      ::selection { background: ${T.brandSoft}; color: ${T.brandInk}; }
    `}</style>
  );

  const nav = (
    <TopNav
      T={T} dark={dark} setDark={setDark}
      user={user}
      onLogout={() => { setUser(null); setScreen("landing"); }}
      onHome={() => setScreen(user ? "dashboard" : "landing")}
      onGoLogin={() => setScreen("login")}
      onGoDashboard={() => setScreen("dashboard")}
      screen={screen}
    />
  );

  const shell = (children, wide = false) => (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: FONTS.sans, color: T.ink }}>
      {globalStyles}
      {nav}
      <div style={{ maxWidth: wide ? 1080 : 760, margin: "0 auto", padding: "32px 20px 100px" }}>
        {children}
      </div>
    </div>
  );

  const props = {
    T, user, setUser, screen, setScreen,
    quizAnswers, setQuizAnswers,
    completedSims, setCompletedSims,
    report, setReport,
    shell,
  };

  if (screen === "landing") return <Landing {...props} />;
  if (screen === "login") return <Login {...props} />;
  if (screen === "dashboard") return <Dashboard {...props} />;
  if (screen.startsWith("quiz:")) return <QuizRunner quizKey={screen.split(":")[1]} {...props} />;
  if (screen === "careers") return <CareerPicker {...props} />;
  if (screen === "sim") return <SimRunner {...props} />;
  if (screen === "verdict") return <Verdict {...props} />;
  if (screen === "report") return <ReportView {...props} />;
  if (screen === "compare") return <Compare {...props} />;

  return shell(<Spinner label="loading…" T={T} />);
}

// ============================================================
// TOP NAV
// ============================================================
function TopNav({ T, dark, setDark, user, onLogout, onHome, onGoLogin, onGoDashboard, screen }) {
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 10, background: T.bg + "ee",
      backdropFilter: "blur(10px)", borderBottom: `1px solid ${T.line}`,
    }}>
      <div style={{
        maxWidth: 1080, margin: "0 auto", padding: "14px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
      }}>
        <button onClick={onHome} style={{
          background: "none", border: "none", cursor: "pointer", padding: 0,
          display: "flex", alignItems: "center", gap: 10, color: T.ink,
        }}>
          <span style={{
            width: 28, height: 28, borderRadius: 8,
            background: `linear-gradient(135deg, ${T.brand}, ${T.accent})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 700, fontFamily: FONTS.display, fontSize: 16,
          }}>C</span>
          <span style={{
            fontFamily: FONTS.display, fontWeight: 700, fontSize: 20, letterSpacing: -0.4,
            fontStyle: "italic",
          }}>CareerCompass</span>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {user && screen !== "dashboard" && (
            <Btn kind="ghost" size="sm" T={T} onClick={onGoDashboard}>Dashboard</Btn>
          )}
          {user ? (
            <>
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "6px 12px", background: T.panel, border: `1px solid ${T.line}`, borderRadius: 999,
              }}>
                <span style={{
                  width: 22, height: 22, borderRadius: "50%", background: T.brand, color: "#fff",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 600,
                }}>{(user.name || user.email)[0].toUpperCase()}</span>
                <span style={{ fontSize: 13, color: T.ink }}>{user.name || user.email.split("@")[0]}</span>
              </div>
              <Btn kind="ghost" size="sm" T={T} onClick={onLogout}>Sign out</Btn>
            </>
          ) : (
            screen !== "login" && <Btn kind="ghost" size="sm" T={T} onClick={onGoLogin}>Sign in</Btn>
          )}
          <ThemeToggle dark={dark} setDark={setDark} T={T} />
        </div>
      </div>
    </div>
  );
}

// ============================================================
// LANDING
// ============================================================
function Landing({ T, user, setScreen, shell }) {
  return shell(
    <div style={{ animation: "rise .4s ease" }}>
      {/* HERO */}
      <div style={{ paddingTop: 20, paddingBottom: 60, textAlign: "left" }}>
        <div style={{
          display: "inline-block", padding: "6px 12px", borderRadius: 999,
          background: T.brandSoft, color: T.brandInk, fontFamily: FONTS.mono,
          fontSize: 11, letterSpacing: 1, marginBottom: 20,
        }}>
          FOR STUDENTS · GRADE 8-12
        </div>
        <h1 style={{
          fontFamily: FONTS.display, fontSize: "clamp(40px, 7vw, 64px)", lineHeight: 1.02,
          fontWeight: 400, letterSpacing: -1.5, margin: "0 0 20px",
        }}>
          Figure out what to <em style={{ color: T.brand }}>actually</em><br />
          do with your life.
        </h1>
        <p style={{
          color: T.sub, fontSize: 18, lineHeight: 1.6, maxWidth: 560, marginBottom: 32,
        }}>
          Take real assessments, live a day in different careers, and get an honest report
          on what fits you — before you spend years training for something you'll hate.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Btn size="lg" T={T} onClick={() => setScreen(user ? "dashboard" : "login")}>
            {user ? "Go to dashboard" : "Start free — 2 min setup"} →
          </Btn>
          <Btn size="lg" kind="ghost" T={T} onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}>
            How it works
          </Btn>
        </div>

        <div style={{
          marginTop: 40, display: "flex", gap: 24, flexWrap: "wrap",
          fontSize: 13, color: T.sub, fontFamily: FONTS.mono, letterSpacing: 0.5,
        }}>
          <span>✓ 5 SCIENCE-BACKED QUIZZES</span>
          <span>✓ 17+ CAREER SIMULATORS</span>
          <span>✓ NO SIGN-UP TO TRY</span>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div id="how" style={{ paddingTop: 40 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: T.brand, letterSpacing: 1, marginBottom: 10 }}>
          HOW IT WORKS
        </div>
        <h2 style={{ fontFamily: FONTS.display, fontSize: 36, fontWeight: 400, margin: "0 0 30px", letterSpacing: -0.8 }}>
          Four steps. Real answers.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {[
            { n: "01", t: "Take the quizzes", d: "Interests, strengths, weaknesses, values, work style. About 40 questions total." },
            { n: "02", t: "Pick careers to try", d: "17 real jobs from banking to filmmaking. Pick the ones you're curious about." },
            { n: "03", t: "Live a day", d: "Make real decisions inside a simulated day. See how it actually feels." },
            { n: "04", t: "Get your report", d: "Honest fit scores, top career matches, and a plan for the next 6 months." },
          ].map((s, i) => (
            <Card key={i} T={T}>
              <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: T.brand, marginBottom: 12 }}>{s.n}</div>
              <div style={{ fontFamily: FONTS.display, fontSize: 22, fontWeight: 400, marginBottom: 8, letterSpacing: -0.4 }}>{s.t}</div>
              <div style={{ fontSize: 14, color: T.sub, lineHeight: 1.55 }}>{s.d}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* FEATURED CAREERS */}
      <div style={{ paddingTop: 80 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: T.brand, letterSpacing: 1, marginBottom: 10 }}>
          CAREERS YOU CAN LIVE
        </div>
        <h2 style={{ fontFamily: FONTS.display, fontSize: 36, fontWeight: 400, margin: "0 0 8px", letterSpacing: -0.8 }}>
          17 real jobs, one brutal day each.
        </h2>
        <p style={{ color: T.sub, fontSize: 15, marginBottom: 24 }}>
          More coming — vote for what you want next.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 10 }}>
          {CAREERS.slice(0, 9).map((c) => (
            <div key={c.id} style={{
              padding: 14, borderRadius: 12, border: `1px solid ${T.line}`, background: T.panel,
            }}>
              <div style={{ fontWeight: 600, fontSize: 14.5, marginBottom: 4 }}>{c.label}</div>
              <div style={{ fontSize: 12.5, color: T.sub, lineHeight: 1.5 }}>{c.plain}</div>
            </div>
          ))}
        </div>
      </div>

      {/* QUOTE */}
      <div style={{ paddingTop: 80, paddingBottom: 40 }}>
        <Card T={T} style={{ padding: 36, background: T.panelAlt, border: `1px solid ${T.line}` }}>
          <div style={{ fontFamily: FONTS.display, fontSize: 24, lineHeight: 1.4, fontWeight: 400, fontStyle: "italic", color: T.ink, marginBottom: 16 }}>
            "I thought I wanted to be a doctor for 5 years. One simulation showed me I hate the pace and love the science. Now I'm looking at biotech research — completely different path."
          </div>
          <div style={{ fontSize: 13, color: T.sub, fontFamily: FONTS.mono, letterSpacing: 0.5 }}>
            — ANANYA, GRADE 11, BENGALURU
          </div>
        </Card>
      </div>

      {/* FINAL CTA */}
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <h2 style={{ fontFamily: FONTS.display, fontSize: 42, fontWeight: 400, letterSpacing: -1, margin: "0 0 16px" }}>
          Stop guessing. <em style={{ color: T.brand }}>Start testing.</em>
        </h2>
        <p style={{ color: T.sub, fontSize: 16, marginBottom: 24 }}>
          Free. No credit card. Just your future.
        </p>
        <Btn size="lg" T={T} onClick={() => setScreen(user ? "dashboard" : "login")}>
          {user ? "Continue where you left off" : "Get started"} →
        </Btn>
      </div>

    </div>,
    true
  );
}

// ============================================================
// LOGIN (mock — email + name only)
// ============================================================
function Login({ T, setUser, setScreen, shell }) {
  const [mode, setMode] = useState("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [grade, setGrade] = useState("10");

  const submit = () => {
    if (!email.trim()) return;
    setUser({
      name: name.trim() || email.split("@")[0],
      email: email.trim(),
      grade,
      joined: new Date().toISOString(),
    });
    setScreen("dashboard");
  };

  return shell(
    <div style={{ maxWidth: 420, margin: "40px auto 0", animation: "rise .3s ease" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: T.brand, letterSpacing: 1, marginBottom: 10 }}>
          {mode === "signup" ? "CREATE YOUR ACCOUNT" : "WELCOME BACK"}
        </div>
        <h1 style={{ fontFamily: FONTS.display, fontSize: 36, fontWeight: 400, letterSpacing: -0.8, margin: 0 }}>
          {mode === "signup" ? "Let's start your compass." : "Sign in."}
        </h1>
      </div>

      <Card T={T} style={{ padding: 26 }}>
        <div style={{ display: "flex", gap: 6, background: T.bgAlt, padding: 4, borderRadius: 10, marginBottom: 20 }}>
          {["signup", "signin"].map((m) => (
            <button key={m} onClick={() => setMode(m)} style={{
              flex: 1, padding: "8px 12px", borderRadius: 8, border: "none",
              background: mode === m ? T.panel : "transparent",
              boxShadow: mode === m ? "0 1px 3px rgba(0,0,0,.08)" : "none",
              fontWeight: 600, fontSize: 13, color: T.ink, cursor: "pointer",
              fontFamily: FONTS.sans,
            }}>{m === "signup" ? "Sign up" : "Sign in"}</button>
          ))}
        </div>

        {mode === "signup" && (
          <>
            <Label T={T}>Your name</Label>
            <Input T={T} value={name} onChange={setName} placeholder="Aarav Sharma" />
            <div style={{ height: 14 }} />
            <Label T={T}>Grade</Label>
            <select value={grade} onChange={(e) => setGrade(e.target.value)} style={{
              width: "100%", padding: "12px 14px", borderRadius: 10, border: `1px solid ${T.line}`,
              background: T.panel, color: T.ink, fontSize: 14, fontFamily: FONTS.sans,
            }}>
              {["8", "9", "10", "11", "12", "College"].map((g) => <option key={g} value={g}>Grade {g}</option>)}
            </select>
            <div style={{ height: 14 }} />
          </>
        )}
        <Label T={T}>Email</Label>
        <Input T={T} value={email} onChange={setEmail} placeholder="you@school.com" type="email"
               onEnter={submit} />
        <div style={{ height: 20 }} />
        <Btn T={T} onClick={submit} disabled={!email.trim()} style={{ width: "100%", justifyContent: "center" }}>
          {mode === "signup" ? "Create account" : "Sign in"}
        </Btn>
        <div style={{ marginTop: 14, textAlign: "center", fontSize: 12, color: T.sub }}>
          No password needed for the demo. Your data stays in your browser.
        </div>
      </Card>
    </div>
  );
}

function Label({ children, T }) {
  return <div style={{ fontSize: 12, fontWeight: 600, color: T.sub, marginBottom: 6, letterSpacing: 0.3 }}>{children}</div>;
}

function Input({ T, value, onChange, placeholder, type = "text", onEnter }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onEnter?.()}
      placeholder={placeholder}
      style={{
        width: "100%", padding: "12px 14px", borderRadius: 10,
        border: `1px solid ${T.line}`, background: T.panel, color: T.ink,
        fontSize: 14, fontFamily: FONTS.sans,
      }}
    />
  );
}

// ============================================================
// DASHBOARD
// ============================================================
function Dashboard({ T, user, quizAnswers, completedSims, report, setScreen, shell }) {
  const quizProgress = useMemo(() => {
    return QUIZZES.map((q) => {
      const total = q.items.length;
      const done = Object.keys(quizAnswers[q.key] || {}).length;
      return { key: q.key, title: q.title, done, total, pct: Math.round((done / total) * 100) };
    });
  }, [quizAnswers]);

  const allQuizzesDone = quizProgress.every((q) => q.pct === 100);
  const overallPct = Math.round(quizProgress.reduce((a, b) => a + b.pct, 0) / quizProgress.length);

  return shell(
    <div style={{ animation: "rise .3s ease" }}>
      {/* HERO */}
      <div style={{ marginBottom: 30 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: T.brand, letterSpacing: 1, marginBottom: 8 }}>
          YOUR DASHBOARD
        </div>
        <h1 style={{ fontFamily: FONTS.display, fontSize: 42, fontWeight: 400, letterSpacing: -1, margin: "0 0 8px" }}>
          Hey {user?.name?.split(" ")[0] || "there"}.
        </h1>
        <p style={{ color: T.sub, fontSize: 16, margin: 0 }}>
          {overallPct < 100 ? "Finish your assessments, then live a few careers to unlock your compass report." : allQuizzesDone && completedSims.length === 0 ? "Great — quizzes done. Now try a career simulation." : "Ready when you are."}
        </p>
      </div>

      {/* PROGRESS BAND */}
      <Card T={T} style={{ marginBottom: 24, padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>Your compass progress</div>
          <div style={{ fontFamily: FONTS.mono, fontSize: 13, color: T.brand }}>{overallPct}%</div>
        </div>
        <ProgressBar value={overallPct} T={T} />
        <div style={{ marginTop: 14, display: "flex", gap: 12, flexWrap: "wrap", fontSize: 13, color: T.sub }}>
          <span>✓ {quizProgress.filter(q => q.pct === 100).length}/5 quizzes done</span>
          <span>·</span>
          <span>{completedSims.length} career{completedSims.length !== 1 ? "s" : ""} simulated</span>
          <span>·</span>
          <span>{report ? "Report ready" : "Report not generated yet"}</span>
        </div>
      </Card>

      {/* GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
        {/* QUIZZES */}
        <Card T={T} style={{ gridColumn: "1 / -1" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: FONTS.display, fontSize: 22, fontWeight: 400, letterSpacing: -0.4 }}>Assessments</div>
              <div style={{ fontSize: 13, color: T.sub, marginTop: 2 }}>Finish all 5 for the best report.</div>
            </div>
            <Badge tone="brand" T={T}>{quizProgress.filter(q => q.pct === 100).length}/5</Badge>
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            {quizProgress.map((q) => (
              <button key={q.key} onClick={() => setScreen("quiz:" + q.key)} style={{
                display: "flex", alignItems: "center", gap: 14, padding: 14, borderRadius: 12,
                border: `1px solid ${T.line}`, background: T.panelAlt, cursor: "pointer",
                textAlign: "left", fontFamily: FONTS.sans, color: T.ink,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: q.pct === 100 ? T.greenSoft : T.brandSoft,
                  color: q.pct === 100 ? T.green : T.brandInk,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: FONTS.mono, fontSize: 13, fontWeight: 600,
                }}>
                  {q.pct === 100 ? "✓" : q.pct + "%"}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14.5, marginBottom: 3 }}>{q.title}</div>
                  <div style={{ fontSize: 12.5, color: T.sub }}>
                    {q.done}/{q.total} questions
                  </div>
                </div>
                <span style={{ color: T.sub, fontSize: 18 }}>→</span>
              </button>
            ))}
          </div>
        </Card>

        {/* CAREER SIMS */}
        <Card T={T}>
          <div style={{ fontFamily: FONTS.display, fontSize: 22, fontWeight: 400, letterSpacing: -0.4, marginBottom: 6 }}>
            Career simulations
          </div>
          <div style={{ fontSize: 13, color: T.sub, marginBottom: 16 }}>
            Live a day in real jobs. Recommended after quizzes.
          </div>
          {completedSims.length === 0 ? (
            <div style={{ padding: "20px 0", color: T.sub, fontSize: 14 }}>No sims completed yet.</div>
          ) : (
            <div style={{ display: "grid", gap: 8, marginBottom: 14 }}>
              {completedSims.slice(0, 3).map((s, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
                  background: T.panelAlt, borderRadius: 10,
                }}>
                  <div style={{
                    fontFamily: FONTS.display, fontSize: 18, fontWeight: 700,
                    color: s.verdict.score >= 75 ? T.green : s.verdict.score >= 50 ? T.amber : T.red,
                    width: 32, textAlign: "center",
                  }}>{s.verdict.score}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 600 }}>{s.career}</div>
                    <div style={{ fontSize: 12, color: T.sub, lineHeight: 1.4 }}>{s.verdict.headline}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Btn T={T} size="sm" onClick={() => setScreen("careers")}>
            {completedSims.length === 0 ? "Try your first career" : "Simulate another"} →
          </Btn>
          {completedSims.length >= 2 && (
            <Btn T={T} size="sm" kind="ghost" onClick={() => setScreen("compare")} style={{ marginLeft: 8 }}>
              Compare
            </Btn>
          )}
        </Card>

      </div>
    </div>,
    true
  );
}

// ============================================================
// QUIZ RUNNER
// ============================================================
function QuizRunner({ quizKey, T, quizAnswers, setQuizAnswers, setScreen, shell }) {
  const quiz = QUIZZES.find((q) => q.key === quizKey);
  const answers = quizAnswers[quizKey] || {};
  const [idx, setIdx] = useState(() => {
    for (let i = 0; i < quiz.items.length; i++) if (answers[i] === undefined) return i;
    return 0;
  });

  if (!quiz) return shell(<div>Quiz not found.</div>);

  const answer = (val) => {
    const next = { ...answers, [idx]: val };
    setQuizAnswers({ ...quizAnswers, [quizKey]: next });
    if (idx < quiz.items.length - 1) setIdx(idx + 1);
    else setScreen("dashboard");
  };

  const item = quiz.items[idx];
  const progress = ((idx) / quiz.items.length) * 100;

  return shell(
    <div style={{ animation: "rise .3s ease", maxWidth: 620, margin: "0 auto" }}>
      <div style={{ marginBottom: 24 }}>
        <button onClick={() => setScreen("dashboard")} style={{
          background: "none", border: "none", color: T.sub, cursor: "pointer",
          fontFamily: FONTS.mono, fontSize: 12, letterSpacing: 0.5, padding: 0, marginBottom: 12,
        }}>← BACK TO DASHBOARD</button>
        <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: T.brand, letterSpacing: 1, marginBottom: 10 }}>
          {quiz.title.toUpperCase()} · {idx + 1} / {quiz.items.length}
        </div>
        <ProgressBar value={progress} T={T} />
      </div>

      <Card T={T} style={{ padding: 28, marginBottom: 20 }}>
        <div style={{ fontFamily: FONTS.display, fontSize: 28, fontWeight: 400, lineHeight: 1.25, letterSpacing: -0.5, marginBottom: 26 }}>
          {item.q}
        </div>
        {quiz.binary ? (
          <div style={{ display: "grid", gap: 10 }}>
            {item.opts.map((o, i) => (
              <button key={i} onClick={() => answer(o.tag)} style={{
                textAlign: "left", padding: "16px 18px", borderRadius: 12,
                border: `1px solid ${T.line}`, background: T.panelAlt, cursor: "pointer",
                fontSize: 15, fontFamily: FONTS.sans, color: T.ink,
                transition: "background .15s ease, border-color .15s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = T.brandSoft; e.currentTarget.style.borderColor = T.brand; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = T.panelAlt; e.currentTarget.style.borderColor = T.line; }}
              >
                <span style={{ fontFamily: FONTS.mono, fontSize: 12, color: T.brand, marginRight: 12 }}>
                  {String.fromCharCode(65 + i)}
                </span>
                {o.label}
              </button>
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gap: 8 }}>
            {quiz.scale.map((label, val) => (
              <button key={val} onClick={() => answer(val)} style={{
                textAlign: "left", padding: "13px 16px", borderRadius: 10,
                border: `1px solid ${T.line}`, background: T.panelAlt, cursor: "pointer",
                fontSize: 14, fontFamily: FONTS.sans, color: T.ink,
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = T.brandSoft; e.currentTarget.style.borderColor = T.brand; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = T.panelAlt; e.currentTarget.style.borderColor = T.line; }}
              >
                <span>{label}</span>
                <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: T.faint }}>{val + 1}</span>
              </button>
            ))}
          </div>
        )}
      </Card>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Btn kind="ghost" size="sm" T={T} disabled={idx === 0} onClick={() => setIdx(idx - 1)}>← Previous</Btn>
        <div style={{ fontSize: 12, color: T.sub }}>{Object.keys(answers).length} / {quiz.items.length} answered</div>
        <Btn kind="ghost" size="sm" T={T} disabled={idx === quiz.items.length - 1 || answers[idx] === undefined} onClick={() => setIdx(idx + 1)}>Next →</Btn>
      </div>
    </div>
  );
}

// ============================================================
// CAREER PICKER
// ============================================================
function CareerPicker({ T, completedSims, setScreen, shell, ...ctx }) {
  const [custom, setCustom] = useState("");
  const [group, setGroup] = useState("All");

  const startSim = (career) => {
    sessionStorage.setItem("cc_currentCareer", JSON.stringify(career));
    setScreen("sim");
  };

  const filtered = group === "All" ? CAREERS : CAREERS.filter(c => c.group === group);

  return shell(
    <div style={{ animation: "rise .3s ease" }}>
      <button onClick={() => setScreen("dashboard")} style={{
        background: "none", border: "none", color: T.sub, cursor: "pointer",
        fontFamily: FONTS.mono, fontSize: 12, letterSpacing: 0.5, padding: 0, marginBottom: 14,
      }}>← BACK</button>

      <div style={{ marginBottom: 28 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: T.brand, letterSpacing: 1, marginBottom: 8 }}>
          PICK A CAREER TO LIVE
        </div>
        <h1 style={{ fontFamily: FONTS.display, fontSize: 40, fontWeight: 400, letterSpacing: -1, margin: "0 0 10px" }}>
          What do you want to try?
        </h1>
        <p style={{ color: T.sub, fontSize: 15, margin: 0 }}>
          Live one full working day. Every decision has consequences. Takes ~5 minutes.
        </p>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {["All", ...CAREER_GROUPS].map((g) => (
          <button key={g} onClick={() => setGroup(g)} style={{
            padding: "6px 14px", borderRadius: 999, fontSize: 13,
            border: `1px solid ${group === g ? T.brand : T.line}`,
            background: group === g ? T.brandSoft : T.panel,
            color: group === g ? T.brandInk : T.ink,
            cursor: "pointer", fontFamily: FONTS.sans, fontWeight: 500,
          }}>{g}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
        {filtered.map((c) => {
          const done = completedSims.find((x) => x.career === c.label);
          return (
            <button key={c.id} onClick={() => startSim(c)} style={{
              textAlign: "left", padding: 16, borderRadius: 14,
              border: `1px solid ${done ? T.brand : T.line}`,
              background: done ? T.brandSoft : T.panel,
              cursor: "pointer", fontFamily: FONTS.sans, color: T.ink,
              transition: "transform .1s ease, border-color .15s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = T.brand; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = done ? T.brand : T.line; e.currentTarget.style.transform = "none"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{c.label}</div>
                {done && <Badge tone="brand" T={T}>{done.verdict.score}</Badge>}
              </div>
              <div style={{ fontSize: 13, color: T.sub, lineHeight: 1.5, marginBottom: 8 }}>{c.plain}</div>
              <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: T.faint, letterSpacing: 0.3 }}>{c.group.toUpperCase()}</div>
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 24 }}>
        <Card T={T} style={{ padding: 18 }}>
          <div style={{ fontSize: 13, color: T.sub, marginBottom: 10 }}>Don't see the career you want?</div>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="e.g. UN diplomat, video game designer…"
              style={{
                flex: 1, padding: "12px 14px", borderRadius: 10,
                border: `1px solid ${T.line}`, background: T.panelAlt, color: T.ink,
                fontSize: 14, fontFamily: FONTS.sans,
              }}
            />
            <Btn T={T} disabled={!custom.trim()}
                 onClick={() => startSim({ id: "custom", label: custom.trim(), plain: "Custom career you picked.", tag: "custom", group: "Custom" })}>
              Simulate
            </Btn>
          </div>
        </Card>
      </div>
    </div>,
    true
  );
}

// ============================================================
// SIM RUNNER
// ============================================================
function SimRunner({ T, quizAnswers, completedSims, setCompletedSims, setScreen, shell }) {
  const [career] = useState(() => JSON.parse(sessionStorage.getItem("cc_currentCareer") || "null"));
  const [log, setLog] = useState([]);
  const [current, setCurrent] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customChoice, setCustomChoice] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [log, current, loading]);

  const profileText = () => {
    const parts = [];
    for (const q of QUIZZES) {
      const ans = quizAnswers[q.key] || {};
      const answered = Object.keys(ans).length;
      if (answered === 0) continue;
      const summary = q.binary
        ? q.items.map((it, i) => ans[i] !== undefined ? `${it.q} → ${it.opts.find(o => o.tag === ans[i])?.label}` : null).filter(Boolean).slice(0, 4).join("; ")
        : q.items.map((it, i) => ans[i] !== undefined ? `${it.q} (${q.scale[ans[i]]})` : null).filter(Boolean).slice(0, 4).join("; ");
      parts.push(`${q.title}: ${summary}`);
    }
    return parts.join("\n\n") || "(no assessment data yet)";
  };

  useEffect(() => {
    if (!career) { setScreen("careers"); return; }
    start();
    // eslint-disable-next-line
  }, []);

  async function start() {
    setLoading(true); setError(null); setLog([]); setCurrent(null);
    const first = [{
      role: "user",
      content: `Student profile:\n${profileText()}\n\nCareer to simulate: ${career.label} (${career.tag || career.plain}). Begin the day. First decision point.`,
    }];
    try {
      const turn = await askClaude(first, SIM_SYSTEM);
      setHistory([...first, { role: "assistant", content: JSON.stringify(turn) }]);
      setCurrent(turn);
    } catch { setError("Simulation failed to load."); }
    setLoading(false);
  }

  async function choose(choiceText) {
    const entry = { time: current.time, scene: current.scene, choice: choiceText, stat: current.stat };
    setLog((l) => [...l, entry]);
    setCurrent(null); setCustomChoice(""); setLoading(true);
    const msgs = [...history, { role: "user", content: `I choose: ${choiceText}. Continue the day.` }];
    try {
      const turn = await askClaude(msgs, SIM_SYSTEM);
      const nextHistory = [...msgs, { role: "assistant", content: JSON.stringify(turn) }];
      setHistory(nextHistory);
      if (turn.done) {
        setLog((l) => [...l, { time: turn.time, scene: turn.scene, choice: null, stat: turn.stat }]);
        await getVerdict(nextHistory);
      } else {
        setCurrent(turn);
      }
    } catch { setError("Something broke mid-day. Retry?"); }
    setLoading(false);
  }

  async function getVerdict(fullHistory) {
    setLoading(true);
    try {
      const transcript = fullHistory.map((m) => `${m.role}: ${m.content}`).join("\n");
      const v = await askClaude(
        [{ role: "user", content: `Profile:\n${profileText()}\n\nCareer: ${career.label}\n\nSimulation transcript:\n${transcript}\n\nProduce the fit report.` }],
        VERDICT_SYSTEM
      );
      const newSims = [
        ...completedSims.filter((x) => x.career !== career.label),
        { career: career.label, verdict: v, date: new Date().toISOString() },
      ];
      setCompletedSims(newSims);
      sessionStorage.setItem("cc_lastVerdict", JSON.stringify({ career: career.label, verdict: v }));
      setScreen("verdict");
    } catch { setError("Couldn't generate the fit report."); }
    setLoading(false);
  }

  if (!career) return shell(<Spinner label="loading…" T={T} />);

  return shell(
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 22 }}>
        <div>
          <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: T.sub, letterSpacing: 1, marginBottom: 4 }}>NOW SIMULATING</div>
          <div style={{ fontFamily: FONTS.display, fontSize: 26, fontWeight: 400, letterSpacing: -0.5 }}>{career.label}</div>
        </div>
        <Btn kind="ghost" size="sm" T={T} onClick={() => setScreen("careers")}>Quit shift</Btn>
      </div>

      <div style={{ borderLeft: `2px solid ${T.line}`, paddingLeft: 22, display: "flex", flexDirection: "column", gap: 22 }}>
        {log.map((e, i) => (
          <div key={i} style={{ animation: "rise .3s ease" }}>
            <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: T.brand, marginBottom: 5 }}>{e.time}</div>
            <div style={{ fontSize: 15, lineHeight: 1.6, color: T.ink }}>{e.scene}</div>
            {e.choice && (
              <div style={{ marginTop: 8, fontSize: 13.5, color: T.sub, fontStyle: "italic" }}>
                → you: {e.choice}
              </div>
            )}
            {e.stat && (
              <div style={{ marginTop: 8 }}>
                <Badge tone={e.stat.tone === "good" ? "good" : e.stat.tone === "bad" ? "bad" : "neutral"} T={T}>
                  {e.stat.label}
                </Badge>
              </div>
            )}
          </div>
        ))}

        {current && (
          <div style={{ animation: "rise .3s ease" }}>
            <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: T.brand, marginBottom: 5 }}>{current.time}</div>
            <div style={{ fontSize: 16, lineHeight: 1.65, fontWeight: 500 }}>{current.scene}</div>
            {current.stat && (
              <div style={{ marginTop: 8 }}>
                <Badge tone={current.stat.tone === "good" ? "good" : current.stat.tone === "bad" ? "bad" : "neutral"} T={T}>
                  {current.stat.label}
                </Badge>
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 18 }}>
              {current.choices.map((c, i) => (
                <button key={i} onClick={() => choose(c)} style={{
                  textAlign: "left", padding: "14px 16px", borderRadius: 12,
                  border: `1px solid ${T.line}`, background: T.panel, fontSize: 14.5,
                  lineHeight: 1.5, cursor: "pointer", fontFamily: FONTS.sans, color: T.ink,
                  transition: "background .15s ease, border-color .15s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = T.brandSoft; e.currentTarget.style.borderColor = T.brand; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = T.panel; e.currentTarget.style.borderColor = T.line; }}
                >
                  <span style={{ fontFamily: FONTS.mono, color: T.brand, marginRight: 10, fontSize: 12 }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {c}
                </button>
              ))}
              <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                <input
                  value={customChoice}
                  onChange={(e) => setCustomChoice(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && customChoice.trim() && choose(customChoice.trim())}
                  placeholder="Or type your own move…"
                  style={{
                    flex: 1, padding: "11px 14px", borderRadius: 10,
                    border: `1px dashed ${T.line}`, background: "transparent",
                    fontSize: 13.5, fontFamily: FONTS.sans, color: T.ink,
                  }}
                />
                <Btn T={T} size="sm" disabled={!customChoice.trim()} onClick={() => choose(customChoice.trim())}>
                  Do it
                </Btn>
              </div>
            </div>
          </div>
        )}

        {loading && <Spinner label={log.length === 0 ? "clocking you in…" : "what happens next…"} T={T} />}
        {error && (
          <div style={{ color: T.red, fontSize: 13.5 }}>
            {error}{" "}
            <button onClick={start} style={{ color: T.brand, background: "none", border: "none", cursor: "pointer", fontSize: 13.5, textDecoration: "underline" }}>
              retry
            </button>
          </div>
        )}
      </div>
      <div ref={bottomRef} />
    </div>
  );
}

// ============================================================
// VERDICT
// ============================================================
function Verdict({ T, completedSims, setScreen, shell }) {
  const last = JSON.parse(sessionStorage.getItem("cc_lastVerdict") || "null");
  if (!last) return shell(<div>No verdict yet. <Btn T={T} onClick={() => setScreen("careers")}>Pick a career</Btn></div>);
  const { career, verdict } = last;

  return shell(
    <div style={{ animation: "rise .4s ease" }}>
      <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: T.sub, letterSpacing: 1, marginBottom: 14 }}>
        FIT REPORT · {career.toUpperCase()}
      </div>

      <Card T={T} style={{ padding: 28, marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 22, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
          <ScoreRing score={verdict.score} T={T} size={100} />
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: T.brand, letterSpacing: 1, marginBottom: 6 }}>
              VERDICT
            </div>
            <div style={{ fontFamily: FONTS.display, fontSize: 24, fontWeight: 400, lineHeight: 1.3, letterSpacing: -0.4 }}>
              {verdict.headline}
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: T.green, marginBottom: 8 }}>ENERGIZED YOU</div>
            {verdict.energized.map((e, i) => (
              <div key={i} style={{ fontSize: 14, lineHeight: 1.55, marginBottom: 6 }}>
                <span style={{ color: T.green }}>+</span> {e}
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: T.red, marginBottom: 8 }}>DRAINED YOU</div>
            {verdict.drained.map((e, i) => (
              <div key={i} style={{ fontSize: 14, lineHeight: 1.55, marginBottom: 6 }}>
                <span style={{ color: T.red }}>–</span> {e}
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${T.line}`, paddingTop: 18 }}>
          <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: T.amber, marginBottom: 8 }}>REALITY CHECK</div>
          <div style={{ fontSize: 14.5, lineHeight: 1.65 }}>{verdict.reality}</div>
          <div style={{ fontSize: 13.5, lineHeight: 1.6, color: T.sub, marginTop: 12, paddingTop: 12, borderTop: `1px solid ${T.line}` }}>
            <b style={{ color: T.ink }}>This job is right for:</b> {verdict.fitFor}
          </div>
        </div>
      </Card>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Btn T={T} onClick={() => setScreen("careers")}>Simulate another →</Btn>
        {completedSims.length >= 2 && <Btn T={T} kind="ghost" onClick={() => setScreen("compare")}>Compare careers</Btn>}
        <Btn T={T} kind="ghost" onClick={() => setScreen("dashboard")}>Back to dashboard</Btn>
      </div>
    </div>
  );
}

// ============================================================
// REPORT — comprehensive career report
// ============================================================
function ReportView({ T, quizAnswers, completedSims, report, setReport, setScreen, shell }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const compileProfile = () => {
    const parts = [];
    for (const q of QUIZZES) {
      const ans = quizAnswers[q.key] || {};
      if (Object.keys(ans).length === 0) continue;
      const answered = q.binary
        ? q.items.map((it, i) => ans[i] !== undefined ? `${it.q} → ${it.opts.find(o => o.tag === ans[i])?.label}` : null).filter(Boolean).join("\n")
        : q.items.map((it, i) => ans[i] !== undefined ? `${it.q} → ${q.scale[ans[i]]}` : null).filter(Boolean).join("\n");
      parts.push(`## ${q.title}\n${answered}`);
    }
    const sims = completedSims.map((s) =>
      `Career: ${s.career} (score ${s.verdict.score})\nHeadline: ${s.verdict.headline}\nEnergized: ${s.verdict.energized.join("; ")}\nDrained: ${s.verdict.drained.join("; ")}`
    ).join("\n\n");
    return parts.join("\n\n") + (sims ? `\n\n## Career Sims\n${sims}` : "");
  };

  async function generate() {
    setLoading(true); setError(null);
    try {
      const r = await askClaude(
        [{ role: "user", content: `Full student profile:\n\n${compileProfile()}\n\nWrite the comprehensive Career Compass Report.` }],
        REPORT_SYSTEM, 1800
      );
      setReport(r);
    } catch { setError("Report generation failed. Try again."); }
    setLoading(false);
  }

  useEffect(() => { if (!report) generate(); /* eslint-disable-next-line */ }, []);

  if (loading) return shell(
    <div style={{ padding: "60px 0", textAlign: "center" }}>
      <div style={{ fontFamily: FONTS.display, fontSize: 32, fontWeight: 400, marginBottom: 14 }}>
        Building your compass…
      </div>
      <div style={{ color: T.sub, fontSize: 14, marginBottom: 24 }}>Analyzing every answer you gave.</div>
      <Spinner label="reading between the lines…" T={T} />
    </div>
  );

  if (!report) return shell(
    <div>
      {error && <div style={{ color: T.red, marginBottom: 12 }}>{error}</div>}
      <Btn T={T} onClick={generate}>Generate report</Btn>
    </div>
  );

  return shell(
    <div style={{ animation: "rise .4s ease" }}>
      <button onClick={() => setScreen("dashboard")} style={{
        background: "none", border: "none", color: T.sub, cursor: "pointer",
        fontFamily: FONTS.mono, fontSize: 12, letterSpacing: 0.5, padding: 0, marginBottom: 14,
      }}>← BACK TO DASHBOARD</button>

      <div style={{
        padding: "36px 0 24px",
        borderBottom: `1px solid ${T.line}`, marginBottom: 30,
      }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: T.brand, letterSpacing: 1.5, marginBottom: 12 }}>
          THE CAREER COMPASS REPORT
        </div>
        <h1 style={{ fontFamily: FONTS.display, fontSize: 44, fontWeight: 400, lineHeight: 1.15, letterSpacing: -1, margin: "0 0 20px" }}>
          {report.headline}
        </h1>
        <p style={{ color: T.sub, fontSize: 16, lineHeight: 1.65, maxWidth: 640 }}>
          {report.profile}
        </p>
      </div>

      {/* SUPERPOWERS / WATCHOUTS */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 30 }}>
        <Card T={T} style={{ background: T.greenSoft, borderColor: T.green + "44" }}>
          <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: T.green, letterSpacing: 1, marginBottom: 12 }}>
            YOUR SUPERPOWERS
          </div>
          {report.superpowers.map((s, i) => (
            <div key={i} style={{ fontSize: 14.5, marginBottom: 6, color: T.ink }}>
              <span style={{ color: T.green, marginRight: 6 }}>★</span>{s}
            </div>
          ))}
        </Card>
        <Card T={T} style={{ background: T.amberSoft, borderColor: T.amber + "44" }}>
          <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: T.amber, letterSpacing: 1, marginBottom: 12 }}>
            WATCH OUT FOR
          </div>
          {report.watchouts.map((s, i) => (
            <div key={i} style={{ fontSize: 14.5, marginBottom: 6, color: T.ink }}>
              <span style={{ color: T.amber, marginRight: 6 }}>⚠</span>{s}
            </div>
          ))}
        </Card>
      </div>

      {/* TOP FIELDS */}
      <div style={{ marginBottom: 30 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: T.brand, letterSpacing: 1, marginBottom: 8 }}>
          FIELDS THAT FIT
        </div>
        <h2 style={{ fontFamily: FONTS.display, fontSize: 30, fontWeight: 400, letterSpacing: -0.7, margin: "0 0 18px" }}>
          Where you'll thrive.
        </h2>
        <Card T={T} padded={false}>
          {report.topFields.map((f, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 16, padding: "18px 22px",
              borderBottom: i < report.topFields.length - 1 ? `1px solid ${T.line}` : "none",
            }}>
              <div style={{
                fontFamily: FONTS.display, fontSize: 28, fontWeight: 700,
                color: f.fit >= 75 ? T.green : f.fit >= 60 ? T.amber : T.sub,
                width: 60,
              }}>{f.fit}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 3 }}>{f.field}</div>
                <div style={{ fontSize: 13.5, color: T.sub, lineHeight: 1.5 }}>{f.why}</div>
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* TOP CAREERS */}
      <div style={{ marginBottom: 30 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: T.brand, letterSpacing: 1, marginBottom: 8 }}>
          SPECIFIC CAREERS TO EXPLORE
        </div>
        <h2 style={{ fontFamily: FONTS.display, fontSize: 30, fontWeight: 400, letterSpacing: -0.7, margin: "0 0 18px" }}>
          Actual jobs — with fit scores.
        </h2>
        <div style={{ display: "grid", gap: 12 }}>
          {report.topCareers.map((c, i) => (
            <Card key={i} T={T} style={{ padding: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, gap: 12 }}>
                <div style={{ fontSize: 17, fontWeight: 600 }}>{c.career}</div>
                <Badge tone={c.fit >= 75 ? "good" : c.fit >= 60 ? "warn" : "neutral"} T={T}>{c.fit}% fit</Badge>
              </div>
              <div style={{ fontSize: 14, color: T.sub, lineHeight: 1.55 }}>{c.why}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* AVOID */}
      {report.avoid?.length > 0 && (
        <div style={{ marginBottom: 30 }}>
          <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: T.red, letterSpacing: 1, marginBottom: 8 }}>
            PROBABLY NOT FOR YOU
          </div>
          <h2 style={{ fontFamily: FONTS.display, fontSize: 26, fontWeight: 400, letterSpacing: -0.5, margin: "0 0 14px" }}>
            Save yourself the years.
          </h2>
          <Card T={T} padded={false}>
            {report.avoid.map((a, i) => (
              <div key={i} style={{
                padding: "14px 20px",
                borderBottom: i < report.avoid.length - 1 ? `1px solid ${T.line}` : "none",
              }}>
                <div style={{ fontWeight: 600, fontSize: 14.5, marginBottom: 3 }}>× {a.career}</div>
                <div style={{ fontSize: 13.5, color: T.sub, lineHeight: 1.5 }}>{a.why}</div>
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* 6-MONTH PLAN */}
      <div style={{ marginBottom: 30 }}>
        <Card T={T} style={{
          background: `linear-gradient(135deg, ${T.brandSoft}, ${T.accentSoft})`,
          padding: 28,
        }}>
          <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: T.brandInk, letterSpacing: 1, marginBottom: 10 }}>
            YOUR NEXT 6 MONTHS
          </div>
          <h2 style={{ fontFamily: FONTS.display, fontSize: 28, fontWeight: 400, letterSpacing: -0.5, margin: "0 0 16px", color: T.ink }}>
            Try this to test your fit for real.
          </h2>
          {report.sixMonthPlan.map((p, i) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
              <span style={{
                width: 26, height: 26, borderRadius: 8, background: T.brand, color: "#fff",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, flexShrink: 0,
              }}>{i + 1}</span>
              <div style={{ fontSize: 15, lineHeight: 1.55, color: T.ink, paddingTop: 3 }}>{p}</div>
            </div>
          ))}
        </Card>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", paddingTop: 20, borderTop: `1px solid ${T.line}` }}>
        <Btn T={T} onClick={() => setScreen("careers")}>Try more careers →</Btn>
        <Btn T={T} kind="ghost" onClick={() => { setReport(null); generate(); }}>Regenerate report</Btn>
        <Btn T={T} kind="ghost" onClick={() => window.print()}>Print / save PDF</Btn>
      </div>
    </div>
  );
}

// ============================================================
// COMPARE (careers vs each other)
// ============================================================
function Compare({ T, completedSims, quizAnswers, setScreen, shell }) {
  const [cmp, setCmp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function run() {
    setLoading(true); setError(null);
    try {
      const profileText = QUIZZES.map((q) => {
        const ans = quizAnswers[q.key] || {};
        if (Object.keys(ans).length === 0) return null;
        return `${q.title}: ${Object.keys(ans).length}/${q.items.length} answered`;
      }).filter(Boolean).join("\n");
      const summary = completedSims.map((c) =>
        `Career: ${c.career}\nScore: ${c.verdict.score}\nHeadline: ${c.verdict.headline}\nEnergized: ${c.verdict.energized.join("; ")}\nDrained: ${c.verdict.drained.join("; ")}`
      ).join("\n\n");
      const result = await askClaude(
        [{ role: "user", content: `Profile summary:\n${profileText}\n\nSim reports:\n\n${summary}\n\nCompare and rank.` }],
        COMPARE_SYSTEM
      );
      setCmp(result);
    } catch { setError("Comparison failed."); }
    setLoading(false);
  }

  useEffect(() => { run(); /* eslint-disable-next-line */ }, []);

  if (loading) return shell(<div style={{ padding: "60px 0", textAlign: "center" }}>
    <div style={{ fontFamily: FONTS.display, fontSize: 28, marginBottom: 20 }}>Comparing your careers…</div>
    <Spinner label="weighing the choices…" T={T} />
  </div>);

  if (!cmp) return shell(<div>{error} <Btn T={T} onClick={run}>Retry</Btn></div>);

  return shell(
    <div style={{ animation: "rise .4s ease" }}>
      <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: T.sub, letterSpacing: 1, marginBottom: 14 }}>
        FINAL VERDICT · {completedSims.length} CAREERS COMPARED
      </div>
      <h1 style={{ fontFamily: FONTS.display, fontSize: 44, fontWeight: 400, letterSpacing: -1, margin: "0 0 24px" }}>
        {cmp.winner}
      </h1>
      <Card T={T} style={{ padding: 24, marginBottom: 14 }}>
        {cmp.ranking.map((r, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 14, padding: "14px 0",
            borderBottom: i < cmp.ranking.length - 1 ? `1px solid ${T.line}` : "none",
          }}>
            <span style={{ fontFamily: FONTS.mono, fontSize: 14, color: i === 0 ? T.brand : T.sub, width: 30, fontWeight: 600 }}>#{i + 1}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{r.career}</div>
              <div style={{ fontSize: 13, color: T.sub, lineHeight: 1.5 }}>{r.oneLiner}</div>
            </div>
            <span style={{
              fontFamily: FONTS.display, fontWeight: 700, fontSize: 22,
              color: r.score >= 75 ? T.green : r.score >= 50 ? T.amber : T.red,
            }}>{r.score}</span>
          </div>
        ))}
      </Card>
      <Card T={T} style={{ padding: 24, marginBottom: 14 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: T.brand, marginBottom: 10, letterSpacing: 1 }}>WHY</div>
        <div style={{ fontSize: 15, lineHeight: 1.65, marginBottom: 20 }}>{cmp.reasoning}</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: T.amber, marginBottom: 10, letterSpacing: 1 }}>NEXT 6 MONTHS</div>
        <div style={{ fontSize: 15, lineHeight: 1.65 }}>{cmp.nextStep}</div>
      </Card>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Btn T={T} onClick={() => setScreen("careers")}>Test another career</Btn>
        <Btn T={T} kind="ghost" onClick={() => setScreen("report")}>See full report</Btn>
        <Btn T={T} kind="ghost" onClick={() => setScreen("dashboard")}>Dashboard</Btn>
      </div>
    </div>
  );
}
