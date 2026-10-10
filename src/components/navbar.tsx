import { Cat, LayoutDashboard, Bell, FileText, Home, HelpCircle } from "lucide-react";
import type { Snapshot } from "@/lib/api";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/alerts", label: "Alerts", icon: Bell },
  { to: "/report", label: "Report", icon: FileText },
  { to: "/faq", label: "FAQ", icon: HelpCircle },
];

export function Navbar({ route, snap, offline }: { route: string; snap: Snapshot | null; offline: boolean }) {
  const light = route === "/"; // landing page is white
  const crit = snap?.summary.critical ?? 0, warn = snap?.summary.warning ?? 0;
  const label = offline ? "collector offline" : !snap ? "connecting" : crit ? `${crit} critical` : warn ? `${warn} warning` : "all clear";
  const color = offline || crit ? "bg-red-500" : warn ? "bg-amber-400" : snap ? "bg-emerald-500" : "bg-zinc-500";
  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl", light ? "border-black/10 bg-white/70 text-black" : "bg-background/60")}>
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <a href="#/" className="flex items-center gap-2 font-medium">
          <span className={cn("flex size-8 items-center justify-center rounded-full", light ? "bg-black text-white" : "bg-primary text-primary-foreground")}><Cat className="size-4" /></span>
          <span className="hidden sm:inline">Black and White cats</span>
        </a>
        <nav className="flex items-center gap-1">
          {links.map(({ to, label, icon: Icon }) => (
            <a key={to} href={`#${to}`} className={cn("flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors",
              light ? (route === to ? "bg-black/10 text-black" : "text-black/60 hover:bg-black/5") : (route === to ? "bg-accent text-foreground hover:bg-accent" : "text-muted-foreground hover:bg-accent"))}>
              <Icon className="size-4" /><span className="hidden md:inline">{label}</span>
            </a>
          ))}
        </nav>
        <div className={cn("flex items-center gap-2 rounded-full border px-3 py-1 text-xs", light ? "border-black/15 text-black/60" : "text-muted-foreground")}>
          <span className={cn("size-2 animate-dot rounded-full", color)} />{label}
        </div>
      </div>
    </header>
  );
}
