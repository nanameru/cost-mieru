import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  BarChart3,
  TrendingUp,
  Bell,
  ArrowRight,
  UserPlus,
  Settings,
  Eye,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* ヒーロー */}
        <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 to-white py-20 md:py-32">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="mb-4 text-sm font-medium text-emerald-600">
              ムダな出費を見逃さない。予算を超える前に気づく。
            </p>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
              AIの出費、
              <br />
              <span className="text-emerald-600">まるごと見える化。</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              OpenAI、Claude、Copilotなど、複数のAIツールの支出を
              ひとつのダッシュボードで一元管理。コストの推移や予測をリアルタイムで確認できます。
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  無料で始める
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              クレジットカード不要。いつでもキャンセル可能。
            </p>
          </div>
        </section>

        {/* 機能紹介 */}
        <section id="features" className="py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-4 text-center text-3xl font-bold">
              AIコスト管理に必要な機能がすべて揃う
            </h2>
            <p className="mb-12 text-center text-muted-foreground">
              スプレッドシートは不要。すべてを自動で見える化します。
            </p>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                    <BarChart3 className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">
                    統合ダッシュボード
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    全AIサービスの支出をひとつの画面で確認。プロバイダー別、カテゴリ別の内訳を一目で把握できます。
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">月末予測</h3>
                  <p className="text-sm text-muted-foreground">
                    現在の利用ペースから月末のコストを予測。予算オーバーになる前に対策を打てます。
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100">
                    <Bell className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">
                    予算アラート
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    設定した予算を超えそうな場合に通知。想定外の出費を防ぎます。
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 仕組み */}
        <section id="how-it-works" className="bg-muted/30 py-20">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="mb-4 text-center text-3xl font-bold">
              かんたん3ステップ
            </h2>
            <p className="mb-12 text-center text-muted-foreground">
              アカウント作成から支出の見える化まで、わずか数分。
            </p>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <UserPlus className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold">1. アカウント作成</h3>
                <p className="text-sm text-muted-foreground">
                  メールアドレスまたはGoogleアカウントで無料登録。
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <Settings className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold">2. サービスを登録</h3>
                <p className="text-sm text-muted-foreground">
                  利用中のAIサービスを登録。プリセットから選ぶだけ。
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold">3. 支出を見える化</h3>
                <p className="text-sm text-muted-foreground">
                  グラフやチャートで支出の推移を確認。予算管理も自動で。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 料金 */}
        <section id="pricing" className="py-20">
          <div className="mx-auto max-w-md px-4">
            <h2 className="mb-4 text-center text-3xl font-bold">料金プラン</h2>
            <p className="mb-8 text-center text-muted-foreground">
              シンプルな料金体系。隠れたコストはありません。
            </p>
            <Card className="shadow-lg">
              <CardContent className="pt-6">
                <h3 className="mb-2 text-center text-lg font-semibold">
                  フリープラン
                </h3>
                <div className="mb-4 text-center">
                  <span className="text-4xl font-bold">¥0</span>
                  <span className="text-muted-foreground">/月</span>
                </div>
                <ul className="mb-6 space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600">✓</span>
                    AIサービスを最大10件登録
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600">✓</span>
                    支出ダッシュボード
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600">✓</span>
                    月間推移グラフ
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600">✓</span>
                    予算設定 & アラート
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600">✓</span>
                    CSV エクスポート
                  </li>
                </ul>
                <Link href="/sign-up" className="block">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    無料で始める
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-muted/30 py-20">
          <div className="mx-auto max-w-2xl px-4">
            <h2 className="mb-8 text-center text-3xl font-bold">
              よくある質問
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "コストミエルは無料で使えますか？",
                  a: "はい、フリープランですべての基本機能を無料でご利用いただけます。クレジットカードの登録も不要です。",
                },
                {
                  q: "どのAIサービスに対応していますか？",
                  a: "OpenAI (ChatGPT)、Anthropic (Claude)、GitHub Copilot、Midjourney、Stable Diffusion、Google Gemini など、主要なAIサービスすべてに対応しています。",
                },
                {
                  q: "データは安全ですか？",
                  a: "はい。すべてのデータは暗号化して保存され、お客様のAIサービスのAPIキーを保存することはありません。",
                },
                {
                  q: "支出データはどのように入力しますか？",
                  a: "各AIサービスの月額費用や利用料金を手動で入力していただきます。将来的にはAPI連携による自動取得にも対応予定です。",
                },
              ].map((item) => (
                <div key={item.q} className="rounded-lg bg-background p-6">
                  <h3 className="mb-2 font-semibold">{item.q}</h3>
                  <p className="text-sm text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-emerald-600 py-16 text-white">
          <div className="mx-auto max-w-2xl px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              今すぐAI費用を見える化しよう
            </h2>
            <p className="mb-8 text-emerald-100">
              無料でアカウントを作成して、AIツールの支出管理を始めましょう。
            </p>
            <Link href="/sign-up">
              <Button size="lg" variant="secondary">
                無料で始める
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
