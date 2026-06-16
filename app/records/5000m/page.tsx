import Link from "next/link";
import { SiteHeader } from "../../components/SiteHeader";
import { records5000, recordsLastChecked, toPublicRankingRecords } from "../data";
import { RankingTable } from "../RankingTable";
import { LastUpdated } from "../LastUpdated";

export default function Records5000mPage() {
  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-28 sm:px-10 lg:px-12">
        <Link
          href="/players"
          className="inline-flex rounded-md bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-700"
        >
          競技一覧へ戻る
        </Link>
        <section className="mt-6 rounded-md border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-sm font-bold tracking-[0.14em] text-cyan-700">
            MEN 5000m RECORDS
          </p>
          <h1 className="mt-1 text-3xl font-black sm:text-4xl">
            男子5000m歴代ランキング
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            男子5000mの歴代上位記録をまとめています。
          </p>
          <RankingTable records={toPublicRankingRecords(records5000)} />
          <LastUpdated value={recordsLastChecked.records5000m} />
        </section>
      </div>
    </main>
  );
}


