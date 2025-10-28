"use client";

import { useState } from "react";
import { generatePDF } from "@/utils/pdfGenerator";
import { useProjectStore } from "@/store/useProjectStore";

/**
 * PDFダウンロードボタンコンポーネント
 *
 * @description
 * PDF生成機能を持つボタンコンポーネント。
 * クリックすると指定された要素をPDFとしてダウンロードします。
 *
 * @component
 * @param {Object} props - コンポーネントのプロパティ
 * @param {string} props.targetId - PDFに変換する要素のID
 * @param {string} [props.fileName="document"] - ダウンロードするファイル名（拡張子なし）
 * @param {"portrait" | "landscape"} [props.orientation="portrait"] - PDF方向
 * @param {string} [props.className] - 追加のCSSクラス
 *
 * @example
 * ```tsx
 * <PDFDownloadButton
 *   targetId="estimate-content"
 *   fileName="見積書_2024"
 * />
 * ```
 */
interface PDFDownloadButtonProps {
    targetId: string;
    fileName?: string;
    orientation?: "portrait" | "landscape";
    className?: string;
}

export function PDFDownloadButton({
    targetId,
    fileName = "document",
    orientation = "portrait",
    className = "",
}: PDFDownloadButtonProps) {
    const [isGenerating, setIsGenerating] = useState(false);
    const isGeneratingPDF = useProjectStore((state) => state.isGeneratingPDF);

    const handleDownload = async () => {
        setIsGenerating(true);
        try {
            await generatePDF(targetId, fileName, { orientation });
        } catch (error) {
            console.error("PDF生成エラー:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleDownload}
            disabled={isGenerating || isGeneratingPDF}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors ${className}`}
        >
            {isGenerating ? "PDF生成中..." : "PDFダウンロード"}
        </button>
    );
}
