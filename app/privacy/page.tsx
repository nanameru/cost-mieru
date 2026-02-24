import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "コストミエルのプライバシーポリシーです。",
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="mb-2 text-3xl font-bold">プライバシーポリシー</h1>
          <p className="mb-8 text-muted-foreground">最終更新日: 2026年2月24日</p>

          <div className="space-y-8 text-sm text-muted-foreground">
            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">1. 収集する情報</h2>
              <ul className="list-disc space-y-1 pl-5">
                <li>アカウント情報（氏名、メールアドレス）— Clerkを通じて収集</li>
                <li>ユーザーが入力した支出データ、サービス情報</li>
                <li>利用状況に関するログデータ</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">2. 利用目的</h2>
              <ul className="list-disc space-y-1 pl-5">
                <li>本サービスの提供・改善</li>
                <li>ユーザーサポート</li>
                <li>サービスに関する通知</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">3. 第三者サービス</h2>
              <p>本サービスは以下の第三者サービスを利用しています：</p>
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>Clerk</strong> — ユーザー認証</li>
                <li><strong>Convex</strong> — データベース・バックエンド</li>
                <li><strong>Vercel</strong> — ホスティング</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">4. データ保持期間</h2>
              <p>アカウント削除をリクエストいただいた場合、合理的な期間内にすべてのデータを削除いたします。</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">5. セキュリティ</h2>
              <p>すべてのデータは暗号化された通信（HTTPS）を通じて送受信されます。適切なセキュリティ対策を講じてデータを保護しています。</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">6. ユーザーの権利</h2>
              <p>ユーザーは自身のデータの閲覧、修正、削除をリクエストする権利を有します。</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">7. Cookie</h2>
              <p>本サービスは認証およびセッション管理のためにCookieを使用します。</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">8. お問い合わせ</h2>
              <p>
                プライバシーに関するお問い合わせは以下までご連絡ください。
                <br />
                メール: taiyo.kimura.3w@stu.hosei.ac.jp
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
