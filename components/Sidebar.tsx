"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  CreditCard,
  Settings,
  Zap,
  Bell,
  HelpCircle,
} from "lucide-react";

const nav = [
  { icon: LayoutDashboard, label: "Overview", href: "/" },
  { icon: Users, label: "Customers", href: "/customers" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: CreditCard, label: "Billing", href: "/billing" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const bottom = [
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: HelpCircle, label: "Help", href: "/help" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col h-screen w-56 bg-[#13161f] border-r border-white/5 py-5 px-3 fixed left-0 top-0 z-10">
      {/* Logo */}
      <div className="flex items-center gap-2 px-3 mb-8">
        <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
          <Zap size={14} className="text-white" />
        </div>
        <span className="font-semibold text-white text-base tracking-tight">Pulse</span>
      </div>

      {/* Main nav */}
      <nav className="flex-1 space-y-0.5">
        {nav.map(({ icon: Icon, label, href }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-violet-600/20 text-violet-400"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom nav */}
      <div className="space-y-0.5 border-t border-white/5 pt-3">
        {bottom.map(({ icon: Icon, label, href }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-colors"
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}

        {/* Avatar */}
        <div className="flex items-center gap-3 px-3 py-2 mt-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
            JG
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-slate-200 truncate">JcGilbert97</p>
            <p className="text-[10px] text-slate-500 truncate">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
