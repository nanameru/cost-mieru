import Link from "next/link";
import { BarChart3 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-emerald-600" />
              <span className="font-bold">コストミエル</span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              AIツールの利用料金を見える化し、
              <br />
              ムダな支出を削減します。
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">プロダクト</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/#features" className="hover:text-foreground">
                  機能
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-foreground">
                  料金
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-foreground">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">サポート</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/help" className="hover:text-foreground">
                  ヘルプセンター
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground">
                  サービスについて
                </Link>
              </li>
              <li>
                <Link href="/status" className="hover:text-foreground">
                  ステータス
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">法的情報</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/terms" className="hover:text-foreground">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/legal" className="hover:text-foreground">
                  特定商取引法に基づく表記
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} コストミエル. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
