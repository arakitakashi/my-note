# my-note

[arakitakashi.com](https://arakitakashi.com/) — フロントエンドやデザインの気づきを記録する個人ブログ・ポートフォリオサイト。

## 技術スタック

- [Astro 5](https://astro.build/)(静的サイト生成)
- React 19(`Home` / `Footer` / `PostShare` コンポーネント)
- MDX(ブログ記事は `src/content/blog/` 配下)
- CSS Modules + カスタムプロパティによるライト/ダークテーマ

## セットアップ

```sh
pnpm install
pnpm dev      # 開発サーバー(localhost:4321)
pnpm build    # 本番ビルド(./dist/ に出力)
pnpm preview  # ビルド結果のプレビュー
```

## ディレクトリ構成

```text
/
├── public/            # フォント・favicon・OGP画像・目次ハイライトのスクリプト
├── src/
│   ├── components/    # Header / Footer / Home / PostShare / ModeToggle
│   ├── content/blog/  # ブログ記事(MDX)。スキーマは content/config.ts
│   ├── layouts/       # BaseLayout(メタタグ・テーマ初期化)
│   ├── pages/         # ルーティング(/, /blog/[slug], /category/[category], /about, /products)
│   ├── styles/        # ページ単位の CSS Modules と global.css
│   └── utils/         # カテゴリ・日付のユーティリティ
└── docs/              # メモ・TODO
```

## 記事の追加

`src/content/blog/` に MDX ファイルを追加します。frontmatter のスキーマは `src/content/config.ts` で定義されています:

```yaml
---
title: "記事タイトル"
description: "記事の概要(一覧と meta description に使用)"
categories:
  - React
date: 2025-01-01
updated: 2025-01-05 # 任意
---
```
