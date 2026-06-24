"use client";

import { useActionState } from "react";
import {
  previewImportedRecordsAction,
  type ImportPreviewState,
} from "./actions";

const initialState: ImportPreviewState = {
  status: "idle",
  message: "",
  sourceUrl: "",
  groupId: "season-5000",
  candidates: [],
  excludedCount: 0,
};

const titleLabel = "\u0055\u0052\u004c\u304b\u3089\u8a18\u9332\u5019\u88dc\u3092\u8aad\u307f\u53d6\u308b";
const descriptionLabel = "\u6307\u5b9a\u3057\u305f\u30da\u30fc\u30b8\u672c\u6587\u304b\u3089\u8a18\u9332\u5019\u88dc\u3092\u62bd\u51fa\u3057\u307e\u3059\u3002\u3053\u306e\u6bb5\u968e\u3067\u306f\u4fdd\u5b58\u3057\u307e\u305b\u3093\u3002";
const sourceUrlLabel = "\u7d50\u679c\u30da\u30fc\u30b8\u0055\u0052\u004c";
const groupLabel = "\u53d6\u308a\u8fbc\u307f\u5148\u30e9\u30f3\u30ad\u30f3\u30b0";
const submitLabel = "\u5019\u88dc\u3092\u8aad\u307f\u53d6\u308b";
const loadingLabel = "\u8aad\u307f\u53d6\u308a\u4e2d...";
const candidateLabel = "\u62bd\u51fa\u5019\u88dc";
const excludedLabel = "\u9664\u5916\u4ef6\u6570";
const noSaveLabel = "\u203b\u8868\u793a\u306e\u307f\u3067\u3001data/longtrack-db.json\u306b\u306f\u4fdd\u5b58\u3057\u307e\u305b\u3093\u3002";
const rankLabel = "\u5019\u88dc";
const nameLabel = "\u9078\u624b\u540d";
const recordLabel = "\u8a18\u9332";
const teamLabel = "\u6240\u5c5e";
const typeLabel = "\u5224\u5b9a";
const venueLabel = "\u5927\u4f1a\u30fb\u5834\u6240";
const dateLabel = "\u65e5\u4ed8";
const noteLabel = "\u30e1\u30e2";
const emptyLabel = "\u5019\u88dc\u306f\u307e\u3060\u3042\u308a\u307e\u305b\u3093\u3002";
const diagnosticsLabel = "\u8aad\u307f\u53d6\u308a\u8a3a\u65ad";
const fetchedLinesLabel = "\u672c\u6587\u884c\u6570";
const headingCountLabel = "\u898b\u51fa\u3057\u5019\u88dc";
const targetSectionLabel = "\u5bfe\u8c61\u7a2e\u76ee\u884c";
const parsedLineLabel = "\u8a18\u9332\u884c\u8a8d\u8b58";
const statusExcludedLabel = "DNS/DNF/NM\u7b49";
const thresholdExcludedLabel = "\u57fa\u6e96\u5916";
const unparsedTimeLabel = "\u30bf\u30a4\u30e0\u3042\u308a\u30fb\u672a\u89e3\u6790";
const thresholdLabel = "\u57fa\u6e96\u30bf\u30a4\u30e0";
const eventDistanceLabel = "\u5bfe\u8c61\u7a2e\u76ee";
const sampleHeadingLabel = "\u898b\u51fa\u3057\u30b5\u30f3\u30d7\u30eb";
const sampleParsedLabel = "\u8a18\u9332\u884c\u30b5\u30f3\u30d7\u30eb";
const sampleUnparsedLabel = "\u672a\u89e3\u6790\u884c\u30b5\u30f3\u30d7\u30eb";
const season5000Label = "\u4eca\u5b63\u7537\u5b505000m";
const season10000Label = "\u4eca\u5b63\u7537\u5b5010000m";
const freshman5000Label = "2027\u65b0\u5165\u751f \u9ad8\u68215000m";

const teamTypeClasses = {
  "high-school": "bg-amber-100 text-amber-800",
  university: "bg-sky-100 text-sky-800",
  corporate: "bg-emerald-100 text-emerald-800",
  unknown: "bg-slate-100 text-slate-600",
};

