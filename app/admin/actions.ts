"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  clearAdminSession,
  isAdminLoggedIn,
  isAuthConfigured,
  isValidPassword,
  setAdminSession,
} from "./auth";
import {
  addEditableRecord,
  getEditableRecords,
  replaceEditableRecords,
  upsertPlayerProfileOverride,
  updateEditableRecord,
  type EditableRecord,
} from "../lib/db";
import type { CareerHistoryItem, CareerStageBest, RankingRecord } from "../records/data";

export async function loginAction(formData: FormData) {
  if (!isAuthConfigured()) {
    redirect("/admin/login?error=config");
  }

  const password = String(formData.get("password") ?? "");

  if (!isValidPassword(password)) {
    redirect("/admin/login?error=password");
  }

  await setAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function updateRecordAction(formData: FormData) {
  if (!(await isAdminLoggedIn())) {
    redirect("/admin/login");
  }

  const groupId = String(formData.get("groupId")) as EditableRecord["groupId"];
  const rank = Number(formData.get("rank"));

  if (!isRankingGroup(groupId)) {
    throw new Error("Invalid ranking group.");
  }

  const record = normalizeRecordInput({
    groupId,
    rank,
    slug: String(formData.get("slug") ?? ""),
    name: String(formData.get("name") ?? ""),
    record: String(formData.get("record") ?? ""),
    team: String(formData.get("team") ?? ""),
    venue: String(formData.get("venue") ?? ""),
    date: String(formData.get("date") ?? ""),
    destination: String(formData.get("destination") ?? ""),
    note: String(formData.get("note") ?? ""),
    sourceUrl: String(formData.get("sourceUrl") ?? ""),
    sourceName: String(formData.get("sourceName") ?? ""),
    verifiedAt: String(formData.get("verifiedAt") ?? ""),
    verificationStatus: toVerificationStatus(formData.get("verificationStatus")),
  });
  const validationError = validateRecords([record]);

  if (validationError) {
    redirectAdmin(validationError);
  }

  updateEditableRecord(record);

  revalidatePath("/records/5000m/season");
  revalidatePath("/records/10000m/season");
  revalidatePath("/records/freshman-2027-5000");
  revalidatePath("/");
  revalidatePath("/admin");
  redirectAdmin();
}

export async function updateRecordsAction(formData: FormData) {
  if (!(await isAdminLoggedIn())) {
    redirect("/admin/login");
  }

  const groupId = String(formData.get("groupId")) as EditableRecord["groupId"];
  const rowCount = Number(formData.get("rowCount"));

  if (!isRankingGroup(groupId)) {
    throw new Error("Invalid ranking group.");
  }

  const records: RankingRecord[] = Array.from({ length: rowCount }).flatMap(
    (_, index) => {
      if (formData.get(`rows.${index}.delete`) === "on") {
        return [];
      }

      return [
        normalizeRecordInput({
          rank: Number(formData.get(`rows.${index}.rank`)),
          slug: String(formData.get(`rows.${index}.slug`) ?? ""),
          name: String(formData.get(`rows.${index}.name`) ?? ""),
          record: String(formData.get(`rows.${index}.record`) ?? ""),
          team: String(formData.get(`rows.${index}.team`) ?? ""),
          venue: String(formData.get(`rows.${index}.venue`) ?? ""),
          date: String(formData.get(`rows.${index}.date`) ?? ""),
          destination: String(formData.get(`rows.${index}.destination`) ?? ""),
          note: String(formData.get(`rows.${index}.note`) ?? ""),
          sourceUrl: String(formData.get(`rows.${index}.sourceUrl`) ?? ""),
          sourceName: String(formData.get(`rows.${index}.sourceName`) ?? ""),
          verifiedAt: String(formData.get(`rows.${index}.verifiedAt`) ?? ""),
          verificationStatus: toVerificationStatus(
            formData.get(`rows.${index}.verificationStatus`),
          ),
        }),
      ];
    },
  );
  const validationError = validateRecords(records);

  if (validationError) {
    redirectAdmin(validationError);
  }

  replaceEditableRecords(groupId, records);

  revalidatePath("/records/5000m/season");
  revalidatePath("/records/10000m/season");
  revalidatePath("/records/freshman-2027-5000");
  revalidatePath("/");
  revalidatePath("/admin");
  redirectAdmin();
}

export async function addRecordAction(formData: FormData) {
  if (!(await isAdminLoggedIn())) {
    redirect("/admin/login");
  }

  const groupId = String(formData.get("groupId")) as EditableRecord["groupId"];

  if (!isRankingGroup(groupId)) {
    throw new Error("Invalid ranking group.");
  }

  const record = normalizeRecordInput({
    groupId,
    slug: String(formData.get("slug") ?? ""),
    name: String(formData.get("name") ?? ""),
    record: String(formData.get("record") ?? ""),
    team: String(formData.get("team") ?? ""),
    venue: String(formData.get("venue") ?? ""),
    date: String(formData.get("date") ?? ""),
    destination: String(formData.get("destination") ?? ""),
    note: String(formData.get("note") ?? ""),
    sourceUrl: String(formData.get("sourceUrl") ?? ""),
    sourceName: String(formData.get("sourceName") ?? ""),
    verifiedAt: String(formData.get("verifiedAt") ?? ""),
    verificationStatus: toVerificationStatus(formData.get("verificationStatus")),
  });
  const validationError = validateRecords([...getEditableRecords(groupId), record]);

  if (validationError) {
    redirectAdmin(validationError);
  }

  addEditableRecord(record);

  revalidatePath("/records/5000m/season");
  revalidatePath("/records/10000m/season");
  revalidatePath("/records/freshman-2027-5000");
  revalidatePath("/");
  revalidatePath("/admin");
  redirectAdmin();
}

export async function updatePlayerProfileAction(formData: FormData) {
  if (!(await isAdminLoggedIn())) {
    redirect("/admin/login");
  }

  const slug = String(formData.get("slug") ?? "");
  const historyRowCount = Number(formData.get("historyRowCount"));
  const bestRowCount = Number(formData.get("bestRowCount"));

  if (!slug) {
    throw new Error("Player slug is required.");
  }

  const careerHistory = Array.from({ length: historyRowCount }, (_, index) => ({
    category: String(formData.get(`history.${index}.category`) ?? ""),
    period: String(formData.get(`history.${index}.period`) ?? ""),
    name: String(formData.get(`history.${index}.name`) ?? ""),
  })).filter(isCareerHistoryItem);

  const careerStageBests = Array.from({ length: bestRowCount }, (_, index) => ({
    stage: String(formData.get(`bests.${index}.stage`) ?? ""),
    record5000m: String(formData.get(`bests.${index}.record5000m`) ?? ""),
    record10000m: String(formData.get(`bests.${index}.record10000m`) ?? ""),
    note: String(formData.get(`bests.${index}.note`) ?? ""),
  })).filter(isCareerStageBest);

  upsertPlayerProfileOverride({
    slug,
    name: String(formData.get("name") ?? ""),
    team: String(formData.get("team") ?? ""),
    record5000m: String(formData.get("record5000m") ?? ""),
    record5000mDate: String(formData.get("record5000mDate") ?? ""),
    record10000m: String(formData.get("record10000m") ?? ""),
    record10000mDate: String(formData.get("record10000mDate") ?? ""),
    careerHistory,
    careerStageBests,
  });

  revalidatePath(`/players/${slug}`);
  revalidatePath("/players");
  revalidatePath("/admin");
  redirectAdmin();
}

function normalizeRecordInput<T extends Partial<EditableRecord>>(record: T) {
  return {
    ...record,
    slug: String(record.slug ?? "").trim(),
    name: String(record.name ?? "").trim(),
    record: String(record.record ?? "").trim(),
    team: String(record.team ?? "").trim(),
    venue: String(record.venue ?? "").trim(),
    date: normalizeDate(String(record.date ?? "")),
    destination: String(record.destination ?? "").trim(),
    note: String(record.note ?? "").trim(),
    sourceUrl: String(record.sourceUrl ?? "").trim(),
    sourceName: String(record.sourceName ?? "").trim(),
    verifiedAt: normalizeOptionalDate(String(record.verifiedAt ?? "")),
    verificationStatus: toVerificationStatus(record.verificationStatus),
  } as T & RankingRecord;
}

function validateRecords(records: Array<Partial<EditableRecord>>) {
  const timePattern = /^\d{1,2}:\d{2}\.\d{2}$/;
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  const slugToName = new Map<string, string>();

  for (const record of records) {
    if (!record.slug) {
      return "slugを入力してください。";
    }

    if (record.record && !timePattern.test(record.record)) {
      return `${record.name || record.slug} の記録形式を 13:20.00 の形にしてください。`;
    }

    if (record.date && !datePattern.test(record.date)) {
      return `${record.name || record.slug} の日付形式を YYYY-MM-DD にしてください。`;
    }

    if (record.verifiedAt && !datePattern.test(record.verifiedAt)) {
      return `${record.name || record.slug} の確認日を YYYY-MM-DD にしてください。`;
    }

    const existingName = slugToName.get(record.slug);

    if (existingName && existingName !== record.name) {
      return `slug「${record.slug}」が複数の選手名で使われています。`;
    }

    slugToName.set(record.slug, record.name ?? "");
  }

  return "";
}

function normalizeDate(value: string) {
  return value.trim().replaceAll("/", "-");
}

function normalizeOptionalDate(value: string) {
  const normalized = normalizeDate(value);
  return normalized === "" ? "" : normalized;
}

function toVerificationStatus(
  value: FormDataEntryValue | RankingRecord["verificationStatus"] | null,
): RankingRecord["verificationStatus"] {
  if (value === "confirmed" || value === "checking" || value === "unverified") {
    return value;
  }

  return "unverified";
}

function redirectAdmin(message?: string): never {
  if (message) {
    redirect(`/admin?status=error&message=${encodeURIComponent(message)}`);
  }

  redirect("/admin?status=saved");
}

function isRankingGroup(value: string): value is EditableRecord["groupId"] {
  return (
    value === "season-5000" ||
    value === "season-10000" ||
    value === "freshman-2027-5000"
  );
}

function isCareerHistoryItem(item: {
  category: string;
  period: string;
  name: string;
}): item is CareerHistoryItem {
  return (
    (item.category === "出身高校" ||
      item.category === "出身大学" ||
      item.category === "所属チーム") &&
    item.period.trim() !== "" &&
    item.name.trim() !== ""
  );
}

function isCareerStageBest(item: {
  stage: string;
  record5000m: string;
  record10000m: string;
  note: string;
}): item is CareerStageBest {
  return (
    (item.stage === "高校時代" ||
      item.stage === "大学時代" ||
      item.stage === "社会人") &&
    item.record5000m.trim() !== "" &&
    item.record10000m.trim() !== ""
  );
}

export type ImportRankingGroup = EditableRecord["groupId"];

export type ImportedRecordCandidate = {
  rank: number;
  name: string;
  record: string;
  team: string;
  venue: string;
  date: string;
  sourceUrl: string;
  groupId: ImportRankingGroup;
  teamType: "high-school" | "university" | "corporate" | "unknown";
  teamTypeLabel: string;
  note: string;
};

export type ImportPreviewDiagnostics = {
  fetchedTextLines: number;
  eventHeadingCount: number;
  targetSectionLineCount: number;
  parsedRecordLineCount: number;
  excludedStatusCount: number;
  excludedThresholdCount: number;
  unparsedTimeLineCount: number;
  threshold: string;
  eventDistance: string;
  sampleEventHeadings: string[];
  sampleParsedLines: string[];
  sampleUnparsedTimeLines: string[];
};

export type ImportPreviewState = {
  status: "idle" | "success" | "error";
  message: string;
  sourceUrl: string;
  groupId: ImportRankingGroup;
  candidates: ImportedRecordCandidate[];
  excludedCount: number;
  diagnostics?: ImportPreviewDiagnostics;
};

const importGroupLabels: Record<ImportRankingGroup, string> = {
  "season-5000": "\u4eca\u5b63\u7537\u5b505000m",
  "season-10000": "\u4eca\u5b63\u7537\u5b5010000m",
  "freshman-2027-5000": "2027\u65b0\u5165\u751f \u9ad8\u68215000m",
};

export async function previewImportedRecordsAction(
  _previousState: ImportPreviewState,
  formData: FormData,
): Promise<ImportPreviewState> {
  if (!(await isAdminLoggedIn())) {
    redirect("/admin/login");
  }

  const sourceUrl = String(formData.get("sourceUrl") ?? "").trim();
  const groupId = String(formData.get("groupId") ?? "season-5000") as ImportRankingGroup;

  if (!isRankingGroup(groupId)) {
    return createImportError(sourceUrl, "season-5000", "\u53d6\u308a\u8fbc\u307f\u5148\u30e9\u30f3\u30ad\u30f3\u30b0\u304c\u4e0d\u6b63\u3067\u3059\u3002");
  }

  if (!sourceUrl) {
    return createImportError(sourceUrl, groupId, "URL\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
  }

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(sourceUrl);
  } catch {
    return createImportError(sourceUrl, groupId, "URL\u306e\u5f62\u5f0f\u3092\u78ba\u8a8d\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
  }

  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    return createImportError(sourceUrl, groupId, "http\u307e\u305f\u306fhttps\u306eURL\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
  }

  try {
    const response = await fetch(parsedUrl.toString(), {
      cache: "no-store",
      headers: {
        "user-agent": "LongTrackRecordsAdmin/1.0",
      },
    });

    if (!response.ok) {
      return createImportError(
        sourceUrl,
        groupId,
        `\u30da\u30fc\u30b8\u53d6\u5f97\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002HTTP ${response.status}`,
      );
    }

    const html = await response.text();
    const preview = createImportPreview(html, parsedUrl.toString(), groupId);

    return {
      status: "success",
      message:
        preview.candidates.length > 0
          ? `${importGroupLabels[groupId]}\u306e\u5019\u88dc\u3092${preview.candidates.length}\u4ef6\u8868\u793a\u3057\u307e\u3057\u305f\u3002`
          : "\u6761\u4ef6\u306b\u5408\u3046\u8a18\u9332\u5019\u88dc\u306f\u898b\u3064\u304b\u308a\u307e\u305b\u3093\u3067\u3057\u305f\u3002",
      sourceUrl,
      groupId,
      candidates: preview.candidates,
      excludedCount: preview.excludedCount,
      diagnostics: preview.diagnostics,
    };
  } catch (error) {
    return createImportError(
      sourceUrl,
      groupId,
      error instanceof Error
        ? error.message
        : "\u30da\u30fc\u30b8\u53d6\u5f97\u4e2d\u306b\u30a8\u30e9\u30fc\u304c\u767a\u751f\u3057\u307e\u3057\u305f\u3002",
    );
  }
}

function createImportError(
  sourceUrl: string,
  groupId: ImportRankingGroup,
  message: string,
): ImportPreviewState {
  return {
    status: "error",
    message,
    sourceUrl,
    groupId,
    candidates: [],
    excludedCount: 0,
  };
}

function createImportPreview(
  html: string,
  sourceUrl: string,
  groupId: ImportRankingGroup,
) {
  const eventDistance = groupId === "season-10000" ? "10000m" : "5000m";
  const threshold = groupId === "season-10000" ? "28:10.00" : groupId === "season-5000" ? "13:30.00" : "15:00.00";
  const thresholdSeconds = parseImportRecordTime(threshold);
  const readableText = htmlToReadableText(html);
  const venue = extractPageTitle(html) || extractMeetName(readableText) || "";
  const date = extractDate(readableText);
  const lines = readableText.split("\n").map((line) => line.trim()).filter(Boolean);
  const eventHeadings = lines.filter((line) => isAnyEventHeading(line));
  const targetLines = getTargetEventLines(lines, eventDistance);
  const parseLines = targetLines;
  const candidates: ImportedRecordCandidate[] = [];
  const sampleParsedLines: string[] = [];
  const sampleUnparsedTimeLines: string[] = [];
  let excludedCount = 0;
  let parsedRecordLineCount = 0;
  let excludedStatusCount = 0;
  let excludedThresholdCount = 0;
  let unparsedTimeLineCount = 0;

  for (let index = 0; index < parseLines.length; index += 1) {
    const line = parseLines[index];
    const parsedRecord = parseResultLine(line) ?? parseSplitResultLine(parseLines, index);

    if (!parsedRecord) {
      if (isExcludedResultLine(line)) {
        excludedCount += 1;
        excludedStatusCount += 1;
      } else if (hasRecordTime(line)) {
        unparsedTimeLineCount += 1;
        if (sampleUnparsedTimeLines.length < 5) {
          sampleUnparsedTimeLines.push(line);
        }
      }
      continue;
    }

    parsedRecordLineCount += 1;
    if (sampleParsedLines.length < 5) {
      sampleParsedLines.push(`${parsedRecord.record} ${parsedRecord.name} ${parsedRecord.team}`);
    }

    if (parseImportRecordTime(parsedRecord.record) > thresholdSeconds) {
      excludedCount += 1;
      excludedThresholdCount += 1;
      continue;
    }

    const teamType = classifyTeam(parsedRecord.team);

    candidates.push({
      rank: candidates.length + 1,
      name: parsedRecord.name,
      record: parsedRecord.record,
      team: parsedRecord.team,
      venue,
      date,
      sourceUrl,
      groupId,
      teamType: teamType.type,
      teamTypeLabel: teamType.label,
      note: createImportCandidateNote(groupId, teamType.type),
    });
  }

  return {
    candidates,
    excludedCount,
    diagnostics: {
      fetchedTextLines: lines.length,
      eventHeadingCount: eventHeadings.length,
      targetSectionLineCount: targetLines.length,
      parsedRecordLineCount,
      excludedStatusCount,
      excludedThresholdCount,
      unparsedTimeLineCount,
      threshold,
      eventDistance,
      sampleEventHeadings: eventHeadings.slice(0, 5),
      sampleParsedLines,
      sampleUnparsedTimeLines,
    },
  };
}


function parseImportRecordTime(record: string) {
  const match = record.match(/^(\d{1,2}):(\d{2})\.(\d{2})$/);

  if (!match) {
    return Number.POSITIVE_INFINITY;
  }

  return Number(match[1]) * 60 + Number(match[2]) + Number(`0.${match[3]}`);
}
function htmlToReadableText(html: string) {
  return normalizeWidth(html)
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<\/(h\d|p|div|li|tr|table|section|article)>/gi, "\n")
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, '"')
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n");
}

