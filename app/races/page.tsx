import type { Metadata } from "next";
import Link from "next/link";
import { RelatedRankings } from "../components/RelatedRankings";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "日本男子5000m・10000mの主要大会情報",
  description:
    "八王子ロングディスタンス、日本選手権10000m、ホクレンDCなど、日本男子5000m・10000mの好記録が生まれやすい大会を紹介します。",
  alternates: {
    canonical: "/races",
  },
};

const races = [
  {
    name: "八王子ロングディスタンス",
    event: "10000m",
    body: "実業団と学生のトップ選手が集まり、10000mの好記録が多く生まれる大会です。",
    href: "/records/10000m",
  },
  {
    name: "日本選手権10000m",
    event: "10000m",
    body: "代表選考と日本記録更新が重なる、国内長距離の重要レースです。",
    href: "/records/10000m",
  },
  {
    name: "ホクレン・ディスタンスチャレンジ",
    event: "5000m",
    body: "夏の北海道で開催され、5000mの自己記録更新を狙いやすいシリーズです。",
    href: "/records/5000m",
  },
];

export default function RacesPage() {
  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-10 sm:pt-28 lg:px-12">
        <p className="text-sm font-bold tracking-[0.14em] text-cyan-700">RACES</p>
        <h1 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">
          日本男子5000m・10000mの主要大会
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          日本男子長距離で好記録が生まれやすい大会やシリーズを、対象種目と特徴から紹介します。
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
              <Link
                href={race.href}
                className="mt-4 inline-flex text-sm font-black text-cyan-800 underline decoration-2 underline-offset-4 hover:text-cyan-600"
              >
                日本男子{race.event}歴代ランキングを見る
              </Link>
            </article>
          ))}
        </section>
        <RelatedRankings />
      </div>
    </main>
  );
}
