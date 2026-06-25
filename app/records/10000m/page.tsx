import type { Metadata } from "next";
import Link from "next/link";
import { RelatedRankings } from "../../components/RelatedRankings";
import { SiteHeader } from "../../components/SiteHeader";
import { records10000, recordsLastChecked, toPublicRankingRecords } from "../data";
import { RankingTable } from "../RankingTable";
import { LastUpdated } from "../LastUpdated";

export const metadata: Metadata = {
  title: "日本男子10000m歴代ランキング｜歴代上位記録",
  description:
    "日本男子10000mの歴代上位記録を、順位・選手名・タイム・記録当時の所属・大会・日付とともに掲載しています。",
  alternates: {
    canonical: "/records/10000m",
  },
};

export default function Records10000mPage() {
  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-10 sm:pt-28 lg:px-12">
        <Link
          href="/players"
          className="inline-flex rounded-md bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-700"
        >
          競技一覧へ戻る
        </Link>
        <section className="mt-5 rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:mt-6 sm:p-6">
          <p className="text-sm font-bold tracking-[0.14em] text-cyan-700">
            MEN 10000m RECORDS
          </p>
          <h1 className="mt-1 text-3xl font-black leading-tight sm:text-4xl">
            日本男子10000m歴代ランキング
          </h1>
          <div className="mt-4 grid gap-2 text-sm font-bold leading-6 text-slate-600 sm:grid-cols-2">
            <p className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
              日本男子10000mの歴代上位記録を掲載しています。
            </p>
            <p className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
              記録当時の所属・大会・場所・日付を確認できます。
            </p>
            <p className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 sm:col-span-2">
              選手名から個人プロフィールも確認できます。
            </p>
          </div>
          <RankingTable records={toPublicRankingRecords(records10000)} />
          <LastUpdated value={recordsLastChecked.records10000m} />
        </section>
        <RelatedRankings currentPath="/records/10000m" />
      </div>
    </main>
  );
}
