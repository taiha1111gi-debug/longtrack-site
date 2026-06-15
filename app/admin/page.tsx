import Link from "next/link";
import { redirect } from "next/navigation";
import { SiteHeader } from "../components/SiteHeader";
import {
  getAllEditableRecords,
  getEditableRecords,
  getPlayerProfileOverrides,
  type EditableRecord,
} from "../lib/db";
import { createPlayerProfiles } from "../records/data";
import { isAdminLoggedIn } from "./auth";
import { addRecordAction, logoutAction, updateRecordsAction } from "./actions";
import { PlayerProfileEditor } from "./PlayerProfileEditor";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; message?: string }>;
}) {
  if (!(await isAdminLoggedIn())) {
    redirect("/admin/login");
  }

  const params = await searchParams;
  const records5000 = getEditableRecords("season-5000");
  const records10000 = getEditableRecords("season-10000");
  const playerProfiles = createPlayerProfiles(
    getAllEditableRecords(),
    getPlayerProfileOverrides(),
  );

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-28 sm:px-10 lg:px-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold tracking-[0.14em] text-cyan-700">
              ADMIN
            </p>
            <h1 className="mt-2 text-3xl font-black sm:text-4xl">
              ランキング編集
            </h1>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-md bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-700"
            >
              ログアウト
            </button>
          </form>
        </div>

        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
          入力内容はローカルJSON DBに保存され、今季ランキングページへ反映されます。
        </p>

        {params.status && (
          <div
            className={`mt-5 rounded-md border px-4 py-3 text-sm font-bold ${
              params.status === "saved"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {params.status === "saved"
              ? "保存しました。"
              : params.message || "保存に失敗しました。"}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/records/5000m/season"
            className="rounded-md border border-slate-300 bg-white px-4 py-3 text-sm font-bold hover:border-cyan-600"
          >
            今季5000mを見る
          </Link>
          <Link
            href="/records/10000m/season"
            className="rounded-md border border-slate-300 bg-white px-4 py-3 text-sm font-bold hover:border-cyan-600"
          >
            今季10000mを見る
          </Link>
        </div>

        <AddRecordForm />

        <EditableRanking title="今季男子5000mランキング" records={records5000} groupId="season-5000" />
        <EditableRanking title="今季男子10000mランキング" records={records10000} groupId="season-10000" />
        <PlayerProfileEditor profiles={playerProfiles} />
      </div>
    </main>
  );
}

function AddRecordForm() {
  return (
    <section className="mt-8 rounded-md border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-2xl font-black">行を追加</h2>
      <p className="mt-2 text-sm leading-7 text-slate-600">
        選んだランキングの末尾に新しい行を追加します。
      </p>
      <form
        action={addRecordAction}
        className="mt-5 grid gap-3 rounded-md border border-slate-200 bg-slate-50 p-4 md:grid-cols-2 xl:grid-cols-5"
      >
        <label className="block min-w-0">
          <span className="text-xs font-bold text-slate-500">ランキング</span>
          <select
            name="groupId"
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-2 py-2 text-sm outline-none focus:border-cyan-700"
            defaultValue="season-5000"
          >
            <option value="season-5000">今季5000m</option>
            <option value="season-10000">今季10000m</option>
          </select>
        </label>
        <Field label="slug" name="slug" value="" />
        <Field label="選手名" name="name" value="" />
        <Field label="記録" name="record" value="" />
        <Field label="所属" name="team" value="" />
        <Field label="大会・場所" name="venue" value="" />
        <Field label="日付" name="date" value="" />
        <Field label="メモ" name="note" value="" />
        <Field label="出典URL" name="sourceUrl" value="" />
        <Field label="出典名" name="sourceName" value="" />
        <Field label="確認日" name="verifiedAt" value="" />
        <label className="block min-w-0">
          <span className="text-xs font-bold text-slate-500">確認状態</span>
          <select
            name="verificationStatus"
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-2 py-2 text-sm outline-none focus:border-cyan-700"
            defaultValue="unverified"
          >
            <option value="confirmed">確認済み</option>
            <option value="checking">確認中</option>
            <option value="unverified">未確認</option>
          </select>
        </label>
        <div className="flex items-end xl:col-start-5">
          <button
            type="submit"
            className="w-full rounded-md bg-cyan-700 px-4 py-3 text-sm font-bold text-white hover:bg-cyan-800"
          >
            追加
          </button>
        </div>
      </form>
    </section>
  );
}

function EditableRanking({
  title,
  records,
  groupId,
}: {
  title: string;
  records: EditableRecord[];
  groupId: EditableRecord["groupId"];
}) {
  return (
    <section className="mt-8 rounded-md border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <form action={updateRecordsAction}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-black">{title}</h2>
          <button
            type="submit"
            className="rounded-md bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-700"
          >
            まとめて保存
          </button>
        </div>
        <input type="hidden" name="groupId" value={groupId} />
        <input type="hidden" name="rowCount" value={records.length} />

        <div className="mt-5 max-h-[70vh] overflow-auto rounded-md border border-slate-200">
          <table className="w-full min-w-[1680px] border-collapse bg-white text-sm">
            <thead className="sticky top-0 z-10 bg-slate-900 text-left text-white">
              <tr>
                <th className={tableHeadClass}>順位</th>
                <th className={tableHeadClass}>slug</th>
                <th className={tableHeadClass}>選手名</th>
                <th className={tableHeadClass}>記録</th>
                <th className={tableHeadClass}>所属</th>
                <th className={tableHeadClass}>大会場所</th>
                <th className={tableHeadClass}>日付</th>
                <th className={tableHeadClass}>メモ</th>
                <th className={tableHeadClass}>出典URL</th>
                <th className={tableHeadClass}>出典名</th>
                <th className={tableHeadClass}>確認日</th>
                <th className={tableHeadClass}>確認状態</th>
                <th className={tableHeadClass}>削除</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={`${record.groupId}-${record.rank}`} className="border-b border-slate-200">
                  <td className={tableCellClass}>
                    <input type="hidden" name={`rows.${index}.rank`} value={record.rank} />
                    <CellInput value={String(record.rank)} readOnly />
                  </td>
                  <td className={tableCellClass}>
                    <CellInput name={`rows.${index}.slug`} value={record.slug} />
                  </td>
                  <td className={tableCellClass}>
                    <CellInput name={`rows.${index}.name`} value={record.name} />
                  </td>
                  <td className={tableCellClass}>
                    <CellInput name={`rows.${index}.record`} value={record.record} strong />
                  </td>
                  <td className={tableCellClass}>
                    <CellInput name={`rows.${index}.team`} value={record.team} />
                  </td>
                  <td className={tableCellClass}>
                    <CellInput name={`rows.${index}.venue`} value={record.venue} />
                  </td>
                  <td className={tableCellClass}>
                    <CellInput name={`rows.${index}.date`} value={record.date} />
                  </td>
                  <td className={tableCellClass}>
                    <CellInput name={`rows.${index}.note`} value={record.note ?? ""} />
                  </td>
                  <td className={tableCellClass}>
                    <CellInput name={`rows.${index}.sourceUrl`} value={record.sourceUrl ?? ""} />
                  </td>
                  <td className={tableCellClass}>
                    <CellInput name={`rows.${index}.sourceName`} value={record.sourceName ?? ""} />
                  </td>
                  <td className={tableCellClass}>
                    <CellInput name={`rows.${index}.verifiedAt`} value={record.verifiedAt ?? ""} />
                  </td>
                  <td className={tableCellClass}>
                    <select
                      name={`rows.${index}.verificationStatus`}
                      defaultValue={record.verificationStatus ?? "unverified"}
                      className="h-9 w-full min-w-0 border-0 bg-transparent px-2 text-sm outline-none focus:bg-cyan-50 focus:ring-2 focus:ring-inset focus:ring-cyan-600"
                    >
                      <option value="confirmed">確認済み</option>
                      <option value="checking">確認中</option>
                      <option value="unverified">未確認</option>
                    </select>
                  </td>
                  <td className={`${tableCellClass} text-center`}>
                    <input
                      type="checkbox"
                      name={`rows.${index}.delete`}
                      className="h-4 w-4 accent-red-600"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </section>
  );
}

function CellInput({
  name,
  value,
  readOnly = false,
  strong = false,
}: {
  name?: string;
  value: string;
  readOnly?: boolean;
  strong?: boolean;
}) {
  return (
    <input
      name={name}
      defaultValue={value}
      readOnly={readOnly}
      className={`h-9 w-full min-w-0 border-0 bg-transparent px-2 text-sm outline-none focus:bg-cyan-50 focus:ring-2 focus:ring-inset focus:ring-cyan-600 read-only:text-slate-500 ${
        strong ? "font-black text-red-600" : ""
      }`}
    />
  );
}
function Field({
  label,
  name,
  value,
  readOnly = false,
}: {
  label: string;
  name?: string;
  value: string;
  readOnly?: boolean;
}) {
  return (
    <label className="block min-w-0">
      <span className="text-xs font-bold text-slate-500">{label}</span>
      <input
        name={name}
        defaultValue={value}
        readOnly={readOnly}
        className="mt-1 w-full rounded-md border border-slate-300 bg-white px-2 py-2 text-sm outline-none focus:border-cyan-700 read-only:bg-slate-100"
      />
    </label>
  );
}

const tableHeadClass = "px-3 py-3 font-bold whitespace-nowrap";
const tableCellClass = "border-r border-slate-200 p-0 align-middle";



