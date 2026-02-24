import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "サービスステータス",
  description: "コストミエルの各システムの稼働状況をご確認いただけます。",
};

const systems = [
  { name: "Webアプリケーション", description: "フロントエンド・UI" },
  { name: "API / バックエンド", description: "Convex Functions" },
  { name: "認証システム", description: "Clerk Authentication" },
  { name: "データベース", description: "Convex Database" },
  { name: "ホスティング", description: "Vercel Edge Network" },
];

export default function StatusPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="mb-4 text-3xl font-bold">サービスステータス</h1>
          <div className="mb-8 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
            <span className="text-emerald-600 font-medium">
              全システム正常稼働中
            </span>
          </div>

          <div className="space-y-3">
            {systems.map((system) => (
              <Card key={system.name}>
                <CardContent className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-medium">{system.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {system.description}
                    </p>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                    正常稼働
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <section className="mt-12">
            <h2 className="mb-4 text-xl font-semibold">障害履歴</h2>
            <div className="rounded-lg bg-muted/50 p-6 text-center text-sm text-muted-foreground">
              過去90日間に重大な障害は発生していません。
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
