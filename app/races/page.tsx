import type { Metadata } from "next";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "大会情報",
  description:
    "日本男子長距離の記録が生まれやすい大会やシリーズの特徴をまとめた大会情報ページです。",
  alternates: {
    canonical: "/races",
  },
};

const races = [
  {
    name: "八王子ロングディスタンス",
    event: "10000m",
    body: "実業団と学生のトップ選手が集まり、10000mの好記録が多く生まれる大会です。",
  },
  {
    name: "日本選手権10000m",
    event: "10000m",
    body: "代表選考と日本記録更新が重なる、国内長距離の重要レースです。",
  },
  {
    name: "ホクレン・ディスタンスチャレンジ",
    event: "5000m",
    body: "夏の北海道で開催され、5000mの自己記録更新を狙いやすいシリーズです。",
  },
];

export default function RacesPage() {
  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-28 sm:px-10 lg:px-12">
        <p className="text-sm font-bold tracking-[0.14em] text-cyan-700">RACES</p>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl">大会情報</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          長距離記録が生まれやすい大会やシリーズを整理しています。
        </p>

        <section className="mt-8 grid gap-4 lg:grid-cols-3">
          {races.map((race) => (
            <article
              key={race.name}
              className="rounded-md border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-bold tracking-[0.14em] text-cyan-700">
                {race.event}
              </p>
              <h2 className="mt-2 text-2xl font-black">{race.name}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{race.body}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
