"use client";

import { useState } from "react";
import {
  Bell,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CreditCard,
  DoorOpen,
  Download,
  Gauge,
  HardHat,
  Inbox,
  LayoutDashboard,
  MapPin,
  Menu,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  ToggleLeft,
  TrendingDown,
  TrendingUp,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { Badge, Button, Logo } from "@/components/ui";
import SurfaceSwitcher from "@/components/surface-switcher";
import {
  categories,
  locations,
  requestsByCategory,
  requestsSeed,
  requestStatuses,
  statusMeta,
  type Location,
  type RequestStatus,
  type ServiceCategory,
  type ServiceRequest,
  type Vendor,
  vendorsSeed,
} from "@/lib/data";

/* --------------------------------- Data ------------------------------------ */

const modules = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "residents", label: "Residents", icon: Users },
  { key: "units", label: "Units & rooms", icon: DoorOpen },
  { key: "billing", label: "Billing", icon: CreditCard },
  { key: "maintenance", label: "Maintenance", icon: Wrench },
  { key: "requests", label: "Service requests", icon: Inbox },
  { key: "access", label: "Access & security", icon: ShieldCheck },
  { key: "housekeeping", label: "Housekeeping", icon: CheckCircle2 },
  { key: "vendors", label: "Vendors", icon: HardHat },
] as const;

type ModuleKey = (typeof modules)[number]["key"];

const rchart = [42, 55, 48, 61, 57, 70, 66, 78, 74, 88, 84, 96];
const roll = [64, 68, 73, 71, 79, 86, 90, 88, 94, 97, 95, 100];

type OrderRow = {
  id: string;
  unit: string;
  issue: string;
  age: string;
  prio: string;
  tone: "danger" | "info" | "violet" | "neutral" | "warning";
  owner: string;
};

const queue: OrderRow[] = [
  { id: "T-104", unit: "R214 · Purple & Grey · Unilag · Block A", issue: "AC leakage into study corner", age: "34m", prio: "Urgent", tone: "danger" as const, owner: "Chuks M." },
  { id: "T-091", unit: "R108 · Purple & Grey · Oye Ekiti · Block A", issue: "Damp patch on bedroom wall", age: "3d", prio: "In progress", tone: "info" as const, owner: "Funke A." },
  { id: "T-089", unit: "R305 · Purple & Grey · Abuja · Phase 1", issue: "Bathroom tap drips continuously", age: "5d", prio: "Normal", tone: "neutral" as const, owner: "— unassigned" },
  { id: "T-102", unit: "R405 · Purple & Grey · Ibadan · Block A", issue: "Study lamp flickers", age: "1h", prio: "New", tone: "violet" as const, owner: "— unassigned" },
];

const aging = [
  ["< 30 days", "₦41.6m", 64],
  ["30–60 days", "₦4.2m", 12],
  ["60–90 days", "₦1.1m", 6],
  ["> 90 days", "₦0.4m", 3],
];

/* --------------------------------- Layout ---------------------------------- */

export default function AdminConsole() {
  const [active, setActive] = useState<ModuleKey>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeLocation, setActiveLocation] = useState<Location | "All">("All");
  const activeModule = modules.find((m) => m.key === active)!;

  return (
    <div className="min-h-screen bg-pearl-50">
      <SurfaceSwitcher placement="bl" />
      {/* ---------- sidebar (desktop) ---------- */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-primary-800 bg-gradient-to-b from-primary-950 via-primary-900 to-primary-950 lg:flex">
        <div className="px-6 pb-6 pt-7">
          <Logo />
        </div>
        <nav aria-label="Admin modules" className="scroll-slim flex-1 space-y-1 overflow-y-auto px-4 pb-6">
          {modules.map((m) => {
            const Icon = m.icon;
            const isActive = m.key === active;
            return (
              <button
                key={m.key}
                type="button"
                onClick={() => setActive(m.key)}
                aria-current={isActive ? "page" : undefined}
                className={`group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors duration-200 ${
                  isActive ? "bg-lime-400 text-primary-950" : "text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className={`h-[18px] w-[18px] ${isActive ? "text-primary-950" : "text-white/40 group-hover:text-white"}`} aria-hidden />
                {m.label}
                {m.key === "maintenance" && (
                  <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold tabular-nums ${isActive ? "bg-primary-950 text-lime-400" : "bg-danger-500/20 text-danger-500"}`}>
                    4
                  </span>
                )}
              </button>
            );
          })}
        </nav>
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-xl px-2 py-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-500/30 text-xs font-bold text-white">AO</span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">Ada Obi</p>
              <p className="truncate text-[11px] text-white/45">Exec ops admin · Bells Court</p>
            </div>
            <Settings className="ml-auto h-4 w-4 text-white/40" aria-hidden />
          </div>
        </div>
      </aside>

      {/* ---------- sidebar (mobile) ---------- */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-primary-950/70 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} aria-hidden />
          <aside className="absolute inset-y-0 left-0 w-72 bg-primary-950 shadow-2xl">
            <div className="flex items-center justify-between px-6 pb-6 pt-7">
              <Logo />
              <button type="button" onClick={() => setSidebarOpen(false)} className="cursor-pointer rounded-lg p-2 text-white/60 hover:text-white" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav aria-label="Admin modules (mobile)" className="space-y-1 px-4">
              {modules.map((m) => {
                const Icon = m.icon;
                const isActive = m.key === active;
                return (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => {
                      setActive(m.key);
                      setSidebarOpen(false);
                    }}
                    className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium ${isActive ? "bg-lime-400 text-primary-950" : "text-white/60 hover:bg-white/10 hover:text-white"}`}
                  >
                    <Icon className="h-[18px] w-[18px]" aria-hidden /> {m.label}
                  </button>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* ---------- main ---------- */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-pearl-200/80 bg-white/85 px-6 py-3.5 backdrop-blur-xl">
          <button type="button" onClick={() => setSidebarOpen(true)} className="cursor-pointer rounded-lg p-2 text-pearl-600 hover:bg-pearl-100 lg:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <p className="text-xs text-pearl-400">Operations · {activeModule.label}</p>
            <h1 className="truncate font-display text-lg font-semibold text-pearl-950">
              {activeModule.label} — {active === "dashboard" ? "Portfolio health" : "Live workspace"}
            </h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full border border-pearl-200 bg-white px-3 py-1.5 text-xs font-medium text-pearl-500 sm:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success-500" aria-hidden />
              All systems live
            </span>
            <button type="button" className="cursor-pointer hidden items-center gap-2 rounded-xl border border-pearl-200 bg-white px-3.5 py-2 text-sm text-pearl-500 hover:border-primary-600/40 md:flex" aria-label="Search">
              <Search className="h-4 w-4" aria-hidden />
              <span className="text-xs">Search room, resident, ticket…</span>
              <kbd className="rounded-md border border-pearl-200 bg-pearl-50 px-1.5 py-0.5 text-[10px] text-pearl-400">⌘K</kbd>
            </button>
            <button type="button" className="relative cursor-pointer rounded-xl border border-pearl-200 bg-white p-2 text-pearl-600 hover:border-primary-600/40" aria-label="Notifications">
              <Bell className="h-4 w-4" aria-hidden />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger-500 text-[9px] font-bold text-white">3</span>
            </button>
            <button type="button" className="relative cursor-pointer rounded-xl bg-primary-600 p-2 text-white transition-colors hover:bg-primary-700" aria-label="Add">
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-lime-400 text-[9px] font-black text-primary-950">+</span>
              <Sparkles className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </header>

        {/* ---- location filter — every list is scoped to a Purple & Grey estate ---- */}
        <div className="border-y border-pearl-200/70 bg-white">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-6 py-3">
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-pearl-400">
              <MapPin className="h-3.5 w-3.5" aria-hidden /> Estate:
            </span>
            {(["All", ...locations] as const).map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setActiveLocation(loc as Location | "All")}
                className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${activeLocation === loc ? "bg-primary-600 text-white" : "border border-pearl-200 bg-pearl-50 text-pearl-600 hover:bg-pearl-100"}`}
              >
                {loc === "All" ? "All estates" : `Purple & Grey · ${loc}`}
              </button>
            ))}
            <span className="ml-auto hidden items-center gap-2 text-xs text-pearl-400 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-500" aria-hidden /> Every building is called Purple & Grey — location is the filter.
            </span>
          </div>
        </div>

        <main className="mx-auto max-w-7xl px-6 py-8">
          {active === "dashboard" && <Dashboard location={activeLocation} />}
          {active === "billing" && <Billing location={activeLocation} />}
          {active === "maintenance" && <Maintenance location={activeLocation} />}
          {active === "requests" && <RequestsWorkspace location={activeLocation} />}
          {active === "vendors" && <VendorsWorkspace location={activeLocation} />}
          {(active === "residents" || active === "units" || active === "access" || active === "housekeeping") && (
            <ModuleWorkspace module={active} location={activeLocation} />
          )}
        </main>
      </div>
    </div>
  );
}

