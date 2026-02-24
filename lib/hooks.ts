"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function useCurrentUser() {
  const { user: clerkUser, isLoaded } = useUser();
  const convexUser = useQuery(
    api.users.getByClerkId,
    clerkUser ? { clerkId: clerkUser.id } : "skip"
  );

  return {
    user: convexUser,
    isLoaded: isLoaded && convexUser !== undefined,
    clerkUser,
  };
}

export function getCurrentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export function formatCurrency(amount: number): string {
  return `¥${amount.toLocaleString("ja-JP")}`;
}

export function formatMonth(month: string): string {
  const [year, m] = month.split("-");
  return `${year}年${Number(m)}月`;
}
