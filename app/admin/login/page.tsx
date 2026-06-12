import Link from "next/link";
import { redirect } from "next/navigation";
import { SiteHeader } from "../../components/SiteHeader";
import { isAdminLoggedIn, isAuthConfigured } from "../auth";
import { loginAction } from "../actions";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  if (await isAdminLoggedIn()) {
    redirect("/admin");
  }

  const { error } = await searchParams;
  const configured = isAuthConfigured();

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <SiteHeader />
      <div className="mx-auto max-w-xl px-6 pb-12 pt-28 sm:px-10">
        <Link
          href="/"
          className="inline-flex rounded-md bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-700"
        >
          ホームへ戻る
        </Link>

        <section className="mt-6 rounded-md border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-bold tracking-[0.14em] text-cyan-700">
            ADMIN
          </p>
          <h1 className="mt-2 text-3xl font-black">ログイン</h1>

          {!configured && (
            <p className="mt-5 rounded-md bg-red-50 p-4 text-sm leading-7 text-red-700">
              `.env.local` に `ADMIN_PASSWORD` と `ADMIN_SESSION_SECRET` を設定してください。
            </p>
          )}

          {error === "password" && (
            <p className="mt-5 rounded-md bg-red-50 p-4 text-sm font-bold text-red-700">
              パスワードが違います。
            </p>
          )}

          <form action={loginAction} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm font-bold text-slate-700">
                パスワード
              </span>
              <input
                type="password"
                name="password"
                disabled={!configured}
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm outline-none focus:border-cyan-700"
              />
            </label>
            <button
              type="submit"
              disabled={!configured}
              className="rounded-md bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              ログイン
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
