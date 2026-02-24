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
  Sparkles,
  Shield,
  Zap,
  Check,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="gradient-hero relative overflow-hidden py-24 md:py-36">
          {/* Decorative elements */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="animate-float absolute -right-20 top-20 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
            <div className="animate-float-delayed absolute -left-20 bottom-20 h-64 w-64 rounded-full bg-blue-200/20 blur-3xl" />
            <div className="absolute left-1/2 top-1/3 h-48 w-48 -translate-x-1/2 rounded-full bg-emerald-300/10 blur-2xl" />
          </div>

          <div className="relative mx-auto max-w-4xl px-4 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
              <Sparkles className="h-3.5 w-3.5" />
              AIツールのコストを一元管理
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              AIの出費、
              <br />
              <span className="gradient-text">まるごと見える化。</span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              OpenAI、Claude、Copilotなど、複数のAIツールの支出を
              ひとつのダッシュボードで一元管理。コストの推移や予測をリアルタイムで確認できます。
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="h-12 rounded-xl bg-emerald-600 px-8 text-base font-semibold shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/30"
                >
                  無料で始める
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/#features">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-xl border-emerald-200 px-8 text-base hover:bg-emerald-50"
                >
                  機能を見る
                </Button>
              </Link>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              クレジットカード不要 ・ いつでもキャンセル可能
            </p>

            {/* Social proof */}
            <div className="mx-auto mt-12 flex max-w-md items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-emerald-500" />
                <span>安全な暗号化</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-emerald-500" />
                <span>即座にセットアップ</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-emerald-500" />
                <span>完全無料</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto mb-4 max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-600">
                Features
              </p>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                AIコスト管理に必要な機能がすべて揃う
              </h2>
              <p className="text-lg text-muted-foreground">
                スプレッドシートは不要。すべてを自動で見える化します。
              </p>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-3">
              <Card className="card-hover group border-0 bg-gradient-to-br from-white to-emerald-50/50 shadow-md">
                <CardContent className="p-8">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 transition-colors group-hover:bg-emerald-200">
                    <BarChart3 className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold">
                    統合ダッシュボード
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    全AIサービスの支出をひとつの画面で確認。プロバイダー別、カテゴリ別の内訳を一目で把握できます。
                  </p>
                </CardContent>
              </Card>

              <Card className="card-hover group border-0 bg-gradient-to-br from-white to-blue-50/50 shadow-md">
                <CardContent className="p-8">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 transition-colors group-hover:bg-blue-200">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold">月末予測</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    現在の利用ペースから月末のコストを予測。予算オーバーになる前に対策を打てます。
                  </p>
                </CardContent>
              </Card>

              <Card className="card-hover group border-0 bg-gradient-to-br from-white to-amber-50/50 shadow-md">
                <CardContent className="p-8">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 transition-colors group-hover:bg-amber-200">
                    <Bell className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold">予算アラート</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    設定した予算を超えそうな場合に通知。想定外の出費を防ぎます。
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="border-y bg-muted/30 py-24">
          <div className="mx-auto max-w-4xl px-4">
            <div className="mx-auto mb-4 max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-600">
                How it works
              </p>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                かんたん3ステップ
              </h2>
              <p className="text-lg text-muted-foreground">
                アカウント作成から支出の見える化まで、わずか数分。
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <div className="relative text-center">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-2.5 py-0.5 text-xs font-bold text-white">
                  STEP 1
                </div>
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-600/25">
                  <UserPlus className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  アカウント作成
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  メールアドレスまたはGoogleアカウントで無料登録。
                </p>
              </div>

              <div className="relative text-center">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-2.5 py-0.5 text-xs font-bold text-white">
                  STEP 2
                </div>
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-600/25">
                  <Settings className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  サービスを登録
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  利用中のAIサービスを登録。プリセットから選ぶだけ。
                </p>
              </div>

              <div className="relative text-center">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-2.5 py-0.5 text-xs font-bold text-white">
                  STEP 3
                </div>
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-600/25">
                  <Eye className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  支出を見える化
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  グラフやチャートで支出の推移を確認。予算管理も自動で。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24">
          <div className="mx-auto max-w-md px-4">
            <div className="mx-auto mb-4 max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-600">
                Pricing
              </p>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                料金プラン
              </h2>
              <p className="text-lg text-muted-foreground">
                シンプルな料金体系。隠れたコストはありません。
              </p>
            </div>

            <Card className="mt-12 overflow-hidden border-emerald-200 shadow-xl shadow-emerald-500/10">
              <div className="h-1.5 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600" />
              <CardContent className="p-8">
                <div className="mb-1 text-center">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    すべての機能が無料
                  </span>
                </div>
                <h3 className="mt-4 text-center text-lg font-semibold">
                  フリープラン
                </h3>
                <div className="my-6 text-center">
                  <span className="text-5xl font-bold tracking-tight">¥0</span>
                  <span className="ml-1 text-muted-foreground">/月</span>
                </div>
                <ul className="mb-8 space-y-3 text-sm">
                  {[
                    "AIサービスを最大10件登録",
                    "支出ダッシュボード",
                    "月間推移グラフ",
                    "予算設定 & アラート",
                    "CSV エクスポート",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                        <Check className="h-3 w-3 text-emerald-600" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/sign-up" className="block">
                  <Button className="h-11 w-full rounded-xl bg-emerald-600 text-base font-semibold shadow-lg shadow-emerald-600/25 hover:bg-emerald-700">
                    無料で始める
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-y bg-muted/30 py-24">
          <div className="mx-auto max-w-2xl px-4">
            <div className="mx-auto mb-4 max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-600">
                FAQ
              </p>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                よくある質問
              </h2>
            </div>
            <div className="mt-12 space-y-4">
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
                <div
                  key={item.q}
                  className="rounded-xl border bg-background p-6 transition-shadow hover:shadow-md"
                >
                  <h3 className="mb-2 font-semibold">{item.q}</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-600 to-emerald-700 py-20 text-white">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          </div>
          <div className="relative mx-auto max-w-2xl px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              今すぐAI費用を見える化しよう
            </h2>
            <p className="mb-10 text-lg text-emerald-100">
              無料でアカウントを作成して、AIツールの支出管理を始めましょう。
            </p>
            <Link href="/sign-up">
              <Button
                size="lg"
                className="h-12 rounded-xl bg-white px-8 text-base font-semibold text-emerald-700 shadow-lg hover:bg-emerald-50"
              >
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
