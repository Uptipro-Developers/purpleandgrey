"use client";

import { useState } from "react";
import {
  CalendarCheck2,
  Check,
  ChevronDown,
  Clock3,
  Hourglass,
  LifeBuoy,
  MapPin,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import SurfaceSwitcher from "@/components/surface-switcher";
import { Badge, Logo } from "@/components/ui";
import {
  requestsForVendor,
  requestsSeed,
  statusMeta,
  timeSlots,
  type RequestStatus,
  type Vendor,
  vendorsSeed,
} from "@/lib/data";

export default function VendorPortal() {
  const [vendorId, setVendorId] = useState<Vendor["id"]>("V-01");
  const [requests, setRequests] = useState(requestsSeed);
  const [draft, setDraft] = useState<Record<string, RequestStatus>>({});
  const vendor = vendorsSeed.find((v) => v.id === vendorId)!;
  const queue = requestsForVendor(requests, vendor.id);
  const open = queue.filter((r) => r.status !== "resolved");

  const advance = (id: string, to: RequestStatus) => {
    setRequests((rs) =>
      rs.map((r) => {
        if (r.id !== id) return r;
        const next = { ...r, status: to };
        if (to === "time-proposed") next.proposed = draft[id] ?? "Thu · 4:00pm";
        if (to === "slotted") next.slotted = draft[id] ?? r.proposed ?? "Thu · 4:00pm";
        return next;
      }),
    );
  };

  return (
    <div className="min-h-screen bg-pearl-50">
      <SurfaceSwitcher placement="bl" />

      {/* ------------------------------ top bar ------------------------------ */}
      <header className="aurora relative overflow-hidden">
        <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
          <Logo />
          <p className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-lime-400 lg:flex">
            <ShieldCheck className="h-4 w-4" aria-hidden /> Vendor workspace
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* identity strip */}
        <div className="glass flex flex-wrap items-center gap-4 rounded-2xl p-5">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-lift">
            <Wrench className="h-7 w-7" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-xs text-pearl-400">Signed in as vendor</p>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-xl font-bold text-pearl-950">{vendor.name}</h1>
              <Badge tone="success">Active</Badge>
            </div>
            <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-pearl-500">
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-primary-600" aria-hidden /> {vendor.scope.join(" · ")}</span>
              <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-primary-600" aria-hidden /> {vendor.phone}</span>
            </p>
          </div>
          <div className="ml-auto w-full sm:w-auto">
            <label htmlFor="vendor-switch" className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-pearl-400">
              Preview another vendor · data stays scoped to them
            </label>
            <div className="relative">
              <select
                id="vendor-switch"
                value={vendorId}
                onChange={(e) => setVendorId(e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-xl border border-pearl-200 bg-white px-4 py-2.5 pr-9 text-sm font-medium text-pearl-800 outline-none transition-colors hover:border-primary-600/40 focus:border-primary-600 sm:w-72"
              >
                {vendorsSeed.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} — {v.category} {v.status === "paused" ? "(paused)" : ""}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-pearl-400" aria-hidden />
            </div>
          </div>
        </div>

        {/* scope hint — admin is the relay */}
        <p className="mt-4 flex items-center gap-2 rounded-xl bg-primary-50 px-4 py-3 text-sm text-primary-800">
          <LifeBuoy className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
          You only see jobs <span className="font-semibold">assigned to you by the admin team</span> for{" "}
          <span className="font-semibold">{vendor.category}</span>. Propose a time — admin confirms it with the resident. You don’t contact residents directly.
        </p>

        {/* KPIs */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { icon: Hourglass, label: "Assigned to you", value: String(open.filter((r) => r.status === "requested").length), sub: "send a time to admin" },
            { icon: CalendarCheck2, label: "With admin", value: String(open.filter((r) => r.status === "time-proposed").length), sub: "admin confirming with resident" },
            { icon: Clock3, label: "Slotted", value: String(open.filter((r) => r.status === "slotted").length), sub: "go at the agreed time" },
            { icon: Check, label: "Resolved", value: String(queue.filter((r) => r.status === "resolved").length), sub: "closed via admin" },
          ].map(({ icon: Icon, label, value, sub }) => (
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

        {/* queue — only admin-assigned */}
        <section aria-label="Your jobs" className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-lg font-semibold text-pearl-950">Jobs assigned to you — {vendor.category}</h2>
            <div className="flex flex-wrap gap-2">
              {["All", "Awaiting time", "Awaiting resident", "Slotted", "In progress"].map((f, i) => (
                <button key={f} type="button" className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium ${i === 0 ? "bg-primary-600 text-white" : "text-pearl-500 hover:bg-pearl-100"}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <ul className="mt-4 space-y-3">
            {queue.map((r) => {
              const meta = statusMeta[r.status];
              const isDraft = r.status === "requested";
              const canAdvance = r.status !== "resolved";
              return (
                <li key={r.id} className="rounded-2xl border border-pearl-200/80 bg-white p-5 shadow-soft transition-all duration-200 hover:shadow-lift">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-pearl-400">{r.id}</span>
                        <Badge tone={r.priority === "Urgent" ? "danger" : r.priority === "High" ? "warning" : "neutral"}>
                          {r.priority}
                        </Badge>
                        <Badge tone={meta.tone}>{meta.label}</Badge>
                      </div>
                      <h3 className="mt-2 font-display text-base font-semibold text-pearl-950">{r.title}</h3>
                      <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-pearl-500">{r.detail}</p>
                    </div>
                    <div className="shrink-0 text-sm text-pearl-500">
                      <p className="font-semibold text-pearl-900">{r.resident}</p>
                      <p className="text-xs">{r.room}</p>
                      <p className="mt-1 text-xs text-pearl-400">{r.created}</p>
                    </div>
                  </div>

                  {/* proposed / slotted time */}
                  {(r.proposed || r.slotted) && (
                    <p className="mt-3 inline-flex items-center gap-2 rounded-lg bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700">
                      <Clock3 className="h-3.5 w-3.5" aria-hidden />
                      {r.slotted ? `Slotted · ${r.slotted}` : `Proposed · ${r.proposed}`}
                    </p>
                  )}

                  {isDraft && canAdvance && (
                    <TimePicker
                      value={draft[r.id]}
                      onChange={(t) => setDraft((d) => ({ ...d, [r.id]: t as RequestStatus }))}
                      onConfirm={() => advance(r.id, "time-proposed")}
                    />
                  )}

                  {!isDraft && canAdvance && (
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-pearl-400">{meta.hint}</span>
                      <div className="ml-auto flex flex-wrap gap-2">
                        {r.status !== "time-proposed" && (
                          <button
                            type="button"
                            onClick={() => advance(r.id, "time-proposed")}
                            className="cursor-pointer rounded-lg border border-primary-600/30 bg-white px-3.5 py-2 text-xs font-semibold text-primary-700 transition-colors hover:bg-primary-50"
                          >
                            Reschedule / propose time
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => advance(r.id, nextStatusOf(r.status))}
                          className="cursor-pointer rounded-lg bg-primary-600 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-700"
                        >
                          {nextActionLabel[r.status] ?? "Update status"}
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
            {queue.length === 0 && (
              <li className="rounded-2xl border border-dashed border-pearl-300 bg-white p-10 text-center text-sm text-pearl-400">
                No jobs assigned to you yet. When admin assigns a {vendor.category.toLowerCase()} request, it will appear here — relax until then.
              </li>
            )}
          </ul>
        </section>

        {/* availability */}
        <AvailabilityPanel vendor={vendor} />
      </main>
    </div>
  );
}

const nextStatusOf = (s: RequestStatus): RequestStatus => {
  switch (s) {
    case "time-proposed": return "slotted"; // student confirmed (demo toggle)
    case "slotted": return "in-progress";
    case "in-progress": return "resolved";
    default: return s;
  }
};

const nextActionLabel: Record<RequestStatus, string> = {
  requested: "Propose time to admin",
  "time-proposed": "Mark confirmed via admin",
  slotted: "Start work",
  "in-progress": "Mark resolved (via admin)",
  resolved: "Done",
};

function TimePicker({
  value,
  onChange,
  onConfirm,
}: {
  value?: string;
  onChange: (t: string) => void;
  onConfirm: () => void;
}) {
  const [day, setDay] = useState("Today");
  const [slot, setSlot] = useState<string | null>(null);
  return (
    <div className="mt-4 rounded-xl border border-primary-600/20 bg-primary-50/60 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="flex items-center gap-2 text-xs font-semibold text-primary-800">
          <CalendarCheck2 className="h-4 w-4 text-primary-600" aria-hidden /> Propose a time to admin
        </p>
        {value && (
          <span className="text-[11px] text-primary-600">Current: {value}</span>
        )}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {["Today", "Tomorrow", "Thu", "Fri", "Sat"].map((d) => (
          <button key={d} type="button" onClick={() => setDay(d)} className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${day === d ? "bg-primary-600 text-white" : "bg-white text-pearl-600 hover:bg-pearl-100"}`}>
            {d}
          </button>
        ))}
        <div className="mx-1 h-5 w-px bg-primary-600/20" aria-hidden />
        {timeSlots.map((t) => (
          <button key={t} type="button" onClick={() => setSlot(t)} className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold tabular-nums transition-colors ${slot === t ? "bg-lime-400 text-primary-950" : "bg-white text-pearl-600 hover:bg-pearl-100"}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            onChange(`${day} · ${slot ?? "4:00pm"}`);
            onConfirm();
          }}
          className="cursor-pointer rounded-lg bg-lime-400 px-4 py-2 text-xs font-bold text-primary-950 transition-colors hover:bg-lime-300"
        >
          Send proposed time to admin
        </button>
        <span className="text-[11px] text-primary-600/70">Admin checks your slot, then confirms with the resident — no direct contact.</span>
      </div>
    </div>
  );
}

function AvailabilityPanel({ vendor }: { vendor: Vendor }) {
  const [on, setOn] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(timeSlots.map((t, i) => [t, i < 5])),
  );
  return (
    <section aria-label="Availability" className="mt-10 rounded-2xl border border-pearl-200/80 bg-white p-6 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-semibold text-pearl-950">Today&rsquo;s availability</h2>
          <p className="text-sm text-pearl-500">
            Residents only see proposed times inside your available window. {vendor.name} prefers morning slots.
          </p>
        </div>
        <Badge tone="success">{Object.values(on).filter(Boolean).length} of {timeSlots.length} slots on</Badge>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-7">
        {timeSlots.map((t, i) => (
          <button
            key={t}
            type="button"
            onClick={() => setOn((o) => ({ ...o, [t]: !o[t] }))}
            aria-pressed={on[t]}
            className={`cursor-pointer rounded-xl border py-3 text-center text-sm font-semibold tabular-nums transition-colors duration-200 ${
              on[t] ? "border-lime-400 bg-lime-400/15 text-primary-950" : "border-pearl-200 bg-pearl-50 text-pearl-400 hover:bg-pearl-100"
            }`}
          >
            {t}
            <span className="block text-[10px] font-normal">{i < 3 ? "am" : i < 5 ? "pm" : "evening"}</span>
          </button>
        ))}
      </div>
      <p className="mt-4 flex items-center gap-2 text-xs text-pearl-400">
        <Clock3 className="h-3.5 w-3.5" aria-hidden /> Changes apply to new requests immediately. Existing proposals keep their time unless you reschedule.
      </p>
    </section>
  );
}