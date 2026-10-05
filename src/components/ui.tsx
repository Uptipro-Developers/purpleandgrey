import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

/* ---------------------------------- Logo ---------------------------------- */

export function Logo({
  variant = "light",
  size = "md",
  href = "/",
}: {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  href?: string;
}) {
  const dims =
    size === "sm" ? "h-7 w-7" : size === "lg" ? "h-11 w-11" : "h-9 w-9";
  const text = size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-xl";
  const color = variant === "dark" ? "text-pearl-900" : "text-white";
  return (
    <Link href={href} className={`flex items-center gap-3 ${color}`} aria-label="Purple & Grey home">
      <span
        className={`${dims} relative shrink-0 rounded-xl bg-gradient-to-br from-primary-500 to-primary-800 shadow-lift`}
      >
        <span className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.45),transparent_55%)]" />
        <span className="absolute right-[14%] top-[14%] h-[26%] w-[26%] rounded-full bg-lime-400" />
      </span>
      <span className="leading-none">
        <span className={`block font-display font-semibold ${text}`}>Purple&Grey</span>
        <span className={`mt-0.5 block text-[10px] uppercase tracking-[0.28em] ${variant === "dark" ? "text-pearl-400" : "text-white/50"}`}>
          Resident Living
        </span>
      </span>
    </Link>
  );
}

/* -------------------------------- Button ---------------------------------- */

type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "lime" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  as?: "button" | "a";
  href?: string;
  withArrow?: boolean;
};

export function Button({
  variant = "primary",
  size = "md",
  as = "button",
  href,
  withArrow,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl font-display font-medium transition-colors duration-200 select-none disabled:cursor-not-allowed disabled:opacity-50";
  const sizes = {
    sm: "px-3.5 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  };
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 shadow-lift",
    lime: "bg-lime-400 text-primary-950 hover:bg-lime-300 shadow-[0_8px_24px_-8px_rgba(200,242,78,0.7)]",
    ghost: "text-white/80 hover:text-white hover:bg-white/10",
    outline:
      "border border-primary-600/30 bg-white text-primary-700 hover:border-primary-600 hover:bg-primary-50",
    danger: "bg-danger-500 text-white hover:bg-danger-700",
  };
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {withArrow && <ArrowRight className={size === "lg" ? "h-5 w-5" : "h-4 w-4"} aria-hidden />}
    </>
  );
  if (as === "a" && href) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {inner}
    </button>
  );
}

/* --------------------------------- Badge ---------------------------------- */

export function Badge({
  tone = "lime",
  children,
  className = "",
}: {
  tone?: "lime" | "violet" | "success" | "warning" | "danger" | "info" | "neutral";
  children: ReactNode;
  className?: string;
}) {
  const tones: Record<string, string> = {
    lime: "bg-lime-400/15 text-lime-400 ring-lime-400/30",
    violet: "bg-primary-500/15 text-primary-300 ring-primary-400/30",
    success: "bg-success-500/15 text-success-500 ring-success-500/30",
    warning: "bg-warning-500/15 text-warning-500 ring-warning-500/30",
    danger: "bg-danger-500/15 text-danger-500 ring-danger-500/30",
    info: "bg-info-500/15 text-info-500 ring-info-500/30",
    neutral: "bg-white/10 text-white/70 ring-white/15",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/* ------------------------------- SectionTag -------------------------------- */

export function SectionTag({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 inline-flex items-center gap-2 text-xs font-display font-semibold uppercase tracking-[0.24em] text-lime-400">
      <span className="h-px w-6 bg-lime-400/60" aria-hidden />
      {children}
    </p>
  );
}

/* ------------------------------- Metric ------------------------------------ */

export function Metric({
  value,
  label,
  delta,
  deltaTone = "success",
}: {
  value: string;
  label: string;
  delta?: string;
  deltaTone?: "success" | "danger" | "neutral";
}) {
  const tone =
    deltaTone === "success" ? "text-success-500" : deltaTone === "danger" ? "text-danger-500" : "text-pearl-400";
  return (
    <div>
      <p className="font-display text-2xl font-bold tracking-tight text-pearl-900 tabular-nums sm:text-3xl">{value}</p>
      <p className="mt-1 text-sm text-pearl-500">{label}</p>
      {delta && <p className={`mt-1 text-xs font-medium tabular-nums ${tone}`}>{delta}</p>}
    </div>
  );
}