/* ------------------------------ Chart primitives --------------------------- */

function Sparkline({ data, accent = "#c8f24e", className = "" }: { data: number[]; accent?: string; className?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${30 - ((v - min) / (max - min || 1)) * 26}`).join(" ");
  return (
    <svg viewBox="0 0 100 34" preserveAspectRatio="none" className={className} aria-hidden>
      <polyline points={pts} fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Kpi({
  label,
  value,
  delta,
  trend = "up",
  spark,
  accent,
}: {
  label: string;
  value: string;
  delta: string;
  trend?: "up" | "down";
  spark: number[];
  accent: string;
}) {
  const Up = trend === "up" ? TrendingUp : TrendingDown;
  const down = trend === "down";
  return (
    <div className="rounded-2xl border border-pearl-200/80 bg-white p-5 shadow-soft transition-all duration-200 hover:shadow-lift">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-pearl-400">{label}</p>
        <Steps icon={MoreHorizontal} className="h-4 w-4 text-pearl-200" />
      </div>
      <p className="mt-3 font-display text-[22px] font-bold tabular-nums text-pearl-950">{value}</p>
      <p className={`mt-1 flex items-center gap-1 text-xs font-semibold tabular-nums ${down ? "text-danger-500" : "text-success-500"}`}>
        <Up className="h-3.5 w-3.5" aria-hidden /> {delta}
      </p>
      <Sparkline data={spark} accent={accent} className="mt-3 h-9 w-full" />
    </div>
  );
}

function Steps({ icon: Icon, className }: { icon: typeof MoreHorizontal; className?: string }) {
  return <Icon className={className} aria-hidden />;
}

/* ------------------------------- Dashboard --------------------------------- */

function Dashboard({ location }: { location: Location | "All" }) {
  const filteredQueue = location === "All" ? queue : queue.filter((q) => q.unit.includes(location));
  return (
    <div className="space-y-6">
      {location !== "All" && (
        <p className="rounded-xl bg-primary-50 px-4 py-3 text-sm text-primary-800">
          Showing <span className="font-semibold">Purple & Grey · {location}</span> only — all stats below are filtered to this estate.
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi label="Occupancy" value={location === "All" ? "96.2%" : "97.1%"} delta="+1.4 vs last week" spark={rchart} accent="#4c1d95" />
        <Kpi label="Rent roll · monthly" value="₦48.1m" delta="+6.8% MoM" spark={roll} accent="#c8f24e" />
        <Kpi label="Outstanding AR" value="₦5.7m" delta="−2.1 vs last week" trend="down" spark={[20, 26, 24, 30, 28, 33, 31, 36, 34, 40, 38, 42]} accent="#f04438" />
        <Kpi label="Open work orders" value={String(filteredQueue.length)} delta={`${filteredQueue.filter((q) => q.prio === "Urgent").length} urgent · filtered`} spark={[40, 36, 42, 38, 44, 40, 46, 42, 48, 44, 40, 36]} accent="#2e90fa" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* occupancy chart */}
        <div className="rounded-2xl border border-pearl-200/80 bg-white p-6 shadow-soft lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-base font-semibold text-pearl-950">Portfolio occupancy</h2>
              <p className="text-xs text-pearl-400">14 buildings · trailing 12 months</p>
            </div>
            <div className="flex items-center gap-2">
              {["12m", "6m", "30d"].map((r, i) => (
                <button key={r} type="button" className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium ${i === 1 ? "bg-primary-600 text-white" : "text-pearl-500 hover:bg-pearl-100"}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-8 flex h-52 items-end gap-2" aria-hidden>
            {roll.map((h, i) => (
              <div key={i} className="group flex flex-1 flex-col items-center gap-2">
                <div className="relative w-full">
                  <div style={{ height: `${h}%` }} className={`rounded-t-md transition-colors duration-200 ${i === roll.length - 1 ? "bg-lime-400" : "bg-primary-600/80 group-hover:bg-primary-600"}`} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-pearl-300" aria-hidden>
            <span>Sep 25</span><span>Dec</span><span>Mar</span><span>Jun</span><span>Aug 26</span>
          </div>
        </div>

        {/* maintenance queue */}
        <div className="rounded-2xl border border-pearl-200/80 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-pearl-950">Maintenance queue</h2>
            <Badge tone="danger">3 urgent</Badge>
          </div>
          <ul className="mt-4 space-y-3">
            {filteredQueue.slice(0, 4).map((q) => (
              <li key={q.id} className="cursor-pointer rounded-xl border border-pearl-100 bg-pearl-50/60 p-3.5 transition-colors hover:bg-pearl-100">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-pearl-900">
                    {q.id} <span className="font-medium text-pearl-400">· {q.unit}</span>
                  </p>
                  <span className="text-[11px] text-pearl-400">{q.age}</span>
                </div>
                <p className="mt-1 truncate text-xs text-pearl-500">{q.issue}</p>
                <div className="mt-2 flex items-center justify-between">
                  <Badge tone={q.tone}>{q.prio}</Badge>
                  <span className="text-[11px] text-pearl-400">{q.owner}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* recent activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="overflow-hidden rounded-2xl border border-pearl-200/80 bg-white shadow-soft lg:col-span-2">
          <div className="flex items-center justify-between border-b border-pearl-100 px-6 py-4">
            <h2 className="font-display text-base font-semibold text-pearl-950">Portfolio events today</h2>
            <button type="button" className="cursor-pointer flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700">
              View all <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>
          <div className="scroll-slim overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-pearl-100 text-[11px] uppercase tracking-wide text-pearl-400">
                  <th className="px-6 py-3 font-semibold">Resident</th>
                  <th className="px-6 py-3 font-semibold">Event</th>
                  <th className="px-6 py-3 font-semibold">Unit</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pearl-100">
                {[
                  ["Ada Obi", "Move-in deposit held", "R214 · Purple & Grey · Unilag · Block A", "Held", "neutral", "08:40"],
                  ["Chinedu Okoro", "Renewed room", "R102 · Purple & Grey · Unilag · Block B", "Renewed", "success", "09:12"],
                  ["Aisha Bello", "New application", "R206 · Purple & Grey · Oye Ekiti · Block A", "Docs pending", "warning", "09:47"],
                  ["Tomisin Ade", "Room switch approved", "R410 → R108 · Purple & Grey", "Approved", "success", "10:04"],
                  ["Chima Nwosu", "Contract signed", "R301 · Purple & Grey · Ibadan · Block A", "Signed", "success", "10:31"],
                  ["Femi Alade", "Move-out request", "R118 · Purple & Grey · Abuja · Phase 1", "Room check · Sat", "info", "11:02"],
                ].filter(([, , unit]) => location === "All" || (unit as string).includes(location)).map(([name, ev, unit, status, tone, time]) => (
                  <tr key={name} className="cursor-pointer transition-colors hover:bg-pearl-50/70">
                    <td className="px-6 py-3.5 font-semibold text-pearl-900">{name}</td>
                    <td className="px-6 py-3.5 text-pearl-600">{ev}</td>
                    <td className="px-6 py-3.5 text-pearl-500">{unit}</td>
                    <td className="px-6 py-3.5"><Badge tone={tone as "success"}>{status}</Badge></td>
                    <td className="px-6 py-3.5 text-xs text-pearl-400">{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-pearl-200/80 bg-white p-6 shadow-soft">
          <h2 className="font-display text-base font-semibold text-pearl-950">Rent aging</h2>
          <p className="text-xs text-pearl-400">Settled in {"< "}24h · tracked per unit</p>
          <div className="mt-6 space-y-4">
            {aging.map(([label, amount, pct]) => (
              <div key={label as string}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-pearl-600">{label}</span>
                  <span className="font-semibold tabular-nums text-pearl-900">{amount}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-pearl-100">
                  <div style={{ width: `${pct}%` }} className={`h-full rounded-full ${(pct as number) === 64 ? "bg-lime-400" : "bg-primary-600/70"}`} />
                </div>
              </div>
            ))}
          </div>
          <button type="button" className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-pearl-200 bg-white py-2.5 text-sm font-semibold text-pearl-700 transition-colors hover:border-primary-600/40 hover:text-primary-700">
            <Download className="h-4 w-4" aria-hidden /> Export AR report
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- Billing ---------------------------------- */

function Billing({ location }: { location: Location | "All" }) {
  const [bills, setBills] = useState<Record<string, string>[]>([
    { unit: "R214 · Purple & Grey · Unilag · Block A", resident: "Ada Obi", plan: "Standard 4", rent: "₦1,050,000", paid: "₦1,050,000", due: "Aug 31", tone: "success", status: "Paid" },
    { unit: "R206 · Purple & Grey · Oye Ekiti · Block A", resident: "Aisha Bello", plan: "Premium 2", rent: "₦1,600,000", paid: "₦1,600,000", due: "Aug 31", tone: "success", status: "Paid" },
    { unit: "R305 · Purple & Grey · Abuja · Phase 1", resident: "Zainab Kabir", plan: "Standard 4", rent: "₦1,050,000", paid: "—", due: "Aug 31", tone: "warning", status: "Due in 12d" },
    { unit: "R102 · Purple & Grey · Unilag · Block B", resident: "Chinedu Okoro", plan: "Standard 4", rent: "₦1,050,000", paid: "₦525,000", due: "Aug 15", tone: "info", status: "Partial" },
    { unit: "R410 · Purple & Grey · Oye Ekiti · Block B", resident: "Bryan Eze", plan: "Elite 1", rent: "₦2,400,000", paid: "—", due: "Aug 5", tone: "danger", status: "Overdue" },
    { unit: "R301 · Purple & Grey · Ibadan · Block A", resident: "Chima Nwosu", plan: "Studio", rent: "₦780,000", paid: "₦780,000", due: "Aug 22", tone: "success", status: "Paid" },
  ]);
  const [showInvoice, setShowInvoice] = useState(false);

  const addInvoice = (v: Record<string, string>) => {
    setBills((b) => [
      { unit: `${v.room || "R000"}`.includes("·") ? v.room : `${v.room || "R000"} · Purple & Grey · ${v.building || location === "All" ? "Unilag" : location} · Block A`, resident: v.resident || "—", plan: v.plan || "Standard", rent: `₦${v.amount || "0"}`, paid: "—", due: "Aug 31", tone: "warning", status: "New invoice" },
      ...b,
    ]);
  };
  const filteredBills = location === "All" ? bills : bills.filter((b) => b.unit.includes(location));

  return (
    <div className="space-y-6">
      {location !== "All" && (
        <p className="rounded-xl bg-primary-50 px-4 py-2 text-xs font-semibold text-primary-800">Filtering rent roll to Purple & Grey · {location} only</p>
      )}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi label="Billed this month" value="₦48.1m" delta="+6.8% MoM" spark={roll} accent="#c8f24e" />
        <Kpi label="Collected" value="₦43.9m" delta="91.3% collection" spark={[50, 55, 60, 58, 66, 70, 68, 76, 80, 78, 87, 91]} accent="#4c1d95" />
        <Kpi label="Open invoices" value={String(bills.filter((b) => b.status !== "Paid").length)} delta="down 9 this week" trend="down" spark={[30, 28, 26, 24, 27, 22, 20, 18, 16, 15, 13, 12]} accent="#2e90fa" />
        <Kpi label="Deposit pool" value="₦22.4m" delta="1,240 active holds" spark={[20, 22, 24, 23, 26, 28, 27, 30, 32, 31, 33, 35]} accent="#12b76a" />
      </div>
      <div className="overflow-hidden rounded-2xl border border-pearl-200/80 bg-white shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-pearl-100 px-6 py-4">
          <h2 className="font-display text-base font-semibold text-pearl-950">Rent roll — August cycle</h2>
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => setShowInvoice(true)}>New invoice</Button>
            <button type="button" className="cursor-pointer flex items-center gap-1.5 rounded-lg border border-pearl-200 px-3 py-1.5 text-xs font-medium text-pearl-600 hover:border-primary-600/40">
              <Download className="h-3.5 w-3.5" aria-hidden /> Export
            </button>
            <button type="button" className="cursor-pointer flex items-center gap-1.5 rounded-lg border border-pearl-200 px-3 py-1.5 text-xs font-medium text-pearl-600 hover:border-primary-600/40">
              All buildings <ChevronDown className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>
        </div>
        <div className="scroll-slim overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-pearl-100 text-[11px] uppercase tracking-wide text-pearl-400">
                {["Unit", "Resident", "Plan", "Rent", "Paid", "Due", "Status"].map((h) => (
                  <th key={h} className="px-6 py-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-pearl-100">
              {filteredBills.map((row) => (
                <tr key={`${row.unit}-${row.resident}`} className="cursor-pointer transition-colors hover:bg-pearl-50/70">
                  <td className="px-6 py-4 font-semibold text-pearl-900">{row.unit}</td>
                  <td className="px-6 py-4 text-pearl-700">{row.resident}</td>
                  <td className="px-6 py-4 text-pearl-500">{row.plan}</td>
                  <td className="px-6 py-4 font-medium tabular-nums text-pearl-900">{row.rent}</td>
                  <td className="px-6 py-4 tabular-nums text-pearl-600">{row.paid}</td>
                  <td className="px-6 py-4 tabular-nums text-pearl-500">{row.due}</td>
                  <td className="px-6 py-4"><Badge tone={row.tone as "success"}>{row.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showInvoice && (
        <RecordModal
          title="New invoice"
          fields={[
            { key: "resident", label: "Resident", placeholder: "e.g. Ada Obi" },
            { key: "room", label: "Room", placeholder: "e.g. R118" },
            { key: "building", label: "Building", placeholder: "e.g. Bells Court" },
            { key: "plan", label: "Plan", placeholder: "Standard 4 · Premium 2 · Studio" },
            { key: "amount", label: "Rent amount", placeholder: "e.g. 1050000" },
          ]}
          onSubmit={addInvoice}
          onClose={() => setShowInvoice(false)}
        />
      )}
    </div>
  );
}

/* ------------------------------ Maintenance -------------------------------- */

function Maintenance({ location }: { location: Location | "All" }) {
  const [orders, setOrders] = useState<OrderRow[]>(queue);
  const [showNew, setShowNew] = useState(false);

  const addOrder = (v: Record<string, string>) => {
    const tone: OrderRow["tone"] =
      v.priority === "Urgent" ? "danger" : v.priority === "High" ? "warning" : v.priority === "Normal" ? "neutral" : "info";
    setOrders((o) => [
      { id: `T-${110 + o.length}`, unit: v.unit || `R214 · Purple & Grey · ${location === "All" ? "Unilag" : location} · Block A`, issue: v.issue, age: "just now", prio: v.priority || "Normal", tone, owner: "— unassigned" },
      ...o,
    ]);
  };
  const filteredOrders = location === "All" ? orders : orders.filter((o) => o.unit.includes(location));

  return (
    <div className="space-y-6">
      {location !== "All" && (
        <p className="rounded-xl bg-primary-50 px-4 py-2 text-xs font-semibold text-primary-800">Filtering work orders to Purple & Grey · {location} only</p>
      )}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi label="Open orders" value={String(orders.length)} delta="3 urgent · SLAs held" spark={[40, 36, 42, 38, 44, 40, 46, 42, 48, 44, 40, 36]} accent="#2e90fa" />
        <Kpi label="Avg. response" value="8.5 min" delta="−31% since launch" spark={[70, 66, 68, 60, 62, 55, 50, 45, 48, 40, 36, 31]} accent="#12b76a" />
        <Kpi label="Fixed this month" value="118" delta="94% first-visit fix" spark={[30, 38, 36, 45, 52, 58, 64, 70, 76, 82, 90, 100]} accent="#c8f24e" />
        <Kpi label="Slip risk · next 48h" value="2" delta="Rooms R214 · R118" trend="down" spark={[24, 22, 20, 19, 17, 16, 14, 12, 11, 9, 8, 6]} accent="#f04438" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="overflow-hidden rounded-2xl border border-pearl-200/80 bg-white shadow-soft lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-pearl-100 px-6 py-4">
            <h2 className="font-display text-base font-semibold text-pearl-950">Work order queue</h2>
            <div className="flex flex-wrap items-center gap-2">
              {["All", "Urgent", "Today", "Mine"].map((f, i) => (
                <button key={f} type="button" className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium ${i === 0 ? "bg-primary-600 text-white" : "text-pearl-500 hover:bg-pearl-100"}`}>
                  {f}
                </button>
              ))}
              <Button size="sm" onClick={() => setShowNew(true)}>New work order</Button>
            </div>
          </div>
          <ul className="divide-y divide-pearl-100">
            {filteredOrders.map((q) => (
              <li key={q.id} className="flex cursor-pointer flex-wrap items-center gap-4 px-6 py-4 transition-colors hover:bg-pearl-50/70">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white ${q.tone === "danger" ? "bg-danger-500" : q.tone === "info" ? "bg-info-500" : q.tone === "violet" ? "bg-primary-600" : "bg-pearl-300"}`}>
                  <Wrench className="h-4 w-4" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-pearl-900">
                    {q.id} <span className="font-medium text-pearl-400">· {q.unit}</span>
                  </p>
                  <p className="truncate text-xs text-pearl-500">{q.issue}</p>
                </div>
                <div className="hidden w-40 sm:block">
                  <p className="text-[11px] text-pearl-400">Owner</p>
                  <div className="flex items-center gap-1.5 text-xs text-pearl-700">
                    <Avatar monogram={q.owner === "— unassigned" ? "?" : q.owner.split(" ")[0][0] + q.owner.split(" ")[1]?.[0]} />
                    {q.owner}
                  </div>
                </div>
                <Badge tone={q.tone}>{q.prio}</Badge>
                <span className="text-xs tabular-nums text-pearl-400">{q.age}</span>
                <MoreHorizontal className="h-4 w-4 text-pearl-300" aria-hidden />
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-pearl-200/80 bg-white p-6 shadow-soft">
            <h2 className="font-display text-base font-semibold text-pearl-950">Fix rate by category</h2>
            <div className="mt-5 space-y-4">
              {[
                ["Plumbing", 92, "#c8f24e"],
                ["Electrical", 88, "#4c1d95"],
                ["HVAC", 79, "#9772e6"],
                ["Fixtures", 74, "#2e90fa"],
              ].map(([label, pct, color]) => (
                <div key={label as string}>
                  <div className="mb-1.5 flex justify-between text-xs">
                    <span className="text-pearl-600">{label}</span>
                    <span className="font-semibold tabular-nums text-pearl-900">{pct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-pearl-100">
                    <div style={{ width: `${pct}%`, background: color as string }} className="h-full rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-lime-400/50 bg-primary-950 p-6 shadow-lift">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-lime-400">
              <Gauge className="h-4 w-4" aria-hidden /> Preventive rounds
            </p>
            <p className="mt-3 font-display text-3xl font-bold text-white tabular-nums">7 / 14</p>
            <p className="mt-1 text-sm text-white/60">buildings checked this week</p>
            <button type="button" className="mt-5 w-full cursor-pointer rounded-xl bg-lime-400 py-2.5 text-sm font-bold text-primary-950 transition-colors hover:bg-lime-300">
              Open next round
            </button>
          </div>
        </div>
      </div>
      {showNew && (
        <RecordModal
          title="New work order"
          fields={[
            { key: "issue", label: "What's the issue?", placeholder: "e.g. Bathroom tap drips continuously" },
            { key: "unit", label: "Unit / room", placeholder: "e.g. R305 · Lumen Row" },
            { key: "priority", label: "Priority", placeholder: "Normal · High · Urgent" },
          ]}
          onSubmit={addOrder}
          onClose={() => setShowNew(false)}
        />
      )}
    </div>
  );
}

/* --------------------------- Requests workspace ----------------------------- */

function RequestsWorkspace({ location }: { location: Location | "All" }) {
  const [reqs, setReqs] = useState<ServiceRequest[]>(requestsSeed);
  const [status, setStatus] = useState<RequestStatus | "All">("All");
  const [showLog, setShowLog] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  const scoped = location === "All" ? reqs : reqs.filter((r) => r.location === location);
  const count = (s: RequestStatus) => scoped.filter((r) => r.status === s).length;
  const unassigned = scoped.filter((r) => !r.assignedVendorId).length;
  const logRequest = (v: Record<string, string>) => {
    const cat = categories.find((c) => v.category && v.category.toLowerCase().includes(c.toLowerCase().slice(0, 8)));
    const category = (cat ?? ("Plumbing" as ServiceCategory)) as ServiceCategory;
    const loc: Location = (v.location as Location) ?? (location !== "All" ? location : "Unilag");
    setReqs((rs) => [
      {
        id: `SR-${130 + rs.length}`,
        kind: "service",
        resident: v.resident || "—",
        room: v.room || `R000 · Purple & Grey · ${loc} · Block A`,
        location: loc,
        category,
        title: v.detail || "New request",
        detail: v.detail || "",
        priority: "Normal",
        status: "requested",
        created: "Just now",
        assignedVendorId: null,
      },
      ...rs,
    ]);
    setNote(`${v.resident || "Resident"} · Purple & Grey · ${loc} · needs a ${category} vendor`);
  };
  const assignVendor = (id: string, vendorId: string | null) => {
    setReqs((rs) => rs.map((r) => (r.id === id ? { ...r, assignedVendorId: vendorId } : r)));
    if (vendorId) {
      const v = vendorsSeed.find((x) => x.id === vendorId);
      setNote(`${id} → ${v?.name ?? vendorId} (${v?.category} · Purple & Grey · ${v?.location}) — assigned. Vendor will propose a time to you.`);
    } else setNote(`${id} unassigned — back in triage.`);
  };

  return (
    <div className="space-y-6">
      {location !== "All" && (
        <p className="rounded-xl bg-primary-50 px-4 py-2 text-xs font-semibold text-primary-800">Filtering requests to Purple & Grey · {location} only — {scoped.length} requests in this estate</p>
      )}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi label="Open requests" value={String(scoped.length - count("resolved"))} delta={`${unassigned} unassigned · needs triage`} spark={[34, 32, 38, 36, 40, 38, 36, 40, 44, 42, 46, 44]} accent="#2e90fa" />
        <Kpi label="With admin" value={String(count("requested"))} delta="Triage & assign a vendor" spark={[20, 24, 22, 26, 24, 28, 26, 30, 28, 32, 30, 34]} accent="#f79009" />
        <Kpi label="With vendor + admin" value={String(count("time-proposed") + count("slotted"))} delta="Time agreed via admin" spark={[26, 28, 24, 30, 28, 32, 30, 26, 28, 30, 28, 32]} accent="#9772e6" />
        <Kpi label="Resolved" value={String(count("resolved"))} delta="Avg. 2.9 days to close" spark={[12, 18, 20, 26, 24, 32, 30, 36, 42, 46, 52, 58]} accent="#12b76a" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-pearl-200/80 bg-white shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-pearl-100 px-6 py-4">
          <h2 className="font-display text-base font-semibold text-pearl-950">Every resident request — admin is the relay {location !== "All" ? `· Purple & Grey · ${location}` : ""}</h2>
          <Button size="sm" onClick={() => setShowLog(true)}>Log request</Button>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 border-b border-pearl-100 px-6 py-3">
          {(["All", ...requestStatuses] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s as RequestStatus | "All")}
              className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium ${status === s ? "bg-primary-600 text-white" : "text-pearl-500 hover:bg-pearl-100"}`}
            >
              {s === "All" ? "All statuses" : statusMeta[s as RequestStatus].label}
            </button>
          ))}
        </div>
        <ul className="divide-y divide-pearl-100">
          {(status === "All" ? scoped : scoped.filter((r) => r.status === status)).map((r) => {
            const optsAll = vendorsSeed.filter((v) => v.category === r.category);
            const optsLocal = optsAll.filter((v) => v.location === r.location);
            const opts = optsLocal.length ? optsLocal : optsAll;
            const assigned = r.assignedVendorId ? vendorsSeed.find((v) => v.id === r.assignedVendorId) : null;
            return (
              <li key={r.id} className="flex flex-wrap items-center gap-4 px-6 py-4 transition-colors hover:bg-pearl-50/70">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white bg-primary-600">
                  <Inbox className="h-4 w-4" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-pearl-900">
                    {r.title}
                    <span className="font-medium text-pearl-400"> · {r.id}</span>
                  </p>
                  <p className="truncate text-xs text-pearl-500">
                    {r.resident} · {r.room} · {r.category} · <span className="font-semibold text-primary-700">Purple & Grey · {r.location}</span>
                  </p>
                  <p className="mt-1 flex flex-wrap items-center gap-2 text-[11px]">
                    {assigned ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-success-50 px-2 py-0.5 font-semibold text-success-700">● {assigned.name} · {assigned.location}</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-warning-50 px-2 py-0.5 font-semibold text-warning-700">○ Unassigned</span>
                    )}
                    <Badge tone="violet">{r.location}</Badge>
                    <span className="text-pearl-400">{statusMeta[r.status].hint}</span>
                  </p>
                </div>
                <span className="hidden text-xs font-semibold text-primary-700 sm:block">{r.priority}</span>
                <Badge tone={statusMeta[r.status].tone}>{statusMeta[r.status].label}</Badge>
                <span className="hidden text-xs tabular-nums text-pearl-400 lg:block">
                  {r.status === "time-proposed" && r.proposed ? `Proposed ${r.proposed}` : r.status === "slotted" && r.slotted ? `Slotted ${r.slotted}` : r.created}
                </span>
                <select
                  value={r.assignedVendorId ?? ""}
                  onChange={(e) => assignVendor(r.id, e.target.value || null)}
                  className="cursor-pointer rounded-lg border border-pearl-200 bg-white px-2.5 py-1.5 text-xs font-medium text-pearl-700 outline-none hover:border-primary-600/40 focus:border-primary-600"
                  aria-label={`Assign vendor for ${r.id}`}
                >
                  <option value="">— Assign vendor —</option>
                  {opts.map((v) => (
                    <option key={v.id} value={v.id}>{v.name} · Purple & Grey · {v.location}{v.status === "paused" ? " · paused" : ""}</option>
                  ))}
                </select>
              </li>
            );
          })}
        </ul>
      </div>

      {note && (
        <div className="rounded-2xl border border-lime-400/50 bg-primary-950 p-6 shadow-lift">
          <p className="text-sm font-medium text-white">{note}</p>
          <button type="button" onClick={() => setNote(null)} className="mt-3 cursor-pointer text-xs font-semibold text-lime-400 hover:text-lime-300">
            Dismiss
          </button>
        </div>
      )}

      {showLog && (
        <RecordModal
          title="Log request"
          fields={[
            { key: "resident", label: "Resident", placeholder: "e.g. Ada Obi" },
            { key: "room", label: "Room", placeholder: "e.g. R214 · Bells Court" },
            { key: "category", label: "Trade", placeholder: "Plumbing · Laundry · Food & Kitchen …" },
            { key: "detail", label: "What needs doing", placeholder: "e.g. Shower head needs descaling" },
          ]}
          onSubmit={(v) => {
            logRequest(v);
            setShowLog(false);
          }}
          onClose={() => setShowLog(false)}
        />
      )}
    </div>
  );
}

