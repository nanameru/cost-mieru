import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "ヘルプセンター",
  description: "コストミエルの使い方やよくある質問をご案内します。",
};

const faqSections = [
  {
    title: "はじめに",
    items: [
      {
        q: "コストミエルとは何ですか？",
        a: "コストミエルは、AIツール（ChatGPT、Claude、Copilot等）の利用料金を一元管理し、支出を見える化するWebアプリケーションです。",
      },
      {
        q: "どうやって始めればいいですか？",
        a: "アカウントを作成後、「サービス管理」からご利用中のAIサービスを登録し、「支出記録」から月々の費用を記録してください。ダッシュボードで自動的にグラフが表示されます。",
      },
      {
        q: "無料で使えますか？",
        a: "はい、すべての基本機能を無料でご利用いただけます。",
      },
    ],
  },
  {
    title: "お支払いについて",
    items: [
      {
        q: "料金は発生しますか？",
        a: "現在、コストミエルは無料でご利用いただけます。将来的にプレミアム機能を追加する場合は、事前にお知らせいたします。",
      },
    ],
  },
  {
    title: "技術的な質問",
    items: [
      {
        q: "対応ブラウザは？",
        a: "最新版のChrome、Firefox、Safari、Edgeに対応しています。",
      },
      {
        q: "スマートフォンから使えますか？",
        a: "はい、レスポンシブデザインに対応しているため、スマートフォンやタブレットからもご利用いただけます。",
      },
      {
        q: "データのバックアップは？",
        a: "支出データはCSV形式でいつでもエクスポートできます。設定画面からダウンロードしてください。",
      },
    ],
  },
];

export default function HelpPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="mb-8 text-3xl font-bold">ヘルプセンター</h1>

          {faqSections.map((section) => (
            <section key={section.title} className="mb-10">
              <h2 className="mb-4 text-xl font-semibold">{section.title}</h2>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.q} className="rounded-lg bg-muted/50 p-5">
                    <h3 className="mb-2 font-medium">{item.q}</h3>
                    <p className="text-sm text-muted-foreground">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <section className="rounded-lg border bg-background p-6">
            <h2 className="mb-2 text-lg font-semibold">お問い合わせ</h2>
            <p className="text-sm text-muted-foreground">
              上記で解決しない場合は、以下のメールアドレスまでお気軽にお問い合わせください。
            </p>
            <p className="mt-2 text-sm font-medium">
              taiyo.kimura.3w@stu.hosei.ac.jp
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
