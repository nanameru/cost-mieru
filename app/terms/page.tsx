import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "利用規約",
  description: "コストミエルの利用規約です。",
};

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-3xl px-4 prose prose-sm prose-slate">
          <h1 className="text-3xl font-bold">利用規約</h1>
          <p className="text-muted-foreground">最終更新日: 2026年2月24日</p>

          <h2 className="mt-8 text-xl font-semibold">1. はじめに</h2>
          <p className="text-sm text-muted-foreground">
            本利用規約（以下「本規約」）は、木村太陽（以下「運営者」）が提供するWebサービス「コストミエル」（以下「本サービス」）の利用条件を定めるものです。ユーザーの皆様は、本規約に同意した上で本サービスをご利用ください。
          </p>

          <h2 className="mt-8 text-xl font-semibold">2. サービス内容</h2>
          <p className="text-sm text-muted-foreground">
            本サービスは、AIツールの利用料金を記録・管理し、支出の推移を可視化するWebアプリケーションです。
          </p>

          <h2 className="mt-8 text-xl font-semibold">3. アカウント</h2>
          <p className="text-sm text-muted-foreground">
            ユーザーは正確な情報を提供してアカウントを作成する必要があります。アカウントの管理責任はユーザーにあります。
          </p>

          <h2 className="mt-8 text-xl font-semibold">4. 料金と返金</h2>
          <p className="text-sm text-muted-foreground">
            現在、本サービスは無料で提供されています。将来的に有料プランを導入する場合は、事前に通知いたします。
          </p>

          <h2 className="mt-8 text-xl font-semibold">5. 禁止事項</h2>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>法令に違反する行為</li>
            <li>本サービスの運営を妨害する行為</li>
            <li>他のユーザーに不利益を与える行為</li>
            <li>不正アクセスまたはそれを試みる行為</li>
            <li>本サービスのリバースエンジニアリング</li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold">6. 知的財産権</h2>
          <p className="text-sm text-muted-foreground">
            本サービスに関する知的財産権は運営者に帰属します。ユーザーが入力したデータの所有権はユーザーに帰属します。
          </p>

          <h2 className="mt-8 text-xl font-semibold">7. 免責事項</h2>
          <p className="text-sm text-muted-foreground">
            運営者は、本サービスの完全性、正確性、有用性等について保証しません。本サービスの利用により生じた損害について、運営者は一切の責任を負いません。
          </p>

          <h2 className="mt-8 text-xl font-semibold">8. 規約変更</h2>
          <p className="text-sm text-muted-foreground">
            運営者は、必要に応じて本規約を変更できます。変更後の規約は本ページに掲載した時点で効力を生じます。
          </p>

          <h2 className="mt-8 text-xl font-semibold">9. お問い合わせ</h2>
          <p className="text-sm text-muted-foreground">
            本規約に関するお問い合わせは、以下までご連絡ください。
            <br />
            メール: taiyo.kimura.3w@stu.hosei.ac.jp
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
