import { formatDisplayDate, formatDisplayTime } from "../lib/displayFormat";
import type { RankingRecord } from "../records/data";

export function FreshmanRankingTable({ records }: { records: RankingRecord[] }) {
  return (
    <>
      <div className="mt-5 space-y-3 md:hidden">
        {records.map((runner) => (
          <article
            key={`${runner.rank}-${runner.slug}-${runner.record}-freshman-card`}
            className="rounded-md border border-slate-200 bg-white px-4 py-3 shadow-sm"
          >
            <div className="flex items-baseline justify-between gap-3">
              <div className="min-w-0">
                <span className="mr-2 text-xs font-black tracking-[0.12em] text-cyan-700">
                  {runner.rank}位
                </span>
                <span className="text-base font-black text-slate-900">
                  {runner.name}
                </span>
                <span className="ml-1 text-xs font-bold text-slate-500">
                  （{runner.team}）
                </span>
              </div>
              <p className="shrink-0 text-base font-black text-red-600">
                {formatDisplayTime(runner.record)}
              </p>
            </div>
            <p className="mt-2 text-xs font-bold leading-5 text-slate-600">
              {displayOptional(runner.venue, "大会・場所未確認")}
              <span className="mx-2 text-slate-400">/</span>
              <span className="whitespace-nowrap">
                {displayOptional(formatDisplayDate(runner.date), "日付未確認")}
              </span>
            </p>
            <p className="mt-2 text-xs font-bold leading-5 text-slate-600">
              進路: {displayOptional(runner.destination, "")}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-5 hidden overflow-x-auto rounded-md border border-slate-200 md:block">
        <table className="w-full min-w-[980px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-slate-900 text-white">
              <th className={rankingThClass}>順位</th>
              <th className={rankingThClass}>選手名</th>
              <th className={rankingThClass}>記録</th>
              <th className={rankingThClass}>所属</th>
              <th className={rankingThClass}>大会・場所</th>
              <th className={rankingThClass}>日付</th>
              <th className={rankingThClass}>進路</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {records.map((runner) => (
              <tr
                key={`${runner.rank}-${runner.slug}-${runner.record}-freshman`}
                className="border-b border-slate-200"
              >
                <td className={rankingTdClass}>{runner.rank}</td>
                <td className={`${rankingTdClass} font-bold`}>{runner.name}</td>
                <td className={`${rankingTdClass} font-black text-red-600`}>
                  {formatDisplayTime(runner.record)}
                </td>
                <td className={rankingTdClass}>{runner.team}</td>
                <td className={rankingTdClass}>{displayOptional(runner.venue, "未確認")}</td>
                <td className={rankingTdClass}>
                  {displayOptional(formatDisplayDate(runner.date), "未確認")}
                </td>
                <td className={rankingTdClass}>{displayOptional(runner.destination, "")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function displayOptional(value: string | undefined, fallback: string) {
  const trimmedValue = String(value ?? "").trim();

  return trimmedValue === "" ? fallback : trimmedValue;
}

const rankingThClass = "px-4 py-3 font-bold whitespace-nowrap";
const rankingTdClass = "px-4 py-4 align-top";
