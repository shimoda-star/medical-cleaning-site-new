import type { Metadata } from "next";
import "./globals.css";

// SEO向上のための詳細なメタデータ
export const metadata: Metadata = {
  // サイトのベースURLを設定
  metadataBase: new URL('https://medical-cleaning-site-new.vercel.app'),
  
  // タイトル設定（ページ毎にタイトルを設定できるようにテンプレート化）
  title: {
    template: '%s | 神奈川の医療白衣クリーニング専門合同会社渡邊商会',
    default: '神奈川県・横浜の医療白衣スクラブクリーニング専門 | 合同会社渡邊商会',
  },
  description: "神奈川県の医療現場に特化したプロの白衣クリーニングサービス。1着から集配、最短当日納品、品質保証。スクラブ、検診着、ケアウェアなど幅広く対応。お見積りは無料です。",
  keywords: ['医療白衣', 'クリーニング', '神奈川', '横浜', '集配', '当日納品', 'スクラブ', '渡邊商会'],
  
  // OGP設定（SNSシェア用）
  openGraph: {
    title: '神奈川県医療白衣クリーニング専門 | 合同会社渡邊商会',
    description: '1着から集配OK！神奈川の医療現場を支えるプロのクリーニング。',
    url: 'https://medical-cleaning-site-new.vercel.app',
    siteName: '合同会社渡邊商会 医療白衣クリーニング',
    images: [
      {
        // OG画像は1200x630pxが推奨されます
        url: '/og-image.png', 
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },

  // Twitterカード設定
  twitter: {
    card: 'summary_large_image',
    title: '神奈川県医療白衣クリーニング専門 | 合同会社渡邊商会',
    description: '1着から集配OK！神奈川の医療現場を支えるプロのクリーニング。',
    images: ['/og-image.png'], 
  },

  // Googleにサイトの所有権を証明するためのタグ（後で設定）
  verification: {
    google: 'ここにGoogleから取得したコードを貼り付けます',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 構造化データ（LocalBusiness）
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: '合同会社渡邊商会',
    image: 'https://medical-cleaning-site-new.vercel.app/og-image.png',
    '@id': 'https://medical-cleaning-site-new.vercel.app',
    url: 'https://medical-cleaning-site-new.vercel.app',
    telephone: '045-701-6985',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '牛久保東1-33-44',
      addressLocality: '横浜市都筑区',
      addressRegion: 'JP-14', // 神奈川県
      postalCode: '224-0014', // 仮
      addressCountry: 'JP',
    },
    description: metadata.description,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
      ],
      opens: '09:00',
      closes: '17:00',
    },
  };

  return (
    <html lang="ja">
      <head>
        {/* 構造化データをJSON-LD形式で埋め込む */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
