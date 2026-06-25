export type RankingRecord = {
  rank: number;
  slug: string;
  name: string;
  record: string;
  team: string;
  venue: string;
  date: string;
  destination?: string;
  note?: string;
  sourceUrl?: string;
  sourceName?: string;
  verifiedAt?: string;
  verificationStatus?: "confirmed" | "checking" | "unverified";
};

export type PublicRankingRecord = Omit<
  RankingRecord,
  "sourceUrl" | "sourceName" | "verifiedAt" | "verificationStatus"
>;

export function toPublicRankingRecords(
  records: RankingRecord[],
): PublicRankingRecord[] {
  return records.map((record) => {
    const publicRecord: PublicRankingRecord = {
      rank: record.rank,
      slug: record.slug,
      name: record.name,
      record: record.record,
      team: record.team,
      venue: record.venue,
      date: record.date,
    };

    if (record.destination !== undefined) {
      publicRecord.destination = record.destination;
    }

    if (record.note !== undefined) {
      publicRecord.note = record.note;
    }

    return publicRecord;
  });
}

export type PlayerProfile = {
  slug: string;
  name: string;
  team: string;
  record5000m: string;
  record5000mDate: string;
  record10000m: string;
  record10000mDate: string;
  records5000m: RankingRecord[];
  records10000m: RankingRecord[];
  careerStageBests: CareerStageBest[];
  careerHistory: CareerHistoryItem[];
};

export type PlayerProfileOverride = Pick<
  PlayerProfile,
  | "slug"
  | "name"
  | "team"
  | "record5000m"
  | "record5000mDate"
  | "record10000m"
  | "record10000mDate"
  | "careerStageBests"
  | "careerHistory"
>;

export type CareerStageBest = {
  stage: "高校時代" | "大学時代" | "社会人";
  record5000m: string;
  record10000m: string;
  note: string;
};

export type CareerHistoryItem = {
  category: "出身高校" | "出身大学" | "所属チーム";
  period: string;
  name: string;
};

export const recordsLastChecked = {
  records5000m: "2026/05/23",
  records10000m: "2026/05/10",
};

const men5000Source = {
  sourceUrl: "https://genkimanman.com/rekidaikiroku/jpmen5000M100.html",
  sourceName: "元気満々 男子5000m日本歴代記録",
  verifiedAt: "2026-06-11",
  verificationStatus: "confirmed" as const,
};

const men10000Source = {
  sourceUrl: "https://genkimanman.com/rekidaikiroku/jpmen10000M100.html",
  sourceName: "元気満々 男子10000m日本歴代記録",
  verifiedAt: "2026-06-11",
  verificationStatus: "confirmed" as const,
};


