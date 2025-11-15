import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "나... 얼마나 NICE할까?",
  description: "나의 NICE FIT 결과를 확인해보세요!",
  openGraph: {
    title: "NICE-FIT 진단",
    description: "나의 NICE FIT 결과를 확인해보세요!",
    url: "http://nice-fit.s3-website.ap-northeast-2.amazonaws.com",
    siteName: "NICE-FIT",
    images: [
      {
        url: "/card_back.png",   // S3 올라간 이미지도 가능
        width: 1200,
        height: 630,
        alt: "NICE-FIT 대표 이미지",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      {/*<body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >*/}
      <body className="font-sans">{children}
      </body>
    </html>
  );
}