/* --------------------------- Generic workspace ------------------------------ */

const moduleContent: Record<ModuleKey, { desc: string; stats: [string, string][]; rows: [string, string, string][] }> = {
  residents: {
    desc: "1,240 active residents · 96.2% occupied across Purple & Grey estates",
    stats: [["12,400+", "Residents on-platform"], ["420", "Units under ops"], ["18", "New this week"]],
    rows: [
      ["Ada Obi", "R214 · Purple & Grey · Unilag · Block A", "Standard 4 · Unilag · KYC verified"],
      ["Chinedu Okoro", "R102 · Purple & Grey · Unilag · Block B", "Renewed · Unilag · paid in full"],
      ["Aisha Bello", "R206 · Purple & Grey · Oye Ekiti · Block A", "Docs pending · Oye Ekiti · guarantor"],
      ["Zainab Kabir", "R305 · Purple & Grey · Abuja · Phase 1", "Rent due in 12 days · Abuja"],
      ["Tunde Yusuf", "R114 · Purple & Grey · Port Harcourt · Block A", "Port Harcourt · docs complete"],
      ["Chima Nwosu", "R301 · Purple & Grey · Ibadan · Block A", "Ibadan · waitlisted"],
    ],
  },
  units: {
    desc: "Portfolio room map · 420 units · 5 estates · every building is Purple & Grey",
    stats: [["420", "Total units"], ["404", "Occupied"], ["16", "Available"]],
    rows: [
      ["R214 · Purple & Grey · Unilag · Block A", "Standard 4", "Occupied · Ada Obi · Unilag"],
      ["R305 · Purple & Grey · Abuja · Phase 1", "Standard 4", "Occupied · Zainab Kabir · Abuja"],
      ["R006 · Purple & Grey · Port Harcourt · Block A", "Premium 2", "Available · ready today · Port Harcourt"],
      ["R118 · Purple & Grey · Oye Ekiti · Block A", "Studio", "Move-out pending · Sat · Oye Ekiti"],
      ["R401 · Purple & Grey · Ibadan · Block A", "Furniture", "Occupied · Lara Jones · Ibadan"],
    ],
  },
  access: {
    desc: "Key rotation · visitor passes · entry audit trail — filtered by estate",
    stats: [["1,240", "Live digital keys"], ["86", "Visitors today"], ["0", "Open incidents"]],
    rows: [
      ["R214 · Purple & Grey · Unilag · Block A", "Ada Obi · owner", "Keys rotated · 23 Aug · Unilag"],
      ["Gatehouse · Purple & Grey · Oye Ekiti", "Visitor — Kemi T.", "Pass issued · expires 10pm · Oye Ekiti"],
      ["R118 · Purple & Grey · Abuja · Phase 1", "Move-out", "Keys retire Sat 9am · Abuja"],
      ["Lounge · Purple & Grey · Ibadan · Block A", "24/7 billiards", "Unlock via resident key · Ibadan"],
    ],
  },
  housekeeping: {
    desc: "Cleaning rounds · linen cycles · room checks — by estate",
    stats: [["118", "Room checks / wk"], ["342", "Linen sets in cycle"], ["4.8", "Avg. cleanliness score"]],
    rows: [
      ["R214 · Purple & Grey · Unilag · Block A", "Deep clean", "Scored 4.9 · 34m ago · Unilag"],
      ["R118 · Purple & Grey · Oye Ekiti · Block A", "Post move-out", "Scheduled Sat 9am · Oye Ekiti"],
      ["Lounge · Purple & Grey · Abuja · Phase 1", "Evening tidy", "Done · 5:40pm · Abuja"],
      ["R305 · Purple & Grey · Port Harcourt · Block A", "Weekly round", "Due tomorrow · Port Harcourt"],
      ["R401 · Purple & Grey · Ibadan · Block A", "Weekly round", "Due Thu · Ibadan"],
    ],
  },
  dashboard: { desc: "Portfolio health at a glance", stats: [], rows: [] },
  billing: { desc: "Rent roll", stats: [], rows: [] },
  maintenance: { desc: "Work orders", stats: [], rows: [] },
  requests: { desc: "Every resident request & complaint in one place", stats: [], rows: [] },
  vendors: { desc: "Vendor registry", stats: [], rows: [] },
};