export const records5000: RankingRecord[] = [
  { rank: 1, slug: "osako", name: "大迫 傑", record: "13:08.40", team: "Nike", venue: "ナイトオブアスレチックス", date: "2015-07-18", ...men5000Source },
  { rank: 2, slug: "sato", name: "佐藤 圭汰", record: "13:09.45", team: "駒澤大学", venue: "ジョン・トーマス・テリア・クラシック", date: "2024-01-26", ...men5000Source },
  { rank: 3, slug: "endo", name: "遠藤 日向", record: "13:10.69", team: "住友電工", venue: "ゴールデンゲームズ in のべおか", date: "2022-05-04", ...men5000Source },
  { rank: 4, slug: "yoroizaka", name: "鎧坂 哲哉", record: "13:12.63", team: "旭化成", venue: "ナイトオブアスレチックス", date: "2015-07-18", ...men5000Source },
  { rank: 5, slug: "matsumiya", name: "松宮 隆行", record: "13:13.20", team: "コニカミノルタ", venue: "ナイトオブアスレチックス", date: "2007-07-28", ...men5000Source },
  { rank: 6, slug: "takaoka", name: "高岡 寿成", record: "13:13.40", team: "カネボウ", venue: "Hechtel(ベルギー)", date: "1998-08-01", ...men5000Source },
  { rank: 7, slug: "ito", name: "伊藤 達彦", record: "13:13.56", team: "Honda", venue: "日本選手権", date: "2024-06-28", ...men5000Source },
  { rank: 8, slug: "shiojiri", name: "塩尻 和也", record: "13:13.59", team: "富士通", venue: "ゴールデンゲームズ in のべおか", date: "2025-05-04", ...men5000Source },
  { rank: 9, slug: "sato-yuki", name: "佐藤 悠基", record: "13:13.60", team: "日清食品グループ", venue: "ナイトオブアスレチックス", date: "2013-07-13", ...men5000Source },
  { rank: 10, slug: "suzuki", name: "鈴木 芽吹", record: "13:13.80", team: "トヨタ自動車", venue: "ヨギボチャレンジ", date: "2024-09-28", ...men5000Source },
  { rank: 11, slug: "igawa", name: "井川 龍人", record: "13:14.58", team: "旭化成", venue: "IFAM Outdoor Oordegem(ベルギー)", date: "2025-08-09", ...men5000Source },
  { rank: 12, slug: "mori", name: "森 凪也", record: "13:14.94", team: "Honda", venue: "ゴールデンゲームズ in のべおか", date: "2026-05-04", ...men5000Source },
  { rank: 13, slug: "shinohara", name: "篠原 倖太朗", record: "13:15.70", team: "駒澤大学", venue: "ヨギボチャレンジ", date: "2024-09-28", ...men5000Source },
  { rank: 14, slug: "yamaguchi-tomoki", name: "山口 智規", record: "13:16.38", team: "SGホールディングス", venue: "金栗記念", date: "2026-04-11", ...men5000Source },
  { rank: 15, slug: "tsurukawa", name: "鶴川 正也", record: "13:17.64", team: "GMOインターネット", venue: "金栗記念", date: "2025-04-12", ...men5000Source },
  { rank: 16, slug: "mitsutani", name: "三津谷 祐", record: "13:18.32", team: "トヨタ自動車九州", venue: "ゴールデンゲームズ in のべおか", date: "2007-05-26", ...men5000Source },
  { rank: 17, slug: "bando", name: "坂東 悠汰", record: "13:18.49", team: "富士通", venue: "日本選手権", date: "2020-12-04", ...men5000Source },
  { rank: 18, slug: "takezawa", name: "竹澤 健介", record: "13:19.00", team: "早稲田大学", venue: "ナイトオブアスレチックス", date: "2007-07-28", ...men5000Source },
  { rank: 19, slug: "tameike", name: "溜池 一太", record: "13:19.24", team: "SGホールディングス", venue: "LAトラックフェスティバル", date: "2026-05-23", ...men5000Source },
  { rank: 20, slug: "okada", name: "岡田 開成", record: "13:19.44", team: "中央大学", venue: "ゴールデンゲームズ in のべおか", date: "2026-05-04", ...men5000Source },
];

