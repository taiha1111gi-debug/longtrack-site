import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { RelatedRankings } from "../../../components/RelatedRankings";
import { SiteHeader } from "../../../components/SiteHeader";
import { getEditableRecords } from "../../../lib/db";
import { toPublicRankingRecords } from "../../data";
import { RankingTable } from "../../RankingTable";
import { LastUpdated } from "../../LastUpdated";

const pageTitle = "2026年 日本男子10000mランキング｜今季PB・最新記録";
const pageDescription =
  "2026年4月1日以降の日本男子10000m上位記録を、選手名・タイム・記録当時の所属・大会・場所・日付とともに掲載する今季PBランキングです。";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/records/10000m/season",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/records/10000m/season",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

export default function CurrentSeason10000mPage() {
  const records = getEditableRecords("season-10000");

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-10 sm:pt-28 lg:px-12">
        <Breadcrumbs
          items={[
            { label: "ランキング", href: "/records" },
            { label: "2026年 日本男子10000mランキング", href: "/records/10000m/season" },
          ]}
        />
        <Link
          href="/records"
          className="mt-4 inline-flex rounded-md bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-700"
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
          <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5 text-[13px] font-bold leading-6 text-slate-600 shadow-sm sm:px-4 sm:py-3 sm:text-sm sm:leading-7">
            <p>対象: 2026年シーズン（4月1日以降）の日本男子10000m</p>
            <p>掲載基準:～28分10秒</p>
            <p>選手名から個人プロフィールも確認できます。</p>
          </div>
          <RankingTable records={toPublicRankingRecords(records)} />
          <LastUpdated records={records} />
        </section>
        <RelatedRankings currentPath="/records/10000m/season" />
      </div>
    </main>
  );
}
