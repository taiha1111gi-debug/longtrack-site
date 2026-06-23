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
  metadataBase: new URL("https://main.d2913wee5pzbjt.amplifyapp.com"),
  title: {
    default: "日本男子5000m・10000m記録 | Long Track Records",
    template: "%s | 日本男子長距離記録",
  },
  description:
    "日本男子5000m・10000mの歴代ランキング、2026年今季PB、選手プロフィール、大会情報をまとめた陸上長距離記録サイトです。",
  keywords: [
    "日本男子5000m",
    "日本男子10000m",
    "5000m歴代ランキング",
    "10000m歴代ランキング",
    "陸上長距離",
  ],
  openGraph: {
    title: "日本男子5000m・10000m記録 | Long Track Records",
    description:
      "日本男子5000m・10000mの歴代ランキング、2026年今季PB、選手情報をまとめた陸上長距離記録サイトです。",
    url: "/",
    siteName: "Long Track Records",
    locale: "ja_JP",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