export const currentSeasonRecords5000: RankingRecord[] = [
  { rank: 1, slug: "mori", name: "森 凪也", record: "13:14.18", team: "Honda", venue: "ゴールデンゲームズ in のべおか", date: "2026/05/04" },
  { rank: 2, slug: "yamaguchi-tomoki", name: "山口 智規", record: "13:16.38", team: "SGホールディングス", venue: "金栗記念", date: "2026/04/11" },
  { rank: 3, slug: "shiojiri", name: "塩尻 和也", record: "13:18.16", team: "富士通", venue: "ゴールデンゲームズ in のべおか", date: "2026/05/04" },
  { rank: 4, slug: "tameike", name: "溜池 一太", record: "13:19.24", team: "SGホールディングス", venue: "LAトラックフェスティバル", date: "2026/05/23" },
  { rank: 5, slug: "okada", name: "岡田 開成", record: "13:19.44", team: "中央大学", venue: "ゴールデンゲームズ in のべおか", date: "2026/05/04" },
  { rank: 6, slug: "masuko", name: "増子 陽太", record: "13:20.35", team: "早稲田大学", venue: "ゴールデンゲームズ in のべおか", date: "2026/05/04" },
  { rank: 7, slug: "suzuki-ryuin", name: "鈴木 琉胤", record: "13:20.64", team: "早稲田大学", venue: "金栗記念", date: "2026/04/11" },
  { rank: 8, slug: "kurimura", name: "栗村 凌", record: "13:21.99", team: "中央大学", venue: "ゴールデンゲームズ in のべおか", date: "2026/05/04" },
  { rank: 9, slug: "shibata", name: "柴田 侑", record: "13:22.46", team: "城西大学", venue: "日体大記録会", date: "2026/04/12" },
  { rank: 10, slug: "masuko", name: "増子 陽太", record: "13:22.87", team: "早稲田大学", venue: "金栗記念", date: "2026/04/11" },
  { rank: 11, slug: "yoshii", name: "吉居 大和", record: "13:23.92", team: "トヨタ自動車", venue: "金栗記念", date: "2026/04/11" },
  { rank: 12, slug: "aizawa", name: "相澤 晃", record: "13:24.97", team: "旭化成", venue: "ゴールデンゲームズ in のべおか", date: "2026/05/04" },
  { rank: 13, slug: "tameike", name: "溜池 一太", record: "13:26.87", team: "SGホールディングス", venue: "ゴールデンゲームズ in のべおか", date: "2026/05/04" },
  { rank: 14, slug: "igawa", name: "井川 龍人", record: "13:27.82", team: "旭化成", venue: "ゴールデンゲームズ in のべおか", date: "2026/05/04" },
  { rank: 15, slug: "nonaka", name: "野中 恒亨", record: "13:28.47", team: "國學院大学", venue: "ゴールデンゲームズ in のべおか", date: "2026/05/04" },
  { rank: 16, slug: "miyake", name: "三宅 悠斗", record: "13:28.66", team: "中央大学", venue: "ゴールデンゲームズ in のべおか", date: "2026/05/04" },
  { rank: 17, slug: "fujita", name: "藤田 大智", record: "13:28.93", team: "中央大学", venue: "金栗記念", date: "2026/04/11" },
  { rank: 18, slug: "koike", name: "小池 莉希", record: "13:29.09", team: "創価大学", venue: "金栗記念", date: "2026/04/11" },
  { rank: 19, slug: "iyoda", name: "伊豫田 達弥", record: "13:29.64", team: "富士通", venue: "金栗記念", date: "2026/04/11" },
  { rank: 20, slug: "yamaguchi-shumpei", name: "山口 竣平", record: "13:29.72", team: "早稲田大学", venue: "ゴールデンゲームズ in のべおか", date: "2026/05/04" },
  { rank: 21, slug: "ikeda-yohei", name: "池田 耀平", record: "13:29.82", team: "花王", venue: "ゴールデンゲームズ in のべおか", date: "2026/05/04" },
  { rank: 22, slug: "nakano-shota", name: "中野 翔太", record: "13:29.88", team: "Honda", venue: "織田記念", date: "2026/04/29" },
];

