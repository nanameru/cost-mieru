"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";
import { api } from "@/convex/_generated/api";
import { Sidebar } from "@/components/dashboard/sidebar";
import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoaded } = useUser();
  const createOrUpdateUser = useMutation(api.users.createOrUpdate);

  useEffect(() => {
    if (isLoaded && user) {
      createOrUpdateUser({
        clerkId: user.id,
        name: user.fullName ?? user.firstName ?? "ユーザー",
        email: user.primaryEmailAddress?.emailAddress ?? "",
      });
    }
  }, [isLoaded, user, createOrUpdateUser]);

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />
      <div className="md:ml-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-6">
          <h2 className="text-lg font-semibold">ダッシュボード</h2>
          <UserButton />
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
