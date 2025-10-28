"use client";

import { useEffect } from "react";
import { subscribeToUserInputChangesWithDebounce } from "@/store/projectStoreSubscriber";
import { useProjectStore } from "@/store/useProjectStore";
import { calculateAmount } from "@/actions/calculateAmount";

/**
 * プロジェクトストアのグローバル監視を行うクライアントコンポーネント
 *
 * @description
 * アプリケーション全体でユーザー入力（4つの値）を監視し、変更があった際に
 * 自動的にServer Actionを呼び出して金額を計算するプロバイダーコンポーネントです。
 *
 * ## 主な機能
 * 1. **グローバル監視**: ユーザー入力の4つの値（防火地域等、階数、スパン、奥行き）を監視
 * 2. **デバウンス**: 入力後500ms待機してから処理を実行（連続入力時の無駄な処理を防止）
 * 3. **バリデーション**: 全ての必須項目が入力されている場合のみServer Actionを呼び出し
 * 4. **自動金額更新**: Server Actionの結果を自動的にストアに保存
 * 5. **エラーハンドリング**: エラー時は金額を0にリセット
 *
 * ## 動作フロー
 * 1. コンポーネントマウント時に監視を開始
 * 2. ユーザーが入力値を変更
 * 3. 500ms待機（デバウンス）
 * 4. 必須項目が全て入力されているかチェック
 * 5. Server Action（calculateAmount）を呼び出し
 * 6. 計算結果をストアに保存
 * 7. コンソールに結果をログ出力
 *
 * ## 使用方法
 * layout.tsxで読み込むことで、アプリケーション全体で自動的に動作します。
 * このコンポーネント自体は何もレンダリングしません（null を返す）。
 *
 * ## Server Componentのレイアウトとの統合
 * layout.tsxはServer Componentのままでも、このクライアントコンポーネントを
 * 子として配置することで、グローバル監視を実現できます。
 *
 * @component
 * @returns {null} 何もレンダリングしない（副作用のみ）
 *
 * @example
 * ```tsx
 * // src/app/layout.tsx
 * import { ProjectStoreProvider } from "@/components/ProjectStoreProvider";
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="ja">
 *       <body>
 *         <ProjectStoreProvider />
 *         {children}
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 *
 * ## カスタマイズ
 * デバウンス時間やバリデーションロジックを変更したい場合は、
 * このファイルを直接編集してください。
 *
 * ### デバウンス時間の変更例
 * ```tsx
 * // 500ms → 1000ms に変更
 * const unsubscribe = subscribeToUserInputChangesWithDebounce(
 *   async (data) => { ... },
 *   1000 // ← ここを変更
 * );
 * ```
 *
 * ### バリデーションロジックの変更例
 * ```tsx
 * // 防火地域等を必須から任意に変更
 * const isValid =
 *   // data.firePreventionArea && // ← コメントアウト
 *   data.floors > 0 &&
 *   data.span > 0 &&
 *   data.depth > 0;
 * ```
 *
 * @see {@link subscribeToUserInputChangesWithDebounce} - 使用しているグローバル監視関数
 * @see {@link calculateAmount} - 呼び出されるServer Action
 * @see {@link useProjectStore} - 金額を保存するストア
 */
export function ProjectStoreProvider() {
    useEffect(() => {
        console.log("ProjectStoreProvider: 監視を開始します");

        // ユーザー入力（4つの値）を監視
        const unsubscribe = subscribeToUserInputChangesWithDebounce(
            async (data) => {
                console.log("ユーザー入力が変更されました:", data);

                // 全ての必須項目が入力されているかチェック（オプション）
                const isValid =
                    data.firePreventionArea &&
                    data.floors > 0 &&
                    data.span > 0 &&
                    data.depth > 0;

                if (!isValid) {
                    console.log(
                        "必須項目が未入力のため、Server Actionを呼び出しません"
                    );
                    return;
                }

                // Server Actionを呼び出して金額を計算
                try {
                    const result = await calculateAmount(data);

                    if (!result.success) {
                        throw new Error("金額の計算に失敗しました");
                    }

                    // 金額を更新
                    useProjectStore.getState().setAmount(result.amount);
                    console.log(
                        "金額を更新しました:",
                        result.amount,
                        "計算時刻:",
                        result.calculatedAt
                    );
                } catch (error) {
                    console.error("金額の計算に失敗:", error);
                    // エラー時は金額を0にリセット（オプション）
                    useProjectStore.getState().setAmount(0);
                }
            },
            500 // 500msのデバウンス
        );

        // クリーンアップ
        return () => {
            console.log("ProjectStoreProvider: 監視を停止します");
            unsubscribe();
        };
    }, []);

    // このコンポーネントは何もレンダリングしない
    return null;
}
