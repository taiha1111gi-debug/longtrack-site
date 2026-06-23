import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "日本男子5000m・10000m歴代ランキング",
  description:
    "日本男子5000m・10000mの歴代上位記録を、選手名・記録当時の所属・大会・日付とともに確認できるランキング一覧です。",
  alternates: {
    canonical: "/players",
  },
};

const trackLinks = [
  {
    href: "/records/5000m",
    title: "日本男子5000m歴代ランキング",
    body: "日本男子5000mの歴代上位記録を、選手・所属・大会・日付とともに確認できます。",
  },
  {
    href: "/records/10000m",
    title: "日本男子10000m歴代ランキング",
    body: "日本男子10000mの歴代上位記録を、選手・所属・大会・日付とともに確認できます。",
  },
];

export default function PlayersPage() {
  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-10 sm:pt-28 lg:px-12">
        <p className="text-sm font-bold tracking-[0.14em] text-cyan-700">
          ALL-TIME RECORDS
        </p>
        <h1 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">
          日本男子5000m・10000m歴代ランキング
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          日本男子長距離の歴代上位記録を種目別に掲載しています。記録当時の所属や大会・場所、日付を確認できます。
        </p>

        <section className="mt-8 grid gap-4 md:grid-cols-2">
          {trackLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-md border border-slate-200 bg-white p-5 shadow-sm transition hover:border-cyan-600 hover:shadow-md sm:p-6"
            >
              <p className="text-xs font-bold tracking-[0.14em] text-cyan-700">
                RECORDS
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
