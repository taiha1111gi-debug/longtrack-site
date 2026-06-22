import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "./components/SiteHeader";

export const metadata: Metadata = {
  title: "日本男子長距離記録サイト",
  description:
    "日本男子5000m・10000mの歴代記録、今季ランキング、選手情報、大会メモをまとめた陸上長距離アーカイブサイトです。",
  alternates: {
    canonical: "/",
  },
};

const eraHighlights = [
  {
    year: "1998-2007",
    title: "13分台前半・27分台中盤が基準に",
    body: "高岡寿成や松宮隆行らが日本男子長距離の基準を作った時代。海外レースでも好記録が生まれ、5000m・10000mともに長く目標となる記録が残された。",
  },
  {
    year: "2008-2015",
    title: "海外レースと八王子で高速化",
    body: "大迫傑、鎧坂哲哉、村山紘太らが台頭し、5000m・10000mの記録水準が一段上がった時代。2015年には5000mで13分10秒切り、10000mで27分30秒切りなど、日本男子長距離の転換点となる記録が生まれた。",
  },
  {
    year: "2016-2023",
    title: "27分10秒台と学生記録の時代",
    body: "駅伝出身の有力選手がトラックでも存在感を高めた時代。相澤晃、伊藤達彦らが10000mで日本記録級の走りを見せ、27分台前半が現実的な目標になった。さらに田澤廉、吉居大和、佐藤圭汰、塩尻和也らが10000mで好記録を残し、日本男子長距離の層の厚さが大きく広がった。",
  },
  {
    year: "2024-2026",
    title: "12分台と26分台を目指して",
    body: "佐藤圭汰が5000mで13分09秒台を記録し、塩尻和也や鈴木芽吹らも10000mで日本トップ水準を更新。日本男子長距離は、5000mの12分台、10000mの26分台を現実的な目標として見据える時代に入っている。",
  },
];

const latestUpdates = [
  {
    date: "2026/06/10",
    title: "ランキング表から選手詳細へ移動できるようにしました",
    body: "5000m・10000mランキングの選手名をクリックすると、各選手の詳細ページで両種目の記録と主な大会を確認できます。",
  },
  {
    date: "2026/06/10",
    title: "ランキングの確認日を表示しました",
    body: "記録データの信頼性を見やすくするため、5000mと10000mの各ランキングページ下部に最終確認日を追加しました。",
  },
  {
    date: "2026/06/10",
    title: "大会・環境メモを拡充しました",
    body: "八王子ロングディスタンス、日体大長距離競技会、ホクレンDCなど、記録が出やすい大会の時期と特徴を整理しました。",
  },
];

