import type { Metadata } from "next";
import Link from "next/link";
import { RelatedRankings } from "../../../components/RelatedRankings";
import { SiteHeader } from "../../../components/SiteHeader";
import { getEditableRecords } from "../../../lib/db";
import { recordsLastChecked, toPublicRankingRecords } from "../../data";
import { RankingTable } from "../../RankingTable";
import { LastUpdated } from "../../LastUpdated";

export const metadata: Metadata = {
  title: "2026年 日本男子10000mランキング｜今季PB",
  description:
    "2026年4月1日以降の日本男子10000m上位記録を、選手名・タイム・所属・大会・日付とともに掲載する今季PBランキングです。",
  alternates: {
    canonical: "/records/10000m/season",
  },
};

export const dynamic = "force-dynamic";

export default function CurrentSeason10000mPage() {
  const records = getEditableRecords("season-10000");

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-10 sm:pt-28 lg:px-12">
        <Link
          href="/records"
          className="inline-flex rounded-md bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-700"
        >
          ランキングへ戻る
        </Link>

        <section className="mt-5 rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:mt-6 sm:p-6">
          <p className="text-sm font-bold tracking-[0.14em] text-cyan-700">
            2026 SEASON
          </p>
          <h1 className="mt-1 text-3xl font-black leading-tight sm:text-4xl">
            2026年 日本男子10000mランキング
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            2026年シーズン（4月1日以降）の日本男子10000m上位記録を掲載しています。掲載基準は28分10秒までです。
          </p>
          <RankingTable records={toPublicRankingRecords(records)} />
          <LastUpdated value={recordsLastChecked.records10000m} />
        </section>
        <RelatedRankings currentPath="/records/10000m/season" />
      </div>
    </main>
  );
}




