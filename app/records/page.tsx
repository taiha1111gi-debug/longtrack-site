import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "2026年 日本男子5000m・10000mランキング",
  description:
    "2026年4月1日以降の日本男子5000m・10000m上位記録をまとめた今季PBランキング一覧です。",
  alternates: {
    canonical: "/records",
  },
};

const rankingPages = [
  {
    href: "/records/5000m/season",
    title: "2026年 日本男子5000mランキング",
    body: "2026年4月1日以降に記録された日本男子5000mの今季上位記録を確認できます。",
  },
  {
    href: "/records/10000m/season",
    title: "2026年 日本男子10000mランキング",
    body: "2026年4月1日以降に記録された日本男子10000mの今季上位記録を確認できます。",
  },
];

export default function RecordsPage() {
  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-10 sm:pt-28 lg:px-12">
        <p className="text-sm font-bold tracking-[0.14em] text-cyan-700">
          2026 SEASON
        </p>
        <h1 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">
          2026年 日本男子5000m・10000mランキング
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          2026年4月1日以降に記録された日本男子長距離の今季PBを、5000m・10000mの種目別に掲載しています。
        </p>

        <section className="mt-8 grid gap-4 md:grid-cols-2">
          {rankingPages.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-md border border-slate-200 bg-white p-5 shadow-sm transition hover:border-cyan-600 hover:shadow-md sm:p-6"
            >
              <p className="text-xs font-bold tracking-[0.14em] text-cyan-700">
                RANKING
              </p>
              <h2 className="mt-2 text-xl font-black leading-tight group-hover:text-cyan-800 sm:text-2xl">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {item.body}
              </p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