export const records10000: RankingRecord[] = [
  { rank: 1, slug: "suzuki", name: "鈴木 芽吹", record: "27:05.92", team: "トヨタ自動車", venue: "八王子ロングディスタンス", date: "2025-11-22", ...men10000Source },
  { rank: 2, slug: "shiojiri", name: "塩尻 和也", record: "27:09.80", team: "富士通", venue: "日本選手権", date: "2023-12-10", ...men10000Source },
  { rank: 3, slug: "ota", name: "太田 智樹", record: "27:12.53", team: "トヨタ自動車", venue: "日本選手権", date: "2023-12-10", ...men10000Source },
  { rank: 4, slug: "aizawa", name: "相澤 晃", record: "27:13.04", team: "旭化成", venue: "日本選手権", date: "2023-12-10", ...men10000Source },
  { rank: 5, slug: "kasai", name: "葛西 潤", record: "27:17.46", team: "旭化成", venue: "日本選手権", date: "2024-05-03", ...men10000Source },
  { rank: 6, slug: "yoshii", name: "吉居 大和", record: "27:21.45", team: "トヨタ自動車", venue: "八王子ロングディスタンス", date: "2025-11-22", ...men10000Source },
  { rank: 7, slug: "maeda", name: "前田 和摩", record: "27:21.52", team: "東京農業大学", venue: "日本選手権", date: "2024-05-03", ...men10000Source },
  { rank: 8, slug: "tazawa", name: "田澤 廉", record: "27:22.31", team: "トヨタ自動車", venue: "日本選手権", date: "2023-12-10", ...men10000Source },
  { rank: 9, slug: "ito", name: "伊藤 達彦", record: "27:25.73", team: "Honda", venue: "日本選手権", date: "2020-12-04", ...men10000Source },
  { rank: 10, slug: "hanyu", name: "羽生 拓矢", record: "27:27.49", team: "トヨタ紡織", venue: "八王子ロングディスタンス", date: "2022-11-26", ...men10000Source },
  { rank: 11, slug: "kobayashi", name: "小林 歩", record: "27:28.13", team: "NTT西日本", venue: "日本選手権", date: "2023-12-10", ...men10000Source },
  { rank: 12, slug: "sato", name: "佐藤 圭汰", record: "27:28.31", team: "駒澤大学", venue: "八王子ロングディスタンス", date: "2023-11-25", ...men10000Source },
  { rank: 13, slug: "tamura", name: "田村 和希", record: "27:28.92", team: "住友電工", venue: "日本選手権", date: "2020-12-04", ...men10000Source },
  { rank: 14, slug: "murayama-kota", name: "村山 紘太", record: "27:29.69", team: "旭化成", venue: "八王子ロングディスタンス", date: "2015-11-28", ...men10000Source },
  { rank: 15, slug: "yoroizaka", name: "鎧坂 哲哉", record: "27:29.74", team: "旭化成", venue: "八王子ロングディスタンス", date: "2015-11-28", ...men10000Source },
  { rank: 16, slug: "shimizu", name: "清水 歓太", record: "27:31.27", team: "SUBARU", venue: "サン・ファン・カピストラーノ", date: "2022-03-06", ...men10000Source },
  { rank: 17, slug: "imae", name: "今江 勇人", record: "27:33.84", team: "GMOインターネットグループ", venue: "八王子ロングディスタンス", date: "2025-11-22", ...men10000Source },
  { rank: 18, slug: "kawai", name: "河合 代二", record: "27:34.86", team: "トーエネック", venue: "日本選手権", date: "2020-12-04", ...men10000Source },
  { rank: 19, slug: "shinohara", name: "篠原 倖太朗", record: "27:35.05", team: "駒澤大学", venue: "日本選手権", date: "2024-05-03", ...men10000Source },
  { rank: 20, slug: "takaoka", name: "高岡 寿成", record: "27:35.09", team: "カネボウ", venue: "カーディナル招待", date: "2001-05-04", ...men10000Source },
];
export const currentSeasonRecords10000: RankingRecord[] = [
  { rank: 1, slug: "suzuki", name: "鈴木 芽吹", record: "27:20.11", team: "トヨタ自動車", venue: "木南道孝記念", date: "2026/05/10" },
  { rank: 2, slug: "kameda", name: "亀田 仁一路", record: "27:40.41", team: "旭化成", venue: "木南道孝記念", date: "2026/05/10" },
  { rank: 3, slug: "koike", name: "小池 莉希", record: "27:52.43", team: "創価大学", venue: "関東インカレ", date: "2026/05/21" },
  { rank: 4, slug: "nishizawa", name: "西澤 侑真", record: "27:56.13", team: "トヨタ紡織", venue: "木南道孝記念", date: "2026/05/10" },
  { rank: 5, slug: "kusuoka", name: "楠岡 由浩", record: "27:58.40", team: "帝京大学", venue: "関東インカレ", date: "2026/05/21" },
  { rank: 6, slug: "ichida", name: "市田 孝", record: "27:59.10", team: "旭化成", venue: "九州実業団選手権", date: "2026/05/23" },
  { rank: 7, slug: "yamaguchi-shumpei", name: "山口 竣平", record: "27:59.47", team: "早稲田大学", venue: "早稲田大学競技会", date: "2026/04/24" },
  { rank: 8, slug: "kobayashi", name: "小林 歩", record: "27:59.64", team: "SUBARU", venue: "木南道孝記念", date: "2026/05/10" },
  { rank: 9, slug: "takaishi", name: "髙石 樹", record: "28:01.47", team: "國學院大学", venue: "関東インカレ", date: "2026/05/21" },
  { rank: 10, slug: "aizawa", name: "相澤 晃", record: "28:01.73", team: "旭化成", venue: "九州実業団選手権", date: "2026/05/23" },
  { rank: 11, slug: "fujita", name: "藤田 大智", record: "28:04.61", team: "中央大学", venue: "木南道孝記念", date: "2026/05/10" },
  { rank: 12, slug: "shibata", name: "柴田 侑", record: "28:05.07", team: "城西大学", venue: "レモンガススタジアム平塚", date: "2026/05/04" },
  { rank: 13, slug: "hanyu", name: "羽生 拓矢", record: "28:07.55", team: "トヨタ紡織", venue: "木南道孝記念", date: "2026/05/10" },
  { rank: 14, slug: "kuwata", name: "桑田 駿介", record: "28:07.63", team: "駒澤大学", venue: "関東インカレ", date: "2026/05/21" },
  { rank: 15, slug: "okahara", name: "Hitoshi OKAHARA", record: "28:09.86", team: "JPN", venue: "日体大記録会", date: "2026/04/25", note: "漢字未確認" },
];

