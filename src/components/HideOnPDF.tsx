"use client";

import { useProjectStore } from "@/store/useProjectStore";

/**
 * PDF生成時に子要素を非表示にするコンポーネント
 *
 * @description
 * `isGeneratingPDF` が true の時に子要素を非表示にします。
 * ボタンやフォームなど、PDFに含めたくない要素をラップして使用します。
 *
 * @component
 * @param {Object} props - コンポーネントのプロパティ
 * @param {React.ReactNode} props.children - 非表示にする要素
 * @param {string} [props.className] - 追加のCSSクラス
 *
 * @example
 * ```tsx
 * <HideOnPDF>
 *   <button>編集</button>
 *   <button>削除</button>
 * </HideOnPDF>
 * ```
 */
interface HideOnPDFProps {
    children: React.ReactNode;
    className?: string;
}

export function HideOnPDF({ children, className = "" }: HideOnPDFProps) {
    const isGeneratingPDF = useProjectStore((state) => state.isGeneratingPDF);

    if (isGeneratingPDF) {
        return null;
    }

    return <div className={className}>{children}</div>;
}

/**
 * PDF生成時のみ子要素を表示するコンポーネント
 *
 * @description
 * `isGeneratingPDF` が true の時のみ子要素を表示します。
 * PDF専用のヘッダーやフッターなどに使用します。
 *
 * @component
 * @param {Object} props - コンポーネントのプロパティ
 * @param {React.ReactNode} props.children - 表示する要素
 * @param {string} [props.className] - 追加のCSSクラス
 *
 * @example
 * ```tsx
 * <ShowOnPDF>
 *   <div className="text-sm text-gray-500">
 *     発行日: {new Date().toLocaleDateString()}
 *   </div>
 * </ShowOnPDF>
 * ```
 */
interface ShowOnPDFProps {
    children: React.ReactNode;
    className?: string;
}

export function ShowOnPDF({ children, className = "" }: ShowOnPDFProps) {
    const isGeneratingPDF = useProjectStore((state) => state.isGeneratingPDF);

    if (!isGeneratingPDF) {
        return null;
    }

    return <div className={className}>{children}</div>;
}