/* Each module's primary action — verbs matched to what the module actually does. */
const actionMeta: Partial<Record<ModuleKey, { label: string; done: string; fields: { key: string; label: string; placeholder: string }[] }>> = {
  residents: {
    label: "Add resident",
    done: "Provisioned & onboarded",
    fields: [
      { key: "name", label: "Full name", placeholder: "e.g. Ada Obi" },
      { key: "room", label: "Room", placeholder: "e.g. R118 · Bells Court" },
      { key: "plan", label: "Room plan", placeholder: "Standard 4 · Premium 2 · Studio" },
    ],
  },
  units: {
    label: "Add unit",
    done: "Unit created",
    fields: [
      { key: "unit", label: "Unit", placeholder: "e.g. R405" },
      { key: "building", label: "Building", placeholder: "e.g. Metro House" },
      { key: "plan", label: "Plan", placeholder: "Standard 4 · Studio · Elite 1" },
    ],
  },
  access: {
    label: "Grant access",
    done: "Access granted",
    fields: [
      { key: "subject", label: "Who", placeholder: "e.g. Visitor — Kemi T." },
      { key: "object", label: "Access to", placeholder: "e.g. Gatehouse B · R214" },
      { key: "expiry", label: "Expires", placeholder: "e.g. Today · 10pm" },
    ],
  },
  housekeeping: {
    label: "Schedule round",
    done: "Round scheduled",
    fields: [
      { key: "unit", label: "Area", placeholder: "e.g. R305 · Lumen Row" },
      { key: "round", label: "Round type", placeholder: "Deep clean · Weekly · Post move-out" },
      { key: "when", label: "When", placeholder: "e.g. Tomorrow · 9am" },
    ],
  },
  requests: {
    label: "Log request",
    done: "Logged & routed",
    fields: [
      { key: "resident", label: "Resident", placeholder: "e.g. Ada Obi" },
      { key: "room", label: "Room", placeholder: "e.g. R214 · Bells Court" },
      { key: "category", label: "Trade", placeholder: "Plumbing · Laundry · Food & Kitchen …" },
      { key: "detail", label: "What needs doing", placeholder: "e.g. Shower head needs descaling" },
    ],
  },
  dashboard: {
    label: "Generate report",
    done: "Report queued",
    fields: [
      { key: "report", label: "Report", placeholder: "Occupancy · Rent roll · AR aging" },
      { key: "range", label: "Period", placeholder: "e.g. Last 30 days" },
      { key: "format", label: "Format", placeholder: "PDF · CSV" },
    ],
  },
};

