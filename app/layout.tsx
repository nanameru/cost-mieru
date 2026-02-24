import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { ConvexClerkProvider } from "@/lib/convex-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "コストミエル | AIツール費用の見える化ダッシュボード",
    template: "%s | コストミエル",
  },
  description:
    "AIツールの利用料金をまるごと見える化。OpenAI、Claude、Copilotなど複数のAIサービスの支出を一元管理し、ムダを削減するダッシュボード。",
  keywords: [
    "AI費用管理",
    "AIコスト",
    "サブスクリプション管理",
    "ChatGPT費用",
    "Claude費用",
    "AI支出",
    "コスト見える化",
    "SaaS管理",
  ],
  openGraph: {
    title: "コストミエル | AIツール費用の見える化ダッシュボード",
    description:
      "AIツールの利用料金をまるごと見える化。複数AIサービスの支出を一元管理。",
    locale: "ja_JP",
    type: "website",
    siteName: "コストミエル",
  },
  twitter: {
    card: "summary_large_image",
    title: "コストミエル | AIツール費用の見える化ダッシュボード",
    description:
      "AIツールの利用料金をまるごと見える化。複数AIサービスの支出を一元管理。",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body className="font-sans antialiased">
        <ConvexClerkProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ConvexClerkProvider>
      </body>
    </html>
  );
}