export const freshmanRecords5000: RankingRecord[] = [
  { rank: 1, slug: "yoshida-sei", name: "吉田 星", record: "13:35.14", team: "東海大附札幌高", venue: "", date: "", destination: "" },
  { rank: 2, slug: "baba-yuzu", name: "馬場 柚", record: "13:56.15", team: "埼玉栄高", venue: "", date: "", destination: "" },
  { rank: 3, slug: "umeda-tairiku", name: "梅田 大陸", record: "13:58.27", team: "須磨学園高", venue: "", date: "", destination: "" },
  { rank: 4, slug: "onuma-hikaru", name: "大沼 光琉", record: "14:01.96", team: "豊川高", venue: "", date: "", destination: "" },
  { rank: 5, slug: "iiboshi-sota", name: "飯干 颯大", record: "14:03.31", team: "智弁カレッジ", venue: "", date: "", destination: "" },
  { rank: 6, slug: "kuwahara-shota", name: "桑原 将大", record: "14:05.06", team: "京都外大西高", venue: "", date: "", destination: "" },
  { rank: 7, slug: "tanaka-masanobu", name: "田中 允紳", record: "14:08.54", team: "九州学院高", venue: "", date: "", destination: "" },
  { rank: 8, slug: "kimura-yumi", name: "木村 悠未", record: "14:09.97", team: "拓大一高", venue: "", date: "", destination: "" },
];


const noWikipediaEntry = "年代別PBは確認中";

const defaultCareerStageBests: CareerStageBest[] = [
  {
    stage: "高校時代",
    record5000m: "確認中",
    record10000m: "-",
    note: noWikipediaEntry,
  },
  {
    stage: "大学時代",
    record5000m: "確認中",
    record10000m: "確認中",
    note: noWikipediaEntry,
  },
  {
    stage: "社会人",
    record5000m: "確認中",
    record10000m: "確認中",
    note: noWikipediaEntry,
  },
];

const careerStageOrder: CareerStageBest["stage"][] = [
  "高校時代",
  "大学時代",
  "社会人",
];

function completeCareerStageBests(
  bests: CareerStageBest[] = defaultCareerStageBests,
) {
  return careerStageOrder.map((stage) => {
    const existing = bests.find((best) => best.stage === stage);

    if (existing) {
      return existing;
    }

    return {
      stage,
      record5000m: "確認中",
      record10000m: stage === "高校時代" ? "-" : "確認中",
      note:
        stage === "社会人"
          ? "社会人の記録は今後登録できます。"
          : noWikipediaEntry,
    };
  });
}

