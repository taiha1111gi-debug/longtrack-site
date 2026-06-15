import Link from "next/link";
import type { ReactNode } from "react";

type NavItem = {
  href: string;
  label: string;
};

const eventLinks: NavItem[] = [
  { href: "/records/5000m", label: "男子5000m歴代ランキング" },
  { href: "/records/10000m", label: "男子10000m歴代ランキング" },
];

const rankingLinks: NavItem[] = [
  { href: "/records/5000m/season", label: "今季男子5000mランキング" },
  { href: "/records/10000m/season", label: "今季男子10000mランキング" },
];

export function SiteHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/15 bg-slate-950/85 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10 lg:px-12">
        <Link href="/" className="text-sm font-black tracking-[0.16em]">
          LONG TRACK
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="メインナビゲーション">
          <HeaderLink href="/">ホーム</HeaderLink>
          <Dropdown label="競技一覧" items={eventLinks} widthClass="w-64" />
          <Dropdown label="今季PBランキング" items={rankingLinks} widthClass="w-64" />
        </nav>

        <details className="group relative md:hidden">
          <summary
            className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-md border border-white/25 text-white marker:hidden"
            aria-label="メニューを開く"
          >
            <span className="relative block h-4 w-5">
              <span className="absolute left-0 top-0 h-0.5 w-5 rounded bg-white transition group-open:top-2 group-open:rotate-45" />
              <span className="absolute left-0 top-2 h-0.5 w-5 rounded bg-white transition group-open:opacity-0" />
              <span className="absolute left-0 top-4 h-0.5 w-5 rounded bg-white transition group-open:top-2 group-open:-rotate-45" />
            </span>
          </summary>

          <nav
            className="absolute right-0 mt-3 w-72 rounded-md border border-slate-700 bg-slate-950 p-2 shadow-xl"
            aria-label="モバイルナビゲーション"
          >
            <MobileLink href="/">ホーム</MobileLink>
            <MobileDropdown label="競技一覧" items={eventLinks} />
            <MobileDropdown label="今季PBランキング" items={rankingLinks} />
          </nav>
        </details>
      </div>
    </header>
  );
}

function HeaderLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-md px-3 py-2 text-sm font-bold text-slate-200 hover:bg-white/10 hover:text-white"
    >
      {children}
    </Link>
  );
}

function Dropdown({
  label,
  items,
  widthClass,
}: {
  label: string;
  items: NavItem[];
  widthClass: string;
}) {
  return (
    <details className="group relative">
      <summary className="cursor-pointer list-none rounded-md px-3 py-2 text-sm font-bold text-slate-200 hover:bg-white/10 hover:text-white marker:hidden">
        {label} ▼
      </summary>
      <div className={`absolute left-0 top-full mt-2 ${widthClass} rounded-md border border-slate-700 bg-slate-950 p-2 shadow-xl`}>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-md px-3 py-3 text-sm font-bold text-slate-100 hover:bg-white/10"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </details>
  );
}

function MobileLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="block rounded-md px-3 py-3 text-sm font-bold text-slate-100 hover:bg-white/10"
    >
      {children}
    </Link>
  );
}

function MobileDropdown({ label, items }: { label: string; items: NavItem[] }) {
  return (
    <details className="my-2 border-y border-white/10 py-2">
      <summary className="cursor-pointer list-none rounded-md px-3 py-3 text-sm font-bold text-slate-100 hover:bg-white/10 marker:hidden">
        {label} ▼
      </summary>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="ml-3 block rounded-md px-3 py-2.5 text-sm font-bold text-slate-100 hover:bg-white/10"
        >
          {item.label}
        </Link>
      ))}
    </details>
  );
}
