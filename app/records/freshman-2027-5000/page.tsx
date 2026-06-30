import type { Metadata } from "next";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { FreshmanRankingTable } from "../../components/FreshmanRankingTable";
import { RelatedRankings } from "../../components/RelatedRankings";
import { SiteHeader } from "../../components/SiteHeader";
import { getEditableRecords } from "../../lib/db";
import { LastUpdated } from "../LastUpdated";

const pageTitle = "2027年度新入生 高校男子5000mランキング｜最新記録・進路";
const pageDescription =
  "2027年度新入生世代の高校男子5000mランキングです。14分31秒までの上位記録を、選手名・タイム・所属高校・大会・日付・進路とともに掲載しています。";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/records/freshman-2027-5000",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/records/freshman-2027-5000",
    type: "website",
  },
};

export default function Freshman2027RecordsPage() {
  const records = getEditableRecords("freshman-2027-5000");

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-10 sm:pt-28 lg:px-12">
        <Breadcrumbs
          items={[
            { label: "ランキング", href: "/records" },
            {
              label: "2027年度新入生 高校男子5000mランキング",
              href: "/records/freshman-2027-5000",
            },
          ]}
        />
        <div className="mt-6">
          <p className="text-sm font-bold tracking-[0.14em] text-cyan-700">
            RANKING
          </p>
          <h1 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">
            2027年度新入生 高校男子5000mランキング
          </h1>
          <div className="mt-4 rounded-md border border-slate-200 bg-white px-3 py-2.5 text-[13px] font-bold leading-6 text-slate-600 shadow-sm sm:px-4 sm:py-3 sm:text-sm sm:leading-7">
            <p>対象: 現在高校3年の男子5000m</p>
            <p>掲載基準:～14分31秒</p>
            <p>進路は判明後に追記します。</p>
          </div>
        </div>

        <section className="mt-6 rounded-md border border-slate-200 bg-white p-3 shadow-sm sm:mt-8 sm:p-6">
          <FreshmanRankingTable records={records} />
          <LastUpdated records={records} />
        </section>
        <RelatedRankings currentPath="/records/freshman-2027-5000" />
      </div>
    </main>
  );
}
