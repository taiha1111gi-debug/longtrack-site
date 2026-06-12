"use client";

import { useMemo, useState } from "react";
import type {
  CareerHistoryItem,
  CareerStageBest,
  PlayerProfile,
} from "../records/data";
import { updatePlayerProfileAction } from "./actions";

export function PlayerProfileEditor({ profiles }: { profiles: PlayerProfile[] }) {
  const [query, setQuery] = useState("");
  const [onlyPending, setOnlyPending] = useState(false);

  const pendingProfiles = useMemo(
    () => profiles.filter(hasPendingValue),
    [profiles],
  );

  const filteredProfiles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return profiles.filter((profile) => {
      const matchesQuery =
        normalizedQuery === "" ||
        [profile.name, profile.slug, profile.team]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesPending = !onlyPending || hasPendingValue(profile);

      return matchesQuery && matchesPending;
    });
  }, [onlyPending, profiles, query]);

  return (
    <section className="mt-8 rounded-md border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-black">個人ページ編集</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            選手ページの記録・所属・出身情報を手動で上書きできます。
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-[minmax(220px,320px)_auto] sm:items-end">
          <label className="block">
            <span className="text-xs font-bold text-slate-500">名前で検索</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="例: 佐藤 / sato"
              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-cyan-700"
            />
          </label>
          <label className="flex h-10 items-center gap-2 rounded-md border border-slate-300 bg-slate-50 px-3 text-sm font-bold">
            <input
              type="checkbox"
              checked={onlyPending}
              onChange={(event) => setOnlyPending(event.target.checked)}
              className="h-4 w-4 accent-cyan-700"
            />
            確認中だけ表示
          </label>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
        <span className="rounded-md bg-slate-100 px-3 py-2">
          表示中: {filteredProfiles.length}人
        </span>
        <span className="rounded-md bg-amber-100 px-3 py-2 text-amber-800">
          確認中あり: {pendingProfiles.length}人
        </span>
      </div>

      <div className="mt-5 grid gap-3">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => (
            <PlayerProfileForm key={profile.slug} profile={profile} />
          ))
        ) : (
          <p className="rounded-md bg-slate-100 p-4 text-sm font-bold text-slate-500">
            条件に合う選手はいません。
          </p>
        )}
      </div>
    </section>
  );
}