function normalizeWidth(value: string) {
  return value.replace(/[\uff01-\uff5e]/g, (char) =>
    String.fromCharCode(char.charCodeAt(0) - 0xfee0),
  );
}

function extractPageTitle(html: string) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? htmlToReadableText(match[1]).split("\n")[0]?.trim() ?? "" : "";
}

function extractMeetName(text: string) {
  return text.split("\n").find((line) => /\u7af6\u6280\u4f1a|\u8a18\u9332\u4f1a|\u9078\u624b\u6a29|\u5927\u4f1a/.test(line)) ?? "";
}

function extractDate(text: string) {
  const japaneseDate = text.match(/(20\d{2})\u5e74\s*(\d{1,2})\u6708\s*(\d{1,2})\u65e5/);

  if (japaneseDate) {
    return `${japaneseDate[1]}-${japaneseDate[2].padStart(2, "0")}-${japaneseDate[3].padStart(2, "0")}`;
  }

  const separatedDate = text.match(/(20\d{2})[\/.-](\d{1,2})[\/.-](\d{1,2})/);

  if (separatedDate) {
    return `${separatedDate[1]}-${separatedDate[2].padStart(2, "0")}-${separatedDate[3].padStart(2, "0")}`;
  }

  return "";
}

function getTargetEventLines(lines: string[], eventDistance: string) {
  const targetLines: string[] = [];
  let isTargetSection = false;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (isEventHeading(line, eventDistance)) {
      const hasResultHeader = hasResultTableHeaderNear(lines, index);

      isTargetSection = hasResultHeader;
      continue;
    }

    if (isTargetSection && isDifferentEventHeading(line, eventDistance)) {
      isTargetSection = false;
    }

    if (isTargetSection) {
      targetLines.push(line);
    }
  }

  return targetLines;
}

