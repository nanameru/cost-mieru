import Link from "next/link";
import { BarChart3 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600">
                <BarChart3 className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="font-bold tracking-tight">コストミエル</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              AIツールの利用料金を見える化し、
              <br />
              ムダな支出を削減します。
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">プロダクト</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/#features"
                  className="transition-colors hover:text-foreground"
                >
                  機能
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="transition-colors hover:text-foreground"
                >
                  料金
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="transition-colors hover:text-foreground"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">サポート</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/help"
                  className="transition-colors hover:text-foreground"
                >
                  ヘルプセンター
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-foreground"
                >
                  サービスについて
                </Link>
              </li>
              <li>
                <Link
                  href="/status"
                  className="transition-colors hover:text-foreground"
                >
                  ステータス
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">法的情報</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-foreground"
                >
                  利用規約
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-foreground"
                >
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link
                  href="/legal"
                  className="transition-colors hover:text-foreground"
                >
                  特定商取引法に基づく表記
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
            <p>
              &copy; {new Date().getFullYear()} コストミエル. All rights
              reserved.
            </p>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              全サービス正常稼働中
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
