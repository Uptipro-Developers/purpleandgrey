"use client";

import { useState } from "react";
import { Menu, ShieldCheck, Sparkles, Wrench, X } from "lucide-react";
import { Logo } from "@/components/ui";

const navLinks = [
  ["Platform", "#platform"],
  ["For students", "#resident"],
  ["For vendors", "#vendor"],
  ["Security", "#security"],
] as const;

/* ------------------------------- LandingNav -------------------------------- */

export function LandingNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50">
      <div className="glass-dark mt-4 ml-3 mr-3 flex items-center justify-between rounded-2xl px-5 py-3 sm:ml-auto sm:mr-auto sm:max-w-6xl sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-white/70 transition-colors duration-200 hover:bg-white/10 hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="/vendor"
            className="cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            Vendor portal
          </a>
          <a
            href="/app"
            className="cursor-pointer rounded-xl bg-lime-400 px-5 py-2.5 font-display text-sm font-medium text-primary-950 transition-colors duration-200 hover:bg-lime-300"
          >
            Open the app
          </a>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="cursor-pointer rounded-lg p-2 text-white lg:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <nav className="glass-dark mx-3 mt-2 rounded-2xl px-5 py-4 sm:mx-auto sm:max-w-6xl lg:hidden" aria-label="Mobile">
          <div className="flex flex-col divide-y divide-white/10">
            {navLinks.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="cursor-pointer py-3 text-sm font-medium text-white/80 hover:text-white"
              >
                {label}
              </a>
            ))}
            <a href="/vendor" onClick={() => setOpen(false)} className="cursor-pointer py-3 text-sm font-medium text-white/80 hover:text-white">
              Vendor portal
            </a>
            <a
              href="/app"
              onClick={() => setOpen(false)}
              className="cursor-pointer mt-3 rounded-xl bg-lime-400 px-5 py-3 text-center font-display text-sm font-medium text-primary-950"
            >
              Open the app
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

/* ----------------------------- PathSelector -------------------------------- */

const paths = [
  {
    key: "resident",
    label: "I'm a resident",
    icon: Sparkles,
    focus: "Pay rent, unlock your door and request services in one app.",
    cta: "Open the resident app",
    href: "/app",
  },
  {
    key: "vendor",
    label: "I run a service team",
    icon: Wrench,
    focus: "You see only the requests in your trade — propose visit times, set your availability.",
    cta: "Open the vendor portal",
    href: "/vendor",
  },
] as const;

export function PathSelector() {
  const [active, setActive] = useState<(typeof paths)[number]["key"]>("resident");
  const current = paths.find((p) => p.key === active)!;
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
      <p className="mb-4 flex items-center gap-2 text-xs font-display font-semibold uppercase tracking-[0.22em] text-white/50">
        <ShieldCheck className="h-3.5 w-3.5 text-lime-400" aria-hidden /> How can we help you?
      </p>
      <div role="tablist" aria-label="Choose what describes you" className="flex flex-wrap gap-2">
        {paths.map((p) => {
          const Icon = p.icon;
          const selected = p.key === active;
          return (
            <button
              key={p.key}
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(p.key)}
              className={`cursor-pointer inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                selected
                  ? "bg-lime-400 text-primary-950"
                  : "border border-white/12 text-white/70 hover:border-white/25 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {p.label}
            </button>
          );
        })}
      </div>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/70 sm:text-base">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-lime-400">
            {active === "resident" ? "For you" : "For your team"}
          </span>
          {current.focus}
        </p>
        <a
          href={current.href}
          className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-white px-5 py-3 font-display text-sm font-medium text-primary-950 transition-colors duration-200 hover:bg-lime-300"
        >
          {current.cta}
          <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}