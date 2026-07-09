/* 物件管理テーブルの作成
   Supabaseダッシュボードの「SQL Editor」でこのSQLを実行してください。 */

/* 物件テーブル本体
   name: 物件名 / rent: 家賃（円） / area: エリア名 / layout: 間取り（例: 1LDK）
   user_id: 登録したユーザー（auth.usersのid） */
create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  rent integer not null check (rent >= 0),
  area text not null,
  layout text not null,
  created_at timestamptz not null default now()
);

/* 自分の物件を検索しやすくするためのインデックス */
create index if not exists properties_user_id_idx on public.properties (user_id);

/* RLS（行レベルセキュリティ）を有効化 */
alter table public.properties enable row level security;

/* 自分が登録した物件のみ閲覧できる */
create policy "Users can select their own properties"
  on public.properties
  for select
  using (auth.uid() = user_id);

/* 自分のuser_idとして登録する場合のみ新規登録できる */
create policy "Users can insert their own properties"
  on public.properties
  for insert
  with check (auth.uid() = user_id);

/* 自分が登録した物件のみ更新できる */
create policy "Users can update their own properties"
  on public.properties
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

/* 自分が登録した物件のみ削除できる */
create policy "Users can delete their own properties"
  on public.properties
  for delete
  using (auth.uid() = user_id);
