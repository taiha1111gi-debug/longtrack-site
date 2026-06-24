# Long Track Records

日本男子長距離の5000m・10000mを中心に、ランキング、選手情報、大会メモを整理するNext.js製の記録サイトです。

公開サイト: https://main.d2913wee5pzbjt.amplifyapp.com/

## サイト概要

Long Track Recordsは、日本男子長距離の記録を見やすく整理するためのWebサイトです。歴代ランキング、今季PBランキング、2027年度新入生の高校男子5000mランキング、選手個人ページ、大会情報メモを掲載しています。

## 作成した目的

陸上長距離の記録情報は複数のサイトや大会結果に分散しやすいため、5000m・10000mを中心に、選手名・記録・所属・大会・日付を一つのサイトで確認しやすくすることを目的に作成しました。

また、管理画面からランキングや選手プロフィールを更新できるようにし、静的な一覧ページだけでなく、継続的にデータを育てられる構成を目指しています。

## 主な機能

- 日本男子5000m・10000mの歴代ランキング表示
- 2026年シーズンの今季PBランキング表示
- 2027年度新入生 高校男子5000mランキング表示
- 選手一覧と選手個人ページ
- 大会情報ページ
- PC・スマートフォンに対応したランキング表示
- 管理画面でのランキングデータ編集
- 管理画面での選手プロフィール編集
- URLから記録候補を読み取る管理画面向けプレビュー機能
- sitemap.xml / robots.txt の生成
- Google Search Console / Bing Webmaster Tools の所有権確認ファイル配置

## 使用技術

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Server Actions
- ローカルJSONファイルによる簡易データ管理
- AWS Amplify Hosting

## システム構成・データの保存方法

主な画面はNext.js App Routerの app ディレクトリで管理しています。

- app/page.tsx: トップページ
- app/records/: ランキング関連ページ
- app/players/: 選手一覧・選手個人ページ
- app/races/: 大会情報ページ
- app/admin/: 管理画面・ログイン・編集機能
- app/lib/db.ts: data/longtrack-db.json の読み書き
- app/records/data.ts: 初期表示用の静的データ・型定義
- data/longtrack-db.json: 管理画面で編集するランキング・選手プロフィールデータ

管理画面で編集したランキングや選手プロフィールは、data/longtrack-db.json に保存します。DBサーバーは使わず、個人運用しやすいローカルJSON DBとして設計しています。

## AWS Amplifyでの公開

GitHubリポジトリをAWS Amplify Hostingに接続し、mainブランチをデプロイ対象にしています。Amplify側でビルドを実行し、Next.jsアプリとして公開しています。

## GitHub連携による自動デプロイ

mainブランチへpushすると、AWS Amplifyが変更を検知して自動デプロイします。ローカルで編集とビルド確認を行い、GitHubへpushして本番へ反映する運用を想定しています。

## 管理画面について

管理画面では、今季ランキング、新入生ランキング、選手プロフィールを編集できます。

管理画面URL:

- /admin/login
- /admin

ログインには環境変数で設定した管理者用パスワードを使用します。認証情報はコードに直接書かず、ローカルでは .env.local、本番ではAWS Amplifyの環境変数に設定します。

## セキュリティ上の工夫

- 管理者パスワードとセッション用シークレットは環境変数で管理
- .env.local などの環境変数ファイルは .gitignore で除外
- 管理画面の更新処理ではログイン状態を確認
- 管理画面のCookieは httpOnly を使用
- 本番環境ではCookieに secure を付与
- 公開ページには出典URLや確認状態などの管理用フィールドを表示しない設計

## 開発で工夫した点

- ランキング表をPCでは表形式、スマートフォンではカード形式で表示
- 選手名クリックで個人ページへ移動できる導線を用意
- 管理画面でランキング行の追加・削除・並び替えができる構成
- sourceUrl / sourceName / verifiedAt / verificationStatus を管理用データとして保持
- 公開ページと管理画面で表示する情報を分離
- JSON DBの古い構造にも対応しやすいように正規化処理を用意

## 今後の改善予定

- 未確認データの確認と出典整理
- 管理画面の入力補助とバリデーション強化
- URL取り込み機能の対応サイト拡充
- 管理画面のログイン試行制限
- データ更新履歴の表示
- 検索機能や絞り込み機能の追加

## ローカルでの起動方法

依存関係をインストールします。

```bash
npm install
```

開発サーバーを起動します。

```bash
npm run dev
```

ブラウザで以下を開きます。

```text
http://localhost:3000
```

本番ビルドを確認します。

```bash
npm run build
```

## 環境変数の説明

ローカルでは .env.local を作成し、以下の環境変数を設定します。

```env
ADMIN_PASSWORD=your-admin-password
ADMIN_SESSION_SECRET=your-long-random-session-secret
```

- ADMIN_PASSWORD: 管理画面ログイン用のパスワード
- ADMIN_SESSION_SECRET: 管理画面のセッションCookie署名に使う長いランダム文字列

実際のパスワードやシークレット値はGitHubに公開しません。本番環境ではAWS AmplifyのEnvironment variablesに設定します。
