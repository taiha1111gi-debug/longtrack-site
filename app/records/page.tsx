import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { SiteHeader } from "../components/SiteHeader";

const pageTitle = "日本男子5000m・10000mランキング｜歴代記録・2026年今季PB";
const pageDescription =
  "日本男子5000m・10000mの歴代ランキング、2026年今季PB、2027年度新入生の高校男子5000mランキングを種目別に掲載しています。";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/records",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/records",
    type: "website",
  },
};

const rankingGroups = [
  {
    id: "all-time-rankings",
    heading: "歴代ランキング",
    description: "日本男子5000m・10000mの歴代上位記録です。",
    pages: [
      {
        href: "/records/5000m",
        title: "日本男子5000m歴代ランキング",
        body: "順位・選手名・タイム・記録当時の所属・大会・日付を確認できます。",
      },
      {
        href: "/records/10000m",
        title: "日本男子10000m歴代ランキング",
        body: "順位・選手名・タイム・記録当時の所属・大会・日付を確認できます。",
      },
    ],
  },
  {
    id: "season-2026-rankings",
    heading: "2026年ランキング",
    description: "2026年4月1日以降に記録された今季PBランキングです。",
    pages: [
      {
        href: "/records/5000m/season",
        title: "2026年 日本男子5000mランキング",
        body: "日本男子5000mの今季上位記録を、所属・大会・日付とともに掲載しています。",
      },
      {
        href: "/records/10000m/season",
        title: "2026年 日本男子10000mランキング",
        body: "日本男子10000mの今季上位記録を、所属・大会・日付とともに掲載しています。",
      },
    ],
  },
  {
    id: "high-school-rankings",
    heading: "高校ランキング",
    description: "2027年度新入生世代の高校男子5000mランキングです。",
    pages: [
      {
        href: "/records/freshman-2027-5000",
        title: "2027年度新入生 高校男子5000mランキング",
        body: "現在高校3年の選手を対象に、上位記録と所属高校、進路情報を掲載しています。",
      },
    ],
  },
];

export default function RecordsPage() {
  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-10 sm:pt-28 lg:px-12">
        <Breadcrumbs items={[{ label: "ランキング", href: "/records" }]} />
        <div className="mt-6">
          <p className="text-sm font-bold tracking-[0.14em] text-cyan-700">
            RECORDS
          </p>
          <h1 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">
            日本男子5000m・10000mランキング
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            日本男子長距離の歴代記録、2026年今季PB、高校男子5000mのランキングを種目別に掲載しています。
          </p>
        </div>

        <div className="mt-9 space-y-10">
          {rankingGroups.map((group) => (
            <section key={group.id} aria-labelledby={group.id}>
              <h2 id={group.id} className="text-2xl font-black text-slate-900">
                {group.heading}
              </h2>
              <p className="mt-1 text-sm leading-7 text-slate-600">
                {group.description}
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {group.pages.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group rounded-md border border-slate-200 bg-white p-5 shadow-sm transition hover:border-cyan-600 hover:shadow-md sm:p-6"
                  >
                    <p className="text-xs font-bold tracking-[0.14em] text-cyan-700">
                      RANKING
                    </p>
                    <h3 className="mt-2 text-xl font-black leading-tight group-hover:text-cyan-800 sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {item.body}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
