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
    default: "Long Track Records | 日本男子長距離記録サイト",
    template: "%s | Long Track Records",
  },
  description:
    "日本男子5000m・10000mの歴代記録、今季ランキング、選手情報、大会メモをまとめた陸上長距離アーカイブサイトです。",
  openGraph: {
    title: "Long Track Records | 日本男子長距離記録サイト",
    description:
      "日本男子5000m・10000mの歴代記録、今季ランキング、選手情報、大会メモをまとめた陸上長距離アーカイブサイトです。",
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
