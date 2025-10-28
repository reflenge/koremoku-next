# PDF機能のセットアップ手順

## 📦 必要なパッケージのインストール

PDF生成機能を使用するには、以下のパッケージをインストールしてください。

```bash
pnpm add html2canvas-pro jspdf
```

TypeScript用の型定義（オプション）：

```bash
pnpm add -D @types/html2canvas
```

## 🎯 実装内容

### 1. ストアに追加された状態

`src/store/useProjectStore.ts`

- **`isGeneratingPDF`**: PDF生成中かどうかを示すフラグ（boolean）
- **`setIsGeneratingPDF()`**: PDF生成モードを切り替える関数

### 2. 作成されたファイル

#### ユーティリティ関数

- `src/utils/pdfGenerator.ts`
  - `generatePDF()`: 要素をPDFとしてダウンロード

#### コンポーネント

- `src/components/PDFDownloadButton.tsx`
  - `PDFDownloadButton`: PDFダウンロードボタン

- `src/components/HideOnPDF.tsx`
  - `HideOnPDF`: PDF生成時に非表示にするラッパー
  - `ShowOnPDF`: PDF生成時のみ表示するラッパー

#### 実装例

- `src/app/(USER)/estimate-pdf-sample/page.tsx`
  - PDF機能を実装した見積もりページの完全な例

## 📖 使い方

### 基本的な使用例

```tsx
import { PDFDownloadButton } from "@/components/PDFDownloadButton";
import { HideOnPDF, ShowOnPDF } from "@/components/HideOnPDF";

export default function MyPage() {
  return (
    <div>
      {/* PDFに含めたくない要素 */}
      <HideOnPDF>
        <button>編集</button>
        <button>削除</button>
      </HideOnPDF>

      {/* PDFに変換する部分 */}
      <div id="pdf-content">
        <h1>見積書</h1>

        {/* PDF専用の要素 */}
        <ShowOnPDF>
          <p>発行日: {new Date().toLocaleDateString()}</p>
        </ShowOnPDF>

        <div>
          {/* 内容 */}
        </div>
      </div>

      {/* PDFダウンロードボタン */}
      <HideOnPDF>
        <PDFDownloadButton
          targetId="pdf-content"
          fileName="見積書_2024"
        />
      </HideOnPDF>
    </div>
  );
}
```

### カスタマイズ例

#### 横向きPDFで保存

```tsx
<PDFDownloadButton
  targetId="pdf-content"
  fileName="見積書_横向き"
  orientation="landscape"
/>
```

#### 高画質で保存

```tsx
import { generatePDF } from "@/utils/pdfGenerator";

const handleDownload = async () => {
  await generatePDF("pdf-content", "見積書_高画質", {
    scale: 3, // デフォルトは2
    orientation: "portrait"
  });
};
```

#### 条件付きで要素を非表示

```tsx
import { useProjectStore } from "@/store/useProjectStore";

function MyComponent() {
  const isGeneratingPDF = useProjectStore((state) => state.isGeneratingPDF);

  return (
    <div>
      {!isGeneratingPDF && <button>編集</button>}

      {/* または */}

      <button className={isGeneratingPDF ? "hidden" : ""}>
        編集
      </button>
    </div>
  );
}
```

## 🎨 CSSでの制御

Tailwind CSSを使用している場合、print専用のスタイルも使えます：

```tsx
<div className="print:hidden">
  {/* 印刷時には非表示 */}
</div>

<div className="hidden print:block">
  {/* 印刷時のみ表示 */}
</div>
```

## ⚡ パフォーマンス最適化

### 動的インポート

`pdfGenerator.ts`では、html2canvasとjsPDFを動的インポートしています。
これにより、PDF機能を使わないページでのバンドルサイズを削減できます。

### レンダリング待機

PDF生成時には300msの待機時間を設けて、DOMの更新を待ちます。
必要に応じて調整してください：

```typescript
// pdfGenerator.tsで調整可能
await new Promise((resolve) => setTimeout(resolve, 300)); // 300ms → 任意の値
```

## 📋 チェックリスト

- [ ] パッケージをインストール済み（`html2canvas`, `jspdf`）
- [ ] PDF化したい要素に`id`属性を設定済み
- [ ] PDFに含めたくない要素を`<HideOnPDF>`でラップ済み
- [ ] `PDFDownloadButton`を配置済み
- [ ] テストして正しくPDF生成されることを確認済み

## 🐛 トラブルシューティング

### PDF生成時に要素が切れる

- `scale`オプションを調整してください
- 要素のサイズがA4に収まるように調整してください

### PDFに不要な要素が含まれる

- `<HideOnPDF>`で正しくラップされているか確認
- `isGeneratingPDF`状態が正しく反映されているか確認

### 画像がPDFに表示されない

- `useCORS: true`が設定されているか確認
- 画像のCORS設定を確認

## 📚 参考リンク

- [html2canvas documentation](https://html2canvas.hertzen.com/)
- [jsPDF documentation](https://github.com/parallax/jsPDF)
