import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { RelatedRankings } from "../../components/RelatedRankings";
import { SiteHeader } from "../../components/SiteHeader";
import { records5000, toPublicRankingRecords } from "../data";
import { RankingTable } from "../RankingTable";
import { LastUpdated } from "../LastUpdated";

const pageTitle = "日本男子5000m歴代ランキング｜記録・選手一覧";
const pageDescription =
  "日本男子5000mの歴代上位記録を、順位・選手名・タイム・記録当時の所属・大会・場所・日付とともに掲載しています。";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/records/5000m",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/records/5000m",
    type: "website",
  },
};

export default function Records5000mPage() {
  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-10 sm:pt-28 lg:px-12">
        <Breadcrumbs
          items={[
            { label: "ランキング", href: "/records" },
            { label: "日本男子5000m歴代ランキング", href: "/records/5000m" },
          ]}
        />
        <Link
          href="/players"
          className="mt-4 inline-flex rounded-md bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-700"
        >
          競技一覧へ戻る
        </Link>
        <section className="mt-5 rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:mt-6 sm:p-6">
          <p className="text-sm font-bold tracking-[0.14em] text-cyan-700">
            MEN 5000m RECORDS
          </p>
          <h1 className="mt-1 text-3xl font-black leading-tight sm:text-4xl">
            日本男子5000m歴代ランキング
          </h1>
          <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5 text-[13px] font-bold leading-6 text-slate-600 shadow-sm sm:px-4 sm:py-3 sm:text-sm sm:leading-7">
            <p>日本男子5000mの歴代上位記録を掲載しています。</p>
            <p>記録当時の所属・大会・場所・日付を確認できます。</p>
            <p>選手名から個人プロフィールも確認できます。</p>
          </div>
          <RankingTable records={toPublicRankingRecords(records5000)} />
          <LastUpdated records={records5000} />
        </section>
        <RelatedRankings currentPath="/records/5000m" />
      </div>
    </main>
  );
}
