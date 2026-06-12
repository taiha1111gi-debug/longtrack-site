export type Player = {
  name: string;
  slug: string;
  team: string;
  record5000m: string;
  race: string;
  date: string;
};

export const players: Player[] = [
  {
    name: "大迫 傑",
    slug: "osako",
    team: "Nike",
    record5000m: "13:08.40",
    race: "ナイトオブアスレチックス",
    date: "2015/07/18",
  },
  {
    name: "佐藤 圭汰",
    slug: "sato",
    team: "駒澤大学",
    record5000m: "13:09.45",
    race: "ジョン・トーマス・テリア・クラシック",
    date: "2024/01/26",
  },
  {
    name: "遠藤 日向",
    slug: "endo",
    team: "住友電工",
    record5000m: "13:10.69",
    race: "ゴールデンゲームズ in のべおか",
    date: "2022/05/04",
  },
  {
    name: "鎧坂 哲哉",
    slug: "yoroizaka",
    team: "旭化成",
    record5000m: "13:12.63",
    race: "ナイトオブアスレチックス",
    date: "2015/07/18",
  },
  {
    name: "松宮 隆行",
    slug: "matsumiya",
    team: "コニカミノルタ",
    record5000m: "13:13.20",
    race: "ナイトオブアスレチックス",
    date: "2007/07/28",
  },
  {
    name: "高岡 寿成",
    slug: "takaoka",
    team: "カネボウ",
    record5000m: "13:13.40",
    race: "Hechtel",
    date: "1998/08/01",
  },
];

export function getPlayerBySlug(slug: string) {
  return players.find((player) => player.slug === slug);
}
