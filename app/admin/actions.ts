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

  const records = Array.from({ length: rowCount }, (_, index) => ({
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
    verificationStatus: toVerificationStatus(formData.get(`rows.${index}.verificationStatus`)),
    delete: formData.get(`rows.${index}.delete`) === "on",
  }))
    .filter((record) => !record.delete)
    .map(({ delete: _delete, ...record }) => normalizeRecordInput(record));
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
