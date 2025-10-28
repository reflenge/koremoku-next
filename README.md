# KOREMOKU Next.js

これもく概算書生成webアプリ

## 📋 目次

- [状態管理（Zustand）](#状態管理zustand)
- [自動金額計算機能](#自動金額計算機能)
- [PDF生成機能](#pdf生成機能)
- [ファイル構成](#ファイル構成)
- [使用例](#使用例)

---

## 状態管理（Zustand）

このプロジェクトでは、Zustandを使用してプロジェクト情報を管理しています。

### 管理している状態

| 項目 | 型 | 説明 |
|------|-----|------|
| `amount` | `number` | 金額（Server Actionから取得） |
| `firePreventionArea` | `string` | 防火地域等（ユーザー入力） |
| `floors` | `number` | 階数（ユーザー入力） |
| `span` | `number` | 短手方向/スパン（ユーザー入力） |
| `depth` | `number` | 長手方向/奥行き（ユーザー入力） |

| `isGeneratingPDF` | `boolean` | PDF生成中フラグ（UI要素の表示/非表示制御用） |

### ストアの場所

- **ストア定義**: `src/store/useProjectStore.ts`
- **グローバル監視**: `src/store/projectStoreSubscriber.ts`

---

## 自動金額計算機能

ユーザーが4つの値（防火地域等、階数、スパン、奥行き）を入力すると、自動的にServer Actionを呼び出して金額を計算します。

### 仕組み

1. **グローバル監視**: `ProjectStoreProvider`コンポーネントがアプリ全体で状態を監視
2. **デバウンス**: 入力後500ms待機してから計算（連続入力時の無駄な処理を防止）
3. **バリデーション**: 必須項目が全て入力されているか自動チェック
4. **Server Action呼び出し**: サーバー側で金額を計算
5. **結果をストアに保存**: 計算結果を自動的にストアに反映

### Server Action

- **ファイル**: `src/actions/calculateAmount.ts`
- **機能**: 4つのユーザー入力値を受け取り、金額を計算してレスポンスを返す
- **現在の実装**: 入力値を組み合わせた数値を返す（実際の計算ロジックに変更可能）

---

## PDF生成機能

画面全体をPDFとしてダウンロードする機能を提供します。PDF生成時に不要な要素（ボタン、入力フォームなど）を自動的に非表示にできます。

### セットアップ

詳細は [SETUP_PDF.md](./SETUP_PDF.md) を参照してください。

```bash
pnpm add html2canvas jspdf
```

### 主な機能

- **PDF生成**: 指定した要素をPDFファイルとしてダウンロード
- **要素の表示制御**: PDF生成時に不要な要素を自動非表示
- **カスタマイズ可能**: 解像度、方向（縦/横）を指定可能

### 基本的な使い方

```tsx
import { PDFDownloadButton } from "@/components/PDFDownloadButton";
import { HideOnPDF } from "@/components/HideOnPDF";

function MyPage() {
  return (
    <div>
      {/* PDFに含めたくない要素 */}
      <HideOnPDF>
        <button>編集</button>
      </HideOnPDF>

      {/* PDFに変換する部分 */}
      <div id="content">
        <h1>見積書</h1>
        {/* 内容 */}
      </div>

      {/* PDFダウンロードボタン */}
      <HideOnPDF>
        <PDFDownloadButton
          targetId="content"
          fileName="見積書_2024"
        />
      </HideOnPDF>
    </div>
  );
}
```

---

## ファイル構成

```
src/
├── store/
│   ├── useProjectStore.ts              # Zustandストアの定義
│   └── projectStoreSubscriber.ts       # グローバル監視関数
├── actions/
│   └── calculateAmount.ts              # 金額計算Server Action
├── components/
│   ├── ProjectStoreProvider.tsx        # グローバル監視プロバイダー
│   ├── PDFDownloadButton.tsx           # PDFダウンロードボタン
│   └── HideOnPDF.tsx                   # PDF表示制御コンポーネント
├── utils/
│   └── pdfGenerator.ts                 # PDF生成ユーティリティ
└── app/
    └── (USER)/
        ├── estimate/                   # 見積もりページ
        └── estimate-pdf-sample/        # PDF機能付き見積もりページ（実装例）
```

---

## 使用例

### 1. ストアから値を取得・更新

```tsx
import { useProjectStore } from '@/store/useProjectStore';

function MyComponent() {
    // 値を取得
    const amount = useProjectStore((state) => state.amount);
    const floors = useProjectStore((state) => state.floors);

    // 更新関数を取得
    const setFloors = useProjectStore((state) => state.setFloors);

    // 値を更新
    setFloors(3);

    return <div>金額: {amount.toLocaleString()}円</div>;
}
```

### 2. ユーザー入力を一括設定

```tsx
const setUserInputData = useProjectStore((state) => state.setUserInputData);

setUserInputData({
    firePreventionArea: "防火地域",
    floors: 3,
    span: 10.5,
    depth: 15.0,
});
```

### 3. 手動でServer Actionを呼び出す

```tsx
import { calculateAmount } from '@/actions/calculateAmount';
import { useProjectStore } from '@/store/useProjectStore';

async function handleCalculate() {
    const data = {
        firePreventionArea: "防火地域",
        floors: 3,
        span: 10.5,
        depth: 15.0,
    };

    const result = await calculateAmount(data);

    if (result.success) {
        useProjectStore.getState().setAmount(result.amount);
        console.log('金額:', result.amount);
    }
}
```

---

## 技術スタック

- **Next.js 15** - React フレームワーク
- **Zustand** - 状態管理ライブラリ
- **TypeScript** - 型安全な開発
- **Tailwind CSS** - スタイリング
- **Server Actions** - サーバーサイド処理

---

## 開発

```bash
# 開発サーバー起動
pnpm dev

# ビルド
pnpm build

# Linter実行
pnpm lint

# フォーマット
pnpm format
```
