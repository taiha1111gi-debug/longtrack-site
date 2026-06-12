import { formatDisplayDate } from "../lib/displayFormat";

export function LastUpdated({ value }: { value: string }) {
  if (value === "確認中") {
    return null;
  }

  return (
    <p className="mt-4 text-right text-xs leading-6 text-slate-500">
      最終更新日: {formatDisplayDate(value)}
    </p>
  );
}
