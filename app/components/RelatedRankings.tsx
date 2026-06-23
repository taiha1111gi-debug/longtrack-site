import Link from "next/link";

const rankingLinks = [
  {
    href: "/records/5000m",
    label: "日本男子5000m歴代ランキング",
    type: "歴代記録",
  },
  {
    href: "/records/10000m",
    label: "日本男子10000m歴代ランキング",
    type: "歴代記録",
  },
  {
    href: "/records/5000m/season",
    label: "2026年 日本男子5000mランキング",
    type: "今季PB",
  },
  {
    href: "/records/10000m/season",
    label: "2026年 日本男子10000mランキング",
    type: "今季PB",
  },
  {
    href: "/records/freshman-2027-5000",
    label: "2027年度新入生 高校男子5000mランキング",
    type: "高校記録",
  },
];

export function RelatedRankings({ currentPath }: { currentPath?: string }) {
  const links = rankingLinks.filter((item) => item.href !== currentPath);

  return (
    <nav className="mt-8 border-t border-slate-200 pt-6" aria-label="関連ランキング">
      <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
        関連する日本男子ランキング
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-md border border-slate-200 bg-white px-4 py-4 shadow-sm transition hover:border-cyan-600 hover:shadow-md"
          >
            <span className="block text-xs font-bold text-cyan-700">
              {item.type}
            </span>
            <span className="mt-1 block text-sm font-black leading-6 text-slate-900 group-hover:text-cyan-800">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
