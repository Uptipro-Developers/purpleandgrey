"use client";

import { useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  CirclePlus,
  Clock3,
  CloudOff,
  DoorClosed,
  Droplets,
  Dumbbell,
  Headphones,
  Home,
  KeyRound,
  LifeBuoy,
  Megaphone,
  MessageSquareWarning,
  Plus,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  User,
  UserPlus,
  Wallet,
  Wifi,
  WifiOff,
  Wrench,
  X,
} from "lucide-react";
import { categories, complaintKinds, requestsSeed, statusMeta, type ServiceCategory, type ServiceRequest } from "@/lib/data";
import { Badge } from "@/components/ui";
import SurfaceSwitcher from "@/components/surface-switcher";

/* ------------------------------- Data -------------------------------------- */

const tabs = [
  { key: "home", label: "Home", icon: Home },
  { key: "service", label: "Service", icon: LifeBuoy },
  { key: "wallet", label: "Wallet", icon: Wallet },
  { key: "key", label: "Key", icon: KeyRound },
  { key: "me", label: "Me", icon: User },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const transactions = [
  { icon: ArrowDownLeft, label: "Rent — August", meta: "Bells Court · R214", amount: "−₦1,050,000", tone: "text-white" },
  { icon: ArrowUpRight, label: "Top-up", meta: "GTBank · #PG-88213", amount: "+₦500,000", tone: "text-lime-400" },
  { icon: ArrowDownLeft, label: "Laundry pickup", meta: "Essentials + bedding", amount: "−₦4,500", tone: "text-white" },
  { icon: ArrowDownLeft, label: "Food court", meta: "Homestead kitchen", amount: "−₦6,200", tone: "text-white" },
];

const announcements = [
  ["Water maintenance", "Sat 9–11am · Bldg 2 · brief interruption, please queue your laundry", "Wrench"],
  ["Billiards unlocked", "Lounge 3 now open 24/7 with your digital key", "Dumbbell"],
  ["Inter-hall finals", "Tonight 8pm · main pitch · 4 halls · free entry", "Megaphone"],
] as const;

// -------------------------------- QR pattern -------------------------------

function QrGlyph() {
  return (
    <span aria-hidden className="relative block h-40 w-40 rounded-2xl bg-white">
      {Array.from({ length: 7 }, (_, i) =>
        Array.from({ length: 7 }, (_, j) => {
          const on =
            (i < 2 && j < 2) ||
            (i < 2 && j > 4) ||
            (i > 4 && j < 2) ||
            (i === 4 && j === 3) ||
            (i === 3 && j === 4) ||
            (i === 5 && j === 5) ||
            ((i + j) % 3 === 1 && i >= 2 && j >= 2 && i <= 4 && j <= 4) ||
            (i >= 2 && j >= 2 && (i % 2 === 0 || j % 2 === 0));
          return on ? (
            <span key={`${i}-${j}`} className="absolute h-4 w-4 rounded-[3px] bg-primary-950" style={{ left: 12 + i * 21, top: 12 + j * 21 }} />
          ) : null;
        }),
      )}
    </span>
  );
}

/* ------------------------------- Main app ---------------------------------- */

export default function ResidentApp() {
  const [tab, setTab] = useState<TabKey>("home");
  const [installBanner, setInstallBanner] = useState(true);
  const [offline] = useState(false);

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-pearl-50 p-0 md:bg-[radial-gradient(70rem_50rem_at_70%_-10%,rgba(76,29,149,0.5),transparent_60%),#0d0b14] md:py-10">
      <SurfaceSwitcher placement="tl" />
      <div
        className={`relative flex h-[100dvh] w-full flex-col overflow-hidden bg-pearl-950 text-white md:h-[780px] md:w-[400px] md:rounded-[2.75rem] md:border md:border-white/15 md:shadow-[0_0_0_12px_rgba(255,255,255,0.03),0_60px_120px_-30px_rgba(18,6,42,0.95)]`}
      >
        {/* notch — desktop frame */}
        <div className="hidden h-9 shrink-0 items-center justify-center md:flex">
          <span className="h-5 w-32 rounded-full bg-pearl-950" />
        </div>

        {/* status bar */}
        <div className="flex shrink-0 items-center justify-between px-6 pb-1 pt-2 text-[11px] text-white/60 md:pt-1">
          <span>9:41</span>
          <span className="flex items-center gap-1">{offline ? <WifiOff className="h-3 w-3 text-warning-500" aria-hidden /> : <Wifi className="h-3 w-3" aria-hidden />} LTE · 98%</span>
        </div>

        {/* install banner */}
        {installBanner && !offline && (
          <div className="mx-4 mb-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lime-400 text-primary-950">
              <Plus className="h-4 w-4" aria-hidden />
            </span>
            <p className="flex-1 text-xs leading-snug text-white/70">
              <span className="font-semibold text-white">Install the app.</span> One tap adds it to your home screen — offline-ready, fee-free top-ups.
            </p>
            <button
              type="button"
              onClick={() => setInstallBanner(false)}
              className="cursor-pointer rounded-lg p-1.5 text-white/50 transition-colors hover:text-white"
              aria-label="Dismiss install prompt"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* screen */}
        <div className="scroll-slim flex-1 overflow-y-auto px-4 pb-28">
          {tab === "home" && <HomeScreen offline={offline} />}
          {tab === "wallet" && <WalletScreen />}
          {tab === "key" && <KeyScreen />}
          {tab === "service" && <ServiceScreen />}
          {tab === "me" && <MeScreen offline={offline} />}
        </div>

        {/* bottom nav */}
        <nav
          aria-label="App sections"
          className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-around border-t border-white/10 bg-pearl-950/90 px-2 pb-[max(env(safe-area-inset-bottom,0px),0.75rem)] pt-3 backdrop-blur-xl"
        >
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = t.key === tab;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                aria-current={active ? "page" : undefined}
                className={`relative flex cursor-pointer flex-col items-center gap-1 rounded-xl px-3 py-1 transition-colors duration-200 ${
                  active ? "text-lime-400" : "text-white/45 hover:text-white/80"
                }`}
              >
                {active && <span className="absolute -top-3 h-5 w-10 rounded-full bg-lime-400/20" aria-hidden />}
                <Icon className="h-5 w-5" aria-hidden />
                <span className="text-[10px] font-semibold">{t.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

/* ------------------------------- Screens ----------------------------------- */

function ScreenHead({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-5">
      <h1 className="font-display text-[26px] font-bold tracking-tight text-white">{title}</h1>
      {subtitle && <p className="mt-0.5 text-[13px] text-white/50">{subtitle}</p>}
    </div>
  );
}

function HomeScreen({ offline }: { offline: boolean }) {
  return (
    <>
      <div className="mt-2 flex items-center justify-between">
        <div>
          <p className="text-xs text-white/50">Good morning, Ada</p>
          <p className="font-display text-lg font-semibold text-white">Purple & Grey · Unilag · R214</p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-800 text-sm font-bold text-white">
          AO
        </span>
      </div>

      {offline && (
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-warning-500/40 bg-warning-500/10 px-4 py-3">
          <CloudOff className="h-4 w-4 shrink-0 text-warning-500" aria-hidden />
          <p className="text-xs text-white/80">Offline mode — payments and requests are queued locally.</p>
        </div>
      )}

      {/* rent due */}
      <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-warning-500/15 text-warning-500">
            <Clock3 className="h-4 w-4" aria-hidden />
          </span>
          <div>
            <p className="text-xs text-white/60">Rent due in 12 days</p>
            <p className="font-display text-sm font-semibold text-white">September · ₦1,050,000</p>
          </div>
        </div>
        <button type="button" className="cursor-pointer rounded-xl bg-lime-400 px-3.5 py-2 text-xs font-bold text-primary-950 transition-colors hover:bg-lime-300">
          Pay
        </button>
      </div>

      {/* wallet card */}
      <div className="mt-4 rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 p-5 shadow-lift">
        <div className="flex items-center justify-between">
          <p className="text-xs text-white/60">Wallet balance</p>
          <Wallet className="h-4 w-4 text-lime-400" aria-hidden />
        </div>
        <p className="mt-1 font-display text-3xl font-bold tabular-nums text-white">₦845,000</p>
        <div className="mt-4 flex items-center gap-2">
          <button type="button" className="cursor-pointer rounded-full bg-lime-400 px-4 py-2 text-xs font-bold text-primary-950 transition-colors hover:bg-lime-300">
            Pay rent
          </button>
          <button type="button" className="cursor-pointer rounded-full border border-white/25 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/10">
            Top up
          </button>
          <span className="ml-auto flex items-center gap-1 text-[10px] text-white/50">
            <Sparkles className="h-3 w-3 text-lime-400" aria-hidden /> 1.2% APY idle
          </span>
        </div>
      </div>

      {/* quick actions */}
      <div className="mt-4 grid grid-cols-4 gap-2">
        {[
          ["KeyRound", "Digital key"],
          ["Wrench", "Maintenance"],
          ["UserPlus", "Visitor pass"],
          ["Headphones", "Help desk"],
        ].map(([icon, label]) => {
          const Icon = { KeyRound, Wrench, UserPlus, Headphones }[icon as "KeyRound"];
          return (
            <button key={label} type="button" className="group cursor-pointer flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-2 py-4 transition-colors duration-200 hover:bg-white/10">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-lime-400 transition-colors group-hover:bg-lime-400 group-hover:text-primary-950">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="text-[11px] text-white/75">{label}</span>
            </button>
          );
        })}
      </div>

      {/* maintenance card */}
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-sm font-semibold text-white">
            <Wrench className="h-4 w-4 text-lime-400" aria-hidden /> AC is dripping · R214
          </p>
          <Badge tone="info">Tech en route · 4:30pm</Badge>
        </div>
        <p className="mt-1.5 text-xs text-white/50">Opened today, #T-104 · include photo when scene changes</p>
      </div>

      <p className="mb-2 mt-6 text-xs font-semibold uppercase tracking-wider text-white/40">Announcements</p>
      <ul className="space-y-2">
        {announcements.map(([t, d, icon]) => {
          const Icon = { Wrench, Dumbbell, Megaphone }[icon as "Wrench"];
          return (
            <li key={t} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-500/20 text-primary-300">
                <Icon className="h-4 w-4" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">{t}</p>
                <p className="truncate text-xs text-white/50">{d}</p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-white/30" aria-hidden />
            </li>
          );
        })}
      </ul>
    </>
  );
}

function WalletScreen() {
  const [amount, setAmount] = useState("20,000");
  return (
    <>
      <ScreenHead title="Wallet" subtitle="Virtual account · GTBank · ···4521" />
      <div className="rounded-3xl bg-gradient-to-br from-lime-400 to-lime-500 p-5 shadow-[0_20px_50px_-20px_rgba(200,242,78,0.6)]">
        <p className="text-xs font-medium text-primary-900/70">Available balance</p>
        <p className="mt-1 font-display text-3xl font-bold tabular-nums text-primary-950">₦845,000</p>
        <div className="mt-4 flex gap-2">
          <button type="button" className="cursor-pointer flex-1 rounded-xl bg-primary-950 px-4 py-2.5 text-xs font-bold text-lime-400 transition-colors hover:bg-primary-800">
            Top up
          </button>
          <button type="button" className="cursor-pointer flex-1 rounded-xl border border-primary-950/25 px-4 py-2.5 text-xs font-bold text-primary-950 transition-colors hover:bg-primary-900/10">
            Split with room
          </button>
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/40">Quick top-up</p>
        <div className="grid grid-cols-4 gap-2">
          {["5,000", "10,000", "20,000", "50,000"].map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAmount(a)}
              className={`cursor-pointer rounded-xl border py-2.5 text-xs font-semibold tabular-nums transition-colors duration-200 ${
                amount === a ? "border-lime-400 bg-lime-400/15 text-lime-400" : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              ₦{a}
            </button>
          ))}
        </div>
        <button type="button" className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700">
          <Sparkles className="h-4 w-4 text-lime-400" aria-hidden /> Top up ₦{amount}
        </button>
      </div>

      <div className="mt-6">
        <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/40">
          Recent activity <TrendingUp className="h-3.5 w-3.5 text-lime-400" aria-hidden />
        </p>
        <ul className="space-y-2">
          {transactions.map((tx) => {
            const Icon = tx.icon;
            return (
              <li key={tx.label} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/8">
                  <Icon className="h-4 w-4 text-white/70" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white">{tx.label}</p>
                  <p className="truncate text-xs text-white/45">{tx.meta}</p>
                </div>
                <p className={`text-sm font-semibold tabular-nums ${tx.tone}`}>{tx.amount}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

function KeyScreen() {
  return (
    <>
      <ScreenHead title="My room" subtitle="Purple & Grey · Unilag · R214 · Standard 4" />
      <div className="rounded-3xl bg-gradient-to-br from-primary-700 via-primary-800 to-primary-950 p-6 text-center shadow-lift">
        <span className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] text-lime-400">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden /> DIGITAL KEY
        </span>
        <div className="mt-5 flex justify-center">
          <QrGlyph />
        </div>
        <p className="mt-5 font-display text-base font-semibold text-white">Hold to unlock your door</p>
        <p className="mt-1 text-xs text-white/50">Near-field tap · works offline · auto-rotates on move-out</p>
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-400/15 text-lime-400">
          <UserPlus className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white">Create a visitor pass</p>
          <p className="text-xs text-white/50">Guests get a timed QR to enter Bells Court</p>
        </div>
        <ChevronRight className="h-4 w-4 text-white/30" aria-hidden />
      </div>

      <div className="mt-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
        <span className="flex h-3 w-3 shrink-0 rounded-full bg-success-500" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white">Door secured</p>
          <p className="text-xs text-white/50">Last unlocked today · 8:02am</p>
        </div>
        <DoorClosed className="h-4 w-4 text-white/30" aria-hidden />
      </div>
    </>
  );
}

const prefTimes = ["Anytime", "Morning", "Afternoon", "Evening", "Weekend"];

function ServiceScreen() {
  const [mode, setMode] = useState<"service" | "complaint">("service");
  const [category, setCategory] = useState<ServiceCategory>(categories[0]);
  const [kind, setKind] = useState<string>(complaintKinds[0]);
  const [pref, setPref] = useState("Anytime");
  const [detail, setDetail] = useState("");
  const [requests, setRequests] = useState<ServiceRequest[]>(
    requestsSeed.slice(0, 2).map((r) => ({ ...r, resident: "Ada Obi", room: "R214 · Bells Court" })),
  );

  const send = () => {
    if (!detail.trim()) return;
    setRequests((rs) => [
      {
        id: `SR-${120 + rs.length}`,
        kind: mode,
        resident: "Ada Obi",
        room: `R214 · Purple & Grey · Unilag · Block A`,
        location: "Unilag",
        category,
        title: mode === "service" ? `${category} · ${pref}` : `${kind} complaint`,
        detail: detail.trim(),
        priority: "Normal",
        status: "requested",
        created: "Just now",
        assignedVendorId: null,
      },
      ...rs,
    ]);
    setDetail("");
    setMode("service");
  };

  return (
    <>
      <ScreenHead title="Service" subtitle="Requests & complaints — sent to admin, assigned to the right team" />

      <div className="grid grid-cols-2 gap-2">
        {(
          [
            ["service", "Request a service", Wrench],
            ["complaint", "Make a complaint", MessageSquareWarning],
          ] as const
        ).map(([m, l, Icon]) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            aria-pressed={mode === m}
            className={`flex cursor-pointer flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-colors duration-200 ${
              mode === m ? "border-lime-400 bg-lime-400/15" : "border-white/10 bg-white/5 hover:bg-white/10"
            }`}
          >
            <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${mode === m ? "bg-lime-400 text-primary-950" : "bg-white/10 text-lime-400"}`}>
              <Icon className="h-4 w-4" aria-hidden />
            </span>
            <span className="text-sm font-semibold text-white">{l}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 p-5 shadow-lift">
        {mode === "service" ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-wider text-lime-400">What do you need?</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                  className={`cursor-pointer rounded-xl border px-3 py-2 text-left text-xs font-semibold transition-colors ${category === c ? "border-lime-400 bg-white text-primary-950" : "border-white/15 bg-white/5 text-white/70 hover:bg-white/10"}`}
                >
                  {c}
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-white/50">Preferred time</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {prefTimes.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setPref(t)}
                  aria-pressed={pref === t}
                  className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${pref === t ? "bg-lime-400 text-primary-950" : "border border-white/15 text-white/70 hover:bg-white/10"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="text-xs font-semibold uppercase tracking-wider text-lime-400">What&rsquo;s wrong?</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {complaintKinds.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setKind(k)}
                  aria-pressed={kind === k}
                  className={`cursor-pointer rounded-xl border px-2 py-2 text-center text-xs font-semibold transition-colors ${kind === k ? "border-lime-400 bg-white text-primary-950" : "border-white/15 bg-white/5 text-white/70 hover:bg-white/10"}`}
                >
                  {k}
                </button>
              ))}
            </div>
          </>
        )}
        <label className="mt-4 block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/50">
            {mode === "service" ? "Describe the request" : "Describe what happened"}
          </span>
          <textarea
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            rows={3}
            placeholder="Give admin enough detail to assign the right team…"
            className="w-full resize-none rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-lime-400"
          />
        </label>
        <button
          type="button"
          onClick={send}
          className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-lime-400 py-3 text-sm font-bold text-primary-950 transition-colors hover:bg-lime-300"
        >
          <Send className="h-4 w-4" aria-hidden />
          {mode === "service" ? `Send request to ${category}` : "File complaint"}
        </button>
        <p className="mt-3 text-center text-[11px] text-white/50">
          Sent to the admin desk — admin assigns a {category}{" "}
          team and proposes a time via admin. You never contact vendors directly.
        </p>
      </div>

      <p className="mb-2 mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/40">
        <LifeBuoy className="h-3.5 w-3.5 text-lime-400" aria-hidden /> Your requests & complaints
      </p>
      <div className="scroll-slim max-h-72 space-y-2 overflow-y-auto">
        {requests.map((r) => {
          const m = statusMeta[r.status];
          return (
            <div key={r.id} className="rounded-2xl border border-white/8 bg-white/5 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="violet">{r.category}</Badge>
                <Badge tone={m.tone}>{m.label}</Badge>
                <span className="ml-auto text-[10px] text-white/40">{r.created}</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-white">
                {r.kind === "service" ? "Service request" : "Complaint"} &middot; {r.title}
              </p>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/50">{r.detail}</p>
              {(r.proposed || r.slotted) && (
                <p className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-lime-400">
                  <Clock3 className="h-3 w-3" aria-hidden />
                  {r.slotted ? `Admin: confirmed · ${r.slotted}` : `Admin proposes · ${r.proposed}`}
                </p>
              )}
              {r.status === "requested" && <p className="mt-2 text-[11px] text-white/45">{m.hint}</p>}
              {r.status === "time-proposed" && (
                <button
                  type="button"
                  onClick={() => setRequests((rs) => rs.map((x) => (x.id === r.id ? { ...x, status: "slotted", slotted: x.proposed } : x)))}
                  className="mt-3 w-full cursor-pointer rounded-xl bg-white px-4 py-2 text-xs font-bold text-primary-950 transition-colors hover:bg-lime-300"
                >
                  Confirm {r.proposed} via admin
                </button>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

function MeScreen({ offline }: { offline: boolean }) {
  return (
    <>
      <ScreenHead title="Profile" subtitle="Resident since 2024" />
      <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-5">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-800 font-display text-lg font-bold text-white">
          AO
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg font-semibold text-white">Ada Obi</p>
          <p className="text-xs text-white/50">+234 803 ··· ·····  02</p>
          <div className="mt-1.5 flex gap-1.5">
            <Badge tone="violet">KYC verified</Badge>
            <Badge tone="neutral">Guarantor on file</Badge>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {[
          [CheckCircle2, "KYC verification", "Verified · 23 Aug 2025", "success"],
          [CheckCircle2, "Hostel agreement", "Signed · R214, Bells Court", "success"],
          [Droplets, "Deposit — ₦150,000", "Held by P&G · refundable at move-out", "neutral"],
        ].map(([Icon, t, d, tone]) => {
          const I = Icon as typeof CheckCircle2;
          return (
            <div key={t as string} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/5 p-4">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${tone === "success" ? "bg-success-500/15 text-success-500" : "bg-white/8 text-white/60"}`}>
                <I className="h-4 w-4" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">{t as string}</p>
                <p className="truncate text-xs text-white/45">{d as string}</p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-white/30" aria-hidden />
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-2xl bg-white p-5 text-primary-950 shadow-lift">
        <p className="flex items-center gap-2 font-display text-base font-semibold">
          <CirclePlus className="h-5 w-5 text-primary-600" aria-hidden /> Planning to move out?
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-primary-900/60">
          Start a request any time. Deposit review opens once your room check shows 100% condition.
        </p>
        <button type="button" className="mt-4 w-full cursor-pointer rounded-xl bg-primary-950 py-3 text-sm font-bold text-lime-400 transition-colors hover:bg-primary-800">
          Request move-out
        </button>
      </div>

      {offline && (
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
          <CloudOff className="h-4 w-4 shrink-0 text-warning-500" aria-hidden />
          <p className="text-xs text-white/60">You’re offline — 2 actions queued. Syncing resumes automatically.</p>
        </div>
      )}

      <button type="button" className="mt-6 w-full cursor-pointer rounded-xl border border-white/10 py-3 text-sm font-semibold text-white/60 transition-colors hover:text-danger-500 hover:border-danger-500/40">
        Sign out
      </button>
    </>
  );
}