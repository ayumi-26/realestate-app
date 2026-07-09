# CLAUDE.md

このファイルは、このリポジトリで Claude Code が作業する際のガイドラインです。

## プロジェクト概要

Supabase認証機能付きの不動産管理Webアプリ（realestate-app）。
メールアドレス＋パスワードでの会員登録・ログインを行い、ログイン後は自分が登録した物件の一覧・新規登録・編集・削除ができる（Supabaseの`properties`テーブルと連携、RLSにより自分の物件のみ操作可能）。

- リポジトリ: https://github.com/ayumi-26/realestate-app

## 技術スタック

- React + Vite
- react-router-dom（ルーティング）
- @supabase/supabase-js（認証）

## セットアップ

```bash
npm install
cp .env.example .env  # VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY を設定
npm run dev
```

- SupabaseのProject URL・Publishable keyは `.env` で管理し、`.env` は `.gitignore` 対象（コミットしない）。

## コマンド

- `npm run dev`: 開発サーバー起動
- `npm run build`: 本番ビルド
- `npm run lint`: Lint実行

## ディレクトリ構成

- `src/lib/supabaseClient.js`: Supabaseクライアント初期化
- `src/context/AuthContext.jsx`: 認証状態（ログインユーザー）を管理するContext
- `src/components/ProtectedRoute.jsx`: 未ログイン時にログイン画面へリダイレクトするラッパー
- `src/pages/Login.jsx` / `src/pages/Signup.jsx`: ログイン・会員登録画面
- `src/lib/properties.js`: 物件のCRUD処理（Supabaseの`properties`テーブル）
- `src/components/PropertyForm.jsx`: 物件の新規登録・編集共通フォーム
- `src/pages/PropertyList.jsx`: 物件一覧画面（一覧・新規登録・編集・削除・ログアウトボタン）
- `supabase/sql/001_create_properties.sql`: `properties`テーブルとRLSポリシーの作成SQL（Supabase側で手動実行）
- `vercel.json`: Vercelデプロイ用のSPAリライト設定

## デプロイ情報

- 本番URL: https://realestate-app-indol-theta.vercel.app
- Supabaseプロジェクト名: realestate-app

## Git運用ルール

- コードに変更を加えたら、その都度GitHubにプッシュすること。
- 変更内容ごとに適切な単位でコミットを作成し、コミット後は速やかに `git push` を実行する。
- 変更を溜め込んでまとめてプッシュしない。
- コミットメッセージは変更の「何を」ではなく「なぜ」を意識して簡潔に書く。
- force push（`git push --force` 等）や `git reset --hard` などの破壊的操作は、ユーザーの明示的な許可なく行わない。
- リモートリポジトリ（GitHub）が未設定の場合は、プッシュ前にユーザーに確認する。
- 秘密情報（APIキー、パスワード、.envファイルなど）は絶対にコミットしない。

## 今後追記する項目

- テスト方針
