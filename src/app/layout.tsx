import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "로뎀숲 심리상담센터 | 전문 심리상담 및 치료",
  description:
    "마음의 평안과 성장을 위한 전문 심리상담센터. 개인상담, 부부상담, 가족상담 등 다양한 심리치료 프로그램을 제공합니다.",
  keywords: "심리상담, 심리치료, 상담센터, 로뎀숲, 개인상담, 부부상담, 가족상담, 심리검사",
  openGraph: {
    title: "로뎀숲 심리상담센터 | 전문 심리상담 및 치료",
    description: "마음의 평안과 성장을 위한 전문 심리상담센터",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "로뎀숲 심리상담센터",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
        <meta name="naver-site-verification" content="네이버 사이트 인증 코드" />
        <link rel="canonical" href="https://로뎀숲상담센터도메인.com" />
      </head>
      <body style={{ fontFamily: "Pretendard, sans-serif" }}>{children}</body>
    </html>
  );
}
