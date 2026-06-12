import Link from "next/link";
import { SiteHeader } from "../../../components/SiteHeader";
import { getEditableRecords } from "../../../lib/db";
import { recordsLastChecked } from "../../data";
import { RankingTable } from "../../RankingTable";
import { LastUpdated } from "../../LastUpdated";

export const dynamic = "force-dynamic";

export default function CurrentSeason10000mPage() {
  const records = getEditableRecords("season-10000");

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-28 sm:px-10 lg:px-12">
        <Link
          href="/records"
          className="inline-flex rounded-md bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-700"
        >
          ランキングへ戻る
        </Link>

        <section className="mt-6 rounded-md border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-sm font-bold tracking-[0.14em] text-cyan-700">
            2026 SEASON
          </p>
          <h1 className="mt-1 text-3xl font-black sm:text-4xl">
            今季男子10000mランキング
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            2026年シーズンの男子10000m上位記録を記載しています。(～28:10)
          </p>
          <RankingTable records={records} />
          <LastUpdated value={recordsLastChecked.records10000m} />
        </section>
      </div>
    </main>
  );
}