export function ImportPreviewTool() {
  const [state, formAction, isPending] = useActionState(
    previewImportedRecordsAction,
    initialState,
  );

  return (
    <section className="mt-8 rounded-md border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-black">{titleLabel}</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            {descriptionLabel}
          </p>
        </div>
        <p className="text-xs font-bold text-slate-500">{noSaveLabel}</p>
      </div>

      <form
        action={formAction}
        className="mt-5 grid gap-3 rounded-md border border-slate-200 bg-slate-50 p-4 lg:grid-cols-[1fr_260px_160px]"
      >
        <label className="block min-w-0">
          <span className="text-xs font-bold text-slate-500">
            {sourceUrlLabel}
          </span>
          <input
            name="sourceUrl"
            type="url"
            defaultValue={state.sourceUrl}
            placeholder="https://example.com/result"
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-cyan-700"
            required
          />
        </label>

        <label className="block min-w-0">
          <span className="text-xs font-bold text-slate-500">{groupLabel}</span>
          <select
            name="groupId"
            defaultValue={state.groupId}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-cyan-700"
          >
            <option value="season-5000">{season5000Label}</option>
            <option value="season-10000">{season10000Label}</option>
            <option value="freshman-2027-5000">{freshman5000Label}</option>
          </select>
        </label>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-md bg-cyan-700 px-4 py-3 text-sm font-bold text-white hover:bg-cyan-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isPending ? loadingLabel : submitLabel}
          </button>
        </div>
      </form>

      {state.status !== "idle" && (
        <div
          className={`mt-4 rounded-md border px-4 py-3 text-sm font-bold ${
            state.status === "success"
              ? "border-cyan-200 bg-cyan-50 text-cyan-900"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {state.message}
        </div>
      )}

      {state.status === "success" && (
        <div className="mt-5">
          <div className="mb-3 flex flex-wrap items-center gap-3 text-sm font-bold text-slate-600">
            <span>{candidateLabel}: {state.candidates.length}</span>
            <span>{excludedLabel}: {state.excludedCount}</span>
          </div>

          {state.diagnostics && (
            <DiagnosticsPanel diagnostics={state.diagnostics} />
          )}

          {state.candidates.length > 0 ? (
            <div className="overflow-auto rounded-md border border-slate-200">
              <table className="w-full min-w-[1100px] border-collapse bg-white text-sm">
                <thead className="bg-slate-900 text-left text-white">
                  <tr>
                    <th className="px-3 py-3 font-bold whitespace-nowrap">{rankLabel}</th>
                    <th className="px-3 py-3 font-bold whitespace-nowrap">{nameLabel}</th>
                    <th className="px-3 py-3 font-bold whitespace-nowrap">{recordLabel}</th>
                    <th className="px-3 py-3 font-bold whitespace-nowrap">{teamLabel}</th>
                    <th className="px-3 py-3 font-bold whitespace-nowrap">{typeLabel}</th>
                    <th className="px-3 py-3 font-bold whitespace-nowrap">{venueLabel}</th>
                    <th className="px-3 py-3 font-bold whitespace-nowrap">{dateLabel}</th>
                    <th className="px-3 py-3 font-bold whitespace-nowrap">{noteLabel}</th>
                  </tr>
                </thead>
                <tbody>
                  {state.candidates.map((candidate) => (
                    <tr
                      key={`${candidate.rank}-${candidate.name}-${candidate.record}-${candidate.team}`}
                      className="border-b border-slate-200"
                    >
                      <td className="px-3 py-3 font-bold text-slate-500">
                        {candidate.rank}
                      </td>
                      <td className="px-3 py-3 font-bold text-slate-900">
                        {candidate.name}
                      </td>
                      <td className="px-3 py-3 font-black text-red-600">
                        {candidate.record}
                      </td>
                      <td className="px-3 py-3 text-slate-700">
                        {candidate.team}
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-bold ${teamTypeClasses[candidate.teamType]}`}
                        >
                          {candidate.teamTypeLabel}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-slate-700">
                        {candidate.venue || "-"}
                      </td>
                      <td className="px-3 py-3 text-slate-700">
                        {candidate.date || "-"}
                      </td>
                      <td className="px-3 py-3 text-slate-600">
                        {candidate.note || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-md border border-slate-200 bg-slate-50 px-4 py-6 text-sm font-bold text-slate-500">
              {emptyLabel}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

type DiagnosticsPanelProps = {
  diagnostics: NonNullable<ImportPreviewState["diagnostics"]>;
};

function DiagnosticsPanel({ diagnostics }: DiagnosticsPanelProps) {
  const items = [
    { label: fetchedLinesLabel, value: diagnostics.fetchedTextLines },
    { label: headingCountLabel, value: diagnostics.eventHeadingCount },
    { label: targetSectionLabel, value: diagnostics.targetSectionLineCount },
    { label: parsedLineLabel, value: diagnostics.parsedRecordLineCount },
    { label: statusExcludedLabel, value: diagnostics.excludedStatusCount },
    { label: thresholdExcludedLabel, value: diagnostics.excludedThresholdCount },
    { label: unparsedTimeLabel, value: diagnostics.unparsedTimeLineCount },
    { label: thresholdLabel, value: diagnostics.threshold },
    { label: eventDistanceLabel, value: diagnostics.eventDistance },
  ];

  return (
    <div className="mb-5 rounded-md border border-slate-200 bg-slate-50 p-4">
      <h3 className="text-sm font-black text-slate-900">{diagnosticsLabel}</h3>
      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.label} className="rounded-md bg-white px-3 py-2 text-sm">
            <p className="text-xs font-bold text-slate-500">{item.label}</p>
            <p className="mt-1 font-black text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>
      <DiagnosticSamples label={sampleHeadingLabel} lines={diagnostics.sampleEventHeadings} />
      <DiagnosticSamples label={sampleParsedLabel} lines={diagnostics.sampleParsedLines} />
      <DiagnosticSamples label={sampleUnparsedLabel} lines={diagnostics.sampleUnparsedTimeLines} />
    </div>
  );
}

type DiagnosticSamplesProps = {
  label: string;
  lines: string[];
};

function DiagnosticSamples({ label, lines }: DiagnosticSamplesProps) {
  if (lines.length === 0) {
    return null;
  }

  return (
    <details className="mt-3 rounded-md border border-slate-200 bg-white p-3">
      <summary className="cursor-pointer text-xs font-black text-slate-700">
        {label}
      </summary>
      <ul className="mt-2 space-y-1 text-xs leading-6 text-slate-600">
        {lines.map((line, index) => (
          <li key={label + "-" + index} className="break-all rounded bg-slate-50 px-2 py-1">
            {line}
          </li>
        ))}
      </ul>
    </details>
  );
}
