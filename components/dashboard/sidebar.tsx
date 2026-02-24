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
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r bg-background md:block">
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <BarChart3 className="h-6 w-6 text-emerald-600" />
        <span className="text-lg font-bold">コストミエル</span>
      </div>
      <nav className="space-y-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-emerald-50 text-emerald-700 font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
