import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackButton } from "../../components/BackButton";
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
    title: `${player.name} | 選手プロフィール`,
    description: `${player.name}の5000m・10000m自己ベスト、年代別PB、出身・所属情報をまとめた選手プロフィールページです。`,
    alternates: {
      canonical: `/players/${slug}`,
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
      <div className="mx-auto max-w-4xl px-6 pb-12 pt-28 sm:px-10">
        <BackButton href={backHref} label="前のページに戻る" />

        <article className="mt-6 rounded-md border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-bold tracking-[0.14em] text-cyan-700">
            PLAYER PROFILE
          </p>
          <h1 className="mt-2 text-4xl font-black">{player.name}</h1>

          <div className="mt-8 rounded-md bg-slate-100 p-4 md:hidden">
            <p className="text-xs font-bold tracking-[0.14em] text-slate-500">
              所属
            </p>
            <p className="mt-1 text-lg font-black">{player.team}</p>
            <div className="mt-4 space-y-3 border-t border-slate-200 pt-4">
              <MobileRecordSummary
                label="5000m PB"
                record={player.record5000m}
                date={player.record5000mDate}
              />
              <MobileRecordSummary
                label="10000m PB"
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

          <section className="mt-8">
            <h2 className="text-2xl font-black">年代別PB</h2>
            <div className="mt-4 space-y-3 md:hidden">
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

          <section className="mt-8">
            <h2 className="text-2xl font-black">出身・所属</h2>
            <div className="mt-4 space-y-3 md:hidden">
              {player.careerHistory.map((item) => (
                <MobileCareerHistoryCard
                  key={`${item.category}-${item.period}-${item.name}`}
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
                      key={`${item.category}-${item.period}-${item.name}`}
                      item={item}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <p className="mt-5 text-xs leading-6 text-slate-500">
            注: 年代別PBを確認できていない項目は「確認中」としています。一部の最新記録は当サイトのランキング掲載データを補助的に表示しています。
          </p>
        </article>
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
    <div className="grid grid-cols-[88px_1fr] items-baseline gap-3">
      <p className="text-xs font-black text-slate-500">{label}</p>
      <div className="min-w-0">
        <p className="text-lg font-black text-red-600">
          {formatDisplayTime(record)}
        </p>
        <p className="mt-1 text-xs font-bold text-slate-600">
          記録日: {formatDisplayDate(date)}
        </p>
      </div>
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
    <article className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-black text-slate-900">{item.category}</p>
      <p className="mt-2 text-xs font-bold text-slate-500">{item.period}</p>
      <p className="mt-1 text-sm font-bold text-slate-700">{item.name}</p>
    </article>
  );
}

function CareerHistoryRow({ item }: { item: CareerHistoryItem }) {
  return (
    <tr className="border-b border-slate-200">
      <td className={`${tdClass} font-black`}>{item.category}</td>
      <td className={tdClass}>{item.period}</td>
      <td className={`${tdClass} font-bold`}>{item.name}</td>
    </tr>
  );
}

function MobileCareerStageCard({ best }: { best: CareerStageBest }) {
  return (
    <article className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-black text-slate-900">{best.stage}</p>
      <div className="mt-3 grid gap-2 text-sm">
        <p className="flex items-baseline justify-between gap-3">
          <span className="font-bold text-slate-500">5000m</span>
          <span className="font-black text-red-600">
            {formatDisplayTime(best.record5000m)}
          </span>
        </p>
        <p className="flex items-baseline justify-between gap-3">
          <span className="font-bold text-slate-500">10000m</span>
          <span className="font-black text-red-600">
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
      <td className={`${tdClass} font-black`}>{best.stage}</td>
      <td className={`${tdClass} font-black text-red-600`}>
        {formatDisplayTime(best.record5000m)}
      </td>
      <td className={`${tdClass} font-black text-red-600`}>
        {formatDisplayTime(best.record10000m)}
      </td>
    </tr>
  );
}

const thClass = "px-4 py-3 font-bold whitespace-nowrap";
const tdClass = "px-4 py-4 align-top";


