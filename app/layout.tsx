import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "神奈川県医療白衣クリーニング | 合同会社渡邊商会",
  description: "神奈川県の医療現場に特化したプロフェッショナルクリーニングサービス。1着から対応、最短当日納品、品質保証。",
    generator: 'v0.dev'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
