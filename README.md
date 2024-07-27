# Claude 3 Image Description Project

## 概要

このプロジェクトは、Anthropic社のClaude 3 APIを使用して画像の説明を生成するVue.jsアプリケーションです。ユーザーはテキストメッセージと画像をアップロードし、AIによる説明を受け取ることができます。

## 機能

- テキストメッセージの入力
- 画像のアップロード
- Claude 3 APIを使用した画像の説明生成
- レスポンスの表示

## 前提条件

- Node.js (v14.0.0以上)
- npm (v6.0.0以上)
- Anthropic APIキー

## セットアップ

1. リポジトリをクローンします：

   ```
   git clone https://github.com/your-username/claude3-image-description.git
   cd claude3-image-description
   ```

2. 依存関係をインストールします：

   ```
   npm install
   ```

3. `.env`ファイルを作成し、Anthropic APIキーを設定します：

   ```
   CLAUDE_API_KEY=your_api_key_here
   ```

4. バックエンドサーバーを起動します：

   ```
   pwd
   > ImageDescription_ByCLAUDE
   node server.js
   ```

5. 新しいターミナルウィンドウで、フロントエンド開発サーバーを起動します：

   ```
   pwd
   > ImageDescription_ByCLAUDE\claude-img-description

   npm run serve
   ```

6. ブラウザで `http://localhost:8080` を開きます。

## 使用方法

1. テキストボックスにメッセージを入力します。
2. 「ファイルを選択」ボタンをクリックして画像をアップロードします。
3. 「送信」ボタンをクリックします。
4. AIによる画像の説明が表示されるまで待ちます。

## 技術スタック

- フロントエンド: Vue.js
- バックエンド: Express.js
- API: Anthropic Claude 3

## トラブルシューティング

- エラーメッセージが表示される場合は、コンソールログを確認してください。
- CORS関連のエラーが発生した場合は、バックエンドのCORS設定を確認してください。
- APIキーが正しく設定されていることを確認してください。

## 貢献

プロジェクトへの貢献を歓迎します。プルリクエストを送る前に、既存の問題をチェックするか、新しい問題を作成してください。

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルを参照してください。
