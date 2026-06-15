import Link from "next/link";
import { SiteHeader } from "../components/SiteHeader";

const rankingPages = [
  {
    href: "/records/5000m/season",
    title: "今季男子5000mランキング",
    body: "2026年4月1日以降に出た男子5000mの記録を確認できます。",
  },
  {
    href: "/records/10000m/season",
    title: "今季男子10000mランキング",
    body: "2026年4月1日以降に出た男子10000mの記録を確認できます。",
  },
];

export default function RecordsPage() {
  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-28 sm:px-10 lg:px-12">
        <p className="text-sm font-bold tracking-[0.14em] text-cyan-700">
          RECORDS
        </p>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl">
          ランキング
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          種目別ランキングページへの入口です。
        </p>

        <section className="mt-8 grid gap-4 md:grid-cols-2">
          {rankingPages.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md border border-slate-200 bg-white p-5 shadow-sm transition hover:border-cyan-500 hover:shadow-md"
            >
              <p className="text-xs font-bold tracking-[0.14em] text-cyan-700">
                RANKING
              </p>
              <h2 className="mt-2 text-2xl font-black">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {item.body}
              </p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
