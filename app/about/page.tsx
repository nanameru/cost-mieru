import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Eye, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "サービスについて",
  description: "コストミエルのミッション、主な特徴、運営者情報をご紹介します。",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="mb-8 text-3xl font-bold">サービスについて</h1>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-semibold">ミッション</h2>
            <p className="text-muted-foreground">
              AIツールの費用を透明にし、すべての人が賢くAIを使える世界を実現します。
              コストミエルは、個人開発者からチーム、企業まで、AIに関わるすべての人の
              コスト管理をサポートします。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-6 text-xl font-semibold">主な特徴</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6 text-center">
                  <BarChart3 className="mx-auto mb-3 h-8 w-8 text-emerald-600" />
                  <h3 className="mb-2 font-semibold">一元管理</h3>
                  <p className="text-sm text-muted-foreground">
                    複数のAIサービスの支出をひとつのダッシュボードで管理
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Eye className="mx-auto mb-3 h-8 w-8 text-blue-600" />
                  <h3 className="mb-2 font-semibold">見える化</h3>
                  <p className="text-sm text-muted-foreground">
                    グラフやチャートで支出の推移を直感的に把握
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Shield className="mx-auto mb-3 h-8 w-8 text-amber-600" />
                  <h3 className="mb-2 font-semibold">予算管理</h3>
                  <p className="text-sm text-muted-foreground">
                    予算設定とアラートで想定外の出費を防止
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">運営者情報</h2>
            <div className="rounded-lg bg-muted/50 p-6">
              <dl className="space-y-2 text-sm">
                <div className="flex gap-4">
                  <dt className="w-20 font-medium">運営者</dt>
                  <dd>木村太陽</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="w-20 font-medium">所在地</dt>
                  <dd>神奈川県藤沢市藤沢本町</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="w-20 font-medium">メール</dt>
                  <dd>taiyo.kimura.3w@stu.hosei.ac.jp</dd>
                </div>
              </dl>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
