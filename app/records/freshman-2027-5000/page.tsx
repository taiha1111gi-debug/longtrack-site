import type { Metadata } from "next";
import { FreshmanRankingTable } from "../../components/FreshmanRankingTable";
import { RelatedRankings } from "../../components/RelatedRankings";
import { SiteHeader } from "../../components/SiteHeader";
import { getEditableRecords } from "../../lib/db";

export const metadata: Metadata = {
  title: "2027年度新入生 高校男子5000mランキング",
  description:
    "2027年度新入生世代の高校男子5000m上位記録を、選手名・タイム・所属高校・大会・日付・進路とともに掲載しています。",
  alternates: {
    canonical: "/records/freshman-2027-5000",
  },
};

export default function Freshman2027RecordsPage() {
  const records = getEditableRecords("freshman-2027-5000");

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-10 sm:pt-28 lg:px-12">
        <p className="text-sm font-bold tracking-[0.14em] text-cyan-700">
          RANKING
        </p>
        <h1 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">
          2027年度新入生 高校男子5000mランキング
        </h1>
        <div className="mt-4 grid gap-2 text-sm font-bold leading-6 text-slate-600 sm:grid-cols-2">
          <p className="rounded-md border border-slate-200 bg-white px-3 py-2 shadow-sm">
            対象: 現在高校3年の男子5000m
          </p>
          <p className="rounded-md border border-slate-200 bg-white px-3 py-2 shadow-sm">
            掲載基準:～14分31秒
          </p>
          <p className="rounded-md border border-slate-200 bg-white px-3 py-2 shadow-sm sm:col-span-2">
            進路は判明後に追記します。
          </p>
        </div>

        <section className="mt-6 rounded-md border border-slate-200 bg-white p-3 shadow-sm sm:mt-8 sm:p-6">
          <FreshmanRankingTable records={records} />
        </section>
        <RelatedRankings currentPath="/records/freshman-2027-5000" />
      </div>
    </main>
  );
}
