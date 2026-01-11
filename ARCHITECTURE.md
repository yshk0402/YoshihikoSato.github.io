# ARCHITECTURE.md（ドラフト / C4-Lite）

本ドキュメントは、本個人サイトの全体構造を **C4-Lite** 形式で整理したものです。
実装判断や将来拡張時の迷いを減らすことを目的とします。

---

## 1. Context（全体像）

### システムの目的

* 名刺QRから流入した訪問者が、短時間で以下を判断できること

  * 何者か
  * 何ができるか
  * 依頼できるか
* そのまま **問い合わせ（最優先）** に進めること

### 主なアクター

* 名刺交換直後の訪問者（最重要）
* 紹介・採用・協業候補
* サイト管理者（YSato）

### 外部システム

* ホスティング：Vercel
* 解析：GA4（推奨）／Vercel Analytics（任意）
* メール送信：{{TODO: Resend 等}}
* スパム対策：{{TODO: Turnstile / hCaptcha / reCAPTCHA}}

---

## 2. Container（構成要素）

### 2.1 フロントエンド（Web App）

* Next.js（App Router）
* Tailwind CSS
* 静的生成（SSG）を基本とする

役割：

* 各ページの表示（Home / Works / Writing / About / Contact）
* OGP / メタタグの生成
* CTA / ナビゲーションの一貫性維持

### 2.2 コンテンツ管理（Content）

* Markdown + frontmatter
* GitHub リポジトリで管理

```
/content
 ├─ works/
 │   └─ {slug}.md
 └─ writing/
     └─ {slug}.md
```

役割：

* Works / Writing の本文・メタ情報の一次ソース
* draft / published による公開制御

### 2.3 問い合わせ処理（Contact Flow）

* フロント：問い合わせフォーム
* バックエンド：Server Actions or API Route

役割：

* 入力値検証
* スパム対策検証
* メール送信（管理者通知／任意で自動返信）

### 2.4 解析・計測（Analytics）

* ページビュー計測
* CTA / カードクリックイベント
* UTM（名刺QR用）の取得

---

## 3. Component（主要コンポーネント）

### 3.1 ページコンポーネント

* HomePage
* WorksListPage / WorksDetailPage
* WritingListPage / WritingDetailPage
* AboutPage
* ContactPage

### 3.2 UI コンポーネント

* Header / Footer
* Navigation
* Card（Works / Writing 共通）
* CTA Button
* Tag / Category Badge

### 3.3 ロジック系

* Markdown Loader（frontmatter 解析）
* Draft Filter（status !== published を除外）
* Featured Filter（Home 表示用）
* OGP Generator
* Analytics Event Helper

---

## 4. データフロー（代表例）

### 4.1 Home 表示

1. Markdown から featured な Works / Writing を取得
2. Card コンポーネントで表示
3. CTA クリック時にイベント送信

### 4.2 Works 詳細表示

1. slug から該当 Markdown を取得
2. frontmatter から OGP / meta を生成
3. 本文（Markdown）をレンダリング
4. CTA 表示 → Contact へ誘導

### 4.3 問い合わせ送信

1. フォーム入力
2. スパム対策検証
3. Server Actions / API Route に POST
4. メール送信
5. 完了画面 or メッセージ表示

---

## 5. 非機能観点での設計判断

### 性能

* SSG 前提で高速表示
* 画像は必要に応じて遅延読み込み

### 保守性

* コンテンツと表示ロジックを分離
* Markdown を唯一の正とする

### 拡張性

* /projects / /now の追加は同一パターンで可能
* 解析イベントは追加しやすい構造に

---

## 6. 今後の拡張ポイント（想定）

* 検索（タグベース）
* ニュースレター導線
* OGP 画像の自動生成
* 画像最適化パイプライン

---

## 7. 未確定事項（TODO）

* 問い合わせ送信基盤の確定
* スパム対策サービスの選定
* 解析イベントの最終定義
