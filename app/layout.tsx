import type { Metadata } from "next";
import "./globals.css";
import Script from 'next/script'; // Google広告タグのために追加

// SEO向上のための詳細なメタデータ（横浜・神奈川全域 最終版）
export const metadata: Metadata = {
  // TODO: 将来的に本番の独自ドメインに変更してください
  metadataBase: new URL('https://medical-cleaning-site-new.vercel.app'), 
  
  // タイトル設定（横浜を最優先し、神奈川全域もカバー）
  title: {
    template: '%s | 合同会社渡邊商会',
    default: '横浜・神奈川全域の医療スクラブ・白衣クリーニング専門｜合同会社渡邊商会',
  },

  // 説明文（横浜・川崎を具体的に示し、神奈川全域への対応をアピール）
  description: "横浜市・川崎市を中心に神奈川県全域で対応！医療現場に特化したプロの白衣クリーニング。1着から集配OK。スクラブ、検診着、ケアウェアなどもお任せください。",
  
  // キーワード（主要な都市名と関連キーワードを網羅）
  keywords: ['医療白衣', 'クリーニング', '横浜', '神奈川', '川崎', '相模原', '藤沢', '横須賀', '集配', '宅配', 'スクラブ', '渡邊商会'],
  
  // OGP設定（SNSシェア用）
  openGraph: {
    title: '横浜・神奈川全域｜医療スクラブ・白衣の宅配クリーニング専門',
    description: '横浜市・川崎市を中心に神奈川県全域へ集配OK！医療現場のプロが使う白衣クリーニング。',
    url: 'https://medical-cleaning-site-new.vercel.app', // TODO: 本番ドメインに要変更
    siteName: '合同会社渡邊商会 医療白衣クリーニング',
    images: [
      {
        url: '/og-image.png', // 推奨サイズ: 1200x630px
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
    title: '横浜・神奈川全域｜医療スクラブ・白衣の宅配クリーニング専門',
    description: '横浜市・川崎市を中心に神奈川県全域へ集配OK！医療現場のプロが使う白衣クリーニング。',
    images: ['/og-image.png'],
  },

  // Google Search Consoleの所有権確認コード
  verification: {
    google: 'X1TFgCEcLHQ60CjzXmBFkPrsppS4WhxQ5tOk0OjbYjo',
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
    '@id': 'https://medical-cleaning-site-new.vercel.app', // TODO: 本番ドメインに要変更
    url: 'https://medical-cleaning-site-new.vercel.app', // TODO: 本番ドメインに要変更
    telephone: '045-701-6985', // TODO: 正しい電話番号に要変更
    
    // サービス提供エリアを「神奈川県」とGoogleに明記
    areaServed: {
      "@type": "AdministrativeArea",
      "name": "神奈川県"
    },
    
    address: {
      '@type': 'PostalAddress',
      streetAddress: '牛久保東1-33-44', // TODO: 正式な住所に要変更
      addressLocality: '横浜市都筑区',
      addressRegion: 'JP-14',
      postalCode: '224-0014', // TODO: 正式な郵便番号に要変更
      addressCountry: 'JP',
    },
    description: metadata.description,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  };

  return (
    <html lang="ja">
      <head>
        {/* 構造化データをJSON-LD形式で埋め込みます */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* ↓↓↓ ここからGoogle広告のタグを追加しました ↓↓↓ */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-17461447061"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17461447061');
            `,
          }}
        />
        {/* ↑↑↑ Google広告のタグはここまで ↑↑↑ */}
      </head>
      <body>{children}</body>
    </html>
  );
}
