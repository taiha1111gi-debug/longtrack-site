import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href: string;
};

const siteUrl = "https://main.d2913wee5pzbjt.amplifyapp.com";

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const breadcrumbs = [{ label: "ホーム", href: "/" }, ...items];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: new URL(item.href, siteUrl).toString(),
    })),
  };

  return (
    <>
      <nav aria-label="パンくず" className="text-xs text-slate-600 sm:text-sm">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {breadcrumbs.map((item, index) => {
            const isCurrent = index === breadcrumbs.length - 1;

            return (
              <li key={item.href} className="flex items-center gap-x-2">
                {index > 0 && <span aria-hidden="true">/</span>}
                {isCurrent ? (
                  <span aria-current="page" className="font-bold text-slate-900">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="hover:text-cyan-800 hover:underline">
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\u003c"),
        }}
      />
    </>
  );
}
