"use client";

import { useState } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { BarChart3, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/#features", label: "機能" },
  { href: "/#how-it-works", label: "仕組み" },
  { href: "/#pricing", label: "料金" },
  { href: "/#faq", label: "FAQ" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-sm">
            <BarChart3 className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">コストミエル</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <SignedOut>
            <Link href="/sign-in">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-lg text-muted-foreground hover:text-foreground"
              >
                ログイン
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button
                size="sm"
                className="rounded-lg bg-emerald-600 font-medium shadow-sm shadow-emerald-600/20 hover:bg-emerald-700"
              >
                無料で始める
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <Button
                size="sm"
                className="rounded-lg bg-emerald-600 font-medium shadow-sm shadow-emerald-600/20 hover:bg-emerald-700"
              >
                ダッシュボード
              </Button>
            </Link>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="rounded-lg p-2 text-muted-foreground hover:bg-muted md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t bg-background px-4 pb-4 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2 border-t pt-3">
            <SignedOut>
              <Link href="/sign-in">
                <Button variant="outline" className="w-full rounded-lg">
                  ログイン
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-700">
                  無料で始める
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-700">
                  ダッシュボード
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      )}
    </header>
  );
}
