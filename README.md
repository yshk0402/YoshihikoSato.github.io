# YSato Personal Site（ドラフト）

名刺QRから訪問した相手が短時間で「何者か／何ができるか／依頼できるか」を判断できるようにする個人サイト。
Works（実績）＋ Writing（ブログ）＋ Contact（問い合わせ）を中心に構成します。

> 仕様の全体像は `REQUIREMENTS.md` を参照。

## 目的

* 名刺QR流入を、問い合わせ（最優先）／SNSフォロー／面談へ接続する
* 仕事依頼・協業・採用・紹介に耐える「個人の公式情報源」を作る

## 主要ページ

* `/` Home（QR着地）
* `/works` 実績一覧
* `/works/[slug]` 実績詳細
* `/writing` 記事一覧
* `/writing/[slug]` 記事詳細
* `/about` プロフィール
* `/contact` 問い合わせ

## 推奨スタック（暫定）

* Next.js（App Router）
* Tailwind CSS
* ホスティング：Vercel
* コンテンツ：Markdown + frontmatter（GitHub管理）
* 解析：GA4（推奨） + 任意で Vercel Analytics
* 問い合わせ：Server Actions + メール送信（例：Resend）
* スパム対策：Cloudflare Turnstile / hCaptcha / reCAPTCHA のいずれか

※未確定は `{{TODO}}` のまま進めます。

## リポジトリ構成（案）

```
.
├─ app/
│  ├─ (site)/
│  │  ├─ page.tsx              # Home
│  │  ├─ works/
│  │  │  ├─ page.tsx            # Works一覧
│  │  │  └─ [slug]/page.tsx     # Works詳細
│  │  ├─ writing/
│  │  │  ├─ page.tsx            # Writing一覧
│  │  │  └─ [slug]/page.tsx     # Writing詳細
│  │  ├─ about/page.tsx
│  │  └─ contact/page.tsx
│  ├─ not-found.tsx
│  └─ layout.tsx
├─ content/
│  ├─ works/                    # Markdown
│  └─ writing/                  # Markdown
├─ public/
│  └─ images/
│     ├─ works/{slug}/...
│     └─ writing/{slug}/...
├─ components/
├─ lib/
├─ REQUIREMENTS.md
├─ AGENTS.md
├─ SECURITY.md
├─ GEMINI.md
├─ ARCHITECTURE.md
└─ NOTES.md
```

## コンテンツ運用（Markdown）

* `frontmatter.status: draft` は一覧・ルーティングから除外
* `featured: true` は Home に掲載

### Works frontmatter 例

```yaml
---
slug: example-work
title: "{{TODO: タイトル}}"
summary: "{{TODO: 1行要約}}"
category: "AI導入支援"
tags: ["{{TODO: タグ}}"]
date: "2025-01"
featured: true
status: published
---
```

### Writing frontmatter 例

```yaml
---
slug: example-post
title: "{{TODO: タイトル}}"
summary: "{{TODO: 1行要約}}"
tags: ["{{TODO: タグ}}"]
published_at: "2025-01-01"
featured: false
status: draft
cover_image: "/images/writing/example-post/cover.png" # optional
---
```

## 開発（コマンド例：自動実行しない）

```bash
# 例：依存関係インストール
npm i

# 例：開発サーバ
npm run dev

# 例：ビルド
npm run build
```

## デプロイ

* Vercel に接続してデプロイ（SSG前提）
* 環境変数（例）

  * `{{TODO: GA4_MEASUREMENT_ID}}`
  * `{{TODO: EMAIL_PROVIDER_API_KEY}}`
  * `{{TODO: TURNSTILE_SITE_KEY}}` / `{{TODO: TURNSTILE_SECRET_KEY}}`

## 未確定（TODO）

* サイト名・ドメイン：{{TODO: 未定}}
* 代表CTA以外の導線（SNS種別など）：{{TODO}}
* 問い合わせ通知の宛先／自動返信：{{TODO}}
* Worksのカテゴリ/タグ最小セット：{{TODO: AI導入支援/業務効率化 を起点に整理}}