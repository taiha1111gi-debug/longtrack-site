"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { formatDisplayDate, formatDisplayTime } from "../lib/displayFormat";
import type { RankingRecord } from "./data";

export function RankingTable({ records }: { records: RankingRecord[] }) {
  const pathname = usePathname();
  const playerHref = (slug: string) =>
    `/players/${slug}?from=${encodeURIComponent(pathname)}`;

  return (
    <>
      <p className="mt-5 text-xs font-bold leading-5 text-slate-500 md:hidden">
        表示例: 選手名（記録当時の所属） タイム
        <br />
        大会・場所 / 日付
      </p>
      <div className="mt-3 space-y-3 md:hidden">
        {records.map((runner) => (
          <article
            key={`${runner.rank}-${runner.slug}-${runner.record}-card`}
            className="rounded-md border border-slate-200 bg-white px-4 py-3 shadow-sm"
          >
            <div className="flex items-baseline justify-between gap-3">
              <div className="min-w-0">
                <span className="mr-2 text-xs font-black tracking-[0.12em] text-cyan-700">
                  {runner.rank}位
                </span>
                <Link
                  href={playerHref(runner.slug)}
                  className="text-base font-black text-slate-900 underline decoration-slate-900 decoration-2 underline-offset-4 hover:text-cyan-700"
                >
                  {runner.name}
                </Link>
                <span className="ml-1 text-xs font-bold text-slate-500">
                  （{runner.team}）
                </span>
              </div>
              <p className="shrink-0 text-base font-black text-red-600">
                {formatDisplayTime(runner.record)}
              </p>
            </div>
            <p className="mt-2 text-xs font-bold leading-5 text-slate-600">
              {runner.venue}
              <span className="mx-2 text-slate-400">/</span>
              <span className="whitespace-nowrap">
                {formatDisplayDate(runner.date)}
              </span>
            </p>
          </article>
        ))}
      </div>

      <div className="mt-5 hidden overflow-x-auto rounded-md border border-slate-200 md:block">
        <table className="w-full min-w-[860px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-slate-900 text-white">
              <th className={thClass}>順位</th>
              <th className={thClass}>選手名</th>
              <th className={thClass}>記録</th>
              <th className={thClass}>
                <span className="block">所属</span>
                <span className="block text-xs font-medium text-slate-300">
                  記録当時
                </span>
              </th>
              <th className={thClass}>大会・場所</th>
              <th className={thClass}>日付</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {records.map((runner) => (
              <tr
                key={`${runner.rank}-${runner.slug}-${runner.record}`}
                className="border-b border-slate-200"
              >
                <td className={tdClass}>{runner.rank}</td>
                <td className={`${tdClass} font-bold`}>
                  <Link
                    href={playerHref(runner.slug)}
                    className="text-slate-900 underline decoration-slate-900 decoration-2 underline-offset-4 hover:text-cyan-700"
                  >
                    {runner.name}
                  </Link>
                </td>
                <td className={`${tdClass} font-black text-red-600`}>
                  {formatDisplayTime(runner.record)}
                </td>
                <td className={tdClass}>{runner.team}</td>
                <td className={tdClass}>{runner.venue}</td>
                <td className={tdClass}>{formatDisplayDate(runner.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

const thClass = "px-4 py-3 font-bold whitespace-nowrap";
const tdClass = "px-4 py-4 align-top";


