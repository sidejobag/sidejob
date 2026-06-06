# 副業アンケート

クラウドワークスからの副業希望者向けアンケート。回答送信後、自動でLINE友だち追加ページへリダイレクトします。回答内容はDiscord Webhookへ通知されます。

## ローカル起動

```bash
npm install
cp .env.example .env.local
# .env.local の値を設定（下記参照）
npm run dev
```

## .env.local の設定

| 変数名 | 説明 |
|---|---|
| `DISCORD_WEBHOOK_URL` | DiscordチャンネルのWebhook URL（サーバー側でのみ使用） |
| `VITE_LINE_URL` | LINE友だち追加ページのURL（例: `https://line.me/R/ti/p/@xxxxxxxxx`） |

## Vercel デプロイ時の環境変数

Vercel ダッシュボード → プロジェクト → Settings → Environment Variables に以下を設定してください。

| 変数名 | 対象環境 | 備考 |
|---|---|---|
| `DISCORD_WEBHOOK_URL` | Production / Preview | サーバー側 API でのみ参照。フロントには露出しない |
| `VITE_LINE_URL` | Production / Preview | ビルド時に埋め込まれるためフロントから参照可 |

`DISCORD_WEBHOOK_URL` は **Sensitive** に設定することを推奨します。

## 技術構成

- Vite + React + TypeScript
- Tailwind CSS v4（`@tailwindcss/vite` プラグイン方式）
- Vercel Functions（`api/submit.ts`）
