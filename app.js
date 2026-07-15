/* ============================================================
   CAREERCOMPASS — vanilla JS single-page app
   ============================================================ */

const EYE_ICON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>`;

// ============================================================
// DATA
// ============================================================
const CAREERS = [
  { id: "ib", label: "Investment Banker", group: "Business & Money", plain: "Helps big companies buy other companies. Long hours, high pay, lots of spreadsheets.", tag: "M&A analyst at a bulge bracket bank" },
  { id: "consult", label: "Management Consultant", group: "Business & Money", plain: "Companies hire you to solve their biggest problems. Lots of travel, slide decks, meetings.", tag: "MBB firm, client on-site" },
  { id: "quant", label: "Quant Trader", group: "Business & Money", plain: "Uses math and code to trade stocks and make (or lose) money fast.", tag: "prop desk, systematic strategies" },
  { id: "founder", label: "Startup Founder", group: "Business & Money", plain: "Starts a company from scratch. High risk, high freedom, mostly chaos.", tag: "early-stage founder, pre-revenue" },
  { id: "pm", label: "Product Manager", group: "Business & Money", plain: "Decides what an app or product should do next. Talks to everyone all day.", tag: "B2C app, growth stage" },
  { id: "marketing", label: "Brand Marketer", group: "Business & Money", plain: "Builds how people feel about a brand. Half creative, half data.", tag: "D2C brand, performance + creative" },
  { id: "swe", label: "Software Engineer", group: "Tech & Science", plain: "Writes code to build apps, websites, or systems. Deep focus work.", tag: "product team at a scale-up" },
  { id: "ml", label: "AI / ML Engineer", group: "Tech & Science", plain: "Trains computers to learn from data — like the systems behind ChatGPT.", tag: "applied ML at a tech company" },
  { id: "designer", label: "Product Designer", group: "Tech & Science", plain: "Designs how apps look and feel. Sketches, prototypes, lots of feedback.", tag: "UX/UI at a product startup" },
  { id: "econ", label: "Economist", group: "Tech & Science", plain: "Studies how money, jobs, and markets work at the country level.", tag: "central bank / policy research" },
  { id: "doctor", label: "Doctor", group: "People & Impact", plain: "Diagnoses and treats patients. Years of training, high stakes, real lives.", tag: "hospital medicine, residency" },
  { id: "law", label: "Corporate Lawyer", group: "People & Impact", plain: "Writes and negotiates contracts for big deals. Detail-obsessed and deadline-driven.", tag: "M&A practice, big firm" },
  { id: "teacher", label: "Teacher", group: "People & Impact", plain: "Explains hard ideas so 30 kids get them. Endless energy required.", tag: "high school teacher, public school" },
  { id: "journalist", label: "Journalist", group: "People & Impact", plain: "Digs up stories that matter. Interviews, writing, tight deadlines.", tag: "news reporter at a major outlet" },
  { id: "director", label: "Film Director", group: "Creative", plain: "Turns a script into a movie. Leads a huge team through months of chaos.", tag: "narrative feature, mid-budget" },
  { id: "architect", label: "Architect", group: "Creative", plain: "Designs buildings people will live and work in for decades.", tag: "design firm, urban projects" },
  { id: "chef", label: "Chef", group: "Creative", plain: "Runs a professional kitchen. Physical, precise, unforgiving.", tag: "head chef, fine dining" },
];
const CAREER_GROUPS = ["Business & Money", "Tech & Science", "People & Impact", "Creative"];
const SIM_READY = new Set(["ib", "swe", "doctor", "founder", "marketing", "teacher", "ml", "law", "chef", "consult", "architect", "econ", "quant", "journalist", "director", "designer", "pm"]);

const INTERESTS_QUIZ = {
  key: "interests",
  title: "What actually interests you?",
  subtitle: "12 quick questions. No wrong answers.",
  scale: ["Not me at all", "Kinda not me", "Neutral", "Kinda me", "Very me"],
  items: [
    { q: "I like breaking down messy problems into logical steps." },
    { q: "I get lost in drawing, writing, or making things look good." },
    { q: "I feel energized after a long conversation with someone new." },
    { q: "I'd rather build something with my hands than just talk about it." },
    { q: "I've thought about starting my own thing — a business, a club, a channel." },
    { q: "I ask 'but why?' a lot, even when people are tired of it." },
    { q: "Numbers, patterns, and puzzles genuinely excite me." },
    { q: "I care a lot about helping people — even strangers." },
    { q: "I'd pick a hands-on project over a research paper every time." },
    { q: "I like being in charge and convincing people to try my ideas." },
    { q: "I lose track of time when I'm making art, music, or writing." },
    { q: "I want to understand how something works, not just use it." },
  ],
};

const STRENGTHS_QUIZ = {
  key: "strengths",
  title: "What are you actually good at?",
  subtitle: "Rate yourself honestly. This isn't a school report.",
  scale: ["Not a strength", "Below average", "Okay", "Strong", "Really strong"],
  items: [
    { q: "Solving hard math or logic problems." },
    { q: "Writing something so clearly a stranger gets it in one read." },
    { q: "Talking in front of a room without freezing." },
    { q: "Coming up with ideas nobody else thought of." },
    { q: "Sitting with one hard task for hours without giving up." },
    { q: "Getting a group to actually finish a project." },
    { q: "Noticing when a friend is upset before they say anything." },
    { q: "Fixing, building, or making something physical work." },
    { q: "Spotting the flaw in someone's argument." },
    { q: "Convincing someone to change their mind." },
  ],
};

const WEAKNESSES_QUIZ = {
  key: "weaknesses",
  title: "Where do you struggle?",
  subtitle: "Being honest here makes the report way more useful.",
  scale: ["Never a problem", "Rarely", "Sometimes", "Often", "Constant issue"],
  items: [
    { q: "I put off tasks until the last possible minute." },
    { q: "I open a book, then I'm on my phone 10 minutes later." },
    { q: "I avoid saying what I think if it might upset someone." },
    { q: "I quit projects when they get boring, even if they matter." },
    { q: "I redo work until it's 'perfect' and miss deadlines." },
    { q: "I skim the fine print and later realize I missed something." },
    { q: "Being around people all day exhausts me." },
    { q: "I need someone else to keep me on track." },
  ],
};

const VALUES_QUIZ = {
  key: "values",
  title: "What do you actually want out of work?",
  subtitle: "Pick what matters most — not what sounds good.",
  scale: ["Doesn't matter", "Slightly matters", "Matters some", "Matters a lot", "Non-negotiable"],
  items: [
    { q: "Earning a lot — enough to buy what I want without thinking." },
    { q: "Actually helping people or the planet in a real way." },
    { q: "Setting my own schedule and being my own boss." },
    { q: "Working somewhere people recognize the name." },
    { q: "Knowing my paycheck will show up every month, no surprises." },
    { q: "Learning something new almost every week." },
    { q: "Being home for dinner, weekends off, real vacations." },
    { q: "Making things — writing, designing, building — that are mine." },
  ],
};

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
// SCORING ENGINE — maps quiz answers to career fit (fully local, no API)
// ============================================================
const QUIZ_TAGS = {
  interests: [
    { analytical: 2, investigative: 1 }, { creative: 2 }, { social: 2 },
    { practical: 2 }, { entrepreneurial: 2 }, { investigative: 2, analytical: 1 },
    { analytical: 2 }, { social: 2 }, { practical: 2 },
    { entrepreneurial: 2, social: 1 }, { creative: 2 }, { investigative: 2 },
  ],
  strengths: [
    { logic: 2 }, { writing: 2 }, { speaking: 2 }, { creativity: 2 },
    { focus: 2 }, { leadership: 2 }, { empathy: 2 }, { hands: 2 },
    { logic: 1, writing: 1 }, { speaking: 2 },
  ],
  weaknesses: [
    { procrastination: 2 }, { focus_bad: 2 }, { conflict_avoid: 2 },
    { boredom: 2 }, { perfectionism: 2 }, { detail_bad: 2 },
    { social_drain: 2 }, { focus_bad: 1, procrastination: 1 },
  ],
  values: [
    { money: 2 }, { impact: 2 }, { freedom: 2 }, { prestige: 2 },
    { stability: 2 }, { growth: 2 }, { balance: 2 }, { creativity_val: 2 },
  ],
};

// Each entry: [quizKey, dimension, direction (+1 want high / -1 want low), weight]
const CAREER_FIT = {
  ib: [
    ["interests","analytical",1,3],["interests","entrepreneurial",1,1],
    ["strengths","logic",1,3],["strengths","focus",1,2],["strengths","speaking",1,1],
    ["values","money",1,3],["values","prestige",1,3],
    ["values","balance",-1,4],["values","stability",-1,2],["values","freedom",-1,1],
    ["weaknesses","procrastination",-1,2],["weaknesses","detail_bad",-1,3],
    ["weaknesses","boredom",-1,2],["weaknesses","social_drain",-1,1],
    ["workstyle","detail",1,2],["workstyle","structured",1,1],["workstyle","front",1,1],
  ],
  consult: [
    ["interests","analytical",1,3],["interests","social",1,2],["interests","entrepreneurial",1,1],
    ["strengths","speaking",1,3],["strengths","logic",1,2],["strengths","writing",1,2],["strengths","leadership",1,1],
    ["values","money",1,2],["values","prestige",1,3],["values","growth",1,2],
    ["values","balance",-1,3],["values","stability",-1,2],
    ["weaknesses","social_drain",-1,3],["weaknesses","procrastination",-1,1],
    ["workstyle","team",1,2],["workstyle","bigpicture",1,2],["workstyle","fast",1,1],["workstyle","generalist",1,1],
  ],
  quant: [
    ["interests","analytical",1,3],["interests","investigative",1,3],
    ["strengths","logic",1,3],["strengths","focus",1,3],
    ["values","money",1,3],["values","growth",1,2],
    ["values","balance",-1,3],["values","stability",-1,2],
    ["weaknesses","focus_bad",-1,3],["weaknesses","procrastination",-1,2],
    ["workstyle","solo",1,2],["workstyle","detail",1,2],["workstyle","specialist",1,2],
  ],
  founder: [
    ["interests","entrepreneurial",1,3],["interests","creative",1,2],["interests","social",1,1],
    ["strengths","leadership",1,3],["strengths","speaking",1,2],["strengths","creativity",1,2],
    ["values","freedom",1,3],["values","growth",1,3],["values","creativity_val",1,1],
    ["values","stability",-1,4],["values","balance",-1,3],
    ["weaknesses","conflict_avoid",-1,2],["weaknesses","perfectionism",-1,1],
    ["workstyle","flexible",1,2],["workstyle","fast",1,2],["workstyle","risk",1,3],
    ["workstyle","generalist",1,2],["workstyle","front",1,1],
  ],
  pm: [
    ["interests","analytical",1,2],["interests","social",1,2],["interests","creative",1,1],["interests","entrepreneurial",1,1],
    ["strengths","writing",1,2],["strengths","speaking",1,2],["strengths","empathy",1,2],["strengths","leadership",1,2],
    ["values","growth",1,2],["values","money",1,2],["values","prestige",1,1],["values","creativity_val",1,1],
    ["weaknesses","conflict_avoid",-1,2],["weaknesses","social_drain",-1,2],
    ["workstyle","team",1,2],["workstyle","flexible",1,1],["workstyle","bigpicture",1,2],["workstyle","generalist",1,2],
  ],
  marketing: [
    ["interests","creative",1,3],["interests","social",1,2],["interests","analytical",1,1],
    ["strengths","writing",1,3],["strengths","creativity",1,3],["strengths","empathy",1,1],
    ["values","creativity_val",1,3],["values","growth",1,1],
    ["workstyle","team",1,1],["workstyle","flexible",1,1],["workstyle","fast",1,2],
  ],
  swe: [
    ["interests","analytical",1,3],["interests","investigative",1,2],["interests","practical",1,2],
    ["strengths","logic",1,3],["strengths","focus",1,3],
    ["values","money",1,2],["values","growth",1,2],["values","freedom",1,1],["values","balance",1,1],
    ["weaknesses","focus_bad",-1,3],["weaknesses","procrastination",-1,2],
    ["workstyle","solo",1,2],["workstyle","detail",1,2],["workstyle","specialist",1,1],
  ],
  ml: [
    ["interests","analytical",1,3],["interests","investigative",1,3],
    ["strengths","logic",1,3],["strengths","focus",1,3],
    ["values","money",1,2],["values","growth",1,3],["values","prestige",1,2],
    ["weaknesses","focus_bad",-1,3],
    ["workstyle","solo",1,2],["workstyle","structured",1,1],["workstyle","specialist",1,2],
  ],
  designer: [
    ["interests","creative",1,3],["interests","social",1,1],["interests","analytical",1,1],
    ["strengths","creativity",1,3],["strengths","empathy",1,2],
    ["values","creativity_val",1,3],["values","balance",1,1],["values","growth",1,1],
    ["workstyle","team",1,1],["workstyle","flexible",1,1],["workstyle","detail",1,2],
  ],
  econ: [
    ["interests","analytical",1,2],["interests","investigative",1,3],
    ["strengths","logic",1,2],["strengths","writing",1,3],["strengths","focus",1,2],
    ["values","stability",1,2],["values","growth",1,2],["values","impact",1,2],
    ["workstyle","solo",1,1],["workstyle","theory",1,3],["workstyle","careful",1,2],["workstyle","specialist",1,1],
  ],
  doctor: [
    ["interests","investigative",1,2],["interests","social",1,3],["interests","practical",1,2],
    ["strengths","focus",1,3],["strengths","empathy",1,3],["strengths","hands",1,2],
    ["values","stability",1,2],["values","impact",1,3],["values","prestige",1,2],
    ["values","balance",-1,3],
    ["weaknesses","procrastination",-1,3],["weaknesses","detail_bad",-1,3],["weaknesses","boredom",-1,1],
    ["workstyle","structured",1,2],["workstyle","careful",1,2],["workstyle","detail",1,2],["workstyle","team",1,1],
  ],
  law: [
    ["interests","analytical",1,2],["interests","investigative",1,2],
    ["strengths","writing",1,3],["strengths","speaking",1,3],["strengths","logic",1,3],["strengths","focus",1,2],
    ["values","money",1,3],["values","prestige",1,3],["values","stability",1,1],
    ["values","balance",-1,3],
    ["weaknesses","detail_bad",-1,3],["weaknesses","procrastination",-1,2],
    ["workstyle","structured",1,2],["workstyle","detail",1,3],["workstyle","careful",1,2],["workstyle","specialist",1,1],
  ],
  teacher: [
    ["interests","social",1,3],["interests","investigative",1,1],
    ["strengths","speaking",1,3],["strengths","empathy",1,3],["strengths","leadership",1,1],
    ["values","impact",1,3],["values","balance",1,1],["values","stability",1,2],
    ["values","money",-1,2],
    ["weaknesses","social_drain",-1,3],
    ["workstyle","team",1,1],["workstyle","structured",1,2],["workstyle","front",1,2],
  ],
  journalist: [
    ["interests","investigative",1,3],["interests","social",1,2],["interests","creative",1,1],
    ["strengths","writing",1,3],["strengths","speaking",1,1],["strengths","empathy",1,1],
    ["values","impact",1,3],["values","creativity_val",1,1],["values","growth",1,1],
    ["values","stability",-1,2],["values","money",-1,2],
    ["weaknesses","procrastination",-1,2],["weaknesses","conflict_avoid",-1,2],
    ["workstyle","flexible",1,1],["workstyle","fast",1,2],["workstyle","generalist",1,1],
  ],
  director: [
    ["interests","creative",1,3],["interests","social",1,2],["interests","entrepreneurial",1,1],
    ["strengths","leadership",1,3],["strengths","creativity",1,3],["strengths","empathy",1,2],
    ["values","creativity_val",1,3],["values","freedom",1,2],
    ["values","stability",-1,3],["values","balance",-1,2],
    ["weaknesses","conflict_avoid",-1,2],
    ["workstyle","team",1,1],["workstyle","flexible",1,1],["workstyle","bigpicture",1,2],["workstyle","front",1,2],
  ],
  architect: [
    ["interests","creative",1,2],["interests","practical",1,2],["interests","analytical",1,1],
    ["strengths","creativity",1,3],["strengths","hands",1,1],["strengths","focus",1,2],
    ["values","creativity_val",1,3],["values","stability",1,1],["values","impact",1,1],
    ["weaknesses","detail_bad",-1,2],["weaknesses","procrastination",-1,1],
    ["workstyle","solo",1,1],["workstyle","careful",1,2],["workstyle","detail",1,2],["workstyle","specialist",1,1],
  ],
  chef: [
    ["interests","creative",1,2],["interests","practical",1,3],
    ["strengths","hands",1,3],["strengths","focus",1,2],["strengths","creativity",1,2],["strengths","leadership",1,1],
    ["values","creativity_val",1,2],
    ["values","balance",-1,3],["values","money",-1,1],
    ["weaknesses","focus_bad",-1,3],["weaknesses","perfectionism",-1,1],
    ["workstyle","fast",1,2],["workstyle","detail",1,2],["workstyle","team",1,1],
  ],
};

const DIM_LABELS = {
  interests: {
    analytical: "logical problem-solving", creative: "creative expression",
    social: "connecting with people", practical: "hands-on building",
    entrepreneurial: "starting new things", investigative: "deep understanding",
  },
  strengths: {
    logic: "logic and reasoning", writing: "writing clearly",
    speaking: "public speaking", creativity: "coming up with ideas",
    focus: "long deep focus", leadership: "leading groups",
    empathy: "reading people", hands: "hands-on skill",
  },
  weaknesses: {
    procrastination: "putting things off", focus_bad: "losing focus fast",
    conflict_avoid: "avoiding hard conversations", boredom: "quitting when bored",
    perfectionism: "perfectionism", detail_bad: "missing small details",
    social_drain: "getting drained by people",
  },
  values: {
    money: "high income", impact: "real-world impact", freedom: "freedom and autonomy",
    prestige: "prestige and status", stability: "stability and safety",
    growth: "constant learning", balance: "work-life balance",
    creativity_val: "creative expression",
  },
};

const FIELD_MAP = {
  "Business & Money": "Business, Finance & Strategy",
  "Tech & Science": "Technology & Research",
  "People & Impact": "People, Service & Impact",
  "Creative": "Creative & Design",
};

function scoreDimensions() {
  const dims = { interests: {}, strengths: {}, weaknesses: {}, values: {}, workstyle: {} };
  for (const key of ["interests","strengths","weaknesses","values"]) {
    const tags = QUIZ_TAGS[key];
    const ans = state.quizAnswers[key] || {};
    const raw = {}, maxRaw = {};
    for (let i = 0; i < tags.length; i++) {
      for (const [dim, weight] of Object.entries(tags[i])) {
        maxRaw[dim] = (maxRaw[dim] || 0) + 4 * weight;
        if (ans[i] !== undefined) raw[dim] = (raw[dim] || 0) + ans[i] * weight;
      }
    }
    for (const dim of Object.keys(maxRaw)) {
      dims[key][dim] = maxRaw[dim] ? Math.round((raw[dim] || 0) / maxRaw[dim] * 100) : 0;
    }
  }
  const wsAns = state.quizAnswers.workstyle || {};
  const wsQuiz = QUIZZES.find(q => q.key === "workstyle");
  for (let i = 0; i < wsQuiz.items.length; i++) {
    if (wsAns[i]) dims.workstyle[wsAns[i]] = 1;
  }
  return dims;
}

function fitCareer(careerId, dims) {
  const fit = CAREER_FIT[careerId];
  if (!fit) return 50;
  let numerator = 0, denominator = 0;
  for (const [group, dim, dir, weight] of fit) {
    let userVal;
    if (group === "workstyle") userVal = dims.workstyle[dim] ? 100 : 0;
    else userVal = dims[group][dim] ?? 0;
    const alignment = dir === 1 ? userVal : 100 - userVal;
    numerator += alignment * weight;
    denominator += 100 * weight;
  }
  const raw = denominator ? numerator / denominator : 0.5;
  return Math.max(22, Math.min(96, Math.round(raw * 100)));
}

function topKeys(obj, n = 3) {
  return Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, n).map(x => x[0]);
}

function cap(s) { return s ? s[0].toUpperCase() + s.slice(1) : s; }

function generateHeadline(dims) {
  const ti = topKeys(dims.interests, 1)[0];
  const tv = topKeys(dims.values, 1)[0];
  const iMap = {
    analytical: "a sharp analytical thinker",
    creative: "a creative maker",
    social: "a natural connector",
    practical: "a hands-on doer",
    entrepreneurial: "a bold starter",
    investigative: "a deep researcher",
  };
  const vMap = {
    money: "who wants real financial rewards.",
    impact: "who wants to change something that matters.",
    freedom: "who needs freedom over routine.",
    prestige: "who plays to win at a high level.",
    stability: "who values a steady, safe path.",
    growth: "who never stops learning.",
    balance: "who wants a real life outside work.",
    creativity_val: "who has to make things to feel alive.",
  };
  return `You're ${iMap[ti] || "a thoughtful student"} ${vMap[tv] || "figuring out what matters."}`;
}

function generateProfile(dims) {
  const ti = topKeys(dims.interests, 2);
  const ts = topKeys(dims.strengths, 2);
  const tv = topKeys(dims.values, 2);
  const tw = topKeys(dims.weaknesses, 1)[0];
  const parts = [];
  if (ti[0]) parts.push(`You come alive around ${DIM_LABELS.interests[ti[0]]}${ti[1] ? ` and ${DIM_LABELS.interests[ti[1]]}` : ""}.`);
  if (ts[0]) parts.push(`Your biggest strengths are ${DIM_LABELS.strengths[ts[0]]}${ts[1] ? ` and ${DIM_LABELS.strengths[ts[1]]}` : ""}.`);
  if (tv[0]) parts.push(`What matters most to you: ${DIM_LABELS.values[tv[0]]}${tv[1] ? ` and ${DIM_LABELS.values[tv[1]]}` : ""}.`);
  if (tw && dims.weaknesses[tw] >= 50) parts.push(`Watch out: you can get stuck on ${DIM_LABELS.weaknesses[tw]}.`);
  return parts.join(" ");
}

function getSuperpowers(dims) {
  const top = Object.entries(dims.strengths).filter(([_, v]) => v >= 55).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const result = top.map(([k]) => cap(DIM_LABELS.strengths[k]));
  const filler = ["Willingness to try new things", "Genuine curiosity", "Self-awareness"];
  while (result.length < 3) result.push(filler[result.length]);
  return result;
}

function getWatchouts(dims) {
  const top = Object.entries(dims.weaknesses).filter(([_, v]) => v >= 50).sort((a, b) => b[1] - a[1]).slice(0, 3);
  if (top.length === 0) return ["Being too hard on yourself", "Comparing yourself to others"];
  return top.map(([k]) => cap(DIM_LABELS.weaknesses[k]));
}

function whyCareerFits(careerId, dims) {
  const fit = CAREER_FIT[careerId];
  const aligned = fit.filter(([g, d, dir]) => dir === 1).map(([g, d, dir, w]) => {
    const uv = g === "workstyle" ? (dims.workstyle[d] ? 100 : 0) : (dims[g][d] || 0);
    return { g, d, w, uv, score: uv * w };
  }).filter(x => x.uv >= 40).sort((a, b) => b.score - a.score);
  if (aligned.length === 0) return "A moderate overall match — not your strongest signal, but not a bad fit.";
  const top = aligned[0];
  const label = top.g === "workstyle" ? "preferred way of working" : (DIM_LABELS[top.g]?.[top.d] || top.d);
  const t = [`Plays directly to your ${label}.`, `Matches your ${label} well.`, `Built for your ${label}.`, `Uses your ${label} every day.`];
  return t[(careerId.length + top.d.length) % t.length];
}

function whyAvoid(careerId, dims) {
  const fit = CAREER_FIT[careerId];
  const misaligned = fit.map(([g, d, dir, w]) => {
    const uv = g === "workstyle" ? (dims.workstyle[d] ? 100 : 0) : (dims[g][d] || 0);
    const alignment = dir === 1 ? uv : 100 - uv;
    return { g, d, dir, w, uv, gap: (100 - alignment) * w };
  }).sort((a, b) => b.gap - a.gap);
  const top = misaligned[0];
  if (!top) return "Doesn't match your general profile.";
  const label = top.g === "workstyle" ? "way of working" : (DIM_LABELS[top.g]?.[top.d] || top.d);
  if (top.dir === 1) return `Needs strong ${label} — that's not your top signal.`;
  return `Would clash with your ${label}.`;
}

function getTopFields(scoredCareers) {
  const groups = {};
  for (const c of scoredCareers) {
    if (!groups[c.group]) groups[c.group] = { total: 0, count: 0 };
    groups[c.group].total += c.fit;
    groups[c.group].count += 1;
  }
  const arr = Object.entries(groups).map(([g, { total, count }]) => ({
    field: FIELD_MAP[g] || g, fit: Math.round(total / count), group: g,
  })).sort((a, b) => b.fit - a.fit);
  const why = {
    "Business & Money": "You lean toward analytical, high-stakes work with real financial rewards.",
    "Tech & Science": "You like going deep, thinking systematically, and building things that matter.",
    "People & Impact": "You care about others and want your work to change real lives.",
    "Creative": "You need to make things — words, images, ideas — that are truly yours.",
  };
  return arr.slice(0, 4).map(x => ({ field: x.field, fit: x.fit, why: why[x.group] || "Aligns with your profile." }));
}

function generatePlan(scoredCareers, dims) {
  const top = scoredCareers[0];
  const specific = {
    ib: "Learn how a company is valued — try a free 'Intro to Financial Modeling' course on YouTube (Corporate Finance Institute is a good start).",
    consult: "Pick a company you use daily and write a one-page 'here's what I'd change and why' memo. Rewrite it monthly.",
    quant: "Learn Python + basic probability. Try Kaggle's beginner competitions to see if you love the puzzle.",
    founder: "Sell something. Anything. Cookies, tuition, a Notion template. Feel what earning $1 from a stranger is like.",
    pm: "Pick an app you love. Write down 3 features it's missing and why they matter. Post it online, take feedback.",
    marketing: "Run a tiny Instagram or Substack for 3 months in a niche you actually care about. Track what makes people click.",
    swe: "Build a small app that solves your own problem. Ship it. Doesn't have to be pretty.",
    ml: "Do Andrew Ng's free 'AI for Everyone' course, then try training a tiny model on Hugging Face.",
    designer: "Redesign an ugly app you use. Post before/after on Twitter or LinkedIn. Ask for critique.",
    econ: "Read one economics book (start with Freakonomics), then follow one economist online. Try explaining news through an economic lens.",
    doctor: "Shadow a doctor for a day (ask family, friends, or a nearby hospital). Watch if the environment energizes or drains you.",
    law: "Read one landmark court judgment (a U.S. Supreme Court case is a good start). Write down what convinced you or didn't.",
    teacher: "Teach a younger sibling or neighbor a hard subject for a month. See if their 'aha' moment lights you up.",
    journalist: "Pitch and write one story for your school paper or Medium. Interview a real person. Feel the deadline.",
    director: "Make a 3-minute short film on your phone. Get 5 people to watch it and give honest feedback.",
    architect: "Sketch or model your dream building for a real site near you. Study one architect you admire deeply.",
    chef: "Work in a real kitchen for a week (even a small café) during vacation. See if the pace suits you.",
  }[top.id] || "Find someone who works in your top field and ask for 15 minutes of their time — just one honest conversation.";

  const dominantValue = topKeys(dims.values, 1)[0];
  const valuePlan = {
    money: "Look up how much the top 10% in your target field actually earn — locally and globally. Make sure you're chasing it for the right reasons.",
    impact: "Volunteer 4 hours a week with an org whose mission you care about. See if the day-to-day work matches the mission.",
    freedom: "Try a side project with total autonomy for one month. Notice if you rise to it or need external structure.",
    prestige: "Ask honestly: whose approval are you chasing? Write it down. Then decide if that's a strong enough reason.",
    stability: "Talk to two adults in stable jobs you respect. Ask what they wish they'd known at 15.",
    growth: "Pick one new skill outside school this semester. Track how long it stays interesting.",
    balance: "Shadow someone in your top career for a full day. Watch what time they actually go home.",
    creativity_val: "Publish something you made — writing, art, video — every 2 weeks for 3 months. See what feedback comes back.",
  }[dominantValue] || "Read one book about your top field this month. Not a textbook — a memoir or biography from someone actually in it.";

  const generic = "Talk to 3 adults working in your top field. Ask what surprised them about the job vs. what they expected as students.";
  return [specific, valuePlan, generic];
}

// ============================================================
// SIM SCRIPTS — hand-authored career day scenarios (no API needed)
// Each scene: { time, scene, stat:{label,tone}, choices:[strings], tones:[good|neutral|bad] }
// Last scene has empty choices to signal end.
// ============================================================
const SIM_SCRIPTS = {
  ib: {
    intro: "You're a first-year analyst at a big investment bank in NYC. Your client wants to buy a smaller company. Your job today: build a spreadsheet that estimates what that company is worth. No right answers below — just pick how you'd naturally work.",
    start: "s1",
    scenes: {
      s1: { time: "8:45 AM",
        scene: "You're in early. Your boss sent a 52-page report at 6 AM with one line: 'Need a valuation by end of day.' You have 9 hours. Where do you start?",
        stat: { label: "First move", tone: "neutral" },
        choices: [
          { text: "Read the 52 pages first. ~90 min. Then build.", tone: "neutral", next: "s2" },
          { text: "Open the spreadsheet now. Skim the report as you go.", tone: "good", next: "s2" },
          { text: "Message your senior: 'What are the 2-3 things I need to know first?' Then decide.", tone: "good", sets: { asked: true }, next: "s2" }
        ] },
      s2: { time: "9:30 AM",
        scene: "Your senior stops by: 'Boss will want three different valuations, not one. She'll ask.' You now need three, in the same 8 hours. First one is barely started.",
        stat: { label: "Scope tripled", tone: "bad" },
        choices: [
          { text: "Build all three at once. Jump between them.", tone: "good", next: "s3" },
          { text: "Nail the main one first. Rush the other two after.", tone: "neutral", next: "s3" },
          { text: "Do the main one. By 3 PM, decide if the others are realistic. Flag early if not.", tone: "good", next: "s3" }
        ] },
      s3: { time: "10:45 AM",
        scene: "Senior analyst pulls you into a 40-min video call about a totally different deal. 'Just listen — good exposure.' You have no role. Your spreadsheet is 15% done.",
        stat: { label: "Model at 15%", tone: "bad" },
        choices: [
          { text: "Full attention. Take notes. This is how you learn.", tone: "bad", next: "s4_behind" },
          { text: "Mute, camera off, keep building. Learn on a lighter day.", tone: "good", next: "s4_ontrack" },
          { text: "Camera on, look engaged, half-build in the background.", tone: "neutral", next: "s4_ontrack" }
        ] },
      s4_ontrack: { time: "12:15 PM",
        scene: "You need real numbers, so you open the target's annual report. 200+ pages. You need revenue, costs, cash flow, and risks.",
        stat: { label: "200 pages", tone: "neutral" },
        choices: [
          { text: "Read it front to back. 90 min. Miss nothing.", tone: "bad", next: "s5" },
          { text: "Jump to the numbers section. Skip the intro. 25 min.", tone: "good", next: "s5" },
          { text: "Search the PDF for 'revenue,' 'customer,' 'risks.' Fastest.", tone: "good", next: "s5" }
        ] },
      s4_behind: { time: "12:15 PM",
        scene: "That call ran long — 55 minutes, not 40. Your model is still 15% done. You now open the target's 200-page annual report with less than 4 hours before boss expects a first look. No slack left.",
        stat: { label: "Behind schedule", tone: "bad" },
        choices: [
          { text: "Read it front to back anyway. You'll catch up somewhere else.", tone: "bad", next: "s5" },
          { text: "Search the PDF for 'revenue,' 'customer,' 'risks.' Skip everything else.", tone: "good", next: "s5" },
          { text: "Ping your senior: 'Meeting overran, model at 15%. Should I flag the timeline now?'", tone: "good", next: "s5" }
        ] },
      s5: { time: "1:30 PM",
        scene: "Lunch. Someone mentions a rumor: another big bank passed on this deal last week, saying the target had 'hidden problems.' Four hours until your model is due.",
        stat: { label: "Rumor, no source", tone: "neutral" },
        choices: [
          { text: "Spend 30 min after lunch digging into the target's numbers for red flags.", tone: "good", next: "s6" },
          { text: "Ignore it. Your job is the model. Rumors are noise.", tone: "good", next: "s6" },
          { text: "Ask your senior: 'Heard this? Should I look into it?'", tone: "neutral", next: "s6" }
        ] },
      s6: { time: "3:00 PM",
        scene: "Boss messages: 'What if the target loses its biggest customer? That customer is 22% of sales.' You don't have data on how likely this is. You have to assume.",
        stat: { label: "No data", tone: "neutral" },
        choices: [
          { text: "Look up how often companies actually lose big customers. 45 min, but defensible.", tone: "neutral", next: "s7" },
          { text: "Gut-pick a number (say 15%), model it, move on.", tone: "good", next: "s7" },
          { text: "Make it a slider — boss can change it herself when she reviews.", tone: "neutral", next: "s7" }
        ] },
      s7: { time: "5:00 PM",
        scene: "Your model says the target is worth $1.0–1.4B. Client wants to offer $1.15B. Time to write the one-page summary that lands on the client's desk tomorrow.",
        stat: { label: "Summary time", tone: "neutral" },
        choices: [
          { text: "One page. Big font. Just the range, the offer, the midpoint. Read in 30 sec.", tone: "good", next: "s8" },
          { text: "Two pages. Range + the three methods + assumptions behind each.", tone: "good", next: "s8" },
          { text: "One page, three scenarios: best/base/worst, with a short story for each.", tone: "neutral", next: "s8" }
        ] },
      s8: { time: "6:30 PM",
        scene: "Boss: 'Assume the buyer saves 15% on costs after combining. Rebuild.' The answer shifts. How much do you show?",
        stat: { label: "New assumption", tone: "neutral" },
        choices: [
          { text: "Just add it. Number updates. Move on.", tone: "good" },
          { text: "Add it + a small table showing the answer at 5%, 10%, 15%.", tone: "good" },
          { text: "Add it + spend 20 min writing a note next to every assumption in the model.", tone: "neutral" }
        ],
        // flag-driven pivot: if you asked your senior for context at 8:45 AM,
        // that relationship pays off now — they offer to co-review.
        next: (flags) => flags.asked ? "s9_helped" : "s9_solo" },
      s9_solo: { time: "8:20 PM",
        scene: "Boss sends 34 review comments. 28 are formatting. 6 are real changes to the numbers. She wants v3 by 10:30 PM. You're on your own.",
        stat: { label: "34 comments · solo", tone: "bad" },
        choices: [
          { text: "Do all 34 in her order. Predictable.", tone: "neutral", next: "s10" },
          { text: "Do the 6 real ones first. Formatting last, in case time runs out.", tone: "good", next: "s10" },
          { text: "Message a first-year across the aisle: 'Can you take formatting?'", tone: "neutral", next: "s10" }
        ] },
      s9_helped: { time: "8:20 PM",
        scene: "Boss sends 34 review comments. 28 are formatting. 6 are real changes to the numbers. She wants v3 by 10:30 PM. Your senior pings first: 'Saw the batch — I can take formatting if you take the numbers. Yes or no?'",
        stat: { label: "34 comments · offered help", tone: "neutral" },
        choices: [
          { text: "'Yes, please — I'll own the 6 real edits.'", tone: "good", next: "s10" },
          { text: "'Thanks, I've got it — you've done enough today.'", tone: "neutral", next: "s10" },
          { text: "'Can you take the formatting AND spot-check my number changes?'", tone: "good", next: "s10" }
        ] },
      s10: { time: "10:15 PM",
        scene: "You send v3. Boss is silent — in a meeting. You order dinner. Your senior messages: 'Free for a quick sync?' No context.",
        stat: { label: "Interruption", tone: "neutral" },
        choices: [
          { text: "'Sure — call me now.'", tone: "good", next: "s11" },
          { text: "'Give me 15 min, finishing something.'", tone: "neutral", next: "s11" },
          { text: "'What's up? Text me?'", tone: "neutral", next: "s11" }
        ] },
      s11: { time: "11:50 PM",
        scene: "Boss is back: 'Deck's fine but the story doesn't flow. Move the recommendation to page one, then analysis, then details. Print-ready by 8 AM.' You've been at this 15 hours. This is ~90 more minutes.",
        stat: { label: "One last rework", tone: "bad" },
        choices: [
          { text: "Restructure exactly as she said. She was clear.", tone: "good", next: "s12" },
          { text: "Just move the summary to page one. Tighten a couple slides. Might be enough.", tone: "bad", next: "s12" },
          { text: "Walk to your senior's desk: 'Is this a full rework or just moving pages?'", tone: "neutral", next: "s12" }
        ] },
      s12: { time: "7:45 AM (Wed)",
        scene: "You're back in. Boss glances at your deck, says 'Client meeting at 10 — you're in the room,' and keeps walking. In two hours a $1.15B decision will get made, partly on what you built last night. You'll never know exactly how much you shaped it. This is the job.",
        stat: { label: "Day 2", tone: "neutral" },
        choices: [] }
    }
  },
  swe: {
    intro: "You're a mid-level engineer at a growing shopping app used by 2 million people. Today you're the main engineer on a payments feature that's already been delayed twice.",
    start: "s1",
    scenes: {
      s1: { time: "9:15 AM",
        scene: "47 unread Slack messages. 3 teammates are blocked waiting on your code review. Yesterday's bug is still half-solved. Standup is in 30 minutes.",
        stat: { label: "Morning triage", tone: "neutral" },
        choices: [
          { text: "Triage Slack first — 20 min to know what's going on before standup.", tone: "good", next: "s2" },
          { text: "Review the 3 pending code reviews first. Colleagues are blocked.", tone: "good", sets: { unblockedTeam: true }, next: "s2" },
          { text: "Reopen yesterday's bug, work while your brain is fresh.", tone: "neutral", next: "s2_headsdown" }
        ] },
      s2: { time: "10:00 AM",
        scene: "Time to build the refund flow. It touches three connected systems, and the docs are two years out of date. Nobody on your team wrote any of it.",
        stat: { label: "Reading old code", tone: "bad" },
        choices: [
          { text: "Read all three systems top to bottom. ~3 hours, but you'll understand it.", tone: "good", next: "s3_context" },
          { text: "Read only the functions your code will call. Fix the rest if it breaks.", tone: "good", next: "s3_context" },
          { text: "Skim function names, guess what they do, write your code, run it.", tone: "bad", next: "s3_burned" }
        ] },
      s2_headsdown: { time: "10:00 AM",
        scene: "Standup came and went — you missed it, half-focused on yesterday's bug. Your manager pinged twice. Now you also have to build the refund flow across three connected systems with two-year-old docs.",
        stat: { label: "Behind before you started", tone: "bad" },
        choices: [
          { text: "Ping your manager: '15 min late, here's where I am, here's what I'll ship today.'", tone: "good", next: "s3_context" },
          { text: "Head down, catch up on the missed context by reading the code carefully.", tone: "good", next: "s3_context" },
          { text: "Skim function names, guess what they do, write your code, run it.", tone: "bad", next: "s3_burned" }
        ] },
      s3_context: { time: "11:30 AM",
        scene: "While reading old code, you spot a real bug you didn't cause — rare, silent, nobody's complained. Fixing it properly is half a day of work.",
        stat: { label: "Not your bug", tone: "neutral" },
        choices: [
          { text: "Fix it now while you have context. Half a day, but it's gone.", tone: "good", next: "s4" },
          { text: "File a detailed bug report for that team's queue. Keep moving on your own feature.", tone: "good", next: "s4" },
          { text: "Post in the team channel: 'Anyone care about this?'", tone: "neutral", next: "s4" }
        ] },
      s3_burned: { time: "11:30 AM",
        scene: "You wrote the refund code guessing at function names, and now it silently returns wrong amounts for partial orders. You caught it only because a test balance looked odd. Two hours gone.",
        stat: { label: "Guess bit you", tone: "bad" },
        choices: [
          { text: "Stop, go back and actually read the code you called into. 45 min.", tone: "good", next: "s4" },
          { text: "Patch the specific case you saw, keep moving.", tone: "bad", next: "s4" },
          { text: "Ping the team channel: 'anyone remember how partial refunds are shaped?'", tone: "good", next: "s4" }
        ] },
      s4: { time: "1:00 PM",
        scene: "Your feature works on your laptop. You push it to the shared test environment. Blank white page. No error anywhere. Same code, different place, and nothing tells you why.",
        stat: { label: "Ghost bug", tone: "bad" },
        choices: [
          { text: "Read the actual packaged file the browser gets. Slow, but you'll find it.", tone: "good", next: "s5" },
          { text: "Revert your last three changes one at a time to isolate what broke it.", tone: "good", next: "s5" },
          { text: "Blame the environment. Restart it, tag the infra team.", tone: "bad", next: "s5" }
        ] },
      s5: { time: "2:15 PM",
        scene: "Found it — a library you upgraded last week quietly changed behavior. Four-line fix. It works. Nobody will ever know you lost 90 minutes to this. This is most of the job.",
        stat: { label: "Quiet fix", tone: "good" },
        choices: [
          { text: "Spend an hour writing tests so this can't happen silently again.", tone: "good", next: "s6" },
          { text: "Move on to the next feature. Tests can happen later.", tone: "neutral", next: "s6" },
          { text: "Write a short note for the team so nobody else loses 90 minutes to this.", tone: "good", next: "s6" }
        ] },
      s6: { time: "3:30 PM",
        scene: "Design pings: 'quick, three small visual tweaks to checkout.' Same minute, your product manager: 'also let's add guest checkout — marketing wants it for the campaign.' That second one is a two-week feature, not a quick ask. Both are waiting on you.",
        stat: { label: "Two asks at once", tone: "bad" },
        choices: [
          { text: "Reply to both now: visuals after lunch, guest checkout scoped separately.", tone: "good", next: "s7" },
          { text: "Take an hour to think about what's realistic before replying to either.", tone: "neutral", next: "s7" },
          { text: "'Yes to all, I'll figure it out.' Squeeze both in tonight.", tone: "bad", next: "s7" }
        ] },
      s7: { time: "4:45 PM",
        scene: "Your intern is stuck on yesterday's task — fighting a typo she can't see. Helping properly costs you 15 minutes. Pointing at it costs 30 seconds.",
        stat: { label: "Interruption", tone: "neutral" },
        choices: [
          { text: "Sit with her 15 min, ask questions until she spots it herself.", tone: "good", sets: { taughtIntern: true }, next: "s8" },
          { text: "Point at the line: 'Look here.' Back to work in 30 seconds.", tone: "neutral", next: "s8" },
          { text: "'Give me 30 min to finish this, then I'll come to you.'", tone: "neutral", next: "s8" }
        ] },
      s8: { time: "5:45 PM",
        scene: "Your code passes all local tests. QA already left for the day — they won't check it till tomorrow. You're on call starting 8 PM.",
        stat: { label: "Ship or wait", tone: "neutral" },
        choices: [
          { text: "Push to the test system now. It's ready when QA opens their laptop tomorrow.", tone: "good", next: "s9" },
          { text: "Wait until tomorrow morning to push. Fresh eyes if anything breaks.", tone: "neutral", next: "s9" },
          { text: "Push it live behind a hidden toggle. Faster feedback, higher risk.", tone: "neutral", next: "s9" }
        ] },
      s9: { time: "7:30 PM",
        scene: "Office is emptying. Your feature works, but you know 'works' and 'works well' aren't the same — no automated tests yet. Nobody's asking you to stay.",
        stat: { label: "Invest or leave", tone: "neutral" },
        choices: [
          { text: "Stay 90 more minutes to write proper tests. Saves someone a bad day next month.", tone: "good" },
          { text: "Head home. If it breaks, deal with it then.", tone: "neutral" },
          { text: "Push what you have, flag the risky parts to QA for tomorrow.", tone: "good" }
        ],
        next: (flags) => flags.taughtIntern ? "s10_supported" : "s10_solo" },
      s10_solo: { time: "10:20 PM",
        scene: "At home. Your pager goes off — a different service is erroring on 8% of requests. Not your code, but you're on call for the whole team tonight. 15 minutes before it escalates to your manager.",
        stat: { label: "Real page · solo", tone: "bad" },
        choices: [
          { text: "Acknowledge it, follow that team's incident guide. Fixable in ~20 min if it's known.", tone: "good", next: "s11" },
          { text: "Acknowledge it, ask that team's on-call: 'is this yours or should I take it?'", tone: "good", next: "s11" },
          { text: "Wait 10 minutes, see if it clears on its own.", tone: "bad", next: "s11" }
        ] },
      s10_supported: { time: "10:20 PM",
        scene: "At home. Your pager goes off — a different service is erroring on 8% of requests. As you sit down, your intern DMs: 'saw the alert, I can pull logs while you triage — need me to?' That 15 minutes earlier paid you back.",
        stat: { label: "Real page · not alone", tone: "neutral" },
        choices: [
          { text: "'Yes — pull the last hour of logs, I'll ack and follow the runbook.'", tone: "good", next: "s11" },
          { text: "'Thanks — get some sleep, I've got it.'", tone: "neutral", next: "s11" },
          { text: "'Ping the service owner too — is this ours or theirs?' — split the work.", tone: "good", next: "s11" }
        ] },
      s11: { time: "11:15 PM",
        scene: "Turned out to be a dependency issue, not fixable from your side. You update the incident channel and try to sleep. Instead you're wired, and Slack has 14 new messages.",
        stat: { label: "Wired at 11", tone: "neutral" },
        choices: [
          { text: "Close Slack. Deal with it tomorrow — they'll ping you if it's urgent.", tone: "good", next: "s12" },
          { text: "Quick triage: unblock anyone who needs it, snooze the rest. Then sleep.", tone: "good", next: "s12" },
          { text: "Read all 14, reply to none. Catch up tomorrow.", tone: "bad", next: "s12" }
        ] },
      s12: { time: "9:00 AM (Thu)",
        scene: "QA already found two edge cases overnight — one real bug, one false alarm. You fix the real one before standup. Someone says 'nice work' about yesterday's fix. Nobody claps. A thing that didn't exist yesterday now quietly works for 2 million people, and only you know it took 15 hours.",
        stat: { label: "Shipped", tone: "good" },
        choices: [] }
    }
  },
  doctor: {
    intro: "You're a first-year resident doctor in the Internal Medicine department at a busy public hospital in Boston. Today: 24-hour ward duty. You go home tomorrow morning — if nothing goes badly wrong.",
    start: "s1",
    scenes: {
      s1: { time: "6:45 AM",
        scene: "You reach the ward. Rounds with the senior doctor start at 7. You've reviewed 8 patient files. One is a 45-year-old man with kidney failure and confusing lab numbers — the kind of case your consultant uses to see who's paying attention.",
        stat: { label: "You're the intern", tone: "neutral" },
        choices: [
          { text: "Volunteer to present the complex case.", tone: "good", sets: { prepped: true }, next: "s2_prepped" },
          { text: "Present the easier cases, let a colleague take the hard one.", tone: "bad", next: "s2_caught" },
          { text: "Cross-check the labs with the night doctor before rounds start.", tone: "good", sets: { prepped: true }, next: "s2_prepped" }
        ] },
      s2_prepped: { time: "7:15 AM",
        scene: "Rounds. Your consultant asks why the 45-year-old's potassium jumped overnight. Because you prepped, you actually know two possibilities. High potassium can cause a fatal heart rhythm — she's watching whether you sound rehearsed or thoughtful.",
        stat: { label: "You know the answer", tone: "neutral" },
        choices: [
          { text: "'Two candidates — worsening kidney function or the ACE inhibitor. I'd hold the ACE inhibitor and recheck at noon.'", tone: "good", next: "s3" },
          { text: "'Worsening kidney function.' Confident, single answer.", tone: "neutral", next: "s3" },
          { text: "'Two candidates, but I want to check overnight fluids before I commit.'", tone: "good", next: "s3" }
        ] },
      s2_caught: { time: "7:15 AM",
        scene: "Rounds. Your consultant skips the easy cases and asks YOU why the 45-year-old's potassium jumped overnight. High potassium can cause a fatal heart rhythm — this is serious. You have three seconds before the silence gets uncomfortable.",
        stat: { label: "Silence is loud", tone: "bad" },
        choices: [
          { text: "'Not sure — could be worsening kidney function or one of his medications.'", tone: "good", next: "s3" },
          { text: "Confidently guess: 'It's the blood pressure medication.'", tone: "bad", next: "s3" },
          { text: "'I don't know — I'll dig in and update you in 10 minutes.'", tone: "good", next: "s3" }
        ] },
      s3: { time: "9:00 AM",
        scene: "You need to explain a chemo plan to a scared 60-year-old man and his wife. They speak little English, and the medical terms don't translate well. They're nodding but clearly not understanding.",
        stat: { label: "They need to actually understand", tone: "neutral" },
        choices: [
          { text: "Draw it on paper, sit with them for 20 minutes. Miss your next patient.", tone: "good", next: "s4" },
          { text: "Hand them a printed pamphlet, ask them to bring family who speaks English.", tone: "bad", next: "s4" },
          { text: "Find a nurse who speaks their language well, sit with them together.", tone: "good", next: "s4" }
        ] },
      s4: { time: "11:30 AM",
        scene: "The senior hands you all 4 new patients to fully work up before lunch. One is an 82-year-old woman, semi-conscious, on 9 medications from 3 different doctors. Just sorting out her meds is an hour by itself.",
        stat: { label: "4 patients, 1 hard one", tone: "bad" },
        choices: [
          { text: "Do the hardest one first, while you're still fresh.", tone: "good", next: "s5" },
          { text: "Do the three quick ones first, save the hard one for last.", tone: "neutral", next: "s5" },
          { text: "Send her son to fetch her actual medicine packets while you start on her.", tone: "good", next: "s5" }
        ] },
      s5: { time: "12:45 PM",
        scene: "You've missed lunch. A nurse pages you: a patient's blood pressure is crashing fast. You're the closest doctor. Could be infection, a bleed, or a drug reaction.",
        stat: { label: "Rapid response", tone: "bad" },
        choices: [
          { text: "Sprint over immediately — check airway, breathing, circulation first.", tone: "good", next: "s6" },
          { text: "Ask the nurse to start IV fluids while you finish the paperwork you're mid-way through.", tone: "bad", next: "s6" },
          { text: "Call your senior for guidance on the phone as you walk over.", tone: "neutral", next: "s6" }
        ] },
      s6: { time: "1:15 PM",
        scene: "The patient is stabilizing. You notice she'd been given a drug this morning that her chart said should've been paused. Someone missed the note — and you missed it too, during rounds.",
        stat: { label: "System failure, and yours too", tone: "neutral" },
        choices: [
          { text: "Document exactly what happened, tell your senior — flag the handoff process.", tone: "good", next: "s7_owned" },
          { text: "Fix the patient, quietly mention it to the nurse, leave it there.", tone: "neutral", next: "s7_quiet" },
          { text: "Blame the previous shift in your notes — protect yourself.", tone: "bad", next: "s7_blamed" }
        ] },
      s7_owned: { time: "3:30 PM",
        scene: "Your senior stops by. She's already read your incident note. 'Good — that's the kind of resident I can trust with more.' She wants to hear how you're thinking about the miss.",
        stat: { label: "You owned it", tone: "good" },
        choices: [
          { text: "Explain your reasoning honestly and calmly.", tone: "good", next: "s8" },
          { text: "Apologize deeply, don't defend the call.", tone: "neutral", next: "s8" },
          { text: "Point out the handoff process needs to change, not just you.", tone: "good", next: "s8" }
        ] },
      s7_quiet: { time: "3:30 PM",
        scene: "Your senior stops by, arms crossed but not angry: 'Let's talk about this morning.' She's watching how you explain your own decisions, not just what you did.",
        stat: { label: "Uncomfortable conversation", tone: "neutral" },
        choices: [
          { text: "Explain your reasoning honestly and calmly.", tone: "good", next: "s8" },
          { text: "Apologize deeply, don't defend the call.", tone: "neutral", next: "s8" },
          { text: "Point out you were actually right in the end.", tone: "bad", next: "s8" }
        ] },
      s7_blamed: { time: "3:30 PM",
        scene: "Your senior stops by, arms crossed and this time she IS annoyed. She's read your notes. 'You pointed the finger at the night shift. Let's talk about that.'",
        stat: { label: "Now it's harder", tone: "bad" },
        choices: [
          { text: "Own it. 'You're right — I saw the note and missed it too.'", tone: "good", next: "s8" },
          { text: "Defend the framing: the night shift is where it started.", tone: "bad", next: "s8" },
          { text: "Apologize, ask to rewrite the entry with your name on the miss.", tone: "good", next: "s8" }
        ] },
      s8: { time: "5:00 PM",
        scene: "You have 15 minutes to eat and finish notes. Your senior mentions, casually: 'the department needs help on a research project — thought of you.' It's a real opportunity. It's also more work, and you already sleep 5 hours a night.",
        stat: { label: "Career opportunity", tone: "neutral" },
        choices: [
          { text: "'Yes — I'd love to, can we talk scope this weekend?'", tone: "good", next: "s9" },
          { text: "'Interested — can I take a week to think about it?'", tone: "good", next: "s9" },
          { text: "'Thank you, I'm at capacity right now — can I revisit in 3 months?'", tone: "good", next: "s9" }
        ] },
      s9: { time: "7:00 PM",
        scene: "12 hours in. A family arrives — their father died at another hospital this morning, and they want you to explain the death report. You're the only doctor free right now. Not really your job. They're visibly shattered.",
        stat: { label: "Grieving family", tone: "neutral" },
        choices: [
          { text: "Sit with them, read the report properly, explain it gently.", tone: "good", next: "s10" },
          { text: "Explain you can't officially weigh in, but stay with them for 5 minutes.", tone: "good", next: "s10" },
          { text: "Give a quick guess based on what they show you.", tone: "bad", next: "s10" }
        ] },
      s10: { time: "10:15 PM",
        scene: "A 34-year-old with severe asthma is brought in gasping, oxygen dangerously low. Treatment is ready — but his family is loud, panicked, arguing next to the bed.",
        stat: { label: "Chaos at the bedside", tone: "bad" },
        choices: [
          { text: "Firmly but politely ask the family to step outside for 10 minutes.", tone: "good", next: "s11" },
          { text: "Ignore the family, focus on the patient.", tone: "neutral", next: "s11" },
          { text: "Have the nurse manage the family while you work.", tone: "good", next: "s11" }
        ] },
      s11: { time: "12:40 AM",
        scene: "Patient stable. You've eaten once in 18 hours. You lie down for 30 minutes. Your phone rings 12 minutes in — a new patient, possible dengue.",
        stat: { label: "12 minutes of sleep", tone: "bad" },
        choices: [
          { text: "Get up, go see the patient properly.", tone: "good", next: "s12" },
          { text: "Ask the nurse to start standard tests, come see in 30 minutes.", tone: "good", next: "s12" },
          { text: "Ask them to hold the patient until you're up in 20 more minutes.", tone: "bad", next: "s12" }
        ] },
      s12: { time: "3:00 AM",
        scene: "You helped deliver a baby at 1:40 AM — your first this month. Too tired to feel proud. Rounds start in 4 hours. This is Tuesday. There are twelve more shifts like this ahead, and residency is three years long.",
        stat: { label: "First 21 hours done", tone: "neutral" },
        choices: [] }
    }
  },
  founder: {
    intro: "You're the CEO of a 3-person startup in San Francisco, building a productivity app for students. You've raised $500K, with 8 months of money left. Today is a normal chaotic Wednesday.",
    start: "f1",
    scenes: {
      f1: { time: "8:30 AM",
        scene: "You wake up to 14 Slack messages and a tweet. A user with 30K followers says your app deleted 6 months of her notes. She wants a refund and is threatening to post publicly. She hasn't yet.",
        stat: { label: "PR risk before coffee", tone: "bad" },
        choices: [
          { text: "Call her personally within 10 minutes — get her real story.", tone: "good", sets: { handledDirectly: true }, next: "f2_calmed" },
          { text: "Send a long apology email + refund + offer to help recover data.", tone: "good", next: "f2_standard" },
          { text: "DM her from the company account, escalate to your co-founder.", tone: "neutral", next: "f2_public" }
        ] },
      f2_calmed: { time: "9:15 AM",
        scene: "The call worked. She's not posting — for now. You also got the real story: her notes aren't deleted, they're stuck behind a sync bug your co-founder shipped three weeks ago, against your instinct. She's watching how you handle it next.",
        stat: { label: "Bought yourself a day", tone: "neutral" },
        choices: [
          { text: "Screen-share and walk her through recovery live, right now.", tone: "good", next: "f3" },
          { text: "Promise a fix by end of day + send her a personal follow-up.", tone: "good", next: "f3" },
          { text: "Say a fix is coming, don't specify when. Ship it later this week.", tone: "neutral", next: "f3" }
        ] },
      f2_standard: { time: "9:15 AM",
        scene: "Turns out her notes aren't actually deleted — they're stuck because of a sync bug your co-founder shipped three weeks ago, against your instinct.",
        stat: { label: "Root cause: your team", tone: "bad" },
        choices: [
          { text: "Tell her honestly what happened, walk her through recovery live.", tone: "good", next: "f3" },
          { text: "Apologize, get the data back, don't mention it was preventable.", tone: "neutral", next: "f3" },
          { text: "Refund immediately, escalate internally, follow up tomorrow with a fix.", tone: "neutral", next: "f3" }
        ] },
      f2_public: { time: "9:15 AM",
        scene: "Her tweet is up. 40 replies, half of them users tagging their friends. And you still don't have a root cause — your engineer is now digging through logs while you refresh Twitter.",
        stat: { label: "It went public", tone: "bad" },
        choices: [
          { text: "Reply publicly right now: 'Investigating, will update within the hour. My DMs are open.'", tone: "good", next: "f3" },
          { text: "Stay silent publicly. Handle her privately once you know what broke.", tone: "neutral", next: "f3" },
          { text: "Draft a longer post-mortem thread. Publish once you have the fix.", tone: "neutral", next: "f3" }
        ] },
      f3: { time: "10:30 AM",
        scene: "Your co-founder messages: 'Let's drop the roadmap and add AI to everything. Everyone's launching AI. Investors will love it.' You've spent 4 months on the current roadmap, with real user data behind it.",
        stat: { label: "Pivot pressure", tone: "neutral" },
        choices: [
          { text: "Book a real 60-min meeting this afternoon to debate it with data.", tone: "good", next: "f4" },
          { text: "'No — we finish the roadmap. Trends aren't strategies.'", tone: "good", next: "f4" },
          { text: "'Yes — let's start prototyping AI features by end of week.'", tone: "bad", next: "f4" }
        ] },
      f4: { time: "11:30 AM",
        scene: "You check the dashboard. Daily active users: 340, up from 290. But users coming back after a week: 22%, down from 27%. That's a real trend.",
        stat: { label: "Retention dropping", tone: "bad" },
        choices: [
          { text: "Schedule 5 user interviews for tomorrow. Find out why they're leaving.", tone: "good", next: "f5" },
          { text: "Ship a new first-time-user flow this week.", tone: "neutral", next: "f5" },
          { text: "Ignore it for now — daily users are up, focus on growth.", tone: "bad", sets: { ignoredRetention: true }, next: "f5" }
        ] },
      f5: { time: "12:30 PM",
        scene: "An investor you've chased for months pings: 'In town next week. Free Thursday — want to talk about a bigger raise?' You're not ready. But turning her down twice burns a bridge.",
        stat: { label: "Rare access", tone: "neutral" },
        choices: [
          { text: "'Yes, Thursday works — I'll be honest about where we actually are.'", tone: "good" },
          { text: "'Yes, Thursday' — spend the next 6 days making numbers look better.", tone: "bad" },
          { text: "'Could we do late April? I want to bring you real signal.'", tone: "good" }
        ],
        // flag-driven pivot: if you brushed off the retention drop earlier,
        // the engineer's exit conversation is going to name it.
        next: (flags) => flags.ignoredRetention ? "f6_signal" : "f6_standard" },
      f6_standard: { time: "2:00 PM",
        scene: "Your best engineer closes the door. 'Google offered me almost 3x what you pay me, plus stock. I want to stay. But I have to think.' He's the reason your product actually works.",
        stat: { label: "You can't match Google", tone: "bad" },
        choices: [
          { text: "'Here's what I can do: more equity, a new title, an honest talk about the ride we're on.'", tone: "good", next: "f7" },
          { text: "'Let me see if I can find the budget to match. Give me 48 hours.'", tone: "bad", next: "f7" },
          { text: "'I understand — you should take it. Google will be great for you.'", tone: "neutral", next: "f7" }
        ] },
      f6_signal: { time: "2:00 PM",
        scene: "Your best engineer closes the door. 'Google offered me almost 3x plus stock.' Then, quieter: 'Honestly? I flagged the retention drop last week. You waved it off. I don't want to keep building on top of things we're pretending aren't broken.' He's the reason your product actually works.",
        stat: { label: "This one's on you", tone: "bad" },
        choices: [
          { text: "'You're right. I heard growth and stopped listening. Give me one hour and I'll show you the plan I should've built.'", tone: "good", next: "f7" },
          { text: "'Here's more equity, a new title, and an honest talk about what we ignored.'", tone: "good", next: "f7" },
          { text: "'Let me find the budget to match Google. Give me 48 hours.'", tone: "bad", next: "f7" }
        ] },
      f7: { time: "3:30 PM",
        scene: "Your co-founder shows you a demo he built in secret — a note-summarizing feature. Decent, half-working. He wants a yes or no, not a maybe.",
        stat: { label: "Surprise demo", tone: "neutral" },
        choices: [
          { text: "'Let's ship it as an experiment in 4 weeks, measure if it moves retention.'", tone: "good", next: "f8" },
          { text: "'Cool, but a distraction — kill it, back to roadmap.'", tone: "neutral", next: "f8" },
          { text: "'Pivot the whole company — we're an AI company now.'", tone: "bad", next: "f8" }
        ] },
      f8: { time: "5:00 PM",
        scene: "This morning's tweet is climbing — 400 likes in an hour. The story is now bigger than the actual incident.",
        stat: { label: "Real, earned love", tone: "good" },
        choices: [
          { text: "Reply publicly, thank her, be honest about the bug and the fix.", tone: "good", next: "f9" },
          { text: "Screenshot it for the investor deck. Don't reply publicly.", tone: "neutral", next: "f9" },
          { text: "Reply, share the tweet, ask your small user base to amplify it.", tone: "neutral", next: "f9" }
        ] },
      f9: { time: "6:30 PM",
        scene: "Two user calls back to back. Both say almost the same thing: 'I love the app for a week. Then I forget to open it.' It's a habit problem, not a features problem.",
        stat: { label: "You just learned something", tone: "good" },
        choices: [
          { text: "Write it up tonight, send it to your co-founder — this changes strategy.", tone: "good", next: "f10" },
          { text: "Sit on it — one data point isn't enough.", tone: "neutral", next: "f10" },
          { text: "Ship a notification system next release to force the habit.", tone: "bad", next: "f10" }
        ] },
      f10: { time: "8:00 PM",
        scene: "Your co-founder finds you at your desk: 'What if we can't raise?' You've been avoiding this question all day.",
        stat: { label: "The unavoidable question", tone: "bad" },
        choices: [
          { text: "Pull up the spreadsheet, show her the numbers, be brutally honest.", tone: "good", next: "f11" },
          { text: "'We'll raise. Don't stress, focus on the product.'", tone: "bad", next: "f11" },
          { text: "'Let's cut costs by 40% tonight and focus on revenue over growth.'", tone: "good", next: "f11" }
        ] },
      f11: { time: "10:00 PM",
        scene: "You're writing the monthly update to your investors. Do you say the retention drop out loud, or bury it in a footnote?",
        stat: { label: "Transparency call", tone: "neutral" },
        choices: [
          { text: "Lead with the retention drop, then how you're addressing it.", tone: "good", next: "f12" },
          { text: "Bury it — highlight user growth, call retention 'something we're watching.'", tone: "neutral", next: "f12" },
          { text: "Don't mention it this month. Hope next month is better.", tone: "bad", next: "f12" }
        ] },
      f12: { time: "11:45 PM",
        scene: "You send the update, eating dinner at your desk. Runway crisis, an engineer who might leave, an investor meeting Thursday, a retention problem — and a woman who almost trashed you on Twitter is now telling 30K people about you. You keep going. It's yours — the win, the mistake, all of it.",
        stat: { label: "Another 15 hours down", tone: "neutral" },
        choices: [] }
    }
  },
  marketing: {
    intro: "You're Head of Marketing at a growing skincare brand in Los Angeles. Team of 6. Today's job: nail the launch of a new sunscreen, in 12 days. Also today: everything else.",
    start: "s1",
    scenes: {
      s1: { time: "9:00 AM",
        scene: "First email: your ad agency sent the sunscreen launch concept. It's moody, black-and-white, 'edgy.' Your gut says sunscreen should feel warm and fun. Their creative director will get defensive.",
        stat: { label: "Taste call, morning 1", tone: "neutral" },
        choices: [
          { text: "Reject cleanly. 'This misses. Give us warm, fun, and inviting.'", tone: "good", sets: { rejectedAgency: true }, next: "s2" },
          { text: "Approve — trust the agency, they've done bigger launches than you.", tone: "bad", sets: { approvedAgency: true }, next: "s2" },
          { text: "Ask them to make both, test each with real users for a week.", tone: "good", next: "s2" }
        ] },
      s2: { time: "10:30 AM",
        scene: "Weekly review. Last week's ad spend: $5,000. Sales from it: $1,500. That's a return of 0.3 — you need above 2 just to break even.",
        stat: { label: "Return is 0.3", tone: "bad" },
        choices: [
          { text: "Kill the underperforming campaigns today, redirect budget to what's working.", tone: "good", next: "s3" },
          { text: "Blame the tracking, say it's broken, keep spending.", tone: "bad", next: "s3_denial" },
          { text: "Cut spend by 60%, watch what happens for a week.", tone: "good", next: "s3" }
        ] },
      s3: { time: "11:30 AM",
        scene: "You dig in. Two campaigns are actually printing money. Three others are torching cash — and those three are your boss's pet project, brand videos she's emotionally attached to.",
        stat: { label: "Politics vs. numbers", tone: "bad" },
        choices: [
          { text: "Kill her pet campaigns, walk into her office, explain the data.", tone: "good", next: "s4" },
          { text: "Kill them quietly while she's on vacation next week — easier to explain after.", tone: "bad", next: "s4" },
          { text: "Cut them by 80% instead of killing them. Save face, half-solve it.", tone: "neutral", next: "s4" }
        ] },
      s3_denial: { time: "11:30 AM",
        scene: "You told the team the tracking is broken. Now your CEO's assistant is asking for the updated numbers she promised the board today. You have two hours to either fix the story or fix the numbers.",
        stat: { label: "Story you can't hold", tone: "bad" },
        choices: [
          { text: "Come clean: 'Tracking is fine — the campaigns are actually underperforming. Here's the plan.'", tone: "good", next: "s4" },
          { text: "Buy time: 'Data team is re-validating, will send by EOD.'", tone: "neutral", next: "s4" },
          { text: "Send lightly-tweaked numbers that make last week look better.", tone: "bad", next: "s4" }
        ] },
      s4: { time: "1:00 PM",
        scene: "An influencer with 200K followers wants $1,000 for one post on the sunscreen. Decent engagement, but her audience is 62% men. Your product targets women.",
        stat: { label: "Wrong audience, right price", tone: "neutral" },
        choices: [
          { text: "Politely decline — 'wrong fit here, let's talk next quarter.'", tone: "good", next: "s5" },
          { text: "Take it — reach is reach, some of those men have partners and moms.", tone: "bad", next: "s5" },
          { text: "Negotiate to $500 for one test post, measure if it actually converts.", tone: "neutral", next: "s5" }
        ] },
      s5: { time: "2:00 PM",
        scene: "Your junior marketer, six months in, hands you landing page copy. It's decent — a 6/10. Fixing it yourself takes 45 minutes. Teaching her to fix it takes 90. It needs to go live tomorrow.",
        stat: { label: "Fix or teach", tone: "neutral" },
        choices: [
          { text: "Sit with her for 90 minutes, walk through what's wrong together.", tone: "good", sets: { taughtJunior: true }, next: "s6" },
          { text: "Fix it yourself in 45, send her a before/after to study.", tone: "neutral", next: "s6" },
          { text: "Approve it as-is and ship. She'll learn on the next one.", tone: "bad", next: "s6" }
        ] },
      s6: { time: "3:30 PM",
        scene: "You're testing an ad line: 'Sunscreen that doesn't make you look pale.' Could land well — a lot of people hate the white-cast look. Could also stir backlash about skin-tone bias.",
        stat: { label: "Risky angle", tone: "bad" },
        choices: [
          { text: "Reframe: 'Invisible finish for every skin tone.' Same idea, no risk.", tone: "good", next: "s7" },
          { text: "Push it as-is. Bold works.", tone: "bad", next: "s7" },
          { text: "Bring it to your CEO, let her make the call.", tone: "neutral", next: "s7" }
        ] },
      s7: { time: "4:15 PM",
        scene: "Your bestselling face wash is out of stock in 3 major delivery zones. Ops knew last Friday and never told marketing. You've been running ads sending people to a page that says 'unavailable here.'",
        stat: { label: "Wasted ad spend", tone: "bad" },
        choices: [
          { text: "Pause those zones in ad targeting immediately, then talk to Ops.", tone: "good", next: "s8" },
          { text: "Send an angry Slack to Ops, keep the ads running.", tone: "bad", next: "s8" },
          { text: "Redirect that traffic to the sunscreen pre-order page instead.", tone: "good", next: "s8" }
        ] },
      s8: { time: "5:00 PM",
        scene: "Your CEO stops by: 'Give me the sunscreen strategy in one sentence.' You have 30 tactics running across every channel. She has 90 seconds.",
        stat: { label: "Distill the story", tone: "neutral" },
        choices: [
          { text: "'We're convincing people daily sunscreen isn't optional — it'll be what serums are today.'", tone: "good" },
          { text: "List the top 6 tactics quickly.", tone: "bad" },
          { text: "'We're going to own the sunscreen conversation online in 6 months.'", tone: "good" }
        ],
        next: (flags) => flags.rejectedAgency ? "s9_reshoot" : flags.approvedAgency ? "s9_stuck" : "s9_reshoot" },
      s9_reshoot: { time: "6:00 PM",
        scene: "Your agency comes back with a warmer, better concept — but wants $1,800 more to reshoot. Launch budget is already tight.",
        stat: { label: "Money on the line", tone: "neutral" },
        choices: [
          { text: "'Reshoot within your existing scope — this was your first delivery.'", tone: "good", next: "s10" },
          { text: "Pay the extra. This needs to be right.", tone: "neutral", next: "s10" },
          { text: "Compromise: reshoot only the main product shot, keep the rest.", tone: "good", next: "s10" }
        ] },
      s9_stuck: { time: "6:00 PM",
        scene: "The moody concept you approved this morning is now cut, printed, and about to hit paid channels tomorrow. Your junior brings you a Reddit thread — early users are calling the visuals 'depressing.' You have 18 hours to react.",
        stat: { label: "Approved too fast", tone: "bad" },
        choices: [
          { text: "Kill the launch creative tonight, negotiate an emergency reshoot at cost.", tone: "good", next: "s10" },
          { text: "Ship it as-is, plan a fun follow-up asset for week 2.", tone: "neutral", next: "s10" },
          { text: "Cut a lighter 15-sec edit yourself from extra footage tonight, lead with that.", tone: "good", next: "s10" }
        ] },
      s10: { time: "7:30 PM",
        scene: "Launch is in 12 days and four things are still unresolved. But three different people DMed you today saying your last campaign made them buy. That's feedback no dashboard shows you.",
        stat: { label: "Real feedback", tone: "good" },
        choices: [
          { text: "Screenshot the DMs, save them for next quarter.", tone: "neutral", next: "s11" },
          { text: "Reply to each personally, thank them, ask a follow-up.", tone: "good", next: "s11" },
          { text: "Forward them to the CEO to lift her mood after the numbers talk.", tone: "good", next: "s11" }
        ] },
      s11: { time: "9:15 PM",
        scene: "In a cab home, you draft tomorrow's plan on your phone. You realize you never ate lunch. Twelve days to launch. A thousand things could still go wrong. You still love this job.",
        stat: { label: "Planning on the ride home", tone: "good" },
        choices: [] }
    }
  },
  teacher: {
    intro: "You teach Grade 10 math at a public school in Chicago — 36 kids in your homeroom, plus 4 other sections. Today: quadratic equations, a topic half the class hates and one kid loves.",
    start: "s1",
    scenes: {
      s1: { time: "7:45 AM",
        scene: "Staff room, 20 minutes before class. Your co-teacher is venting — a student's parents complained about his grade, and the principal wants her to change it. You know the student. He earned that grade.",
        stat: { label: "Colleague at breaking point", tone: "bad" },
        choices: [
          { text: "'Hold the grade. I'll come with you to the principal if you want.'", tone: "good", sets: { backedColleague: true }, next: "s2" },
          { text: "'Not worth the fight. Change it and move on.'", tone: "bad", next: "s2" },
          { text: "Listen carefully, don't offer an opinion — be a friend, not an advisor.", tone: "neutral", next: "s2" }
        ] },
      s2: { time: "8:15 AM",
        scene: "Homework check. 22 kids did it, 14 didn't. Of the 14: 3 just didn't bother, 6 never do it (something's off at home), 5 tried and got stuck on one hard question.",
        stat: { label: "Class starts in 5", tone: "neutral" },
        choices: [
          { text: "Spend 10 minutes redoing that question on the board for everyone.", tone: "good", next: "s3_engaged" },
          { text: "Give the whole class the same warning: 'this is unacceptable.'", tone: "bad", next: "s3_tense" },
          { text: "Pull the 5 stuck kids aside during break, handle the rest privately.", tone: "good", next: "s3_engaged" }
        ] },
      s3_engaged: { time: "9:45 AM",
        scene: "Mid-lesson, a student asks you to re-explain something you covered 10 minutes ago. The class is with you today — no one rolls their eyes, they just wait.",
        stat: { label: "Class is with you", tone: "good" },
        choices: [
          { text: "Explain it again, differently — with a real-world example this time.", tone: "good", next: "s4" },
          { text: "Ask another student to explain it to her instead.", tone: "good", next: "s4" },
          { text: "'We covered this — see me right after class, we'll go over it.'", tone: "neutral", next: "s4" }
        ] },
      s3_tense: { time: "9:45 AM",
        scene: "You started the class on a warning. Mid-lesson, a student asks you to re-explain something you covered 10 minutes ago. Half the class visibly rolls their eyes.",
        stat: { label: "Class is on edge", tone: "bad" },
        choices: [
          { text: "Explain it again, differently — with a real-world example this time.", tone: "good", next: "s4" },
          { text: "Ask another student to explain it to her instead.", tone: "good", next: "s4" },
          { text: "'We covered this — see me right after class, we'll go over it.'", tone: "bad", next: "s4" }
        ] },
      s4: { time: "10:30 AM",
        scene: "A usually punctual student walks in 12 minutes late, no bag, red-eyed. Whole class watches.",
        stat: { label: "Something's wrong", tone: "bad" },
        choices: [
          { text: "'Come in, catch up' — pull her aside quietly during the next activity.", tone: "good", next: "s5" },
          { text: "Follow policy: 'That's a late mark, please sit down.'", tone: "bad", next: "s5" },
          { text: "Skip the moment, teach, catch her at the end of class.", tone: "neutral", next: "s5" }
        ] },
      s5: { time: "11:15 AM",
        scene: "You catch her in the corridor after class. Her parents fought again last night, she didn't sleep, she's holding it together for school. She doesn't want a counsellor and doesn't want you to call anyone.",
        stat: { label: "Trust given", tone: "neutral" },
        choices: [
          { text: "Respect what she asked — check in on her privately every day this week.", tone: "good", next: "s6" },
          { text: "Report it to the school counsellor anyway — that's the protocol.", tone: "neutral", next: "s6" },
          { text: "Offer to talk to her homeroom teacher confidentially.", tone: "good", next: "s6" }
        ] },
      s6: { time: "12:30 PM",
        scene: "Lunch. You planned to grade 40 tests. Instead a colleague vents about the new admin software, and another drops an unsigned form for a field trip you haven't reviewed.",
        stat: { label: "Lunch already gone", tone: "bad" },
        choices: [
          { text: "Eat, sign the form after reading it, grade tonight instead.", tone: "good" },
          { text: "Skip lunch, grade during the break.", tone: "neutral" },
          { text: "Eat, don't grade, don't sign. Protect your lunch.", tone: "neutral" }
        ],
        next: (flags) => flags.backedColleague ? "s7_ally" : "s7_alone" },
      s7_ally: { time: "1:30 PM",
        scene: "Your co-teacher from this morning stops by your desk. 'Principal walked it back — I told him you'd come with me. Thank you.' She leaves you a cup of coffee. Now: your top student is texting under his desk — second time this week.",
        stat: { label: "Small return", tone: "good" },
        choices: [
          { text: "Take the phone quietly, tell him to see you after class.", tone: "good", next: "s8" },
          { text: "Call him out publicly — make an example, especially since he's the top kid.", tone: "bad", next: "s8" },
          { text: "Ignore it for now, address it privately after class.", tone: "neutral", next: "s8" }
        ] },
      s7_alone: { time: "1:30 PM",
        scene: "Your top student is clearly texting under his desk — second time this week. He gets top marks without trying. You're already worn out from a morning where you kept your head down.",
        stat: { label: "Discipline call", tone: "neutral" },
        choices: [
          { text: "Take the phone quietly, tell him to see you after class.", tone: "good", next: "s8" },
          { text: "Call him out publicly — make an example, especially since he's the top kid.", tone: "bad", next: "s8" },
          { text: "Ignore it for now, address it privately after class.", tone: "neutral", next: "s8" }
        ] },
      s8: { time: "2:30 PM",
        scene: "Free period, 90 minutes. Options: grade 20 tests, prep tomorrow's lesson, or answer 8 unread parent emails.",
        stat: { label: "90 minutes, 3 things", tone: "neutral" },
        choices: [
          { text: "Prep tomorrow's lesson — teaching well tomorrow serves 180 kids.", tone: "good", next: "s9" },
          { text: "Grade 20 tests — kids and parents want scores.", tone: "neutral", next: "s9" },
          { text: "Answer parent emails — saves you trouble later.", tone: "neutral", next: "s9" }
        ] },
      s9: { time: "3:30 PM",
        scene: "School's out. 40 tests still to grade. You also promised your own kid you'd be at their football game at 5 — a 25-minute drive.",
        stat: { label: "40 tests, one football game", tone: "bad" },
        choices: [
          { text: "Grade 10 now, drive to the game, finish the rest tonight.", tone: "good", next: "s10" },
          { text: "Skip the game, finish grading.", tone: "bad", next: "s10" },
          { text: "Go to the game, grade half-heartedly during it.", tone: "bad", next: "s10" }
        ] },
      s10: { time: "5:15 PM",
        scene: "At the game, your kid scores a goal — you see it. Between plays, a parent's email pops up, complaining you're 'too harsh in grading.'",
        stat: { label: "Not now", tone: "neutral" },
        choices: [
          { text: "Put the phone away — this is your kid's moment. Reply tonight.", tone: "good", next: "s11" },
          { text: "Reply now, briefly, to defuse it.", tone: "bad", next: "s11" },
          { text: "Read it, don't reply — don't let it ruin the evening.", tone: "neutral", next: "s11" }
        ] },
      s11: { time: "9:30 PM",
        scene: "Kids asleep. 30 of 40 tests graded, one parent email still to answer. Another parent emails: 'my daughter said your class helped her finally understand math. Thank you.' You save that one.",
        stat: { label: "One good email", tone: "good" },
        choices: [
          { text: "Answer the difficult parent tonight, briefly. Finish the tests tomorrow morning.", tone: "good", next: "s12" },
          { text: "Finish the 10 tests, answer the parent tomorrow when you're less tired.", tone: "good", next: "s12" },
          { text: "Sleep. Answer everything tomorrow.", tone: "neutral", next: "s12" }
        ] },
      s12: { time: "10:45 PM",
        scene: "Lights off. Tomorrow: a new lesson, a check-in, a reply, unfinished tests. This is Wednesday — 22 more school days this term, each one like this in some shape. Somewhere out there, a kid you taught will remember you as the reason math finally made sense. You don't know who yet. You sleep.",
        stat: { label: "One day of many", tone: "neutral" },
        choices: [] }
    }
  },
  ml: {
    intro: "You're an applied ML engineer at a food delivery app in San Francisco. Your job today: fix the model that predicts delivery times. It's currently 4 minutes off on average, and customer complaints are climbing.",
    start: "s1",
    scenes: {
      s1: { time: "9:15 AM",
        scene: "You open your laptop. Last night's training run finished — the new model is 6% worse than the one already live for customers. You have no idea why. Standup is in 45 minutes and your manager will ask.",
        stat: { label: "Model got worse", tone: "bad" },
        choices: [
          { text: "Dig into the training logs now — 30 min, might spot it before standup.", tone: "good", next: "s2_diagnosed" },
          { text: "Just say 'still investigating' at standup, look properly after.", tone: "neutral", next: "s2_blind" },
          { text: "Compare the two model configs side by side. Fastest way to spot the diff.", tone: "good", next: "s2_diagnosed" }
        ] },
      s2_diagnosed: { time: "10:30 AM",
        scene: "You walked into standup with a hypothesis — and you were right. The new weather feature you added has 40% missing values for the last month. The model treats missing as zero, breaking predictions in the rain.",
        stat: { label: "Root cause found", tone: "good" },
        choices: [
          { text: "Drop the weather feature for now, retrain without it. 4 hours.", tone: "neutral", next: "s3" },
          { text: "Fill the missing values with the monthly average, retrain. 4 hours.", tone: "neutral", next: "s3" },
          { text: "Fix the data flow upstream first, then retrain. Half the day.", tone: "good", next: "s3" }
        ] },
      s2_blind: { time: "10:30 AM",
        scene: "You dodged standup with 'still investigating.' Now your manager DMs: 'PM is asking — what's the story?' You still don't know. Also, you just found it: a new weather feature has 40% missing values, and the model treats missing as zero.",
        stat: { label: "Answer under pressure", tone: "bad" },
        choices: [
          { text: "Message manager the honest root cause + 4-hour fix timeline.", tone: "good", next: "s3" },
          { text: "'It was a data issue — fixing now.' Vague, buy time.", tone: "neutral", next: "s3" },
          { text: "Drop the weather feature quietly, retrain, don't loop anyone in yet.", tone: "bad", next: "s3" }
        ] },
      s3: { time: "11:45 AM",
        scene: "Product manager pings: 'CEO wants a demo of \"how AI is improving delivery\" for investors on Friday.' Friday is 48 hours away. Your model isn't ready and you have no slides.",
        stat: { label: "Demo in 48h", tone: "bad" },
        choices: [
          { text: "'The current model is 4 min off — I can show honest before/after by Friday.'", tone: "good", next: "s4" },
          { text: "Say yes, spend tonight making a cherry-picked demo look impressive.", tone: "bad", next: "s4" },
          { text: "'I can demo the previous model's wins — the new one isn't ready.'", tone: "good", next: "s4" }
        ] },
      s4: { time: "12:30 PM",
        scene: "You check the GPU cluster. Another team is running a huge job — your retrain will queue for 3 hours. You could interrupt them (they're doing exploration, not prod) or wait.",
        stat: { label: "GPUs blocked", tone: "neutral" },
        choices: [
          { text: "Ping their team lead: 'can I jump the queue, prod issue?' — takes 5 min to ask.", tone: "good", next: "s5" },
          { text: "Wait 3 hours. Use the time to write the test script properly.", tone: "good", next: "s5" },
          { text: "Kill their job. You're on prod, they're not.", tone: "bad", next: "s5" }
        ] },
      s5: { time: "2:00 PM",
        scene: "Waiting on GPUs, you eyeball the training data. You notice deliveries in one specific zip code are labeled with times that look impossible — 2 minutes for a 4 mile ride. Someone at the ops end is gaming the numbers.",
        stat: { label: "Bad labels", tone: "bad" },
        choices: [
          { text: "Filter that zip code out and retrain. Log the finding.", tone: "neutral", next: "s6" },
          { text: "Filter it out silently. Not your problem, ops will handle it eventually.", tone: "bad", next: "s6" },
          { text: "Message the ops analytics lead: 'seeing something weird — can we talk?'", tone: "good", sets: { flaggedOps: true }, next: "s6" }
        ] },
      s6: { time: "3:15 PM",
        scene: "A junior data scientist DMs: 'quick question about my notebook — cell 14 is running for 40 min, is that normal?' It's a five-minute problem for you and she's clearly stuck. Your job is queued.",
        stat: { label: "Small interruption", tone: "neutral" },
        choices: [
          { text: "Screen share for 10 min, walk through what she's actually doing.", tone: "good", next: "s7" },
          { text: "Send her a link to the docs — you'll help properly tomorrow.", tone: "neutral", next: "s7" },
          { text: "Send a one-line hint: 'you're loading the full table into RAM — sample it.'", tone: "good", next: "s7" }
        ] },
      s7: { time: "4:30 PM",
        scene: "Retrain finishes. New model is 2.8 min off — a real improvement. But you notice on your breakdown metrics: delivery time predictions are 30% worse for deliveries after 10 PM. Late night is a small user segment. Nobody would notice.",
        stat: { label: "Hidden downgrade", tone: "bad" },
        choices: [
          { text: "Ship it — the overall number is what leadership tracks.", tone: "bad", next: "s8" },
          { text: "Don't ship. Investigate the late-night slice first, even if it takes 2 more days.", tone: "good", next: "s8" },
          { text: "Ship it behind a flag — old model for late night, new for the rest.", tone: "good", next: "s8" }
        ] },
      s8: { time: "5:45 PM",
        scene: "The late-night data has fewer riders active, so predictions are just noisier. Fixing it properly means collecting more data, or building a separate model. Neither happens today.",
        stat: { label: "No clean fix today", tone: "neutral" },
        choices: [
          { text: "Document it clearly in the launch doc, ship with the flag.", tone: "good" },
          { text: "Add a 'we're aware' note in tiny text, ship without the flag.", tone: "bad" },
          { text: "Delay launch until next week to solve it properly.", tone: "neutral" }
        ],
        next: (flags) => flags.flaggedOps ? "s9_alliance" : "s9" },
      s9: { time: "7:00 PM",
        scene: "You start writing the launch doc — what changed, how you measured it, what the risks are. Your manager pings: 'skip the doc, just push it, we'll write it up later.' 'Later' rarely happens.",
        stat: { label: "Corners to cut", tone: "neutral" },
        choices: [
          { text: "Push back: 'I'll write a short version tonight — 30 min, and it saves us later.'", tone: "good", next: "s10" },
          { text: "Skip the doc, push tonight. She's the manager.", tone: "bad", next: "s10" },
          { text: "Push the model, write the doc first thing tomorrow morning.", tone: "good", next: "s10" }
        ] },
      s9_alliance: { time: "7:00 PM",
        scene: "The ops analytics lead you messaged earlier pings back: 'You were right — we found three zip codes gaming ETAs. Owe you one.' You start the launch doc. Your manager pings: 'skip the doc, just push it, we'll write it up later.'",
        stat: { label: "Corners to cut · with backup", tone: "neutral" },
        choices: [
          { text: "Push back: 'Short version tonight — 30 min. Also looping in ops on the data issue.'", tone: "good", next: "s10" },
          { text: "Skip the doc, push tonight. She's the manager.", tone: "bad", next: "s10" },
          { text: "Push the model, write the doc first thing tomorrow — co-sign with ops.", tone: "good", next: "s10" }
        ] },
      s10: { time: "8:30 PM",
        scene: "Model is deploying. You watch the dashboards — prediction latency is fine, error rate looks fine. Ten minutes in, one metric ticks up: 'prediction failures' from 0.1% to 0.4%. Small in absolute terms. Not zero.",
        stat: { label: "Something's off", tone: "bad" },
        choices: [
          { text: "Roll back immediately. Investigate tomorrow.", tone: "neutral", next: "s11" },
          { text: "Watch for 20 more min. If it climbs, roll back. If it holds, dig in.", tone: "good", next: "s11" },
          { text: "Ping the on-call, keep the model up, split the decision.", tone: "good", next: "s11" }
        ] },
      s11: { time: "10:00 PM",
        scene: "It's a specific edge case — 'no restaurant location' orders (pickup deals) — that the new model doesn't handle. 0.4% of traffic, silently failing. A 2-line fix. Your food is getting cold on the desk.",
        stat: { label: "Two-line fix", tone: "neutral" },
        choices: [
          { text: "Fix it, ship, eat, sleep.", tone: "good", next: "s12" },
          { text: "Roll back for tonight. Fix it fresh tomorrow morning.", tone: "good", next: "s12" },
          { text: "Route those orders to the old model, ship the fix tomorrow.", tone: "good", next: "s12" }
        ] },
      s12: { time: "8:45 AM (Fri)",
        scene: "You get in. Overnight, the model shaved 1.2 min off average delivery time predictions for millions of orders. Nobody outside your team will ever notice. The CEO's demo goes fine. Somewhere across the city, a hungry person got a slightly more accurate ETA. That was your day.",
        stat: { label: "Quiet win", tone: "good" },
        choices: [] }
    }
  },
  law: {
    intro: "You're a second-year associate at a big NYC law firm, on the M&A (mergers & acquisitions) team. Your client is buying a $300M logistics company. The signing is Friday. Today: checking the target company for hidden problems, and drafting the main contract.",
    start: "s1",
    scenes: {
      s1: { time: "8:30 AM",
        scene: "You get in. The partner has forwarded a 340-page draft from the other side's lawyers at 2 AM with one line: 'Mark it up. Flag anything scary. By 6 PM.' You have ten hours to read, mark up, and think.",
        stat: { label: "340 pages", tone: "bad" },
        choices: [
          { text: "Read cover to cover, mark as you go. Slowest, safest.", tone: "neutral", next: "s2_solo" },
          { text: "Skim first, then deep-read only the risky sections (seller's promises, damages caps, closing conditions).", tone: "good", next: "s2_solo" },
          { text: "Split with the other associate on the deal — you take the seller's promises, she takes closing.", tone: "good", sets: { split: true }, next: "s2_shared" }
        ] },
      s2_solo: { time: "10:15 AM",
        scene: "You hit an escape clause (called 'material adverse change') that's oddly narrow — it excludes 'any regulatory action.' The target company is under review by the competition commission. If the review kills the deal, your client can't walk away.",
        stat: { label: "Real risk", tone: "bad" },
        choices: [
          { text: "Flag it clearly in your markup. Suggest we narrow that exception.", tone: "good", next: "s3" },
          { text: "Note it but don't push — the partner will decide.", tone: "neutral", next: "s3" },
          { text: "Mark it up aggressively and write a 1-page memo on why.", tone: "good", next: "s3" }
        ] },
      s2_shared: { time: "10:15 AM",
        scene: "Your co-associate pings: 'Seller's promises section is clean, but I'm stuck on an escape clause that excludes regulatory action — target is under antitrust review. Thoughts?' You have shared context. Fast.",
        stat: { label: "You saw it together", tone: "good" },
        choices: [
          { text: "'Flag it. Suggest we narrow it. I'll draft the language for the markup.'", tone: "good", next: "s3" },
          { text: "'Note it, let the partner decide — she may want to concede this one.'", tone: "neutral", next: "s3" },
          { text: "'Aggressive markup + I'll write the 1-page memo now.'", tone: "good", next: "s3" }
        ] },
      s3: { time: "11:30 AM",
        scene: "A first-year on the team asks you what 'reps and warranties' (the seller's promises about the company) actually means in practice. Explaining properly takes 15 minutes. She's new, and nobody explained it to you either — you learned by getting yelled at.",
        stat: { label: "Teach or push through", tone: "neutral" },
        choices: [
          { text: "Sit with her 15 min, give her the explanation you wish you got.", tone: "good", next: "s4" },
          { text: "Send her a short partner memo from an old deal — self-serve.", tone: "good", next: "s4" },
          { text: "'I'll explain over lunch, remind me.'", tone: "neutral", next: "s4" }
        ] },
      s4: { time: "12:45 PM",
        scene: "The client's top in-house lawyer calls: 'Is this deal safe to sign Friday? Board wants a yes or no.' You've been on the deal for a month. There is no clean yes. Nothing is ever fully safe.",
        stat: { label: "Client wants certainty", tone: "bad" },
        choices: [
          { text: "'It's signable, with the three points I'll email you in an hour.' Then send them.", tone: "good", next: "s5" },
          { text: "'Yes — the risks are standard for a deal this size.'", tone: "bad", next: "s5" },
          { text: "'I need to check with my partner before I give you a number.'", tone: "neutral", next: "s5" }
        ] },
      s5: { time: "1:45 PM",
        scene: "Digging through old files turns up a side letter (a separate quiet agreement) — the target promised a distributor exclusive rights for 20 years. If it's binding, it kills half the cost savings your client is paying for. Your client hasn't seen this letter.",
        stat: { label: "Deal-breaker maybe", tone: "bad" },
        choices: [
          { text: "Tell the partner immediately. Don't touch the client yet.", tone: "good", sets: { escalated: true }, next: "s6" },
          { text: "Ask the target's lawyers about it first — could be superseded.", tone: "good", next: "s6" },
          { text: "Mark up the main contract to specifically exclude it, don't raise it now.", tone: "bad", sets: { buried: true }, next: "s6" }
        ] },
      s6: { time: "3:00 PM",
        scene: "Partner reviews your work: 'Fine. Now sit in on a 30-min call about a different matter — I need someone taking notes.' Different client, different deal, no context. Your markup is 40% done.",
        stat: { label: "Not your deal", tone: "neutral" },
        choices: [
          { text: "Attend, take notes, half-work the markup in the background.", tone: "neutral", next: "s7" },
          { text: "Attend, full attention. Markup can slip an hour.", tone: "good", next: "s7" },
          { text: "'I'd love to but the markup is due at 6 — can a first-year take it?'", tone: "good", next: "s7" }
        ] },
      s7: { time: "4:30 PM",
        scene: "The other side's lawyers email: 'Your damages cap is unreasonable. If it's not raised to 30% by tomorrow morning, we walk.' They won't walk. Everyone knows they won't walk. But the email is on record.",
        stat: { label: "Posturing", tone: "neutral" },
        choices: [
          { text: "Reply calmly, restate your position, don't move.", tone: "good" },
          { text: "Call the partner — this is above your level to respond to.", tone: "good" },
          { text: "Reply with a small concession (20%) to look reasonable.", tone: "bad" }
        ],
        next: (flags) => flags.buried ? "s8_exposed" : "s8" },
      s8: { time: "5:45 PM",
        scene: "The client's top in-house lawyer calls back: 'Board is nervous — send me a one-page risk memo tonight. Plain English, no legal jargon.' You have deep drafts full of jargon. Not one page. Not plain English.",
        stat: { label: "Translate for humans", tone: "neutral" },
        choices: [
          { text: "Write from scratch — three risks, one paragraph each, no legalese.", tone: "good", next: "s9" },
          { text: "Trim your existing memo — faster, but still lawyer-y.", tone: "neutral", next: "s9" },
          { text: "Send a bullet list — top 5 risks, one line each.", tone: "good", next: "s9" }
        ] },
      s8_exposed: { time: "5:45 PM",
        scene: "The other side's lawyers found the side letter you tried to bury and just cited it in their reply. Your partner walks into your room, quiet: 'Was there a side letter I don't know about?' The board also wants a one-page risk memo tonight.",
        stat: { label: "You should've told her", tone: "bad" },
        choices: [
          { text: "'Yes — I found it this morning, I should have brought it to you. Here's what I know.'", tone: "good", next: "s9" },
          { text: "'They're overstating it — the markup handles it.'", tone: "bad", next: "s9" },
          { text: "'I flagged it in the markup. But I should have escalated. Sorry.'", tone: "good", next: "s9" }
        ] },
      s9: { time: "7:15 PM",
        scene: "You catch a typo in a definition that changes the meaning — 'net of taxes' vs 'net of tax.' Small in words, huge in dollars. It's on your side's draft. Fixing it late looks sloppy. Not fixing it might cost the client $4M.",
        stat: { label: "Your team's mistake", tone: "bad" },
        choices: [
          { text: "Flag it to the partner immediately, own it, fix it in the next markup.", tone: "good", next: "s10" },
          { text: "Quietly fix it in the next round, hope the other side doesn't notice.", tone: "bad", next: "s10" },
          { text: "Leave it — it's ambiguous either way, don't draw attention.", tone: "bad", next: "s10" }
        ] },
      s10: { time: "9:30 PM",
        scene: "The partner walks into your room, drops a stack of printouts: 'Rework the closing conditions section (what has to be true before we sign) — I don't like it. By tomorrow 9 AM.' No further guidance. It's a four-hour job.",
        stat: { label: "Vague rework", tone: "bad" },
        choices: [
          { text: "Start now, work till it's done, sleep at 2 AM.", tone: "neutral", next: "s11" },
          { text: "Ask her one clarifying question first: 'what specifically bothered you?'", tone: "good", next: "s11" },
          { text: "Do a rough version tonight, polish at 7 AM tomorrow.", tone: "good", next: "s11" }
        ] },
      s11: { time: "11:45 PM",
        scene: "You're still at your desk. You realize you haven't spoken to your family in three days. Your mother messages: 'Hey — everything okay?' You have 45 minutes of work left. She'll be asleep by then.",
        stat: { label: "Small human moment", tone: "neutral" },
        choices: [
          { text: "Call her for 5 min now — the work will wait 5 min.", tone: "good", next: "s12" },
          { text: "Reply: 'All good, will call tomorrow.' Get back to it.", tone: "neutral", next: "s12" },
          { text: "Ignore, deal with it tomorrow when you're less tired.", tone: "bad", next: "s12" }
        ] },
      s12: { time: "9:15 AM (Fri)",
        scene: "Signing day. You're in the room but you don't speak — partners speak. Documents get signed. Someone shakes hands. Your markup is somewhere in the 340 pages that just became binding on a $300M deal. In a year, if a fight breaks out over that clause you flagged, someone will pull the file and see your name on it. Or they won't, and you'll never know it mattered.",
        stat: { label: "Deal closed", tone: "good" },
        choices: [] }
    }
  },
  chef: {
    intro: "You're the head chef of a fine dining restaurant in NYC. One star. 68 diners booked tonight, including a food critic your publicist won't name. Service starts at 7. Right now it's 9 AM and nothing is prepped.",
    start: "s1",
    scenes: {
      s1: { time: "9:00 AM",
        scene: "You arrive. The fish delivery is on the counter — sea bass for tonight's main course. You smell it. It's not fresh. Your supplier of five years. 68 diners depending on this.",
        stat: { label: "Bad fish", tone: "bad" },
        choices: [
          { text: "Call the supplier, refuse the delivery, demand fresh by 2 PM.", tone: "good", next: "s2_wait" },
          { text: "Accept it, cook it hotter to hide it. Nobody will know.", tone: "bad", next: "s2_hidden" },
          { text: "Refuse it. Redesign the main course around what's already in the walk-in fridge.", tone: "good", next: "s2_pivot" }
        ] },
      s2_wait: { time: "10:15 AM",
        scene: "Supplier promised fresh by 2 PM, docked from the invoice. Now your sous chef (your #2 in the kitchen) doesn't show up. Doesn't answer his phone. Six hours of prep, no one to do it. You're already down a delivery.",
        stat: { label: "Sous chef MIA", tone: "bad" },
        choices: [
          { text: "Redistribute across your junior cooks. Cover his stations yourself if needed.", tone: "good", next: "s3" },
          { text: "Call your former sous chef who owes you a favor — beg her to come in for one night.", tone: "good", next: "s3" },
          { text: "Simplify the menu. Kill two dishes. Nobody notices what's not there.", tone: "neutral", next: "s3" }
        ] },
      s2_hidden: { time: "10:15 AM",
        scene: "The fish is in the walk-in fridge. Your sous chef doesn't show up. Doesn't answer his phone. Six hours of prep, no one to do it — and you've got 68 diners riding on fish you know isn't right.",
        stat: { label: "Two problems, one lie", tone: "bad" },
        choices: [
          { text: "Come to your senses — refuse the fish now, redesign around the walk-in fridge, redistribute prep.", tone: "good", next: "s3" },
          { text: "Push through: cover the sous chef's stations yourself, hope the fish holds.", tone: "bad", next: "s3" },
          { text: "Kill the fish dish AND two others. Tight, honest menu tonight.", tone: "neutral", next: "s3" }
        ] },
      s2_pivot: { time: "10:15 AM",
        scene: "You've redesigned around the walk-in fridge — a lamb main instead. Then your sous chef doesn't show up. Doesn't answer his phone. He was supposed to do the starter bites, pasta, and two sauces.",
        stat: { label: "Sous chef MIA", tone: "bad" },
        choices: [
          { text: "Redistribute across your junior cooks. Cover his stations yourself if needed.", tone: "good", next: "s3" },
          { text: "Call your former sous chef who owes you a favor — beg her to come in for one night.", tone: "good", next: "s3" },
          { text: "Simplify further. Two mains only tonight. Cleanest menu wins.", tone: "neutral", next: "s3" }
        ] },
      s3: { time: "11:30 AM",
        scene: "The owner drops by: 'A regular is bringing his wife tonight — she's celiac. And there's a VIP couple on table 4, big Instagram, must impress. Also, six of tonight's tables want the tasting menu.' None of this was on the sheet.",
        stat: { label: "Owner surprises", tone: "bad" },
        choices: [
          { text: "Design a gluten-free version of every course, tonight, for one table.", tone: "neutral", next: "s4" },
          { text: "Simplify: pick 3 courses she can eat, offer them plated separately.", tone: "good", next: "s4" },
          { text: "Refuse the tasting menu overloads, take the celiac, ignore the Insta pressure.", tone: "bad", next: "s4" }
        ] },
      s4: { time: "12:45 PM",
        scene: "You catch your youngest cook slicing garlic while checking his phone. He nicks his thumb — deep. Not disfiguring, but he's bleeding on the board. Two hours from service. He's your only garlic prep.",
        stat: { label: "Blood on the board", tone: "bad" },
        choices: [
          { text: "Send him to the pharmacy, bandage properly, back in 45 min if he can hold a knife.", tone: "good", sets: { caredForCook: true }, next: "s5" },
          { text: "Bandage him yourself, back to the station in 15 min.", tone: "neutral", next: "s5" },
          { text: "Send him home. Take his prep yourself, add 2 hours to your day.", tone: "neutral", next: "s5" }
        ] },
      s5: { time: "2:00 PM",
        scene: "Yesterday's Zomato review lands: 3 stars, 'overrated, cold pasta, rude waiter.' Written by someone who was at table 12. You remember table 12 — the pasta was returned once and remade. Your team did nothing wrong.",
        stat: { label: "Unfair review", tone: "bad" },
        choices: [
          { text: "Reply politely, apologise, offer to invite him back for dinner on the house.", tone: "good", next: "s6" },
          { text: "Reply publicly, defend the team, correct the record.", tone: "bad", next: "s6" },
          { text: "Ignore it. Focus on tonight.", tone: "neutral", next: "s6" }
        ] },
      s6: { time: "3:30 PM",
        scene: "Fresh fish arrives — but only 12 kg. You need 15. Enough for 60 of 68 diners, if you plate small. The alternative is switching 8 diners to a different main mid-service.",
        stat: { label: "12 kg for 68", tone: "bad" },
        choices: [
          { text: "Plate slightly smaller across the board. Nobody notices 15%.", tone: "neutral", next: "s7" },
          { text: "Offer the last 8 diners a free upgrade to the chef's tasting menu instead.", tone: "good", next: "s7" },
          { text: "Reserve the fish for the tasting-menu tables and VIPs, put the rest on chicken.", tone: "neutral", next: "s7" }
        ] },
      s7: { time: "5:00 PM",
        scene: "Family meal (the staff meal before service) — you feed your team. Morale is low: everyone knows about the sous chef. You sit down with them for 15 minutes. This is the last calm moment of the day.",
        stat: { label: "Team is watching", tone: "neutral" },
        choices: [
          { text: "Address it head-on: 'One down, we cover for each other, we serve 68 tonight.'", tone: "good" },
          { text: "Say nothing. Eat. Move on. They know the drill.", tone: "neutral" },
          { text: "Ask each cook: 'anything you need from me tonight?' Then answer.", tone: "good" }
        ],
        next: (flags) => flags.caredForCook ? "s8_backed" : "s8" },
      s8: { time: "7:45 PM",
        scene: "45 minutes into service. Tickets are stacking. You spot a plate about to leave — the sauce is broken, splitting on the plate. The waiter is already reaching for it.",
        stat: { label: "Split sauce", tone: "bad" },
        choices: [
          { text: "'Stop.' Take the plate back, remake in 4 minutes. Table waits.", tone: "good", next: "s9" },
          { text: "Wipe the split, send it. Table won't notice.", tone: "bad", next: "s9" },
          { text: "Send it, warn the waiter to plate it in front of the guest so they see it fresh.", tone: "bad", next: "s9" }
        ] },
      s8_backed: { time: "7:45 PM",
        scene: "45 minutes into service. Your youngest cook — bandaged thumb and all — is holding garlic and sauce station like he's got something to prove. He catches a splitting sauce before it leaves the kitchen. 'Chef, this one's off.' You didn't have to see it.",
        stat: { label: "Team caught it", tone: "good" },
        choices: [
          { text: "'Good eye. Remake it. Four minutes.'", tone: "good", next: "s9" },
          { text: "Take it over yourself, remake it faster.", tone: "neutral", next: "s9" },
          { text: "'Send it — table won't notice.'", tone: "bad", next: "s9" }
        ] },
      s9: { time: "9:00 PM",
        scene: "Table 4 (the Insta VIPs) sends the fish back: 'too salty.' You taste the pan sauce. It's fine — dry-aged fish tastes more mineral, it's not saltiness. But they're the customer.",
        stat: { label: "Not actually wrong", tone: "neutral" },
        choices: [
          { text: "Send out a new course, apologise, take the dish off the bill.", tone: "good", next: "s10" },
          { text: "Come out yourself, explain the flavour, offer to remake.", tone: "good", next: "s10" },
          { text: "Remake it milder, don't argue, keep the ticket moving.", tone: "neutral", next: "s10" }
        ] },
      s10: { time: "10:30 PM",
        scene: "Two hours in, still 22 diners to go. Table 9 — you think the critic — has ordered the tasting menu. Every course out of that kitchen for the next 90 minutes goes to that table. You could plate them yourself.",
        stat: { label: "Critic's tasting", tone: "neutral" },
        choices: [
          { text: "Plate every course yourself. Slower service for other tables.", tone: "neutral", next: "s11" },
          { text: "Trust your cooks — check each plate before it leaves the kitchen.", tone: "good", next: "s11" },
          { text: "Plate the two showpiece courses yourself, let cooks handle the rest.", tone: "good", next: "s11" }
        ] },
      s11: { time: "12:15 AM",
        scene: "Last table left 20 minutes ago. Kitchen closed. You debrief the team — 4 minutes, standing up. One cook is nearly crying (overcooked a duck). One is grinning (nailed his first solo sauce).",
        stat: { label: "Debrief", tone: "neutral" },
        choices: [
          { text: "Praise the win publicly, take the cook with the mistake aside privately.", tone: "good", next: "s12" },
          { text: "Address everything to the whole team, honest, no favourites.", tone: "neutral", next: "s12" },
          { text: "Just say 'good service, get home safe' — full debrief tomorrow.", tone: "neutral", next: "s12" }
        ] },
      s12: { time: "1:40 AM",
        scene: "You lock up. On the cab ride home you check Instagram — the VIP table posted the fish course. 'Best in the city.' No mention of sending it back. You laugh once, quietly. Tomorrow: prep at 9, brunch at noon, dinner at 7. Six more days like this before your one day off. You wouldn't trade it for anything, most days.",
        stat: { label: "Service done", tone: "good" },
        choices: [] }
    }
  },
  architect: {
    intro: "You're a young architect at a small studio in Portland. Today's job: design a library for a rural elementary school. Kids will use it for the next 30 years. The plot is small. The budget is small. What you draw will really get built.",
    start: "s1",
    scenes: {
      s1: { time: "8:30 AM",
        scene: "You open the file. One line from the client: 'Please design a library for our kids.' You have the plot size and one photo. That's it.",
        stat: { label: "Cold start", tone: "neutral" },
        choices: [
          { text: "Drive out to the school first. Half a day gone, but you'll see the site.", tone: "good", sets: { visited: true }, next: "s2_site" },
          { text: "Start sketching at your desk. You've done libraries before.", tone: "neutral", next: "s2_desk" },
          { text: "Call the school principal for 30 min. Ask what kids actually need.", tone: "good", sets: { asked: true }, next: "s2_desk" }
        ] },
      s2_site: { time: "11:30 AM",
        scene: "You're at the school. Kids show you where they read now — under a big oak tree. Cool in the shade, hot in the sun, dust everywhere. There's no other quiet corner in the school.",
        stat: { label: "You've seen it", tone: "good" },
        choices: [
          { text: "Design a low building next to the tree. Use it for shade.", tone: "good", next: "s3" },
          { text: "Design a tall two-floor building on the far side. More space.", tone: "neutral", next: "s3" },
          { text: "Design an open room with one open side — like sitting under the tree.", tone: "good", next: "s3" }
        ] },
      s2_desk: { time: "10:00 AM",
        scene: "You sketch. Nice square building, big windows, tiled roof. Looks good on paper. But you don't really know if kids will want to sit inside it.",
        stat: { label: "Nice on paper", tone: "neutral" },
        choices: [
          { text: "Ship the sketch. Deadline is tight.", tone: "bad", next: "s3" },
          { text: "Stop. Drive out to the site tomorrow morning.", tone: "good", sets: { visited: true }, next: "s3" },
          { text: "Email the sketch to the school first. Wait for a reaction.", tone: "neutral", next: "s3" }
        ] },
      s3: { time: "1:00 PM",
        scene: "The plot has two old trees on it. Cutting them means a bigger, easier building. Keeping them means designing around their shape.",
        stat: { label: "Trees or space", tone: "neutral" },
        choices: [
          { text: "Cut both. Cleaner design. More room inside.", tone: "bad", next: "s4" },
          { text: "Keep both. Build around them — free natural shade.", tone: "good", next: "s4" },
          { text: "Keep the big one, cut the small one.", tone: "neutral", next: "s4" }
        ] },
      s4: { time: "2:30 PM",
        scene: "Your senior peeks at the drawing: 'Nice, but is this what a 7-year-old wants, or what an award jury wants?' It's a real question.",
        stat: { label: "Who is this for?", tone: "neutral" },
        choices: [
          { text: "Redraw with small doors, low shelves, a soft floor. Built for kids.", tone: "good", next: "s5" },
          { text: "Keep it. It's already good architecture.", tone: "neutral", next: "s5" },
          { text: "Add a small kid-height reading nook, keep the rest.", tone: "good", next: "s5" }
        ] },
      s5: { time: "3:30 PM",
        scene: "Time to pick a roof. Three choices fit the budget.",
        stat: { label: "Roof choice", tone: "neutral" },
        choices: [
          { text: "Concrete slab. Lasts 40 years. Gets hot inside in summer.", tone: "neutral", next: "s6" },
          { text: "Sloped tin roof with a wood ceiling. Cooler. Needs repair every 5 years.", tone: "good", next: "s6" },
          { text: "Sloped clay tile. Cool and beautiful. Costs 15% more.", tone: "neutral", next: "s6" }
        ] },
      s6: { time: "4:30 PM",
        scene: "Client sends a message: 'Can we also add a small computer room?' No extra budget. No extra space in your plan.",
        stat: { label: "New ask", tone: "bad" },
        choices: [
          { text: "Squeeze it in. Three computers in one corner.", tone: "neutral", next: "s7" },
          { text: "Reply: 'Let's build the library first. Add computers in phase 2.'", tone: "good", next: "s7" },
          { text: "Reply: 'Yes, but we'd have to drop the reading porch. Your call.'", tone: "good", next: "s7" }
        ] },
      s7: { time: "5:45 PM",
        scene: "The engineer checks your drawing. 'Walls are too thin for the roof you picked.' Thicker walls means 8% less room inside.",
        stat: { label: "Engineer says no", tone: "bad" },
        choices: [
          { text: "Trust her. Thicker walls, smaller room.", tone: "good", next: "s8" },
          { text: "Change to a lighter roof so walls can stay thin.", tone: "good", next: "s8" },
          { text: "Argue — you've seen thinner walls hold this roof before.", tone: "bad", next: "s8" }
        ],
        next: (flags) => flags.visited ? "s8_saw" : (flags.asked ? "s8_heard" : "s8_blind") },
      s8_saw: { time: "6:45 PM",
        scene: "You remember one thing from the site visit — a small kid asked you, 'Sir, will there be a window we can see the tree from?' Easy to forget on paper.",
        stat: { label: "The kid's question", tone: "good" },
        choices: [
          { text: "Add a big low window facing the tree. Kid-height.", tone: "good", next: "s9" },
          { text: "Note it in the file for later. Focus on the main drawing.", tone: "neutral", next: "s9" },
          { text: "Design the whole reading corner around that one window.", tone: "good", next: "s9" }
        ] },
      s8_heard: { time: "6:45 PM",
        scene: "You remember something from the principal's call — power gets flaky every afternoon in summer storms. Your current design has one small window. It'll be dark by 3 PM inside.",
        stat: { label: "Unreliable power", tone: "bad" },
        choices: [
          { text: "Add three more big windows. Redo the light plan.", tone: "good", next: "s9" },
          { text: "Add a skylight over the reading area.", tone: "good", next: "s9" },
          { text: "Leave it. Kids can go outside if it gets dark.", tone: "bad", next: "s9" }
        ] },
      s8_blind: { time: "6:45 PM",
        scene: "You realise you never checked which way the sun hits the plot. The reading wall might get harsh afternoon sun straight on it.",
        stat: { label: "You skipped the site", tone: "bad" },
        choices: [
          { text: "Stop. Check the map, rotate the design.", tone: "good", next: "s9" },
          { text: "Ship as-is. Deadline is close.", tone: "bad", next: "s9" },
          { text: "Add a shade wall on the west side.", tone: "neutral", next: "s9" }
        ] },
      s9: { time: "8:00 PM",
        scene: "Ready to send. One design or three?",
        stat: { label: "How much choice", tone: "neutral" },
        choices: [
          { text: "One clear design. Confident.", tone: "good", next: "s10" },
          { text: "Three options — let the client pick.", tone: "neutral", next: "s10" },
          { text: "Two — the one you love and a cheaper backup.", tone: "good", next: "s10" }
        ] },
      s10: { time: "9:00 PM",
        scene: "Video call with the client. He loves the design. Then: 'Can you put my name on the front wall? Big letters.'",
        stat: { label: "The client is happy", tone: "neutral" },
        choices: [
          { text: "Say yes. He's paying.", tone: "bad", next: "s11" },
          { text: "Say no, kindly: 'This is the kids' library — no names on it.'", tone: "good", next: "s11" },
          { text: "Offer a small plaque near the door instead.", tone: "good", next: "s11" }
        ] },
      s11: { time: "10:15 PM",
        scene: "You send the final drawings. Building starts in a month. You won't be there every day. Small mistakes will happen — a wall slightly off, wrong tile colour. You'll see this building every time you drive past for the rest of your life.",
        stat: { label: "Handoff", tone: "neutral" },
        choices: [
          { text: "Plan two site visits during construction. Your time, unpaid.", tone: "good", next: "s12" },
          { text: "Trust the contractor. Move to the next project.", tone: "neutral", next: "s12" },
          { text: "Ask a junior to visit weekly and send photos.", tone: "good", next: "s12" }
        ] },
      s12: { time: "2 years later",
        scene: "You drive past. The library is there. Kids inside, reading. One window is smaller than you drew — the contractor changed it. Someone painted a mural you never designed. It's not exactly your building. But it's a real place, and 40 kids read in it every day. This is the job.",
        stat: { label: "Built", tone: "good" },
        choices: [] }
    }
  },
  econ: {
    intro: "You're a young economist at the Federal Reserve in Washington, D.C. Today: egg prices jumped 60% in one month. Your boss wants a short note by 6 PM — why it happened, and what to do. Millions of families are feeling this at the grocery store.",
    start: "s1",
    scenes: {
      s1: { time: "9:00 AM",
        scene: "Two data files land in your inbox. One from farmers, one from wholesale markets. Boss's message: 'Note by 6 PM.' You have 9 hours.",
        stat: { label: "Where to start", tone: "neutral" },
        choices: [
          { text: "Read every file top to bottom before touching a spreadsheet.", tone: "neutral", next: "s2" },
          { text: "Open the data, start making charts right away.", tone: "good", next: "s2" },
          { text: "Call one farmer and one trader first. Real voices before numbers.", tone: "good", sets: { talked: true }, next: "s2" }
        ] },
      s2: { time: "10:30 AM",
        scene: "You spot the pattern. Prices went up in September, mostly in the Midwest. Two easy stories fit — a bird flu outbreak, or wholesalers holding back supply. Numbers alone can't tell you which.",
        stat: { label: "Two stories", tone: "neutral" },
        choices: [
          { text: "Pick 'bird flu.' It's the safe answer, mostly right in past years.", tone: "bad", next: "s3" },
          { text: "Write both stories. Say 'we need more info to be sure.'", tone: "good", next: "s3" },
          { text: "Spend 30 min pulling real outbreak data from the USDA.", tone: "good", sets: { checked: true }, next: "s3" }
        ] },
      s3: { time: "12:00 PM",
        scene: "Boss walks past: 'By the way — the Treasury Secretary might mention eggs in a press conference tomorrow. Your note may go up the chain.' No pressure changes the truth. But it changes how carefully you write.",
        stat: { label: "It might go to the top", tone: "neutral" },
        choices: [
          { text: "Same note. Truth is truth.", tone: "good", next: "s4" },
          { text: "Soften it. Don't upset anyone.", tone: "bad", next: "s4" },
          { text: "Same note, plus a 3-line summary at the top for a busy reader.", tone: "good", next: "s4" }
        ] },
      s4: { time: "1:30 PM",
        scene: "Lunch. A senior tells you: 'Last year the government asked us to call inflation \"temporary.\" It wasn't. We looked bad.' You'll get the same pressure to sound calm this time.",
        stat: { label: "Sound calm or be right", tone: "bad" },
        choices: [
          { text: "Write 'temporary' if that's what they want.", tone: "bad", next: "s5" },
          { text: "Write what the data says — 'likely high for 3 months.'", tone: "good", next: "s5" },
          { text: "Show two paths — 'if X, temporary; if Y, longer.' Let the reader pick.", tone: "good", next: "s5" }
        ] },
      s5: { time: "3:00 PM",
        scene: "You need one number: how much will eggs push overall prices up next month? Your model gives a range: 0.3% to 0.8%. Small numbers, big country.",
        stat: { label: "Pick a number", tone: "neutral" },
        choices: [
          { text: "Pick 0.5%, the middle. Simple.", tone: "good", next: "s6" },
          { text: "Show the full range. Honest about what we don't know.", tone: "good", next: "s6" },
          { text: "Pick 0.3%. Sounds better in headlines.", tone: "bad", next: "s6" }
        ] },
      s6: { time: "4:00 PM",
        scene: "You spot something odd. The producer file shows egg inventories (how much is stored) are actually normal. So supply isn't really down. Prices went up because wholesalers got nervous. That's a completely different story.",
        stat: { label: "The story just changed", tone: "bad" },
        choices: [
          { text: "Rewrite the whole note with the new story. 2 hours of work.", tone: "good", next: "s7" },
          { text: "Add a short paragraph about wholesalers. Keep the main story.", tone: "neutral", next: "s7" },
          { text: "Ignore it. One file could be wrong. Stay with bird flu.", tone: "bad", next: "s7" }
        ] },
      s7: { time: "5:00 PM",
        scene: "Boss reads a draft: 'The recommendation is missing. What should we actually do?' You have to suggest an action.",
        stat: { label: "Recommend something", tone: "neutral" },
        choices: [
          { text: "'Let it settle. Prices usually come back in 2 months.'", tone: "neutral", next: "s8" },
          { text: "'Government should release stored eggs from strategic reserves this week.'", tone: "good", next: "s8" },
          { text: "'We need one more week to decide.'", tone: "bad", next: "s8" }
        ],
        next: (flags) => flags.talked ? "s8_voices" : "s8_solo" },
      s8_voices: { time: "5:45 PM",
        scene: "You have real quotes from your morning calls. One farmer told you: 'We get 50 cents. Stores sell at $4. The middlemen are eating the gap.' That one line makes the note come alive.",
        stat: { label: "Real voice", tone: "good" },
        choices: [
          { text: "Add the quote to the note. A human voice in a policy paper.", tone: "good", next: "s9" },
          { text: "Keep it academic. Quotes look unprofessional.", tone: "neutral", next: "s9" },
          { text: "Put the quote in the top summary. Hits harder there.", tone: "good", next: "s9" }
        ] },
      s8_solo: { time: "5:45 PM",
        scene: "You look back and realise you never spoke to a single actual farmer or trader today. Your note is fully from spreadsheets. It reads a bit dry.",
        stat: { label: "All spreadsheet, no people", tone: "neutral" },
        choices: [
          { text: "Call one farmer now, quickly. Add one line.", tone: "good", next: "s9" },
          { text: "Ship as-is. You're an economist, not a journalist.", tone: "neutral", next: "s9" },
          { text: "Ask a colleague to read the tone before you send.", tone: "good", next: "s9" }
        ] },
      s9: { time: "6:30 PM",
        scene: "You send. Twenty minutes later, a senior messages: 'One page. Plain English. For the Secretary.' It's 6:50 PM. Your draft is full of jargon.",
        stat: { label: "Surprise ask", tone: "bad" },
        choices: [
          { text: "Rewrite carefully yourself. 90 minutes.", tone: "good", next: "s10" },
          { text: "Ask a comms colleague to help translate the jargon. You polish the substance.", tone: "good", next: "s10" },
          { text: "Ship a rough plain-English version. Fix tomorrow.", tone: "bad", next: "s10" }
        ] },
      s10: { time: "9:15 PM",
        scene: "On the subway home you see a woman arguing with a grocery cashier: '$8 for a dozen eggs? Are you serious?' The cashier just shrugs. This is exactly why your note matters.",
        stat: { label: "Real life", tone: "neutral" },
        choices: [
          { text: "Note it down for tomorrow. Real colour helps future writing.", tone: "good", next: "s11" },
          { text: "Just look out the window. You're off the clock.", tone: "neutral", next: "s11" },
          { text: "Message your boss: 'Just saw a real fight over egg prices. This is the story.'", tone: "neutral", next: "s11" }
        ] },
      s11: { time: "8:00 AM (Wed)",
        scene: "Boss messages: 'The Treasury Secretary used one line from your note in her press conference this morning.' You watch the clip. Your sentence, in her mouth, on national TV. No one knows it was you.",
        stat: { label: "Anonymous impact", tone: "good" },
        choices: [
          { text: "Screenshot it. Save it for yourself.", tone: "good", next: "s12" },
          { text: "Post it on LinkedIn. Take the credit.", tone: "bad", next: "s12" },
          { text: "Do nothing. The work is the reward.", tone: "neutral", next: "s12" }
        ] },
      s12: { time: "9:30 AM",
        scene: "You get to your desk. Egg prices are still high. Your note nudged one decision. It didn't fix the country. It probably won't next month either. But some small policy will move because someone somewhere read the range you calculated. This is the job.",
        stat: { label: "Day 2", tone: "good" },
        choices: [] }
    }
  },
  consult: {
    intro: "You're a first-year associate at a top strategy consulting firm, on-site with a struggling retail chain in NYC. They're losing $10M a month. Your team of 4 has 3 weeks to tell them why and what to do. Today is day 6.",
    start: "s1",
    scenes: {
      s1: { time: "8:30 AM",
        scene: "Manager pings: 'store-level profitability model by 10 AM — CFO at 11.' You have sales data. No cost data. No template.",
        stat: { label: "90 min, no data", tone: "bad" },
        choices: [
          { text: "Build with rough cost assumptions. Flag them clearly.", tone: "good", next: "s2" },
          { text: "Push back: '11 is unrealistic. Honest version by 2 PM.'", tone: "good", next: "s2" },
          { text: "Ask client's finance team for a cost dump. Wait.", tone: "bad", next: "s2" }
        ] },
      s2: { time: "10:00 AM",
        scene: "Numbers land. 42 stores losing money — but 12 opened this year, losses are normal. Show all 42, you spook the client. Hide the 12, you're hiding data.",
        stat: { label: "Story vs. truth", tone: "neutral" },
        choices: [
          { text: "Show all 42. Tag the 12 new stores separately.", tone: "good", next: "s3_honest" },
          { text: "Show only the 30 mature stores. Cleaner story.", tone: "bad", next: "s3_challenged" },
          { text: "Show all 42, no tags. Let the CFO ask.", tone: "neutral", next: "s3_challenged" }
        ] },
      s3_honest: { time: "11:15 AM",
        scene: "CFO studies your slide, nods. 'Thanks for separating new stores — most of your predecessors didn't.' Then: 'one store's totals don't match what my team sent last week.'",
        stat: { label: "Trust earned", tone: "good" },
        choices: [
          { text: "'Good catch — I'll reconcile with your team right after.'", tone: "good", next: "s4" },
          { text: "'Data-input issue on our side. I'll fix it today.'", tone: "good", next: "s4" },
          { text: "Defend the number hard — you know your reconciliation.", tone: "bad", next: "s4" }
        ] },
      s3_challenged: { time: "11:15 AM",
        scene: "CFO interrupts your slide: 'These numbers are wrong. My finance team gave me different totals last week.' Room goes quiet. Manager looks at you.",
        stat: { label: "Client pushback", tone: "bad" },
        choices: [
          { text: "'These are what your team sent Monday — happy to reconcile right after.'", tone: "good", next: "s4" },
          { text: "'Let me re-verify and come back this afternoon.'", tone: "good", next: "s4" },
          { text: "Defend the numbers hard — you know they're right.", tone: "bad", next: "s4" }
        ] },
      s4: { time: "12:30 PM",
        scene: "Lunch. Client's ops head sits next to you, venting: 'consultants never understand ground reality.' He's the gatekeeper you most need. Hasn't given you time yet.",
        stat: { label: "The gatekeeper", tone: "neutral" },
        choices: [
          { text: "Listen. Ask about his 20 years in retail. Don't sell anything.", tone: "good", sets: { earnedOps: true }, next: "s5" },
          { text: "Politely explain your methodology — show you get it.", tone: "bad", next: "s5" },
          { text: "Ask for 30 min this week to actually learn from him.", tone: "good", sets: { earnedOps: true }, next: "s5" }
        ] },
      s5: { time: "2:00 PM",
        scene: "3 store visits scheduled. Manager wants you back to fix the CFO's slides. You can only do one.",
        stat: { label: "Slides vs. stores", tone: "neutral" },
        choices: [
          { text: "Visit one store, take detailed notes, do slides tonight.", tone: "good", next: "s6" },
          { text: "Skip the visits, fix the slides — manager first.", tone: "neutral", next: "s6" },
          { text: "Send a junior on the visits, do the slides yourself.", tone: "good", next: "s6" }
        ] },
      s6: { time: "3:30 PM",
        scene: "45 min watching a 'loss-making' store. It's packed. Half the customers walk out — only one checkout counter open. Won't show up in any spreadsheet.",
        stat: { label: "Real insight", tone: "good" },
        choices: [
          { text: "Photograph everything. Count walkouts for 30 min. Real data.", tone: "good", next: "s7" },
          { text: "Note it, move on — one store isn't enough.", tone: "neutral", next: "s7" },
          { text: "Ask the store manager: 'why one counter?'", tone: "good", next: "s7" }
        ] },
      s7: { time: "5:00 PM",
        scene: "Back at the client office. Your junior — day 4 on her first project — hands you her analysis. Whole framework is off. Presenting it would embarrass her and the team.",
        stat: { label: "First-week junior", tone: "neutral" },
        choices: [
          { text: "Sit with her, walk through it, redo it together in 45 min.", tone: "good" },
          { text: "Redo it yourself tonight, show her tomorrow.", tone: "neutral" },
          { text: "Point out the flaw, let her redo it.", tone: "neutral" }
        ],
        next: (flags) => flags.earnedOps ? "s8_intel" : "s8" },
      s8: { time: "6:30 PM",
        scene: "Manager pings: 'partner tomorrow at 9 — walkthrough of week 1 findings. 15 slides. Story-first. By midnight.'",
        stat: { label: "Partner tomorrow", tone: "bad" },
        choices: [
          { text: "Draft the story on paper first — 30 min — before opening PowerPoint.", tone: "good", next: "s9" },
          { text: "Open PowerPoint, start with data, build slides as you go.", tone: "bad", next: "s9" },
          { text: "Reuse last week's deck as scaffold. Update numbers.", tone: "neutral", next: "s9" }
        ] },
      s8_intel: { time: "6:30 PM",
        scene: "Ops head emails: five bullets, 20 years of pattern recognition. 'Two of your ideas we've tried. One we haven't.' Manager pings: 'partner tomorrow at 9 — 15 slides, by midnight.'",
        stat: { label: "Real ammunition", tone: "good" },
        choices: [
          { text: "Draft the story on paper — his framing plus your store data.", tone: "good", next: "s9" },
          { text: "Open PowerPoint, start with data, build slides as you go.", tone: "bad", next: "s9" },
          { text: "Lead with his 'we haven't tried this' idea — anchor the deck on it.", tone: "good", next: "s9" }
        ] },
      s9: { time: "8:15 PM",
        scene: "Mid-slide. CFO's assistant emails: 'CFO wants 8 AM call before your partner meeting.' 8 AM means partner briefing at 7. Deck finishes at 11 PM.",
        stat: { label: "Squeezed", tone: "bad" },
        choices: [
          { text: "Warn your manager tonight — she'll want to prep at 7 AM.", tone: "good", next: "s10" },
          { text: "Handle the CFO call yourself. Don't mention it.", tone: "bad", next: "s10" },
          { text: "Ask manager to take the CFO call so you can finish the deck.", tone: "neutral", next: "s10" }
        ] },
      s10: { time: "10:00 PM",
        scene: "Hotel. Your headline — 'checkout capacity is the bottleneck' — is based on one store visit. True, but not enough to prove to a skeptical CFO.",
        stat: { label: "One data point", tone: "neutral" },
        choices: [
          { text: "Frame it as a hypothesis to test in week 2. Not a conclusion.", tone: "good", next: "s11" },
          { text: "Present it as a finding — you saw it, you know it's right.", tone: "bad", next: "s11" },
          { text: "Cut it. Only include what you can fully prove.", tone: "bad", next: "s11" }
        ] },
      s11: { time: "11:45 PM",
        scene: "Deck sent. Manager replies in 4 minutes: 'Slide 7 is buried — that's your best insight. Move it up. Rework the flow.' 15 hours in. Another 45 minutes.",
        stat: { label: "One more edit", tone: "bad" },
        choices: [
          { text: "Do it. She's right, it's a better deck.", tone: "good", next: "s12" },
          { text: "Push back: 'It's fine — CFO likes context first.'", tone: "bad", next: "s12" },
          { text: "Move the slide, skip the flow rework. Half-do it, ship.", tone: "neutral", next: "s12" }
        ] },
      s12: { time: "7:00 AM (Sat)",
        scene: "Briefing your partner in the hotel lobby over black coffee. She flips through in 90 seconds: 'good — but cut slides 3 and 4, they're weak.' You spent four hours on those two slides. She's right. This is the job.",
        stat: { label: "Day 7 begins", tone: "neutral" },
        choices: [] }
    }
  },
  quant: {
    intro: "You're new at a small trading firm in NYC. Your job: write code that uses math to trade stocks. Today your boss wants you to test one small idea with a little real money.",
    start: "s1",
    scenes: {
      s1: { time: "9:00 AM",
        scene: "You get in early. Boss messages: 'Try one small idea today. Use only a little money. Show me by 5 PM.' Market opens in 30 minutes.",
        stat: { label: "Where to start?", tone: "neutral" },
        choices: [
          { text: "Ask a senior teammate: 'What kind of ideas work here?'", tone: "good", sets: { asked: true }, next: "s2" },
          { text: "Open old stock data and start hunting for patterns.", tone: "good", next: "s2" },
          { text: "Read the morning news first — ideas start there.", tone: "neutral", next: "s2" }
        ] },
      s2: { time: "9:30 AM",
        scene: "Market opens. You spot something: a small stock often jumps 15 minutes after a bigger stock jumps. Maybe a real pattern. Maybe just luck.",
        stat: { label: "Maybe a pattern", tone: "neutral" },
        choices: [
          { text: "Test it on 2 years of past data. Takes 1 hour.", tone: "good", next: "s3_careful" },
          { text: "Test only on last week. Faster — 15 minutes.", tone: "bad", next: "s3_rushed" },
          { text: "Trade a tiny amount right now to see what happens.", tone: "bad", next: "s3_rushed" }
        ] },
      s3_careful: { time: "11:00 AM",
        scene: "You tested on 2 years. It worked 58% of the time. Not amazing, but real. You feel good about the numbers.",
        stat: { label: "Real signal", tone: "good" },
        choices: [
          { text: "Write clean code so tomorrow you can run it faster.", tone: "good", next: "s4" },
          { text: "Skip to trading — you did the homework.", tone: "neutral", next: "s4" },
          { text: "Show your test to a senior before risking money.", tone: "good", next: "s4" }
        ] },
      s3_rushed: { time: "11:00 AM",
        scene: "The rushed test showed 71% wins — but only on 12 trades. That's too small to trust. Your gut wants to trade. Your math says you don't really know yet.",
        stat: { label: "Test too small", tone: "bad" },
        choices: [
          { text: "Go back and test properly. 45 minutes lost, but safer.", tone: "good", next: "s4" },
          { text: "Trust the small test. Trade a tiny amount.", tone: "bad", next: "s4" },
          { text: "Ask senior: 'Is 12 trades enough to trust?'", tone: "good", next: "s4" }
        ] },
      s4: { time: "12:15 PM",
        scene: "Time to decide how much money. You have $5,000 to play with today. First real trade. Real losses. Real gains.",
        stat: { label: "How much?", tone: "neutral" },
        choices: [
          { text: "Start with $500. Small feels safe.", tone: "good", next: "s5" },
          { text: "Go big — full $5,000. If it works, huge win.", tone: "bad", next: "s5" },
          { text: "$1,500 — big enough to matter, small enough to survive a loss.", tone: "good", next: "s5" }
        ] },
      s5: { time: "1:00 PM",
        scene: "Lunch. Someone at the next desk whispers: 'A friend at another firm says this stock will shoot up today. Sure thing.' No proof — just a tip.",
        stat: { label: "Rumor, no proof", tone: "neutral" },
        choices: [
          { text: "Ignore. Your job is math, not gossip.", tone: "good", next: "s6" },
          { text: "Ask for proof. If it's real, use it.", tone: "neutral", next: "s6" },
          { text: "Trade on it. A tip is a tip.", tone: "bad", next: "s6" }
        ] },
      s6: { time: "2:30 PM",
        scene: "Your strategy is losing. Down $420 in an hour. Your gut says 'stop!' Your plan says 'wait, ride it out.'",
        stat: { label: "Losing money", tone: "bad" },
        choices: [
          { text: "Stop now. Losses can grow fast.", tone: "good", next: "s7" },
          { text: "Stick to the plan. This is why you tested.", tone: "good", next: "s7" },
          { text: "Add MORE money — buy the dip. It'll bounce.", tone: "bad", next: "s7" }
        ] },
      s7: { time: "3:30 PM",
        scene: "Boss walks by: 'How's it going?' You have to tell her exactly where you are. No dodging.",
        stat: { label: "Honesty check", tone: "neutral" },
        choices: [
          { text: "'Down $420. I've set a limit — if it drops more, I stop.'", tone: "good", next: "s8" },
          { text: "'It's fine, still testing.' Buy time.", tone: "bad", next: "s8" },
          { text: "'Down $420 and honestly nervous — can I show you the numbers?'", tone: "good", next: "s8" }
        ] },
      s8: { time: "4:15 PM",
        scene: "Boss adds a twist: 'Also — check if your idea still works on days when the market itself is falling.' You'd only tested on normal days.",
        stat: { label: "New question", tone: "neutral" },
        choices: [
          { text: "Filter for the worst 20 days last year. Test only on those.", tone: "good" },
          { text: "Build a full simulation from scratch — proper science.", tone: "neutral" },
          { text: "Guess. Say 'probably works.' Move on.", tone: "bad" }
        ],
        next: (flags) => flags.asked ? "s9_helped" : "s9_solo" },
      s9_helped: { time: "4:30 PM",
        scene: "The senior you asked in the morning DMs you: 'Saw your ping. I already have a falling-market script — want it?' Your morning question just saved you an hour.",
        stat: { label: "Help arrives", tone: "good" },
        choices: [
          { text: "'Yes please — I'll run it and share what I learn.'", tone: "good", next: "s10" },
          { text: "'Thanks, but let me try building it myself first.'", tone: "neutral", next: "s10" },
          { text: "'Send it — and can we walk through it together after?'", tone: "good", next: "s10" }
        ] },
      s9_solo: { time: "4:30 PM",
        scene: "You never talked to anyone this morning. Now you're building the falling-market test alone. 30 minutes on the clock, and it's loud.",
        stat: { label: "No help lined up", tone: "bad" },
        choices: [
          { text: "Keep it simple — pick 5 bad days, test on those. Ship.", tone: "good", next: "s10" },
          { text: "Try to build the full thing. Might not finish in time.", tone: "bad", next: "s10" },
          { text: "Ask a senior right now — even if it's late.", tone: "good", next: "s10" }
        ] },
      s10: { time: "5:15 PM",
        scene: "Market closes. Final: down $280 for the day. Your idea worked half the time. Not a win, not a disaster. Boss wants a one-page report by tomorrow.",
        stat: { label: "Day done", tone: "neutral" },
        choices: [
          { text: "One page. Numbers, plus one line: 'Idea is weak — don't scale.'", tone: "good", next: "s11" },
          { text: "Long report with lots of charts and explanations.", tone: "neutral", next: "s11" },
          { text: "Wait — run the idea overnight to try and save it.", tone: "bad", next: "s11" }
        ] },
      s11: { time: "8:00 PM",
        scene: "You could stay late to try a new idea. Or go home and come back sharper tomorrow. Nobody is asking you to stay.",
        stat: { label: "Stay or go", tone: "neutral" },
        choices: [
          { text: "Go home. A rested brain beats a tired one.", tone: "good", next: "s12" },
          { text: "One more hour. Write down what you learned today.", tone: "good", next: "s12" },
          { text: "Stay till midnight — grinding is what gets you promoted.", tone: "bad", next: "s12" }
        ] },
      s12: { time: "9:00 AM (Tue)",
        scene: "Back at your desk. Down $280 out of $5,000. In quant, most ideas fail. The trick is: fail small, learn something, try again. Today you learned something. Onto idea #2.",
        stat: { label: "Day 2 begins", tone: "neutral" },
        choices: [] }
    }
  },
  journalist: {
    intro: "You're a young reporter at a news website. Your editor gives you one story: 'A factory near town may be dumping bad chemicals in the river. Fish are dying. Get me the truth by 6 PM.' Go.",
    start: "s1",
    scenes: {
      s1: { time: "8:30 AM",
        scene: "You have 9 hours. Where do you start?",
        stat: { label: "First move", tone: "neutral" },
        choices: [
          { text: "Drive to the river now. See it with your own eyes.", tone: "good", next: "s2" },
          { text: "Call the factory first. Ask for their side.", tone: "neutral", next: "s2" },
          { text: "Read old news about this factory. 45 minutes of homework.", tone: "good", sets: { prepared: true }, next: "s2" }
        ] },
      s2: { time: "9:30 AM",
        scene: "You reach the river. Water is brown, smells sharp, dead fish on the bank. A fisherman is packing up. He looks tired and doesn't trust reporters.",
        stat: { label: "First witness", tone: "neutral" },
        choices: [
          { text: "Sit with him. Share water. Ask nothing for 10 minutes.", tone: "good", next: "s3_trusted" },
          { text: "Get straight to it: 'How long has the river been like this?'", tone: "neutral", next: "s3_neutral" },
          { text: "Take photos first. Talk to him after.", tone: "bad", next: "s3_neutral" }
        ] },
      s3_trusted: { time: "10:30 AM",
        scene: "He opens up. 'Fish started dying six weeks ago. Same time the factory began running at night.' It's a lead — but one man's word isn't a story.",
        stat: { label: "Real lead", tone: "good" },
        choices: [
          { text: "Ask if he'll go on record with his name.", tone: "good", next: "s4" },
          { text: "Ask him for two more fishermen who'll talk.", tone: "good", next: "s4" },
          { text: "Thank him quietly, write it down, look for proof next.", tone: "good", next: "s4" }
        ] },
      s3_neutral: { time: "10:30 AM",
        scene: "He shrugs. Gives you the basics — 'yes, fish are dying, factory runs at night.' No details. No name. You'll need harder proof.",
        stat: { label: "Cold trail", tone: "bad" },
        choices: [
          { text: "Try another fisherman further up the river.", tone: "good", next: "s4" },
          { text: "Head to the factory. Ask them directly.", tone: "neutral", next: "s4" },
          { text: "Order a water test. Costs $100.", tone: "good", next: "s4" }
        ] },
      s4: { time: "12:00 PM",
        scene: "Lunch. Your phone lights up: a video on Twitter shows what looks like the factory pipe dumping at night. 200 shares. No name behind it.",
        stat: { label: "Anon video", tone: "neutral" },
        choices: [
          { text: "Message the poster. Ask when and where it was filmed.", tone: "good", next: "s5" },
          { text: "Use it. It matches everything else you've heard.", tone: "bad", next: "s5" },
          { text: "Check the video against the fisherman's timeline first.", tone: "good", next: "s5" }
        ] },
      s5: { time: "1:30 PM",
        scene: "You reach the factory gate. The manager comes out smiling too big: 'We follow every rule. We can show you our reports.' He won't let you inside.",
        stat: { label: "Managed message", tone: "neutral" },
        choices: [
          { text: "Take his statement. Ask sharp follow-up questions.", tone: "good", next: "s6" },
          { text: "Push to see inside. If he refuses, that's part of the story.", tone: "neutral", next: "s6" },
          { text: "Accept the reports. Verify them later.", tone: "neutral", next: "s6" }
        ] },
      s6: { time: "3:00 PM",
        scene: "Editor calls: 'A bigger paper is running their version tomorrow. If we post tonight at 8, we're first. If we wait, we're second.'",
        stat: { label: "Speed vs. truth", tone: "bad" },
        choices: [
          { text: "'Give me 24 hours — I need to check the video's source.'", tone: "good", next: "s7" },
          { text: "'We publish tonight. Being first matters.'", tone: "bad", next: "s7" },
          { text: "Publish what's solid tonight. Add the video tomorrow with proof.", tone: "good", next: "s7" }
        ] },
      s7: { time: "3:45 PM",
        scene: "A former factory worker calls. 'Yes, they dump at night to save money.' He won't use his name. Publishing on one hidden source is risky.",
        stat: { label: "Anonymous source", tone: "neutral" },
        choices: [
          { text: "Find a second source who says the same thing.", tone: "good", next: "s8" },
          { text: "Use him. Mark it 'a former employee said.'", tone: "neutral", next: "s8" },
          { text: "Don't use him. Not solid enough on its own.", tone: "good", next: "s8" }
        ] },
      s8: { time: "4:30 PM",
        scene: "The water test result arrives — chemicals are 6x higher than allowed. Signed by a real lab. Real. Provable.",
        stat: { label: "Hard proof", tone: "good" },
        choices: [
          { text: "Lead the story with the number. It speaks for itself.", tone: "good" },
          { text: "Bury the number halfway down — build up to it.", tone: "neutral" },
          { text: "Wait, get a second lab test before you print it.", tone: "neutral" }
        ],
        next: (flags) => flags.prepared ? "s9_pattern" : "s9_missed" },
      s9_pattern: { time: "4:45 PM",
        scene: "Because you read the old news this morning, you remember: two years ago, the same factory was fined for the same thing. This isn't a slip — it's a pattern. Your story just got stronger.",
        stat: { label: "Bigger story", tone: "good" },
        choices: [
          { text: "Add the pattern — this is the real headline.", tone: "good", next: "s10" },
          { text: "Save the pattern for a follow-up piece tomorrow.", tone: "neutral", next: "s10" },
          { text: "Add it, but call editor first — she'll want to know.", tone: "good", next: "s10" }
        ] },
      s9_missed: { time: "4:45 PM",
        scene: "The factory's name suddenly rings a bell. A quick search: they were fined two years ago for the exact same thing. You almost missed the pattern because you skipped the background reading.",
        stat: { label: "Almost missed it", tone: "bad" },
        choices: [
          { text: "Add the pattern. Push the deadline 30 minutes.", tone: "good", next: "s10" },
          { text: "Skip it — no time to check properly.", tone: "bad", next: "s10" },
          { text: "Call editor: 'I need 30 min. I found the second half of the story.'", tone: "good", next: "s10" }
        ] },
      s10: { time: "5:30 PM",
        scene: "Editor reads your draft. 'Cut 200 words. The number, the fish, the pattern — put those first. Everything else after.'",
        stat: { label: "Editor cuts", tone: "neutral" },
        choices: [
          { text: "Do it. She's right.", tone: "good", next: "s11" },
          { text: "Push back — the story needs context first.", tone: "bad", next: "s11" },
          { text: "Do most of it, keep one bit you're attached to.", tone: "neutral", next: "s11" }
        ] },
      s11: { time: "7:00 PM",
        scene: "Story is written. Legal reads it: 'The word illegal is strong. Do you have signed proof they broke the law?' You have the water test. Not a court ruling.",
        stat: { label: "Words matter", tone: "neutral" },
        choices: [
          { text: "Change 'illegal' to 'above legal limits.' Same fact, safer.", tone: "good", next: "s12" },
          { text: "Keep 'illegal.' The test proves it.", tone: "neutral", next: "s12" },
          { text: "Ask the lawyer to rewrite that one line.", tone: "good", next: "s12" }
        ] },
      s12: { time: "8:15 PM",
        scene: "Story goes live. 400 shares in 20 minutes. The fisherman texts: 'thank you.' The factory posts a denial. Next morning, the pollution board says they're investigating. You didn't fix the river. But now thousands of people know.",
        stat: { label: "Day one done", tone: "good" },
        choices: [] }
    }
  },
  director: {
    intro: "You're a young film director in Los Angeles shooting your first short film — 15 minutes long. Today is day one on set. 20 people are waiting for you to tell them what to do. You have 3 days to shoot the whole thing.",
    start: "s1",
    scenes: {
      s1: { time: "6:30 AM",
        scene: "You reread the script one last time. The big emotional scene at the end feels flat. You've felt this for a week and haven't fixed it. Shooting starts at 9.",
        stat: { label: "Weak ending", tone: "bad" },
        choices: [
          { text: "Rewrite the ending now. Two hours. Might crack it.", tone: "good", sets: { rewrote: true }, next: "s2" },
          { text: "Shoot it as written. Fix it in the edit later.", tone: "bad", next: "s2" },
          { text: "Call your writer friend for 20 minutes. Get one fresh idea.", tone: "good", sets: { asked: true }, next: "s2" }
        ] },
      s2: { time: "9:00 AM",
        scene: "You're on set. Your lead actor texts: 'Stuck in traffic. 90 minutes late.' You have the whole crew standing around. Every minute costs money.",
        stat: { label: "Lead is late", tone: "bad" },
        choices: [
          { text: "Shoot the shots that don't need the lead. Move the schedule around.", tone: "good", next: "s3" },
          { text: "Send everyone on a long break. Save your energy.", tone: "bad", next: "s3" },
          { text: "Rehearse the scene with the other actors so it's tight when lead arrives.", tone: "good", next: "s3" }
        ] },
      s3: { time: "11:30 AM",
        scene: "Lead is here. First take of the big scene. It's… okay. Not great. The actor is trying but you can feel it's not landing.",
        stat: { label: "Flat performance", tone: "neutral" },
        choices: [
          { text: "Say 'perfect' and move on. Don't hurt his confidence.", tone: "bad", next: "s4" },
          { text: "Pull him aside. Tell him one specific thing to try — quietly.", tone: "good", next: "s4" },
          { text: "Give a big note in front of everyone so the crew knows you're in charge.", tone: "bad", next: "s4" }
        ] },
      s4: { time: "1:00 PM",
        scene: "Lunch break. Your camera person shows you the footage on a small screen. The light in the background looks weird. You didn't notice on set.",
        stat: { label: "Ugly light", tone: "bad" },
        choices: [
          { text: "Reshoot the morning stuff after lunch. Costs you an hour.", tone: "good", next: "s5" },
          { text: "Keep it. Fix the color later on the computer.", tone: "neutral", next: "s5" },
          { text: "Ask the camera person: 'Can we save it with one big light?' Try that first.", tone: "good", next: "s5" }
        ] },
      s5: { time: "3:00 PM",
        scene: "A child actor (age 9) has one line in the next scene. She's tired and starting to cry. Her mom is watching from the side, tense.",
        stat: { label: "Kid melting down", tone: "bad" },
        choices: [
          { text: "Give her a 20-minute break with snacks. Shoot around her.", tone: "good", next: "s6" },
          { text: "Do the take fast — one try — and let her go home.", tone: "neutral", next: "s6" },
          { text: "Push through. She'll get it in 5 more takes.", tone: "bad", next: "s6" }
        ] },
      s6: { time: "5:00 PM",
        scene: "The sun is dropping fast. You planned one more outdoor scene today. Losing daylight means losing the shot.",
        stat: { label: "Losing light", tone: "bad" },
        choices: [
          { text: "Skip the fancy shot. Get one clean wide shot fast.", tone: "good", next: "s7" },
          { text: "Try the fancy shot anyway. Might get lucky.", tone: "bad", next: "s7" },
          { text: "Move the scene to tomorrow. Wrap crew early, they're tired.", tone: "good", next: "s7" }
        ],
        next: (flags) => (flags.rewrote || flags.asked) ? "s7_ready" : "s7_stuck" },
      s7_ready: { time: "7:00 PM",
        scene: "Time for the big emotional scene. Because you fixed it this morning, you actually know what you want. You tell the actor one simple thing: 'You're not sad — you're trying not to be sad.' His face changes.",
        stat: { label: "New idea lands", tone: "good" },
        choices: [
          { text: "One take, close-up on his face. Trust it.", tone: "good", next: "s8" },
          { text: "Three takes, different angles. Choose in edit.", tone: "good", next: "s8" },
          { text: "Ten takes just to be safe.", tone: "neutral", next: "s8" }
        ] },
      s7_stuck: { time: "7:00 PM",
        scene: "Time for the big emotional scene. You still don't know what you want. The actor keeps asking 'what am I feeling here?' and your answer keeps changing. The crew starts to notice.",
        stat: { label: "You froze", tone: "bad" },
        choices: [
          { text: "Admit it: 'Let's take 15 minutes. I need to think.'", tone: "good", next: "s8" },
          { text: "Fake confidence. Pick any direction and stick with it.", tone: "bad", next: "s8" },
          { text: "Let the actor try his own version. Sometimes they know better.", tone: "good", next: "s8" }
        ] },
      s8: { time: "9:30 PM",
        scene: "Wrap for day one. Your producer pulls you aside. 'A famous actor said he'd do a small role for free — but only tomorrow morning, 6 AM.' It means rewriting a whole scene tonight.",
        stat: { label: "Free star, big cost", tone: "neutral" },
        choices: [
          { text: "Say yes. A famous face on screen sells the film.", tone: "neutral", next: "s9" },
          { text: "Say no. Your script doesn't need him. Sleep matters.", tone: "good", next: "s9" },
          { text: "Say yes, but keep his role tiny — 10 seconds, no new writing.", tone: "good", next: "s9" }
        ] },
      s9: { time: "Day 4 · 10:00 AM",
        scene: "Shooting is done. You sit with the editor. First cut is 22 minutes. Your target is 15. Something has to go.",
        stat: { label: "7 minutes too long", tone: "bad" },
        choices: [
          { text: "Cut your favorite scene. It's beautiful but the story works without it.", tone: "good", next: "s10" },
          { text: "Cut small bits from every scene. Keep everything, shorter.", tone: "bad", next: "s10" },
          { text: "Show two people you trust and ask what to cut.", tone: "good", next: "s10" }
        ] },
      s10: { time: "Week 3",
        scene: "Small test screening — 6 friends. Three love it. Two are polite. One says 'I got confused around the middle.' Confused is a real note.",
        stat: { label: "Middle is muddy", tone: "neutral" },
        choices: [
          { text: "Believe the one confused person. Recut the middle.", tone: "good", next: "s11" },
          { text: "Trust the three who loved it. Ship as-is.", tone: "neutral", next: "s11" },
          { text: "Show it to 6 more strangers before deciding.", tone: "good", next: "s11" }
        ] },
      s11: { time: "Month 2",
        scene: "Film is done. You post it online. In one week, 4,000 people watch it. A few strangers message you: 'this scene made me cry.' A film critic tweets one line about it. Your mom calls, proud. The scene you fought hardest for is the one people quote back to you. This is the job.",
        stat: { label: "It exists now", tone: "good" },
        choices: [] }
    }
  },
  designer: {
    intro: "You're a product designer at a small startup that makes a math learning app for kids. Today's job: redesign the home screen. Real kids will use whatever you draw. Your product manager wants it by Friday.",
    start: "s1",
    scenes: {
      s1: { time: "9:30 AM",
        scene: "You open your laptop. One line from your PM: 'Make the home screen more fun. Kids are getting bored.' No drawings. No data attached.",
        stat: { label: "Vague brief", tone: "neutral" },
        choices: [
          { text: "Open Figma and start drawing. You have ideas already.", tone: "neutral", next: "s2_draw" },
          { text: "Ask PM for the data first. What are kids actually doing?", tone: "good", sets: { data: true }, next: "s2_data" },
          { text: "Watch 3 kids use the current app for 20 min each. See it live.", tone: "good", sets: { watched: true }, next: "s2_watch" }
        ] },
      s2_draw: { time: "11:00 AM",
        scene: "You've drawn a bright, cartoony screen. Big buttons, silly monster mascot. Looks fun. But you're guessing what kids like — you're 26, not 9.",
        stat: { label: "Pretty guess", tone: "neutral" },
        choices: [
          { text: "Show it to your PM. Get quick feedback.", tone: "neutral", next: "s3" },
          { text: "Stop. Go find one real kid to react to it before you go further.", tone: "good", sets: { watched: true }, next: "s3" },
          { text: "Add three more screens so PM has options.", tone: "neutral", next: "s3" }
        ] },
      s2_data: { time: "11:00 AM",
        scene: "PM sends the data. Kids open the app, tap around for 90 seconds, then leave. Most never make it to the second lesson. The home screen is where they lose them.",
        stat: { label: "Real problem", tone: "good" },
        choices: [
          { text: "Design a home screen that shows just one 'next thing to do.'", tone: "good", next: "s3" },
          { text: "Add more buttons so kids can pick anything.", tone: "bad", next: "s3" },
          { text: "Add a big animation on open so it feels alive.", tone: "neutral", next: "s3" }
        ] },
      s2_watch: { time: "11:00 AM",
        scene: "You watched three kids. All three ignored the menu on the left. Two tapped the mascot thinking it was a game. One kid said 'where do I start?' out loud.",
        stat: { label: "You saw it", tone: "good" },
        choices: [
          { text: "Kill the side menu. Put one big 'Start here' button.", tone: "good", next: "s3" },
          { text: "Make the mascot actually clickable — turn the confusion into a feature.", tone: "good", next: "s3" },
          { text: "Add a tutorial that pops up first time.", tone: "neutral", next: "s3" }
        ] },
      s3: { time: "1:00 PM",
        scene: "Color time. Your first draft is bright red, blue and yellow. Loud. Fun. But red is also the color your app uses for 'wrong answer.'",
        stat: { label: "Color clash", tone: "neutral" },
        choices: [
          { text: "Switch main color to green. Save red only for mistakes.", tone: "good", next: "s4" },
          { text: "Keep red — kids won't notice.", tone: "bad", next: "s4" },
          { text: "Use softer colors — pastel blue and yellow.", tone: "good", next: "s4" }
        ] },
      s4: { time: "2:30 PM",
        scene: "You share your screen with the lead engineer. She looks at it 10 seconds and says: 'The bouncing animation on every button will eat phone battery. Can we lose it?'",
        stat: { label: "Engineer says no", tone: "bad" },
        choices: [
          { text: "Drop the bouncing. Keep one small animation on tap only.", tone: "good", next: "s5" },
          { text: "Fight for it. Kids love the bounce.", tone: "bad", next: "s5" },
          { text: "Ask her: 'What can we afford, animation-wise?' Design to that.", tone: "good", next: "s5" }
        ] },
      s5: { time: "3:30 PM",
        scene: "PM messages: 'Quick add — can you put a parents' dashboard button on the home screen too?' That button is for grown-ups. Kids will just tap it and get confused.",
        stat: { label: "PM squeeze", tone: "bad" },
        choices: [
          { text: "Yes, but tiny — corner only, with a lock icon.", tone: "good", next: "s6" },
          { text: "No. Say: 'Parents' stuff belongs in Settings, not the home screen.'", tone: "good", next: "s6" },
          { text: "Sure, add a big button. PM will be happy.", tone: "bad", next: "s6" }
        ] },
      s6: { time: "4:30 PM",
        scene: "You show your design to a designer friend. She says: 'A blind kid or a color-blind kid won't be able to tell the buttons apart. Everything is by color alone.'",
        stat: { label: "Accessibility miss", tone: "bad" },
        choices: [
          { text: "Add small icons on every button, not just color. Redo.", tone: "good", next: "s7" },
          { text: "Note it as a 'v2' fix. Ship the current design.", tone: "bad", next: "s7" },
          { text: "Add icons + also test with a color-blind filter tool right now.", tone: "good", next: "s7" }
        ],
        next: (flags) => (flags.watched || flags.data) ? "s7_smart" : "s7_blind" },
      s7_smart: { time: "5:30 PM",
        scene: "Because you saw real kids (or checked the data) earlier, you know they lose interest fast. You add one simple thing: a small streak counter — 'You've done math 3 days in a row!' It costs nothing to build.",
        stat: { label: "Small smart addition", tone: "good" },
        choices: [
          { text: "Put it right at the top. First thing kids see.", tone: "good", next: "s8" },
          { text: "Put it in a corner. Don't overdo it.", tone: "good", next: "s8" },
          { text: "Save it for next week. Ship the basic version first.", tone: "neutral", next: "s8" }
        ] },
      s7_blind: { time: "5:30 PM",
        scene: "You realise you never actually watched a kid use this. You've been designing for an imaginary child in your head. Your PM is waiting for the file.",
        stat: { label: "No real signal", tone: "bad" },
        choices: [
          { text: "Send Friday's file, but book kid testing for next week.", tone: "good", next: "s8" },
          { text: "Delay by two days. Watch real kids first.", tone: "good", next: "s8" },
          { text: "Ship it. Trust your gut.", tone: "bad", next: "s8" }
        ] },
      s8: { time: "6:30 PM",
        scene: "Handoff time. You could send a rough Figma file (engineer will guess), or spend 45 min writing tiny notes for spacing, colors, tap sizes.",
        stat: { label: "How much detail", tone: "neutral" },
        choices: [
          { text: "Write the notes. Saves engineers a whole day of back-and-forth.", tone: "good", next: "s9" },
          { text: "Just send the file. Answer questions in Slack tomorrow.", tone: "neutral", next: "s9" },
          { text: "Send file + 5 min video walking through it.", tone: "good", next: "s9" }
        ] },
      s9: { time: "Next Friday",
        scene: "The new home screen is live. Team runs an A/B test — half the kids see the old one, half see yours. After a week: your version keeps kids 40% longer. But 6% of parents complain: 'too colorful.'",
        stat: { label: "Kids up, parents mixed", tone: "good" },
        choices: [
          { text: "Ship your version to everyone. Kids are the users.", tone: "good", next: "s10" },
          { text: "Add a 'calm mode' toggle for parents who want it.", tone: "good", next: "s10" },
          { text: "Roll back. Parents pay the subscription.", tone: "bad", next: "s10" }
        ] },
      s10: { time: "3 months later",
        scene: "You open the app. That mascot you sketched on day one is on the screens of 80,000 kids. A parent sends a photo — her daughter drew the mascot in her school notebook. Somewhere else, an engineer secretly hates one of your color choices. This is the job.",
        stat: { label: "Real users", tone: "good" },
        choices: [] }
    }
  },
  pm: {
    intro: "You're a product manager at a food delivery app used by 3 million people. Today you decide what your team of 6 engineers will build next month. You don't write code. You don't draw designs. You decide what matters and unblock people.",
    start: "s1",
    scenes: {
      s1: { time: "9:00 AM",
        scene: "Your boss wants a new feature launched in 4 weeks. You have three ideas on your list. You have to pick one.",
        stat: { label: "First pick", tone: "neutral" },
        choices: [
          { text: "Look at the last 3 months of data — pick where users drop off most.", tone: "good", sets: { data: true }, next: "s2" },
          { text: "Call 5 users on the phone this morning. Ask what's annoying.", tone: "good", sets: { asked: true }, next: "s2" },
          { text: "Pick the idea your CEO likes. Safe.", tone: "bad", next: "s2" }
        ] },
      s2: { time: "10:30 AM",
        scene: "You've picked: let users schedule an order for later (e.g., breakfast for tomorrow morning). You explain it to your lead engineer. He listens, then says: 'This is 8 weeks of work, not 4. Payments alone will take 2.'",
        stat: { label: "Reality check", tone: "bad" },
        choices: [
          { text: "Cut the feature in half. Ship 'schedule up to 12 hours ahead' only.", tone: "good", next: "s3" },
          { text: "Push the deadline. Tell your boss 4 weeks won't work.", tone: "good", next: "s3" },
          { text: "Say 'try to make it happen.' Trust him to figure it out.", tone: "bad", next: "s3" }
        ] },
      s3: { time: "12:00 PM",
        scene: "Two teammates disagree in a meeting. Engineer wants a simple design. Designer wants a fancier one. They both look at you.",
        stat: { label: "You decide", tone: "neutral" },
        choices: [
          { text: "Simple version now. Fancy version next month if users love it.", tone: "good", next: "s4" },
          { text: "Fancy version. First impression matters.", tone: "neutral", next: "s4" },
          { text: "Ask them to build a tiny prototype of both. Test with 20 users.", tone: "good", next: "s4" }
        ] },
      s4: { time: "1:30 PM",
        scene: "Lunch. Your data analyst pings you: 'Actually, only 3% of users asked for scheduling in surveys.' Your gut said this was a bigger deal.",
        stat: { label: "Weak signal", tone: "bad" },
        choices: [
          { text: "Kill the feature. Pick a bigger problem.", tone: "good", next: "s5" },
          { text: "Keep going. Surveys under-count real behavior.", tone: "neutral", next: "s5" },
          { text: "Ask analyst: 'How many users actually tried and failed to schedule?' — different question.", tone: "good", next: "s5" }
        ] },
      s5: { time: "3:00 PM",
        scene: "Your customer support lead walks over: '15 users complained yesterday that their delivery guy called them 4 times.' Small annoyance. Would take engineers 3 days to fix.",
        stat: { label: "Small fix, real pain", tone: "neutral" },
        choices: [
          { text: "Squeeze it into next week. Small fixes build user trust.", tone: "good", next: "s6" },
          { text: "Ignore. You have a big feature to ship.", tone: "bad", next: "s6" },
          { text: "File it. Fix it right after the big launch.", tone: "neutral", next: "s6" }
        ] },
      s6: { time: "4:30 PM",
        scene: "Marketing wants to announce the new feature next Friday with a big campaign. Engineers say the feature will be 'mostly ready' but not fully tested by then.",
        stat: { label: "Launch too early?", tone: "bad" },
        choices: [
          { text: "Push marketing's date back one week. Test properly.", tone: "good", next: "s7" },
          { text: "Launch to 10% of users on Friday. Full launch after.", tone: "good", next: "s7" },
          { text: "Launch on Friday. Fix bugs as users find them.", tone: "bad", next: "s7" }
        ] },
      s7: { time: "5:30 PM",
        scene: "Your CEO drops in: 'Add restaurant reviews to the app. Zomato has them, we should too.' She says this like it's small. It is not small.",
        stat: { label: "Boss adds scope", tone: "bad" },
        choices: [
          { text: "Say: 'Yes — after this launch. It's a 6-week project on its own.'", tone: "good", next: "s8" },
          { text: "Yes ma'am. Add it to the team's plate.", tone: "bad", next: "s8" },
          { text: "Ask: 'What problem is this solving?' Understand before agreeing.", tone: "good", next: "s8" }
        ],
        next: (flags) => (flags.data || flags.asked) ? "s8_grounded" : "s8_shaky" },
      s8_grounded: { time: "6:30 PM",
        scene: "Because you looked at data (or talked to users) this morning, you can tell your CEO: 'Reviews are #7 in our user complaints. Scheduling is #2. Let's finish scheduling first.' She nods.",
        stat: { label: "Numbers win", tone: "good" },
        choices: [
          { text: "Also send her a one-page memo tomorrow — she'll want to share it.", tone: "good", next: "s9" },
          { text: "Great, moving on. Don't overdo it.", tone: "neutral", next: "s9" },
          { text: "Offer to run a 2-week reviews test after scheduling launches.", tone: "good", next: "s9" }
        ] },
      s8_shaky: { time: "6:30 PM",
        scene: "CEO asks 'so what do our users actually want most?' You don't have a clean answer. You mumble something about 'user feedback.' She looks unconvinced.",
        stat: { label: "You winged it", tone: "bad" },
        choices: [
          { text: "Admit it: 'Let me pull the numbers and get back to you tomorrow.'", tone: "good", next: "s9" },
          { text: "Sound confident. Repeat what your engineer said last week.", tone: "bad", next: "s9" },
          { text: "Book a user research sprint this week. Never be here again.", tone: "good", next: "s9" }
        ] },
      s9: { time: "Launch day",
        scene: "The scheduling feature is live. First 24 hours: 12,000 users try it. 900 orders fail because of a bug in the payment step. Support inbox is exploding.",
        stat: { label: "Bug in production", tone: "bad" },
        choices: [
          { text: "Turn the feature off for now. Fix it. Turn back on in a day.", tone: "good", next: "s10" },
          { text: "Keep it on. Refund the 900 users. Tell engineers to fix live.", tone: "neutral", next: "s10" },
          { text: "Blame the engineers publicly so leadership knows it wasn't you.", tone: "bad", next: "s10" }
        ] },
      s10: { time: "One month later",
        scene: "Bug is fixed. 40,000 people now schedule orders every day. Nobody outside your team knows how many small decisions this took. Your engineer messages: 'thanks for cutting the scope in week one. We'd still be building otherwise.' Nobody sees you draw or code — but this feature exists because of the choices you made. This is the job.",
        stat: { label: "Quiet win", tone: "good" },
        choices: [] }
    }
  }
};

// GENERIC group templates — cover the other 11 careers. $LABEL is replaced with career.label
const GENERIC_BY_GROUP = {
  "Business & Money": {
    intro: (label) => `A real day as a ${label}. Pressure, a client on the line, a moving deadline, and at least three things you weren't told about last week.`,
    scenes: [
      { time: "8:45 AM",
        scene: "You badge into the office. A senior forwards a 40-page document at 6 AM with the subject 'need summary + recommendation by EOD (End of Day).' No context on what the client actually wants.",
        stat: { label: "Cold start", tone: "neutral" },
        choices: ["Reply 'On it,' skim first — get the shape, then dig", "Read carefully cover-to-cover before touching Excel or a memo", "Ping the senior for a 5-min context call before starting"],
        tones: ["good", "neutral", "good"] },
      { time: "10:00 AM",
        scene: "You realize the deadline is tighter than you thought. There's a decision meeting at 2 PM that you weren't invited to but should have been. Your work will be discussed with or without you.",
        stat: { label: "Surprise meeting", tone: "bad" },
        choices: ["Ask to be added — 'I should be in the room, my work is on the agenda'", "Prep aggressively without pushing to attend, brief someone senior beforehand", "Wing it, trust your instincts, hope for the best"],
        tones: ["good", "good", "bad"] },
      { time: "11:15 AM",
        scene: "A junior colleague asks for 15 minutes of your time on their piece of the same project. They're stuck on something you've already solved. Helping = 30 min real cost. Ignoring = they'll flounder for 2 hours.",
        stat: { label: "Team math", tone: "neutral" },
        choices: ["Give them 15 focused minutes now — cheaper for the team", "Point them at your old work, let them figure it out", "'Not now — come back at 4' — buys focus, delays their day"],
        tones: ["good", "neutral", "neutral"] },
      { time: "12:30 PM",
        scene: "You get to the client's actual data. Something doesn't add up — a number in the summary contradicts a number in the appendix. Neither is highlighted. You could ask the client (slow, embarrassing), or just pick one and move on.",
        stat: { label: "Real inconsistency", tone: "bad" },
        choices: ["Email the client contact — 'quick clarification'", "Pick the more conservative number, footnote your assumption", "Pick the more favourable number, move on, don't flag it"],
        tones: ["good", "good", "bad"] },
      { time: "2:00 PM",
        scene: "In the meeting (you got in), someone senior confidently states a fact that changes the whole conclusion — and you know it's wrong. Nobody else has spoken up.",
        stat: { label: "Speak or stay quiet", tone: "neutral" },
        choices: ["Politely correct them right now, with the specific source", "Message them 1:1 after the meeting, gently", "Stay silent — this isn't your call, above your level"],
        tones: ["good", "good", "bad"] },
      { time: "3:15 PM",
        scene: "Post-meeting, your boss asks you to draft the follow-up email to the client. She'll review before it goes out. She has 6 other things on her plate today and reviews are slow.",
        stat: { label: "Draft your voice", tone: "neutral" },
        choices: ["Draft in her voice — she'll approve faster, less back-and-forth", "Draft in your best professional voice, let her edit", "Draft 3 versions with different tones, ask her to pick"],
        tones: ["good", "good", "bad"] },
      { time: "4:30 PM",
        scene: "You spot a big risk in the plan that nobody's raised. Flagging it will delay everything by 3 days. Not flagging it might blow up in 3 weeks and be much worse.",
        stat: { label: "Now or later?", tone: "bad" },
        choices: ["Flag it — a 3-day delay beats a 3-week disaster", "Note it in a personal doc, leave the team alone", "Discuss with one trusted peer first before deciding to escalate"],
        tones: ["good", "bad", "good"] },
      { time: "5:45 PM",
        scene: "The client contact replies with the clarification — and it changes your recommendation entirely. Your existing draft is now half wrong. You have 90 minutes.",
        stat: { label: "Reset the memo", tone: "bad" },
        choices: ["Rewrite from the new numbers, don't force old conclusions", "Adjust the numbers, keep the structure, save time", "Push the deadline back to tomorrow morning"],
        tones: ["good", "neutral", "neutral"] },
      { time: "7:15 PM",
        scene: "You're at 85%. A friend messages: 'dinner at 8 — you in?' Your boss hasn't confirmed whether she needs more from you tonight after her review.",
        stat: { label: "Reply-loop uncertainty", tone: "neutral" },
        choices: ["Push through, send by 8, then decide about dinner", "'Trying to make it — will confirm by 7:45.'", "Cancel dinner up front — tonight is not the night"],
        tones: ["good", "good", "neutral"] },
      { time: "8:40 PM",
        scene: "Boss reviews, sends back 12 comments. 3 are structural (real thinking), 9 are formatting (font, alignment, one comma). She wants v2 tonight.",
        stat: { label: "12 comments", tone: "bad" },
        choices: ["Do the 3 structural changes first, formatting second — protect the thinking", "Do all 12 in order, don't argue", "Push back on the formatting — 'happy to do these tomorrow morning'"],
        tones: ["good", "good", "neutral"] },
      { time: "10:30 PM",
        scene: "You send v2. Boss replies 'Thanks.' No feedback beyond that. You order Zomato. Tomorrow starts at 8 AM. This job is a marathon and today was 15 kilometres.",
        stat: { label: "Day done", tone: "neutral" }, choices: [], tones: [] }
    ]
  },
  "Tech & Science": {
    intro: (label) => `A real day as a ${label}. Deep work day, a small team, a real deliverable, and something is probably going to break.`,
    scenes: [
      { time: "9:15 AM",
        scene: "You open your laptop. Two things wait: one deep problem that needs 4+ uninterrupted hours, and a Slack channel filling up with small questions and pings. Your calendar is empty. Nobody will protect your focus but you.",
        stat: { label: "Focus vs. noise", tone: "neutral" },
        choices: ["Mute Slack, block 4 hours, tell the team you're heads-down", "Answer everyone quickly first, then focus for the rest of the day", "Alternate — 25 min heads-down, 5 min Slack, repeat"],
        tones: ["good", "neutral", "bad"] },
      { time: "10:30 AM",
        scene: "You hit a hard technical problem. Two hours in, no progress. The obvious solution is inelegant and slightly wrong — it'll work today but it'll bite someone in three months.",
        stat: { label: "Stuck", tone: "bad" },
        choices: ["Sit with it another hour — the right answer is close", "Ship the inelegant fix now, file a ticket to revisit properly", "Ask a smarter colleague for a focused 15 minutes"],
        tones: ["good", "neutral", "good"] },
      { time: "12:00 PM",
        scene: "You solved it — the right way, in 45 focused minutes. You feel great. Now the day feels like it just started.",
        stat: { label: "Small high", tone: "good" },
        choices: ["Document how you solved it before you forget — save the next person the pain", "Move straight to the next task, momentum matters", "Take a 15-minute break, then write it up"],
        tones: ["good", "neutral", "good"] },
      { time: "1:00 PM",
        scene: "Your manager asks for a status update on a project you thought was on hold. Turns out expectations changed two weeks ago and nobody explicitly told you. She's mildly annoyed.",
        stat: { label: "Expectations mismatch", tone: "bad" },
        choices: ["Clarify politely: 'I had it on hold — let's realign, here's what I can deliver by Friday'", "Just apologize and catch up over the weekend", "Push back: 'nobody told me' — technically true, professionally weak"],
        tones: ["good", "bad", "neutral"] },
      { time: "2:15 PM",
        scene: "You find a bug in a system that isn't yours. It's serious — nobody has reported it, but under a certain input it will produce silently wrong output. Fixing it will take a day. Nobody asked you to.",
        stat: { label: "Not your area", tone: "neutral" },
        choices: ["Reproduce it cleanly, write it up, ping the owner with a clear repro (steps to reproduce)", "Fix it yourself. Someone has to.", "Ignore it — not your problem, not your team"],
        tones: ["good", "good", "bad"] },
      { time: "3:30 PM",
        scene: "A colleague sends you their code for review (feedback on how well the code is written). It's 400 lines. The overall approach is fine, but there are 6 small things that could be much cleaner. Fully reviewing = 45 minutes. A quick 'looks good' = 3 minutes.",
        stat: { label: "Craft vs. speed", tone: "neutral" },
        choices: ["Fully review, comment specifically on all 6 things", "Review the top 2 issues, ship approval", "Approve quickly — you trust the person"],
        tones: ["good", "good", "bad"] },
      { time: "4:45 PM",
        scene: "A non-technical stakeholder (the marketing lead) walks over: 'quick question — can you just add a small feature to the app? It's just moving a button.' In your world 'just moving a button' involves 3 team approvals and possibly breaking analytics.",
        stat: { label: "Trivial to them, real to you", tone: "neutral" },
        choices: ["Explain the actual work involved patiently, offer a lightweight alternative", "'Yes, sure' — do it quickly, don't loop in the team", "'Send it in a ticket' — protect the intake process"],
        tones: ["good", "bad", "good"] },
      { time: "6:00 PM",
        scene: "The thing you built works, but you're not fully sure it's right. You could ship now, or spend 2 more hours testing edge cases (unusual inputs — like empty strings, very large numbers, offline mode) that might break it.",
        stat: { label: "Craft vs. done", tone: "neutral" },
        choices: ["Test the edge cases — quality is cheaper before ship, expensive after", "Ship it. Iterate if it breaks.", "Ship the safe part, keep the risky part behind a flag (an on/off switch you can turn off remotely)"],
        tones: ["good", "neutral", "good"] },
      { time: "7:30 PM",
        scene: "Your on-call rotation (being the person who answers when production breaks tonight) starts at 8 PM. You could stop now, or push in one more small change before you're off the clock for pushing anything risky.",
        stat: { label: "One more thing?", tone: "neutral" },
        choices: ["Stop now — no risky pushes right before on-call", "One small tested change, then stop", "Push the last change, ship it, celebrate"],
        tones: ["good", "neutral", "bad"] },
      { time: "9:45 PM",
        scene: "Pager (an alert system that tells you when production is broken) goes off. Not your service — but you're on call for the whole team tonight. 15 minutes to acknowledge before it escalates to your manager.",
        stat: { label: "First page", tone: "bad" },
        choices: ["Ack (acknowledge) it, read the runbook (a printed guide for known incidents), follow the steps calmly", "Ack it, ping the actual service owner: 'yours or mine?'", "Wait 10 minutes, hope it clears on its own"],
        tones: ["good", "good", "bad"] },
      { time: "11:00 PM",
        scene: "Page resolved — a downstream service (a system your systems talk to) had a hiccup, not really your problem. You wrap up notes for tomorrow. What you built today didn't exist this morning. Nobody said thank you. That has to be enough some days.",
        stat: { label: "Made a thing", tone: "good" }, choices: [], tones: [] }
    ]
  },
  "People & Impact": {
    intro: (label) => `A real day as a ${label}. High-empathy day, tough conversations, someone's outcome depends on you, and no version of this is measured in a spreadsheet.`,
    scenes: [
      { time: "8:30 AM",
        scene: "You walk in. Someone is already waiting for you. They look nervous. You have 15 minutes before your first scheduled thing and they clearly weren't in your calendar.",
        stat: { label: "Unplanned ask", tone: "neutral" },
        choices: ["Give them your full attention now, adjust the rest of your day", "'Give me 20 minutes — I'll come find you'", "Multitask — listen while you set up your day"],
        tones: ["good", "neutral", "bad"] },
      { time: "9:45 AM",
        scene: "In the middle of the conversation you realize you don't actually know the answer to something they need. Admitting it could damage trust. Making something up will bite you (and them) later.",
        stat: { label: "Credibility on the line", tone: "bad" },
        choices: ["Say 'I don't know — I'll find out by end of day' and mean it", "Give a confident-sounding guess", "Redirect them to someone else who might know"],
        tones: ["good", "bad", "neutral"] },
      { time: "11:00 AM",
        scene: "Group session. Two people in the room disagree strongly, tensions are rising, one is more junior and getting talked over.",
        stat: { label: "Group dynamics", tone: "neutral" },
        choices: ["Pause the argument, explicitly ask the quieter person 'what do you think?'", "Let it play out — adults, they'll figure it out", "Interject with your own opinion to shift the frame"],
        tones: ["good", "bad", "neutral"] },
      { time: "12:30 PM",
        scene: "Someone reacts emotionally to something you had to tell them. They're not angry at you personally — they're just upset, and you're the person who's in front of them.",
        stat: { label: "Hold the space", tone: "neutral" },
        choices: ["Sit with them quietly, don't rush the moment", "Try to fix it fast — offer solutions", "Give them privacy, tell them you'll come back in 20 minutes"],
        tones: ["good", "bad", "neutral"] },
      { time: "1:30 PM",
        scene: "You have 30 minutes before your next thing. You planned to eat. Instead you notice a colleague working through lunch, red-eyed, obviously not okay.",
        stat: { label: "Your lunch or theirs", tone: "neutral" },
        choices: ["Sit down next to them, ask how they're doing, eat together", "Give them privacy — the last thing they want is attention", "Send a quiet 'how are you' message from your desk"],
        tones: ["good", "neutral", "good"] },
      { time: "2:30 PM",
        scene: "A colleague privately asks you to cover for something they got wrong — 'just say I was in the meeting.' It's not a huge deal, but it is a small lie.",
        stat: { label: "Loyalty vs. honesty", tone: "neutral" },
        choices: ["Refuse gently — 'help them own it, I'll help them draft the apology instead'", "Cover — friends first, small stakes", "Stay out of it, don't answer directly"],
        tones: ["good", "bad", "neutral"] },
      { time: "3:45 PM",
        scene: "Someone you helped weeks ago comes back to say thank you — properly, in person. Not because they had to. You could rush to your next thing or let this moment breathe.",
        stat: { label: "Rare pause", tone: "good" },
        choices: ["Sit with them for 5 minutes, actually hear it — this is why the work exists", "Thank them briefly, get back to the day", "'Not now — thank you though, we'll catch up soon'"],
        tones: ["good", "neutral", "bad"] },
      { time: "4:30 PM",
        scene: "Bureaucratic paperwork. A form, a report, a compliance thing. It'll take 45 minutes and it's due today. Nobody but you will ever read it.",
        stat: { label: "Paper-shuffling", tone: "bad" },
        choices: ["Just do it — the alternative is doing it later plus a follow-up email", "Half-fill it, submit, hope for the best", "Skip it — 'urgent client thing came up' — deal with it Monday"],
        tones: ["good", "bad", "bad"] },
      { time: "5:30 PM",
        scene: "You've been 'on' for other people all day. You're drained. Someone else stops by and needs 30 more minutes.",
        stat: { label: "Empty tank", tone: "bad" },
        choices: ["Give the 30 minutes — this is what the work is, on the days it's hard", "Be honest — 'I'm tapped out today, can we do this first thing tomorrow?'", "Give 10 focused minutes, close it out"],
        tones: ["neutral", "good", "neutral"] },
      { time: "6:45 PM",
        scene: "You wrap the day's scheduled work. Then you notice one loose end — a follow-up call you promised someone yesterday and haven't made. It's after hours. It can wait until tomorrow. But you said today.",
        stat: { label: "Promise vs. energy", tone: "neutral" },
        choices: ["Make the call now — you said you would", "Text them tonight: 'I owe you a proper call — tomorrow morning?'", "Let it slide, address tomorrow, they'll forget"],
        tones: ["good", "good", "bad"] },
      { time: "8:15 PM",
        scene: "You get home. Someone specific was helped today because of you. You'll never fully know how much. You carry a small piece of their day into your evening. That's the whole job in one sentence.",
        stat: { label: "Day done", tone: "good" }, choices: [], tones: [] }
    ]
  },
  "Creative": {
    intro: (label) => `A real day as a ${label}. Mid-project, deadline coming, taste is on the line, and you have a client who thinks 'make it pop' is direction.`,
    scenes: [
      { time: "9:30 AM",
        scene: "You start the day looking at yesterday's work. It's fine. But 'fine' is the enemy. There's a version that's actually good — you just don't know what it is yet.",
        stat: { label: "Fine or good?", tone: "neutral" },
        choices: ["Refine it — 'good' is often one step from 'great,' if you can see it", "Scrap it, start fresh with a bolder idea", "Ship it — 'fine' meets the brief, save your energy"],
        tones: ["good", "good", "bad"] },
      { time: "10:30 AM",
        scene: "You look at three references (other people's work you admire) that are sitting open in your browser. You're intimidated. Your work looks worse compared to theirs. The temptation is to copy.",
        stat: { label: "Reference trap", tone: "neutral" },
        choices: ["Close the references — trust your own eye, revisit for polish later", "Analyze what specifically works in each, apply the principle not the surface", "Copy the strongest reference, iterate from there"],
        tones: ["good", "good", "bad"] },
      { time: "12:00 PM",
        scene: "A client / stakeholder gives feedback that's clearly wrong. It would make the work worse. But they're the client, they're paying, and pushing back has a cost.",
        stat: { label: "Push back?", tone: "bad" },
        choices: ["Push back with specific reasoning, offer two alternatives that keep the intent", "Just do what they said, save the fight for something bigger", "Half-do it, hope they don't notice"],
        tones: ["good", "neutral", "bad"] },
      { time: "1:30 PM",
        scene: "Lunch. Alone. You could scroll social media (comparing your work to strangers' greatest hits) or read something that has nothing to do with your craft.",
        stat: { label: "Input matters", tone: "neutral" },
        choices: ["Read a book or an article — new inputs feed the work", "Scroll strangers' work briefly, then close it", "Scroll — you'll rest your brain"],
        tones: ["good", "neutral", "bad"] },
      { time: "2:30 PM",
        scene: "You get stuck. The idea in your head won't come out right in the actual work. You've stared at it for an hour.",
        stat: { label: "Creative block", tone: "bad" },
        choices: ["Step away — walk, coffee, reset. Your brain will keep working in the background.", "Force it — keep going until it breaks the block", "Show it to someone you trust for a fresh gut check"],
        tones: ["good", "bad", "good"] },
      { time: "3:45 PM",
        scene: "A newer colleague shows you their work-in-progress. It's not there yet — you can see three specific things missing. They're clearly hoping for validation.",
        stat: { label: "Honest vs. kind", tone: "neutral" },
        choices: ["Be specific and honest, kindly. 'Here's what's working, here's what isn't yet.'", "'Looks great' — spare their feelings", "Ask them first: 'what do you think isn't working yet?' — turn it into their own critique"],
        tones: ["good", "bad", "good"] },
      { time: "5:00 PM",
        scene: "A revision request comes back from the client. This is the fourth round. Objectively, round 2 was better than round 4. They've talked themselves in circles.",
        stat: { label: "Diplomatic honesty", tone: "bad" },
        choices: ["Present rounds 2 and 4 side by side, ask them to choose — data over opinion", "Do round 5 as asked, save your energy", "Just re-serve them a slightly polished version of round 2, don't mention it"],
        tones: ["good", "neutral", "neutral"] },
      { time: "6:15 PM",
        scene: "Your project manager (the person who tracks timelines) asks you to 'quickly show progress' in a status meeting tomorrow. Showing half-baked work is risky. Skipping the meeting looks bad.",
        stat: { label: "Show or don't", tone: "neutral" },
        choices: ["Show one specific piece you're happy with, tightly framed, ask specific feedback", "Show a broad progress overview, no work", "Skip the meeting — 'deep in the work, will send an update'"],
        tones: ["good", "neutral", "bad"] },
      { time: "7:00 PM",
        scene: "The work is close. One more push and it'll be right. Everyone else has left the studio. Nobody will know if you cut this corner.",
        stat: { label: "Standards test", tone: "neutral" },
        choices: ["Do the push. You'll know.", "Cut the corner — good enough", "Do part of it, note the rest as 'v2' for tomorrow"],
        tones: ["good", "bad", "neutral"] },
      { time: "9:00 PM",
        scene: "Wrapping up. You look at what you made today next to what you made a year ago. Same job, better craft. You didn't feel yourself getting better in real time. But it's there in the artifact.",
        stat: { label: "Skill compounding", tone: "good" },
        choices: ["Save one specific improvement to a personal 'growth' folder — you'll want it next year", "Just close the laptop, tomorrow is another day", "Post the work — the world should see it"],
        tones: ["good", "good", "neutral"] },
      { time: "10:45 PM",
        scene: "You finish. It's not perfect. But it's yours. Tomorrow someone will critique it, someone else will love it, and you'll critique it too. Tonight, you look at it and know you didn't cheat the work.",
        stat: { label: "Made", tone: "good" }, choices: [], tones: [] }
    ]
  }
};

// Verdict content per career
const CAREER_INSIGHTS = {
  ib: {
    reality: "Hours are brutal — 80-100 per week for 2-3 years. Pay starts at $110-150K plus bonus, $500K-1M by VP level. Path: analyst → associate → VP → MD. Most people quit after 2 years and move to private equity, hedge funds, or startups. It's a golden ticket, but the ticket costs your 20s.",
    fitFor: "someone genuinely obsessed with money, prestige, and being in the room where big decisions happen — who thrives on stress and can grind 80-hour weeks in their 20s without cracking.",
    energized: ["Being in the room where huge deals close", "High-stakes deadline pressure", "Making big-number decisions with real consequences", "The precision of a clean model", "Getting a 'good work' from a partner", "Fast learning by osmosis from senior bankers"],
    drained: ["Zero control over your evenings and weekends", "Endless minor formatting on decks", "Political games with senior bankers", "Cancelling every plan you make", "Feeling replaceable for the first 2 years", "Watching your health quietly deteriorate"],
    dos: [
      "Get exceptionally good at Excel and PowerPoint — it's your job",
      "Always double-check numbers, then check them again — a wrong number kills your reputation",
      "Be responsive on Bloomberg chat, even at 11 PM — visibility matters here",
      "Build a real network with your analyst class — they'll be your professional peers for 20 years",
      "Save aggressively in the first two years — your future self needs the runway to quit"
    ],
    donts: [
      "Never say 'that's not my job' — in IB, everything is your job",
      "Don't hide mistakes — they always surface, and hiding them is what actually ends careers",
      "Don't overpromise on turnarounds you can't deliver — better to say 8 AM tomorrow than 11 PM tonight and miss",
      "Don't compare yourself publicly to your peers — the ranking system will do that for you",
      "Don't burn bridges when you leave — the industry is small and everyone remembers"
    ]
  },
  swe: {
    reality: "Best entry-level pay in tech: $150-250K total comp at top companies (FAANG and up). Real work is 40-50 hours/week, mostly reading and debugging existing code rather than writing new stuff. Path: engineer → senior → staff → principal, or move into tech-lead / engineering management. Skills compound faster here than in most careers.",
    fitFor: "someone who can sit with a hard problem for hours, doesn't need constant human interaction, and gets a real kick from making something work exactly the way they intended.",
    energized: ["The moment code finally runs correctly", "Quiet deep-focus stretches", "Learning new systems from the inside", "Elegant abstractions clicking into place", "Fixing a bug nobody else could find", "Shipping something users actually use"],
    drained: ["Debugging someone else's messy legacy code", "Meetings that should have been Slack messages", "3 AM on-call pages", "Being told to 'just add AI' by product folks", "Long code reviews on tiny changes", "Explaining the same technical constraint to non-technical people repeatedly"],
    dos: [
      "Read code more than you write it — most of your job is understanding what already exists",
      "Write tests (small automated checks) even when nobody asks — future-you will thank you",
      "Communicate proactively — an update every few days beats a surprise slip",
      "Learn one thing deeply per quarter, not five things shallowly",
      "Own your bugs publicly — 'I broke it, I'll fix it' builds more trust than clever excuses"
    ],
    donts: [
      "Don't over-engineer — the simplest solution that works is almost always the right one",
      "Don't skip code reviews to look busy — reviewing well is high-leverage work",
      "Don't work on obviously the wrong thing just because it was assigned — flag it, then either fix scope or execute",
      "Don't ignore incidents just because they're 'not your service' — the on-call rotation is a team promise",
      "Don't measure yourself in lines of code — measure yourself in problems solved"
    ]
  },
  doctor: {
    reality: "4 years of undergrad + 4 years of med school + 3-7 years of residency. Residency means 80+ hour weeks for modest pay ($60-75K per year). Real specialist income ($250-500K, higher in some specialties) doesn't hit until early 30s. Med-school debt is significant. High burnout, high divorce rate — but real, direct, life-altering impact and lifelong respect.",
    fitFor: "someone with unshakeable focus under pressure, deep empathy, and the emotional stamina to keep caring even when patients don't get better and their families are hurting.",
    energized: ["Actually helping someone in real pain", "Solving a hard diagnostic puzzle", "The trust patients place in you", "A patient walking out better than they came in", "Teaching juniors what you learned the hard way", "A clean, correct procedure that goes exactly right"],
    drained: ["Bureaucratic paperwork and hospital politics", "Losing patients you couldn't save", "Years of low pay while non-medical friends earn 3x", "Sleep-deprived clinical judgement", "Families that don't listen or blame you unfairly", "The emotional cost of holding hard news"],
    dos: [
      "Take clinical notes seriously — they're the record if something goes wrong",
      "Learn to explain complex diagnoses in plain everyday words",
      "Sleep whenever you can, even 20 minutes — fatigue is a clinical error",
      "Escalate early when a case is beyond your level — nobody rewards heroism that ends badly",
      "Build a specialist skill your peers don't have — that's how you charge more later"
    ],
    donts: [
      "Never fake certainty when you don't know — patients trust honesty more than confidence",
      "Don't break protocol without a very good reason and documenting it clearly",
      "Don't take patient outcomes personally — you can do everything right and still lose",
      "Don't skip your own health — the burnout rate in this profession is real and specific",
      "Don't let a colleague push a patient's care off on you without formal handoff"
    ]
  },
  founder: {
    reality: "9 out of 10 startups fail. If yours works, you might make $10-100M+ over a decade. If it doesn't, you're older with a resume that says 'founder' — which reads great to some employers and weird to others. Path: idea → validate → build → sell → raise → hire → grow → sell/IPO/die. No safety net, no boss, no default paycheck.",
    fitFor: "someone who genuinely cannot stop building things, who enjoys uncertainty, doesn't need external permission to act, and can hear 'no' 500 times without losing conviction.",
    energized: ["Owning the whole thing — success and failure", "Fast decisions with no committees", "Building something from nothing", "A user saying your product changed their life", "Hiring someone who's better than you", "Closing a customer you fought for"],
    drained: ["Constant financial stress and runway math", "Being publicly wrong on Twitter", "Firing people you actually like", "Investors who ghosts after 'looks interesting'", "Selling every day, even when you hate selling", "The emotional whiplash of good day / bad day / good day"],
    dos: [
      "Talk to users constantly — every week, at minimum 3 conversations, in weeks 1 through 500",
      "Track your runway (months of money left) obsessively — it's the only truly non-negotiable number",
      "Hire slow, fire fast — every senior founder says this and it's still hard to actually do",
      "Ship, measure, iterate — perfectionism kills startups faster than bad product",
      "Be honest with your team about the state of the company — they'll figure it out anyway"
    ],
    donts: [
      "Don't take investor money you don't need — every dollar is a tightening obligation",
      "Don't chase trends (AI, crypto, whatever's hot) unless it's genuinely on your roadmap",
      "Don't hide bad news from the board — surprises kill investor trust permanently",
      "Don't build in secret for a year — get real users on ugly v1 as fast as you can",
      "Don't confuse press/awards/social media with actual traction — vanity metrics are seductive"
    ]
  },
  marketing: {
    reality: "Entry-level pay: $60-90K. Grows fast if you produce hits ($150-300K by senior marketer, $400K+ as CMO). 40-50 hour weeks in normal orgs, chaotic in startups and around launches. The best marketers eventually own P&L (Profit and Loss — the actual business results), not just campaigns.",
    fitFor: "someone who can hold both a creative vision and a data spreadsheet at the same time, and loves reading people's psychology to figure out why they actually buy.",
    energized: ["Watching a campaign go viral", "Testing a wild creative idea and having it work", "Understanding exactly why people bought", "A customer message that says 'your ad made me buy'", "Killing a bad campaign with clean data", "Nailing brand voice on a launch"],
    drained: ["Endless minor tweaks to ad copy", "Getting blamed when sales miss for any reason", "Trend-chasing forever — 'we need a TikTok strategy'", "Agency politics and reshoot budgets", "Reporting to leadership who don't understand attribution", "Watching a great creative die because of a broken landing page"],
    dos: [
      "Own the numbers — ROAS, CAC, LTV — don't hand-wave attribution",
      "Kill underperforming campaigns fast — sunk cost is the marketer's kryptonite",
      "Talk to customers, not just look at dashboards — dashboards lie in specific ways",
      "Write ad copy that sounds like a human, not a corporate press release",
      "Build a portfolio of hits you can point to when you interview for the next job"
    ],
    donts: [
      "Don't chase every platform trend — pick the 2 that fit your customer and go deep",
      "Don't be defensive when creative gets killed — the data is the data",
      "Don't ship risky angles (political, cultural) without stress-testing them with real users first",
      "Don't measure success by impressions alone — impressions don't pay salaries",
      "Don't build a team that only says yes — you'll ship worse work"
    ]
  },
  teacher: {
    reality: "Starting salary: $45-60K (public schools; higher in cities and top private schools; pension + summers off in most public districts). Real income growth is slow ($70-90K even at senior level). Balance is great during term, brutal during exam season and admissions. Emotional labor is huge and mostly invisible on payslips.",
    fitFor: "someone who lights up when a struggling student finally 'gets it,' has patience to explain the same idea five different ways without frustration, and measures success in impact rather than salary.",
    energized: ["When a struggling student's face changes as they understand", "Being genuinely remembered by students 10 years later", "Long summer and winter breaks", "The rhythm of teaching a topic well after several iterations", "Watching a shy kid stand up and present", "A kid choosing your subject for their college major because of your class"],
    drained: ["Grading 40 essentially identical papers", "Parents who don't listen and blame you for their child's marks", "Low pay relative to your effort and hours", "Administrative bureaucracy and reporting", "The one kid in every class you can't reach", "Being expected to be everything (counsellor, guardian, disciplinarian) with no support"],
    dos: [
      "Learn every student's name in the first two weeks — being seen changes performance",
      "Build a bank of examples for every concept — repeat is the medium, not a failure",
      "Push back on unreasonable grading changes — your credibility is your currency long-term",
      "Save the 'thank you' emails and messages — you'll need them in dark weeks",
      "Protect your evenings ferociously — teaching is a marathon, not a sprint week"
    ],
    donts: [
      "Don't humiliate students publicly to make an example — it's the fastest way to lose the room",
      "Don't grade during your kid's football game (or equivalent) — you'll do neither well",
      "Don't take a colleague's or parent's frustration personally when it's really about their own kid",
      "Don't skip lesson prep because you 'know the material' — the material is not the lesson",
      "Don't ignore your own child's teacher parent meetings because you're teaching — set the boundary"
    ]
  },
  consult: {
    reality: "Entry pay at MBB (McKinsey/Bain/BCG): $110-125K base + bonus, rising fast. Path: analyst → consultant → manager → partner. You'll travel 3-4 days per week to client sites, make slides for a living, and get exit options into almost any industry after 2-3 years.",
    fitFor: "someone who can quickly get up to speed on unfamiliar industries, is comfortable presenting to senior executives at 25, and likes solving structured problems more than building something long-term.",
    energized: ["Cracking a hard business problem from scratch", "Learning a new industry in a week", "Presenting to a CEO who takes your recommendation", "Diverse project types every few months", "Sharp, ambitious peers", "Exit options into almost anything"],
    drained: ["Sunday-night flights, Thursday-night flights, every week", "Client politics you can't influence", "Slides that need one more revision, forever", "Being an outsider on every team", "Recommendations that get politely ignored", "The performative side of consulting culture"],
    dos: [
      "Get exceptional at structuring ambiguous problems on a blank whiteboard",
      "Build strong relationships with your case teams — they'll write your reviews",
      "Own the answer, not the process — clients pay for insights, not frameworks",
      "Say the uncomfortable thing in client meetings when it matters — that's the value-add",
      "Use every case to build one deep functional skill you can carry into your next role"
    ],
    donts: [
      "Don't hide behind frameworks when you don't know the answer — clients smell it",
      "Don't overpromise to clients — the delivery falls on your team",
      "Don't skip travel time recovery — the burnout is real and gradual",
      "Don't take internal feedback personally — the up-or-out system is a machine, not a judgement",
      "Don't stay 5+ years unless partner is the actual goal — the exit value plateaus"
    ]
  },
  quant: {
    reality: "Entry pay at top quant firms: $200-500K first year all-in. Path: junior researcher/trader → senior → PM (portfolio manager). Work is heavily code and math, minimal client contact, extreme intellectual difficulty, and directly tied to P&L.",
    fitFor: "someone with deep math intuition, comfort with probability and uncertainty, and the emotional discipline to not blow up when a good bet loses money.",
    energized: ["A strategy backtesting well and holding up live", "The purity of numbers vs. politics", "Working with people who genuinely think in probabilities", "A profit day where you understood exactly why it worked", "Elegant statistical or ML insights", "Compensation directly tied to your performance"],
    drained: ["Losing days you did nothing wrong on", "Watching a beautiful strategy get arbitraged (copied) away", "Regulatory paperwork", "The isolation of pure quant desks", "Explaining what you do to non-quants at family dinners", "The pressure of live money on your ideas"],
    dos: [
      "Master statistics and probability at the intuitive level, not just formulas",
      "Build a research process you can defend to skeptical colleagues",
      "Track your P&L honestly and post-mortem losing days ruthlessly",
      "Learn one language really well (Python or C++) and use it for real, not just notebooks",
      "Read papers weekly — the field moves fast"
    ],
    donts: [
      "Don't overfit — a strategy that fits history perfectly usually fails live",
      "Don't chase the last winning trade — momentum bias will bleed you slowly",
      "Don't scale up a strategy right after it starts working — that's when it fails",
      "Don't hide losses — every quant firm's culture rewards honest post-mortems",
      "Don't skip risk management for a 'high conviction' trade"
    ]
  },
  pm: {
    reality: "Entry-level PM roles are competitive and often require 2-3 years of prior industry experience. Pay: $130-200K at product startups/tech, more at senior levels. You'll never write the code, design the UI, or ship the ad — but you're accountable for whether the product is good.",
    fitFor: "someone who genuinely loves users and can hold conflicting stakeholder inputs in their head at once — engineering wants scope small, design wants scope quality, sales wants scope wide.",
    energized: ["A feature you shipped that users love", "Turning a fuzzy problem into a shipped solution", "Watching a team execute a well-scoped roadmap", "User research sessions with real customers", "Aligning conflicting stakeholders into one decision", "Data confirming a hypothesis you had"],
    drained: ["Meetings, all day, every day", "Being blamed for delays you didn't cause", "Endless prioritization arguments", "Executives who change strategy every quarter", "Producing PRDs (product requirement docs) nobody reads", "Being the person with no direct authority over anyone"],
    dos: [
      "Talk to users every week — nothing replaces this",
      "Say no to features 90% of the time — good PMs are known for what they cut",
      "Write short, sharp PRDs — long docs are usually a substitute for clear thinking",
      "Own the metric — 'the north star,' not the shipped list",
      "Give credit publicly to your engineers and designers — they did the work"
    ],
    donts: [
      "Don't design the UI yourself — trust your designer",
      "Don't estimate engineering — trust your engineers",
      "Don't play political games in exec review meetings — they read as weak",
      "Don't accept vague success criteria from execs — pin them down before you start",
      "Don't ship features to hit deadlines when the feature isn't ready — you'll pay for it in support tickets"
    ]
  },
  ml: {
    reality: "Fastest-growing salaries in tech ($180-400K at 2-5 years, $500K-1M+ at senior/staff level, higher at top AI labs). Work is 70% data cleaning, 20% model training, 10% deploying. Path: ML engineer → senior → staff → research scientist / applied lead. AI is genuinely reshaping this field year to year.",
    fitFor: "someone who's comfortable with ambiguity, loves probability and statistics, and can debug both code and reasoning at the same time.",
    energized: ["A model beating the baseline meaningfully", "Reading a fresh research paper that changes your approach", "Debugging a training run that finally converges", "Deploying a system that noticeably improves user experience", "The pace of the field — genuinely new stuff every month", "Talented, curious peers"],
    drained: ["Data cleaning that takes 6 weeks and feels like nothing", "Training runs that fail overnight", "Explaining 'no, we can't just fine-tune GPT for that' for the 20th time", "GPU shortages and cost anxieties", "Regulatory conversations you're not equipped for", "The gap between paper accuracy and production reality"],
    dos: [
      "Master the fundamentals (linear algebra, probability) — the field will keep shifting on top of them",
      "Reproduce results before trusting them — even famous papers have subtle bugs",
      "Build end-to-end (data → model → deployed) at least once, even if crappy",
      "Instrument your models in production — model quality drifts over time",
      "Keep a running notes file of what you tried and why — you'll re-derive it otherwise"
    ],
    donts: [
      "Don't use a huge model when a small one works — cost adds up fast",
      "Don't skip evaluation — a model without a real metric is a demo, not a product",
      "Don't hype your work — the field is mature enough to spot inflated claims",
      "Don't ignore data quality — model tricks can't fix bad training data",
      "Don't ship without an offline eval set (a held-out benchmark you actually trust)"
    ]
  },
  designer: {
    reality: "Entry-level pay: $90-140K, higher at product startups and top tech. Path: designer → senior → staff / design lead, or move into UX research or product management. Portfolio matters far more than a degree.",
    fitFor: "someone with strong visual taste, patience for feedback cycles, and the ability to translate a product manager's fuzzy problem into a specific screen a user can use.",
    energized: ["A prototype that immediately feels right", "User testing sessions with real users", "A crit (design critique) that improves the work", "Fixing a UX problem that engineers thought was a technical problem", "Building your own systems and reusable components", "A user saying 'I love this feature'"],
    drained: ["Endless minor feedback rounds ('can you make it pop?')", "Being told to design something after engineering already committed to a spec", "Justifying design decisions to non-designers", "Legacy UIs that need to stay consistent with your new work", "Slow tooling and slow file syncs", "Being seen as 'the visual person' instead of a product thinker"],
    dos: [
      "Ship real work into your portfolio, not just concept work",
      "Learn just enough front-end code to speak engineering's language",
      "Take crit publicly, defend decisions with the user in mind not your ego",
      "Sit in on user research even when it's not your feature",
      "Own the details — spacing, typography, motion — those are where designers actually distinguish themselves"
    ],
    donts: [
      "Don't gold-plate features that will get killed — pace your effort with confidence in the roadmap",
      "Don't over-explain your process in reviews — good design speaks first",
      "Don't dismiss engineering constraints as inconvenient — they're usually the shape of the actual problem",
      "Don't chase Dribbble aesthetics that don't serve real users",
      "Don't skip accessibility — 15% of users are affected"
    ]
  },
  econ: {
    reality: "PhD is common (5-6 years), Master's is minimum. Entry pay at the Fed / central banks: $80-120K, higher at IMF/World Bank/consulting. Path: research → senior researcher → policy advisor or academic. It's slow-burn intellectual work with modest pay for the credentialling required.",
    fitFor: "someone who genuinely enjoys thinking about systems and incentives at the scale of countries, has patience for years-long research cycles, and doesn't need fast feedback.",
    energized: ["A research finding that shifts how you understand a policy", "Long, deep engagement with a hard question", "Being consulted by policymakers who take your work seriously", "Debating peers who genuinely care about the ideas", "Time to think — actually think, not react", "Access to data that no one else has cleaned"],
    drained: ["Slow feedback loops (papers take years)", "Policy conversations that ignore your evidence", "The academic job market grind", "Being far from any tangible outcome", "Modest pay compared to peers who went into finance or consulting", "Bureaucratic institutional politics"],
    dos: [
      "Learn to code (Python, R, Stata) at a level where you can clean any dataset yourself",
      "Build one deep methodological skill (causal inference, macro modelling, network econ)",
      "Write clearly — bad writing kills good economics research",
      "Cultivate a network across academia, policy, and think tanks — the roles blur",
      "Care about a real question, not just publishable ones — the good work comes from the former"
    ],
    donts: [
      "Don't chase publication venues over ideas — your CV should tell a coherent story",
      "Don't overfit your models to make them 'work' — reviewers will spot it",
      "Don't dismiss policy folks who don't speak your language — they hold the levers you want to move",
      "Don't ignore under-studied datasets — the interesting questions are often hiding there",
      "Don't skip networking at conferences — economics is more relational than it looks"
    ]
  },
  law: {
    reality: "4-year undergrad + 3-year JD + bar exam. Entry pay at top corporate firms (Big Law): $225K base first year (Cravath scale), rising fast into the $300-400K range by mid-level. Life is document-review-heavy in early years, high-stakes and high-pressure at senior levels. Litigation and public-interest paths are much slower and lower-paid but higher independence.",
    fitFor: "someone with obsessive attention to detail, comfort with dense text, and the patience to work in a hierarchy where the first 5 years are largely paying dues.",
    energized: ["Winning a negotiation because you spotted a comma that mattered", "The precision of well-written contract language", "Working on genuinely important corporate deals", "Being the person who read the whole thing", "Complex intellectual problems", "The trust clients place in you when it counts"],
    drained: ["Sixty-hour weeks doing document review", "Client urgency at 11 PM", "Redlines (contract edits) at 2 AM before a signing", "Partner politics", "Being blamed for opposing counsel's positions", "The slow path to independence"],
    dos: [
      "Get exceptionally good at contract drafting — it's leverage forever",
      "Track your billable hours and quality separately — both matter",
      "Never miss a deadline — legal deadlines are ruthlessly enforced",
      "Learn to negotiate — many lawyers can draft but not many can close",
      "Read the actual documents fully — associates who skim get caught"
    ],
    donts: [
      "Don't give legal advice you're not qualified to give — even informally",
      "Don't fight for a bad clause your senior asked you to include — flag it clearly",
      "Don't burn bridges with opposing counsel — you'll see them again",
      "Don't complain publicly about partners — legal networks are small and gossipy",
      "Don't skip the boring documents — that's where the traps hide"
    ]
  },
  journalist: {
    reality: "Entry pay: $40-60K at major outlets, much less at smaller ones. Path: reporter → senior reporter → editor / bureau chief, or freelance/independent. The field is contracting economically but the best individual journalists have never had more direct reach.",
    fitFor: "someone with intense curiosity, willingness to knock on doors, and the emotional resilience to be told 'no comment' constantly.",
    energized: ["A source finally trusting you enough to talk", "A piece that shifts a public conversation", "The chase — following the thread of a story", "Working sources for months and closing it", "A byline you're proud of", "Real deadline pressure with a real audience"],
    drained: ["Constant financial insecurity", "Editors who kill your best angles", "Trolls after every published story", "Sources who stop trusting you", "Layoffs and shrinking newsrooms", "Being fact-checked into blandness"],
    dos: [
      "Protect your sources' anonymity absolutely — one mistake ends your career",
      "Verify twice before publishing — a wrong story costs more than a slow one",
      "Build a beat (a specific area you cover) and become the expert in it",
      "Learn to write short — most readers don't get past paragraph 3",
      "Publish work that gets attention on your own byline (a Substack, a podcast) — the outlet may not survive"
    ],
    donts: [
      "Never fabricate — even a small quote — it's the one sin that ends careers instantly",
      "Don't fall for narratives that flatter your priors — bad journalism starts here",
      "Don't publish before you've called the other side for comment",
      "Don't take PR pitches as facts — they're marketing dressed as tips",
      "Don't burn a source for a single story — sources are your capital"
    ]
  },
  director: {
    reality: "There's no salary — it's project-by-project. First feature might pay $50-100K total; a hit director makes $1-10M+ per project at senior level, plus back-end. Path: shorts → assistant director → indie feature → studio feature. Success is 40% craft, 40% relationships, 20% who you know and when.",
    fitFor: "someone with a specific point of view and the tenacity to survive years of rejection, cold pitches, and other people's failed projects on the way to their own.",
    energized: ["A scene coming together on set", "An actor finding the thing you couldn't articulate", "The edit turning material into meaning", "A film festival premiere with your audience", "A crew that trusts you", "Being the person who decides"],
    drained: ["Waiting years between films", "Money running out mid-shoot", "Producers changing your vision", "Bad festival cuts", "Being famous enough to be criticized publicly", "Endless meetings that lead nowhere"],
    dos: [
      "Direct short films constantly — cheap ways to learn",
      "Build a crew of people you trust and work with them repeatedly",
      "Watch films with a notebook — steal specific techniques",
      "Say what you actually think in creative meetings — indecisive directors get taken advantage of",
      "Own the vision — everyone else will try to compromise it"
    ],
    donts: [
      "Don't wait for permission — start making things now with what you have",
      "Don't cast for chemistry you don't see in the room",
      "Don't sign contracts without a lawyer reading them",
      "Don't be precious with your material — audiences will tell you what's working",
      "Don't chase awards over the work — the awards follow good work, not the reverse"
    ]
  },
  architect: {
    reality: "5-year B.Arch (or 4-year undergrad + 3-year M.Arch) + long internship + licensing exams. Entry pay: $55-75K (low relative to years of study). Real income comes 10+ years in when you have your own firm or become a design principal ($150-400K+). It's a slow, craft-heavy career with visible, permanent output.",
    fitFor: "someone who thinks in space, has patience for years-long projects, and can hold a design vision through the practical grinding of budgets, contractors, and codes.",
    energized: ["A building coming out of the ground looking like the drawing", "A client who trusts your judgement", "Sketching in a real quiet moment", "Solving a hard site constraint elegantly", "Physical materials (wood, stone, concrete)", "Seeing your work standing in the world 20 years later"],
    drained: ["Working overnights on a competition entry that doesn't win", "Contractors who ignore your specifications", "Clients who redesign your work themselves", "Building codes and regulatory approvals", "Low pay for the years of training", "Firms where you draw toilets for 5 years before anyone lets you design"],
    dos: [
      "Learn one CAD or 3D tool exceptionally well — Revit or Rhino for most",
      "Sketch by hand daily — it's the fastest way to think about space",
      "Visit good architecture in person — photos flatten what matters",
      "Build a portfolio of thoughtful projects, even student ones",
      "Understand construction as well as design — the two decouple in bad architects"
    ],
    donts: [
      "Don't undercharge to win projects — the market equilibrates around it",
      "Don't chase style trends — your best work is quieter than the awards think",
      "Don't dismiss clients' 'ugly' preferences — they live in it, not you",
      "Don't ignore budgets — architects who can't hit budget don't get repeat clients",
      "Don't skip site visits — drawings only get you 60% of the way"
    ]
  },
  chef: {
    reality: "Culinary school + years of low-paid line cook work before any authority. Entry pay: $30-40K a year for line cooks, senior chefs and head chefs at good restaurants earn $80-150K, top head chefs $200K+. Ownership path (your own restaurant) is high-risk. It's physical, hierarchical, brutally paced work.",
    fitFor: "someone with real physical stamina, extreme attention to detail on repetitive tasks, and the ability to keep going during a Saturday-night service when everything is on fire (sometimes literally).",
    energized: ["A perfect plate going out the pass (the counter between kitchen and floor)", "The choreography of a busy service running clean", "Developing a new dish that clicks", "The physical satisfaction of the work", "A guest sending compliments to the kitchen", "A crew that has your back on a hard night"],
    drained: ["Nights, weekends, holidays — always", "Sixteen-hour days on your feet", "Burns, cuts, chronic back pain", "Bad restaurant owners", "Being at the mercy of ingredient availability", "The gap between your food dreams and your budget"],
    dos: [
      "Master knife skills — it's the foundation everything sits on",
      "Learn to work clean — mise en place (prep in place) is 80% of professional cooking",
      "Respect the hierarchy — kitchens run on it",
      "Taste everything you make, always",
      "Cook staff meal well — the crew works harder for chefs who feed them"
    ],
    donts: [
      "Don't undertip your dishwashers — they're the reason service runs",
      "Don't get into ego fights with front-of-house — you're one restaurant, not two",
      "Don't skip prep to look busy on the line — bad prep breaks service later",
      "Don't stay at a restaurant with a toxic chef — kitchens without respect don't produce good food long-term",
      "Don't open your own restaurant on a whim — the math is unforgiving"
    ]
  }
};

const GENERIC_INSIGHTS_BY_GROUP = {
  "Business & Money": {
    reality: (label) => `As a ${label}, expect long hours, high stakes, and rooms full of people who talk fast. Pay ranges wildly but the top of this field pays extremely well. Path is competitive and mostly about who trusts you with more responsibility over time.`,
    fitFor: (label) => `someone who's competitive, comfortable with pressure, reads people well, and can grind through crunch periods without losing composure.`,
    energized: ["Making high-stakes decisions", "Recognition when you win", "The pace of change", "Fast learning by osmosis", "Being trusted with more scope"],
    drained: ["Politics and hierarchy", "Long hours during crunch", "Owning results even when the team dropped the ball", "Cancelled plans", "Zero control over your evenings"],
    dos: [
      "Be aggressively responsive to seniors — visibility is currency here",
      "Track every deliverable, every commitment — nothing slips silently",
      "Learn to structure ambiguous problems on a blank page",
      "Build strong relationships with your peer class — they'll be your network for 20 years",
      "Deliver early when you can — creates optionality when things go wrong"
    ],
    donts: [
      "Never say 'that's not my job' — everything is your job in this field",
      "Don't hide mistakes — they surface, and hiding is what ends careers",
      "Don't burn bridges when you leave — the industry is small",
      "Don't overpromise on turnarounds",
      "Don't measure your worth in bonus size alone — the field is designed to keep you chasing"
    ]
  },
  "Tech & Science": {
    reality: (label) => `As a ${label}, most days are quiet, focused, and behind a screen (or a lab bench). Progress is slow but real. Skills compound fast in this field, and the best in it pair deep technical depth with the ability to explain complex ideas simply.`,
    fitFor: (label) => `someone who can hold a hard problem in their head for hours, is comfortable being wrong on the way to being right, and prefers making things over selling things.`,
    energized: ["The moment something works", "Deep-focus stretches", "Learning constantly", "Elegant solutions clicking into place", "Working with sharp technical peers"],
    drained: ["Interruption-heavy days", "Debugging messy legacy work", "Explaining the same technical concept to non-technical people repeatedly", "Meetings that could have been messages", "Rewriting work because a stakeholder changed their mind"],
    dos: [
      "Read more than you write — most of the work is understanding what already exists",
      "Communicate proactively — an update every few days beats a surprise",
      "Learn one thing deeply per quarter, not five shallowly",
      "Own your work publicly — 'I broke it, I'll fix it' builds trust",
      "Document what you learn — you'll re-derive it otherwise"
    ],
    donts: [
      "Don't over-engineer — the simplest solution that works is usually right",
      "Don't work on obviously the wrong thing — flag it, then execute or fix scope",
      "Don't skip fundamentals — the field will keep shifting on top of them",
      "Don't measure yourself in output volume — measure yourself in problems solved",
      "Don't burn out chasing perfection — the shipped version teaches you more"
    ]
  },
  "People & Impact": {
    reality: (label) => `As a ${label}, your work is deeply human. You'll rarely be rich from this, but you'll have days that mean something. Emotional labor is the biggest hidden cost — plan for it, protect your evenings, and build the recovery habits early.`,
    fitFor: (label) => `someone who genuinely cares about other people's outcomes, can hold hard emotions without collapsing, and measures success in changed lives rather than currency.`,
    energized: ["Direct, visible impact on someone", "Trust from the people you help", "Work with obvious meaning", "Long-term relationships that build over years", "Being genuinely remembered by someone you helped"],
    drained: ["Emotional exhaustion", "Bureaucracy blocking the actual work", "Low pay relative to effort", "The one person you couldn't reach", "Being expected to be everything with no institutional support"],
    dos: [
      "Set boundaries early — this field will happily consume all of you",
      "Save the 'thank you' messages — you'll need them in dark weeks",
      "Learn to say the difficult thing kindly",
      "Build a support system of peers who understand the work",
      "Protect one weekly practice that isn't about anyone else — sanity depends on it"
    ],
    donts: [
      "Don't fake certainty when you don't have it — the people you serve trust honesty more",
      "Don't take other people's frustration personally when it's really about their situation",
      "Don't skip your own recovery — the burnout is real, quiet, and gradual",
      "Don't measure your worth by the person who's still struggling",
      "Don't stay silent when systems around you are hurting the people you're meant to help"
    ]
  },
  "Creative": {
    reality: (label) => `As a ${label}, income is unpredictable and taste is your currency. You'll be rejected constantly. The top of this field is famous and well-paid; the middle is comfortable; the bottom is hard. Craft compounds over decades and isn't easy to shortcut.`,
    fitFor: (label) => `someone with strong taste, willingness to be publicly judged, and enough discipline to make things even when nobody's asking them to.`,
    energized: ["Making something that didn't exist before", "A real audience reacting to your work", "Autonomy over what you spend your day on", "The specific joy of taste applied", "A collaborator who elevates your work"],
    drained: ["Client feedback that ignores craft", "Financial uncertainty between projects", "The gap between your vision and your current skill", "Being publicly critiqued", "Working on projects that die in production"],
    dos: [
      "Ship real work into your portfolio — concepts don't build a reputation",
      "Consume the best of your medium daily — inputs shape outputs",
      "Take critique seriously without taking it personally",
      "Build a body of work over decades, not a single hit",
      "Save money aggressively when work is coming in — feast/famine is the rhythm"
    ],
    donts: [
      "Don't gold-plate work that will get killed — pace effort to project confidence",
      "Don't chase Dribbble/Instagram aesthetics that don't serve the actual project",
      "Don't take a low-paying gig from a client who doesn't respect the craft — it teaches you the wrong lessons",
      "Don't compare your day-to-day to another creative's greatest hits",
      "Don't skip the boring craft skills — that's where good creatives distinguish themselves"
    ]
  }
};

const HEADLINE_TEMPLATES = {
  high: [
    "You handled it — this could actually be your lane.",
    "Fit is strong. Worth digging deeper.",
    "You didn't just survive today, you thrived. Explore this more."
  ],
  mid: [
    "You made it through. Parts worked, parts didn't.",
    "There's real signal both ways — don't rule it out yet.",
    "A mixed day. Depends on which parts felt worth it to you."
  ],
  low: [
    "Rough day. Trust the discomfort — that's data.",
    "You survived, but at what cost. Probably not your fit.",
    "Your choices today suggest this isn't the one."
  ]
};

function loadScript(career) {
  if (SIM_SCRIPTS[career.id]) return SIM_SCRIPTS[career.id];
  const groupTpl = GENERIC_BY_GROUP[career.group] || GENERIC_BY_GROUP["Business & Money"];
  return {
    intro: groupTpl.intro(career.label),
    scenes: groupTpl.scenes,
  };
}

function buildLocalVerdict(career, tones, log = []) {
  const total = tones.length || 1;
  const good = tones.filter(t => t === "good").length;
  const bad = tones.filter(t => t === "bad").length;
  const neutral = total - good - bad;
  const goodRatio = good / total;
  const badRatio = bad / total;

  let behaviorScore = (good * 100 + neutral * 35 + bad * 0) / total;

  let penalty = 0;
  if (badRatio > 0.65) penalty = 38;
  else if (badRatio > 0.5) penalty = 25;
  else if (badRatio > 0.35) penalty = 12;
  behaviorScore = Math.max(0, behaviorScore - penalty);

  const dims = scoreDimensions();
  const hasQuizData = Object.values(dims.interests).some(v => v > 0) || Object.values(dims.strengths).some(v => v > 0);
  const profileFit = hasQuizData ? fitCareer(career.id, dims) : 55;

  let score = Math.round(behaviorScore * 0.70 + profileFit * 0.30);

  if (badRatio > 0.4 && goodRatio < 0.5) score = Math.min(score, 55);
  if (badRatio > 0.55) score = Math.min(score, 45);
  if (badRatio > 0.7) score = Math.min(score, 35);

  score = Math.max(18, Math.min(97, score));
  const tier = score >= 75 ? "high" : score >= 50 ? "mid" : "low";

  const insight = CAREER_INSIGHTS[career.id] || (() => {
    const g = GENERIC_INSIGHTS_BY_GROUP[career.group] || GENERIC_INSIGHTS_BY_GROUP["Business & Money"];
    return {
      reality: g.reality(career.label),
      fitFor: g.fitFor(career.label),
      energized: g.energized,
      drained: g.drained,
      dos: g.dos,
      donts: g.donts,
    };
  })();
  const templates = HEADLINE_TEMPLATES[tier];
  const headline = templates[Math.abs((career.id.length + tones.length) % templates.length)];
  const dayRead = buildDayRead({ good, bad, neutral, total, goodRatio, badRatio });

  // Detailed, per-choice reasoning that references specific decisions + quiz dims
  const reasoning = buildDetailedReasoning({
    good, bad, neutral, total, goodRatio, badRatio,
    score, tier, career, profileFit, behaviorScore, penalty,
    tones, log, dims, hasQuizData,
  });

  const choiceLog = (log || []).filter(e => e && e.choice !== null && e.choice !== undefined);
  const energized = personalizeEnergized(insight, dims, tones, choiceLog, career, hasQuizData);
  const drained = personalizeDrained(insight, dims, tones, choiceLog, career, hasQuizData);

  return {
    score,
    headline,
    dayRead,
    reasoning,
    energized,
    drained,
    reality: insight.reality,
    fitFor: insight.fitFor,
    dos: (insight.dos || []).slice(0, 5),
    donts: (insight.donts || []).slice(0, 5),
    tally: { good, bad, neutral, total, profileFit: Math.round(profileFit), behaviorScore: Math.round(behaviorScore) },
  };
}

// ============================================================
// PERSONALIZED ENERGIZED / DRAINED
// ============================================================
function personalizeEnergized(insight, dims, tones, choiceLog, career, hasQuizData) {
  const items = [];
  const s = dims.strengths || {};
  const i = dims.interests || {};
  const v = dims.values || {};

  // 1. Tie to strongest strength (if strong enough)
  if (hasQuizData) {
    const strengthItem = strengthEnergizer(s, career);
    if (strengthItem) items.push(strengthItem);
  }

  // 2. Best sim moment — quote it
  const bestMoment = pickBestMoment(choiceLog, tones, career);
  if (bestMoment) items.push(momentEnergizer(bestMoment, career));

  // 3. Tie to top matching interest or value
  if (hasQuizData) {
    const interestItem = interestEnergizer(i, career);
    if (interestItem && !items.some(x => x === interestItem)) items.push(interestItem);
    else {
      const valueItem = valueEnergizer(v, career);
      if (valueItem) items.push(valueItem);
    }
  }

  // 4. Fill with career defaults (skip near-duplicates)
  const defaults = insight.energized || [];
  for (const d of defaults) {
    if (items.length >= 4) break;
    if (!items.some(x => x.toLowerCase().includes(d.toLowerCase().slice(0, 25)))) items.push(d);
  }

  return items.slice(0, 4);
}

function personalizeDrained(insight, dims, tones, choiceLog, career, hasQuizData) {
  const items = [];
  const w = dims.weaknesses || {};
  const v = dims.values || {};
  const s = dims.strengths || {};

  // 1. Tie to top weakness (specific % + why this career punishes it)
  if (hasQuizData) {
    const weaknessItem = weaknessDrainer(w, career);
    if (weaknessItem) items.push(weaknessItem);
  }

  // 2. Worst sim moment — quote it
  const worstMoments = pickWorstMoments(choiceLog, tones, career, 1);
  if (worstMoments.length) items.push(momentDrainer(worstMoments[0], career));

  // 3. Value/career mismatch
  if (hasQuizData) {
    const mismatchItem = valueMismatchDrainer(v, career);
    if (mismatchItem) items.push(mismatchItem);
  }

  // 4. Fill with career defaults
  const defaults = insight.drained || [];
  for (const d of defaults) {
    if (items.length >= 4) break;
    if (!items.some(x => x.toLowerCase().includes(d.toLowerCase().slice(0, 25)))) items.push(d);
  }

  return items.slice(0, 4);
}

function strengthEnergizer(s, career) {
  const careerLower = career.label.toLowerCase();
  const cands = [];
  if ((s.logic || 0) >= 60) cands.push({ score: s.logic, msg: `Applying your logic strength (${s.logic}%) — a huge share of a ${careerLower}'s day is exactly this` });
  if ((s.focus || 0) >= 60) cands.push({ score: s.focus, msg: `Long deep-focus stretches — your focus at ${s.focus}% is your natural gear, and this career gives you real windows for it` });
  if ((s.creativity || 0) >= 65) cands.push({ score: s.creativity, msg: `The moments that need original thinking — your creativity (${s.creativity}%) is what would carry those` });
  if ((s.empathy || 0) >= 65) cands.push({ score: s.empathy, msg: `Reading the room correctly — your empathy (${s.empathy}%) shows up as a strength in every interaction here` });
  if ((s.leadership || 0) >= 65) cands.push({ score: s.leadership, msg: `Taking ownership before anyone asks — your leadership (${s.leadership}%) is the exact trait seniors watch for` });
  if ((s.speaking || 0) >= 65) cands.push({ score: s.speaking, msg: `Being trusted in front of the room — your speaking strength (${s.speaking}%) matters here more than most careers` });
  if ((s.writing || 0) >= 65) cands.push({ score: s.writing, msg: `The moments that need clean written communication — your writing (${s.writing}%) shows up as an unfair advantage here` });
  cands.sort((a, b) => b.score - a.score);
  return cands[0]?.msg || null;
}

function interestEnergizer(int, career) {
  const cands = [];
  if ((int.analytical || 0) >= 60) cands.push({ score: int.analytical, msg: `The problem-solving side of the work — your analytical interest (${int.analytical}%) makes those moments feel like play` });
  if ((int.creative || 0) >= 60) cands.push({ score: int.creative, msg: `The moments that let you shape the output — your creative pull (${int.creative}%) makes those feel earned` });
  if ((int.social || 0) >= 60) cands.push({ score: int.social, msg: `The people-facing parts of the job — your interest in connecting (${int.social}%) turns those into fuel, not tax` });
  if ((int.entrepreneurial || 0) >= 60) cands.push({ score: int.entrepreneurial, msg: `Being handed something to build from scratch — your entrepreneurial pull (${int.entrepreneurial}%) reads those as opportunities` });
  if ((int.investigative || 0) >= 65) cands.push({ score: int.investigative, msg: `Going deep on why something works — your investigative pull (${int.investigative}%) makes the research phase feel worthwhile` });
  if ((int.practical || 0) >= 60) cands.push({ score: int.practical, msg: `Making something real that ships — your practical interest (${int.practical}%) needs an output at the end of the day` });
  cands.sort((a, b) => b.score - a.score);
  return cands[0]?.msg || null;
}

function valueEnergizer(v, career) {
  const grp = career.group;
  if ((v.money || 0) >= 65 && grp === "Business & Money") return `The financial upside — your quiz shows money value at ${v.money}%, and this is a career that actually delivers on it`;
  if ((v.impact || 0) >= 65 && grp === "People & Impact") return `Seeing your work change someone's day — your impact value (${v.impact}%) is exactly what this career hands you`;
  if ((v.creativity_val || 0) >= 65 && grp === "Creative") return `Owning what you make — your creativity value (${v.creativity_val}%) needs this and this career gives it`;
  if ((v.freedom || 0) >= 65) return `The moments of autonomy — your freedom value (${v.freedom}%) makes those feel like the whole point`;
  if ((v.growth || 0) >= 65) return `The steep learning curve — your growth value (${v.growth}%) reads this as a feature, not a stress`;
  if ((v.prestige || 0) >= 65) return `Being genuinely respected in the field — your prestige value (${v.prestige}%) makes the ladder feel worth climbing`;
  return null;
}

function momentEnergizer(moment, career) {
  const shortChoice_ = shortChoice(moment.choice);
  return `That ${moment.time} moment — when you chose "${shortChoice_.length > 60 ? shortChoice_.slice(0, 57) + "…" : shortChoice_}" — days built around that feeling would light you up`;
}

function weaknessDrainer(w, career) {
  const careerLower = career.label.toLowerCase();
  const cands = [];
  if ((w.conflict_avoid || 0) >= 55) cands.push({ score: w.conflict_avoid, msg: `The constant hard conversations — your conflict-avoidance (${w.conflict_avoid}%) means these would cost you double what they cost a natural fit` });
  if ((w.social_drain || 0) >= 55) cands.push({ score: w.social_drain, msg: `The daily people-load — your quiz shows people-drain at ${w.social_drain}%, and this career doesn't let up on it` });
  if ((w.procrastination || 0) >= 55) cands.push({ score: w.procrastination, msg: `The tasks nobody's checking on — your procrastination (${w.procrastination}%) meets a job where nobody will chase you, and it costs you` });
  if ((w.perfectionism || 0) >= 55) cands.push({ score: w.perfectionism, msg: `The "ship it, we'll fix it" tempo — your perfectionism (${w.perfectionism}%) fights this career's speed at every deadline` });
  if ((w.boredom || 0) >= 55) cands.push({ score: w.boredom, msg: `The repetitive stretches — your quiz shows quitting-when-bored at ${w.boredom}%, and there are more of those here than the brochure admits` });
  if ((w.focus_bad || 0) >= 55) cands.push({ score: w.focus_bad, msg: `The interruption-heavy rhythm — your focus-loss (${w.focus_bad}%) means you'd lose the day to context-switching alone` });
  if ((w.detail_bad || 0) >= 55) cands.push({ score: w.detail_bad, msg: `The precision this career demands — your detail-slip (${w.detail_bad}%) is exactly what would compound into visible mistakes here` });
  cands.sort((a, b) => b.score - a.score);
  return cands[0]?.msg || null;
}

function valueMismatchDrainer(v, career) {
  const grp = career.group;
  if ((v.balance || 0) >= 65 && (grp === "Business & Money" || grp === "People & Impact")) return `The evenings and weekends this career eats — your balance value (${v.balance}%) would feel constantly violated`;
  if ((v.stability || 0) >= 65 && grp === "Creative") return `The income uncertainty — your stability value (${v.stability}%) meets a career where next month's paycheck isn't a given`;
  if ((v.money || 0) >= 65 && (grp === "People & Impact" || grp === "Creative")) return `The ceiling on early-career pay — your money value (${v.money}%) meets a field where meaningful money comes late, if at all`;
  if ((v.freedom || 0) >= 70 && grp === "Business & Money") return `The hierarchy and face-time — your freedom value (${v.freedom}%) meets a career where senior approval gates almost everything`;
  if ((v.creativity_val || 0) >= 65 && grp === "Business & Money") return `The repetitive execution work — your need for creative expression (${v.creativity_val}%) doesn't get much room here` ;
  return null;
}

function momentDrainer(moment, career) {
  const shortChoice_ = shortChoice(moment.choice);
  return `The ${moment.time} kind of moment — when you chose "${shortChoice_.length > 60 ? shortChoice_.slice(0, 57) + "…" : shortChoice_}" — days full of these would grind you down`;
}

function buildDetailedReasoning({ good, bad, neutral, total, goodRatio, badRatio, score, tier, career, profileFit, behaviorScore, penalty, tones, log, dims, hasQuizData }) {
  const lines = [];
  const goodPct = Math.round(goodRatio * 100);
  const badPct = Math.round(badRatio * 100);
  const careerLower = career.label.toLowerCase();

  // Align log to tones (log may include a closing beat with choice: null)
  const choiceLog = (log || []).filter(e => e && e.choice !== null && e.choice !== undefined);

  // --- 1. OPENING — overall pattern
  if (tier === "high")
    lines.push({
      kind: "opening",
      label: "The pattern",
      body: `You made the call the way a real ${careerLower} would in ${good} of ${total} scenes (${goodPct}%). That's not luck — that's a pattern. The behaviours that separate insiders from tourists in this career showed up in your specific choices.`,
    });
  else if (tier === "mid")
    lines.push({
      kind: "opening",
      label: "The pattern",
      body: `Across ${total} decisions, you nailed ${good} (${goodPct}%) and missed ${bad} (${badPct}%). That's a middle-of-the-pack day — and unfortunately, this career doesn't reward middle-of-the-pack. First-year attrition is highest for exactly this profile.`,
    });
  else
    lines.push({
      kind: "opening",
      label: "The pattern",
      body: `You missed ${bad} of ${total} decisions (${badPct}%). In ${careerLower} work, missed calls compound — one wrong turn in the morning becomes a crisis at 8 PM. Your score reflects what your specific choices would cost you here, not just your average.`,
    });

  // --- 2. WORST CALLS — up to 2, quote specific choices
  const worstMoments = pickWorstMoments(choiceLog, tones, career, 2);
  worstMoments.forEach((m) => {
    lines.push({
      kind: "miss",
      label: `${m.time} — the miss`,
      body: buildMissLine(m, dims, career, hasQuizData),
    });
  });

  // --- 3. BEST CALL — quote the strongest good moment
  const bestMoment = pickBestMoment(choiceLog, tones, career);
  if (bestMoment) {
    lines.push({
      kind: "clutch",
      label: `${bestMoment.time} — the clutch call`,
      body: buildClutchLine(bestMoment, dims, career, hasQuizData),
    });
  }

  // --- 4. PROFILE TIE-IN — how their report predicted this
  if (hasQuizData) {
    lines.push({
      kind: "profile",
      label: "What your report predicted",
      body: buildProfileTieIn(dims, career, tier, profileFit),
    });
  }

  // --- 5. MATH — transparent scoring
  lines.push({
    kind: "math",
    label: "The math",
    body: `Score = 70% behaviour (${Math.round(behaviorScore)}${penalty ? `, after a ${penalty}-point penalty for the miss rate` : ""}) + 30% quiz profile alignment (${Math.round(profileFit)}). Behaviour outweighs profile because on a real Tuesday, only your calls actually matter — the compass just checks whether you're consistent with your own answers.`,
  });

  return lines;
}

// Pick worst-hitting bad calls — prioritize high-stakes scenes (stat.tone === "bad")
function pickWorstMoments(log, tones, career, n = 2) {
  const picks = [];
  const bads = [];
  for (let i = 0; i < log.length && i < tones.length; i++) {
    if (tones[i] === "bad") bads.push({ ...log[i], idx: i, weight: log[i].stat?.tone === "bad" ? 2 : log[i].stat?.tone === "neutral" ? 1 : 0.5 });
  }
  bads.sort((a, b) => b.weight - a.weight);
  return bads.slice(0, n);
}

function pickBestMoment(log, tones, career) {
  const goods = [];
  for (let i = 0; i < log.length && i < tones.length; i++) {
    if (tones[i] === "good") goods.push({ ...log[i], idx: i, weight: log[i].stat?.tone === "bad" ? 2 : log[i].stat?.tone === "neutral" ? 1 : 0.5 });
  }
  if (!goods.length) return null;
  goods.sort((a, b) => b.weight - a.weight);
  return goods[0];
}

function shortChoice(text) {
  if (!text) return "";
  const t = String(text).trim();
  return t.length > 140 ? t.slice(0, 137) + "…" : t;
}

function buildMissLine(m, dims, career, hasQuizData) {
  const stakes = m.stat?.tone === "bad" ? "high-pressure" : m.stat?.tone === "neutral" ? "mid-pressure" : "quiet";
  const parts = [];
  parts.push(`At ${m.time}, in a ${stakes} moment, you chose: "${shortChoice(m.choice)}".`);

  // Why this choice was weak
  parts.push(`That's the ${stakes === "high-pressure" ? "shortcut that costs people their reputation in this field" : "choice that reads as passive to seniors who watch closely"} — the version an experienced ${career.label.toLowerCase()} would make looks very different.`);

  // Show the correct call from the same scene
  const better = pickBetterChoice(m);
  if (better) {
    parts.push(`The stronger call was: "${shortChoice(better)}" — that's what a seasoned ${career.label.toLowerCase()} would have done here.`);
  }

  // Tie to profile if available
  if (hasQuizData) {
    const tie = tieMissToProfile(dims);
    if (tie) parts.push(tie);
  }

  return parts.join(" ");
}

// From the scene's own choices, pick the "good" one (or fall back to a neutral one) that isn't what the user chose.
function pickBetterChoice(m) {
  const choices = m.choices || [];
  const tones = m.tones || [];
  const chosen = m.choice;
  let goodPick = null;
  let neutralPick = null;
  for (let i = 0; i < choices.length; i++) {
    const c = choices[i];
    const text = choiceText(c);
    if (text === chosen) continue;
    const tone = choiceTone(c, tones, i);
    if (tone === "good" && !goodPick) goodPick = text;
    else if (tone === "neutral" && !neutralPick) neutralPick = text;
  }
  return goodPick || neutralPick || null;
}

function buildClutchLine(m, dims, career, hasQuizData) {
  const stakes = m.stat?.tone === "bad" ? "under real pressure" : m.stat?.tone === "neutral" ? "when the stakes were normal" : "in a routine moment";
  const parts = [];
  parts.push(`At ${m.time}, ${stakes}, you chose: "${shortChoice(m.choice)}".`);
  parts.push(`That's the call a senior in this career actually makes — and importantly, it's not the obvious or comfortable one. You showed real judgment there.`);

  if (hasQuizData) {
    const tie = tieClutchToProfile(dims);
    if (tie) parts.push(tie);
  }

  return parts.join(" ");
}

function tieMissToProfile(dims) {
  const w = dims.weaknesses || {};
  const s = dims.strengths || {};
  const v = dims.values || {};
  const candidates = [];
  if ((w.conflict_avoid || 0) >= 55) candidates.push({ dim: "conflict_avoid", score: w.conflict_avoid, msg: `Your report shows conflict-avoidance at ${w.conflict_avoid}% — the compass predicted you'd default to the "safe" option when the room got tense. This is exactly that moment.` });
  if ((w.procrastination || 0) >= 55) candidates.push({ dim: "procrastination", score: w.procrastination, msg: `Your report shows procrastination at ${w.procrastination}% — you tend to delay uncomfortable calls, which is what happened here.` });
  if ((w.perfectionism || 0) >= 60 && (w.procrastination || 0) >= 50) candidates.push({ dim: "perfectionism", score: w.perfectionism, msg: `Your report flagged perfectionism (${w.perfectionism}%) + procrastination (${w.procrastination}%) — you froze looking for the "right" answer instead of picking the workable one.` });
  if ((w.social_drain || 0) >= 55 && (s.speaking || 0) < 55) candidates.push({ dim: "social_drain", score: w.social_drain, msg: `Your report shows people-drain at ${w.social_drain}% and moderate speaking (${s.speaking}%) — reaching for the passive option here matches that profile exactly.` });
  if ((v.balance || 0) >= 60) candidates.push({ dim: "balance", score: v.balance, msg: `Your report shows balance at ${v.balance}% — you value your evenings, and this choice looks like an attempt to protect them. Fair, but this career rarely lets you.` });
  candidates.sort((a, b) => b.score - a.score);
  return candidates[0]?.msg || null;
}

function tieClutchToProfile(dims) {
  const s = dims.strengths || {};
  const i = dims.interests || {};
  const candidates = [];
  if ((s.logic || 0) >= 65) candidates.push({ score: s.logic, msg: `Your report shows logic at ${s.logic}% — this is your natural strength on display. When the situation asked for structured thinking, you delivered.` });
  if ((s.focus || 0) >= 65) candidates.push({ score: s.focus, msg: `Your report shows focus at ${s.focus}% — you didn't get pulled by the distractions, which is exactly what your quiz predicted.` });
  if ((s.empathy || 0) >= 65) candidates.push({ score: s.empathy, msg: `Your report shows empathy at ${s.empathy}% — you read the room correctly. That's the strength that made this call.` });
  if ((s.leadership || 0) >= 65) candidates.push({ score: s.leadership, msg: `Your report shows leadership at ${s.leadership}% — you took ownership when you didn't have to. That instinct is what senior people watch for.` });
  if ((i.investigative || 0) >= 70) candidates.push({ score: i.investigative, msg: `Your report shows investigative at ${i.investigative}% — you went for the option that actually digs into the problem, which is what the sim rewards here.` });
  candidates.sort((a, b) => b.score - a.score);
  return candidates[0]?.msg || null;
}

function buildProfileTieIn(dims, career, tier, profileFit) {
  const topInterest = Object.entries(dims.interests || {}).sort((a, b) => b[1] - a[1])[0];
  const topStrength = Object.entries(dims.strengths || {}).sort((a, b) => b[1] - a[1])[0];
  const topWeakness = Object.entries(dims.weaknesses || {}).sort((a, b) => b[1] - a[1])[0];
  const topValue = Object.entries(dims.values || {}).sort((a, b) => b[1] - a[1])[0];

  const parts = [];
  parts.push(`Your quiz profile predicted a ${profileFit}/100 fit for ${career.label} — ${profileFit >= 70 ? "strong" : profileFit >= 55 ? "moderate" : "weak"}.`);

  if (topInterest && topInterest[1] >= 60 && topStrength && topStrength[1] >= 60) {
    parts.push(`Your top interest (${DIM_LABELS.interests[topInterest[0]]}, ${topInterest[1]}%) and top strength (${DIM_LABELS.strengths[topStrength[0]]}, ${topStrength[1]}%) both ${tier === "high" ? "aligned with what the sim rewarded" : tier === "mid" ? "partly matched what the sim rewarded — but not enough to carry a whole day" : "pulled you in a different direction from what this career needs"}.`);
  }

  if (topWeakness && topWeakness[1] >= 55 && (tier === "low" || tier === "mid")) {
    parts.push(`Your top friction point (${DIM_LABELS.weaknesses[topWeakness[0]]}, ${topWeakness[1]}%) is exactly the trait this career punishes hardest.`);
  }

  if (topValue && topValue[1] >= 65) {
    const valMatch = valueMatchesCareer(topValue[0], career.group);
    parts.push(`Your top value (${DIM_LABELS.values[topValue[0]]}, ${topValue[1]}%) ${valMatch ? "aligns" : "doesn't fully align"} with what this career actually delivers day-to-day.`);
  }

  return parts.join(" ");
}

function valueMatchesCareer(valueKey, group) {
  const map = {
    money: ["Business & Money"],
    impact: ["People & Impact"],
    creativity_val: ["Creative"],
    prestige: ["Business & Money", "Tech & Science"],
    growth: ["Tech & Science", "Business & Money"],
    freedom: ["Creative", "Business & Money"],
    stability: ["People & Impact", "Tech & Science"],
    balance: ["People & Impact"],
  };
  return (map[valueKey] || []).includes(group);
}

function buildDayRead({ good, bad, neutral, total, goodRatio, badRatio }) {
  if (goodRatio >= 0.65 && badRatio <= 0.15)
    return `You made ${good} strong calls out of ${total} — that's the hit rate someone who'd thrive here shows.`;
  if (goodRatio >= 0.5 && badRatio <= 0.25)
    return `You made ${good} strong calls, ${bad} weak ones, ${neutral} in between. Solid overall — you'd survive the day with some rough edges.`;
  if (badRatio > goodRatio)
    return `You made ${bad} weak calls to ${good} strong ones. That's not the ratio of someone in their lane — the discomfort you felt was signal, not noise.`;
  if (badRatio > 0.35)
    return `You made ${good} strong calls and ${bad} weak ones out of ${total}. In a career this unforgiving, ${bad} misses is a lot.`;
  return `You were roughly split — ${good} strong, ${bad} weak, ${neutral} in the middle. Mixed day; not obviously your lane.`;
}


function buildLocalReport() {
  const dims = scoreDimensions();
  const scored = CAREERS.map(c => ({ ...c, fit: fitCareer(c.id, dims) })).sort((a, b) => b.fit - a.fit);
  const avoid = scored.filter(c => c.fit < 55).slice(-3).reverse();

  const enrichedTop = scored.slice(0, 5).map(c => {
    const ins = CAREER_INSIGHTS[c.id] || (() => {
      const g = GENERIC_INSIGHTS_BY_GROUP[c.group] || GENERIC_INSIGHTS_BY_GROUP["Business & Money"];
      return { reality: g.reality(c.label), fitFor: g.fitFor(c.label), dos: g.dos, donts: g.donts };
    })();
    return {
      career: c.label,
      group: c.group,
      fit: c.fit,
      why: whyCareerFits(c.id, dims),
      reality: ins.reality,
      fitFor: ins.fitFor,
      dos: (ins.dos || []).slice(0, 4),
      donts: (ins.donts || []).slice(0, 4),
    };
  });

  const signature = buildSignature(dims);
  const patterns = buildPatterns(dims);
  const contrasts = buildContrasts(dims);
  const quizBreakdown = buildQuizBreakdown(dims);
  const simInsights = state.completedSims.length ? buildSimInsights(state.completedSims) : null;

  return {
    headline: generateHeadline(dims),
    profile: generateProfile(dims),
    signature,
    quizBreakdown,
    patterns,
    contrasts,
    topFields: getTopFields(scored),
    topCareers: enrichedTop,
    avoid: avoid.map(c => ({ career: c.label, why: whyAvoid(c.id, dims), group: c.group })),
    superpowers: getSuperpowers(dims),
    watchouts: getWatchouts(dims),
    sixMonthPlan: generatePlan(scored, dims),
    simInsights,
  };
}

// Per-quiz breakdown — what the test results actually said
function buildQuizBreakdown(dims) {
  const takeTop = (obj, n = 3, threshold = 40) => Object.entries(obj)
    .filter(([_, v]) => v >= threshold)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n);

  const bands = (score) => {
    if (score >= 75) return "very strong";
    if (score >= 60) return "strong";
    if (score >= 45) return "moderate";
    if (score >= 30) return "mild";
    return "weak";
  };

  const sections = [];

  // Interests
  const topInterests = takeTop(dims.interests, 3, 35);
  if (topInterests.length) {
    sections.push({
      key: "interests",
      title: "What actually interests you",
      lead: topInterests[0] ? `Your strongest pull is toward ${DIM_LABELS.interests[topInterests[0][0]]}.` : "",
      bars: topInterests.map(([k, v]) => ({ label: cap(DIM_LABELS.interests[k]), score: v, band: bands(v) })),
      takeaway: interestTakeaway(topInterests),
    });
  }

  // Strengths
  const topStrengths = takeTop(dims.strengths, 4, 40);
  if (topStrengths.length) {
    sections.push({
      key: "strengths",
      title: "What you're actually good at",
      lead: `You're strongest at ${DIM_LABELS.strengths[topStrengths[0][0]]}${topStrengths[1] ? ` and ${DIM_LABELS.strengths[topStrengths[1][0]]}` : ""}.`,
      bars: topStrengths.map(([k, v]) => ({ label: cap(DIM_LABELS.strengths[k]), score: v, band: bands(v) })),
      takeaway: strengthTakeaway(topStrengths),
    });
  }

  // Weaknesses
  const topWeak = takeTop(dims.weaknesses, 3, 45);
  if (topWeak.length) {
    sections.push({
      key: "weaknesses",
      title: "Where you struggle",
      lead: topWeak[0] ? `Your biggest friction point: ${DIM_LABELS.weaknesses[topWeak[0][0]]}.` : "",
      bars: topWeak.map(([k, v]) => ({ label: cap(DIM_LABELS.weaknesses[k]), score: v, band: bands(v) })),
      takeaway: weaknessTakeaway(topWeak),
    });
  } else {
    sections.push({
      key: "weaknesses",
      title: "Where you struggle",
      lead: "You didn't flag any major friction points — either you're self-aware and steady, or being a bit generous with yourself.",
      bars: [],
      takeaway: "No dominant weakness dimension surfaced. Watch for this next year — most people find their real friction only after they hit real deadlines.",
    });
  }

  // Values
  const topValues = takeTop(dims.values, 3, 45);
  if (topValues.length) {
    sections.push({
      key: "values",
      title: "What you actually want out of work",
      lead: topValues[0] ? `${cap(DIM_LABELS.values[topValues[0][0]])} matters most to you.` : "",
      bars: topValues.map(([k, v]) => ({ label: cap(DIM_LABELS.values[k]), score: v, band: bands(v) })),
      takeaway: valuesTakeaway(topValues),
    });
  }

  // Work style — different structure (categorical picks)
  const wsPicks = Object.keys(dims.workstyle).filter(k => dims.workstyle[k]);
  if (wsPicks.length) {
    sections.push({
      key: "workstyle",
      title: "How you work best",
      lead: `You picked ${wsPicks.length} preference${wsPicks.length > 1 ? "s" : ""} for how you like to work.`,
      picks: wsPicks.map(k => k.replace(/_/g, " ")),
      takeaway: workstyleTakeaway(wsPicks),
    });
  }

  return sections;
}

function interestTakeaway(top) {
  const set = new Set(top.map(([k]) => k));
  if (set.has("analytical") && set.has("investigative"))
    return "You're the kind of person who wants to understand things at the root, not just use them. Careers built on deep thinking will feel like home.";
  if (set.has("creative") && set.has("entrepreneurial"))
    return "You want to make things AND launch them into the world. That combination is rarer than either one alone — it's the founder-artist profile.";
  if (set.has("social") && set.has("creative"))
    return "You're drawn to work that mixes storytelling with human connection. Marketing, journalism, teaching, and film all live here.";
  if (set.has("practical") && set.has("analytical"))
    return "You want to build things that work — and understand why they work. Engineering, product, medicine, architecture all reward this combination.";
  if (set.has("entrepreneurial"))
    return "You're pulled toward starting things. That energy is the raw material for founding a company, but also for leading inside one.";
  return "Your interest profile leans in one clear direction. Careers that don't play to your dominant interest will feel like uphill work.";
}

function strengthTakeaway(top) {
  const set = new Set(top.map(([k]) => k));
  if (set.has("focus") && set.has("logic"))
    return "Deep-focus + logical reasoning is the exact combo that reward-compounds in engineering, research, quant work, and medicine. Rare and valuable.";
  if (set.has("creativity") && set.has("writing"))
    return "You have taste AND the discipline to translate ideas into finished output. Most creative people have one, not both.";
  if (set.has("empathy") && set.has("speaking"))
    return "You read the room and can talk to it. Teaching, therapy, sales, and any people-leading role rewards this combination.";
  if (set.has("leadership") && set.has("speaking"))
    return "You're built to be in front. Look for careers where being visible early is a feature, not a bug.";
  return "You have real strengths here — the question isn't whether they're valuable, but which career pays you the most for exactly these.";
}

function weaknessTakeaway(top) {
  const set = new Set(top.map(([k]) => k));
  if (set.has("procrastination") && set.has("perfectionism"))
    return "The perfectionism-procrastination loop is the classic \"brilliant but can't ship\" trap. Look for careers with tight external deadlines that force output — solo craft careers will burn you.";
  if (set.has("social_drain"))
    return "People drain you. That's not a flaw — but it means you need real recovery time, and client-heavy careers (sales, consulting, hospitality) will run you down. Deep-focus work is your friend.";
  if (set.has("boredom"))
    return "You quit things when they get boring. Look for careers with genuine variety — early startups, journalism, medicine, or roles that rotate you through problems.";
  if (set.has("conflict_avoid"))
    return "You avoid hard conversations. In careers where the hard conversation IS the job (management, therapy, senior leadership), you'll need to build this deliberately.";
  return "Every dominant weakness cuts off some careers cleanly. Better to know now than in year three.";
}

function valuesTakeaway(top) {
  const set = new Set(top.map(([k]) => k));
  if (set.has("money") && set.has("balance"))
    return "You want serious money and real work-life balance. Both are possible — but rarely in year 1. Most people who end up with both got the money first, then bought the balance.";
  if (set.has("freedom") && set.has("stability"))
    return "You want autonomy AND predictability. Look at established solo careers (medicine, law, senior craft roles) or senior positions at stable companies. Avoid raw startups.";
  if (set.has("impact") && set.has("money"))
    return "Impact and money together is possible — but narrower than either alone. Look at impact-investing, tech-for-good, or founding something that solves a real problem.";
  if (set.has("creativity_val") && set.has("prestige"))
    return "You want to make things AND be known for them. Both are possible but usually delayed — most respected creatives went unknown for 5–10 years first.";
  if (top[0] && top[0][0] === "impact")
    return "Meaning matters more than money to you. That's clarifying — a lot of high-paying careers will feel hollow, and you'd be right to skip them.";
  if (top[0] && top[0][0] === "money")
    return "You're honest about wanting real financial rewards. That's clarifying — the careers that pay well demand specific tradeoffs, and you're ready for them.";
  return "Your value profile is what should filter your career list first. Careers that violate your top value will burn you out even if you're technically good at them.";
}

function workstyleTakeaway(picks) {
  const set = new Set(picks);
  const parts = [];
  if (set.has("solo")) parts.push("You work best alone with deep focus — steer toward craft, research, or engineering roles that protect quiet stretches");
  if (set.has("team")) parts.push("You work best with a team — solo research or senior craft roles will feel isolating");
  if (set.has("structured")) parts.push("You need a clear plan — early-stage startups will feel like chaos");
  if (set.has("flexible")) parts.push("You want room to figure it out — rigid corporate roles will suffocate");
  if (set.has("bigpicture")) parts.push("You care about the big picture — pure execution roles will bore you");
  if (set.has("detail")) parts.push("You care about every detail — careers built on precision (law, medicine, engineering, editing) reward this");
  if (set.has("fast")) parts.push("You want to move fast — slow-moving traditional industries will frustrate you");
  if (set.has("careful")) parts.push("You'd rather go slow and get it right — fast startup cultures will feel reckless to you");
  if (set.has("risk")) parts.push("You're comfortable with big bets — startup and founder paths fit");
  if (set.has("safe")) parts.push("You prefer steady, safe wins — established companies and government roles fit");
  if (set.has("theory")) parts.push("You want to understand before doing — research and academia reward this");
  if (set.has("doing")) parts.push("You learn by trying and failing — startup and hands-on roles fit");
  if (set.has("front")) parts.push("You lead by being the loudest voice — CEO / director / speaker roles fit");
  if (set.has("back")) parts.push("You lead by making others look good — behind-the-scenes producer, chief-of-staff, senior mentor roles fit");
  if (set.has("specialist")) parts.push("You want one deep obsession — expert / craft / research roles reward this");
  if (set.has("generalist")) parts.push("You want many things at once — founder, PM, journalist, and consulting roles reward this");
  if (!parts.length) return "Your work-style preferences should filter your career list at the environment level — before job title even matters.";
  return parts.slice(0, 3).join("; ") + ".";
}

// A short, distinctive 2-line "signature" — what makes this student specific
function buildSignature(dims) {
  const ti = topKeys(dims.interests, 2);
  const ts = topKeys(dims.strengths, 2);
  const pieces = [];

  // Interest piece — no change, still works
  if (ti[0] === "analytical" && (ts.includes("problem_solving") || ts.includes("logic"))) pieces.push("You think in systems.");
  else if (ti[0] === "creative" && (ts.includes("creativity") || ts.includes("writing"))) pieces.push("You think in stories.");
  else if (ti[0] === "social") pieces.push("You think in relationships.");
  else if (ti[0] === "practical") pieces.push("You think in hands and outcomes.");
  else if (ti[0] === "entrepreneurial") pieces.push("You think in bets.");
  else if (ti[0] === "investigative") pieces.push("You think in questions.");
  else pieces.push("You think for yourself.");

  // Value piece — consider top 2, don't deny what might also be true
  const valueEntries = Object.entries(dims.values || {}).sort((a, b) => b[1] - a[1]);
  const [v1, s1] = valueEntries[0] || [];
  const [v2, s2] = valueEntries[1] || [];
  const close = v1 && v2 && s1 >= 60 && s2 >= 60 && (s1 - s2) <= 15;

  if (close) {
    const combined = combinedValuePhrase(v1, v2);
    if (combined) { pieces.push(combined); return pieces.join(" "); }
  }
  const single = singleValuePhrase(v1);
  if (single) pieces.push(single);
  return pieces.join(" ");
}

// Single-value phrasings — assert what's true, don't deny what might also be
function singleValuePhrase(v) {
  return {
    money: "Real financial rewards are on your list, and prominently.",
    impact: "You want work that actually changes something for someone.",
    freedom: "Autonomy over your day matters to you.",
    prestige: "Being genuinely respected at the top of your field matters.",
    stability: "A trustworthy path — not a lottery ticket — is what you want.",
    growth: "You measure a career by what you learn as much as what you earn.",
    balance: "Your life outside work matters as much as inside.",
    creativity_val: "Making things you own — not just running things — is core to you.",
  }[v] || null;
}

// When two top values are close, name both honestly
function combinedValuePhrase(a, b) {
  const key = [a, b].sort().join("+");
  return {
    "money+stability": "You want financial upside AND a paycheck you can trust — demanding but not impossible.",
    "balance+money": "Money AND real work-life balance — most people who end up with both got the money first, then bought the balance.",
    "balance+stability": "A safe path with real evenings — that's your shortlist.",
    "impact+money": "Impact AND money — a narrower list, but real.",
    "freedom+stability": "Autonomy AND predictability — you'd fit senior roles at stable companies more than raw startups.",
    "creativity_val+prestige": "Making things AND being known for them — both take a decade, both are possible.",
    "growth+stability": "You want to grow hard AND feel safe — established companies with strong learning cultures fit best.",
    "freedom+money": "You want to earn well AND own your calendar — that combination usually comes after you've earned first.",
    "growth+money": "You want to learn AND earn — you'd thrive where compensation tracks skill, not seniority.",
    "impact+stability": "You want meaningful work AND a paycheck you can count on — medicine, teaching, and policy roles fit.",
    "creativity_val+freedom": "You want to make things AND own your calendar — freelance and founder paths sit here.",
    "creativity_val+money": "Making things AND getting paid well for them — a narrow but growing list (product design, senior creative director, filmmaker).",
    "balance+impact": "Meaningful work AND real evenings — a rare combination, but not impossible in policy, teaching, or established nonprofits.",
    "impact+prestige": "You want to be known for work that matters — not just work that pays.",
    "growth+prestige": "Learning hard AND being recognized for it — the classic top-of-field profile.",
    "creativity_val+growth": "You want to make things AND get better at making them every year — the craft profile.",
    "balance+growth": "You want to grow AND still be home for dinner — established companies with real learning cultures.",
    "balance+freedom": "You want to own your time in two directions — freelance, senior craft, and small business paths fit best.",
    "freedom+impact": "Freedom AND meaningful work — a common founder profile, but also senior consulting and independent research.",
    "freedom+growth": "Autonomy AND constant learning — the classic self-directed profile.",
  }[key] || null;
}

// 3-4 behavioural patterns discovered in the answers
function buildPatterns(dims) {
  const out = [];
  const s = dims.strengths, w = dims.weaknesses, v = dims.values, i = dims.interests;

  if ((s.speaking || 0) >= 60 && (s.leadership || 0) >= 60)
    out.push({ title: "Comfortable in front of a room", detail: "You scored high on both speaking and leadership. Most people fear the room — you scan it. That's rarer than you think, and it compounds fast in most careers." });

  if ((s.focus || 0) >= 65 && (s.logic || 0) >= 60)
    out.push({ title: "Long-focus problem solver", detail: "You can sit with a hard problem for hours without needing to talk it out. That's the exact rhythm engineering, research, and quant work reward." });

  if ((s.creativity || 0) >= 65 && (s.focus || 0) >= 55)
    out.push({ title: "Rare: creative AND finisher", detail: "Most creative people don't ship. Most finishers don't invent. You do both — that's the signature of people who become respected in creative fields, not just talented in them." });

  if ((s.empathy || 0) >= 65)
    out.push({ title: "Reads people well", detail: "You noticed a lot of subtle interpersonal cues in your answers. That's the exact skill that separates a good manager, teacher, doctor, or designer from a technically-fine one." });

  if ((s.writing || 0) >= 65 && (s.logic || 0) >= 60)
    out.push({ title: "Thinks clearly on paper", detail: "You can hold a hard argument in your head AND get it down clearly. That combination is what senior careers in law, journalism, research, and consulting are actually built on — most people have one, not both." });

  if ((s.hands || 0) >= 65 && (i.practical || 0) >= 60)
    out.push({ title: "Makes things real", detail: "You need to build, fix, or ship something you can touch. That energy fuels engineering, architecture, surgery, chef work — anything where the day ends with an artifact." });

  if ((w.procrastination || 0) >= 60 && (w.perfectionism || 0) >= 60)
    out.push({ title: "The 'either brilliant or nothing' trap", detail: "You show both procrastination and perfectionism. This isn't laziness — it's often fear of shipping something imperfect. Look for careers where 'ship, then iterate' is the culture." });

  if ((w.social_drain || 0) >= 60 && (v.balance || 0) >= 60)
    out.push({ title: "You need real recovery time", detail: "People drain you and balance matters to you. Careers with constant client interaction (sales, hospitality, consulting) will burn you out fast. Look for work where deep-focus days are possible." });

  if ((v.money || 0) >= 65 && (v.impact || 0) >= 65)
    out.push({ title: "You want both — money AND meaning", detail: "This is often called impossible. It isn't — but it does narrow the field. Look at finance-for-impact (impact investing), tech-for-good, or founding something that solves a real problem." });

  if ((v.freedom || 0) >= 70 && (s.focus || 0) >= 55)
    out.push({ title: "Autonomy is non-negotiable, and you can use it", detail: "You value freedom AND you have the focus to work independently — this is rare. Most people who crave freedom struggle without structure. You wouldn't." });

  if ((v.stability || 0) >= 65 && (v.growth || 0) >= 65)
    out.push({ title: "You want to grow AND feel safe", detail: "Look at established companies with strong internal learning cultures, or slower-moving fields where expertise compounds over years (medicine, law, architecture) instead of startup chaos." });

  return out.slice(0, 4);
}

// Tensions — where their profile disagrees with itself
function buildContrasts(dims) {
  const out = [];
  const v = dims.values, w = dims.weaknesses, s = dims.strengths;

  if ((v.money || 0) >= 60 && (v.balance || 0) >= 60)
    out.push("You want serious money AND real work-life balance. Both are possible, but not in the same first job — most people who end up with both got the money first, then bought the balance.");

  if ((v.money || 0) >= 60 && (v.stability || 0) >= 60)
    out.push("You want financial upside AND a paycheck you can count on — most careers force a trade. The exceptions are medicine, top-tier engineering, and senior corporate roles, but you have to wait for the seniority to unlock both.");

  if ((v.freedom || 0) >= 60 && (v.stability || 0) >= 60)
    out.push("You want autonomy but also predictability. This tension is normal — look for senior roles at stable companies, or established solo practices (medicine, law). Avoid pure startups for the first job.");

  if ((s.creativity || 0) >= 60 && (v.prestige || 0) >= 60)
    out.push("You're creative but you also want to be known. Most respected creatives went unpaid and unknown for 5-10 years first. Ask yourself whether the recognition is worth the wait.");

  if ((v.impact || 0) >= 60 && (v.money || 0) >= 60 && (w.social_drain || 0) >= 55)
    out.push("You want impact and money, but people-heavy work drains you. That's a hard combo — most impact/money careers are relational. Look at deep-research or product-building roles where impact happens through the artifact, not through daily interaction.");

  return out.slice(0, 3);
}

function buildSimInsights(sims) {
  const total = sims.length;
  const scores = sims.map(s => s.verdict.score);
  const avg = Math.round(scores.reduce((a, b) => a + b, 0) / total);
  const best = sims.slice().sort((a, b) => b.verdict.score - a.verdict.score)[0];
  const worst = sims.slice().sort((a, b) => a.verdict.score - b.verdict.score)[0];
  const spread = Math.max(...scores) - Math.min(...scores);
  let read;
  if (total === 1)
    read = `You've lived one career day so far — ${best.career} scored ${best.verdict.score}. Try one more from a very different field to see if this was a fluke or a real signal.`;
  else if (spread >= 25)
    read = `Your career scores are all over the place (${best.career} at ${best.verdict.score}, ${worst.career} at ${worst.verdict.score}) — meaning your quiz profile and your behaviour disagreed on some careers. That's actually great data: the ones where they agreed are the truest signal.`;
  else if (avg >= 70)
    read = `You handled every career day well on average (${avg}/100). That means you're adaptable — but it also means the sims aren't fully differentiating you yet. Try a career you're pretty sure you'd hate — that contrast will sharpen the report.`;
  else if (avg <= 45)
    read = `Your sim scores are low across the board (${avg}/100). Either the careers you tried aren't yours, OR you're in a mood that made you second-guess yourself. Try again in a week and compare.`;
  else
    read = `Across ${total} sim${total > 1 ? "s" : ""} you averaged ${avg}/100 — mostly middle scores. That usually means you haven't found your lane yet. Try wildly different careers to force the contrast.`;
  return { count: total, average: avg, best: best.career, worst: worst.career, read };
}

// ============================================================
// LLM PROMPTS
// ============================================================
const SIM_SYSTEM = `You simulate one work day in a career, for a 15-16 year old student who has never had a real job. Write in second person, present tense ("You're at your desk when…").

LANGUAGE RULES:
- Use simple, everyday words. Say "use" not "leverage", "keep trying" not "iterate", "person who cares" not "stakeholder".
- If you must use a technical term or acronym, explain it right away in parentheses. Example: "The MD (the senior boss) wants a DCF (a spreadsheet showing what the company is worth) by 6pm."
- Never assume the student knows job jargon — explain everything, every time.

WHAT TO SHOW:
- The real feel of the job: boring parts, pressure, office politics, small wins.
- Each turn: a clock time, a short 2-3 sentence scene, then 3 real choices with no obvious right answer.
- Remember earlier choices — bad calls should cause problems later in the day.
- The day has 11-12 decisions total, morning to evening, then it ends.

Reply with ONLY raw JSON, no markdown:
{"time":"9:15 AM","scene":"...","choices":["...","...","..."],"stat":{"label":"short status e.g. 'Boss is waiting'","tone":"neutral|good|bad"},"done":false}
After 11-12 decisions, set done:true, choices:[], and make scene the last beat of the day.`;

const VERDICT_SYSTEM = `You are a blunt, insightful career coach analyzing how a Grade 10 student behaved during a simulated day at a specific career. Based on their profile, quiz results, and every choice they made, produce a fit report. Be honest — if it's a bad fit, say so and why. No flattery, but be encouraging about what DID work.

Use simple, warm language. Avoid jargon.

Respond ONLY with raw JSON:
{"score":72,"headline":"one punchy sentence verdict","energized":["...","..."],"drained":["...","..."],"reality":"2-3 sentences of blunt reality about this career they should know (hours, real path, what actually gets people ahead)","fitFor":"one sentence describing the kind of person this job IS right for"}`;

const COMPARE_SYSTEM = `You are a career coach. The student has simulated multiple careers AND completed personality/interest/values quizzes. Compare all their data and tell them which career actually fits them best.

Respond ONLY with raw JSON:
{"winner":"career name","ranking":[{"career":"...","score":72,"oneLiner":"..."}],"reasoning":"3-4 sentences on why the winner fits, referencing specific behavior AND quiz results","nextStep":"one concrete thing to do in the next 6 months to test this in real life"}`;

const REPORT_SYSTEM = `You are a career coach writing a comprehensive Career Compass Report for a Grade 10 student. You have their full profile: interests, strengths, weaknesses, values, work style, and any career simulations they've completed.

Write in warm, direct, jargon-free language a 15-year-old will understand. Be specific and actionable.

Respond ONLY with raw JSON:
{
  "headline": "one-sentence summary of who this student is (as a future worker)",
  "profile": "3-4 sentence portrait of their personality and how they work best",
  "topFields": [{"field":"e.g. Finance & Strategy","fit":85,"why":"one sentence"}],
  "topCareers": [{"career":"specific job title","fit":88,"why":"one sentence using their actual quiz results"}],
  "avoid": [{"career":"specific job title","why":"one sentence"}],
  "superpowers": ["short phrase","short phrase","short phrase"],
  "watchouts": ["short phrase","short phrase"],
  "sixMonthPlan": ["specific thing to try","specific thing to try","specific thing to try"]
}
Include 3-5 topFields, 4-6 topCareers, 2-3 avoid, 3 superpowers, 2-3 watchouts, 3 plan items.`;

// ============================================================
// STATE
// ============================================================
const store = {
  get(k, fallback) {
    try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
  },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

// Per-account key namespace — data is stored under cc_u:{email}:{base} when logged in,
// or cc_{base} for the guest / not-logged-in state
function dataKey(base, email) {
  return email ? `cc_u:${email}:${base}` : `cc_${base}`;
}

const _initUser = store.get("cc_user", null);
const _initEmail = _initUser?.email || null;

const state = {
  screen: store.get("cc_screen", "landing"),
  user: _initUser,
  dark: store.get("cc_dark", false),
  quizAnswers: store.get(dataKey("quizAnswers", _initEmail), {}),
  completedSims: store.get(dataKey("sims", _initEmail), []),
  report: store.get(dataKey("report", _initEmail), null),

  // ephemeral
  currentQuiz: null,
  currentQuizIdx: 0,
  authMode: "signup",
  careerFilter: "All",
  currentCareer: null,
  sim: { log: [], current: null, history: [], loading: false, error: null },
  lastVerdict: null,
  compareResult: null,
  reportLoading: false,
  reportError: null,
};

// One-time migration: if the logged-in user has empty user-namespaced data but there IS
// legacy global data (from before this fix), pull it into the user's namespace so they
// don't lose progress on the upgrade.
if (_initEmail) {
  const hasUserData = Object.keys(state.quizAnswers).length || state.completedSims.length || state.report;
  if (!hasUserData) {
    const legacyQ = store.get("cc_quizAnswers", null);
    const legacyS = store.get("cc_sims", null);
    const legacyR = store.get("cc_report", null);
    const hasLegacy = (legacyQ && Object.keys(legacyQ).length) || (legacyS && legacyS.length) || legacyR;
    if (hasLegacy) {
      state.quizAnswers = legacyQ || {};
      state.completedSims = legacyS || [];
      state.report = legacyR || null;
    }
  }
}

function persist() {
  store.set("cc_screen", state.screen);
  store.set("cc_user", state.user);
  store.set("cc_dark", state.dark);
  const email = state.user?.email || null;
  store.set(dataKey("quizAnswers", email), state.quizAnswers);
  store.set(dataKey("sims", email), state.completedSims);
  store.set(dataKey("report", email), state.report);
}

// Called on successful login — swap current data with the user's saved data
function loadAccountData(email) {
  state.quizAnswers = store.get(dataKey("quizAnswers", email), {});
  state.completedSims = store.get(dataKey("sims", email), []);
  state.report = store.get(dataKey("report", email), null);
}

function applyTheme() {
  document.documentElement.setAttribute("data-theme", state.dark ? "dark" : "light");
}

// ============================================================
// LLM
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

// ============================================================
// HELPERS
// ============================================================
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function scoreClass(s) { return s >= 75 ? "high" : s >= 50 ? "mid" : "low"; }

function scoreRing(score, size = 88) {
  const r = size / 2 - 10;
  const c = 2 * Math.PI * r;
  const color = score >= 75 ? "var(--green)" : score >= 50 ? "var(--amber)" : "var(--red)";
  const offset = c * (1 - score / 100);
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="flex-shrink:0">
      <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--line)" stroke-width="8" />
      <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${color}" stroke-width="8"
        stroke-dasharray="${c}" stroke-dashoffset="${offset}" stroke-linecap="round"
        transform="rotate(-90 ${size/2} ${size/2})" style="transition:stroke-dashoffset .8s ease" />
      <text x="${size/2}" y="${size/2}" text-anchor="middle" dominant-baseline="central"
        style="font-family:'Instrument Serif',serif;font-weight:700;font-size:${size*0.28}px;fill:var(--ink)">${score}</text>
    </svg>`;
}

function spinner(label) {
  return `<div class="spinner"><span class="spinner-dot"></span>${esc(label)}</div>`;
}

function profileText() {
  const parts = [];
  for (const q of QUIZZES) {
    const ans = state.quizAnswers[q.key] || {};
    const answered = Object.keys(ans).length;
    if (answered === 0) continue;
    let summary;
    if (q.binary) {
      summary = q.items.map((it, i) => ans[i] !== undefined ? `${it.q} → ${it.opts.find(o => o.tag === ans[i])?.label}` : null).filter(Boolean).slice(0, 4).join("; ");
    } else {
      summary = q.items.map((it, i) => ans[i] !== undefined ? `${it.q} (${q.scale[ans[i]]})` : null).filter(Boolean).slice(0, 4).join("; ");
    }
    parts.push(`${q.title}: ${summary}`);
  }
  return parts.join("\n\n") || "(no assessment data yet)";
}

function fullProfileText() {
  const parts = [];
  for (const q of QUIZZES) {
    const ans = state.quizAnswers[q.key] || {};
    if (Object.keys(ans).length === 0) continue;
    let lines;
    if (q.binary) {
      lines = q.items.map((it, i) => ans[i] !== undefined ? `${it.q} → ${it.opts.find(o => o.tag === ans[i])?.label}` : null).filter(Boolean).join("\n");
    } else {
      lines = q.items.map((it, i) => ans[i] !== undefined ? `${it.q} → ${q.scale[ans[i]]}` : null).filter(Boolean).join("\n");
    }
    parts.push(`## ${q.title}\n${lines}`);
  }
  const sims = state.completedSims.map((s) =>
    `Career: ${s.career} (score ${s.verdict.score})\nHeadline: ${s.verdict.headline}\nEnergized: ${s.verdict.energized.join("; ")}\nDrained: ${s.verdict.drained.join("; ")}`
  ).join("\n\n");
  return parts.join("\n\n") + (sims ? `\n\n## Career Sims\n${sims}` : "");
}

// ============================================================
// TOP NAV
// ============================================================
function renderNav() {
  const u = state.user;
  const initial = u ? esc((u.name || u.email)[0].toUpperCase()) : "";
  const shortName = u ? esc(u.name?.split(" ")[0] || u.email.split("@")[0]) : "";
  return `
    <div class="nav">
      <div class="nav-inner">
        <button class="logo" data-action="home">
          <img class="logo-mark" src="logo.png" alt="" />
          <span class="logo-text">The Early Builder</span>
        </button>
        <div class="nav-actions">
          ${u && state.screen !== "dashboard" ? `<button class="nav-link" data-action="go" data-screen="dashboard">Dashboard</button>` : ""}
          ${u && state.screen !== "careers" ? `<button class="nav-link" data-action="go" data-screen="careers">Careers</button>` : ""}
          ${u && state.report && state.screen !== "report" ? `<button class="nav-link" data-action="go" data-screen="report">Report</button>` : ""}
          ${u ? `
            <div class="user-chip" title="${esc(u.email)}">
              <span class="user-avatar">${initial}</span>
              <span>${shortName}</span>
            </div>
            <button class="btn btn-ghost btn-sm" data-action="logout">Sign out</button>
          ` : (state.screen !== "login" ? `
            <button class="nav-link" data-action="go" data-screen="login">Sign in</button>
            <button class="btn btn-primary btn-sm" data-action="go" data-screen="login">Get started</button>
          ` : "")}
          <button class="theme-toggle" data-action="toggle-theme" aria-label="Toggle theme">
            <span class="theme-toggle-thumb">${state.dark ? "☾" : "☀"}</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// LANDING
// ============================================================
const CAREER_EMOJI = {
  ib: "💼", consult: "📊", quant: "📈", founder: "🚀", pm: "🧭", marketing: "🎯",
  swe: "💻", ml: "🤖", designer: "🎨", econ: "📉",
  doctor: "🩺", law: "⚖️", teacher: "📚", journalist: "🗞️",
  director: "🎬", architect: "🏛️", chef: "🍳",
};
const CAREER_TILE_ACCENT = { "Business & Money": "", "Tech & Science": "cool", "People & Impact": "warm", "Creative": "warm" };

function renderLanding() {
  const ctaLabel = state.user ? "Open your dashboard" : "Start free — takes 2 min";
  const ctaShort = state.user ? "Open dashboard" : "Start free";
  const ctaScreen = state.user ? "dashboard" : "login";

  return `
    ${renderNav()}
    <div class="page rise">

      <!-- HERO -->
      <section class="saas-hero gutter">
        <div class="saas-hero-grid">
          <div>
            <h1 class="saas-hero-h1">
              Figure out what to<br/><span class="em">actually</span> do with your life.
            </h1>
            <p class="saas-hero-lede">
              Take five real assessments. Live a day inside real careers. Get an honest report on what fits <em>you</em> — before you spend years training for something you'll hate.
            </p>
            <div class="saas-hero-ctas">
              <button class="btn btn-primary btn-xl" data-action="go" data-screen="${ctaScreen}">${ctaLabel} →</button>
              <button class="btn btn-ghost btn-xl" data-action="scroll" data-target="how">See how it works</button>
            </div>
          </div>

          <div class="saas-hero-visual">
            <div class="mock">
              <div class="mock-chrome">
                <div class="mock-chrome-dot r"></div>
                <div class="mock-chrome-dot y"></div>
                <div class="mock-chrome-dot g"></div>
                <div class="mock-chrome-url">
                  <span>🔒</span> theearlybuilder.app/dashboard
                </div>
              </div>
              <div class="mock-body">
                <div class="mock-dash-kicker">Your compass · updated just now</div>
                <div class="mock-dash-title">Good morning, <span class="em">Alex</span>.</div>
                <div class="mock-dash-stats">
                  <div>
                    <div class="mock-dash-stat-label">Overall</div>
                    <div class="mock-dash-stat-value">72<span class="unit">%</span></div>
                    <div class="mock-dash-stat-mini"><div style="width:72%"></div></div>
                  </div>
                  <div>
                    <div class="mock-dash-stat-label">Quizzes</div>
                    <div class="mock-dash-stat-value">4<span class="unit">/5</span></div>
                  </div>
                  <div>
                    <div class="mock-dash-stat-label">Careers</div>
                    <div class="mock-dash-stat-value">3</div>
                  </div>
                  <div>
                    <div class="mock-dash-stat-label">Report</div>
                    <div class="mock-dash-stat-value" style="font-size:18px;padding-top:6px;color:var(--green);">Ready</div>
                  </div>
                </div>
                <div class="mock-dash-next">
                  <div class="mock-dash-next-emoji">🧭</div>
                  <div>
                    <div class="mock-dash-next-title">Generate your Compass report</div>
                    <div style="font-size:11px;color:var(--sub);">Everything's ready</div>
                  </div>
                  <div class="mock-dash-next-btn">Open →</div>
                </div>
                <div class="mock-dash-list">
                  <div class="mock-dash-list-item">
                    <div class="mock-dash-list-idx">01</div>
                    <div class="mock-dash-list-name">What actually interests you?</div>
                    <div class="mock-dash-list-pct done">DONE</div>
                  </div>
                  <div class="mock-dash-list-item">
                    <div class="mock-dash-list-idx">02</div>
                    <div class="mock-dash-list-name">What are you actually good at?</div>
                    <div class="mock-dash-list-pct done">DONE</div>
                  </div>
                  <div class="mock-dash-list-item">
                    <div class="mock-dash-list-idx">03</div>
                    <div class="mock-dash-list-name">Where do you struggle?</div>
                    <div class="mock-dash-list-pct">60%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- DARK STATEMENT — contrast breaker -->
      <section class="statement">
        <div class="statement-inner">
          <h2 class="statement-quote">
            You'll spend <em>90,000 hours</em> at work.<br/>
            Fifteen minutes now saves <em>four years</em> of the wrong one.
          </h2>
          <p class="statement-sub">
            Most students pick their career in an afternoon with a counsellor who's never done the job. You deserve better math.
          </p>
        </div>
      </section>

      <!-- PROBLEM / SOLUTION -->
      <section id="compass" class="compare gutter">
        <div class="compare-head">
          <h2 class="compare-h2">Career counselling is broken.<br/><span class="em">We rebuilt it.</span></h2>
          <p class="compare-lede">The counsellor at your school gave you a personality test in Grade 8 and told you you'd be "good in commerce." Here's the difference.</p>
        </div>
        <div class="compare-grid">
          <div class="compare-col bad">
            <h3 class="compare-title">A 30-min test in a school hall.</h3>
            <div class="compare-items">
              <div class="compare-item"><span class="compare-item-mark">✕</span><span>Generic personality types you've heard a hundred times ("you're an ENTJ, consider law").</span></div>
              <div class="compare-item"><span class="compare-item-mark">✕</span><span>Zero exposure to what the actual day looks like inside a career.</span></div>
              <div class="compare-item"><span class="compare-item-mark">✕</span><span>Career suggestions from a list of 12 traditional roles.</span></div>
              <div class="compare-item"><span class="compare-item-mark">✕</span><span>Feedback that never mentions what you'd hate about the job.</span></div>
              <div class="compare-item"><span class="compare-item-mark">✕</span><span>Recommendations shaped by what the counsellor knows, not what you're like.</span></div>
              <div class="compare-item"><span class="compare-item-mark">✕</span><span>Costs $60–$180. Every 6 months for "reassessment."</span></div>
            </div>
          </div>
          <div class="compare-col good">
            <h3 class="compare-title">Real assessments + a day inside the job.</h3>
            <div class="compare-items">
              <div class="compare-item"><span class="compare-item-mark">✓</span><span>Insights tied to specific answers <em>you</em> gave — not one-of-16 types.</span></div>
              <div class="compare-item"><span class="compare-item-mark">✓</span><span>Live a full simulated workday inside real careers — decisions with consequences.</span></div>
              <div class="compare-item"><span class="compare-item-mark">✓</span><span>Fit scores for every career you try, with the honest do's and don'ts of each.</span></div>
              <div class="compare-item"><span class="compare-item-mark">✓</span><span>Every report shows where you'd thrive <em>and</em> where you'd burn out.</span></div>
              <div class="compare-item"><span class="compare-item-mark">✓</span><span>Your data. Your compass. No counsellor filtering the answer.</span></div>
              <div class="compare-item"><span class="compare-item-mark">✓</span><span>No credit card to start. No upsell. No pretending.</span></div>
            </div>
          </div>
        </div>
      </section>

      <!-- FEATURE 1 — Career simulations -->
      <section id="sims" class="feature-showcase gutter">
        <div class="feature-row">
          <div class="feature-text">
            <h2 class="feature-h2">Live a day inside <span class="em">real careers.</span></h2>
            <p class="feature-desc">
              Wake up as an investment banker in NYC. Make real choices under real deadlines. Feel what it's actually like at 9 AM, 3 PM, and 11 PM. Every choice teaches the compass what makes you light up — and what drains you.
            </p>
            <div class="feature-bullets">
              <div class="feature-bullet"><div class="check">✓</div><div>12 scenes per career. Not five. Not a personality quiz in disguise.</div></div>
              <div class="feature-bullet"><div class="check">✓</div><div>Real specifics: DCF models, ROAS spreadsheets, ward rounds, investor pitches.</div></div>
              <div class="feature-bullet"><div class="check">✓</div><div>Every job term explained in plain English the first time you meet it.</div></div>
              <div class="feature-bullet"><div class="check">✓</div><div>Behavioural fit score at the end — how you'd actually perform, not what you'd say.</div></div>
            </div>
            <button class="btn btn-primary" data-action="go" data-screen="${ctaScreen}">${ctaShort} →</button>
          </div>
          <div class="feature-visual">
            <div class="mock">
              <div class="mock-chrome">
                <div class="mock-chrome-dot r"></div>
                <div class="mock-chrome-dot y"></div>
                <div class="mock-chrome-dot g"></div>
                <div class="mock-chrome-url"><span>🔒</span> theearlybuilder.app/sim/ib</div>
              </div>
              <div class="mock-body mock-sim">
                <div class="mock-sim-header">
                  <div class="mock-sim-title">Investment Banker · Day 1</div>
                  <div class="mock-sim-badge">Scene 3 of 12</div>
                </div>
                <div class="mock-sim-log">
                  <div>
                    <div class="mock-sim-time">8:45 AM</div>
                    <div class="mock-sim-scene">Your MD sent a 52-page report at 6:04 AM: "Need a valuation model by end of day."</div>
                    <div class="mock-sim-scene" style="color:var(--sub);margin-top:6px;font-style:italic;">→ Asked your associate what the 2-3 most important things to know are</div>
                  </div>
                  <div>
                    <div class="mock-sim-time">9:30 AM</div>
                    <div class="mock-sim-scene current">Your associate stops by. "MD is going to want three ways of valuing this company, not just one." You now have three analyses to build in the same 8 hours.</div>
                    <div class="mock-sim-choices">
                      <div class="mock-sim-choice hover">Build all three in parallel — chaos, but progress everywhere</div>
                      <div class="mock-sim-choice">Do the main one really well first, race the others</div>
                      <div class="mock-sim-choice">Main one first — at 3 PM, flag honestly if the rest won't fit</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- FEATURE 2 — Report (reversed) -->
        <div class="feature-row reverse">
          <div class="feature-text">
            <h2 class="feature-h2">A report so <span class="em">specific</span> it can only be about you.</h2>
            <p class="feature-desc">
              Not "you're a leader." Not "consider commerce." Real patterns pulled from every quiz answer and every sim choice — with the exact reasoning traced back.
            </p>
            <div class="feature-bullets">
              <div class="feature-bullet"><div class="check">✓</div><div>Fit scores for every career you live, with the honest reason for each.</div></div>
              <div class="feature-bullet"><div class="check">✓</div><div>Patterns we noticed — like "creative <em>and</em> finisher, rare combination."</div></div>
              <div class="feature-bullet"><div class="check">✓</div><div>The tension in your profile — where your values disagree with each other.</div></div>
              <div class="feature-bullet"><div class="check">✓</div><div>Career-specific do's and don'ts from people who actually did the job.</div></div>
              <div class="feature-bullet"><div class="check">✓</div><div>A six-month plan you can actually start on Monday.</div></div>
            </div>
            <button class="btn btn-primary" data-action="go" data-screen="${ctaScreen}">${ctaShort} →</button>
          </div>
          <div class="feature-visual">
            <div class="mock">
              <div class="mock-chrome">
                <div class="mock-chrome-dot r"></div>
                <div class="mock-chrome-dot y"></div>
                <div class="mock-chrome-dot g"></div>
                <div class="mock-chrome-url"><span>🔒</span> theearlybuilder.app/report</div>
              </div>
              <div class="mock-body mock-report">
                <div class="mock-report-kicker">The Career Compass Report</div>
                <div class="mock-report-headline">You're a sharp analytical<br/>thinker who values freedom.</div>
                <div class="mock-report-sig">You think in systems. You'd rather learn hard than earn fast.</div>
                <div class="mock-report-fits">
                  <div class="mock-report-fit">
                    <div class="mock-report-fit-score h">86</div>
                    <div>
                      <div class="mock-report-fit-name">Product Designer</div>
                      <div class="mock-report-fit-tag">Uses your creativity every day</div>
                    </div>
                    <div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--green);font-weight:700;">STRONG</div>
                  </div>
                  <div class="mock-report-fit">
                    <div class="mock-report-fit-score h">81</div>
                    <div>
                      <div class="mock-report-fit-name">AI / ML Engineer</div>
                      <div class="mock-report-fit-tag">Plays to your analytical depth</div>
                    </div>
                    <div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--green);font-weight:700;">STRONG</div>
                  </div>
                  <div class="mock-report-fit">
                    <div class="mock-report-fit-score m">67</div>
                    <div>
                      <div class="mock-report-fit-name">Startup Founder</div>
                      <div class="mock-report-fit-tag">Needs risk tolerance you're still building</div>
                    </div>
                    <div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--amber);font-weight:700;">MIXED</div>
                  </div>
                </div>
                <div class="mock-report-dos">
                  <div class="d">
                    <b>DO · PRODUCT DESIGNER</b>
                    Ship real work into your portfolio, not just concept work.
                  </div>
                  <div class="n">
                    <b>DON'T · PRODUCT DESIGNER</b>
                    Don't chase Dribbble aesthetics that don't serve real users.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- FEATURE 3 — Assessments -->
        <div class="feature-row">
          <div class="feature-text">
            <h2 class="feature-h2">Five short quizzes. <span class="em">No fluff.</span></h2>
            <p class="feature-desc">
              Interests, strengths, weaknesses, values, work style. Forty questions total. Rate honestly — the sharper your answers, the sharper your report. No "which colour are you" questions.
            </p>
            <div class="feature-bullets">
              <div class="feature-bullet"><div class="check">✓</div><div>Real dimensions: analytical vs. creative, focus vs. connection, freedom vs. stability.</div></div>
              <div class="feature-bullet"><div class="check">✓</div><div>Auto-saved. Come back and finish across days.</div></div>
              <div class="feature-bullet"><div class="check">✓</div><div>Each answer maps to specific career fit signals — nothing is thrown away.</div></div>
              <div class="feature-bullet"><div class="check">✓</div><div>Takes ~15 minutes total. Report unlocks after 3 quizzes.</div></div>
            </div>
            <button class="btn btn-primary" data-action="go" data-screen="${ctaScreen}">${ctaShort} →</button>
          </div>
          <div class="feature-visual">
            <div class="mock">
              <div class="mock-chrome">
                <div class="mock-chrome-dot r"></div>
                <div class="mock-chrome-dot y"></div>
                <div class="mock-chrome-dot g"></div>
                <div class="mock-chrome-url"><span>🔒</span> theearlybuilder.app/quiz/values</div>
              </div>
              <div class="mock-body">
                <div class="mock-quiz-progress"><div style="width:62%"></div></div>
                <div class="mock-quiz-kicker">VALUES · 5 OF 8</div>
                <div class="mock-quiz-q">"Setting my own schedule and being my own boss."</div>
                <div class="mock-quiz-opts">
                  <div class="mock-quiz-opt"><span>Doesn't matter</span><span class="k">1</span></div>
                  <div class="mock-quiz-opt"><span>Slightly matters</span><span class="k">2</span></div>
                  <div class="mock-quiz-opt"><span>Matters some</span><span class="k">3</span></div>
                  <div class="mock-quiz-opt selected"><span>Matters a lot</span><span class="k">4</span></div>
                  <div class="mock-quiz-opt"><span>Non-negotiable</span><span class="k">5</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- HOW IT WORKS — horizontal timeline -->
      <section id="how" class="how gutter">
        <div class="how-head">
          <h2 class="compare-h2">Three steps.<br/><span class="em">One clearer answer.</span></h2>
          <p class="compare-lede">Fifteen minutes now saves you five years of a career you didn't want.</p>
        </div>
        <div class="timeline">
          <div class="timeline-track">
            <div class="timeline-line"></div>
            <div class="timeline-step">
              <div class="timeline-step-node"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg><span class="timeline-step-num">1</span></div>
              <div class="timeline-step-title">Take five quick quizzes.</div>
              <div class="timeline-step-desc">Interests, strengths, weaknesses, values, work style. Rate honestly.</div>
            </div>
            <div class="timeline-step">
              <div class="timeline-step-node"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z"/><path d="m6.2 5.3 3.1 3.9"/><path d="m12.4 3.4 3.1 4"/><path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/></svg><span class="timeline-step-num">2</span></div>
              <div class="timeline-step-title">Live a day in a real career.</div>
              <div class="timeline-step-desc">Pick a real job. Make real decisions under real pressure. Every choice teaches the compass.</div>
            </div>
            <div class="timeline-step">
              <div class="timeline-step-node"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg><span class="timeline-step-num">3</span></div>
              <div class="timeline-step-title">Get your honest report.</div>
              <div class="timeline-step-desc">Fit scores, patterns, do's and don'ts per career, and a six-month plan.</div>
            </div>
          </div>
        </div>
      </section>

      <!-- TESTIMONIALS — scattered postcard wall -->
      <section id="tests" class="tests gutter">
        <div class="tests-head">
          <h2 class="compare-h2">Fewer bad guesses.<br/><span class="em">Better first calls.</span></h2>
        </div>
        <div class="tests-scatter">
          <div class="scatter-card c1">
            <p class="test-quote">"I thought I wanted to be a doctor for five years. One simulation showed me I hate the pace and love the science. Now I'm looking at biotech research."</p>
            <div class="test-attr">
              <div class="test-avatar" style="background:var(--grad-warm);">A</div>
              <div>
                <div style="font-weight:600;font-size:14.5px;">Ava S.</div>
                <div style="font-size:12px;color:var(--sub);font-family:'JetBrains Mono',monospace;letter-spacing:0.4px;text-transform:uppercase;">Grade 11 · San Francisco</div>
              </div>
            </div>
          </div>
          <div class="scatter-card c2">
            <p class="test-quote">"The founder sim killed my dream — in the best way. Turns out I love building, hate selling. Product designer it is. My parents actually agreed after they read the report."</p>
            <div class="test-attr">
              <div class="test-avatar" style="background:var(--grad-brand);">R</div>
              <div>
                <div style="font-weight:600;font-size:14.5px;">Ryan M.</div>
                <div style="font-size:12px;color:var(--sub);font-family:'JetBrains Mono',monospace;letter-spacing:0.4px;text-transform:uppercase;">Grade 10 · Boston</div>
              </div>
            </div>
          </div>
          <div class="scatter-card c3">
            <p class="test-quote">"Finally something that doesn't treat every kid like they should be an engineer. My report basically said: you're a storyteller. That felt right."</p>
            <div class="test-attr">
              <div class="test-avatar" style="background:var(--grad-cool);">M</div>
              <div>
                <div style="font-weight:600;font-size:14.5px;">Maya P.</div>
                <div style="font-size:12px;color:var(--sub);font-family:'JetBrains Mono',monospace;letter-spacing:0.4px;text-transform:uppercase;">Grade 12 · NYC</div>
              </div>
            </div>
          </div>
          <div class="scatter-card c4">
            <p class="test-quote">"Did the chef and the film director back-to-back. Weirdly, both scored high — the report explained why. That felt like being seen."</p>
            <div class="test-attr">
              <div class="test-avatar" style="background:var(--grad-warm);">K</div>
              <div>
                <div style="font-weight:600;font-size:14.5px;">Kai T.</div>
                <div style="font-size:12px;color:var(--sub);font-family:'JetBrains Mono',monospace;letter-spacing:0.4px;text-transform:uppercase;">Grade 9 · Seattle</div>
              </div>
            </div>
          </div>
          <div class="scatter-card c5">
            <p class="test-quote">"I scored 41 on investment banker. Brutal. But my dad's a banker, and it stopped a family fight."</p>
            <div class="test-attr">
              <div class="test-avatar" style="background:var(--grad-brand);">V</div>
              <div>
                <div style="font-weight:600;font-size:14.5px;">Ethan D.</div>
                <div style="font-size:12px;color:var(--sub);font-family:'JetBrains Mono',monospace;letter-spacing:0.4px;text-transform:uppercase;">Grade 11 · Chicago</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- PRICING -->
      <section class="pricing gutter">
        <div class="pricing-head">
          <h2 class="compare-h2">One plan. <span class="em">Yours.</span></h2>
          <p class="compare-lede">Career counselling shouldn't cost you a phone. Start free, no asterisks.</p>
        </div>
        <div class="pricing-grid">
          <div class="pricing-card">
            <div class="pricing-flag">Free to start</div>
            <div class="pricing-name">The Full Compass</div>
            <div class="pricing-desc">Everything you need to figure out what actually fits. No trials. No lock-ins. No credit card.</div>
            <div class="pricing-price">
              <div class="pricing-price-main">$0</div>
              <div class="pricing-price-sub">/forever</div>
            </div>
            <div class="pricing-features">
              <div class="pricing-feature"><span class="tick">✓</span><span>All 5 assessments (~40 questions)</span></div>
              <div class="pricing-feature"><span class="tick">✓</span><span>Full sims across 6 careers — more added regularly</span></div>
              <div class="pricing-feature"><span class="tick">✓</span><span>Your full personalized Compass report</span></div>
              <div class="pricing-feature"><span class="tick">✓</span><span>Do's and don'ts for every career you explore</span></div>
              <div class="pricing-feature"><span class="tick">✓</span><span>Six-month action plan tailored to you</span></div>
              <div class="pricing-feature"><span class="tick">✓</span><span>Compare careers side-by-side</span></div>
              <div class="pricing-feature"><span class="tick">✓</span><span>Print or save as PDF, share with your parents</span></div>
            </div>
            <button class="btn btn-primary btn-lg btn-block" data-action="go" data-screen="${ctaScreen}">${ctaLabel} →</button>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section class="faq gutter">
        <div class="faq-grid">
          <div>
            <h2 class="faq-h2">Questions students <span class="em">actually ask.</span></h2>
            <p class="faq-lede">Not the ones we wished they asked. If yours isn't here, email us at theearlybuilder@gmail.com.</p>
          </div>
          <div class="faq-list">
            <div class="faq-item">
              <button class="faq-q" data-action="faq-toggle">Is this really free? What's the catch?<span class="faq-q-icon">+</span></button>
              <div class="faq-a">Really free. No credit card. No trial. No premium tier. We built this because career counselling is broken and expensive — and we think you should own your compass, not rent it.</div>
            </div>
            <div class="faq-item">
              <button class="faq-q" data-action="faq-toggle">How long does it take?<span class="faq-q-icon">+</span></button>
              <div class="faq-a">About 15 minutes for the quizzes, five minutes per career simulation, and a minute to read your report. You can do it in one sitting or across a week — everything auto-saves.</div>
            </div>
            <div class="faq-item">
              <button class="faq-q" data-action="faq-toggle">Do I need to know what I want to be first?<span class="faq-q-icon">+</span></button>
              <div class="faq-a">No — that's the point. Most students don't. The compass shows you what fits and what doesn't, in fields you might not have even considered. Try the careers you're curious about, even (especially) the ones you're pretty sure you'd hate.</div>
            </div>
            <div class="faq-item">
              <button class="faq-q" data-action="faq-toggle">Will my parents take this seriously?<span class="faq-q-icon">+</span></button>
              <div class="faq-a">The report is printable and looks like a proper career document — with fit scores, real reasoning, and a six-month plan. Most parents who see it for the first time say some version of "this is more useful than what the counsellor gave us." Try it, print it, show them.</div>
            </div>
            <div class="faq-item">
              <button class="faq-q" data-action="faq-toggle">Is my data safe?<span class="faq-q-icon">+</span></button>
              <div class="faq-a">Your quiz answers and sim history are stored securely in your private account. We don't sell your data. We don't share it with schools. We don't email you recruiter pitches. Nobody sees your compass but you.</div>
            </div>
            <div class="faq-item">
              <button class="faq-q" data-action="faq-toggle">What if my top career isn't in the 17?<span class="faq-q-icon">+</span></button>
              <div class="faq-a">The careers cover the biggest field types — analytical, creative, people-facing, technical, entrepreneurial. Your report tells you which <em>field</em> fits (not just which job), and there's a suggestion box inside the app if you want to see a specific career added next.</div>
            </div>
            <div class="faq-item">
              <button class="faq-q" data-action="faq-toggle">Is this for engineering / commerce / arts students?<span class="faq-q-icon">+</span></button>
              <div class="faq-a">All three. The whole point is helping you figure out which of these actually fits — before you've spent two years in the wrong prep. Every quiz question is universal; every sim covers a real career across all three streams.</div>
            </div>
          </div>
        </div>
      </section>

      <!-- FINAL CTA — simple -->
      <section class="simple-cta gutter">
        <div class="simple-cta-inner">
          <h2 class="simple-cta-h2">Stop guessing. <em>Start testing.</em></h2>
          <p class="simple-cta-sub">No credit card to start. Fifteen minutes now saves you five years of the wrong career.</p>
          <div class="row" style="gap: 12px; justify-content: center; flex-wrap: wrap;">
            <button class="btn btn-primary btn-xl" data-action="go" data-screen="${ctaScreen}">
              ${state.user ? "Continue where you left off" : "Get started for free"} →
            </button>
            <button class="btn btn-ghost btn-xl" data-action="scroll" data-target="how">How it works</button>
          </div>
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="saas-footer gutter">
        <div class="saas-footer-grid">
          <div>
            <div class="saas-footer-brand"><img class="logo-mark" src="logo.png" alt="" style="width:32px;height:32px;" /> The Early Builder</div>
            <div class="saas-footer-tag">The honest career compass for students who haven't figured it out yet — which is all of them.</div>
          </div>
          <div class="saas-footer-col">
            <div class="saas-footer-col-title">Product</div>
            <a data-action="scroll" data-target="tests">Assessments</a>
            <a data-action="scroll" data-target="sims">Career simulations</a>
            <a data-action="scroll" data-target="compass">Compass report</a>
          </div>
          <div class="saas-footer-col">
            <div class="saas-footer-col-title">Company</div>
            <a data-action="scroll" data-target="how">How it works</a>
            <a data-action="mailto-team">Contact</a>
            <a data-action="mailto-team">Suggest a career</a>
          </div>
          <div class="saas-footer-col">
            <div class="saas-footer-col-title">Legal</div>
            <a data-action="go" data-screen="privacy">Privacy</a>
            <a data-action="go" data-screen="terms">Terms</a>
            <a data-action="go" data-screen="disclaimer">Disclaimer</a>
          </div>
        </div>
        <div class="saas-footer-bottom">
          <div>© 2026 The Early Builder · Built for students, not recruiters.</div>
        </div>
      </footer>

    </div>
  `;
}

// ============================================================
// LOGIN
// ============================================================
function renderLogin() {
  const isSignup = state.authMode === "signup";
  return `
    ${renderNav()}
    <div class="container">
      <div class="auth-wrap rise">
        <div class="auth-header">
          <h1 class="serif" style="font-size: 36px; letter-spacing: -0.8px; margin: 0;">
            ${isSignup ? "Let's start your compass." : "Sign in."}
          </h1>
        </div>
        <div class="card" style="padding: 26px;">
          <div class="auth-tabs">
            <button class="auth-tab ${isSignup ? "active" : ""}" data-action="auth-mode" data-mode="signup">Sign up</button>
            <button class="auth-tab ${!isSignup ? "active" : ""}" data-action="auth-mode" data-mode="signin">Sign in</button>
          </div>
          <form id="auth-form" onsubmit="return false">
            ${isSignup ? `
              <label class="label">Your name</label>
              <input class="input" id="auth-name" name="name" placeholder="Alex Rivera" autocomplete="name" />
              <div style="height:14px"></div>
              <label class="label">Grade</label>
              <select class="select" id="auth-grade" name="grade">
                ${["6","7","8","9","10","11","12","College"].map(g => `<option value="${g}"${g==="10"?" selected":""}>Grade ${g}</option>`).join("")}
              </select>
              <div style="height:14px"></div>
            ` : ""}
            <label class="label">Email</label>
            <input class="input" id="auth-email" name="email" type="email" placeholder="you@school.com" autocomplete="email" required />
            <div style="height:14px"></div>
            <label class="label">Password</label>
            <div class="input-pw-wrap">
              <input class="input" id="auth-password" name="password" type="password" placeholder="${isSignup ? "Min. 6 characters" : "Your password"}" autocomplete="${isSignup ? "new-password" : "current-password"}" required />
              <button type="button" class="pw-toggle" data-action="toggle-pw" aria-label="Show password">${EYE_ICON}</button>
            </div>
            ${isSignup ? `
              <div style="height:14px"></div>
              <label class="label">Confirm password</label>
              <div class="input-pw-wrap">
                <input class="input" id="auth-confirm" name="confirm" type="password" placeholder="Same as above" autocomplete="new-password" required />
                <button type="button" class="pw-toggle" data-action="toggle-pw" aria-label="Show password">${EYE_ICON}</button>
              </div>
            ` : ""}
            <div id="auth-error" class="auth-error" style="display:none"></div>
            <div style="height:20px"></div>
            <button class="btn btn-primary btn-block" data-action="auth-submit">
              ${isSignup ? "Create account" : "Sign in"}
            </button>
          </form>
          <div class="auth-note">Your account and data are stored securely and only visible to you.</div>
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// DASHBOARD
// ============================================================
function renderDashboard() {
  const u = state.user;
  const quizProgress = QUIZZES.map(q => {
    const total = q.items.length;
    const done = Object.keys(state.quizAnswers[q.key] || {}).length;
    return { key: q.key, title: q.title, done, total, pct: Math.round(done / total * 100) };
  });
  const overallPct = Math.round(quizProgress.reduce((a, b) => a + b.pct, 0) / quizProgress.length);
  const quizzesDone = quizProgress.filter(q => q.pct === 100).length;
  const simsDone = state.completedSims.length;
  const reportReady = !!state.report;
  const firstName = esc(u?.name?.split(" ")[0] || "there");

  let nextStep;
  if (quizzesDone < 5) {
    const nq = quizProgress.find(q => q.pct < 100);
    nextStep = { title: nq.title, meta: `${nq.done}/${nq.total} answered · ~2 min`, action: `quiz:${nq.key}` };
  } else if (simsDone === 0) {
    nextStep = { title: "Live your first career day", meta: "6 careers · ~5 min", action: "careers" };
  } else if (simsDone < 2) {
    nextStep = { title: "Try one more career", meta: "contrast sharpens your report", action: "careers" };
  } else if (!reportReady) {
    nextStep = { title: "Generate your Compass report", meta: "everything's ready", action: "report" };
  } else {
    nextStep = { title: "Revisit your Compass report", meta: "or live another career", action: "report" };
  }

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return `
    ${renderNav()}
    <div class="dash-page rise">
      <header class="dash-head gutter">
        <div>
          <h1 class="dash-greeting">${greeting}, <span class="em">${firstName}</span>.</h1>
        </div>
        <div class="dash-head-side">
          <p>${
            overallPct < 100 ? "Finish your assessments, then live a couple of careers to unlock your Compass report."
            : simsDone === 0 ? "Quizzes done. Now the fun part — pick a career and live it for a day."
            : !reportReady ? "You've given the compass plenty of signal. Time to see the map."
            : "Everything's ready. Keep exploring, or revisit your report."
          }</p>
          <div class="dash-head-meta">
            <span>Grade ${esc(u?.grade || "—")}</span>
            <span>${quizzesDone}/5 quizzes</span>
            <span>${simsDone} career${simsDone === 1 ? "" : "s"} lived</span>
          </div>
        </div>
      </header>

      <div class="dash-stats">
        <div>
          <div class="dash-stat-label">Overall progress</div>
          <div class="dash-stat-value">${overallPct}<span class="unit">%</span></div>
          <div class="dash-stat-mini"><div style="width:${overallPct}%"></div></div>
        </div>
        <div>
          <div class="dash-stat-label">Quizzes done</div>
          <div class="dash-stat-value">${quizzesDone}<span class="unit">/5</span></div>
          <div class="dash-stat-sub">${quizzesDone === 5 ? "All complete" : `${5 - quizzesDone} to go`}</div>
        </div>
        <div>
          <div class="dash-stat-label">Careers lived</div>
          <div class="dash-stat-value">${simsDone}</div>
          <div class="dash-stat-sub">${simsDone === 0 ? "None yet" : simsDone === 1 ? "Nice start" : "Keep going"}</div>
        </div>
        <div>
          <div class="dash-stat-label">Report</div>
          <div class="dash-stat-value">${reportReady ? "Ready" : "Locked"}</div>
          <div class="dash-stat-sub">${reportReady ? "View anytime" : "Finish all 5 quizzes"}</div>
        </div>
      </div>

      <button class="dash-next" data-action="go" data-screen="${nextStep.action}">
        <span class="dash-next-kicker">Up next</span>
        <span class="dash-next-title">${esc(nextStep.title)}</span>
        <span class="dash-next-meta">${esc(nextStep.meta)}</span>
        <span class="dash-next-arrow">→</span>
      </button>

      <section class="dash-split gutter">
        <div>
          <h2 class="dash-section-title">Your five quizzes.</h2>
          <p class="dash-section-sub">Rate honestly — the sharper your answers, the sharper your report. About 40 questions total.</p>
        </div>
        <div>
          ${quizProgress.map((q, i) => `
            <button class="dash-quiz-row" data-action="go" data-screen="${q.pct === 100 ? `quiz-result:${q.key}` : `quiz:${q.key}`}">
              <span class="dash-quiz-idx">0${i + 1}</span>
              <span>
                <span class="dash-quiz-name">${esc(q.title)}</span>
                <span class="dash-quiz-bar"><span style="width:${q.pct}%"></span></span>
              </span>
              <span class="dash-quiz-pct ${q.pct === 100 ? "done" : ""}">${q.pct === 100 ? "SEE RESULTS →" : q.pct + "%"}</span>
              <span class="dash-quiz-arrow">→</span>
            </button>
          `).join("")}
        </div>
      </section>

      <section class="dash-split gutter">
        <div>
          <h2 class="dash-section-title">Careers you've lived.</h2>
          <p class="dash-section-sub">Every simulation adds signal to your report. Try wildly different ones — contrast is what makes patterns show up.</p>
          ${simsDone >= 2 ? `<button class="btn btn-ghost" data-action="go" data-screen="compare">Compare side-by-side</button>` : ""}
        </div>
        <div>
          ${simsDone === 0
            ? `<div class="dash-empty">Nothing here yet. The founder day is a popular first pick — five minutes of glorious chaos.</div>`
            : state.completedSims.slice(0, 5).map(s => `
                <div class="dash-sim-row">
                  <div class="dash-sim-score ${scoreClass(s.verdict.score)}">${s.verdict.score}</div>
                  <div>
                    <div class="dash-sim-name">${esc(s.career)}</div>
                    <div class="dash-sim-line">${esc(s.verdict.headline)}</div>
                  </div>
                </div>
              `).join("")}
          <button class="dash-add-row" data-action="go" data-screen="careers">
            <span>${simsDone === 0 ? "Live your first career day" : "Simulate another career"}</span>
            <span class="dash-quiz-arrow">→</span>
          </button>
        </div>
      </section>

    </div>
  `;
}

// ============================================================
// QUIZ RUNNER
// ============================================================
function renderQuiz() {
  const quiz = QUIZZES.find(q => q.key === state.currentQuiz);
  if (!quiz) return renderDashboard();
  const answers = state.quizAnswers[quiz.key] || {};
  const idx = state.currentQuizIdx;
  const item = quiz.items[idx];
  const progress = (idx / quiz.items.length) * 100;
  const answeredCount = Object.keys(answers).length;

  return `
    ${renderNav()}
    <div class="container" style="max-width:620px">
      <div class="rise">
        <button class="back-link" data-action="go" data-screen="dashboard">← BACK TO DASHBOARD</button>
        <div class="kicker">${esc(quiz.title.toUpperCase())} · ${idx + 1} / ${quiz.items.length}</div>
        <div class="progress"><div class="progress-bar" style="width:${progress}%"></div></div>

        <div class="card mt-lg mb-lg" style="padding:28px;">
          <div class="quiz-question">${esc(item.q)}</div>
          ${quiz.binary
            ? `<div class="stack-sm">${item.opts.map((o, i) => `
                <button class="quiz-option" data-action="quiz-answer" data-value="${esc(o.tag)}">
                  <span><span class="quiz-option-key">${String.fromCharCode(65 + i)}</span> &nbsp; ${esc(o.label)}</span>
                </button>
              `).join("")}</div>`
            : `<div class="stack-sm">${quiz.scale.map((label, val) => `
                <button class="quiz-option" data-action="quiz-answer" data-value="${val}">
                  <span>${esc(label)}</span>
                  <span class="mono" style="font-size:11px;color:var(--faint);">${val + 1}</span>
                </button>
              `).join("")}</div>`}
        </div>

        <div class="quiz-nav">
          <button class="btn btn-ghost btn-sm" data-action="quiz-nav" data-dir="prev" ${idx === 0 ? "disabled" : ""}>← Previous</button>
          <div class="text-sub" style="font-size:12px;">${answeredCount} / ${quiz.items.length} answered</div>
          <button class="btn btn-ghost btn-sm" data-action="quiz-nav" data-dir="next"
            ${idx === quiz.items.length - 1 || answers[idx] === undefined ? "disabled" : ""}>Next →</button>
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// QUIZ RESULT (per-quiz breakdown)
// ============================================================
function renderQuizResult() {
  const key = state.currentQuiz;
  const quiz = QUIZZES.find(q => q.key === key);
  if (!quiz) return renderDashboard();
  const answers = state.quizAnswers[key] || {};
  const total = quiz.items.length;
  const done = Object.keys(answers).length;

  // If not fully done — bounce back to the quiz itself
  if (done < total) { go(`quiz:${key}`); return ""; }

  // Compute this quiz's dimension scores in isolation
  const dims = scoreSingleQuiz(key);
  const bands = (score) => {
    if (score >= 75) return "very strong";
    if (score >= 60) return "strong";
    if (score >= 45) return "moderate";
    if (score >= 30) return "mild";
    return "weak";
  };
  const sortedDims = Object.entries(dims).filter(([_, v]) => v > 0).sort((a, b) => b[1] - a[1]);
  const takeaway = quizTakeawayFor(key, sortedDims);

  // Meta: quiz idx among all quizzes
  const quizIdx = QUIZZES.findIndex(q => q.key === key);

  return `
    ${renderNav()}
    <div class="container wide rise">
      <button class="back-link" data-action="go" data-screen="dashboard">← BACK TO DASHBOARD</button>

      <div class="mb-lg" style="padding-bottom:24px;border-bottom:1px solid var(--line);">
        <h1 class="hero" style="font-size:clamp(36px, 5vw, 56px);margin-bottom:14px;letter-spacing:-0.03em;">${esc(quiz.title)}</h1>
        <p class="sub-text" style="max-width:640px;font-size:17px;">You answered ${done} of ${total} questions. Here's what your answers actually mapped to — dimension by dimension.</p>
      </div>

      <!-- Dimension bars -->
      <div class="mb-lg">
        <h2 class="section" style="font-size:28px;">The signal, in bars.</h2>
        ${sortedDims.length ? `
          <div class="card" style="padding:28px;">
            <div class="stack-md">
              ${sortedDims.map(([dim, score]) => {
                const band = bands(score);
                const gradient = band === "very strong" || band === "strong" ? "var(--grad-brand)" : band === "moderate" ? "var(--grad-warm)" : "var(--sub)";
                const label = DIM_LABELS[key]?.[dim] || dim.replace(/_/g, " ");
                return `
                  <div>
                    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px;">
                      <span style="font-size:15.5px;font-weight:600;">${esc(cap(label))}</span>
                      <span class="mono" style="font-size:12.5px;color:var(--sub);">${score}% · ${esc(band)}</span>
                    </div>
                    <div style="height:8px;background:var(--bg-alt);border-radius:999px;overflow:hidden;">
                      <div style="height:100%;width:${score}%;background:${gradient};transition:width .6s ease;"></div>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        ` : `<div class="card" style="padding:22px;color:var(--sub);">No dimension signal from this quiz — likely because most answers were in the middle.</div>`}
      </div>

      <!-- Takeaway -->
      <div class="mb-lg">
        <div class="card card-gradient" style="padding:30px;">
          <div class="serif" style="font-size:24px;letter-spacing:-0.3px;line-height:1.25;margin-bottom:12px;">${esc(takeaway.headline)}</div>
          <p style="font-size:15px;line-height:1.65;opacity:0.92;margin:0;">${esc(takeaway.body)}</p>
        </div>
      </div>

      <!-- Your answers -->
      <div class="mb-lg">
        <h2 class="section" style="font-size:26px;">What you actually said.</h2>
        <div class="card card-flat">
          ${quiz.items.map((it, i) => {
            const ans = answers[i];
            const label = quiz.binary
              ? (it.opts.find(o => o.tag === ans)?.label || "—")
              : (ans !== undefined ? quiz.scale[ans] : "—");
            return `
              <div style="display:grid;grid-template-columns:36px 1fr auto;gap:16px;align-items:center;padding:16px 20px;border-bottom:1px solid var(--line);">
                <span class="mono" style="font-size:11px;color:var(--faint);letter-spacing:0.5px;">${String(i + 1).padStart(2, "0")}</span>
                <div style="font-size:14.5px;line-height:1.5;">${esc(it.q)}</div>
                <span class="badge ${ans >= 3 ? "badge-brand" : ans === 2 ? "badge" : "badge"}" style="font-size:11px;">${esc(label)}</span>
              </div>
            `;
          }).join("")}
        </div>
      </div>

      <div class="row" style="padding-top:20px;border-top:1px solid var(--line);">
        <button class="btn btn-primary" data-action="go" data-screen="dashboard">← Back to dashboard</button>
        <button class="btn btn-ghost" data-action="retake-quiz" data-key="${key}">Retake this quiz</button>
        ${state.report ? `<button class="btn btn-ghost" data-action="go" data-screen="report">See full compass report →</button>` : ""}
      </div>
    </div>
  `;
}

// Score a single quiz in isolation (like scoreDimensions but for one quiz only)
function scoreSingleQuiz(key) {
  const dims = {};
  if (key === "workstyle") {
    const wsAns = state.quizAnswers.workstyle || {};
    const wsQuiz = QUIZZES.find(q => q.key === "workstyle");
    for (let i = 0; i < wsQuiz.items.length; i++) if (wsAns[i]) dims[wsAns[i]] = 1;
    return dims;
  }
  const tags = QUIZ_TAGS[key];
  const ans = state.quizAnswers[key] || {};
  const raw = {}, maxRaw = {};
  for (let i = 0; i < tags.length; i++) {
    for (const [dim, weight] of Object.entries(tags[i])) {
      maxRaw[dim] = (maxRaw[dim] || 0) + 4 * weight;
      if (ans[i] !== undefined) raw[dim] = (raw[dim] || 0) + ans[i] * weight;
    }
  }
  for (const dim of Object.keys(maxRaw)) {
    dims[dim] = maxRaw[dim] ? Math.round((raw[dim] || 0) / maxRaw[dim] * 100) : 0;
  }
  return dims;
}

function quizTakeawayFor(key, sortedDims) {
  if (!sortedDims.length) return { headline: "Neutral profile.", body: "Most answers landed in the middle — this quiz didn't produce a strong signal in any direction. That's not a wrong answer; it just means the compass will lean on the other four quizzes to place you." };
  const [topDim, topScore] = sortedDims[0];
  const [secondDim] = sortedDims[1] || [null];
  const label = DIM_LABELS[key]?.[topDim] || topDim.replace(/_/g, " ");
  if (key === "interests") {
    if (topDim === "analytical") return { headline: `You're pulled toward logical problem-solving.`, body: `Your strongest interest is analytical thinking (${topScore}%). Careers that reward this: engineering, quant work, medicine, research. Careers that will bore you: pure-sales, hospitality, or roles built around fast improvisation.` };
    if (topDim === "creative") return { headline: `You're pulled toward creative expression.`, body: `Your strongest interest is creative expression (${topScore}%). Careers that reward this: design, writing, film, marketing, architecture. Careers that will drain you: highly repetitive execution, pure compliance work.` };
    if (topDim === "social") return { headline: `You're pulled toward connecting with people.`, body: `Your strongest interest is people (${topScore}%). Careers that reward this: teaching, therapy, sales, hospitality, medicine. Careers that will isolate you: solo deep-focus roles.` };
    if (topDim === "practical") return { headline: `You're pulled toward hands-on building.`, body: `Your strongest interest is practical building (${topScore}%). Careers that reward this: engineering, architecture, chef work, surgery. Careers that will frustrate you: purely abstract or advisory roles.` };
    if (topDim === "entrepreneurial") return { headline: `You're pulled toward starting things.`, body: `Your strongest interest is entrepreneurial energy (${topScore}%). Careers that reward this: founding, product management, growth roles, franchise ownership. Careers that will constrain you: heavily-hierarchical corporate roles.` };
    if (topDim === "investigative") return { headline: `You're pulled toward deep understanding.`, body: `Your strongest interest is investigative depth (${topScore}%). Careers that reward this: research, medicine, journalism, quant, PhD paths. Careers that will bore you: fast-moving generalist roles.` };
  }
  if (key === "strengths") return { headline: `Your top strength is ${label}.`, body: `You scored ${topScore}% on ${label}${secondDim ? ` and ${DIM_LABELS.strengths[secondDim]} came in second (${sortedDims[1][1]}%)` : ""}. Careers that pay you well for exactly this combination are the ones where these strengths carry weight day-to-day — and where their absence would be obvious.` };
  if (key === "weaknesses") return { headline: `Your biggest friction: ${label}.`, body: `${label} is your top-flagged weakness (${topScore}%). Careers where this trait would compound (the ones where the trait IS the job, not a side skill) are the ones to filter out first. Careers where you can work around it with structure and external deadlines are still viable.` };
  if (key === "values") return { headline: `${cap(label)} matters most to you.`, body: `${cap(label)} scored ${topScore}% as your top value. Careers that violate this value — even if you're technically good at them — will burn you out. Your report should filter career recommendations by this value first, before job title.` };
  if (key === "workstyle") return { headline: `Your work style is set.`, body: `You picked ${sortedDims.length} preference${sortedDims.length > 1 ? "s" : ""} for how you like to work. These filter your career shortlist at the environment level, not the title level.` };
  return { headline: `${cap(label)} is what stood out.`, body: `Your strongest signal on this quiz was ${label} at ${topScore}%.` };
}

// ============================================================
// CAREER PICKER
// ============================================================
function renderCareers() {
  const filtered = state.careerFilter === "All" ? CAREERS : CAREERS.filter(c => c.group === state.careerFilter);
  return `
    ${renderNav()}
    <div class="container wide rise">
      <button class="back-link" data-action="go" data-screen="dashboard">← BACK</button>
      <div class="mb-lg">
        <h1 class="hero" style="font-size:40px;margin-bottom:10px;">What do you want to try?</h1>
        <p class="sub-text" style="font-size:15px;">Live one full working day. Every decision has consequences. Takes ~5 minutes.</p>
      </div>

      <div class="filter-row">
        ${["All", ...CAREER_GROUPS].map(g => `
          <button class="filter-chip ${state.careerFilter === g ? "active" : ""}" data-action="filter-career" data-group="${esc(g)}">${esc(g)}</button>
        `).join("")}
      </div>

      <div class="career-grid">
        ${filtered.map(c => {
          const done = state.completedSims.find(s => s.career === c.label);
          const ready = SIM_READY.has(c.id);
          if (!ready) {
            return `
              <button class="career-card coming-soon" disabled aria-disabled="true">
                <div class="career-card-head">
                  <div class="career-card-title">${esc(c.label)}</div>
                  <span class="badge badge-soon">COMING SOON</span>
                </div>
                <div class="career-card-desc">${esc(c.plain)}</div>
                <div class="career-card-group">${esc(c.group.toUpperCase())}</div>
              </button>
            `;
          }
          return `
            <button class="career-card ${done ? "done" : ""}" data-action="start-sim" data-career-id="${esc(c.id)}">
              <div class="career-card-head">
                <div class="career-card-title">${esc(c.label)}</div>
                ${done ? `<span class="badge badge-brand">${done.verdict.score}</span>` : ""}
              </div>
              <div class="career-card-desc">${esc(c.plain)}</div>
              <div class="career-card-group">${esc(c.group.toUpperCase())}</div>
            </button>
          `;
        }).join("")}
      </div>

      <div class="custom-career">
        <div style="font-weight:600;font-size:14.5px;margin-bottom:6px;">Don't see the career you want?</div>
        <div class="text-sub" style="font-size:13px;line-height:1.5;">Suggest it and we'll build a real simulation for it next. Email us at <a href="mailto:theearlybuilder@gmail.com" style="color:var(--brand);">theearlybuilder@gmail.com</a>.</div>
      </div>
    </div>
  `;
}

// ============================================================
// SIMULATOR
// ============================================================
function renderSim() {
  const career = state.currentCareer;
  if (!career) { state.screen = "careers"; return renderCareers(); }
  const s = state.sim;

  const branching = isBranchingScript(s.script);
  const scenes = branching
    ? Object.values(s.script.scenes || {})
    : (s.script.scenes || []);
  const totalScenes = scenes.length;
  const seen = Math.min(s.log.length + (s.current ? 1 : 0), totalScenes);
  const pct = totalScenes > 1 ? Math.round(((seen - 1) / (totalScenes - 1)) * 100) : 0;
  const timeNow = s.current ? s.current.time : (s.log.length ? s.log[s.log.length - 1].time : "");
  const decisionScenes = scenes.filter(sc => sc.choices && sc.choices.length).length;
  const decisionNum = Math.min(s.pickedTones.length + 1, decisionScenes);

  return `
    ${renderNav()}
    <div class="container sim-container">
      <div class="sim-topbar">
        <div class="sim-topbar-row">
          <div>
            <div class="sim-kicker"><span class="sim-live-dot"></span>NOW SIMULATING</div>
            <div class="sim-title">${esc(career.label)}</div>
          </div>
          <button class="btn btn-ghost btn-sm" data-action="go" data-screen="careers">Quit shift</button>
        </div>
        <div class="sim-day">
          <div class="sim-day-track">
            <div class="sim-day-fill" style="width:${Math.max(pct, 2)}%"></div>
            ${scenes.map((_, i) => `<span class="sim-day-dot ${i < seen - 1 ? "past" : i === seen - 1 ? "now" : ""}" style="left:${totalScenes > 1 ? (i / (totalScenes - 1)) * 100 : 0}%"></span>`).join("")}
          </div>
          <div class="sim-day-meta">
            <span class="mono">${esc(timeNow)}</span>
            ${s.current && s.current.choices.length ? `<span class="mono">DECISION ${decisionNum} OF ${decisionScenes}</span>` : `<span class="mono">${seen >= totalScenes ? "SHIFT ENDING" : "…"}</span>`}
          </div>
        </div>
      </div>

      ${s.script.intro && s.log.length === 0 ? `
        <div class="sim-brief rise">
          <div class="sim-brief-label">YOUR BRIEF</div>
          <div class="sim-brief-text">${esc(s.script.intro)}</div>
        </div>
      ` : ""}

      <div class="sim-log">
        ${s.log.map(e => `
          <div class="sim-entry past rise">
            <span class="sim-node"></span>
            <div class="sim-time">${esc(e.time)}</div>
            <div class="sim-scene">${esc(e.scene)}</div>
            ${e.choice ? `<div class="sim-choice-past"><span class="sim-choice-past-tag">YOUR MOVE</span>${esc(e.choice)}</div>` : ""}
          </div>
        `).join("")}

        ${s.current ? `
          <div class="sim-entry now rise">
            <span class="sim-node live"></span>
            <div class="sim-now-card">
              <div class="sim-now-head">
                <span class="sim-time-chip mono">${esc(s.current.time)}</span>
                ${s.current.stat ? `<span class="sim-stat-chip mono">${esc(s.current.stat.label)}</span>` : ""}
              </div>
              <div class="sim-scene current">${esc(s.current.scene)}</div>
              ${s.current.choices.length ? `
                <div class="sim-choices">
                  <div class="sim-choices-label">What do you do?</div>
                  ${s.current.choices.map((c, i) => `
                    <button class="sim-choice" data-action="sim-choose" data-idx="${i}">
                      <span class="sim-choice-key mono">${String.fromCharCode(65 + i)}</span>
                      <span class="sim-choice-text">${esc(choiceText(c))}</span>
                    </button>
                  `).join("")}
                  ${s.log.length > 0 ? `
                    <button class="btn btn-ghost btn-sm sim-back-btn" data-action="sim-back" style="margin-top:12px;">← Back to previous</button>
                  ` : ""}
                </div>
              ` : ""}
            </div>
          </div>
        ` : ""}

        ${s.loading ? `<div class="sim-entry loading"><span class="sim-node"></span>${spinner(s.log.length === 0 ? "clocking you in…" : "what happens next…")}</div>` : ""}
        ${s.error ? `<div class="text-red" style="font-size:13.5px;">${esc(s.error)} <button data-action="sim-retry" style="color:var(--brand);background:none;border:none;cursor:pointer;font-size:13.5px;text-decoration:underline;">retry</button></div>` : ""}
      </div>
    </div>
  `;
}

// ============================================================
// VERDICT
// ============================================================
function renderVerdict() {
  const lv = state.lastVerdict;
  if (!lv) return renderDashboard();
  const { career, verdict } = lv;
  return `
    ${renderNav()}
    <div class="container wide rise">
      <div class="mono" style="font-size:12px;color:var(--sub);letter-spacing:1px;margin-bottom:14px;">
        FIT REPORT · ${esc(career.toUpperCase())}
      </div>

      <!-- Score + headline -->
      <div class="card mb-lg" style="padding:32px;">
        <div class="verdict-header">
          ${scoreRing(verdict.score, 120)}
          <div class="flex-1">
            <div class="verdict-headline">${esc(verdict.headline)}</div>
            ${verdict.dayRead ? `<div style="font-size:14.5px;line-height:1.6;color:var(--sub);margin-top:14px;">${esc(verdict.dayRead)}</div>` : ""}
          </div>
        </div>
        ${verdict.tally ? `
          <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:22px;padding-top:20px;border-top:1px solid var(--line);">
            <div style="padding:8px 14px;background:var(--green-soft);color:var(--green);border-radius:999px;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600;letter-spacing:0.4px;">${verdict.tally.good} STRONG CALLS</div>
            <div style="padding:8px 14px;background:var(--red-soft);color:var(--red);border-radius:999px;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600;letter-spacing:0.4px;">${verdict.tally.bad} WEAK CALLS</div>
            <div style="padding:8px 14px;background:var(--bg-alt);color:var(--sub);border-radius:999px;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600;letter-spacing:0.4px;">${verdict.tally.neutral} NEUTRAL</div>
          </div>
        ` : ""}
      </div>

      <!-- Why this score -->
      ${verdict.reasoning && verdict.reasoning.length ? `
        <div class="card mb-lg" style="padding:30px;">
          <div style="font-family:'Instrument Serif',serif;font-size:26px;letter-spacing:-0.3px;line-height:1.25;margin-bottom:8px;">
            The full read on your day.
          </div>
          <p style="font-size:14.5px;color:var(--sub);line-height:1.6;margin:0 0 24px;max-width:640px;">Every score walks you through the specific choices you made, ties them to your quiz profile, and shows how the math actually landed.</p>
          <div class="stack-md">
            ${verdict.reasoning.map((entry) => {
              const isString = typeof entry === "string";
              const kind = isString ? "opening" : entry.kind;
              const label = isString ? "" : entry.label;
              const body = isString ? entry : entry.body;
              const palette = {
                opening: { bg: "var(--brand-soft)", ink: "var(--brand-ink)", accent: "var(--brand)" },
                miss:    { bg: "var(--red-soft)",   ink: "var(--red)",       accent: "var(--red)" },
                clutch:  { bg: "var(--green-soft)", ink: "var(--green)",     accent: "var(--green)" },
                profile: { bg: "var(--amber-soft)", ink: "var(--amber)",     accent: "var(--amber)" },
                math:    { bg: "var(--bg-alt)",     ink: "var(--sub)",       accent: "var(--sub)" },
              }[kind] || { bg: "var(--bg-alt)", ink: "var(--sub)", accent: "var(--sub)" };
              return `
                <div style="padding:18px 20px;background:${palette.bg};border-radius:14px;border-left:3px solid ${palette.accent};">
                  ${label ? `<div class="mono" style="font-size:10.5px;color:${palette.ink};letter-spacing:0.8px;margin-bottom:8px;text-transform:uppercase;font-weight:700;">${esc(label)}</div>` : ""}
                  <div style="font-size:14.5px;line-height:1.65;color:var(--ink);">${esc(body)}</div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      ` : ""}

      <!-- Reality check -->
      <div class="card mb-lg" style="padding:28px;">
        <div style="font-family:'Instrument Serif',serif;font-size:22px;letter-spacing:-0.3px;line-height:1.35;margin-bottom:14px;">
          What this career actually looks like.
        </div>
        <div style="font-size:15px;line-height:1.7;color:var(--ink-soft);">${esc(verdict.reality)}</div>
        <div style="font-size:14px;line-height:1.6;color:var(--sub);margin-top:18px;padding-top:16px;border-top:1px solid var(--line);">
          <b style="color:var(--ink)">Best fit for:</b> ${esc(verdict.fitFor)}
        </div>
      </div>

      <!-- Energized / Drained -->
      <div class="super-grid mb-lg">
        <div class="card super-card green">
          <div class="mono" style="font-size:11px;color:var(--green);letter-spacing:1px;margin-bottom:14px;">WHAT WOULD ENERGIZE YOU</div>
          ${verdict.energized.map(e => `<div class="super-item"><span class="text-green" style="margin-right:6px;">+</span>${esc(e)}</div>`).join("")}
        </div>
        <div class="card super-card amber">
          <div class="mono" style="font-size:11px;color:var(--red);letter-spacing:1px;margin-bottom:14px;">WHAT WOULD DRAIN YOU</div>
          ${verdict.drained.map(e => `<div class="super-item"><span style="color:var(--red);margin-right:6px;">–</span>${esc(e)}</div>`).join("")}
        </div>
      </div>

      <!-- Do's and Don'ts -->
      ${verdict.dos && verdict.dos.length ? `
      <div class="mb-lg">
        <h2 class="section" style="font-size:30px;">Do's and don'ts, from people who did it.</h2>
        <div class="super-grid">
          <div class="card">
            <div class="mono" style="font-size:11px;color:var(--green);letter-spacing:1px;margin-bottom:14px;">DO</div>
            ${verdict.dos.map(d => `<div style="font-size:14.5px;line-height:1.55;margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid var(--line);"><span class="text-green" style="font-weight:700;margin-right:8px;">✓</span>${esc(d)}</div>`).join("")}
          </div>
          <div class="card">
            <div class="mono" style="font-size:11px;color:var(--red);letter-spacing:1px;margin-bottom:14px;">DON'T</div>
            ${verdict.donts.map(d => `<div style="font-size:14.5px;line-height:1.55;margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid var(--line);"><span class="text-red" style="font-weight:700;margin-right:8px;">×</span>${esc(d)}</div>`).join("")}
          </div>
        </div>
      </div>
      ` : ""}

      <div class="row" style="padding-top:20px;border-top:1px solid var(--line);">
        <button class="btn btn-primary" data-action="go" data-screen="careers">Simulate another →</button>
        ${state.completedSims.length >= 2 ? `<button class="btn btn-ghost" data-action="go" data-screen="compare">Compare careers</button>` : ""}
        <button class="btn btn-ghost" data-action="go" data-screen="dashboard">Back to dashboard</button>
      </div>
    </div>
  `;
}

// ============================================================
// REPORT
// ============================================================
function renderReport() {
  if (state.reportLoading) {
    return `
      ${renderNav()}
      <div class="container">
        <div style="padding:60px 0;text-align:center;">
          <div class="serif" style="font-size:32px;margin-bottom:14px;">Building your compass…</div>
          <div class="text-sub" style="font-size:14px;margin-bottom:24px;">Analyzing every answer you gave.</div>
          ${spinner("reading between the lines…")}
        </div>
      </div>
    `;
  }
  const r = state.report;
  if (!r) {
    return `
      ${renderNav()}
      <div class="container">
        ${state.reportError ? `<div class="text-red mb-md">${esc(state.reportError)}</div>` : ""}
        <button class="btn btn-primary" data-action="generate-report">Generate report</button>
      </div>
    `;
  }
  return `
    ${renderNav()}
    <div class="container wide rise">
      <button class="back-link" data-action="go" data-screen="dashboard">← BACK TO DASHBOARD</button>

      <div class="report-header">
        <div class="mono" style="font-size:12px;color:var(--brand);letter-spacing:1.5px;margin-bottom:12px;">
          THE CAREER COMPASS REPORT
        </div>
        <h1 class="report-title">${esc(r.headline)}</h1>
        <p class="sub-text" style="max-width:640px;font-size:18px;">${esc(r.profile)}</p>
        ${r.signature ? `
          <div style="margin-top:26px;padding:22px 26px;border-left:3px solid var(--brand);background:var(--brand-soft);border-radius:0 12px 12px 0;">
            <div class="mono" style="font-size:11px;color:var(--brand-ink);letter-spacing:1px;margin-bottom:8px;">YOUR SIGNATURE</div>
            <div style="font-family:'Instrument Serif',serif;font-size:22px;line-height:1.35;letter-spacing:-0.3px;color:var(--brand-ink);">${esc(r.signature)}</div>
          </div>
        ` : ""}
      </div>

      <!-- Superpowers + Watchouts -->
      <div class="super-grid">
        <div class="card super-card green">
          <div class="mono" style="font-size:11px;color:var(--green);letter-spacing:1px;margin-bottom:12px;">YOUR SUPERPOWERS</div>
          ${r.superpowers.map(s => `<div class="super-item"><span class="text-green" style="margin-right:6px;">★</span>${esc(s)}</div>`).join("")}
        </div>
        <div class="card super-card amber">
          <div class="mono" style="font-size:11px;color:var(--amber);letter-spacing:1px;margin-bottom:12px;">WATCH OUT FOR</div>
          ${r.watchouts.map(s => `<div class="super-item"><span class="text-amber" style="margin-right:6px;">⚠</span>${esc(s)}</div>`).join("")}
        </div>
      </div>

      <!-- Quiz results breakdown — what the tests actually said -->
      ${r.quizBreakdown && r.quizBreakdown.length ? `
        <div class="mb-lg">
          <h2 class="section" style="font-size:30px;">What the five quizzes actually said.</h2>
          <p class="sub-text" style="max-width:640px;font-size:15px;margin-bottom:24px;">Before the career recommendations, here's the raw signal — dimension by dimension, from your own answers.</p>
          <div class="stack-md">
            ${r.quizBreakdown.map((s, i) => `
              <div class="card" style="padding:26px;">
                <div style="display:flex;gap:12px;align-items:baseline;margin-bottom:14px;flex-wrap:wrap;">
                  <span class="mono" style="font-size:11px;color:var(--faint);letter-spacing:0.5px;">0${i+1} · QUIZ ${i+1} OF 5</span>
                </div>
                <div style="font-family:'Instrument Serif',serif;font-size:26px;letter-spacing:-0.3px;line-height:1.15;margin-bottom:10px;">${esc(s.title)}</div>
                <div style="font-size:15px;line-height:1.6;color:var(--ink-soft);margin-bottom:${s.bars || s.picks ? "18px" : "0"};">${esc(s.lead)}</div>
                ${s.bars && s.bars.length ? `
                  <div class="stack-sm" style="margin-bottom:18px;">
                    ${s.bars.map(b => `
                      <div>
                        <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
                          <span style="font-size:14px;font-weight:600;">${esc(b.label)}</span>
                          <span class="mono" style="font-size:12px;color:var(--sub);">${b.score}% · ${esc(b.band)}</span>
                        </div>
                        <div style="height:6px;background:var(--bg-alt);border-radius:999px;overflow:hidden;">
                          <div style="height:100%;width:${b.score}%;background:${b.band === 'very strong' || b.band === 'strong' ? 'var(--grad-brand)' : b.band === 'moderate' ? 'var(--grad-warm)' : 'var(--sub)'};"></div>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                ` : ""}
                ${s.picks && s.picks.length ? `
                  <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px;">
                    ${s.picks.map(p => `<span class="badge badge-brand">${esc(p)}</span>`).join("")}
                  </div>
                ` : ""}
                <div style="padding:14px 16px;background:var(--bg-alt);border-radius:10px;border-left:3px solid var(--brand);">
                  <div class="mono" style="font-size:10.5px;color:var(--brand);letter-spacing:0.8px;margin-bottom:6px;">WHAT THIS MEANS</div>
                  <div style="font-size:14px;line-height:1.6;color:var(--ink-soft);">${esc(s.takeaway)}</div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      ` : ""}

      <!-- Patterns -->
      ${r.patterns && r.patterns.length ? `
        <div class="mb-lg">
          <h2 class="section" style="font-size:30px;">What your answers keep telling us.</h2>
          <div class="stack-md">
            ${r.patterns.map(p => `
              <div class="card" style="padding:22px;">
                <div style="font-family:'Instrument Serif',serif;font-size:22px;letter-spacing:-0.3px;line-height:1.2;margin-bottom:8px;">${esc(p.title)}</div>
                <div style="font-size:14.5px;color:var(--sub);line-height:1.65;">${esc(p.detail)}</div>
              </div>
            `).join("")}
          </div>
        </div>
      ` : ""}

      <!-- Contrasts / tensions -->
      ${r.contrasts && r.contrasts.length ? `
        <div class="mb-lg">
          <h2 class="section" style="font-size:28px;">You want two things that don't obviously coexist.</h2>
          <div class="stack-sm">
            ${r.contrasts.map(c => `
              <div class="card" style="padding:20px 22px;border-left:3px solid var(--amber);background:var(--amber-soft);">
                <div style="font-size:14.5px;line-height:1.6;color:var(--ink);">${esc(c)}</div>
              </div>
            `).join("")}
          </div>
        </div>
      ` : ""}

      <!-- Fields that fit -->
      <div class="mb-lg">
        <h2 class="section" style="font-size:30px;">Where you'll thrive.</h2>
        <div class="card card-flat">
          ${r.topFields.map(f => `
            <div class="fit-row">
              <div class="fit-score ${scoreClass(f.fit)}">${f.fit}</div>
              <div style="flex:1;">
                <div class="fit-title">${esc(f.field)}</div>
                <div class="fit-desc">${esc(f.why)}</div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Top careers with do's/don'ts inline -->
      <div class="mb-lg">
        <h2 class="section" style="font-size:30px;">Actual jobs — with the honest playbook.</h2>
        <div class="stack-lg">
          ${r.topCareers.map((c, i) => `
            <div class="card" style="padding:26px;">
              <div class="row-between mb-md" style="gap:16px;align-items:flex-start;">
                <div>
                  <div class="mono" style="font-size:11px;color:var(--faint);letter-spacing:0.5px;margin-bottom:6px;">#${i+1} · ${esc(c.group)}</div>
                  <div style="font-family:'Instrument Serif',serif;font-size:28px;letter-spacing:-0.4px;line-height:1.1;">${esc(c.career)}</div>
                </div>
                <span class="badge ${c.fit >= 75 ? "badge-good" : c.fit >= 60 ? "badge-warn" : ""}" style="font-size:13px;padding:6px 10px;">${c.fit}% fit</span>
              </div>
              <div style="font-size:14.5px;color:var(--ink-soft);line-height:1.6;margin-bottom:16px;">${esc(c.why)}</div>
              ${c.reality ? `
                <div style="font-size:13.5px;color:var(--sub);line-height:1.6;padding:14px 16px;background:var(--bg-alt);border-radius:10px;margin-bottom:16px;">
                  <span style="font-weight:600;color:var(--ink);">Reality:</span> ${esc(c.reality)}
                </div>
              ` : ""}
              ${(c.dos && c.dos.length) || (c.donts && c.donts.length) ? `
                <div class="super-grid" style="gap:12px;">
                  ${c.dos && c.dos.length ? `
                    <div style="padding:14px 16px;background:var(--green-soft);border-radius:10px;">
                      <div class="mono" style="font-size:10.5px;color:var(--green);letter-spacing:1px;margin-bottom:8px;">DO</div>
                      ${c.dos.map(d => `<div style="font-size:13px;line-height:1.5;margin-bottom:6px;color:var(--ink);"><span class="text-green" style="font-weight:700;margin-right:6px;">✓</span>${esc(d)}</div>`).join("")}
                    </div>
                  ` : ""}
                  ${c.donts && c.donts.length ? `
                    <div style="padding:14px 16px;background:var(--red-soft);border-radius:10px;">
                      <div class="mono" style="font-size:10.5px;color:var(--red);letter-spacing:1px;margin-bottom:8px;">DON'T</div>
                      ${c.donts.map(d => `<div style="font-size:13px;line-height:1.5;margin-bottom:6px;color:var(--ink);"><span class="text-red" style="font-weight:700;margin-right:6px;">×</span>${esc(d)}</div>`).join("")}
                    </div>
                  ` : ""}
                </div>
              ` : ""}
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Avoid -->
      ${r.avoid && r.avoid.length ? `
        <div class="mb-lg">
          <h2 class="section" style="font-size:28px;">Save yourself the years.</h2>
          <div class="card card-flat">
            ${r.avoid.map(a => `
              <div style="padding:16px 20px;border-bottom:1px solid var(--line);">
                <div style="font-weight:600;font-size:15.5px;margin-bottom:4px;">× ${esc(a.career)} <span style="color:var(--faint);font-size:12px;font-weight:400;margin-left:6px;">${esc(a.group || "")}</span></div>
                <div style="font-size:13.5px;color:var(--sub);line-height:1.55;">${esc(a.why)}</div>
              </div>
            `).join("")}
          </div>
        </div>
      ` : ""}

      <!-- Sim insights, if any -->
      ${r.simInsights ? `
        <div class="mb-lg">
          <h2 class="section" style="font-size:28px;">Behavioural signal, not just quiz answers.</h2>
          <div class="card" style="padding:24px;">
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid var(--line);">
              <div>
                <div class="mono" style="font-size:11px;color:var(--sub);letter-spacing:0.5px;margin-bottom:6px;">SIMULATED</div>
                <div style="font-family:'Instrument Serif',serif;font-size:28px;letter-spacing:-0.4px;line-height:1;">${r.simInsights.count}</div>
              </div>
              <div>
                <div class="mono" style="font-size:11px;color:var(--sub);letter-spacing:0.5px;margin-bottom:6px;">AVERAGE FIT</div>
                <div class="fit-score ${scoreClass(r.simInsights.average)}" style="font-size:28px;width:auto;">${r.simInsights.average}</div>
              </div>
              <div>
                <div class="mono" style="font-size:11px;color:var(--sub);letter-spacing:0.5px;margin-bottom:6px;">BEST FIT SO FAR</div>
                <div style="font-family:'Instrument Serif',serif;font-size:20px;letter-spacing:-0.2px;line-height:1.2;">${esc(r.simInsights.best)}</div>
              </div>
            </div>
            <div style="font-size:15px;line-height:1.65;color:var(--ink-soft);">${esc(r.simInsights.read)}</div>
          </div>
        </div>
      ` : ""}

      <!-- Six month plan -->
      <div class="mb-lg">
        <div style="padding:32px 0;">
          <div class="mono" style="font-size:12px;color:var(--brand);letter-spacing:1px;margin-bottom:10px;">YOUR NEXT 6 MONTHS</div>
          <h2 class="serif" style="font-size:32px;letter-spacing:-0.5px;line-height:1.1;margin:0 0 20px;">Try this to test your fit for real.</h2>
          ${r.sixMonthPlan.map((p, i) => `
            <div class="plan-item">
              <span class="plan-num">${i + 1}</span>
              <div class="plan-text">${esc(p)}</div>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="row" style="padding-top:20px;border-top:1px solid var(--line);">
        <button class="btn btn-primary" data-action="go" data-screen="careers">Try more careers →</button>
        <button class="btn btn-ghost" data-action="regenerate-report">Regenerate report</button>
        <button class="btn btn-ghost" data-action="print">Print / save PDF</button>
      </div>
    </div>
  `;
}

// ============================================================
// COMPARE
// ============================================================
function renderCompare() {
  const c = state.compareResult;
  if (!c) {
    return `
      ${renderNav()}
      <div class="container">
        <div style="padding:60px 0;text-align:center;">
          <div class="serif" style="font-size:28px;margin-bottom:20px;">Comparing your careers…</div>
          ${spinner("weighing the choices…")}
        </div>
      </div>
    `;
  }
  return `
    ${renderNav()}
    <div class="container rise">
      <div class="mono" style="font-size:12px;color:var(--sub);letter-spacing:1px;margin-bottom:14px;">
        FINAL VERDICT · ${state.completedSims.length} CAREERS COMPARED
      </div>
      <h1 class="hero" style="font-size:44px;margin-bottom:24px;">${esc(c.winner)}</h1>
      <div class="card mb-md" style="padding:24px;">
        ${c.ranking.map((r, i) => `
          <div class="rank-row">
            <span class="rank-num ${i === 0 ? "first" : ""}">#${i + 1}</span>
            <div style="flex:1">
              <div style="font-weight:600;font-size:15px;">${esc(r.career)}</div>
              <div class="text-sub" style="font-size:13px;line-height:1.5;">${esc(r.oneLiner)}</div>
            </div>
            <span class="rank-score ${scoreClass(r.score)}">${r.score}</span>
          </div>
        `).join("")}
      </div>
      <div class="card mb-md" style="padding:24px;">
        <div class="mono" style="font-size:11px;color:var(--brand);margin-bottom:10px;letter-spacing:1px;">WHY</div>
        <div style="font-size:15px;line-height:1.65;margin-bottom:20px;">${esc(c.reasoning)}</div>
        <div class="mono" style="font-size:11px;color:var(--amber);margin-bottom:10px;letter-spacing:1px;">NEXT 6 MONTHS</div>
        <div style="font-size:15px;line-height:1.65;">${esc(c.nextStep)}</div>
      </div>
      <div class="row">
        <button class="btn btn-primary" data-action="go" data-screen="careers">Test another career</button>
        <button class="btn btn-ghost" data-action="go" data-screen="report">See full report</button>
        <button class="btn btn-ghost" data-action="go" data-screen="dashboard">Dashboard</button>
      </div>
    </div>
  `;
}

// ============================================================
// LEGAL PAGES
// ============================================================
function renderLegalShell(title, kicker, updated, sections) {
  return `
    ${renderNav()}
    <div class="container rise" style="max-width:780px;">
      <button class="back-link" data-action="go" data-screen="landing">← BACK TO HOME</button>

      <div class="mb-lg" style="padding-bottom:24px;border-bottom:1px solid var(--line);">
        <div class="mono" style="font-size:11px;letter-spacing:1.2px;color:var(--sub);margin-bottom:14px;">${esc(kicker)}</div>
        <h1 class="hero" style="font-size:clamp(38px, 5.5vw, 60px);margin-bottom:14px;letter-spacing:-0.03em;">${esc(title)}</h1>
        <p class="sub-text" style="font-size:15px;color:var(--sub);">Last updated: ${esc(updated)}</p>
      </div>

      <div class="legal-body" style="font-size:16px;line-height:1.75;color:var(--fg);">
        ${sections.map(s => `
          <section style="margin-bottom:38px;">
            <h2 class="serif" style="font-size:24px;letter-spacing:-0.4px;margin:0 0 12px;">${esc(s.h)}</h2>
            ${s.body}
          </section>
        `).join("")}
      </div>

      <div style="padding:28px 0 60px;border-top:1px solid var(--line);margin-top:20px;">
        <p style="font-size:14px;color:var(--sub);margin:0 0 14px;">Questions? Email <a href="mailto:theearlybuilder@gmail.com" style="color:var(--brand);">theearlybuilder@gmail.com</a>.</p>
        <div class="row" style="gap:10px;flex-wrap:wrap;">
          <button class="btn btn-ghost btn-sm" data-action="go" data-screen="privacy">Privacy</button>
          <button class="btn btn-ghost btn-sm" data-action="go" data-screen="terms">Terms</button>
          <button class="btn btn-ghost btn-sm" data-action="go" data-screen="disclaimer">Disclaimer</button>
        </div>
      </div>
    </div>
  `;
}

function renderPrivacy() {
  return renderLegalShell("Privacy Policy", "LEGAL · PRIVACY", "July 13, 2026", [
    { h: "The short version.", body: `
      <p>The Early Builder is a self-reflection tool for students. We collect the minimum needed to make your compass work — your quiz answers, career simulation choices, and the email you sign up with. We do not sell your data. We do not run ads based on it. Your career answers are yours.</p>
    ` },
    { h: "What we collect.", body: `
      <ul>
        <li><strong>Account info:</strong> email address, name (if you provide one), and a hashed password.</li>
        <li><strong>Compass data:</strong> quiz answers, career simulation choices, verdicts, and generated report content.</li>
        <li><strong>Usage:</strong> pages visited, features used, approximate device/browser info, and rough location (country-level) from your IP for security and analytics.</li>
        <li><strong>Cloud storage:</strong> we save your progress to a secure cloud database (Firebase) so it syncs across devices and doesn't get lost between sessions. You can request deletion at any time.</li>
      </ul>
    ` },
    { h: "What we don't collect.", body: `
      <ul>
        <li>Payment or bank details — The Early Builder is free for students during our current phase.</li>
        <li>Government IDs, phone numbers, or physical addresses.</li>
        <li>Contact lists, social graphs, or anything from other apps.</li>
        <li>Precise GPS location.</li>
      </ul>
    ` },
    { h: "How we use it.", body: `
      <p>We use your data to (1) run the product — score your quizzes, generate simulations and reports; (2) improve the product — figure out which questions are confusing, which careers people want that we don't yet cover; (3) keep it secure — detect abuse and prevent account takeovers; (4) email you occasionally about your compass. Nothing else.</p>
    ` },
    { h: "Who we share it with.", body: `
      <p>A small number of infrastructure providers help us run The Early Builder — hosting, email delivery, analytics, and error monitoring. They only see what they need to do their job, and they're contractually bound to keep it confidential. We do not sell your data to advertisers, recruiters, colleges, coaching companies, or anyone else. If a career-adjacent service ever wants to reach our users, they can advertise on the site — they never get your data.</p>
    ` },
    { h: "How long we keep it.", body: `
      <p>We keep your account and compass data as long as your account exists. If you delete your account, we remove your personal data within 30 days. Aggregated, non-identifiable statistics (e.g. "34% of engineering students picked X") may be retained.</p>
    ` },
    { h: "Your rights.", body: `
      <p>You can view, export, or delete your data at any time by emailing <a href="mailto:theearlybuilder@gmail.com" style="color:var(--brand);">theearlybuilder@gmail.com</a>. If you're in the EU, UK, or California, you have additional rights under GDPR / CCPA — the right to access, correct, port, and erase your data, and to object to processing. We'll honor those requests within 30 days.</p>
    ` },
    { h: "Cookies.", body: `
      <p>We use a small number of first-party cookies (and localStorage) to keep you signed in and remember your progress. We use privacy-respecting analytics — no third-party ad trackers, no cross-site fingerprinting.</p>
    ` },
    { h: "Kids.", body: `
      <p>The Early Builder is intended for users 13 and older. If you're under 13, please don't create an account. If we learn we've collected data from a child under 13, we'll delete it.</p>
    ` },
    { h: "Changes.", body: `
      <p>If we materially change this policy, we'll notify you by email or by a banner in the app before the change takes effect. Continued use after the effective date means you accept the new policy.</p>
    ` }
  ]);
}

function renderTerms() {
  return renderLegalShell("Terms of Service", "LEGAL · TERMS", "July 13, 2026", [
    { h: "The deal.", body: `
      <p>By using The Early Builder you agree to these terms. If you don't agree, don't use the product. These terms are written in plain English on purpose — no clever traps.</p>
    ` },
    { h: "Who can use it.", body: `
      <p>You need to be at least 13 years old, and old enough in your country to consent to an online service without a parent. You agree to give accurate information when you sign up, keep your login secure, and not share your account.</p>
    ` },
    { h: "What The Early Builder is (and isn't).", body: `
      <p>The Early Builder is a self-reflection and career-exploration tool. The quizzes, simulations, verdicts, and reports are <strong>guidance, not advice</strong>. We are not your career counselor, therapist, doctor, financial advisor, or lawyer. Don't base major life decisions on the app alone — talk to real humans who know you.</p>
    ` },
    { h: "Your content.", body: `
      <p>You own your answers, choices, and anything you write into the product. By using The Early Builder, you grant us a limited license to store and process your content only to run the product for you and to improve it in aggregate, non-identifiable ways. We won't publish your content, sell it, or attribute it to you without your consent.</p>
    ` },
    { h: "Our content.", body: `
      <p>The quiz questions, career simulations, report templates, code, design, and everything else we made are owned by The Early Builder. You can use them personally through the product. You can't scrape them, repackage them, resell them, or feed them into a competing product.</p>
    ` },
    { h: "Acceptable use.", body: `
      <p>Don't do anything illegal, abusive, or harmful with The Early Builder. Specifically, don't (a) try to break into other accounts, (b) probe or attack our infrastructure, (c) scrape at scale, (d) upload malware, or (e) use The Early Builder to harass anyone. We can suspend accounts that break these rules.</p>
    ` },
    { h: "AI-generated content.", body: `
      <p>Parts of the product — reports, verdicts, some career text — are generated with the help of AI models. Generated content can be wrong, incomplete, or biased. Treat it as a starting point for your own thinking, not as a source of truth. Verify anything that matters.</p>
    ` },
    { h: "Availability.", body: `
      <p>We try to keep The Early Builder running smoothly, but we don't promise uptime, uninterrupted service, or that your data will always be recoverable. Back up anything you care about.</p>
    ` },
    { h: "Pricing.", body: `
      <p>The Early Builder is currently free for students. If we introduce paid tiers, we'll tell you before your existing usage becomes a paid feature — and free features will stay free.</p>
    ` },
    { h: "Ending it.", body: `
      <p>You can delete your account any time. We can suspend or terminate accounts that break these terms or that put other users or our infrastructure at risk. If we terminate your account without cause, we'll help you export your data.</p>
    ` },
    { h: "Warranties and liability.", body: `
      <p>The Early Builder is provided "as is," without warranties of any kind. To the maximum extent permitted by law, we're not liable for indirect, incidental, or consequential damages, and our total liability for any claim is limited to $100 (or the amount you've paid us in the last 12 months, whichever is greater).</p>
    ` },
    { h: "Governing law.", body: `
      <p>These terms are governed by the laws of the State of Delaware, United States. Disputes go to the state and federal courts located in Delaware, unless a mandatory local law says otherwise.</p>
    ` },
    { h: "Changes.", body: `
      <p>We may update these terms as the product evolves. For material changes, we'll notify you at least 14 days in advance. Continued use after the effective date means you accept the new terms.</p>
    ` }
  ]);
}

function renderDisclaimer() {
  return renderLegalShell("Disclaimer", "LEGAL · DISCLAIMER", "July 13, 2026", [
    { h: "Read this before betting your life on a quiz.", body: `
      <p>The Early Builder helps you think about your career. It does not decide it for you. Everything below is common sense, but we're saying it out loud so nobody is surprised.</p>
    ` },
    { h: "Not professional advice.", body: `
      <p>Nothing on The Early Builder is career, legal, financial, medical, or psychological advice. Career fit is complicated — the app looks at a slice of it. For big decisions, talk to people who know you personally and to qualified professionals when relevant.</p>
    ` },
    { h: "Career simulations are simplified.", body: `
      <p>A 15-minute simulation cannot capture what a career actually feels like across ten years. We compress days into scenes, exaggerate contrasts, and omit boring middles. That's the point — but it also means the simulation is a caricature, not a documentary.</p>
    ` },
    { h: "Salary and market data.", body: `
      <p>Salary ranges, market demand indicators, and "day in the life" descriptions are approximate and change quickly. They are based on public data and our editorial judgment at the time of writing. Don't quote them in negotiations.</p>
    ` },
    { h: "AI limitations.", body: `
      <p>Some content is AI-generated. AI models make mistakes, hallucinate facts, reflect biases in their training data, and can be confidently wrong. Cross-check anything important.</p>
    ` },
    { h: "No guarantees of outcome.", body: `
      <p>Using The Early Builder will not guarantee you a job, an internship, admission, income, or happiness in any career. It's a mirror, not a magic wand.</p>
    ` },
    { h: "External links.", body: `
      <p>We sometimes link to other sites for context — colleges, employers, articles. We don't control those sites and aren't responsible for what they say or do.</p>
    ` }
  ]);
}

// ============================================================
// ROUTER
// ============================================================
function renderAppFooter() {
  const signedIn = !!state.user;
  const assessmentsLink = signedIn
    ? `<a data-action="go" data-screen="dashboard">Assessments</a>`
    : `<a data-action="landing-scroll" data-target="tests">Assessments</a>`;
  const simsLink = signedIn
    ? `<a data-action="go" data-screen="careers">Career simulations</a>`
    : `<a data-action="landing-scroll" data-target="sims">Career simulations</a>`;
  const reportLink = signedIn
    ? `<a data-action="go" data-screen="${state.report ? "report" : "dashboard"}">Compass report</a>`
    : `<a data-action="landing-scroll" data-target="compass">Compass report</a>`;
  return `
    <footer class="saas-footer gutter">
      <div class="saas-footer-grid">
        <div>
          <div class="saas-footer-brand"><img class="logo-mark" src="logo.png" alt="" style="width:32px;height:32px;" /> The Early Builder</div>
          <div class="saas-footer-tag">The honest career compass for students who haven't figured it out yet — which is all of them.</div>
        </div>
        <div class="saas-footer-col">
          <div class="saas-footer-col-title">Product</div>
          ${assessmentsLink}
          ${simsLink}
          ${reportLink}
        </div>
        <div class="saas-footer-col">
          <div class="saas-footer-col-title">Company</div>
          <a data-action="landing-scroll" data-target="how">How it works</a>
          <a data-action="mailto-team">Contact</a>
          <a data-action="mailto-team">Suggest a career</a>
        </div>
        <div class="saas-footer-col">
          <div class="saas-footer-col-title">Legal</div>
          <a data-action="go" data-screen="privacy">Privacy</a>
          <a data-action="go" data-screen="terms">Terms</a>
          <a data-action="go" data-screen="disclaimer">Disclaimer</a>
        </div>
      </div>
      <div class="saas-footer-bottom">
        <div>© 2026 The Early Builder · Built for students, not recruiters.</div>
      </div>
    </footer>
  `;
}

function render(preserveScroll = false) {
  applyTheme();
  const scrollY = window.scrollY;
  const app = document.getElementById("app");
  let html;
  let includeFooter = true;
  if (state.screen === "landing") { html = renderLanding(); includeFooter = false; }
  else if (state.screen === "login") html = renderLogin();
  else if (state.screen === "dashboard") html = renderDashboard();
  else if (state.screen === "quiz") html = renderQuiz();
  else if (state.screen === "quiz-result") html = renderQuizResult();
  else if (state.screen === "careers") html = renderCareers();
  else if (state.screen === "sim") html = renderSim();
  else if (state.screen === "verdict") html = renderVerdict();
  else if (state.screen === "report") html = renderReport();
  else if (state.screen === "compare") html = renderCompare();
  else if (state.screen === "privacy") html = renderPrivacy();
  else if (state.screen === "terms") html = renderTerms();
  else if (state.screen === "disclaimer") html = renderDisclaimer();
  else { html = renderLanding(); includeFooter = false; }
  if (includeFooter) html += renderAppFooter();
  app.innerHTML = html;
  window.scrollTo({ top: preserveScroll ? scrollY : 0, behavior: "instant" });
  persist();
}

function softRender() {
  applyTheme();
  const app = document.getElementById("app");
  let html;
  if (state.screen === "sim") html = renderSim();
  else if (state.screen === "quiz") html = renderQuiz();
  else return render();
  const scrollY = window.scrollY;
  app.innerHTML = html;
  window.scrollTo({ top: scrollY });
  persist();
}

// ============================================================
// ACTIONS
// ============================================================
async function go(screen) {
  state.screen = screen;
  if (screen.startsWith("quiz-result:")) {
    const key = screen.split(":")[1];
    state.currentQuiz = key;
    state.screen = "quiz-result";
  } else if (screen.startsWith("quiz:")) {
    const key = screen.split(":")[1];
    state.currentQuiz = key;
    const answers = state.quizAnswers[key] || {};
    const quiz = QUIZZES.find(q => q.key === key);
    let firstUnanswered = 0;
    for (let i = 0; i < quiz.items.length; i++) if (answers[i] === undefined) { firstUnanswered = i; break; }
    state.currentQuizIdx = firstUnanswered;
    state.screen = "quiz";
  }
  if (screen === "report" && !state.report && !state.reportLoading) {
    render();
    await generateReport();
    return;
  }
  if (screen === "compare" && !state.compareResult) {
    state.compareResult = null;
    render();
    await runCompare();
    return;
  }
  render();
}

function quizAnswer(value) {
  const quiz = QUIZZES.find(q => q.key === state.currentQuiz);
  const key = quiz.key;
  const val = quiz.binary ? value : Number(value);
  const cur = state.quizAnswers[key] || {};
  const previousAnswer = cur[state.currentQuizIdx];
  state.quizAnswers[key] = { ...cur, [state.currentQuizIdx]: val };
  // If an existing answer just changed, the cached report is stale
  if (previousAnswer !== undefined && previousAnswer !== val) {
    state.report = null;
  }
  if (state.currentQuizIdx < quiz.items.length - 1) {
    state.currentQuizIdx++;
    render();
  } else {
    state.screen = "dashboard";
    render();
  }
}

// Branching-format helpers: a script is branching when it defines `start`
// and `scenes` is a map keyed by id. Choices are objects {text,tone,sets?,next?}.
// A `next` (on choice or scene) may be a string id or (flags)=>id.
function isBranchingScript(script) {
  return typeof script.start === "string" && !Array.isArray(script.scenes);
}
function choiceText(c) { return typeof c === "string" ? c : c.text; }
function choiceTone(c, sceneTones, idx) {
  if (typeof c === "object" && c.tone) return c.tone;
  return sceneTones ? sceneTones[idx] : "neutral";
}
function resolveNextKey(scene, choice, flags) {
  const pick = (typeof choice === "object" && choice.next) || scene.next || null;
  if (!pick) return null;
  return typeof pick === "function" ? pick(flags) : pick;
}
function getScene(script, key) {
  if (key == null) return null;
  return isBranchingScript(script) ? script.scenes[key] : script.scenes[key];
}

async function startSim(career) {
  state.currentCareer = career;
  state.screen = "sim";
  const script = loadScript(career);
  const startKey = isBranchingScript(script) ? script.start : 0;
  state.sim = {
    script,
    sceneKey: startKey,
    log: [],
    current: null,
    pickedTones: [],
    flags: {},
    loading: true,
    error: null,
  };
  render();
  // brief "clocking in" pause for feel
  await new Promise((r) => setTimeout(r, 700));
  state.sim.current = getScene(script, startKey);
  state.sim.loading = false;
  render();
}

async function simChoose(choice) {
  const s = state.sim;
  const cur = s.current;
  if (!cur) return;
  const idx = cur.choices.indexOf(choice);
  const tone = idx >= 0 ? choiceTone(choice, cur.tones, idx) : "neutral";
  const text = choiceText(choice);

  // apply flag sets (branching format)
  if (typeof choice === "object" && choice.sets) {
    Object.assign(s.flags, choice.sets);
  }

  s.pickedTones.push(tone);
  s.log.push({ time: cur.time, scene: cur.scene, choice: text, stat: cur.stat, key: s.sceneKey, flagsBefore: {...s.flags}, choices: cur.choices, tones: cur.tones });
  s.current = null;

  // pick next scene key
  if (isBranchingScript(s.script)) {
    s.sceneKey = resolveNextKey(cur, choice, s.flags);
  } else {
    s.sceneKey = s.sceneKey + 1;
  }
  s.loading = true;
  softRender();

  await new Promise((r) => setTimeout(r, 700));
  const next = getScene(s.script, s.sceneKey);

  if (!next) {
    // no more scenes — finish
    s.loading = false;
    await finishSim();
    return;
  }

  if (!next.choices || next.choices.length === 0) {
    // closing beat, log it and finish
    s.log.push({ time: next.time, scene: next.scene, choice: null, stat: next.stat, key: s.sceneKey });
    s.loading = false;
    softRender();
    await new Promise((r) => setTimeout(r, 4500));
    await finishSim();
    return;
  }

  s.current = next;
  s.loading = false;
  softRender();
}

function simBack() {
  const s = state.sim;
  if (!s || s.loading || s.log.length === 0) return;
  const last = s.log.pop();
  if (last && last.choice != null) s.pickedTones.pop();
  if (isBranchingScript(s.script)) {
    // restore flags snapshot from the entry we just popped
    if (last && last.flagsBefore) {
      // flagsBefore was snapshotted AFTER applying that turn's sets; the
      // pre-turn state is the previous entry's flagsBefore (or {}).
      const prev = s.log[s.log.length - 1];
      s.flags = prev && prev.flagsBefore ? { ...prev.flagsBefore } : {};
    }
    s.sceneKey = last ? last.key : s.script.start;
  } else {
    s.sceneKey = s.log.length;
  }
  s.current = getScene(s.script, s.sceneKey);
  s.error = null;
  softRender();
}

async function finishSim() {
  const v = buildLocalVerdict(state.currentCareer, state.sim.pickedTones, state.sim.log);
  state.completedSims = [
    ...state.completedSims.filter((x) => x.career !== state.currentCareer.label),
    { career: state.currentCareer.label, verdict: v, date: new Date().toISOString() },
  ];
  state.lastVerdict = { career: state.currentCareer.label, verdict: v };
  // Report references simInsights and Compare references all sims — new sim = stale
  state.report = null;
  state.compareResult = null;
  state.screen = "verdict";
  render();
}

async function generateReport() {
  const quizzesDone = QUIZZES.filter(q => Object.keys(state.quizAnswers[q.key] || {}).length === q.items.length).length;
  if (quizzesDone < 5) {
    state.reportError = `You need to finish all 5 quizzes first. ${5 - quizzesDone} still to go.`;
    render();
    return;
  }
  state.reportLoading = true;
  state.reportError = null;
  render();
  await new Promise((r) => setTimeout(r, 900));
  try {
    state.report = buildLocalReport();
  } catch (e) {
    console.error(e);
    state.reportError = "Report generation failed. Please refresh and try again.";
  }
  state.reportLoading = false;
  render();
}

async function runCompare() {
  await new Promise((r) => setTimeout(r, 800));
  const sims = state.completedSims.slice().sort((a, b) => b.verdict.score - a.verdict.score);
  if (sims.length === 0) { state.compareResult = null; render(); return; }
  const winner = sims[0];
  const runnerUp = sims[1];
  const ranking = sims.map((s) => ({
    career: s.career,
    score: s.verdict.score,
    oneLiner: s.verdict.headline,
  }));
  const gap = runnerUp ? winner.verdict.score - runnerUp.verdict.score : 20;
  let reasoning;
  if (gap >= 15) {
    reasoning = `${winner.career} was a clear standout — you scored ${winner.verdict.score}, well ahead of the pack. What worked: ${winner.verdict.energized.join(" and ")}. What didn't drag you down: you handled the pressure better than in the other sims.`;
  } else if (gap >= 5) {
    reasoning = `${winner.career} came out on top with a score of ${winner.verdict.score}, but it's close. You showed up strongly for ${winner.verdict.energized[0]}, and your choices matched what this career actually rewards. ${runnerUp ? runnerUp.career : ""} was a real contender.`;
  } else {
    reasoning = `${winner.career} technically edged out the others, but the gap is thin. You did well across careers — meaning your fit is broad, not narrow. Trust the qualitative signal: which day did you actually enjoy?`;
  }
  const dims = scoreDimensions();
  const topValue = topKeys(dims.values, 1)[0] || "growth";
  const nextStepMap = {
    money: `Track how much people in ${winner.career} actually earn — 5 years in, 10 years in. Not the top 1%. The median.`,
    impact: `Volunteer or shadow someone in ${winner.career} for a week. See if the daily impact matches what you're imagining.`,
    freedom: `Try one month of self-directed work adjacent to ${winner.career}. No external deadlines. See if you rise to it.`,
    prestige: `Interview two people in ${winner.career}. Ask what the prestigious version of the job actually looks like day-to-day.`,
    stability: `Look up the typical career ladder in ${winner.career} — years to reach each level, exit paths. Make sure the middle looks livable.`,
    growth: `Pick one skill core to ${winner.career} and commit to 90 days of it. See if you stay curious past the honeymoon.`,
    balance: `Shadow someone senior in ${winner.career}. Watch what time they actually leave. Notice their weekends.`,
    creativity_val: `Make a portfolio piece in the style of ${winner.career} in the next 3 months. Share it. Track real feedback.`,
  };
  const nextStep = nextStepMap[topValue] || `Talk to 3 people working in ${winner.career} today. Ask them what they wish they'd known at 15.`;
  state.compareResult = { winner: winner.career, ranking, reasoning, nextStep };
  render();
}

// ============================================================
// EVENT DELEGATION
// ============================================================
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  const action = btn.dataset.action;

  if (action === "home") { go(state.user ? "dashboard" : "landing"); }
  else if (action === "go") { go(btn.dataset.screen); }
  else if (action === "logout") {
    // Save this user's data under their namespace before clearing state
    persist();
    state.user = null;
    // Reset in-memory state to what the guest would see
    state.quizAnswers = store.get(dataKey("quizAnswers", null), {});
    state.completedSims = store.get(dataKey("sims", null), []);
    state.report = store.get(dataKey("report", null), null);
    go("landing");
  }
  else if (action === "toggle-theme") { state.dark = !state.dark; render(true); }
  else if (action === "scroll") { document.getElementById(btn.dataset.target)?.scrollIntoView({ behavior: "smooth" }); }
  else if (action === "landing-scroll") {
    const target = btn.dataset.target;
    if (state.screen === "landing") {
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
    } else {
      go("landing").then(() => {
        setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: "smooth" }), 0);
      });
    }
  }
  else if (action === "faq-toggle") { btn.closest(".faq-item")?.classList.toggle("open"); }
  else if (action === "mailto-team") { window.location.href = "mailto:theearlybuilder@gmail.com?subject=The Early Builder"; }
  else if (action === "auth-mode") { state.authMode = btn.dataset.mode; render(); }
  else if (action === "auth-submit") {
    const errEl = document.getElementById("auth-error");
    const showErr = (msg) => { errEl.textContent = msg; errEl.style.display = "block"; };
    errEl.style.display = "none";

    const email = document.getElementById("auth-email")?.value?.trim();
    const password = document.getElementById("auth-password")?.value;

    if (!email || !password) { showErr("Please fill in all fields."); return; }

    const accounts = store.get("cc_accounts", {});

    if (state.authMode === "signup") {
      const name = document.getElementById("auth-name")?.value?.trim() || email.split("@")[0];
      const grade = document.getElementById("auth-grade")?.value || "10";
      const confirm = document.getElementById("auth-confirm")?.value;
      if (!name) { showErr("Please enter your name."); return; }
      if (password.length < 6) { showErr("Password must be at least 6 characters."); return; }
      if (password !== confirm) { showErr("Passwords don't match."); return; }
      if (accounts[email]) { showErr("An account with that email already exists. Sign in instead."); return; }
      accounts[email] = { name, grade, password, joined: new Date().toISOString() };
      store.set("cc_accounts", accounts);
      state.user = { name, email, grade, joined: accounts[email].joined };
      // Fresh account = fresh state
      state.quizAnswers = {};
      state.completedSims = [];
      state.report = null;
    } else {
      const acct = accounts[email];
      if (!acct) { showErr("No account found with that email. Sign up first."); return; }
      if (acct.password !== password) { showErr("Incorrect password."); return; }
      state.user = { name: acct.name, email, grade: acct.grade, joined: acct.joined };
      // Load THIS user's saved data from their namespace
      loadAccountData(email);
    }
    go("dashboard");
  }
  else if (action === "toggle-pw") {
    const wrap = btn.closest(".input-pw-wrap");
    const input = wrap?.querySelector("input");
    if (!input) return;
    input.type = input.type === "password" ? "text" : "password";
    btn.classList.toggle("pw-toggle-active", input.type === "text");
  }
  else if (action === "quiz-answer") { quizAnswer(btn.dataset.value); }
  else if (action === "retake-quiz") {
    const key = btn.dataset.key;
    state.quizAnswers = { ...state.quizAnswers, [key]: {} };
    // Retaking a quiz means the report is stale
    state.report = null;
    go(`quiz:${key}`);
  }
  else if (action === "quiz-nav") {
    const dir = btn.dataset.dir;
    const quiz = QUIZZES.find(q => q.key === state.currentQuiz);
    if (dir === "prev" && state.currentQuizIdx > 0) state.currentQuizIdx--;
    if (dir === "next" && state.currentQuizIdx < quiz.items.length - 1) state.currentQuizIdx++;
    render();
  }
  else if (action === "filter-career") { state.careerFilter = btn.dataset.group; render(); }
  else if (action === "start-sim") {
    const career = CAREERS.find(c => c.id === btn.dataset.careerId);
    if (career) startSim(career);
  }
  else if (action === "sim-choose") {
    const idx = Number(btn.dataset.idx);
    simChoose(state.sim.current.choices[idx]);
  }
  else if (action === "sim-back") { simBack(); }
  else if (action === "sim-retry") { startSim(state.currentCareer); }
  else if (action === "generate-report") { generateReport(); }
  else if (action === "regenerate-report") { state.report = null; generateReport(); }
  else if (action === "print") { window.print(); }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (document.activeElement?.tagName === "INPUT" && document.getElementById("auth-form")?.contains(document.activeElement)) {
      const btn = document.querySelector('[data-action="auth-submit"]');
      btn?.click();
    }
  }
});

// ============================================================
// BOOT
// ============================================================
render();
