"use server";

/**
 * プロジェクトの概算金額を計算するServer Action
 *
 * @description
 * ユーザー入力の4つの値（防火地域等、階数、スパン、奥行き）を受け取り、
 * サーバーサイドで金額を計算して結果を返します。
 * "use server" ディレクティブにより、この関数はサーバー側でのみ実行されます。
 *
 * ## 現在の実装
 * 仮の計算として、入力値を文字列結合して数値に変換しています。
 * 実際のプロジェクトでは、ここに実際の見積もりロジックを実装してください。
 *
 * ## 実装例
 * ```typescript
 * // 実際の計算ロジック例
 * const basePrice = 100000; // 基本単価
 * const area = data.span * data.depth; // 建築面積
 * const floorMultiplier = data.floors * 1.2; // 階数による係数
 * const firePreventionMultiplier = data.firePreventionArea === "防火地域" ? 1.3 : 1.0;
 * const amount = Math.round(basePrice * area * floorMultiplier * firePreventionMultiplier);
 * ```
 *
 * ## 呼び出し元
 * - {@link ProjectStoreProvider}: ユーザー入力が変更されると自動的に呼び出される
 * - 各コンポーネント: 手動で呼び出すことも可能
 *
 * ## エラーハンドリング
 * try-catchでエラーをキャッチし、失敗時は success: false を返します。
 * 呼び出し側でエラーハンドリングを行う必要があります。
 *
 * @param {Object} data - プロジェクト情報
 * @param {string} data.firePreventionArea - 防火地域等の区分（例: "防火地域", "準防火地域"）
 * @param {number} data.floors - 階数（1以上の整数）
 * @param {number} data.span - 短手方向の長さ [m]（0以上）
 * @param {number} data.depth - 長手方向の長さ [m]（0以上）
 * @returns {Promise<Object>} 計算結果
 * @returns {boolean} return.success - 計算が成功したかどうか
 * @returns {number} return.amount - 計算された金額（円単位）。失敗時は -1
 * @returns {string} return.calculatedAt - 計算実行時刻（ISO 8601形式）
 *
 * @example
 * ```tsx
 * // 基本的な使用例
 * import { calculateAmount } from '@/actions/calculateAmount';
 *
 * const result = await calculateAmount({
 *   firePreventionArea: "防火地域",
 *   floors: 3,
 *   span: 10.5,
 *   depth: 15.0
 * });
 *
 * if (result.success) {
 *   console.log('金額:', result.amount);
 *   console.log('計算時刻:', result.calculatedAt);
 * } else {
 *   console.error('計算に失敗しました');
 * }
 * ```
 *
 * @example
 * ```tsx
 * // コンポーネント内での使用例
 * import { calculateAmount } from '@/actions/calculateAmount';
 * import { useProjectStore } from '@/store/useProjectStore';
 * import { useState } from 'react';
 *
 * function MyComponent() {
 *   const [isCalculating, setIsCalculating] = useState(false);
 *
 *   const handleCalculate = async () => {
 *     setIsCalculating(true);
 *     try {
 *       const data = {
 *         firePreventionArea: "防火地域",
 *         floors: 3,
 *         span: 10.5,
 *         depth: 15.0
 *       };
 *
 *       const result = await calculateAmount(data);
 *
 *       if (result.success) {
 *         useProjectStore.getState().setAmount(result.amount);
 *         alert(`金額: ${result.amount.toLocaleString()}円`);
 *       } else {
 *         alert('計算に失敗しました');
 *       }
 *     } catch (error) {
 *       console.error('エラー:', error);
 *     } finally {
 *       setIsCalculating(false);
 *     }
 *   };
 *
 *   return (
 *     <button onClick={handleCalculate} disabled={isCalculating}>
 *       {isCalculating ? '計算中...' : '金額を計算'}
 *     </button>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // エラーハンドリングの例
 * import { calculateAmount } from '@/actions/calculateAmount';
 *
 * try {
 *   const result = await calculateAmount(data);
 *
 *   if (!result.success) {
 *     throw new Error('計算に失敗しました');
 *   }
 *
 *   console.log('計算成功:', result.amount);
 * } catch (error) {
 *   console.error('エラー発生:', error);
 *   // エラー通知やログ記録などの処理
 * }
 * ```
 *
 * ## パフォーマンス考慮事項
 * - サーバー側で実行されるため、クライアント側の負荷はありません
 * - 100msの遅延を含めて実行時間をシミュレート（本番環境では削除推奨）
 * - デバウンス機能により、連続呼び出しが抑制されます（ProjectStoreProvider経由の場合）
 *
 * @see {@link ProjectStoreProvider} - 自動的にこの関数を呼び出すプロバイダー
 * @see {@link useProjectStore} - 計算結果を保存するストア
 * @see {@link subscribeToUserInputChangesWithDebounce} - デバウンス機能を提供する監視関数
 */
export async function calculateAmount(data: {
    firePreventionArea: string;
    floors: number;
    span: number;
    depth: number;
}) {
    try {
        console.log("Server Action: 金額を計算中...", data);

        // ここで実際の計算ロジックを実装
        // 今は仮に12345を返す
        const amount = Number(
            (12345).toString() +
                data.floors.toString() +
                data.span.toString() +
                data.depth.toString()
        );

        // 実際の計算例（必要に応じてコメント解除して使用）:
        // const basePrice = 100000;
        // const areaMultiplier = data.span * data.depth;
        // const floorMultiplier = data.floors * 1.2;
        // const firePreventionMultiplier = data.firePreventionArea === "防火地域" ? 1.3 : 1.0;
        // const amount = Math.round(basePrice * areaMultiplier * floorMultiplier * firePreventionMultiplier);

        // サーバー側の処理を模擬（必要に応じて）
        await new Promise((resolve) => setTimeout(resolve, 100));

        return {
            success: true,
            amount,
            calculatedAt: new Date().toISOString(),
        };
    } catch (error) {
        console.error("金額の計算に失敗:", error);
        return {
            success: false,
            amount: -1,
            calculatedAt: new Date().toISOString(),
        };
    }
}
