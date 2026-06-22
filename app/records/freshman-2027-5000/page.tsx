import type { Metadata } from "next";
import { FreshmanRankingTable } from "../../components/FreshmanRankingTable";
import { SiteHeader } from "../../components/SiteHeader";
import { getEditableRecords } from "../../lib/db";

export const metadata: Metadata = {
  title: "2027新入生 高校5000mランキング",
  description:
    "2027年度新入生世代の高校男子5000m記録をまとめたランキングページです。選手名、記録、所属高校、進路を確認できます。",
  alternates: {
    canonical: "/records/freshman-2027-5000",
  },
};

export default function Freshman2027RecordsPage() {
  const records = getEditableRecords("freshman-2027-5000");

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-28 sm:px-10 lg:px-12">
        <p className="text-sm font-bold tracking-[0.14em] text-cyan-700">
          RANKING
        </p>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl">
          2027新入生 高校5000mランキング
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          現在（2026年）高校3年生の5000m記録を対象にしたランキングです。（～14:10.00）
          シーズンが本格化したらデータを増やします。
          進路欄は判明後に追記します。
        </p>

        <section className="mt-8 rounded-md border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <FreshmanRankingTable records={records} />
        </section>
      </div>
    </main>
  );
}