function PlayerProfileForm({ profile }: { profile: PlayerProfile }) {
  const careerHistoryRows = [
    ...profile.careerHistory,
    { category: "所属チーム", period: "", name: "" } satisfies CareerHistoryItem,
    { category: "所属チーム", period: "", name: "" } satisfies CareerHistoryItem,
  ];
  const pendingItems = getPendingLabels(profile);

  return (
    <details className="overflow-hidden rounded-md border border-slate-200 bg-slate-50">
      <summary className="cursor-pointer px-4 py-3 text-sm font-black text-slate-900">
        <span>{profile.name} / {profile.slug}</span>
        {pendingItems.length > 0 && (
          <span className="ml-3 rounded-md bg-amber-100 px-2 py-1 text-xs text-amber-800">
            確認中 {pendingItems.length}件
          </span>
        )}
      </summary>
      <form action={updatePlayerProfileAction} className="border-t border-slate-200 bg-white p-4">
        {pendingItems.length > 0 && (
          <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-xs font-bold leading-6 text-amber-900">
            確認中: {pendingItems.join(" / ")}
          </div>
        )}
        <input type="hidden" name="slug" value={profile.slug} />
        <input type="hidden" name="historyRowCount" value={careerHistoryRows.length} />
        <input type="hidden" name="bestRowCount" value={profile.careerStageBests.length} />

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <Field label="選手名" name="name" value={profile.name} />
          <Field label="現在所属" name="team" value={profile.team} />
          <Field label="5000m記録" name="record5000m" value={profile.record5000m} />
          <Field label="5000m記録日" name="record5000mDate" value={profile.record5000mDate} />
          <Field label="10000m記録" name="record10000m" value={profile.record10000m} />
          <Field label="10000m記録日" name="record10000mDate" value={profile.record10000mDate} />
        </div>

        <div className="mt-5 overflow-x-auto rounded-md border border-slate-200">
          <table className="w-full min-w-[760px] border-collapse bg-white text-sm">
            <thead className="bg-slate-900 text-left text-white">
              <tr>
                <th className={tableHeadClass}>区分</th>
                <th className={tableHeadClass}>期間</th>
                <th className={tableHeadClass}>学校・チーム</th>
              </tr>
            </thead>
            <tbody>
              {careerHistoryRows.map((item, index) => (
                <tr key={`history-${profile.slug}-${index}`} className="border-b border-slate-200">
                  <td className={tableCellClass}>
                    <select
                      name={`history.${index}.category`}
                      defaultValue={item.category}
                      className={cellInputClass}
                    >
                      <option value="出身高校">出身高校</option>
                      <option value="出身大学">出身大学</option>
                      <option value="所属チーム">所属チーム</option>
                    </select>
                  </td>
                  <td className={tableCellClass}>
                    <CellInput name={`history.${index}.period`} value={item.period} />
                  </td>
                  <td className={tableCellClass}>
                    <CellInput name={`history.${index}.name`} value={item.name} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 overflow-x-auto rounded-md border border-slate-200">
          <table className="w-full min-w-[900px] border-collapse bg-white text-sm">
            <thead className="bg-slate-900 text-left text-white">
              <tr>
                <th className={tableHeadClass}>年代</th>
                <th className={tableHeadClass}>5000m PB</th>
                <th className={tableHeadClass}>10000m PB</th>
                <th className={tableHeadClass}>メモ</th>
              </tr>
            </thead>
            <tbody>
              {profile.careerStageBests.map((best, index) => (
                <CareerBestEditRow
                  key={`${profile.slug}-${best.stage}`}
                  best={best}
                  index={index}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-700"
          >
            個人ページを保存
          </button>
        </div>
      </form>
    </details>
  );
}

function CareerBestEditRow({
  best,
  index,
}: {
  best: CareerStageBest;
  index: number;
}) {
  return (
    <tr className="border-b border-slate-200">
      <td className={tableCellClass}>
        <select
          name={`bests.${index}.stage`}
          defaultValue={best.stage}
          className={cellInputClass}
        >
          <option value="高校時代">高校時代</option>
          <option value="大学時代">大学時代</option>
          <option value="社会人">社会人</option>
        </select>
      </td>
      <td className={tableCellClass}>
        <CellInput name={`bests.${index}.record5000m`} value={best.record5000m} strong />
      </td>
      <td className={tableCellClass}>
        <CellInput name={`bests.${index}.record10000m`} value={best.record10000m} strong />
      </td>
      <td className={tableCellClass}>
        <CellInput name={`bests.${index}.note`} value={best.note} />
      </td>
    </tr>
  );
}

function Field({
  label,
  name,
  value,
}: {
  label: string;
  name: string;
  value: string;
}) {
  return (
    <label className="block min-w-0">
      <span className="text-xs font-bold text-slate-500">{label}</span>
      <input
        name={name}
        defaultValue={value}
        className="mt-1 w-full rounded-md border border-slate-300 bg-white px-2 py-2 text-sm outline-none focus:border-cyan-700"
      />
    </label>
  );
}

function CellInput({
  name,
  value,
  strong = false,
}: {
  name: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <input
      name={name}
      defaultValue={value}
      className={`h-9 w-full min-w-0 border-0 bg-transparent px-2 text-sm outline-none focus:bg-cyan-50 focus:ring-2 focus:ring-inset focus:ring-cyan-600 ${
        strong ? "font-black text-red-600" : ""
      }`}
    />
  );
}

function hasPendingValue(profile: PlayerProfile) {
  return getPendingLabels(profile).length > 0;
}

function getPendingLabels(profile: PlayerProfile) {
  const labels: string[] = [];

  if (isPending(profile.team)) labels.push("現在所属");
  if (isPending(profile.record5000m) || isPending(profile.record5000mDate)) {
    labels.push("5000m記録");
  }
  if (isPending(profile.record10000m) || isPending(profile.record10000mDate)) {
    labels.push("10000m記録");
  }

  profile.careerHistory.forEach((item) => {
    if (isPending(item.period) || isPending(item.name)) {
      labels.push(`${item.category}`);
    }
  });

  profile.careerStageBests.forEach((best) => {
    if (
      isPending(best.record5000m) ||
      isPending(best.record10000m) ||
      isPending(best.note)
    ) {
      labels.push(`${best.stage}PB`);
    }
  });

  return Array.from(new Set(labels));
}

function isPending(value: string) {
  return value.includes("確認中");
}

const tableHeadClass = "px-3 py-3 font-bold whitespace-nowrap";
const tableCellClass = "border-r border-slate-200 p-0 align-middle";
const cellInputClass =
  "h-9 w-full min-w-0 border-0 bg-transparent px-2 text-sm outline-none focus:bg-cyan-50 focus:ring-2 focus:ring-inset focus:ring-cyan-600";
