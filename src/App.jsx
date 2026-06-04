import React, { useState, useMemo } from "react";
import {
  Search, Star, Calendar, Clock, Video, Wallet, Bell, Check, CheckCircle2,
  ShieldCheck, ChevronRight, X, GraduationCap, Users, TrendingUp,
  AlertTriangle, MessageSquare, CreditCard, Globe, ArrowRight, ArrowLeft,
  BarChart3, FileText, Menu, Plus, Mail, Sparkles, Languages, Heart,
  CalendarDays, Banknote, ShieldAlert, Eye
} from "lucide-react";

/* ============================ MOCK DATA ============================ */

const SUBJECTS = [
  { name: "Matematyka", icon: "∑", count: 412 },
  { name: "Fizyka", icon: "⚛", count: 188 },
  { name: "Chemia", icon: "⚗", count: 143 },
  { name: "Język angielski", icon: "A", count: 521 },
  { name: "Informatyka", icon: "{ }", count: 209 },
  { name: "Język polski", icon: "Pl", count: 176 },
  { name: "Biologia", icon: "🧬", count: 131 },
  { name: "Historia", icon: "⌛", count: 98 },
];

const TUTORS = [
  {
    id: 1, name: "Anna Kowalska", initials: "AK", color: "#16324F",
    subjects: ["Matematyka", "Fizyka"], level: "Liceum / Matura", langs: ["PL", "EN"],
    price: 85, rating: 4.9, reviews: 127, lessons: 340, verified: true,
    edu: "Doktorantka fizyki, Uniwersytet Warszawski",
    bio: "Pomagam zrozumieć matematykę i fizykę bez stresu. Specjalizuję się w przygotowaniu do matury rozszerzonej — uczę myślenia, nie wkuwania wzorów.",
    tags: ["Matura rozszerzona", "Analiza", "Cierpliwa"],
  },
  {
    id: 2, name: "Marek Nowak", initials: "MN", color: "#2E8B6F",
    subjects: ["Informatyka", "Matematyka"], level: "Studia", langs: ["PL", "EN"],
    price: 120, rating: 4.8, reviews: 89, lessons: 210, verified: true,
    edu: "Senior Developer, mgr inż. informatyki PŁ",
    bio: "Programowanie w Pythonie, Java i C++, algorytmy, struktury danych. Uczę praktycznie — kodujemy razem od pierwszej minuty.",
    tags: ["Python", "Algorytmy", "Praktyk"],
  },
  {
    id: 3, name: "Julia Wiśniewska", initials: "JW", color: "#C4724E",
    subjects: ["Język angielski"], level: "Wszystkie poziomy", langs: ["PL", "EN", "DE"],
    price: 70, rating: 5.0, reviews: 203, lessons: 612, verified: true,
    edu: "Filolog angielski, certyfikat CELTA",
    bio: "Konwersacje, przygotowanie do egzaminów Cambridge i IELTS. Lekcje w 90% po angielsku — szybkie efekty gwarantowane.",
    tags: ["IELTS", "Konwersacje", "Cambridge"],
  },
  {
    id: 4, name: "Piotr Zieliński", initials: "PZ", color: "#7A5BA8",
    subjects: ["Chemia", "Biologia"], level: "Liceum / Matura", langs: ["PL"],
    price: 75, rating: 4.7, reviews: 64, lessons: 156, verified: true,
    edu: "Student medycyny, Uniwersytet Medyczny",
    bio: "Chemia i biologia do matury oraz na studia medyczne. Wiem, czego wymaga matura — sam ją zdałem na 98%.",
    tags: ["Matura", "Studia medyczne"],
  },
  {
    id: 5, name: "Katarzyna Lewandowska", initials: "KL", color: "#16324F",
    subjects: ["Język polski", "Historia"], level: "Liceum / Matura", langs: ["PL"],
    price: 65, rating: 4.9, reviews: 98, lessons: 271, verified: false,
    edu: "Polonistka, nauczycielka z 8-letnim stażem",
    bio: "Wypracowania, interpretacje, matura ustna i pisemna. Pomogę uporządkować lektury i zbudować argumentację.",
    tags: ["Wypracowania", "Lektury"],
  },
  {
    id: 6, name: "Tomasz Dąbrowski", initials: "TD", color: "#2E8B6F",
    subjects: ["Matematyka"], level: "Szkoła podstawowa", langs: ["PL"],
    price: 55, rating: 4.8, reviews: 142, lessons: 388, verified: true,
    edu: "Nauczyciel matematyki, szkoła podstawowa",
    bio: "Matematyka dla klas 4–8 i egzamin ósmoklasisty. Tłumaczę spokojnie, krok po kroku, aż wszystko stanie się jasne.",
    tags: ["Egzamin ósmoklasisty", "Cierpliwy"],
  },
];

const REVIEWS = [
  { author: "Michał K.", rating: 5, date: "2 dni temu", text: "Najlepsza korepetytorka, jaką miałem. Z trójki podciągnąłem się na maturze do 88%." },
  { author: "Zofia P.", rating: 5, date: "1 tydzień temu", text: "Bardzo cierpliwie tłumaczy, zawsze przygotowana. Polecam!" },
  { author: "Adam W.", rating: 4, date: "3 tygodnie temu", text: "Konkretnie i na temat. Czasem tempo trochę za szybkie, ale daje radę." },
];

const STUDENT_UPCOMING = [
  { id: 1, tutor: TUTORS[0], subject: "Matematyka", day: "Pon", date: "9 cze", time: "16:00", dur: 60, status: "Opłacona" },
  { id: 2, tutor: TUTORS[2], subject: "Język angielski", day: "Śr", date: "11 cze", time: "18:30", dur: 90, status: "Opłacona" },
];

const STUDENT_HISTORY = [
  { id: 11, tutor: TUTORS[0], subject: "Matematyka", date: "2 cze 2025", rated: true, myRating: 5 },
  { id: 12, tutor: TUTORS[1], subject: "Informatyka", date: "28 maj 2025", rated: false, myRating: 0 },
  { id: 13, tutor: TUTORS[2], subject: "Język angielski", date: "21 maj 2025", rated: true, myRating: 5 },
];

const NOTIFICATIONS = [
  { id: 1, icon: Clock, text: "Lekcja z Anną Kowalską jutro o 16:00", time: "1 godz. temu", unread: true },
  { id: 2, icon: Wallet, text: "Doładowano portfel: +200 zł", time: "wczoraj", unread: true },
  { id: 3, icon: Star, text: "Oceń lekcję z Markiem Nowakiem", time: "2 dni temu", unread: false },
];

const DAYS = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nd"];
const SLOTS = ["09:00", "10:30", "12:00", "14:00", "16:00", "17:30", "19:00"];
// availability matrix: 0 niedostępne, 1 wolne, 2 zajęte
const AVAIL = [
  [1, 0, 1, 1, 0, 1, 0],
  [1, 1, 0, 1, 2, 1, 0],
  [0, 1, 1, 2, 1, 0, 1],
  [2, 1, 1, 0, 1, 1, 0],
  [1, 2, 0, 1, 1, 0, 0],
  [0, 1, 1, 1, 2, 1, 1],
  [1, 0, 1, 0, 1, 1, 0],
];

/* ============================ STYLES ============================ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=DM+Sans:wght@400;500;600;700&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

.tm {
  --navy:#16324F; --navy-deep:#0E2438; --cream:#FBF7F0; --paper:#FFFFFF;
  --amber:#E0922F; --amber-soft:#F6D9A8; --amber-bg:#FBEDD6;
  --slate:#42525E; --muted:#8C97A1; --line:#EAE2D4; --line-strong:#DCD2BF;
  --green:#2E8B6F; --green-bg:#E2F0EA; --red:#C0584C; --red-bg:#F6E4E1;
  font-family:'DM Sans',sans-serif; color:var(--navy);
  background:var(--cream); min-height:100vh;
  -webkit-font-smoothing:antialiased;
}
.tm h1,.tm h2,.tm h3,.tm .serif { font-family:'Fraunces',serif; letter-spacing:-0.01em; }

/* demo bar */
.demobar{ background:var(--navy-deep); color:#fff; display:flex; align-items:center;
  gap:14px; padding:8px 22px; font-size:13px; flex-wrap:wrap; }
