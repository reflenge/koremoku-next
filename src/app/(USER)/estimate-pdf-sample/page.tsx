"use client";

import { useProjectStore } from "@/store/useProjectStore";
import { PDFDownloadButton } from "@/components/PDFDownloadButton";
import { HideOnPDF, ShowOnPDF } from "@/components/HideOnPDF";

/**
 * PDF機能付き見積もりページの実装例
 */
export default function EstimatePDFPage() {
    const amount = useProjectStore((state) => state.amount);
    const firePreventionArea = useProjectStore(
        (state) => state.firePreventionArea
    );
    const floors = useProjectStore((state) => state.floors);
    const span = useProjectStore((state) => state.span);
    const depth = useProjectStore((state) => state.depth);

    const setFirePreventionArea = useProjectStore(
        (state) => state.setFirePreventionArea
    );
    const setFloors = useProjectStore((state) => state.setFloors);
    const setSpan = useProjectStore((state) => state.setSpan);
    const setDepth = useProjectStore((state) => state.setDepth);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* ヘッダー部分（PDFには含まれない） */}
                <HideOnPDF>
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold mb-2">
                            概算見積もり（PDF機能付き）
                        </h1>
                        <p className="text-gray-600">
                            入力後、PDFボタンで見積書をダウンロードできます
                        </p>
                    </div>
                </HideOnPDF>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 入力フォーム（PDFには含まれない） */}
                    <HideOnPDF>
                        <div className="bg-white rounded-lg shadow p-6 space-y-6">
                            <h2 className="text-xl font-semibold">
                                プロジェクト情報入力
                            </h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    防火地域等
                                </label>
                                <select
                                    value={firePreventionArea}
                                    onChange={(e) =>
                                        setFirePreventionArea(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                >
                                    <option value="">選択してください</option>
                                    <option value="防火地域">防火地域</option>
                                    <option value="準防火地域">
                                        準防火地域
                                    </option>
                                    <option value="22条地域">22条地域</option>
                                    <option value="指定なし">指定なし</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    階数
                                </label>
                                <input
                                    type="number"
                                    value={floors || ""}
                                    onChange={(e) =>
                                        setFloors(Number(e.target.value))
                                    }
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    min="1"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    短手方向（スパン）[m]
                                </label>
                                <input
                                    type="number"
                                    value={span || ""}
                                    onChange={(e) =>
                                        setSpan(Number(e.target.value))
                                    }
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    step="0.1"
                                    min="0"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    長手方向（奥行き）[m]
                                </label>
                                <input
                                    type="number"
                                    value={depth || ""}
                                    onChange={(e) =>
                                        setDepth(Number(e.target.value))
                                    }
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    step="0.1"
                                    min="0"
                                />
                            </div>

                            {/* PDFダウンロードボタン */}
                            <div className="flex gap-3 pt-4 border-t">
                                <PDFDownloadButton
                                    targetId="estimate-content"
                                    fileName={`見積書_${new Date()
                                        .toLocaleDateString("ja-JP")
                                        .replace(/\//g, "-")}`}
                                    className="flex-1"
                                />
                            </div>
                        </div>
                    </HideOnPDF>

                    {/* 見積書表示部分（PDFに含まれる） */}
                    <div
                        id="estimate-content"
                        className="bg-white rounded-lg shadow p-8"
                    >
                        {/* PDF専用ヘッダー */}
                        <ShowOnPDF>
                            <div className="mb-6 pb-4 border-b">
                                <h1 className="text-2xl font-bold text-center">
                                    概算見積書
                                </h1>
                                <p className="text-sm text-gray-500 text-center mt-2">
                                    発行日:{" "}
                                    {new Date().toLocaleDateString("ja-JP")}
                                </p>
                            </div>
                        </ShowOnPDF>

                        {/* 通常表示用ヘッダー */}
                        <HideOnPDF>
                            <h2 className="text-xl font-semibold mb-4">
                                見積書
                            </h2>
                        </HideOnPDF>

                        {/* 金額表示 */}
                        <div className="mb-6 p-6 bg-blue-50 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">
                                概算金額
                            </p>
                            <p className="text-3xl font-bold text-blue-600">
                                ¥{amount.toLocaleString()}
                            </p>
                        </div>

                        {/* プロジェクト詳細 */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-700 border-b pb-2">
                                プロジェクト詳細
                            </h3>

                            <dl className="space-y-3">
                                <div className="flex justify-between py-2 border-b">
                                    <dt className="text-gray-600">
                                        防火地域等
                                    </dt>
                                    <dd className="font-medium">
                                        {firePreventionArea || "未指定"}
                                    </dd>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                    <dt className="text-gray-600">階数</dt>
                                    <dd className="font-medium">
                                        {floors > 0
                                            ? `${floors}階建て`
                                            : "未指定"}
                                    </dd>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                    <dt className="text-gray-600">
                                        短手方向（スパン）
                                    </dt>
                                    <dd className="font-medium">
                                        {span > 0 ? `${span}m` : "未指定"}
                                    </dd>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                    <dt className="text-gray-600">
                                        長手方向（奥行き）
                                    </dt>
                                    <dd className="font-medium">
                                        {depth > 0 ? `${depth}m` : "未指定"}
                                    </dd>
                                </div>
                                {span > 0 && depth > 0 && (
                                    <div className="flex justify-between py-2 pt-4 border-t-2 border-blue-200">
                                        <dt className="font-semibold text-blue-700">
                                            建築面積
                                        </dt>
                                        <dd className="font-bold text-blue-700">
                                            {(span * depth).toFixed(2)}㎡
                                        </dd>
                                    </div>
                                )}
                            </dl>
                        </div>

                        {/* PDF専用フッター */}
                        <ShowOnPDF>
                            <div className="mt-8 pt-4 border-t text-sm text-gray-500">
                                <p>
                                    ※
                                    この見積書は概算です。詳細はお問い合わせください。
                                </p>
                                <p className="mt-2">株式会社コレモク</p>
                            </div>
                        </ShowOnPDF>
                    </div>
                </div>

                {/* 説明（PDFには含まれない） */}
                <HideOnPDF>
                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-blue-800 mb-2">
                            💡 PDF機能について
                        </h3>
                        <ul className="text-sm text-blue-700 space-y-1">
                            <li>
                                •
                                「PDFダウンロード」ボタンで見積書をPDF保存できます
                            </li>
                            <li>
                                •
                                PDF生成時は入力フォームやボタンが自動的に非表示になります
                            </li>
                            <li>• 右側の見積書部分のみがPDFに含まれます</li>
                        </ul>
                    </div>
                </HideOnPDF>
            </div>
        </div>
    );
}
