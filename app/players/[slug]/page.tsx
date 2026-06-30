import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackButton } from "../../components/BackButton";
import { RelatedRankings } from "../../components/RelatedRankings";
import { SiteHeader } from "../../components/SiteHeader";
import { formatDisplayDate, formatDisplayTime } from "../../lib/displayFormat";
import { getAllEditableRecords, getPlayerProfileOverrides } from "../../lib/db";
import {
  getPlayerProfileBySlug,
  type CareerHistoryItem,
  type CareerStageBest,
} from "../../records/data";

type PlayerDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    from?: string | string[];
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PlayerDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const player = getPlayerProfileBySlug(
    slug,
    getAllEditableRecords(),
    getPlayerProfileOverrides(),
  );

  if (!player) {
    return {
      title: "選手プロフィール",
      description: "日本男子長距離選手のプロフィールページです。",
    };
  }

  return {
    title: player.name + "｜5000m・10000m自己ベスト",
    description:
      player.name +
      "の5000m・10000m自己ベスト、記録日、年代別PB、出身校、所属チーム遍歴をまとめた日本男子長距離選手プロフィールです。",
    alternates: {
      canonical: "/players/" + slug,
    },
  };
}

function getSafeBackHref(from: string | string[] | undefined) {
  const href = Array.isArray(from) ? from[0] : from;

  if (href?.startsWith("/") && !href.startsWith("//")) {
    return href;
  }

  return "/players";
}

