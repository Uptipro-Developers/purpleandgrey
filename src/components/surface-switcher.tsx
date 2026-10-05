"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HardHat, Home, LayoutDashboard, Smartphone } from "lucide-react";

const surfaces = [
  { href: "/", label: "Public site", icon: Home },
  { href: "/app", label: "Resident app", icon: Smartphone },
  { href: "/vendor", label: "Vendor portal", icon: HardHat },
  { href: "/admin", label: "Admin console", icon: LayoutDashboard },
] as const;

const placements = {
  bc: "bottom-5 left-1/2 -translate-x-1/2",
  bl: "bottom-5 left-5",
  tl: "top-3 left-3",
} as const;

export default function SurfaceSwitcher({
  placement = "bc",
}: {
  placement?: keyof typeof placements;
}) {
  const path = usePathname();
  return (
    <nav aria-label="Switch surface" className={`fixed z-[70] ${placements[placement]}`}>
      {/* <div className="flex items-center gap-1 rounded-full border border-primary-700/60 bg-primary-950/85 p-1.5 shadow-[0_8px_30px_-6px_rgba(18,6,42,0.6)] backdrop-blur-xl">
        {surfaces.map((s) => {
          const Icon = s.icon;
          const active = s.href === "/" ? path === "/" : path.startsWith(s.href);
          return (
            <Link
              key={s.href}
              href={s.href}
              title={s.label}
              aria-label={s.label}
              aria-current={active ? "page" : undefined}
              className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 ${active ? "bg-lime-400 text-primary-950" : "text-white/55 hover:bg-white/10 hover:text-white"}`}
            >
              <Icon className="h-4 w-4" aria-hidden />
            </Link>
          );
        })}
      </div> */}
    </nav>
  );
}