const defaultCareerHistory: CareerHistoryItem[] = [
  {
    category: "出身高校",
    period: "確認中",
    name: "確認中",
  },
  {
    category: "出身大学",
    period: "確認中",
    name: "確認中",
  },
  {
    category: "所属チーム",
    period: "確認中",
    name: "確認中",
  },
];

const careerHistoryOverrides: Record<string, CareerHistoryItem[]> = {
  osako: [
    { category: "出身高校", period: "2007年〜2010年", name: "佐久長聖高校" },
    { category: "出身大学", period: "2010年〜2014年", name: "早稲田大学" },
    { category: "所属チーム", period: "2013年〜2025年", name: "Nike" },
    { category: "所属チーム", period: "2025年〜現在", name: "Li-Ning" },
  ],
  sato: [
    { category: "出身高校", period: "2019年〜2022年", name: "洛南高校" },
    { category: "出身大学", period: "2022年〜現在", name: "駒澤大学" },
    { category: "所属チーム", period: "確認中", name: "確認中" },
  ],
  endo: [
    { category: "出身高校", period: "2014年〜2017年", name: "学法石川高校" },
    { category: "出身大学", period: "-", name: "-" },
    { category: "所属チーム", period: "2017年〜現在", name: "住友電工" },
  ],
  yoroizaka: [
    { category: "出身高校", period: "2006年〜2009年", name: "世羅高校" },
    { category: "出身大学", period: "2009年〜2013年", name: "明治大学" },
    { category: "所属チーム", period: "2013年〜現在", name: "旭化成" },
  ],
  matsumiya: [
    { category: "出身高校", period: "確認中", name: "確認中" },
    { category: "出身大学", period: "-", name: "-" },
    { category: "所属チーム", period: "確認中", name: "コニカミノルタ" },
  ],
  takaoka: [
    { category: "出身高校", period: "確認中", name: "洛南高校" },
    { category: "出身大学", period: "確認中", name: "龍谷大学" },
    { category: "所属チーム", period: "確認中", name: "カネボウ" },
  ],
  ito: [
    { category: "出身高校", period: "2014年〜2017年", name: "浜松商業高校" },
    { category: "出身大学", period: "2017年〜2021年", name: "東京国際大学" },
    { category: "所属チーム", period: "2021年〜現在", name: "Honda" },
  ],
  shiojiri: [
    { category: "出身高校", period: "2012年〜2015年", name: "伊勢崎清明高校" },
    { category: "出身大学", period: "2015年〜2019年", name: "順天堂大学" },
    { category: "所属チーム", period: "2019年〜現在", name: "富士通" },
  ],
  ota: [
    { category: "出身高校", period: "2013年〜2016年", name: "浜松日体高校" },
    { category: "出身大学", period: "2016年〜2020年", name: "早稲田大学" },
    { category: "所属チーム", period: "2020年〜現在", name: "トヨタ自動車" },
  ],
  suzuki: [
    { category: "出身高校", period: "2017年〜2020年", name: "佐久長聖高校" },
    { category: "出身大学", period: "2020年〜2024年", name: "駒澤大学" },
    { category: "所属チーム", period: "2024年〜現在", name: "トヨタ自動車" },
  ],
  igawa: [
    { category: "出身高校", period: "確認中", name: "確認中" },
    { category: "出身大学", period: "2019年〜2023年", name: "早稲田大学" },
    { category: "所属チーム", period: "2023年〜現在", name: "旭化成" },
  ],
  aizawa: [
    { category: "出身高校", period: "2013年〜2016年", name: "学法石川高校" },
    { category: "出身大学", period: "2016年〜2020年", name: "東洋大学" },
    { category: "所属チーム", period: "2020年〜現在", name: "旭化成" },
  ],
  kasai: [
    { category: "出身高校", period: "確認中", name: "確認中" },
    { category: "出身大学", period: "2019年〜2023年", name: "創価大学" },
    { category: "所属チーム", period: "2023年〜現在", name: "旭化成" },
  ],
  tazawa: [
    { category: "出身高校", period: "2016年〜2019年", name: "青森山田高校" },
    { category: "出身大学", period: "2019年〜2023年", name: "駒澤大学" },
    { category: "所属チーム", period: "2023年〜現在", name: "トヨタ自動車" },
  ],
  yoshii: [
    { category: "出身高校", period: "2018年〜2021年", name: "仙台育英高校" },
    { category: "出身大学", period: "2021年〜2025年", name: "中央大学" },
    { category: "所属チーム", period: "2025年〜現在", name: "トヨタ自動車" },
  ],
  kameda: [
    { category: "出身高校", period: "確認中", name: "確認中" },
    { category: "出身大学", period: "2020年〜2024年", name: "関西大学" },
    { category: "所属チーム", period: "2024年〜現在", name: "旭化成" },
  ],
};

