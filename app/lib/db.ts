import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  currentSeasonRecords10000,
  currentSeasonRecords5000,
  type PlayerProfileOverride,
  type RankingRecord,
} from "../records/data";

export type EditableRecord = RankingRecord & {
  groupId: "season-5000" | "season-10000";
};

type DatabaseShape = {
  records: EditableRecord[];
  playerProfiles: PlayerProfileOverride[];
};

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "longtrack-db.json");

export function getEditableRecords(groupId: EditableRecord["groupId"]) {
  return readDatabase()
    .records.filter((record) => record.groupId === groupId)
    .sort((a, b) => a.rank - b.rank);
}

export function getAllEditableRecords() {
  return readDatabase().records.sort((a, b) => {
    if (a.groupId === b.groupId) {
      return a.rank - b.rank;
    }

    return a.groupId.localeCompare(b.groupId);
  });
}

export function getPlayerProfileOverrides() {
  return readDatabase().playerProfiles.sort((a, b) => a.name.localeCompare(b.name, "ja"));
}

export function updateEditableRecord(record: EditableRecord) {
  const database = readDatabase();
  const index = database.records.findIndex(
    (item) => item.groupId === record.groupId && item.rank === record.rank,
  );

  if (index === -1) {
    throw new Error("Record was not found.");
  }

  database.records[index] = normalizeEditableRecord(record) as EditableRecord;
  normalizeGroup(database, record.groupId);
  writeDatabase(database);
}

export function addEditableRecord(record: Omit<EditableRecord, "rank">) {
  const database = readDatabase();
  const groupRecords = database.records.filter(
    (item) => item.groupId === record.groupId,
  );
  const nextRank =
    groupRecords.length === 0
      ? 1
      : Math.max(...groupRecords.map((item) => item.rank)) + 1;

  database.records.push({
    ...normalizeEditableRecord(record),
    rank: nextRank,
  });
  normalizeGroup(database, record.groupId);
  writeDatabase(database);
}

export function replaceEditableRecords(
  groupId: EditableRecord["groupId"],
  records: Array<Omit<EditableRecord, "groupId">>,
) {
  const database = readDatabase();
  database.records = [
    ...database.records.filter((record) => record.groupId !== groupId),
    ...records.map((record) => ({
      ...normalizeEditableRecord(record),
      groupId,
    })),
  ];
  normalizeGroup(database, groupId);
  writeDatabase(database);
}

export function upsertPlayerProfileOverride(profile: PlayerProfileOverride) {
  const database = readDatabase();
  const index = database.playerProfiles.findIndex((item) => item.slug === profile.slug);

  if (index === -1) {
    database.playerProfiles.push(profile);
  } else {
    database.playerProfiles[index] = profile;
  }

  writeDatabase(database);
}

function readDatabase(): DatabaseShape {
  ensureDatabase();
  const database = JSON.parse(readFileSync(dbPath, "utf8")) as Partial<DatabaseShape>;

  return {
    records: (database.records ?? []).map(normalizeEditableRecord),
    playerProfiles: database.playerProfiles ?? [],
  };
}

function writeDatabase(database: DatabaseShape) {
  ensureDataDir();
  writeFileSync(dbPath, `${JSON.stringify(database, null, 2)}\n`, "utf8");
}

function ensureDatabase() {
  ensureDataDir();

  if (existsSync(dbPath)) {
    return;
  }

  writeDatabase({
    records: [
      ...toEditableRecords("season-5000", currentSeasonRecords5000),
      ...toEditableRecords("season-10000", currentSeasonRecords10000),
    ],
    playerProfiles: [],
  });
}

function ensureDataDir() {
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }
}

function toEditableRecords(
  groupId: EditableRecord["groupId"],
  records: RankingRecord[],
) {
  return records.map((record) => ({
    ...normalizeEditableRecord(record),
    groupId,
  }));
}

function normalizeEditableRecord<T extends Partial<EditableRecord>>(record: T) {
  return {
    ...record,
    note: record.note ?? "",
    sourceUrl: record.sourceUrl ?? "",
    sourceName: record.sourceName ?? "",
    verifiedAt: record.verifiedAt ?? "",
    verificationStatus: record.verificationStatus ?? "unverified",
  };
}

function normalizeGroup(
  database: DatabaseShape,
  groupId: EditableRecord["groupId"],
) {
  const otherRecords = database.records.filter((record) => record.groupId !== groupId);
  const sortedGroupRecords = database.records
    .filter((record) => record.groupId === groupId)
    .sort((a, b) => {
      const recordDiff = parseRecordTime(a.record) - parseRecordTime(b.record);

      if (recordDiff !== 0) {
        return recordDiff;
      }

      return a.rank - b.rank;
    })
    .map((record, index) => ({
      ...record,
      rank: index + 1,
    }));

  database.records = [...otherRecords, ...sortedGroupRecords];
}

function parseRecordTime(record: string) {
  const match = record.match(/(\d+):(\d{2})(?:\.(\d+))?/);

  if (!match) {
    return Number.POSITIVE_INFINITY;
  }

  const minutes = Number(match[1]);
  const seconds = Number(match[2]);
  const decimals = Number(`0.${match[3] ?? "0"}`);

  return minutes * 60 + seconds + decimals;
}
