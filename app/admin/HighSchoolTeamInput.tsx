"use client";

import { useState } from "react";

type TeamCandidateInputProps = {
  name?: string;
  value: string;
};

type TeamCandidateFieldProps = TeamCandidateInputProps & {
  label: string;
};

const highSchoolCandidateLabel = "\u9ad8\u6821\u5019\u88dc";
const notHighSchoolCandidateLabel = "\u9ad8\u6821\u5019\u88dc\u5916";
const highSchoolRuleLabel = "\u672b\u5c3e\u304c\u9ad8\u30fb\u6821";

function isHighSchoolCandidate(team: string) {
  const normalizedTeam = team.trim();
  return normalizedTeam.endsWith("\u9ad8") || normalizedTeam.endsWith("\u6821");
}

function CandidateBadge({ team }: { team: string }) {
  const isCandidate = isHighSchoolCandidate(team);

  return (
    <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] leading-none">
      <span
        className={`rounded-full px-2 py-1 font-bold ${
          isCandidate
            ? "bg-amber-100 text-amber-800"
            : "bg-slate-100 text-slate-500"
        }`}
      >
        {isCandidate ? highSchoolCandidateLabel : notHighSchoolCandidateLabel}
      </span>
      <span className="text-slate-400">{highSchoolRuleLabel}</span>
    </div>
  );
}

export function TeamCandidateField({
  label,
  name,
  value,
}: TeamCandidateFieldProps) {
  const [team, setTeam] = useState(value);

  return (
    <label className="block min-w-0">
      <span className="text-xs font-bold text-slate-500">{label}</span>
      <input
        name={name}
        value={team}
        onChange={(event) => setTeam(event.target.value)}
        className="mt-1 w-full rounded-md border border-slate-300 bg-white px-2 py-2 text-sm outline-none focus:border-cyan-700"
      />
      <CandidateBadge team={team} />
    </label>
  );
}

export function TeamCandidateCell({ name, value }: TeamCandidateInputProps) {
  const [team, setTeam] = useState(value);

  return (
    <div className="min-w-[180px] px-2 py-1.5">
      <input
        name={name}
        value={team}
        onChange={(event) => setTeam(event.target.value)}
        className="h-9 w-full min-w-0 border-0 bg-transparent px-0 text-sm outline-none focus:bg-cyan-50 focus:ring-2 focus:ring-inset focus:ring-cyan-600"
      />
      <CandidateBadge team={team} />
    </div>
  );
}