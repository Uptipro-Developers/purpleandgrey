import {
  Activity,
  ArrowUpRight,
  Building2,
  CalendarCheck2,
  ChevronRight,
  Clock3,
  DoorOpen,
  KeyRound,
  Lock,
  MapPin,
  ShieldCheck,
  Sparkles,
  Wallet,
  Wrench,
} from "lucide-react";
import { LandingNav, PathSelector } from "@/components/landing-interactive";
import SurfaceSwitcher from "@/components/surface-switcher";
import { Badge, Button, Logo, Metric, SectionTag } from "@/components/ui";
import { estates } from "@/lib/data";

const buildings = [
  "Purple & Grey · Unilag — Block A", "Purple & Grey · Oye Ekiti — Block A", "Purple & Grey · Abuja — Phase 1",
  "Purple & Grey · Port Harcourt — Block A", "Purple & Grey · Ibadan — Block A", "Purple & Grey · Unilag — Block B",
];

const audiences = [
  {
    icon: Sparkles,
    eyebrow: "If you live here",
    title: "One app for your room, wallet and services",
    points: [
      "Pay rent and top up in seconds — receipts instantly",
      "A digital key that opens your door and rotates on move-out",
      "Need a fix? Send a request to admin — admin picks the right team",
      "Works offline; requests queue and sync when you reconnect",
    ],
    cta: "Open the resident app",
    href: "/app",
    accent: "bg-lime-400 text-primary-950",
  },
  {
    icon: Wrench,
    eyebrow: "If you run a service team",
    title: "Only the jobs admin sends you — nothing else",
    points: [
      "You see only the requests admin assigns to you for your trade",
      "Propose a time to admin; admin confirms it with the resident",
      "Set your availability so admin only offers real slots",
      "Every job logged to a unit’s history, via admin — no paperwork",
    ],
    cta: "Open the vendor portal",
    href: "/vendor",
    accent: "bg-primary-600 text-white",
  },
];

