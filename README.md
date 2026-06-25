# Long Track Records

日本男子長距離の5000m・10000mを中心に、ランキング、選手情報、大会メモを整理するNext.js製の記録サイトです。

公開サイト: https://main.d2913wee5pzbjt.amplifyapp.com/

## サイト概要

Long Track Recordsは、日本男子長距離の記録を見やすく整理するためのWebサイトです。歴代ランキング、今季PBランキング、2027年度新入生の高校男子5000mランキング、選手個人ページ、大会情報メモを掲載しています。


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


## 今後の改善予定

- 未確認データの確認と出典整理
- 管理画面の入力補助とバリデーション強化
- URL取り込み機能の対応サイト拡充
- 管理画面のログイン試行制限
- データ更新履歴の表示
- 検索機能や絞り込み機能の追加