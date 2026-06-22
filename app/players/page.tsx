import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "競技一覧",
  description:
    "日本男子5000m・10000mの歴代ランキングページへ移動できる競技一覧ページです。",
  alternates: {
    canonical: "/players",
  },
};

const trackLinks = [
  {
    href: "/records/5000m",
    title: "男子5000m歴代ランキング",
    body: "男子5000mの歴代上位記録を確認できます。",
  },
  {
    href: "/records/10000m",
    title: "男子10000m歴代ランキング",
    body: "男子10000mの歴代上位記録を確認できます。",
  },
];

export default function PlayersPage() {
  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-28 sm:px-10 lg:px-12">
        <p className="text-sm font-bold tracking-[0.14em] text-cyan-700">
          EVENTS
        </p>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl">競技一覧</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          競技カテゴリから、5000mと10000mの歴代ランキングへ移動できます。
        </p>

        <section className="mt-8 grid gap-4 md:grid-cols-2">
          {trackLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md border border-slate-200 bg-white p-5 shadow-sm transition hover:border-cyan-500 hover:shadow-md"
            >
              <p className="text-xs font-bold tracking-[0.14em] text-cyan-700">
                RECORDS
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
