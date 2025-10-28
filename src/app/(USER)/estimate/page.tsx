"use client";

import { useProjectStore } from "@/store/useProjectStore";
import { calculateAmount } from "@/actions/calculateAmount";
import { useState } from "react";

const Page = () => {
    // Zustandストアから値と更新関数を取得
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

    const [isManualCalculating, setIsManualCalculating] = useState(false);

    // 手動で金額を計算する関数
    const handleManualCalculate = async () => {
        setIsManualCalculating(true);
        try {
            const data = {
                firePreventionArea,
                floors,
                span,
                depth,
            };

            const result = await calculateAmount(data);

            if (result.success) {
                useProjectStore.getState().setAmount(result.amount);
                alert(
                    `金額を計算しました: ${result.amount.toLocaleString()}円`
                );
            } else {
                alert("金額の計算に失敗しました");
            }
        } catch (error) {
            console.error("計算エラー:", error);
            alert("金額の計算中にエラーが発生しました");
        } finally {
            setIsManualCalculating(false);
        }
    };

    return (
        <div className="bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-2">概算見積もり</h1>
                <p className="text-gray-600 mb-8">
                    プロジェクト情報を入力すると、自動的に金額が計算されます（500ms後）
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 入力フォーム */}
                    <div className="bg-white rounded-lg shadow p-6 space-y-6">
                        <h2 className="text-xl font-semibold mb-4">
                            プロジェクト情報
                        </h2>

                        {/* 防火地域等 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                防火地域等
                            </label>
                            <select
                                value={firePreventionArea}
                                onChange={(e) =>
                                    setFirePreventionArea(e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">選択してください</option>
                                <option value="防火地域">防火地域</option>
                                <option value="準防火地域">準防火地域</option>
                                <option value="22条地域">22条地域</option>
                                <option value="指定なし">指定なし</option>
                            </select>
                        </div>

                        {/* 階数 */}
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
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="例: 3"
                                min="1"
                            />
                        </div>

                        {/* 短手方向（スパン） */}
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
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="例: 10.5"
                                step="0.1"
                                min="0"
                            />
                        </div>

                        {/* 長手方向（奥行き） */}
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
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="例: 15.0"
                                step="0.1"
                                min="0"
                            />
                        </div>

                        {/* 手動計算ボタン */}
                        <button
                            type="button"
                            onClick={handleManualCalculate}
                            disabled={isManualCalculating}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                            {isManualCalculating ? "計算中..." : "手動で再計算"}
                        </button>
                    </div>

                    {/* 計算結果 */}
                    <div className="space-y-6">
                        {/* 金額表示 */}
                        <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
                            <h2 className="text-lg font-medium mb-2 opacity-90">
                                概算金額
                            </h2>
                            <p className="text-4xl font-bold">
                                {amount.toLocaleString()}
                                <span className="text-xl ml-2">円</span>
                            </p>
                        </div>

                        {/* 入力値の確認 */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold mb-4">
                                入力内容の確認
                            </h2>
                            <dl className="space-y-3">
                                <div className="flex justify-between border-b pb-2">
                                    <dt className="text-gray-600">
                                        防火地域等
                                    </dt>
                                    <dd className="font-medium">
                                        {firePreventionArea || "未入力"}
                                    </dd>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <dt className="text-gray-600">階数</dt>
                                    <dd className="font-medium">
                                        {floors > 0
                                            ? `${floors}階建て`
                                            : "未入力"}
                                    </dd>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <dt className="text-gray-600">
                                        短手方向（スパン）
                                    </dt>
                                    <dd className="font-medium">
                                        {span > 0 ? `${span}m` : "未入力"}
                                    </dd>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <dt className="text-gray-600">
                                        長手方向（奥行き）
                                    </dt>
                                    <dd className="font-medium">
                                        {depth > 0 ? `${depth}m` : "未入力"}
                                    </dd>
                                </div>
                                {span > 0 && depth > 0 && (
                                    <div className="flex justify-between pt-2 text-blue-600">
                                        <dt className="font-medium">
                                            建築面積
                                        </dt>
                                        <dd className="font-bold">
                                            {(span * depth).toFixed(2)}㎡
                                        </dd>
                                    </div>
                                )}
                            </dl>
                        </div>

                        {/* 説明 */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <h3 className="text-sm font-semibold text-yellow-800 mb-2">
                                💡 自動計算について
                            </h3>
                            <p className="text-sm text-yellow-700">
                                入力値を変更すると、500ms後に自動的にServer
                                Actionが呼び出され、金額が再計算されます。手動で再計算したい場合は「手動で再計算」ボタンをクリックしてください。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
