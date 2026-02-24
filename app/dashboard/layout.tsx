"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";
import { api } from "@/convex/_generated/api";
import { Sidebar } from "@/components/dashboard/sidebar";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Server, Receipt, Wallet, Settings } from "lucide-react";

const pageInfo: Record<string, { title: string; description: string; icon: React.ElementType }> = {
  "/dashboard": {
    title: "ダッシュボード",
    description: "支出の概要を確認",
    icon: LayoutDashboard,
  },
  "/dashboard/services": {
    title: "サービス管理",
    description: "AIサービスの登録と管理",
    icon: Server,
  },
  "/dashboard/expenses": {
    title: "支出記録",
    description: "支出の記録と履歴",
    icon: Receipt,
  },
  "/dashboard/budget": {
    title: "予算設定",
    description: "月間予算の設定と確認",
    icon: Wallet,
  },
  "/dashboard/settings": {
    title: "設定",
    description: "アカウントとデータ管理",
    icon: Settings,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoaded } = useUser();
  const createOrUpdateUser = useMutation(api.users.createOrUpdate);
  const pathname = usePathname();

  useEffect(() => {
    if (isLoaded && user) {
      createOrUpdateUser({
        clerkId: user.id,
        name: user.fullName ?? user.firstName ?? "ユーザー",
        email: user.primaryEmailAddress?.emailAddress ?? "",
      });
    }
  }, [isLoaded, user, createOrUpdateUser]);

  const currentPage = pageInfo[pathname] ?? pageInfo["/dashboard"];
  const PageIcon = currentPage.icon;

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />
      <div className="md:ml-64">
        <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
                <PageIcon className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-sm font-semibold leading-none">
                  {currentPage.title}
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {currentPage.description}
                </p>
              </div>
            </div>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8",
                },
              }}
            />
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
