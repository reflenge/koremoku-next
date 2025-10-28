import { useProjectStore } from "@/store/useProjectStore";

/**
 * PDF生成用のユーティリティ関数群
 *
 * @description
 * 画面をPDFとしてダウンロードするための関数を提供します。
 * html2canvas と jsPDF ライブラリを使用します。
 *
 * ## 必要なパッケージ
 * ```bash
 * pnpm add html2canvas jspdf
 * pnpm add -D @types/html2canvas
 * ```
 */

/**
 * 指定した要素をPDFとしてダウンロードする関数
 *
 * @description
 * DOM要素をキャプチャしてPDFファイルとして保存します。
 * PDF生成中は自動的に `nowPDF` フラグを true にして、不要な要素を非表示にします。
 *
 * ## 処理フロー
 * 1. `nowPDF` を true に設定（不要な要素が非表示になる）
 * 2. 少し待機してレンダリングを待つ
 * 3. html2canvasで要素をキャプチャ
 * 4. jsPDFでPDFを生成
 * 5. PDFをダウンロード
 * 6. `nowPDF` を false に戻す
 *
 * @param {string} elementId - キャプチャする要素のID
 * @param {string} fileName - 保存するPDFファイル名（拡張子なし）
 * @param {Object} [options] - オプション設定
 * @param {number} [options.scale=2] - キャプチャの解像度（大きいほど高画質）
 * @param {"portrait" | "landscape"} [options.orientation="portrait"] - PDF方向
 * @returns {Promise<void>}
 *
 * @example
 * ```tsx
 * import { generatePDF } from '@/utils/pdfGenerator';
 *
 * const handleDownload = async () => {
 *   await generatePDF('estimate-content', '見積書_2024');
 * };
 * ```
 *
 * @example
 * ```tsx
 * // 横向きPDFで高画質に保存
 * await generatePDF('estimate-content', '見積書_2024', {
 *   scale: 3,
 *   orientation: 'landscape'
 * });
 * ```
 */
export async function generatePDF(
    elementId: string,
    fileName: string,
    options: {
        scale?: number;
        orientation?: "portrait" | "landscape";
    } = {}
): Promise<void> {
    const { scale = 2, orientation = "portrait" } = options;

    try {
        // PDF生成モードに切り替え（不要な要素を非表示）
        useProjectStore.getState().setIsGeneratingPDF(true);

        // レンダリングを待つ
        await new Promise((resolve) => setTimeout(resolve, 300));

        // 動的インポート（ビルドサイズ削減のため）
        const html2canvas = (await import("html2canvas-pro")).default;
        const { jsPDF } = await import("jspdf");

        const element = document.getElementById(elementId);
        if (!element) {
            throw new Error(`Element with id "${elementId}" not found`);
        }

        // 要素をキャプチャ
        const canvas = await html2canvas(element, {
            scale,
            useCORS: true,
            logging: false,
            backgroundColor: "#ffffff",
        });

        // PDFを生成
        const imgWidth = orientation === "portrait" ? 210 : 297; // A4サイズ (mm)
        const imgHeight = orientation === "portrait" ? 297 : 210;

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
            orientation,
            unit: "mm",
            format: "a4",
        });

        const aspectRatio = canvas.height / canvas.width;
        const pdfWidth = imgWidth;
        const pdfHeight = imgWidth * aspectRatio;

        // ページに収まらない場合は複数ページに分割
        if (pdfHeight > imgHeight) {
            let heightLeft = pdfHeight;
            let position = 0;

            // 最初のページ
            pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
            heightLeft -= imgHeight;

            // 追加ページ
            while (heightLeft > 0) {
                position = heightLeft - pdfHeight;
                pdf.addPage();
                pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
                heightLeft -= imgHeight;
            }
        } else {
            // 1ページに収まる場合
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        }

        // PDFをダウンロード
        pdf.save(`${fileName}.pdf`);

        console.log(`PDF "${fileName}.pdf" をダウンロードしました`);
    } catch (error) {
        console.error("PDF生成エラー:", error);
        alert("PDFの生成に失敗しました。");
        throw error;
    } finally {
        // 通常モードに戻す
        useProjectStore.getState().setIsGeneratingPDF(false);
    }
}
