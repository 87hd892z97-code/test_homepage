# 管理者ページ

## 機能

- 演奏会情報の一覧表示
- 演奏会情報の追加
- 演奏会情報の編集
- 演奏会情報の削除

## 使用方法

1. 開発サーバーを起動:
```bash
pnpm dev
```

2. ブラウザで以下にアクセス:
```
http://localhost:3000/admin
```

## データベース

SQLiteデータベースを使用しています。
- データベースファイル: `prisma/dev.db`
- スキーマ: `prisma/schema.prisma`

## データの移行

現在、ハードコーディングされたデータ（`app/concerts/past/data.ts`）はまだデータベースに移行されていません。

データベースに既存データを移行するには、以下のコマンドを実行してください:

```bash
pnpm db:seed
```

注意: 現在シードスクリプトがPrismaクライアントのインポート問題で正常に動作していません。
手動でのデータ移行またはスクリプトの修正が必要です。

## API エンドポイント

- `GET /api/admin/concerts` - 全ての演奏会を取得
- `POST /api/admin/concerts` - 新しい演奏会を作成
- `GET /api/admin/concerts/[id]` - 特定の演奏会を取得
- `PUT /api/admin/concerts/[id]` - 演奏会を更新
- `DELETE /api/admin/concerts/[id]` - 演奏会を削除

## 今後の改善予定

- [ ] 認証システムの追加
- [ ] 画像アップロード機能
- [ ] 執行部メンバー管理機能
- [ ] データの一括インポート/エクスポート