const careerStageBestOverrides: Record<string, CareerStageBest[]> = {
  osako: [
    {
      stage: "高校時代",
      record5000m: "13:58.66",
      record10000m: "28:57.00",
      note: "佐久長聖高時代の記録。",
    },
    {
      stage: "大学時代",
      record5000m: "確認中",
      record10000m: "28:42.83",
      note: "早稲田大学時代の10000m記録。",
    },
    {
      stage: "社会人",
      record5000m: "13:08.40",
      record10000m: "27:36.93",
      note: "自己ベストとして整理。",
    },
  ],
  sato: [
    {
      stage: "高校時代",
      record5000m: "13:31.19",
      record10000m: "-",
      note: "洛南高時代の高校日本記録。",
    },
    {
      stage: "大学時代",
      record5000m: "13:09.45",
      record10000m: "27:28.50",
      note: "自己ベストとして整理。駒澤大学在学中の記録として整理。",
    },
  ],
  endo: [
    {
      stage: "高校時代",
      record5000m: "確認中",
      record10000m: "-",
      note: noWikipediaEntry,
    },
    {
      stage: "社会人",
      record5000m: "13:10.69",
      record10000m: "29:10.21",
      note: "自己ベストとして整理。",
    },
  ],
  matsumiya: [
    {
      stage: "高校時代",
      record5000m: "確認中",
      record10000m: "-",
      note: noWikipediaEntry,
    },
    {
      stage: "社会人",
      record5000m: "13:13.20",
      record10000m: "27:41.75",
      note: "自己ベストとして整理。",
    },
  ],
  takaoka: [
    {
      stage: "高校時代",
      record5000m: "確認中",
      record10000m: "-",
      note: noWikipediaEntry,
    },
    {
      stage: "大学時代",
      record5000m: "確認中",
      record10000m: "確認中",
      note: "龍谷大学時代の年代別PBは確認中。",
    },
    {
      stage: "社会人",
      record5000m: "13:13.40",
      record10000m: "27:35.09",
      note: "自己ベストとして整理。",
    },
  ],
  ito: [
    {
      stage: "高校時代",
      record5000m: "確認中",
      record10000m: "-",
      note: noWikipediaEntry,
    },
    {
      stage: "大学時代",
      record5000m: "13:33.97",
      record10000m: "27:25.73",
      note: "自己ベストとして整理。東京国際大学所属情報とあわせて整理。",
    },
    {
      stage: "社会人",
      record5000m: "13:13.56",
      record10000m: "確認中",
      note: "5000mは当サイトのランキング掲載記録。10000mの年代別PBは確認中。",
    },
  ],
  shiojiri: [
    {
      stage: "高校時代",
      record5000m: "確認中",
      record10000m: "-",
      note: noWikipediaEntry,
    },
    {
      stage: "大学時代",
      record5000m: "確認中",
      record10000m: "29:20.96",
      note: "2017年ユニバーシアード10000mの記録。",
    },
    {
      stage: "社会人",
      record5000m: "13:13.59",
      record10000m: "27:09.80",
      note: "自己ベストとして整理。",
    },
  ],
  aizawa: [
    {
      stage: "高校時代",
      record5000m: "確認中",
      record10000m: "-",
      note: noWikipediaEntry,
    },
    {
      stage: "大学時代",
      record5000m: "確認中",
      record10000m: "確認中",
      note: "東洋大学時代の年代別PBは確認中。",
    },
    {
      stage: "社会人",
      record5000m: "13:24.97",
      record10000m: "27:18.75",
      note: "自己ベストとして整理。",
    },
  ],
  tazawa: [
    {
      stage: "高校時代",
      record5000m: "確認中",
      record10000m: "-",
      note: noWikipediaEntry,
    },
    {
      stage: "大学時代",
      record5000m: "13:22.60",
      record10000m: "27:23.44",
      note: "駒澤大学時代の主要PBとして整理。",
    },
    {
      stage: "社会人",
      record5000m: "確認中",
      record10000m: "27:22.31",
      note: "10000mは自己ベストとして整理。",
    },
  ],
};