const paceNotes = [
  {
    title: "5000m 12分台のペース感",
    target: "12:59.00",
    splits: [
      "100m 約15.6秒",
      "400m 約62.3秒",
      "1000m 約2分35.8秒",
    ],
    body: "1周62秒前後を12周半。短距離のようなスピードではなく、速い巡航をほとんど緩めずに最後まで続ける難しさがあります。",
  },
  {
    title: "10000m 26分台のペース感",
    target: "26:59.00",
    splits: [
      "100m 約16.2秒",
      "400m 約64.8秒",
      "1000m 約2分41.9秒",
    ],
    body: "1周65秒を切るペースを25周。少しの力みや中だるみが大きな差になるため、スピードと持久力の両方が極めて高い水準で求められます。",
  },
  {
    title: "現在の日本記録 5000m",
    target: "13:08.40",
    splits: [
      "100m 約15.8秒",
      "400m 約63.1秒",
      "1000m 約2分37.7秒",
    ],
    body: "大迫傑の日本記録ペースでも、1kmを2分37秒台で5本並べる計算です。12分台には、そこからさらに1周あたり約0.7秒ずつ速く進む必要があります。",
  },
  {
    title: "現在の日本記録 10000m",
    target: "27:05.92",
    splits: [
      "100m 約16.3秒",
      "400m 約65.0秒",
      "1000m 約2分42.6秒",
    ],
    body: "鈴木芽吹の日本記録ペースは、1km2分42秒台を10本。26分台まではわずか数秒ですが、その数秒を25周全体から削る難度は非常に高いです。",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <SiteHeader />

      <section id="top" className="relative min-h-[620px] overflow-hidden">
        <Image
          src="/track.jpg"
          alt="陸上トラック"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-slate-950/25" />

        <div className="relative mx-auto flex min-h-[620px] max-w-7xl flex-col justify-end px-6 pb-14 pt-28 sm:px-10 lg:px-12">
          <p className="mb-4 text-sm font-bold tracking-[0.18em] text-cyan-200">
            5000m / 10000m
          </p>
          <h1 className="max-w-4xl text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
            Track Distance Records
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-100 sm:text-xl">
            <span>日本男子長距離の記録・選手情報・大会メモをまとめた</span>
            <br />
            <span>5000m・10000m中心のアーカイブサイト</span>
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/players"
              className="inline-flex w-fit rounded-md bg-white px-4 py-3 text-sm font-black text-slate-950 hover:bg-cyan-100"
            >
              歴代記録へ
            </Link>
            <Link
              href="/records"
              className="inline-flex w-fit rounded-md border border-white/70 bg-slate-950/40 px-4 py-3 text-sm font-black text-white hover:bg-white hover:text-slate-950"
            >
              今季PBランキングへ
            </Link>
            <Link
              href="/records/freshman-2027-5000"
              className="inline-flex w-fit rounded-md border border-cyan-200 bg-cyan-200/15 px-4 py-3 text-sm font-black text-white hover:bg-cyan-100 hover:text-slate-950"
            >
              2027新入生 高校5000mランキングへ
            </Link>          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-12">
        <section id="overview" className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm font-bold tracking-[0.14em] text-cyan-700">
              OVERVIEW
            </p>
            <h2 className="mt-1 text-2xl font-black">5000mと10000mの違い</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              5000mと10000mは、どちらも長距離選手の力を測る代表的なトラック種目です。
              5000mは比較的スピード色が強く、10000mはより長い時間ペースを保つ力が求められます。
              同じ長距離でも、距離が変わることでレースの見方や記録の価値は少し変わります。
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <Metric title="5000m" body="トラック12.5周で争われる種目。スピードを保ったまま走り切る力や、終盤の切り替えが重要になります。" />
              <Metric title="10000m" body="トラック25周で争われる種目。長い距離の中でペースを安定させ、後半まで粘る力が求められます。" />
            </div>
          </div>

          <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm font-bold tracking-[0.14em] text-cyan-700">
              PACE
            </p>
            <h2 className="mt-1 text-2xl font-black">12分台・26分台の難しさ</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              記録の数字は数秒差でも、トラックでは1周ごとのわずかな差を長く積み重ねる世界です。
              目標ラインと現在の日本記録をペースに直すと、その難しさが見えやすくなります。
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {paceNotes.map((item) => (
                <PaceCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section id="history" className="mt-8 rounded-md border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-sm font-bold tracking-[0.14em] text-cyan-700">
            HISTORY
          </p>
          <h2 className="mt-1 text-2xl font-black">年代別ハイライト</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {eraHighlights.map((item) => (
              <article key={item.year} className="grid grid-cols-[82px_1fr] gap-4 rounded-md bg-slate-100 p-4">
                <p className="rounded-md bg-slate-900 px-3 py-2 text-center text-sm font-black text-white">
                  {item.year}
                </p>
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="mt-1 text-sm leading-7 text-slate-600">
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>


        <section id="context" className="mt-8 rounded-md border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-sm font-bold tracking-[0.14em] text-cyan-700">
            CONTEXT
          </p>
          <h2 className="mt-1 text-2xl font-black">国内大会・環境メモ</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            <InfoBlock
              title="金栗記念選抜陸上"
              body="時期: 4月。シーズン序盤の力試しになる大会で、春先から好タイムを狙う選手が集まります。5000mのスピード確認や新年度の勢力図を見るうえで重要です。"
            />
            <InfoBlock
              title="ゴールデンゲームズ in のべおか"
              body="時期: 5月上旬。観客との距離が近い独特の雰囲気と高速ペースが特徴。5000mで歴代上位記録が生まれやすく、春のトラックシーズンを象徴する大会です。"
            />
            <InfoBlock
              title="日本選手権10000m"
              body="時期: 年度により春または冬。代表選考と日本記録更新が重なる重要レース。勝負と記録の両方が絡み、2020年代は27分台前半の記録が集中しました。"
            />
            <InfoBlock
              title="ホクレン・ディスタンスチャレンジ"
              body="時期: 6月下旬から7月。北海道を転戦する中長距離シリーズ。夏でも比較的涼しい環境で、5000mや10000mの自己記録更新が狙いやすい大会です。"
            />
            <InfoBlock
              title="八王子ロングディスタンス"
              body="時期: 11月下旬。10000mの好記録が多く生まれる国内屈指の記録会。気温が下がる晩秋に実業団・学生のトップ選手が集まり、ペース設定も記録狙いに寄ります。"
            />
            <InfoBlock
              title="日体大長距離競技会"
              body="時期: 春・秋・冬を中心に複数回。組数が多く、実力に近い集団で走りやすい記録会です。学生から実業団まで幅広く出場し、5000mと10000mの記録更新の場になります。"
            />
          </div>
          <p className="mt-5 text-xs leading-6 text-slate-500">
            注: 開催時期は代表的な目安です。年度や大会運営の都合により変更される場合があります。
          </p>
        </section>

        <section id="updates" className="mt-8 rounded-md border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-sm font-bold tracking-[0.14em] text-cyan-700">
            UPDATES
          </p>
          <h2 className="mt-1 text-2xl font-black">最新更新メモ</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {latestUpdates.map((item) => (
              <article key={`${item.date}-${item.title}`} className="rounded-md bg-slate-100 p-4">
                <p className="text-xs font-black tracking-[0.14em] text-cyan-700">
                  {item.date}
                </p>
                <h3 className="mt-2 font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.body}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function Metric({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-md bg-slate-100 p-4">
      <h3 className="font-black">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-600">{body}</p>
    </article>
  );
}

function PaceCard({
  title,
  target,
  splits,
  body,
}: {
  title: string;
  target: string;
  splits: string[];
  body: string;
}) {
  const [hundredMeterSplit, ...distanceSplits] = splits;
  const hundredMeter = splitPaceLabel(hundredMeterSplit);
  const distancePaces = distanceSplits.map(splitPaceLabel);

  return (
    <article className="rounded-md bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h4 className="font-black">{title}</h4>
        <p className="text-lg font-black text-red-600">{target}</p>
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-700">
        <div className="flex min-h-full flex-col justify-center rounded bg-slate-900 px-3 py-3 font-black text-white">
          <dt>{hundredMeter.label}</dt>
          <dd className="mt-1 text-lg leading-tight">{hundredMeter.value}</dd>
        </div>
        <div className="grid gap-2">
          {distancePaces.map((pace) => (
            <div key={pace.label} className="rounded bg-slate-100 px-3 py-2 font-bold">
              <dt>{pace.label}</dt>
              <dd className="mt-1 text-lg leading-tight text-slate-900">
                {pace.value}
              </dd>
            </div>
          ))}
        </div>
      </dl>
      <p className="mt-3 text-sm leading-7 text-slate-600">{body}</p>
    </article>
  );
}

function splitPaceLabel(split: string) {
  const [label, ...valueParts] = split.split(" ");

  return {
    label,
    value: valueParts.join(" "),
  };
}

function InfoBlock({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-md bg-slate-100 p-4">
      <h3 className="font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-600">{body}</p>
    </article>
  );
}

const rankingThClass = "px-4 py-3 font-bold whitespace-nowrap";
const rankingTdClass = "px-4 py-4 align-top";