export default async function PlayerDetailPage({
  params,
  searchParams,
}: PlayerDetailPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const backHref = getSafeBackHref(resolvedSearchParams.from);
  const player = getPlayerProfileBySlug(
    slug,
    getAllEditableRecords(),
    getPlayerProfileOverrides(),
  );

  if (!player) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <SiteHeader />
      <div className="mx-auto max-w-4xl px-4 pb-8 pt-20 sm:px-10 sm:pb-12 sm:pt-28">
        <BackButton href={backHref} label="前のページに戻る" />

        <article className="mt-4 rounded-md border border-slate-200 bg-white p-3 shadow-sm sm:mt-6 sm:p-8">
          <p className="text-xs font-bold tracking-[0.14em] text-cyan-700 sm:text-sm">
            PLAYER PROFILE
          </p>
          <h1 className="mt-1 text-2xl font-black leading-tight sm:mt-2 sm:text-4xl">
            {player.name}
          </h1>
          <p className="mt-1 text-xs font-bold leading-5 text-slate-500 sm:mt-2 sm:text-sm">
            日本男子長距離選手｜5000m・10000m自己ベスト
          </p>

          <div className="mt-4 rounded-md bg-slate-100 p-3 md:hidden">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-[11px] font-bold tracking-[0.14em] text-slate-500">
                所属
              </p>
              <p className="break-words text-right text-base font-black">
                {player.team}
              </p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-200 pt-3">
              <MobileRecordSummary
                label="5000m"
                record={player.record5000m}
                date={player.record5000mDate}
              />
              <MobileRecordSummary
                label="10000m"
                record={player.record10000m}
                date={player.record10000mDate}
              />
            </div>
          </div>

          <dl className="mt-8 hidden gap-4 md:grid md:grid-cols-2">
            <div className="rounded-md bg-slate-100 p-4">
              <dt className="text-xs font-bold tracking-[0.14em] text-slate-500">
                所属
              </dt>
              <dd className="mt-2 text-xl font-black">{player.team}</dd>
            </div>
            <RecordSummary
              label="5000m自己ベスト"
              record={player.record5000m}
              date={player.record5000mDate}
            />
            <RecordSummary
              label="10000m自己ベスト"
              record={player.record10000m}
              date={player.record10000mDate}
            />
          </dl>

          <section className="mt-6 sm:mt-8">
            <h2 className="text-xl font-black sm:text-2xl">年代別PB</h2>
            <div className="mt-2 space-y-2 md:hidden">
              {player.careerStageBests.map((best) => (
                <MobileCareerStageCard key={best.stage} best={best} />
              ))}
            </div>
            <div className="mt-4 hidden overflow-x-auto rounded-md border border-slate-200 md:block">
              <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className={thClass}>区分</th>
                    <th className={thClass}>5000m PB</th>
                    <th className={thClass}>10000m PB</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {player.careerStageBests.map((best) => (
                    <CareerStageRow key={best.stage} best={best} />
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-6 sm:mt-8">
            <h2 className="text-xl font-black sm:text-2xl">出身・所属</h2>
            <div className="mt-2 space-y-2 md:hidden">
              {player.careerHistory.map((item) => (
                <MobileCareerHistoryCard
                  key={[item.category, item.period, item.name].join("-")}
                  item={item}
                />
              ))}
            </div>
            <div className="mt-4 hidden overflow-x-auto rounded-md border border-slate-200 md:block">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className={thClass}>区分</th>
                    <th className={thClass}>期間</th>
                    <th className={thClass}>学校・チーム</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {player.careerHistory.map((item) => (
                    <CareerHistoryRow
                      key={[item.category, item.period, item.name].join("-")}
                      item={item}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <p className="mt-4 text-[11px] leading-5 text-slate-500 sm:mt-5 sm:text-xs sm:leading-6">
            注: 年代別PBを確認できていない項目は「確認中」としています。一部の最新記録は当サイトのランキング掲載データを補助的に表示しています。
          </p>
        </article>
        <RelatedRankings />
      </div>
    </main>
  );
}

function MobileRecordSummary({
  label,
  record,
  date,
}: {
  label: string;
  record: string;
  date: string;
}) {
  return (
    <div className="min-w-0 rounded-md bg-white/70 px-2.5 py-2">
      <p className="text-[11px] font-black tracking-[0.08em] text-slate-500">
        {label} PB
      </p>
      <p className="mt-0.5 break-words text-base font-black leading-5 text-red-600">
        {formatDisplayTime(record)}
      </p>
      <p className="mt-0.5 text-[11px] font-bold leading-4 text-slate-600">
        {formatDisplayDate(date)}
      </p>
    </div>
  );
}

function RecordSummary({
  label,
  record,
  date,
}: {
  label: string;
  record: string;
  date: string;
}) {
  return (
    <div className="rounded-md bg-slate-100 p-4">
      <dt className="text-xs font-bold tracking-[0.14em] text-slate-500">
        {label}
      </dt>
      <dd className="mt-2 text-xl font-black text-red-600">
        {formatDisplayTime(record)}
      </dd>
      <dd className="mt-2 text-sm font-bold text-slate-600">
        記録日: {formatDisplayDate(date)}
      </dd>
    </div>
  );
}

function MobileCareerHistoryCard({ item }: { item: CareerHistoryItem }) {
  return (
    <article className="rounded-md border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <p className="text-xs font-black text-cyan-700">{item.category}</p>
        <p className="text-[11px] font-bold text-slate-500">{item.period}</p>
      </div>
      <p className="mt-1 break-words text-sm font-bold leading-5 text-slate-800">
        {item.name}
      </p>
    </article>
  );
}

function CareerHistoryRow({ item }: { item: CareerHistoryItem }) {
  return (
    <tr className="border-b border-slate-200">
      <td className={[tdClass, "font-black"].join(" ")}>{item.category}</td>
      <td className={tdClass}>{item.period}</td>
      <td className={[tdClass, "font-bold"].join(" ")}>{item.name}</td>
    </tr>
  );
}

function MobileCareerStageCard({ best }: { best: CareerStageBest }) {
  return (
    <article className="rounded-md border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
      <p className="text-sm font-black leading-5 text-slate-900">{best.stage}</p>
      <div className="mt-1.5 grid grid-cols-2 gap-2 text-xs">
        <p className="min-w-0 rounded bg-slate-50 px-2 py-1.5">
          <span className="block font-bold text-slate-500">5000m</span>
          <span className="mt-0.5 block break-words font-black text-red-600">
            {formatDisplayTime(best.record5000m)}
          </span>
        </p>
        <p className="min-w-0 rounded bg-slate-50 px-2 py-1.5">
          <span className="block font-bold text-slate-500">10000m</span>
          <span className="mt-0.5 block break-words font-black text-red-600">
            {formatDisplayTime(best.record10000m)}
          </span>
        </p>
      </div>
    </article>
  );
}

function CareerStageRow({ best }: { best: CareerStageBest }) {
  return (
    <tr className="border-b border-slate-200">
      <td className={[tdClass, "font-black"].join(" ")}>{best.stage}</td>
      <td className={[tdClass, "font-black text-red-600"].join(" ")}>
        {formatDisplayTime(best.record5000m)}
      </td>
      <td className={[tdClass, "font-black text-red-600"].join(" ")}>
        {formatDisplayTime(best.record10000m)}
      </td>
    </tr>
  );
}

const thClass = "px-4 py-3 font-bold whitespace-nowrap";
const tdClass = "px-4 py-4 align-top";
