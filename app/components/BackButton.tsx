import Link from "next/link";

type BackButtonProps = {
  href: string;
  label: string;
};

export function BackButton({ href, label }: BackButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex rounded-md bg-slate-900 px-3 py-2 text-xs font-bold text-white hover:bg-slate-700 sm:px-4 sm:py-3 sm:text-sm"
    >
      {label}
    </Link>
  );
}
