# Long Track Records

Next.js App Routerで作成している、日本男子長距離の記録・選手情報・大会メモをまとめるサイトです。

## 開発

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## ビルド確認

```bash
npm run build
```

## 管理画面

管理画面を使う前に、ローカルでは `.env.local` を作成します。

```env
ADMIN_PASSWORD=your-password
ADMIN_SESSION_SECRET=change-this-to-a-long-random-string
```

管理画面ログイン:

[http://localhost:3000/admin/login](http://localhost:3000/admin/login)

編集データは `data/longtrack-db.json` に保存されます。公開用の初期データとしても使うため、このJSONファイルは削除しないでください。

## 主な構成

- `app/page.tsx`: トップページ
- `app/components/SiteHeader.tsx`: 共通ナビゲーション
- `app/records/`: 歴代ランキング、今季PBランキング、新入生ランキング
- `app/players/`: 選手一覧、選手個人ページ
- `app/admin/`: 管理画面、ログイン、保存処理
- `app/lib/db.ts`: ローカルJSON DBの読み書き
- `app/records/data.ts`: 静的なランキング・選手データ
- `data/longtrack-db.json`: 管理画面で編集するランキング・選手データ
- `public/track.jpg`: トップページのヒーロー画像

## 本番環境で必要な環境変数

- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`
