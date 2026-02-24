"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  LayoutDashboard,
  Server,
  Receipt,
  Wallet,
  Settings,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "ダッシュボード", icon: LayoutDashboard },
  { href: "/dashboard/services", label: "サービス管理", icon: Server },
  { href: "/dashboard/expenses", label: "支出記録", icon: Receipt },
  { href: "/dashboard/budget", label: "予算設定", icon: Wallet },
  { href: "/dashboard/settings", label: "設定", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-sidebar-border bg-sidebar md:block">
      <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-sm">
          <BarChart3 className="h-4 w-4 text-white" />
        </div>
        <span className="text-lg font-bold tracking-tight">コストミエル</span>
      </div>

      <nav className="space-y-1 p-3">
        <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
          メニュー
        </p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200",
                isActive
                  ? "bg-emerald-50 font-medium text-emerald-700 shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "h-[18px] w-[18px] transition-colors",
                  isActive
                    ? "text-emerald-600"
                    : "text-muted-foreground/70 group-hover:text-foreground"
                )}
              />
              <span className="flex-1">{item.label}</span>
              {isActive && (
                <ChevronRight className="h-3.5 w-3.5 text-emerald-400" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 border-t border-sidebar-border p-4">
        <div className="rounded-xl bg-emerald-50 p-3">
          <p className="text-xs font-medium text-emerald-700">フリープラン</p>
          <p className="mt-0.5 text-[11px] text-emerald-600/70">
            全機能をご利用いただけます
          </p>
        </div>
      </div>
    </aside>
  );
}