function hasResultTableHeaderNear(lines: string[], headingIndex: number) {
  const compact = lines
    .slice(headingIndex, headingIndex + 10)
    .join("")
    .replace(/\s/g, "");

  return (
    compact.includes("\u9806\u4f4d") &&
    compact.includes("\u9078\u624b") &&
    compact.includes("\u6240\u5c5e") &&
    (compact.includes("\u8a18\u9332") || compact.includes("\u30bf\u30a4\u30e0"))
  );
}

function isAnyEventHeading(line: string) {
  const compact = line.replace(/\s/g, "").toLowerCase();
  return (compact.includes("\u7537\u5b50") || compact.includes("\u5973\u5b50")) && /\d{3,5}m/.test(compact) && !/\d{1,2}:\d{2}\.\d{2}/.test(compact);
}

function isEventHeading(line: string, eventDistance: string) {
  const compact = line.replace(/\s/g, "").toLowerCase();
  const distance = eventDistance.toLowerCase();
  return compact.includes("\u7537\u5b50") && compact.includes(distance) && !/\d{1,2}:\d{2}\.\d{2}/.test(compact);
}

function isDifferentEventHeading(line: string, eventDistance: string) {
  const compact = line.replace(/\s/g, "").toLowerCase();

  if (/\d{1,2}:\d{2}\.\d{2}/.test(compact)) {
    return false;
  }

  if (compact.includes("\u5973\u5b50") && /\d{3,5}m/.test(compact)) {
    return true;
  }

  return compact.includes("\u7537\u5b50") && /\d{3,5}m/.test(compact) && !compact.includes(eventDistance.toLowerCase());
}

