# CLAUDE.md

このファイルは、このリポジトリで Claude Code が作業する際のガイドラインです。

## プロジェクト概要

Supabase認証機能付きの不動産管理Webアプリ（realestate-app）。
メールアドレス＋パスワードでの会員登録・ログインを行い、ログイン後は物件一覧（現状はダミーデータ）を表示する。

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
- `src/pages/PropertyList.jsx`: 物件一覧画面（カードUI・ログアウトボタン）
- `src/data/dummyProperties.js`: 物件一覧のダミーデータ

## Git運用ルール

- コードに変更を加えたら、その都度GitHubにプッシュすること。
- 変更内容ごとに適切な単位でコミットを作成し、コミット後は速やかに `git push` を実行する。
- 変更を溜め込んでまとめてプッシュしない。
- コミットメッセージは変更の「何を」ではなく「なぜ」を意識して簡潔に書く。
- force push（`git push --force` 等）や `git reset --hard` などの破壊的操作は、ユーザーの明示的な許可なく行わない。
- リモートリポジトリ（GitHub）が未設定の場合は、プッシュ前にユーザーに確認する。
- 秘密情報（APIキー、パスワード、.envファイルなど）は絶対にコミットしない。

## 今後追記する項目

- 物件データのSupabaseテーブル連携（現状はダミーデータ）
- テスト方針