export const playerProfiles: PlayerProfile[] = createPlayerProfiles();

export function getPlayerProfileBySlug(
  slug: string,
  extraRecords: Array<RankingRecord & { groupId?: string }> = [],
  profileOverrides: PlayerProfileOverride[] = [],
) {
  return createPlayerProfiles(extraRecords, profileOverrides).find(
    (player) => player.slug === slug,
  );
}

export function createPlayerProfiles(
  extraRecords: Array<RankingRecord & { groupId?: string }> = [],
  profileOverrides: PlayerProfileOverride[] = [],
) {
  const extra5000m = extraRecords.filter(
    (record) => record.groupId === "season-5000",
  );
  const extra10000m = extraRecords.filter(
    (record) => record.groupId === "season-10000",
  );
  const season5000m = extra5000m.length > 0 ? extra5000m : currentSeasonRecords5000;
  const season10000m = extra10000m.length > 0 ? extra10000m : currentSeasonRecords10000;
  const sourceRecords5000m = [
    ...records5000,
    ...season5000m,
  ];
  const sourceRecords10000m = [
    ...records10000,
    ...season10000m,
  ];
  const slugs = Array.from(
    new Set([...sourceRecords5000m, ...sourceRecords10000m].map((record) => record.slug)),
  );

  return slugs.map((slug) => {
    const record5000m = sourceRecords5000m.find((record) => record.slug === slug);
    const record10000m = sourceRecords10000m.find((record) => record.slug === slug);
    const mainRecord = record5000m ?? record10000m;
    const profileOverride = profileOverrides.find((profile) => profile.slug === slug);

    if (!mainRecord) {
      throw new Error(`Player profile source is missing: ${slug}`);
    }

    const sorted5000m = sourceRecords5000m
      .filter((record) => record.slug === slug)
      .sort((a, b) => a.rank - b.rank);
    const sorted10000m = sourceRecords10000m
      .filter((record) => record.slug === slug)
      .sort((a, b) => a.rank - b.rank);

    const baseProfile: PlayerProfile = {
      slug,
      name: mainRecord.name,
      team: record10000m?.team ?? record5000m?.team ?? mainRecord.team,
      record5000m: record5000m?.record ?? "記録なし",
      record5000mDate: record5000m?.date ?? "-",
      record10000m: record10000m?.record ?? "記録なし",
      record10000mDate: record10000m?.date ?? "-",
      records5000m: sorted5000m,
      records10000m: sorted10000m,
      careerStageBests: completeCareerStageBests(careerStageBestOverrides[slug]),
      careerHistory: careerHistoryOverrides[slug] ?? defaultCareerHistory,
    };

    return profileOverride
      ? {
          ...baseProfile,
          ...profileOverride,
          records5000m: baseProfile.records5000m,
          records10000m: baseProfile.records10000m,
          careerStageBests: completeCareerStageBests(
            profileOverride.careerStageBests,
          ),
        }
      : baseProfile;
  });
}