function parseResultLine(line: string) {
  if (isExcludedResultLine(line) || /\u9078\u624b|\u6240\u5c5e|\u8a18\u9332|\u9806\u4f4d/.test(line)) {
    return null;
  }

  const normalizedLine = normalizeWidth(line).replace(/\s+/g, " ").trim();
  const rankedMatch = normalizedLine.match(/^\d{1,4}\s+(\d{1,2}:\d{2}\.\d{2})\s+(.+)$/);
  const timeFirstMatch = normalizedLine.match(/^(\d{1,2}:\d{2}\.\d{2})\s+(.+)$/);
  const rankedTimeLastMatch = normalizedLine.match(/^\d{1,4}\s+(.+)\s+(\d{1,2}:\d{2}\.\d{2})$/);
  const timeLastMatch = normalizedLine.match(/^(.+)\s+(\d{1,2}:\d{2}\.\d{2})$/);
  const timeFirst = rankedMatch ?? timeFirstMatch;
  const timeLast = rankedTimeLastMatch ?? timeLastMatch;

  if (!timeFirst && !timeLast) {
    return null;
  }

  const record = timeFirst ? timeFirst[1] : timeLast?.[2] ?? "";
  const rest = (timeFirst ? timeFirst[2] : timeLast?.[1] ?? "")
    .replace(/\([^)]*\)/g, " ")
    .replace(/\[[^\]]*\]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const parts = rest.split(" ").filter(Boolean);

  if (parts.length < 2) {
    return null;
  }

  const name = parts.length === 2 ? parts[0] : `${parts[0]} ${parts[1]}`;
  const team = parts.length === 2 ? parts[1] : parts.slice(2).join(" ");

  if (!name || !team) {
    return null;
  }

  return {
    name,
    record,
    team,
  };
}