const steps = [
  ["Request", "From the app, pick a trade and describe it — like “tap is dripping”. It lands with the admin team."],
  ["Triage", "Admin reviews, checks the building and assigns the right service team for that trade."],
  ["Done via admin", "The assigned vendor proposes a time to admin, admin confirms it with you — no direct chat with the vendor."],
  ["Logged", "Vendor fixes it, admin marks it resolved and it’s logged to your room’s history."],
];

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <SurfaceSwitcher />
      {/* ================================ HERO ================================ */}
      <div className="aurora relative overflow-hidden">
        <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden />
        <LandingNav />
        <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-14 sm:pt-20">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/70 backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-400" aria-hidden />
                One brand. Five states. Fourteen buildings — same platform.
              </p>
              <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-[1.05] text-white sm:text-6xl">
                Student housing, operated like an{" "}
                <span className="bg-gradient-to-r from-lime-300 to-lime-400 bg-clip-text text-transparent">
                  enterprise
                </span>
                .
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/65">
                Purple&Grey isn&rsquo;t one hostel — it&rsquo;s every hostel we build, in every state, under the same name. Whether it&rsquo;s <span className="font-semibold text-white">Purple & Grey · Unilag</span> or{" "}
                <span className="font-semibold text-white">Purple & Grey · Oye Ekiti</span>, the name stays the same, the platform stays the same — one app for 12,400 residents, one admin desk that routes every request to the right local team.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button as="a" href="/app" variant="lime" size="lg" withArrow>
                  Explore the resident app
                </Button>
                <Button as="a" href="/vendor" variant="ghost" size="lg">
                  Open the vendor portal
                </Button>
              </div>
              <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
                {[
                  ["5", "states live"],
                  ["14", "buildings — same ops"],
                  ["12,400+", "residents on-platform"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <dd className="font-display text-3xl font-bold text-white tabular-nums">{v}</dd>
                    <dt className="mt-1 text-xs uppercase tracking-wide text-white/45">{l}</dt>
                  </div>
                ))}
              </dl>
            </div>
            <div className="lg:pl-4">
              <PathSelector />
              <div className="mx-auto mt-6 flex max-w-md items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 backdrop-blur">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400/15 text-lime-400">
                  <ShieldCheck className="h-5 w-5" aria-hidden />
                </span>
                <p className="text-sm leading-snug text-white/70">
                  <span className="font-semibold text-white">SOC 2 aligned controls.</span>{" "}
                  Encrypted end-to-end, role-based access, full audit trails.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ============================ ESTATES / NETWORK ======================= */}
      <section aria-label="Where Purple & Grey lives" className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <SectionTag>The name never changes</SectionTag>
            <h2 className="font-display text-3xl font-bold tracking-tight text-pearl-950 sm:text-4xl">
              Every building is called Purple & Grey — only the location tells you which one.
            </h2>
            <p className="mt-4 text-lg text-pearl-500">
              There is no “Bells Court” or “Metro House.” Whether you&rsquo;re in Unilag, Oye Ekiti, Abuja, Port Harcourt or Ibadan, the hostel is{" "}
              <span className="font-semibold text-pearl-900">Purple & Grey</span> — same name, same design, same platform. Your campus is the only difference: Unilag, Oye Ekiti, Abuja, Port Harcourt or Ibadan.
            </p>
            <p className="mt-3 inline-flex flex-wrap items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-xs font-semibold text-primary-700">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden /> Every estate is Purple & Grey · Unilag · Oye Ekiti · Abuja · Port Harcourt · Ibadan
            </p>
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-pearl-400">5 live estates</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {estates.map((e) => (
            <div key={e.id} className="rounded-3xl border border-pearl-200/80 bg-white p-7 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white">
                  <Building2 className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-pearl-400">{e.state} · {e.city} — {e.campus}</p>
                  <h3 className="font-display text-base font-semibold text-pearl-950">{e.name} · {e.campus}</h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-pearl-500">{e.blurb}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {e.buildings.map((b) => (
                  <span key={b} className="rounded-full border border-pearl-200 bg-pearl-50 px-3 py-1 text-xs font-medium text-pearl-600">Purple & Grey · {e.campus} — {b}</span>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-pearl-100 pt-4">
                <span className="text-xs text-pearl-400">{e.buildings.length} buildings</span>
                <span className="font-display text-sm font-bold text-pearl-950">{e.residents.toLocaleString()} residents</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================ PORTFOLIO MARQUEE ======================= */}
      <section aria-label="Properties in the portfolio" className="border-y border-pearl-200/70 bg-white py-6">
        <div className="mx-auto max-w-7xl overflow-hidden px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-pearl-400">
            14 buildings · one platform
          </p>
          <div className="marquee relative mt-5 overflow-hidden" aria-hidden>
            <div className="marquee-track flex w-max items-center gap-12">
              {[...buildings, ...buildings].map((b, i) => (
                <span key={`${b}-${i}`} className="flex items-center gap-2 font-display text-base font-medium text-pearl-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-300" />
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================= TWO AUDIENCES ========================== */}
      <section id="platform" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
        <div className="max-w-2xl">
          <SectionTag>The platform</SectionTag>
          <h2 className="font-display text-3xl font-bold tracking-tight text-pearl-950 sm:text-4xl">
            Two doors into one ops desk — residents and the teams that serve them.
          </h2>
          <p className="mt-4 text-lg text-pearl-500">
            Residents talk to admin. Admin talks to vendors. No direct chat, no phone tag — every request is triaged and logged.
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {audiences.map((a) => {
            const Icon = a.icon;
            return (
              <div key={a.title} className="group rounded-3xl border border-pearl-200/80 bg-white p-8 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift">
                <div className="flex items-center gap-3">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${a.accent}`}>
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pearl-400">{a.eyebrow}</p>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-pearl-950">{a.title}</h3>
                <ul className="mt-5 space-y-3">
                  {a.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm leading-relaxed text-pearl-600">
                      <span className="mt-0.5 h-5 w-5 shrink-0 rounded-md bg-primary-50 p-1 text-primary-600" aria-hidden>
                        <svg viewBox="0 0 12 12" className="h-full w-full">
                          <path d="M2.5 6.2 4.9 8.6 9.5 3.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href={a.href}
                  className="mt-7 inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-primary-600"
                >
                  {a.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================ SHARED FLOW ============================ */}
      <section className="bg-gradient-to-b from-white to-primary-50/60 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <SectionTag>How it works</SectionTag>
            <h2 className="font-display text-3xl font-bold tracking-tight text-pearl-950 sm:text-4xl">
              One flow, both sides.<br className="hidden sm:inline" /> Request → admin triage → assigned → done.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-pearl-500">
              The vendor never contacts the resident directly. Admin is the single relay — that&rsquo;s how we keep quality and audit trails.
            </p>
          </div>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(([t, d], i) => (
              <li key={t} className="relative rounded-2xl border border-pearl-200/80 bg-white p-7 shadow-soft">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 font-display text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-pearl-950">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-pearl-500">{d}</p>
                {i < steps.length - 1 && (
                  <ChevronRight className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-primary-300 lg:block" aria-hidden />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================ RESIDENT APP ============================ */}
      <section id="resident" className="aurora relative scroll-mt-24 overflow-hidden py-24">
        <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
          <div>
            <SectionTag>For residents</SectionTag>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Your room, your wallet and your whole life on campus — one app.
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-white/60">
              Every resident signs in once. Rent, top-ups, your digital door key, services and move-out — PWA-fast, offline-ready, install to your home screen. You send requests to admin, not to external teams.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Digital key that rotates automatically on move-out",
                "Virtual wallet: pay rent, split bills and get receipts instantly",
                "Send any service request to admin — admin assigns the right team",
                "Works offline — actions queue and sync when you reconnect",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm leading-relaxed text-white/75">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-lime-400/15 text-lime-400">
                    <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden>
                      <path d="M2.5 6.2 4.9 8.6 9.5 3.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button as="a" href="/app" variant="lime" withArrow>
                Open the resident app
              </Button>
              <span className="flex items-center gap-2 text-xs text-white/45">
                <Wallet className="h-4 w-4" aria-hidden /> Installable PWA · no app store required
              </span>
            </div>
          </div>
          <PhoneMock />
        </div>
      </section>

      {/* ============================ VENDOR PORTAL =========================== */}
      <section id="vendor" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <VendorMock />
          </div>
          <div className="order-1 lg:order-2">
            <SectionTag>For vendors</SectionTag>
            <h2 className="font-display text-3xl font-bold tracking-tight text-pearl-950 sm:text-4xl">
              No direct contact with residents — admin brings the work to you.
            </h2>
            <p className="mt-4 max-w-lg text-lg text-pearl-500">
              Sign in and you see only the jobs admin assigns to your trade. You propose a time to admin; admin confirms it with the resident. No endless calls, no chat box.
            </p>
            <ul className="mt-8 flex flex-wrap gap-3">
              {[
                ["Wrench", "Only jobs admin assigns you"],
                ["CalendarCheck2", "Propose times to admin"],
                ["Clock3", "Set your availability"],
                ["Building2", "One queue per estate"],
              ].map(([icon, label]) => {
                const Icon = icon === "Wrench" ? Wrench : icon === "CalendarCheck2" ? CalendarCheck2 : icon === "Clock3" ? Clock3 : Building2;
                return (
                  <li key={label} className="flex items-center gap-2 rounded-full border border-pearl-200 bg-white px-4 py-2 text-sm text-pearl-700">
                    <Icon className="h-4 w-4 text-primary-600" aria-hidden />
                    {label}
                  </li>
                );
              })}
            </ul>
            <div className="mt-10">
              <Button as="a" href="/vendor" variant="primary" withArrow>
                Open the vendor portal
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== STATS BAND ============================ */}
      <section className="border-y border-pearl-200/70 bg-white py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 lg:grid-cols-4">
          <Metric value="12,400+" label="Residents on-platform" delta="+1,120 this term" />
          <Metric value="5" label="States live" delta="Lagos · FCT · Rivers · Oyo · Enugu" />
          <Metric value="14" label="Buildings — same ops" delta="All on one platform" />
          <Metric value="8.5 min" label="Avg. admin triage" delta="−31% since launch" />
        </div>
      </section>

      {/* ============================== SECURITY ============================== */}
      <section id="security" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
        <div className="max-w-2xl">
          <SectionTag>Security & reliability</SectionTag>
          <h2 className="font-display text-3xl font-bold tracking-tight text-pearl-950 sm:text-4xl">
            Residents&rsquo; trust and vendors&rsquo; access — both P&G controls.
          </h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [Lock, "Encryption", "AES-256 at rest, TLS 1.3 in transit. Keys in a managed HSM-backed vault."],
            [ShieldCheck, "Zero-trust access", "SSO, MFA and per-role boundaries. Least privilege is the default."],
            [DoorOpen, "Scoped by trade + estate", "Each vendor sees only their estate and their trade — never the wider network."],
            [MapPin, "Redundant by design", "Multi-region infra with automatic failover. 99.98% uptime."],
          ].map(([Icon, t, d]) => {
            const I = Icon as typeof Lock;
            return (
              <div key={t as string} className="rounded-2xl border border-pearl-200/80 bg-white p-7 shadow-soft">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-950 text-lime-400">
                  <I className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-base font-semibold text-pearl-950">{t as string}</h3>
                <p className="mt-2 text-sm leading-relaxed text-pearl-500">{d as string}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================== CTA / FOOTER ========================== */}
      <footer id="book" className="aurora relative scroll-mt-24 overflow-hidden">
        <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-24">
          <div className="glass-dark mx-auto max-w-3xl rounded-3xl p-10 text-center sm:p-14">
            <p className="mb-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-lime-400">
              <Activity className="h-4 w-4" aria-hidden /> Start the conversation
            </p>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Bring your residents — or your trade — onto the platform.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
              Moving into any Purple&Grey estate? Your room is a login away. Run a service team that wants cleaner work orders? We&rsquo;ll scope you in within a week.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button as="a" href="/app" variant="lime" size="lg">
                Enter the resident app
              </Button>
              <Button as="a" href="/vendor" variant="ghost" size="lg">
                Open the vendor portal
              </Button>
            </div>
            <p className="mt-6 text-xs text-white/40">No credit card · no obligations · estate tours in all five states</p>
          </div>
          <div className="mt-16 flex flex-col items-start justify-between gap-10 border-t border-white/10 pt-10 sm:flex-row sm:items-center">
            <Logo />
            <div className="flex flex-col gap-2 text-sm text-white/55 sm:flex-row sm:items-center sm:gap-8">
              <a href="/app" className="cursor-pointer transition-colors hover:text-white">Open the app</a>
              <a href="/vendor" className="cursor-pointer transition-colors hover:text-white">Vendor portal</a>
              <a href="#security" className="cursor-pointer transition-colors hover:text-white">Security & privacy</a>
            </div>
          </div>
          <p className="mt-10 flex items-center gap-2 text-xs text-white/35">
            <Building2 className="h-4 w-4" aria-hidden />
            © 2026 Purple & Grey Resident Living Ltd. Lagos · Abuja · Port Harcourt · Ibadan · Enugu. Built for a network, not a single block.
          </p>
        </div>
      </footer>
    </main>
  );
}

/* ------------------------------ phone mockup ------------------------------ */

function PhoneMock() {
  return (
    <div aria-hidden className="relative mx-auto w-[20.5rem] max-w-full">
      <div className="absolute -inset-8 rounded-[3rem] bg-primary-500/25 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2.6rem] border border-white/15 bg-primary-950 shadow-[0_0_0_10px_rgba(255,255,255,0.04),0_40px_80px_-20px_rgba(18,6,42,0.9)]">
        <div className="flex h-9 items-center justify-center">
          <span className="h-5 w-28 rounded-full bg-pearl-950" />
        </div>
        <div className="space-y-3 bg-[#16121f] px-5 pb-7 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-white/45">Good morning, Ada</p>
              <p className="font-display text-lg font-semibold text-white">Bells Court · R214</p>
            </div>
            <Badge tone="warning">Rent due in 12d</Badge>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-4 shadow-lift">
            <p className="text-[11px] text-white/60">Wallet balance</p>
            <p className="font-display text-2xl font-bold text-white tabular-nums">₦845,000</p>
            <div className="mt-3 flex gap-2">
              <span className="rounded-full bg-lime-400 px-3 py-1.5 text-[11px] font-semibold text-primary-950">Pay rent</span>
              <span className="rounded-full border border-white/20 px-3 py-1.5 text-[11px] text-white/80">Top up</span>
            </div>
          </div>
          <div className="flex justify-between rounded-2xl bg-white/5 p-3">
            {["Service", "Key", "Wallet"].map((l, i) => (
              <div key={l} className="text-center">
                <span className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl ${i === 0 ? "bg-lime-400 text-primary-950" : "bg-white/10 text-white"}`}>
                  {i === 0 ? (
                    <Wrench className="h-5 w-5" />
                  ) : i === 1 ? (
                    <KeyRound className="h-5 w-5" />
                  ) : (
                    <Wallet className="h-5 w-5" />
                  )}
                </span>
                <p className="mt-1 text-[10px] text-white/60">{l}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">
            <p className="text-[11px] text-white/70">AC request — with admin · Fri 2pm proposed</p>
            <span className="rounded-full bg-lime-400 px-2.5 py-1 text-[9px] font-bold text-primary-950">Confirm</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ vendor mockup ----------------------------- */

function VendorMock() {
  return (
    <div aria-hidden className="relative">
      <div className="absolute -inset-6 rounded-[2rem] bg-primary-500/15 blur-3xl" />
      <div className="relative rounded-3xl border border-pearl-200/80 bg-white p-3 shadow-lift">
        <div className="rounded-2xl border border-pearl-100 bg-pearl-50 p-5">
          <div className="flex items-center justify-between border-b border-pearl-200/80 pb-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white">
                <Wrench className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold text-pearl-950">Chuks Electricals</p>
                <p className="text-xs text-pearl-500">Electrical & HVAC · assigned by admin</p>
              </div>
            </div>
            <Badge tone="success">Active</Badge>
          </div>
          <ul className="mt-4 space-y-2.5">
            {[
              ["SR-104", "AC dripping into study corner", "Urgent", "danger", "With admin"],
              ["SR-101", "Study lamp flickers", "Normal", "neutral", "Time proposed"],
              ["SR-098", "Ceiling fan wobbles", "High", "warning", "Slot confirmed"],
            ].map(([id, title, prio, tone, status]) => (
              <li key={id} className="flex items-center gap-3 rounded-xl border border-pearl-100 bg-white p-3">
                <span className="text-xs font-semibold text-pearl-400">{id}</span>
                <span className="flex-1 truncate text-sm font-medium text-pearl-800">{title}</span>
                <Badge tone={tone as "danger"}>{prio}</Badge>
                <Badge tone="info">{status}</Badge>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-primary-50 px-4 py-3">
            <p className="flex items-center gap-2 text-xs font-semibold text-primary-800">
              <CalendarCheck2 className="h-4 w-4 text-primary-600" aria-hidden /> Propose time to admin
            </p>
            <span className="flex gap-1.5">
              {["10am", "2pm", "4pm"].map((t) => (
                <span key={t} className="rounded-lg bg-white px-2.5 py-1 text-[11px] font-semibold text-pearl-700 ring-1 ring-pearl-200">
                  {t}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