function RecordModal({
  title,
  fields,
  onSubmit,
  onClose,
}: {
  title: string;
  fields: { key: string; label: string; placeholder: string }[];
  onSubmit: (values: Record<string, string>) => void;
  onClose: () => void;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-primary-950/60 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div className="relative w-full max-w-md rounded-2xl border border-pearl-200 bg-white p-6 shadow-lift">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-pearl-950">{title}</h3>
          <button type="button" onClick={onClose} className="cursor-pointer rounded-lg p-1.5 text-pearl-400 transition-colors hover:bg-pearl-100 hover:text-pearl-700" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-5 space-y-4">
          {fields.map((f) => (
            <label key={f.key} className="block">
              <span className="mb-1.5 block text-xs font-semibold text-pearl-600">{f.label}</span>
              <input
                value={values[f.key] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                className="w-full rounded-xl border border-pearl-200 bg-pearl-50 px-4 py-2.5 text-sm text-pearl-800 outline-none transition-colors placeholder:text-pearl-300 focus:border-primary-600 focus:bg-white"
              />
            </label>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="cursor-pointer rounded-xl border border-pearl-200 px-4 py-2 text-sm font-medium text-pearl-600 transition-colors hover:bg-pearl-50">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              if (fields.some((f) => !values[f.key])) return;
              onSubmit(values);
              onClose();
            }}
            className="cursor-pointer rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
          >
            {title}
          </button>
        </div>
      </div>
    </div>
  );
}

function ModuleWorkspace({ module, location }: { module: ModuleKey; location: Location | "All" }) {
  const data = moduleContent[module];
  const ModuleIcon = modules.find((m) => m.key === module)!.icon;
  const meta = actionMeta[module];
  const [rows, setRows] = useState(data.rows);
  const [open, setOpen] = useState(false);
  const filteredRows = location === "All" ? rows : rows.filter(([, b, c]) => `${b} ${c}`.includes(location));

  const submit = (v: Record<string, string>) => {
    const keys = Object.keys(v);
    const a = v[keys[0]] || "New record";
    const b = v[keys[1]] || "—";
    const c = v[keys[2]] ? `${v[keys[2]]} · ${meta?.done.toLowerCase()}` : `${meta?.done ?? "Created"} · just now`;
    setRows((r) => [[a, b, c], ...r]);
  };

  return (
    <div className="space-y-6">
      {location !== "All" && (
        <p className="rounded-xl bg-primary-50 px-4 py-2 text-xs font-semibold text-primary-800">Filtering {module} to Purple & Grey · {location} only — {filteredRows.length} of {rows.length} records</p>
      )}
      <div className="rounded-2xl border border-pearl-200/80 bg-white p-6 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600 text-white">
              <ModuleIcon className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold text-pearl-950">{module === "access" ? "Access & security" : module[0].toUpperCase() + module.slice(1)} {location !== "All" ? `· Purple & Grey · ${location}` : ""}</h2>
              <p className="text-sm text-pearl-500">{data.desc}</p>
            </div>
          </div>
          {meta && (
            <Button size="sm" onClick={() => setOpen(true)}>
              <Plus className="h-4 w-4" aria-hidden /> {meta.label}
            </Button>
          )}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {data.stats.map(([v, l]) => (
            <div key={l} className="rounded-xl border border-pearl-100 bg-pearl-50/60 p-4">
              <p className="font-display text-2xl font-bold tabular-nums text-pearl-950">{v}</p>
              <p className="mt-0.5 text-xs text-pearl-500">{l}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border border-pearl-200/80 bg-white shadow-soft">
        <div className="border-b border-pearl-100 px-6 py-4">
          <h3 className="font-display text-base font-semibold text-pearl-950">Live records</h3>
        </div>
        <div className="scroll-slim overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-pearl-100 text-[11px] uppercase tracking-wide text-pearl-400">
                {["Subject", "Entity", "Detail"].map((h) => (
                  <th key={h} className="px-6 py-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-pearl-100">
              {filteredRows.map(([a, b, c]) => (
                <tr key={`${a}-${b}`} className="cursor-pointer transition-colors hover:bg-pearl-50/70">
                  <td className="px-6 py-4 font-semibold text-pearl-900">{a}</td>
                  <td className="px-6 py-4 text-pearl-700">{b}</td>
                  <td className="px-6 py-4 text-pearl-500">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {open && meta && (
        <RecordModal title={meta.label} fields={meta.fields} onSubmit={submit} onClose={() => setOpen(false)} />
      )}
    </div>
  );
}

/* --------------------------- Vendors workspace ------------------------------ */

function VendorsWorkspace({ location }: { location: Location | "All" }) {
  const [vendors, setVendors] = useState<Vendor[]>(
    vendorsSeed.map((v) => ({
      ...v,
      orders: requestsByCategory(requestsSeed, v.category).filter((r) => r.status !== "resolved" && r.location === v.location).length,
    })),
  );
  const [showAdd, setShowAdd] = useState(false);

  const toggleVendor = (id: string) =>
    setVendors((vs) => vs.map((v) => (v.id === id ? { ...v, status: v.status === "active" ? "paused" : "active", sla: v.status === "active" ? "n/a — paused" : v.sla } : v)));

  const addVendor = (v: Record<string, string>) => {
    const category = v.category as ServiceCategory;
    const loc = (v.location as Location) ?? (location !== "All" ? location : "Unilag");
    const vendor: Vendor = {
      id: `V-${String(vendors.length + 1).padStart(2, "0")}`,
      name: v.name,
      category,
      location: loc,
      phone: v.phone,
      scope: (v.scope || `Purple & Grey · ${loc} — Block A`).split(",").map((s) => s.trim()),
      status: "active",
      orders: 0,
      sla: v.sla?.trim() ? v.sla.trim() : "new — first request pending",
    };
    setVendors((vs) => [vendor, ...vs]);
  };

  const scopedVendors = location === "All" ? vendors : vendors.filter((v) => v.location === location);
  const active = scopedVendors.filter((v) => v.status === "active").length;
  const openVolume = scopedVendors.reduce((sum, v) => sum + v.orders, 0);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-lime-400/50 bg-primary-950 p-6 shadow-lift">
        <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-xl text-sm text-white/70">
            <span className="mb-1 block font-display text-base font-semibold text-white">Each vendor is scoped to one trade and one estate.</span>
            Creating a vendor provisions their access to <span className="font-semibold text-lime-400">/vendor</span> — they only ever
            see requests for their trade in <span className="font-semibold text-lime-400">Purple & Grey · {location === "All" ? "their location" : location}</span>, nothing else in the network.
          </p>
          <Button variant="lime" size="sm" onClick={() => setShowAdd(true)}>
            <Plus className="h-4 w-4" aria-hidden /> Add vendor
          </Button>
        </div>
      </div>

      {location !== "All" && (
        <p className="rounded-xl bg-primary-50 px-4 py-2 text-xs font-semibold text-primary-800">Filtering vendors to Purple & Grey · {location} only — {scopedVendors.length} local providers</p>
      )}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[
          { label: "Active vendors", value: String(active), sub: `${scopedVendors.length} ${location === "All" ? "registered" : `in Purple & Grey · ${location}`}`, icon: HardHat },
          { label: "Paused", value: String(scopedVendors.length - active), sub: "no new requests routed", icon: ToggleLeft },
          { label: "Open request volume", value: String(openVolume), sub: location === "All" ? "across active trades" : `in Purple & Grey · ${location}`, icon: Wrench },
        ].map(({ label, value, sub, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-pearl-200/80 bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-pearl-400">{label}</p>
              <Icon className="h-4 w-4 text-primary-600" aria-hidden />
            </div>
            <p className="mt-3 font-display text-3xl font-bold tabular-nums text-pearl-950">{value}</p>
            <p className="mt-1 text-xs text-pearl-500">{sub}</p>
          </div>
        ))}
      </div>

        <div className="overflow-hidden rounded-2xl border border-pearl-200/80 bg-white shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-pearl-100 px-6 py-4">
          <h2 className="font-display text-base font-semibold text-pearl-950">Vendor registry {location !== "All" ? `· Purple & Grey · ${location}` : ""}</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((c, i) => (
              <button key={c} type="button" className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium ${i === 0 ? "bg-primary-600 text-white" : "text-pearl-500 hover:bg-pearl-100"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="scroll-slim overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-pearl-100 text-[11px] uppercase tracking-wide text-pearl-400">
                {["Vendor", "Trade", "Location", "Phone", "Scope", "Open requests", "Status", ""].map((h) => (
                  <th key={h} className="px-6 py-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-pearl-100">
              {scopedVendors.map((v) => (
                <tr key={v.id} className="cursor-pointer transition-colors hover:bg-pearl-50/70">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold ${v.status === "paused" ? "bg-pearl-100 text-pearl-400" : "bg-primary-600 text-white"}`}>
                        {v.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                      </span>
                      <div>
                        <p className="font-semibold text-pearl-900">{v.name}</p>
                        <p className="text-[11px] text-pearl-400">{v.id} · {v.sla}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4"><Badge tone="violet">{v.category}</Badge></td>
                  <td className="px-6 py-4"><Badge tone="neutral">Purple & Grey · {v.location}</Badge></td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-pearl-600"><Phone className="h-3.5 w-3.5 text-pearl-400" aria-hidden /> {v.phone}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-pearl-600"><MapPin className="h-3.5 w-3.5 text-pearl-400" aria-hidden /> {v.scope.join(", ")}</span>
                  </td>
                  <td className="px-6 py-4 font-medium tabular-nums text-pearl-900">{v.orders}</td>
                  <td className="px-6 py-4">
                    <Badge tone={v.status === "active" ? "success" : "neutral"}>{v.status === "active" ? "Active" : "Paused"}</Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => toggleVendor(v.id)}
                      aria-pressed={v.status === "active"}
                      className={`cursor-pointer inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${v.status === "active" ? "bg-warning-50 text-warning-700 hover:bg-warning-100" : "bg-success-50 text-success-600 hover:bg-success-100"}`}
                    >
                      <ToggleLeft className="h-4 w-4" aria-hidden /> {v.status === "active" ? "Pause" : "Resume"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && (
        <AddVendorModal
          onClose={() => setShowAdd(false)}
          onAdd={(v) => {
            addVendor(v);
          }}
        />
      )}
    </div>
  );
}

function AddVendorModal({ onAdd, onClose }: { onAdd: (v: Record<string, string>) => void; onClose: () => void }) {
  const [values, setValues] = useState<Record<string, string>>({ name: "", phone: "", category: categories[0], location: locations[0], scope: "", sla: "" });
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Add vendor">
      <div className="absolute inset-0 bg-primary-950/60 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div className="relative w-full max-w-md rounded-2xl border border-pearl-200 bg-white p-6 shadow-lift">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-pearl-950">Add vendor</h3>
          <button type="button" onClick={onClose} className="cursor-pointer rounded-lg p-1.5 text-pearl-400 transition-colors hover:bg-pearl-100 hover:text-pearl-700" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-5 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-pearl-600">Company name</span>
            <input
              value={values.name}
              onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
              placeholder="e.g. Chuks Electricals"
              className="w-full rounded-xl border border-pearl-200 bg-pearl-50 px-4 py-2.5 text-sm text-pearl-800 outline-none transition-colors placeholder:text-pearl-300 focus:border-primary-600 focus:bg-white"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-pearl-600">Phone (sets up their /vendor login)</span>
            <input
              value={values.phone}
              onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
              placeholder="e.g. 0803 111 2044"
              className="w-full rounded-xl border border-pearl-200 bg-pearl-50 px-4 py-2.5 text-sm text-pearl-800 outline-none transition-colors placeholder:text-pearl-300 focus:border-primary-600 focus:bg-white"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-pearl-600">Trade — sets what they can see</span>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setValues((v) => ({ ...v, category: c }))}
                  aria-pressed={values.category === c}
                  className={`cursor-pointer rounded-xl border px-3 py-2 text-left text-xs font-semibold transition-colors ${
                    values.category === c ? "border-primary-600 bg-primary-600 text-white" : "border-pearl-200 bg-pearl-50 text-pearl-600 hover:bg-pearl-100"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-pearl-600">Estate — which Purple & Grey campus they serve</span>
            <div className="grid grid-cols-2 gap-2">
              {locations.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setValues((v) => ({ ...v, location: loc }))}
                  aria-pressed={values.location === loc}
                  className={`cursor-pointer rounded-xl border px-3 py-2 text-left text-xs font-semibold transition-colors ${values.location === loc ? "border-primary-600 bg-primary-600 text-white" : "border-pearl-200 bg-pearl-50 text-pearl-600 hover:bg-pearl-100"}`}
                >
                  Purple & Grey · {loc}
                </button>
              ))}
            </div>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-pearl-600">Scope (comma-separated blocks — inside that estate)</span>
            <input
              value={values.scope}
              onChange={(e) => setValues((v) => ({ ...v, scope: e.target.value }))}
              placeholder="e.g. Block A, Block B"
              className="w-full rounded-xl border border-pearl-200 bg-pearl-50 px-4 py-2.5 text-sm text-pearl-800 outline-none transition-colors placeholder:text-pearl-300 focus:border-primary-600 focus:bg-white"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-pearl-600">SLA commitment (shown on their /vendor profile)</span>
            <input
              value={values.sla}
              onChange={(e) => setValues((v) => ({ ...v, sla: e.target.value }))}
              placeholder="e.g. All booked jobs start within 48 hrs"
              className="w-full rounded-xl border border-pearl-200 bg-pearl-50 px-4 py-2.5 text-sm text-pearl-800 outline-none transition-colors placeholder:text-pearl-300 focus:border-primary-600 focus:bg-white"
            />
          </label>
        </div>
        <div className="mt-6 flex items-center justify-end gap-2">
          <button type="button" onClick={onClose} className="cursor-pointer rounded-xl border border-pearl-200 px-4 py-2 text-sm font-medium text-pearl-600 transition-colors hover:bg-pearl-50">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              if (!values.name.trim() || !values.phone.trim()) return;
              onAdd(values);
              onClose();
            }}
            className="cursor-pointer rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
          >
            Create & give access
          </button>
        </div>
        <p className="mt-4 flex items-center gap-2 rounded-lg bg-success-50 px-3 py-2 text-[11px] text-success-600">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          They&rsquo;ll receive access to /vendor, scoped to their trade only.
        </p>
      </div>
    </div>
  );
}

/* -------------------------------- Avatar ----------------------------------- */

function Avatar({ monogram }: { monogram: string }) {
  return (
    <span className={`flex h-5 w-5 items-center justify-center rounded-full bg-primary-100 text-[9px] font-bold text-primary-700`}>
      {monogram}
    </span>
  );
}