function parseSplitResultLine(lines: string[], index: number) {
  const line = normalizeWidth(lines[index] ?? "").trim();
  const record = extractRecordTime(line);

  if (!record) {
    return null;
  }

  const currentWithoutTime = line
    .replace(record, " ")
    .replace(/^\d{1,4}$/, " ")
    .replace(/^\d{1,4}\s+/, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (currentWithoutTime) {
    const parsedInline = splitNameAndTeam(currentWithoutTime);
    if (parsedInline) {
      return { record, ...parsedInline };
    }
  }

  const nextName = cleanResultCell(lines[index + 1]);
  const nextTeam = cleanResultCell(lines[index + 2]);

  if (isPossibleName(nextName) && isPossibleTeam(nextTeam)) {
    return {
      record,
      name: nextName,
      team: nextTeam,
    };
  }

  const previousTeam = cleanResultCell(lines[index - 1]);
  const previousName = cleanResultCell(lines[index - 2]);

  if (isPossibleName(previousName) && isPossibleTeam(previousTeam)) {
    return {
      record,
      name: previousName,
      team: previousTeam,
    };
  }

  return null;
}

function extractRecordTime(line: string) {
  return normalizeWidth(line).match(/\d{1,2}:\d{2}\.\d{2}/)?.[0] ?? "";
}

function cleanResultCell(value: string | undefined) {
  return normalizeWidth(value ?? "")
    .replace(/\([^)]*\)/g, " ")
    .replace(/\[[^\]]*\]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function splitNameAndTeam(value: string) {
  const parts = value.split(" ").filter(Boolean);

  if (parts.length < 2) {
    return null;
  }

  return {
    name: parts.length === 2 ? parts[0] : `${parts[0]} ${parts[1]}`,
    team: parts.length === 2 ? parts[1] : parts.slice(2).join(" "),
  };
}

function isPossibleName(value: string) {
  return Boolean(value) && !isResultNoiseLine(value) && !hasRecordTime(value) && !/^\d{1,4}$/.test(value);
}

function isPossibleTeam(value: string) {
  return Boolean(value) && !isResultNoiseLine(value) && !hasRecordTime(value) && !/^\d{1,4}$/.test(value);
}

function isResultNoiseLine(value: string) {
  return /\u9806\u4f4d|\u8a18\u9332|\u9078\u624b|\u6240\u5c5e|\u30bf\u30a4\u30e0/.test(value) || isExcludedResultLine(value);
}

function hasRecordTime(line: string) {
  return /\d{1,2}:\d{2}\.\d{2}/.test(normalizeWidth(line));
}

function isExcludedResultLine(line: string) {
  return /\b(DNS|DNF|NM|DQ|DSQ)\b|\u68c4\u6a29|\u5931\u683c/.test(normalizeWidth(line).toUpperCase());
}

function classifyTeam(team: string): {
  type: ImportedRecordCandidate["teamType"];
  label: string;
} {
  const normalizedTeam = team.trim();

  if (
    normalizedTeam.endsWith("\u9ad8") ||
    normalizedTeam.endsWith("\u6821") ||
    normalizedTeam.includes("\u9ad8\u7b49\u5b66\u6821")
  ) {
    return { type: "high-school", label: "\u9ad8\u6821\u5019\u88dc" };
  }

  if (
    normalizedTeam.includes("\u5927\u5b66") ||
    normalizedTeam.endsWith("\u5927") ||
    normalizedTeam.includes("\u5927\u5b78")
  ) {
    return { type: "university", label: "\u5927\u5b66\u5019\u88dc" };
  }

  if (!normalizedTeam || normalizedTeam === "-") {
    return { type: "unknown", label: "\u8981\u78ba\u8a8d" };
  }

  return { type: "corporate", label: "\u5b9f\u696d\u56e3\u30fb\u4e00\u822c\u5019\u88dc" };
}

function createImportCandidateNote(
  groupId: ImportRankingGroup,
  teamType: ImportedRecordCandidate["teamType"],
) {
  if (groupId === "freshman-2027-5000" && teamType !== "high-school") {
    return "\u9ad8\u6821\u30e9\u30f3\u30ad\u30f3\u30b0\u3067\u306f\u624b\u52d5\u78ba\u8a8d\u304c\u5fc5\u8981";
  }

  return "";
}