.demobar .dot{ width:7px; height:7px; border-radius:50%; background:var(--amber); }
.demobar .roles{ display:flex; gap:6px; margin-left:auto; flex-wrap:wrap; }
.demobar button{ font-family:inherit; font-size:12.5px; cursor:pointer; border:none;
  padding:5px 12px; border-radius:20px; background:rgba(255,255,255,.08); color:#cdd6dd; transition:.18s; }
.demobar button:hover{ background:rgba(255,255,255,.18); color:#fff; }
.demobar button.active{ background:var(--amber); color:var(--navy-deep); font-weight:600; }

/* navbar */
.nav{ display:flex; align-items:center; gap:30px; padding:16px 34px;
  background:var(--cream); border-bottom:1px solid var(--line); position:sticky; top:0; z-index:40; }
.brand{ display:flex; align-items:center; gap:10px; cursor:pointer; }
.brand .mark{ width:38px; height:38px; border-radius:11px; background:var(--navy);
  color:#fff; display:grid; place-items:center; font-family:'Fraunces'; font-weight:700; font-size:18px; }
.brand b{ font-family:'Fraunces'; font-weight:600; font-size:21px; }
.brand b span{ color:var(--amber); }
.navlinks{ display:flex; gap:6px; }
.navlinks a{ font-size:14.5px; color:var(--slate); cursor:pointer; padding:8px 13px;
  border-radius:9px; transition:.15s; font-weight:500; }
.navlinks a:hover{ background:#fff; color:var(--navy); }
.navlinks a.active{ background:var(--navy); color:#fff; }
.navright{ margin-left:auto; display:flex; align-items:center; gap:14px; }
.iconbtn{ position:relative; width:40px; height:40px; border-radius:11px; border:1px solid var(--line);
  background:#fff; display:grid; place-items:center; cursor:pointer; color:var(--slate); transition:.15s; }
.iconbtn:hover{ border-color:var(--line-strong); color:var(--navy); }
.badge{ position:absolute; top:-5px; right:-5px; background:var(--amber); color:var(--navy-deep);
  font-size:10px; font-weight:700; min-width:17px; height:17px; border-radius:9px; display:grid;
  place-items:center; padding:0 4px; }
.wallet-pill{ display:flex; align-items:center; gap:7px; background:var(--green-bg); color:var(--green);
  padding:8px 13px; border-radius:11px; font-weight:600; font-size:14px; }
.avatar-sm{ width:40px; height:40px; border-radius:11px; display:grid; place-items:center;
  color:#fff; font-weight:600; font-size:14px; cursor:pointer; }

/* layout */
.wrap{ max-width:1180px; margin:0 auto; padding:34px; }
.btn{ font-family:inherit; font-weight:600; font-size:14.5px; cursor:pointer; border:none;
  padding:12px 22px; border-radius:11px; transition:.16s; display:inline-flex; align-items:center; gap:8px; }
.btn-primary{ background:var(--amber); color:var(--navy-deep); }
.btn-primary:hover{ background:#cf831f; transform:translateY(-1px); }
.btn-navy{ background:var(--navy); color:#fff; }
.btn-navy:hover{ background:var(--navy-deep); transform:translateY(-1px); }
.btn-ghost{ background:#fff; color:var(--navy); border:1px solid var(--line-strong); }
.btn-ghost:hover{ border-color:var(--navy); }
.btn:disabled{ opacity:.45; cursor:not-allowed; transform:none; }

.card{ background:var(--paper); border:1px solid var(--line); border-radius:18px; }
.tag{ font-size:12px; font-weight:600; padding:4px 11px; border-radius:20px;
  background:var(--amber-bg); color:#a9711c; }
.tag.grey{ background:#F2EEE5; color:var(--slate); }
.verified{ display:inline-flex; align-items:center; gap:4px; font-size:12px; font-weight:600;
  color:var(--green); background:var(--green-bg); padding:3px 9px; border-radius:20px; }
.stars{ display:inline-flex; gap:2px; color:var(--amber); }
.muted{ color:var(--muted); }
.eyebrow{ font-size:12.5px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:var(--amber); }

@keyframes rise{ from{opacity:0; transform:translateY(16px);} to{opacity:1; transform:none;} }
.rise{ animation:rise .55s cubic-bezier(.2,.7,.2,1) both; }

/* hero */
.hero{ position:relative; overflow:hidden; }
.hero-grid{ display:grid; grid-template-columns:1.15fr .85fr; gap:40px; align-items:center; }
.hero h1{ font-size:54px; line-height:1.04; font-weight:600; }
.hero h1 em{ font-style:italic; color:var(--amber); }
.hero p.lead{ font-size:18px; color:var(--slate); line-height:1.55; margin:20px 0 26px; max-width:520px; }
.searchbar{ background:#fff; border:1px solid var(--line-strong); border-radius:16px; padding:8px;
  display:flex; gap:8px; box-shadow:0 18px 40px -28px rgba(22,50,79,.5); }
.searchbar .field{ flex:1; display:flex; align-items:center; gap:10px; padding:0 14px; }
.searchbar input,.searchbar select{ border:none; outline:none; font-family:inherit; font-size:15px;
  width:100%; color:var(--navy); background:transparent; }
.hero-card-stack{ position:relative; height:380px; }
.float-card{ position:absolute; background:#fff; border:1px solid var(--line); border-radius:18px;
  padding:18px; box-shadow:0 26px 50px -32px rgba(22,50,79,.4); }
.blob{ position:absolute; border-radius:50%; filter:blur(8px); opacity:.5; }

.stat-row{ display:flex; gap:38px; margin-top:34px; }
.stat-row .n{ font-family:'Fraunces'; font-size:30px; font-weight:600; }
.stat-row .l{ font-size:13px; color:var(--muted); }

/* subject grid */
.subj-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
.subj{ background:#fff; border:1px solid var(--line); border-radius:14px; padding:18px;
  cursor:pointer; transition:.18s; }
.subj:hover{ border-color:var(--amber); transform:translateY(-3px); box-shadow:0 16px 30px -24px rgba(22,50,79,.5); }
.subj .ic{ width:42px; height:42px; border-radius:11px; background:var(--amber-bg); color:#a9711c;
  display:grid; place-items:center; font-size:20px; font-family:'Fraunces'; font-weight:600; margin-bottom:12px; }

/* how it works */
.steps{ display:grid; grid-template-columns:repeat(4,1fr); gap:18px; }
.step .num{ width:40px; height:40px; border-radius:12px; background:var(--navy); color:#fff;
  display:grid; place-items:center; font-family:'Fraunces'; font-weight:600; margin-bottom:14px; }

/* tutor card */
.tutor-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
.tutor-card{ background:#fff; border:1px solid var(--line); border-radius:18px; padding:20px;
  cursor:pointer; transition:.18s; display:flex; flex-direction:column; }
.tutor-card:hover{ border-color:var(--line-strong); transform:translateY(-4px);
  box-shadow:0 24px 44px -30px rgba(22,50,79,.45); }
.avatar{ width:54px; height:54px; border-radius:15px; display:grid; place-items:center;
  color:#fff; font-weight:600; font-size:19px; font-family:'Fraunces'; }

/* filters */
.layout-2{ display:grid; grid-template-columns:270px 1fr; gap:26px; align-items:start; }
.filter-card{ position:sticky; top:90px; }
.filter-group{ padding:16px 18px; border-bottom:1px solid var(--line); }
.filter-group:last-child{ border-bottom:none; }
.filter-group h4{ font-family:'DM Sans'; font-size:13px; text-transform:uppercase; letter-spacing:.08em;
  color:var(--muted); margin-bottom:12px; font-weight:700; }
.check{ display:flex; align-items:center; gap:9px; padding:6px 0; cursor:pointer; font-size:14.5px; color:var(--slate); }
.check input{ accent-color:var(--navy); width:16px; height:16px; }
.range{ width:100%; accent-color:var(--amber); }

/* calendar */
.cal{ display:grid; grid-template-columns:70px repeat(7,1fr); gap:6px; }
.cal .h{ text-align:center; font-size:13px; font-weight:600; color:var(--slate); padding:6px 0; }
.cal .h small{ display:block; color:var(--muted); font-weight:400; font-size:11px; }
.cal .t{ font-size:12px; color:var(--muted); display:flex; align-items:center; justify-content:flex-end;
  padding-right:8px; }
.slot{ height:38px; border-radius:9px; font-size:12px; cursor:pointer; border:1px solid transparent;
  display:grid; place-items:center; transition:.13s; font-weight:600; }
.slot.free{ background:var(--green-bg); color:var(--green); }
.slot.free:hover{ background:#cfe7df; }
.slot.busy{ background:#F2EEE5; color:var(--muted); cursor:not-allowed; }
.slot.off{ background:transparent; cursor:default; }
.slot.sel{ background:var(--amber); color:var(--navy-deep); border-color:#cf831f; }

/* booking */
.book-grid{ display:grid; grid-template-columns:1fr 340px; gap:26px; align-items:start; }
.steps-bar{ display:flex; gap:8px; margin-bottom:26px; }
.steps-bar .s{ flex:1; height:5px; border-radius:4px; background:var(--line); }
.steps-bar .s.on{ background:var(--amber); }
.pay-opt{ display:flex; align-items:center; gap:14px; border:1px solid var(--line); border-radius:13px;
  padding:15px; cursor:pointer; transition:.15s; }
.pay-opt:hover{ border-color:var(--line-strong); }
.pay-opt.sel{ border-color:var(--amber); background:var(--amber-bg); }
.dur-opt{ flex:1; text-align:center; border:1px solid var(--line); border-radius:13px; padding:16px;
  cursor:pointer; transition:.15s; }
.dur-opt.sel{ border-color:var(--amber); background:var(--amber-bg); }

/* dashboard / lists */
.list-row{ display:flex; align-items:center; gap:16px; padding:16px 18px; border-bottom:1px solid var(--line); }
.list-row:last-child{ border-bottom:none; }
.kpi{ display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
.kpi .card{ padding:20px; }
.kpi .n{ font-family:'Fraunces'; font-size:32px; font-weight:600; margin:6px 0 2px; }
.kpi .ic{ width:38px; height:38px; border-radius:11px; display:grid; place-items:center; }

/* table */
.tbl{ width:100%; border-collapse:collapse; }
.tbl th{ text-align:left; font-size:12px; text-transform:uppercase; letter-spacing:.07em; color:var(--muted);
  font-weight:700; padding:12px 16px; border-bottom:1px solid var(--line); }
.tbl td{ padding:14px 16px; border-bottom:1px solid var(--line); font-size:14.5px; }
.tbl tr:last-child td{ border-bottom:none; }

/* modal */
.overlay{ position:fixed; inset:0; background:rgba(14,36,56,.45); backdrop-filter:blur(3px);
  display:grid; place-items:center; z-index:90; padding:24px; }
.modal{ background:#fff; border-radius:22px; width:100%; max-width:480px; padding:30px; }
.dropdown{ position:absolute; top:52px; right:0; width:330px; background:#fff; border:1px solid var(--line);
  border-radius:16px; box-shadow:0 30px 60px -30px rgba(22,50,79,.45); z-index:60; overflow:hidden; }

/* meet (lesson) */
.meet{ background:var(--navy-deep); border-radius:20px; aspect-ratio:16/9; position:relative; overflow:hidden;
  display:grid; place-items:center; }
.meet .tile{ position:absolute; border:2px solid rgba(255,255,255,.15); border-radius:14px; }
.meet-bar{ display:flex; gap:12px; justify-content:center; padding:16px; }
.meet-bar .mb{ width:50px; height:50px; border-radius:50%; display:grid; place-items:center; cursor:pointer; color:#fff; }

.footer{ background:var(--navy-deep); color:#aebac4; margin-top:60px; padding:46px 34px 30px; }
.footer .cols{ max-width:1180px; margin:0 auto; display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:30px; }
.footer b{ color:#fff; }
.footer a{ display:block; color:#aebac4; font-size:14px; padding:5px 0; cursor:pointer; }
.footer a:hover{ color:#fff; }

@media (max-width:880px){
  .hero-grid,.book-grid,.layout-2{ grid-template-columns:1fr; }
  .subj-grid,.steps,.kpi,.tutor-grid{ grid-template-columns:1fr 1fr; }
  .hero-card-stack{ display:none; }
  .navlinks{ display:none; }
}
`;

/* ============================ HELPERS ============================ */

function Stars({ n, size = 14 }) {
  return (
    <span className="stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} fill={i <= Math.round(n) ? "currentColor" : "none"}
          stroke="currentColor" strokeWidth={1.6} />
      ))}
    </span>
  );
}

function Avatar({ t, size = 54 }) {
  return (
    <div className="avatar" style={{ background: t.color, width: size, height: size, fontSize: size * 0.35 }}>
      {t.initials}
    </div>
  );
}

/* ============================ MAIN APP ============================ */

export default function TutorMatch() {
  const [role, setRole] = useState("gosc");
  const [view, setView] = useState("home");
  const [tutor, setTutor] = useState(null);
  const [wallet, setWallet] = useState(280);
  const [notifOpen, setNotifOpen] = useState(false);
  const [rateTarget, setRateTarget] = useState(null);

  // booking state
  const [bStep, setBStep] = useState(1);
  const [bSlot, setBSlot] = useState(null);
  const [bDur, setBDur] = useState(60);
  const [bPay, setBPay] = useState("portfel");

  // search filters
  const [fSubject, setFSubject] = useState("Wszystkie");
  const [fLevel, setFLevel] = useState("Wszystkie");
  const [fLang, setFLang] = useState("Wszystkie");
  const [fMax, setFMax] = useState(150);

  function go(v, opts = {}) {
    if (opts.tutor) setTutor(opts.tutor);
    if (v === "booking") { setBStep(1); setBSlot(null); setBDur(60); setBPay("portfel"); }
    setView(v);
    setNotifOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function switchRole(r) {
    setRole(r);
    setView(r === "korepetytor" ? "t-dash" : r === "admin" ? "a-dash" : "home");
    setNotifOpen(false);
    window.scrollTo({ top: 0 });
  }

  const price = useMemo(() => {
    if (!tutor) return 0;
    return Math.round((tutor.price * bDur) / 60);
  }, [tutor, bDur]);

  const filtered = useMemo(() => {
    return TUTORS.filter((t) =>
      (fSubject === "Wszystkie" || t.subjects.includes(fSubject)) &&
      (fLevel === "Wszystkie" || t.level.includes(fLevel)) &&
      (fLang === "Wszystkie" || t.langs.includes(fLang)) &&
      t.price <= fMax
    );
  }, [fSubject, fLevel, fLang, fMax]);

  /* ---------- NAV LINKS BY ROLE ---------- */
  const links = {
    gosc: [["home", "Strona główna"], ["search", "Znajdź korepetytora"]],
    uczen: [["home", "Strona główna"], ["search", "Znajdź korepetytora"], ["s-dash", "Moje lekcje"]],
    korepetytor: [["t-dash", "Pulpit"], ["t-cal", "Kalendarz"], ["t-earn", "Zarobki"]],
    admin: [["a-dash", "Pulpit"], ["a-users", "Użytkownicy"], ["a-mod", "Moderacja"], ["a-fin", "Finanse"]],
  }[role];

  return (
    <div className="tm">
      <style>{CSS}</style>

      {/* DEMO BAR */}
      <div className="demobar">
        <span className="dot" />
        <span>Przełącz rolę, aby zobaczyć różne widoki</span>
        <div className="roles">
          {[["gosc", "Gość"], ["uczen", "Uczeń"], ["korepetytor", "Korepetytor"], ["admin", "Administrator"]].map(([r, l]) => (
            <button key={r} className={role === r ? "active" : ""} onClick={() => switchRole(r)}>{l}</button>
          ))}
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="nav">
        <div className="brand" onClick={() => go(links[0][0])}>
          <div className="mark">TM</div>
          <b>Tutor<span>Match</span></b>
        </div>
        <div className="navlinks">
          {links.map(([v, l]) => (
            <a key={v} className={view === v ? "active" : ""} onClick={() => go(v)}>{l}</a>
          ))}
        </div>
        <div className="navright">
          {role === "uczen" && (
            <div className="wallet-pill"><Wallet size={16} /> {wallet} zł</div>
          )}
          {role !== "gosc" && (
            <div style={{ position: "relative" }}>
              <button className="iconbtn" onClick={() => setNotifOpen((o) => !o)}>
                <Bell size={18} />
                <span className="badge">2</span>
              </button>
              {notifOpen && (
                <div className="dropdown">
                  <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--line)", fontWeight: 600 }}>
                    Powiadomienia
                  </div>
                  {NOTIFICATIONS.map((n) => (
                    <div key={n.id} className="list-row" style={{ padding: "13px 16px", cursor: "pointer", background: n.unread ? "var(--amber-bg)" : "#fff" }}>
                      <div className="ic" style={{ width: 34, height: 34, borderRadius: 10, background: "#fff", display: "grid", placeItems: "center", color: "var(--navy)", flexShrink: 0, border: "1px solid var(--line)" }}>
                        <n.icon size={16} />
                      </div>
                      <div>
                        <div style={{ fontSize: 13.5, lineHeight: 1.35 }}>{n.text}</div>
                        <div className="muted" style={{ fontSize: 12 }}>{n.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {role === "gosc" ? (
            <>
              <button className="btn btn-ghost" onClick={() => switchRole("uczen")}>Zaloguj się</button>
              <button className="btn btn-primary" onClick={() => switchRole("uczen")}>Załóż konto</button>
            </>
          ) : (
            <div className="avatar-sm" style={{
              background: role === "korepetytor" ? "#2E8B6F" : role === "admin" ? "#7A5BA8" : "#16324F"
            }}>
              {role === "korepetytor" ? "MN" : role === "admin" ? "AD" : "JK"}
            </div>
          )}
        </div>
      </nav>

      {/* ROUTER */}
      {view === "home" && <Home go={go} setF={{ setFSubject }} />}
      {view === "search" && (
        <Search_ {...{ filtered, go, fSubject, setFSubject, fLevel, setFLevel, fLang, setFLang, fMax, setFMax }} />
      )}
      {view === "tutor" && tutor && <TutorProfile {...{ tutor, go, role }} />}
      {view === "booking" && tutor && (
        <Booking {...{ tutor, go, bStep, setBStep, bSlot, setBSlot, bDur, setBDur, bPay, setBPay, price, wallet, setWallet }} />
      )}
      {view === "lesson" && tutor && <Lesson {...{ tutor, go }} />}
      {view === "s-dash" && <StudentDash {...{ go, setRateTarget }} />}
      {view === "t-dash" && <TutorDash {...{ go }} />}
      {view === "t-cal" && <TutorCalendar />}
      {view === "t-earn" && <TutorEarnings />}
      {view === "a-dash" && <AdminDash {...{ go }} />}
      {view === "a-users" && <AdminUsers />}
      {view === "a-mod" && <AdminMod />}
      {view === "a-fin" && <AdminFinance />}

      {/* RATING MODAL */}
      {rateTarget && <RateModal target={rateTarget} onClose={() => setRateTarget(null)} />}

      <Footer />
    </div>
  );
}

/* ============================ PAGES ============================ */

function Home({ go, setF }) {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="wrap" style={{ paddingTop: 56, paddingBottom: 30 }}>
          <div className="hero-grid">
            <div className="rise">
              <span className="eyebrow">Korepetycje online · cała Polska</span>
              <h1 style={{ marginTop: 14, color: "var(--navy)" }}>
                Znajdź korepetytora,<br /> który <em>do Ciebie pasuje</em>
              </h1>
              <p className="lead">
                Tysiące zweryfikowanych korepetytorów. Rezerwuj lekcje, płać bezpiecznie
                i ucz się online — kiedy i gdzie chcesz.
              </p>
              <div className="searchbar">
                <div className="field">
                  <Search size={18} className="muted" />
                  <input placeholder="Czego chcesz się uczyć? np. matematyka, angielski…" />
                </div>
                <button className="btn btn-primary" onClick={() => go("search")}>Szukaj</button>
              </div>
              <div className="stat-row">
                <div><div className="n">5 200+</div><div className="l">korepetytorów</div></div>
                <div><div className="n">98%</div><div className="l">zadowolonych uczniów</div></div>
                <div><div className="n">4,9</div><div className="l">średnia ocena</div></div>
              </div>
            </div>

            {/* floating cards */}
            <div className="hero-card-stack rise" style={{ animationDelay: ".12s" }}>
              <div className="blob" style={{ width: 200, height: 200, background: "var(--amber-soft)", top: 20, right: 30 }} />
              <div className="blob" style={{ width: 160, height: 160, background: "#cfe7df", bottom: 0, left: 10 }} />
              <div className="float-card" style={{ top: 10, right: 0, width: 250 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <Avatar t={TUTORS[2]} size={46} />
                  <div>
                    <div style={{ fontWeight: 600 }}>{TUTORS[2].name}</div>
                    <div className="muted" style={{ fontSize: 13 }}>Język angielski</div>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, alignItems: "center" }}>
                  <Stars n={5} /><span style={{ fontWeight: 600 }}>70 zł/h</span>
                </div>
              </div>
              <div className="float-card" style={{ top: 150, left: 0, width: 230 }}>
                <div className="verified" style={{ marginBottom: 10 }}><ShieldCheck size={13} /> Tożsamość zweryfikowana</div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <Avatar t={TUTORS[0]} size={42} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{TUTORS[0].name}</div>
                    <div className="muted" style={{ fontSize: 13 }}>Matematyka · Fizyka</div>
                  </div>
                </div>
              </div>
              <div className="float-card" style={{ bottom: 0, right: 40, width: 210, display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, background: "var(--green-bg)", display: "grid", placeItems: "center", color: "var(--green)" }}>
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>Lekcja opłacona</div>
                  <div className="muted" style={{ fontSize: 12.5 }}>Środki w depozycie</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUBJECTS */}
      <section className="wrap" style={{ paddingTop: 20 }}>
        <h2 style={{ fontSize: 30, fontWeight: 600 }}>Popularne przedmioty</h2>
        <p className="muted" style={{ margin: "8px 0 24px" }}>Wybierz dziedzinę i przeglądaj korepetytorów</p>
        <div className="subj-grid">
          {SUBJECTS.map((s) => (
            <div key={s.name} className="subj" onClick={() => { setF.setFSubject(s.name); go("search"); }}>
              <div className="ic">{s.icon}</div>
              <div style={{ fontWeight: 600 }}>{s.name}</div>
              <div className="muted" style={{ fontSize: 13, marginTop: 2 }}>{s.count} korepetytorów</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="wrap" style={{ paddingTop: 40 }}>
        <h2 style={{ fontSize: 30, fontWeight: 600, marginBottom: 24 }}>Jak to działa?</h2>
        <div className="steps">
          {[
            ["Znajdź korepetytora", "Filtruj po przedmiocie, poziomie, cenie i dostępności.", Search],
            ["Zarezerwuj termin", "Wybierz dogodny slot w kalendarzu i długość lekcji.", CalendarDays],
            ["Zapłać bezpiecznie", "Środki trafiają do depozytu — uwalniane po lekcji.", CreditCard],
            ["Ucz się i oceniaj", "Lekcja w Google Meet, potem wystawiasz ocenę.", Video],
          ].map(([t, d, Icon], i) => (
            <div key={t} className="card step rise" style={{ padding: 22, animationDelay: `${i * 0.07}s` }}>
              <div className="num">{i + 1}</div>
              <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>{t}</div>
              <div className="muted" style={{ fontSize: 14, lineHeight: 1.5 }}>{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED TUTORS */}
      <section className="wrap" style={{ paddingTop: 40 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 24 }}>
          <h2 style={{ fontSize: 30, fontWeight: 600, color: "var(--navy)" }}>Polecani korepetytorzy</h2>
          <a className="muted" style={{ cursor: "pointer", fontWeight: 600 }} onClick={() => go("search")}>
            Zobacz wszystkich <ChevronRight size={14} style={{ verticalAlign: "middle" }} />
          </a>
        </div>
        <div className="tutor-grid">
          {TUTORS.slice(0, 3).map((t) => <TutorCard key={t.id} t={t} go={go} />)}
        </div>
      </section>
    </>
  );
}

function TutorCard({ t, go }) {
  return (
    <div className="tutor-card" onClick={() => go("tutor", { tutor: t })}>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <Avatar t={t} />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontWeight: 600, fontSize: 16.5 }}>{t.name}</span>
            {t.verified && <ShieldCheck size={15} color="var(--green)" />}
          </div>
          <div className="muted" style={{ fontSize: 13.5, marginTop: 2 }}>{t.subjects.join(" · ")}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
            <Stars n={t.rating} size={13} />
            <span style={{ fontWeight: 600, fontSize: 13.5 }}>{t.rating.toFixed(1)}</span>
            <span className="muted" style={{ fontSize: 13 }}>({t.reviews})</span>
          </div>
        </div>
      </div>
      <p className="muted" style={{ fontSize: 14, lineHeight: 1.5, margin: "14px 0", flex: 1 }}>
        {t.bio.slice(0, 90)}…
      </p>
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {t.tags.slice(0, 2).map((tag) => <span key={tag} className="tag">{tag}</span>)}
        <span className="tag grey"><Languages size={11} style={{ verticalAlign: "-1px" }} /> {t.langs.join(", ")}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--line)", paddingTop: 14 }}>
        <div><span style={{ fontFamily: "Fraunces", fontSize: 22, fontWeight: 600 }}>{t.price} zł</span><span className="muted" style={{ fontSize: 13 }}>/h</span></div>
        <button className="btn btn-navy" style={{ padding: "9px 16px" }}>Zobacz profil</button>
      </div>
    </div>
  );
}

function Search_({ filtered, go, fSubject, setFSubject, fLevel, setFLevel, fLang, setFLang, fMax, setFMax }) {
  const SubjList = ["Wszystkie", ...SUBJECTS.map((s) => s.name)];
  const LevelList = ["Wszystkie", "Szkoła podstawowa", "Liceum", "Studia"];
  const LangList = ["Wszystkie", "PL", "EN", "DE"];
  return (
    <div className="wrap">
      <h1 style={{ fontSize: 34, fontWeight: 600, color: "var(--navy)" }}>Korepetytorzy</h1>
      <p className="muted" style={{ margin: "6px 0 24px" }}>Znaleziono {filtered.length} korepetytorów spełniających kryteria</p>
      <div className="layout-2">
        {/* FILTERS */}
        <div className="card filter-card">
          <div className="filter-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontWeight: 600 }}>Filtry</span>
            <a className="muted" style={{ fontSize: 13, cursor: "pointer" }}
              onClick={() => { setFSubject("Wszystkie"); setFLevel("Wszystkie"); setFLang("Wszystkie"); setFMax(150); }}>
              Wyczyść
            </a>
          </div>
          <div className="filter-group">
            <h4>Przedmiot</h4>
            {SubjList.map((s) => (
              <label key={s} className="check">
                <input type="radio" name="subj" checked={fSubject === s} onChange={() => setFSubject(s)} /> {s}
              </label>
            ))}
          </div>
          <div className="filter-group">
            <h4>Poziom</h4>
            {LevelList.map((l) => (
              <label key={l} className="check">
                <input type="radio" name="lvl" checked={fLevel === l} onChange={() => setFLevel(l)} /> {l}
              </label>
            ))}
          </div>
          <div className="filter-group">
            <h4>Język zajęć</h4>
            {LangList.map((l) => (
              <label key={l} className="check">
                <input type="radio" name="lang" checked={fLang === l} onChange={() => setFLang(l)} /> {l === "Wszystkie" ? l : l}
              </label>
            ))}
          </div>
          <div className="filter-group">
            <h4>Cena maksymalna: {fMax} zł/h</h4>
            <input className="range" type="range" min="40" max="150" step="5" value={fMax} onChange={(e) => setFMax(+e.target.value)} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }} className="muted">
              <span>40 zł</span><span>150 zł</span>
            </div>
          </div>
        </div>

        {/* RESULTS */}
        <div className="tutor-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {filtered.length === 0 && (
            <div className="card" style={{ padding: 40, gridColumn: "1/-1", textAlign: "center" }}>
              <div className="muted">Brak korepetytorów dla wybranych filtrów. Spróbuj je poluzować.</div>
            </div>
          )}
          {filtered.map((t) => <TutorCard key={t.id} t={t} go={go} />)}
        </div>
      </div>
    </div>
  );
}

function TutorProfile({ tutor, go, role }) {
  return (
    <div className="wrap">
      <a className="muted" style={{ cursor: "pointer", fontSize: 14, display: "inline-flex", alignItems: "center", gap: 5 }} onClick={() => go("search")}>
        <ArrowLeft size={15} /> Wróć do wyszukiwania
      </a>
      <div className="layout-2" style={{ marginTop: 18, gridTemplateColumns: "1fr 320px" }}>
        <div>
          {/* HEADER */}
          <div className="card" style={{ padding: 26 }}>
            <div style={{ display: "flex", gap: 20 }}>
              <Avatar t={tutor} size={84} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <h1 style={{ fontSize: 28, fontWeight: 600 }}>{tutor.name}</h1>
                  {tutor.verified && <span className="verified"><ShieldCheck size={13} /> Zweryfikowany</span>}
                </div>
                <div className="muted" style={{ marginTop: 4 }}>{tutor.edu}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                  <Stars n={tutor.rating} />
                  <b>{tutor.rating.toFixed(1)}</b>
                  <span className="muted">· {tutor.reviews} opinii · {tutor.lessons} lekcji</span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 7, marginTop: 18, flexWrap: "wrap" }}>
              {tutor.subjects.map((s) => <span key={s} className="tag">{s}</span>)}
              <span className="tag grey">{tutor.level}</span>
              <span className="tag grey"><Languages size={11} style={{ verticalAlign: "-1px" }} /> {tutor.langs.join(", ")}</span>
            </div>
          </div>

          {/* BIO */}
          <div className="card" style={{ padding: 26, marginTop: 18 }}>
            <h3 style={{ fontSize: 19, marginBottom: 10 }}>O mnie</h3>
            <p style={{ color: "var(--slate)", lineHeight: 1.65 }}>{tutor.bio}</p>
            <div style={{ display: "flex", gap: 6, marginTop: 16, flexWrap: "wrap" }}>
              {tutor.tags.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>

          {/* AVAILABILITY */}
          <div className="card" style={{ padding: 26, marginTop: 18 }}>
            <h3 style={{ fontSize: 19, marginBottom: 4 }}>Dostępność w tym tygodniu</h3>
            <p className="muted" style={{ fontSize: 13.5, marginBottom: 16 }}>
              <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, background: "var(--green-bg)", border: "1px solid var(--green)", verticalAlign: "middle" }} /> wolne &nbsp;
              <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, background: "#F2EEE5", verticalAlign: "middle" }} /> zajęte
            </p>
            <MiniCal />
          </div>

          {/* REVIEWS */}
          <div className="card" style={{ padding: 26, marginTop: 18 }}>
            <h3 style={{ fontSize: 19, marginBottom: 16 }}>Opinie uczniów ({tutor.reviews})</h3>
            {REVIEWS.map((r, i) => (
              <div key={i} style={{ padding: "16px 0", borderTop: i ? "1px solid var(--line)" : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <b>{r.author}</b>
                  <span className="muted" style={{ fontSize: 13 }}>{r.date}</span>
                </div>
                <Stars n={r.rating} size={13} />
                <p style={{ color: "var(--slate)", marginTop: 6, lineHeight: 1.5 }}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* BOOKING SIDEBAR */}
        <div className="card" style={{ padding: 24, position: "sticky", top: 90 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <span style={{ fontFamily: "Fraunces", fontSize: 34, fontWeight: 600 }}>{tutor.price} zł</span>
            <span className="muted">/ godzina</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9, margin: "18px 0", fontSize: 14, color: "var(--slate)" }}>
            <div style={{ display: "flex", gap: 8 }}><Video size={17} color="var(--navy)" /> Lekcje w Google Meet</div>
            <div style={{ display: "flex", gap: 8 }}><Clock size={17} color="var(--navy)" /> 45 / 60 / 90 minut</div>
            <div style={{ display: "flex", gap: 8 }}><ShieldCheck size={17} color="var(--green)" /> Płatność w depozycie</div>
          </div>
          {role === "gosc" ? (
            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => go("booking", { tutor })}>
              Zarezerwuj lekcję
            </button>
          ) : (
            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => go("booking", { tutor })}>
              <Calendar size={17} /> Wybierz termin
            </button>
          )}
          <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center", marginTop: 10 }}>
            <Heart size={16} /> Zapisz korepetytora
          </button>
          <p className="muted" style={{ fontSize: 12.5, textAlign: "center", marginTop: 14, lineHeight: 1.4 }}>
            Bez zobowiązań. Bezpłatne anulowanie do 24h przed lekcją.
          </p>
        </div>
      </div>
    </div>
  );
}

function MiniCal({ onPick, selected }) {
  return (
    <div className="cal">
      <div className="h" />
      {DAYS.map((d, i) => (
        <div key={d} className="h">{d}<small>{9 + i} cze</small></div>
      ))}
      {SLOTS.map((time, r) => (
        <React.Fragment key={time}>
          <div className="t">{time}</div>
          {DAYS.map((d, c) => {
            const v = AVAIL[r][c];
            const key = `${r}-${c}`;
            const cls = v === 1 ? "free" : v === 2 ? "busy" : "off";
            const isSel = selected === key;
            return (
              <div key={c}
                className={`slot ${cls} ${isSel ? "sel" : ""}`}
                onClick={() => v === 1 && onPick && onPick(key, { time, day: d, date: `${9 + c} cze` })}>
                {v === 1 ? (isSel ? "✓" : "") : v === 2 ? "·" : ""}
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
}

function Booking({ tutor, go, bStep, setBStep, bSlot, setBSlot, bDur, setBDur, bPay, setBPay, price, wallet, setWallet }) {
  function confirm() {
    if (bPay === "portfel") setWallet((w) => Math.max(0, w - price));
    setBStep(4);
  }
  return (
    <div className="wrap" style={{ maxWidth: 980 }}>
      <a className="muted" style={{ cursor: "pointer", fontSize: 14, display: "inline-flex", alignItems: "center", gap: 5 }} onClick={() => go("tutor", { tutor })}>
        <ArrowLeft size={15} /> Wróć do profilu
      </a>
      <h1 style={{ fontSize: 32, fontWeight: 600, margin: "14px 0 20px" }}>Rezerwacja lekcji</h1>

      <div className="steps-bar">
        {[1, 2, 3, 4].map((s) => <div key={s} className={`s ${bStep >= s ? "on" : ""}`} />)}
      </div>

      {bStep === 4 ? (
        <div className="card" style={{ padding: 50, textAlign: "center" }}>
          <div style={{ width: 72, height: 72, borderRadius: 22, background: "var(--green-bg)", color: "var(--green)", display: "grid", placeItems: "center", margin: "0 auto 18px" }}>
            <CheckCircle2 size={40} />
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 600 }}>Lekcja zarezerwowana!</h2>
          <p className="muted" style={{ margin: "10px 0 6px", fontSize: 15 }}>
            {tutor.name} · {bSlot?.day}, {bSlot?.date}, {bSlot?.time} · {bDur} min
          </p>
          <p className="muted" style={{ fontSize: 14 }}>
            Potwierdzenie wysłaliśmy na e-mail. Przypomnimy 24h i 1h przed lekcją.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 26 }}>
            <button className="btn btn-ghost" onClick={() => go("s-dash")}>Moje lekcje</button>
            <button className="btn btn-primary" onClick={() => go("lesson", { tutor })}>
              <Video size={17} /> Dołącz do lekcji (demo)
            </button>
          </div>
        </div>
      ) : (
        <div className="book-grid">
          <div className="card" style={{ padding: 26 }}>
            {bStep === 1 && (
              <>
                <h3 style={{ fontSize: 19, marginBottom: 4 }}>1. Wybierz termin</h3>
                <p className="muted" style={{ fontSize: 13.5, marginBottom: 18 }}>Kliknij wolny slot w kalendarzu dostępności</p>
                <MiniCal selected={bSlot?.key} onPick={(key, info) => setBSlot({ key, ...info })} />
              </>
            )}
            {bStep === 2 && (
              <>
                <h3 style={{ fontSize: 19, marginBottom: 18 }}>2. Długość lekcji</h3>
                <div style={{ display: "flex", gap: 12 }}>
                  {[45, 60, 90].map((d) => (
                    <div key={d} className={`dur-opt ${bDur === d ? "sel" : ""}`} onClick={() => setBDur(d)}>
                      <div style={{ fontFamily: "Fraunces", fontSize: 26, fontWeight: 600 }}>{d}</div>
                      <div className="muted" style={{ fontSize: 13 }}>minut</div>
                      <div style={{ fontWeight: 600, marginTop: 6 }}>{Math.round((tutor.price * d) / 60)} zł</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 22, padding: 16, background: "var(--cream)", borderRadius: 13, fontSize: 14, color: "var(--slate)", display: "flex", gap: 10 }}>
                  <MessageSquare size={18} color="var(--navy)" style={{ flexShrink: 0 }} />
                  Lekcja odbędzie się przez Google Meet — link otrzymasz w przypomnieniu.
                </div>
              </>
            )}
            {bStep === 3 && (
              <>
                <h3 style={{ fontSize: 19, marginBottom: 18 }}>3. Metoda płatności</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    ["portfel", "Portfel TutorMatch", `Saldo: ${wallet} zł`, Wallet],
                    ["p24", "Przelewy24", "BLIK, przelew, karta", Banknote],
                    ["stripe", "Karta (Stripe)", "Visa / Mastercard", CreditCard],
                  ].map(([id, t, d, Icon]) => (
                    <div key={id} className={`pay-opt ${bPay === id ? "sel" : ""}`} onClick={() => setBPay(id)}>
                      <Icon size={22} color="var(--navy)" />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600 }}>{t}</div>
                        <div className="muted" style={{ fontSize: 13 }}>{d}</div>
                      </div>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid var(--line-strong)", display: "grid", placeItems: "center" }}>
                        {bPay === id && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--amber)" }} />}
                      </div>
                    </div>
                  ))}
                </div>
                {bPay === "portfel" && wallet < price && (
                  <div style={{ marginTop: 14, padding: 12, background: "var(--red-bg)", color: "var(--red)", borderRadius: 11, fontSize: 13.5 }}>
                    Niewystarczające saldo portfela — wybierz inną metodę.
                  </div>
                )}
              </>
            )}

            {/* nav buttons */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 26 }}>
              {bStep > 1
                ? <button className="btn btn-ghost" onClick={() => setBStep(bStep - 1)}><ArrowLeft size={16} /> Wstecz</button>
                : <span />}
              {bStep < 3 && (
                <button className="btn btn-navy" disabled={bStep === 1 && !bSlot} onClick={() => setBStep(bStep + 1)}>
                  Dalej <ArrowRight size={16} />
                </button>
              )}
              {bStep === 3 && (
                <button className="btn btn-primary" disabled={bPay === "portfel" && wallet < price} onClick={confirm}>
                  Zapłać {price} zł
                </button>
              )}
            </div>
          </div>

          {/* SUMMARY */}
          <div className="card" style={{ padding: 22, position: "sticky", top: 90 }}>
            <h4 style={{ fontSize: 16, marginBottom: 16 }}>Podsumowanie</h4>
            <div style={{ display: "flex", gap: 12, alignItems: "center", paddingBottom: 16, borderBottom: "1px solid var(--line)" }}>
              <Avatar t={tutor} size={46} />
              <div>
                <div style={{ fontWeight: 600 }}>{tutor.name}</div>
                <div className="muted" style={{ fontSize: 13 }}>{tutor.subjects[0]}</div>
              </div>
            </div>
            <div style={{ padding: "16px 0", fontSize: 14, display: "flex", flexDirection: "column", gap: 10, color: "var(--slate)" }}>
              <Row k="Termin" v={bSlot ? `${bSlot.day}, ${bSlot.date}` : "—"} />
              <Row k="Godzina" v={bSlot ? bSlot.time : "—"} />
              <Row k="Długość" v={`${bDur} min`} />
              <Row k="Stawka" v={`${tutor.price} zł/h`} />
            </div>
            <div style={{ borderTop: "1px solid var(--line)", paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 600 }}>Razem</span>
              <span style={{ fontFamily: "Fraunces", fontSize: 24, fontWeight: 600 }}>{price} zł</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ k, v }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span className="muted">{k}</span><span style={{ fontWeight: 500, color: "var(--navy)" }}>{v}</span>
    </div>
  );
}

function Lesson({ tutor, go }) {
  return (
    <div className="wrap" style={{ maxWidth: 900 }}>
      <h1 style={{ fontSize: 26, fontWeight: 600, marginBottom: 4 }}>Lekcja na żywo</h1>
      <p className="muted" style={{ marginBottom: 18 }}>{tutor.subjects[0]} z {tutor.name} · symulacja Google Meet</p>
      <div className="meet">
        <div className="tile" style={{ inset: "12px", background: "#13314a" }} />
        <div style={{ textAlign: "center", color: "#fff", zIndex: 2 }}>
          <Avatar t={tutor} size={90} />
          <div style={{ marginTop: 14, fontSize: 18, fontWeight: 600 }}>{tutor.name}</div>
          <div style={{ color: "#9fb0bd", fontSize: 14 }}>łączenie…</div>
        </div>
        <div style={{ position: "absolute", bottom: 16, right: 16, width: 150, height: 100, borderRadius: 12, background: "#0a1a28", border: "2px solid rgba(255,255,255,.15)", display: "grid", placeItems: "center", color: "#fff", fontSize: 13 }}>
          Ty
        </div>
        <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(0,0,0,.4)", color: "#fff", padding: "5px 12px", borderRadius: 20, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#e35", display: "inline-block" }} /> 00:00
        </div>
      </div>
      <div className="meet-bar">
        {[
          ["#2a3f52", Video], ["#2a3f52", MessageSquare], ["#2a3f52", FileText],
        ].map(([bg, Icon], i) => (
          <div key={i} className="mb" style={{ background: bg }}><Icon size={20} /></div>
        ))}
        <div className="mb" style={{ background: "#c0584c" }} onClick={() => go("s-dash")}><X size={22} /></div>
      </div>
      <p className="muted" style={{ textAlign: "center", fontSize: 13 }}>
        W rzeczywistym systemie tu osadzony byłby Google Meet z udostępnianiem ekranu i plików.
      </p>
    </div>
  );
}

function StudentDash({ go, setRateTarget }) {
  return (
    <div className="wrap">
      <h1 style={{ fontSize: 32, fontWeight: 600 }}>Cześć, Jędrzej 👋</h1>
      <p className="muted" style={{ margin: "6px 0 24px" }}>Oto Twoje nadchodzące lekcje i historia zajęć</p>

      <div className="kpi" style={{ marginBottom: 26 }}>
        {[
          ["Nadchodzące lekcje", "2", Calendar, "var(--navy)", "var(--amber-bg)"],
          ["Saldo portfela", "280 zł", Wallet, "var(--green)", "var(--green-bg)"],
          ["Odbyte lekcje", "23", CheckCircle2, "var(--navy)", "#F2EEE5"],
          ["Ulubieni korepetytorzy", "4", Heart, "var(--red)", "var(--red-bg)"],
        ].map(([l, n, Icon, col, bg]) => (
          <div key={l} className="card">
            <div className="ic" style={{ background: bg, color: col }}><Icon size={19} /></div>
            <div className="n">{n}</div>
            <div className="muted" style={{ fontSize: 13.5 }}>{l}</div>
          </div>
        ))}
      </div>

      <div className="layout-2" style={{ gridTemplateColumns: "1.4fr 1fr" }}>
        <div className="card">
          <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: 18 }}>Nadchodzące lekcje</h3>
            <button className="btn btn-primary" style={{ padding: "8px 14px", fontSize: 13.5 }} onClick={() => go("search")}>
              <Plus size={15} /> Nowa lekcja
            </button>
          </div>
          {STUDENT_UPCOMING.map((l) => (
            <div key={l.id} className="list-row">
              <Avatar t={l.tutor} size={46} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{l.subject} · {l.tutor.name}</div>
                <div className="muted" style={{ fontSize: 13.5 }}>{l.day}, {l.date} · {l.time} · {l.dur} min</div>
              </div>
              <span className="verified"><Check size={12} /> {l.status}</span>
              <button className="btn btn-navy" style={{ padding: "8px 14px", fontSize: 13.5 }} onClick={() => go("lesson", { tutor: l.tutor })}>
                <Video size={15} /> Dołącz
              </button>
            </div>
          ))}
        </div>

        <div className="card">
          <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--line)" }}>
            <h3 style={{ fontSize: 18 }}>Historia zajęć</h3>
          </div>
          {STUDENT_HISTORY.map((l) => (
            <div key={l.id} className="list-row">
              <Avatar t={l.tutor} size={40} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14.5 }}>{l.subject}</div>
                <div className="muted" style={{ fontSize: 13 }}>{l.tutor.name} · {l.date}</div>
              </div>
              {l.rated
                ? <Stars n={l.myRating} size={13} />
                : <button className="btn btn-ghost" style={{ padding: "7px 12px", fontSize: 13 }} onClick={() => setRateTarget(l)}>
                    <Star size={13} /> Oceń
                  </button>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RateModal({ target, onClose }) {
  const [stars, setStars] = useState(0);
  const [done, setDone] = useState(false);
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {done ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <CheckCircle2 size={48} color="var(--green)" />
            <h3 style={{ fontSize: 20, margin: "12px 0 6px" }}>Dziękujemy za opinię!</h3>
            <p className="muted">Pomaga ona innym uczniom w wyborze.</p>
            <button className="btn btn-primary" style={{ marginTop: 18 }} onClick={onClose}>Zamknij</button>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <h3 style={{ fontSize: 21 }}>Oceń lekcję</h3>
              <button className="iconbtn" style={{ width: 34, height: 34 }} onClick={onClose}><X size={16} /></button>
            </div>
            <p className="muted" style={{ marginBottom: 18 }}>{target.subject} z {target.tutor.name} · {target.date}</p>
            <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 18 }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={38} style={{ cursor: "pointer" }}
                  fill={i <= stars ? "var(--amber)" : "none"} color="var(--amber)" strokeWidth={1.4}
                  onClick={() => setStars(i)} />
              ))}
            </div>
            <textarea placeholder="Napisz komentarz (opcjonalnie)…" rows={4}
              style={{ width: "100%", border: "1px solid var(--line-strong)", borderRadius: 12, padding: 14, fontFamily: "inherit", fontSize: 14, resize: "none", outline: "none" }} />
            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 16 }}
              disabled={stars === 0} onClick={() => setDone(true)}>
              Wyślij ocenę
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------- TUTOR ROLE VIEWS ---------------- */

function TutorDash({ go }) {
  return (
    <div className="wrap">
      <h1 style={{ fontSize: 32, fontWeight: 600 }}>Pulpit korepetytora</h1>
      <p className="muted" style={{ margin: "6px 0 24px" }}>Marek Nowak · Informatyka, Matematyka</p>
      <div className="kpi" style={{ marginBottom: 26 }}>
        {[
          ["Zarobki w tym miesiącu", "2 840 zł", TrendingUp, "var(--green)", "var(--green-bg)"],
          ["Lekcje w tym tygodniu", "11", Calendar, "var(--navy)", "var(--amber-bg)"],
          ["Średnia ocena", "4,8", Star, "var(--amber)", "var(--amber-bg)"],
          ["Aktywni uczniowie", "18", Users, "var(--navy)", "#F2EEE5"],
        ].map(([l, n, Icon, col, bg]) => (
          <div key={l} className="card">
            <div className="ic" style={{ background: bg, color: col }}><Icon size={19} /></div>
            <div className="n">{n}</div>
            <div className="muted" style={{ fontSize: 13.5 }}>{l}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: 18 }}>Dzisiejszy harmonogram</h3>
          <button className="btn btn-ghost" style={{ padding: "8px 14px", fontSize: 13.5 }} onClick={() => go("t-cal")}>
            <Calendar size={15} /> Zarządzaj kalendarzem
          </button>
        </div>
        {[
          ["14:00", "Algorytmy · Kacper M.", "60 min", "za 2 godz."],
          ["16:00", "Python podstawy · Ola W.", "90 min", "za 4 godz."],
          ["19:00", "Matematyka dyskretna · Bartek L.", "60 min", "wieczorem"],
        ].map(([t, s, d, w], i) => (
          <div key={i} className="list-row">
            <div style={{ width: 64, fontFamily: "Fraunces", fontWeight: 600, fontSize: 18 }}>{t}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{s}</div>
              <div className="muted" style={{ fontSize: 13 }}>{d} · {w}</div>
            </div>
            <button className="btn btn-navy" style={{ padding: "8px 14px", fontSize: 13.5 }}><Video size={15} /> Rozpocznij</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function TutorCalendar() {
  return (
    <div className="wrap">
      <h1 style={{ fontSize: 32, fontWeight: 600 }}>Kalendarz dostępności</h1>
      <p className="muted" style={{ margin: "6px 0 24px" }}>Kliknij slot, aby oznaczyć go jako dostępny lub niedostępny dla uczniów</p>
      <div className="card" style={{ padding: 26 }}>
        <EditableCal />
      </div>
    </div>
  );
}

function EditableCal() {
  const [grid, setGrid] = useState(AVAIL.map((r) => [...r]));
  function toggle(r, c) {
    setGrid((g) => g.map((row, ri) => ri === r ? row.map((v, ci) => ci === c ? (v === 2 ? 2 : v === 1 ? 0 : 1) : v) : row));
  }
  return (
    <>
      <p className="muted" style={{ fontSize: 13.5, marginBottom: 16 }}>
        <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, background: "var(--green-bg)", border: "1px solid var(--green)", verticalAlign: "middle" }} /> dostępny &nbsp;
        <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, background: "#F2EEE5", verticalAlign: "middle" }} /> zarezerwowany przez ucznia
      </p>
      <div className="cal">
        <div className="h" />
        {DAYS.map((d, i) => <div key={d} className="h">{d}<small>{9 + i} cze</small></div>)}
        {SLOTS.map((time, r) => (
          <React.Fragment key={time}>
            <div className="t">{time}</div>
            {DAYS.map((d, c) => {
              const v = grid[r][c];
              const cls = v === 1 ? "free" : v === 2 ? "busy" : "off";
              return (
                <div key={c} className={`slot ${cls}`} style={{ border: v === 0 ? "1px dashed var(--line-strong)" : undefined }}
                  onClick={() => v !== 2 && toggle(r, c)}>
                  {v === 1 ? <Check size={14} /> : v === 2 ? "·" : ""}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

function TutorEarnings() {
  const bars = [42, 55, 38, 61, 72, 58, 80, 65];
  return (
    <div className="wrap">
      <h1 style={{ fontSize: 32, fontWeight: 600 }}>Zarobki</h1>
      <p className="muted" style={{ margin: "6px 0 24px" }}>Podgląd wynagrodzeń i wypłat. Prowizja platformy: 15%</p>
      <div className="kpi" style={{ marginBottom: 26 }}>
        {[
          ["Dostępne do wypłaty", "1 920 zł", Wallet, "var(--green)", "var(--green-bg)"],
          ["W depozycie (lekcje opłacone)", "640 zł", ShieldCheck, "var(--navy)", "var(--amber-bg)"],
          ["Wypłacono w 2025", "18 450 zł", TrendingUp, "var(--navy)", "#F2EEE5"],
          ["Prowizja platformy", "15%", FileText, "var(--slate)", "#F2EEE5"],
        ].map(([l, n, Icon, col, bg]) => (
          <div key={l} className="card">
            <div className="ic" style={{ background: bg, color: col }}><Icon size={19} /></div>
            <div className="n" style={{ fontSize: 26 }}>{n}</div>
            <div className="muted" style={{ fontSize: 13 }}>{l}</div>
          </div>
        ))}
      </div>
      <div className="layout-2" style={{ gridTemplateColumns: "1.5fr 1fr" }}>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 18, marginBottom: 20 }}>Przychód miesięczny</h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 180 }}>
            {bars.map((h, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ width: "100%", height: `${h}%`, background: i === bars.length - 1 ? "var(--amber)" : "var(--navy)", borderRadius: "7px 7px 0 0", transition: "height .5s" }} />
                <span className="muted" style={{ fontSize: 11 }}>{["Lis", "Gru", "Sty", "Lut", "Mar", "Kwi", "Maj", "Cze"][i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ padding: 24, display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
          <Banknote size={34} color="var(--green)" style={{ margin: "0 auto" }} />
          <h3 style={{ fontSize: 20, margin: "12px 0 4px" }}>Wypłać środki</h3>
          <p className="muted" style={{ fontSize: 14, marginBottom: 18 }}>Na konto bankowe w 1–2 dni robocze</p>
          <button className="btn btn-primary" style={{ justifyContent: "center" }}>Wypłać 1 920 zł</button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- ADMIN ROLE VIEWS ---------------- */

function AdminDash() {
  return (
    <div className="wrap">
      <h1 style={{ fontSize: 32, fontWeight: 600 }}>Panel administracyjny</h1>
      <p className="muted" style={{ margin: "6px 0 24px" }}>Przegląd kondycji platformy TutorMatch</p>
      <div className="kpi" style={{ marginBottom: 26 }}>
        {[
          ["Użytkownicy", "14 280", Users, "var(--navy)", "var(--amber-bg)"],
          ["Lekcje (ten mies.)", "3 612", Calendar, "var(--navy)", "#F2EEE5"],
          ["Przychód z prowizji", "48 900 zł", TrendingUp, "var(--green)", "var(--green-bg)"],
          ["Oczekujące weryfikacje", "7", ShieldAlert, "var(--red)", "var(--red-bg)"],
        ].map(([l, n, Icon, col, bg]) => (
          <div key={l} className="card">
            <div className="ic" style={{ background: bg, color: col }}><Icon size={19} /></div>
            <div className="n" style={{ fontSize: 28 }}>{n}</div>
            <div className="muted" style={{ fontSize: 13.5 }}>{l}</div>
          </div>
        ))}
      </div>
      <div className="layout-2" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div className="card">
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--line)" }}><h3 style={{ fontSize: 17 }}>Ostatnie zgłoszenia</h3></div>
          {[
            ["Spór finansowy", "Lekcja nie odbyła się — zwrot", AlertTriangle, "var(--red)"],
            ["Zgłoszona opinia", "Wulgarny komentarz", MessageSquare, "var(--amber)"],
            ["Weryfikacja KYC", "Korepetytor: K. Lewandowska", ShieldAlert, "var(--navy)"],
          ].map(([t, d, Icon, col], i) => (
            <div key={i} className="list-row" style={{ padding: "14px 20px" }}>
              <Icon size={20} color={col} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14.5 }}>{t}</div>
                <div className="muted" style={{ fontSize: 13 }}>{d}</div>
              </div>
              <ChevronRight size={16} className="muted" />
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 17, marginBottom: 18 }}>Nowi użytkownicy (7 dni)</h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 150 }}>
            {[30, 48, 35, 60, 52, 70, 64].map((h, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ width: "100%", height: `${h}%`, background: "var(--amber)", borderRadius: "6px 6px 0 0" }} />
                <span className="muted" style={{ fontSize: 11 }}>{DAYS[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminUsers() {
  const rows = [
    ["Anna Kowalska", "Korepetytor", "Aktywny", "var(--green)"],
    ["Jędrzej Kostyk", "Uczeń", "Aktywny", "var(--green)"],
    ["Katarzyna Lewandowska", "Korepetytor", "Weryfikacja", "var(--amber)"],
    ["Marek Nowak", "Korepetytor", "Aktywny", "var(--green)"],
    ["Spam Bot 01", "Uczeń", "Zablokowany", "var(--red)"],
  ];
  return (
    <div className="wrap">
      <h1 style={{ fontSize: 32, fontWeight: 600 }}>Zarządzanie użytkownikami</h1>
      <p className="muted" style={{ margin: "6px 0 24px" }}>14 280 kont · filtruj, blokuj i weryfikuj</p>
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ padding: 16, borderBottom: "1px solid var(--line)", display: "flex", gap: 10 }}>
          <div className="searchbar" style={{ flex: 1, boxShadow: "none", padding: 4 }}>
            <div className="field"><Search size={16} className="muted" /><input placeholder="Szukaj użytkownika…" /></div>
          </div>
        </div>
        <table className="tbl">
          <thead><tr><th>Użytkownik</th><th>Rola</th><th>Status</th><th>Akcje</th></tr></thead>
          <tbody>
            {rows.map(([n, r, s, col], i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{n}</td>
                <td>{r}</td>
                <td><span style={{ color: col, fontWeight: 600, fontSize: 13 }}>● {s}</span></td>
                <td>
                  <button className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: 13 }}><Eye size={13} /> Podgląd</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminMod() {
  const [items, setItems] = useState([
    { id: 1, author: "anonim_99", target: "Marek Nowak", text: "Komentarz oznaczony przez filtr AI jako potencjalnie obraźliwy.", flag: "AI: wulgaryzmy" },
    { id: 2, author: "Kasia22", target: "Julia Wiśniewska", text: "Spam — link do zewnętrznej strony w treści opinii.", flag: "AI: spam" },
  ]);
  return (
    <div className="wrap">
      <h1 style={{ fontSize: 32, fontWeight: 600 }}>Moderacja treści</h1>
      <p className="muted" style={{ margin: "6px 0 24px" }}>Opinie i komentarze oznaczone przez system antyspamowy (AI)</p>
      {items.length === 0 ? (
        <div className="card" style={{ padding: 50, textAlign: "center" }}>
          <CheckCircle2 size={40} color="var(--green)" style={{ margin: "0 auto 10px" }} />
          <h3 style={{ fontSize: 18 }}>Brak zgłoszeń do moderacji</h3>
          <p className="muted">Wszystko sprawdzone. Dobra robota!</p>
        </div>
      ) : items.map((it) => (
        <div key={it.id} className="card" style={{ padding: 22, marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span className="tag" style={{ background: "var(--red-bg)", color: "var(--red)" }}><AlertTriangle size={11} style={{ verticalAlign: "-1px" }} /> {it.flag}</span>
            <span className="muted" style={{ fontSize: 13 }}>{it.author} → opinia o: {it.target}</span>
          </div>
          <p style={{ color: "var(--slate)", lineHeight: 1.5, marginBottom: 16 }}>„{it.text}”</p>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-ghost" onClick={() => setItems((a) => a.filter((x) => x.id !== it.id))}><Check size={15} /> Zatwierdź</button>
            <button className="btn" style={{ background: "var(--red-bg)", color: "var(--red)" }} onClick={() => setItems((a) => a.filter((x) => x.id !== it.id))}><X size={15} /> Usuń opinię</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function AdminFinance() {
  return (
    <div className="wrap">
      <h1 style={{ fontSize: 32, fontWeight: 600 }}>Finanse i prowizje</h1>
      <p className="muted" style={{ margin: "6px 0 24px" }}>Raporty transakcji, prowizje i rozliczenia (DAC7, PIT-8C)</p>
      <div className="kpi" style={{ marginBottom: 26 }}>
        {[
          ["Obrót (ten mies.)", "326 000 zł", TrendingUp, "var(--navy)", "#F2EEE5"],
          ["Prowizja (15%)", "48 900 zł", Banknote, "var(--green)", "var(--green-bg)"],
          ["Wypłaty oczekujące", "61 400 zł", Wallet, "var(--amber)", "var(--amber-bg)"],
          ["Zwroty", "2 180 zł", ArrowLeft, "var(--red)", "var(--red-bg)"],
        ].map(([l, n, Icon, col, bg]) => (
          <div key={l} className="card">
            <div className="ic" style={{ background: bg, color: col }}><Icon size={19} /></div>
            <div className="n" style={{ fontSize: 24 }}>{n}</div>
            <div className="muted" style={{ fontSize: 13 }}>{l}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: 17 }}>Ostatnie transakcje</h3>
          <button className="btn btn-ghost" style={{ padding: "8px 14px", fontSize: 13.5 }}><FileText size={15} /> Eksport raportu</button>
        </div>
        <table className="tbl">
          <thead><tr><th>ID</th><th>Uczeń → Korepetytor</th><th>Kwota</th><th>Prowizja</th><th>Status</th></tr></thead>
          <tbody>
            {[
              ["TX-9241", "J. Kostyk → A. Kowalska", "85 zł", "12,75 zł", "Rozliczona", "var(--green)"],
              ["TX-9240", "Ola W. → M. Nowak", "180 zł", "27 zł", "W depozycie", "var(--amber)"],
              ["TX-9239", "Bartek L. → J. Wiśniewska", "105 zł", "15,75 zł", "Rozliczona", "var(--green)"],
              ["TX-9238", "Kacper M. → P. Zieliński", "75 zł", "11,25 zł", "Zwrot", "var(--red)"],
            ].map(([id, p, k, pr, s, col]) => (
              <tr key={id}>
                <td style={{ fontFamily: "monospace", fontSize: 13 }}>{id}</td>
                <td>{p}</td>
                <td style={{ fontWeight: 600 }}>{k}</td>
                <td className="muted">{pr}</td>
                <td><span style={{ color: col, fontWeight: 600, fontSize: 13 }}>● {s}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="cols">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "var(--amber)", color: "var(--navy-deep)", display: "grid", placeItems: "center", fontFamily: "Fraunces", fontWeight: 700 }}>TM</div>
            <b style={{ fontFamily: "Fraunces", fontSize: 19 }}>TutorMatch</b>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.6, maxWidth: 300 }}>
            Platforma korepetycji online łącząca uczniów z zweryfikowanymi korepetytorami w całej Polsce.
          </p>
        </div>
        <div><b>Platforma</b><a>Znajdź korepetytora</a><a>Zostań korepetytorem</a><a>Jak to działa</a><a>Cennik</a></div>
        <div><b>Pomoc</b><a>Centrum pomocy</a><a>Reklamacje (ODR)</a><a>Kontakt</a></div>
        <div><b>Prawo</b><a>Regulamin</a><a>Polityka prywatności (RODO)</a><a>Pliki cookie</a></div>
      </div>
      <div style={{ maxWidth: 1180, margin: "30px auto 0", paddingTop: 20, borderTop: "1px solid rgba(255,255,255,.1)", fontSize: 13, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <span>© 2025 TutorMatch — makieta laboratoryjna (e-Biznes)</span>
        <span>Stripe · Przelewy24 · SendGrid · Google Meet</span>
      </div>
    </footer>
  );
}