import { formatDisplayDate } from "../lib/displayFormat";
import type { RankingRecord } from "./data";

type RecordDate = Pick<RankingRecord, "date">;

export function LastUpdated({ records }: { records: RecordDate[] }) {
  const latestDate = getLatestRecordDate(records);

  if (!latestDate) {
    return null;
  }

  return (
    <p className="mt-4 text-right text-xs leading-6 text-slate-500">
      最終更新日: {formatDisplayDate(latestDate)}
    </p>
  );
}

function getLatestRecordDate(records: RecordDate[]) {
  return records
    .map((record) => normalizeRecordDate(record.date))
    .filter((date): date is string => Boolean(date))
    .sort()
    .at(-1);
}

function normalizeRecordDate(value: string | undefined) {
  const match = String(value ?? "")
    .trim()
    .match(/^(\d{4})[/-](\d{1,2})[/-](\d{1,2})$/);

  if (!match) {
    return "";
  }

  return [
    match[1],
    match[2].padStart(2, "0"),
    match[3].padStart(2, "0"),
  ].join("-");
}
