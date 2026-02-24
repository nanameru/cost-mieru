import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
  description: "コストミエルの特定商取引法に基づく表記です。",
};

export default function LegalPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="mb-8 text-3xl font-bold">特定商取引法に基づく表記</h1>

          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-sm">
              <tbody>
                {[
                  ["販売業者", "木村太陽"],
                  ["運営責任者", "木村太陽"],
                  ["所在地", "神奈川県藤沢市藤沢本町"],
                  ["連絡先", "taiyo.kimura.3w@stu.hosei.ac.jp"],
                  ["販売価格", "無料（将来的に有料プランを設ける場合があります）"],
                  ["支払方法", "クレジットカード（有料プラン導入時）"],
                  ["支払時期", "サービス利用時（有料プラン導入時）"],
                  ["提供時期", "お申し込み後、直ちにご利用いただけます"],
                  ["返品・返金", "デジタルサービスの性質上、原則として返品・返金はお受けしておりません"],
                  ["動作環境", "最新版のChrome、Firefox、Safari、Edge"],
                  ["瑕疵担保責任", "サービスに瑕疵がある場合、合理的な範囲で対応いたします"],
                ].map(([label, value]) => (
                  <tr key={label} className="border-b last:border-0">
                    <td className="bg-muted/50 px-4 py-3 font-medium w-36">
                      {label}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
