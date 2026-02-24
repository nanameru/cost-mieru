"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-emerald-600" />
          <span className="text-lg font-bold">コストミエル</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/#features"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            機能
          </Link>
          <Link
            href="/#how-it-works"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            仕組み
          </Link>
          <Link
            href="/#pricing"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            料金
          </Link>
          <Link
            href="/#faq"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <SignedOut>
            <Link href="/sign-in">
              <Button variant="ghost" size="sm">
                ログイン
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                無料で始める
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                ダッシュボード
              </Button>
            </Link>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
