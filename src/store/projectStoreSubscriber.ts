import { useProjectStore } from "./useProjectStore";

/**
 * ユーザー入力値（4つ）を監視してグローバルに処理を実行する関数
 *
 * @description
 * Zustandのsubscribe機能を使用して、ユーザー入力の4つの値
 * （防火地域等、階数、スパン、奥行き）の変更を監視します。
 * いずれかの値が変更された場合、指定されたコールバック関数を実行します。
 *
 * ## 特徴
 * - **コンポーネント外でも動作**: React Hookではないため、どこからでも呼び出し可能
 * - **変更検知**: 4つの値のいずれかが変更された場合のみコールバックを実行
 * - **購読解除**: 返り値の関数を実行することで監視を停止できる
 * - **即座に発火**: デバウンスなしで変更があれば即座に実行される
 *
 * ## 注意点
 * - デバウンスが必要な場合は {@link subscribeToUserInputChangesWithDebounce} を使用してください
 * - 購読を解除しないとメモリリークの原因になります
 * - 初回実行時には発火しません（変更時のみ）
 *
 * @param {Function} callback - ユーザー入力が変更された時に実行されるコールバック関数
 * @param {Object} callback.data - 変更後のユーザー入力データ
 * @param {string} callback.data.firePreventionArea - 防火地域等
 * @param {number} callback.data.floors - 階数
 * @param {number} callback.data.span - 短手方向（スパン）
 * @param {number} callback.data.depth - 長手方向（奥行き）
 * @returns {Function} 購読を解除する関数。実行すると監視が停止されます。
 *
 * @example
 * ```tsx
 * // 基本的な使用例
 * const unsubscribe = subscribeToUserInputChanges((data) => {
 *   console.log('ユーザー入力が変更されました:', data);
 *   console.log('防火地域等:', data.firePreventionArea);
 *   console.log('階数:', data.floors);
 * });
 *
 * // 監視を停止する場合
 * unsubscribe();
 * ```
 *
 * @example
 * ```tsx
 * // アプリ起動時にグローバル監視を開始
 * // (例: layout.tsx や _app.tsx のuseEffect内)
 * import { subscribeToUserInputChanges } from '@/store/projectStoreSubscriber';
 * import { useProjectStore } from '@/store/useProjectStore';
 *
 * useEffect(() => {
 *   const unsubscribe = subscribeToUserInputChanges(async (data) => {
 *     // APIを呼び出す
 *     const response = await fetch('/api/calculate', {
 *       method: 'POST',
 *       body: JSON.stringify(data)
 *     });
 *     const result = await response.json();
 *     useProjectStore.getState().setAmount(result.amount);
 *   });
 *
 *   return () => unsubscribe(); // クリーンアップ
 * }, []);
 * ```
 *
 * @see {@link subscribeToUserInputChangesWithDebounce} - デバウンス付きの監視関数
 * @see {@link ProjectStoreProvider} - この関数を使用しているプロバイダー
 */
export function subscribeToUserInputChanges(
    callback: (data: {
        firePreventionArea: string;
        floors: number;
        span: number;
        depth: number;
    }) => void
) {
    let previousState = {
        firePreventionArea: useProjectStore.getState().firePreventionArea,
        floors: useProjectStore.getState().floors,
        span: useProjectStore.getState().span,
        depth: useProjectStore.getState().depth,
    };

    // Zustandのsubscribeを使ってストア全体の変更を監視
    const unsubscribe = useProjectStore.subscribe((state) => {
        const currentState = {
            firePreventionArea: state.firePreventionArea,
            floors: state.floors,
            span: state.span,
            depth: state.depth,
        };

        // いずれかの値が変更されたかチェック
        const hasChanged =
            previousState.firePreventionArea !==
                currentState.firePreventionArea ||
            previousState.floors !== currentState.floors ||
            previousState.span !== currentState.span ||
            previousState.depth !== currentState.depth;

        if (hasChanged) {
            callback(currentState);
            previousState = currentState;
        }
    });

    // 購読解除関数を返す
    return unsubscribe;
}

/**
 * デバウンス付きでユーザー入力値（4つ）を監視する関数
 *
 * @description
 * {@link subscribeToUserInputChanges} にデバウンス機能を追加したバージョンです。
 * ユーザー入力が変更されてから指定時間経過後にコールバック関数を実行します。
 * 連続して入力が変更される場合、最後の変更から指定時間経過するまで待機します。
 *
 * ## ユースケース
 * - **API呼び出しの最適化**: ユーザーが入力中に何度もAPIを呼ばないようにする
 * - **パフォーマンス向上**: 頻繁な計算処理を抑制する
 * - **ユーザー体験の向上**: 入力が確定してから処理を実行することで、スムーズな操作感を実現
 *
 * ## デバウンスの動作
 * 1. ユーザーが値を変更
 * 2. タイマーを設定（例: 500ms）
 * 3. 500ms以内に再度変更があった場合、タイマーをリセット
 * 4. 500ms間変更がなければコールバックを実行
 *
 * ## 特徴
 * - **コンポーネント外でも動作**: React Hookではないため、どこからでも呼び出し可能
 * - **自動タイマー管理**: 購読解除時にタイマーも自動的にクリアされる
 * - **カスタマイズ可能**: デバウンス時間を指定できる（デフォルト: 500ms）
 *
 * ## 推奨される使い方
 * ProjectStoreProviderで使用されており、通常はこの関数を直接呼ぶ必要はありません。
 * layout.tsxでProjectStoreProviderをインポートするだけで、グローバル監視が自動的に開始されます。
 *
 * @param {Function} callback - ユーザー入力が確定した時（デバウンス後）に実行されるコールバック関数
 * @param {Object} callback.data - 変更後のユーザー入力データ
 * @param {string} callback.data.firePreventionArea - 防火地域等
 * @param {number} callback.data.floors - 階数
 * @param {number} callback.data.span - 短手方向（スパン）
 * @param {number} callback.data.depth - 長手方向（奥行き）
 * @param {number} [debounceMs=500] - デバウンス時間（ミリ秒）。デフォルトは500ms
 * @returns {Function} 購読を解除する関数。実行すると監視とタイマーが停止されます。
 *
 * @example
 * ```tsx
 * // 基本的な使用例（500msのデバウンス）
 * const unsubscribe = subscribeToUserInputChangesWithDebounce((data) => {
 *   console.log('入力が確定しました:', data);
 * }, 500);
 *
 * // 監視を停止
 * unsubscribe();
 * ```
 *
 * @example
 * ```tsx
 * // Server Actionを呼び出す例
 * import { subscribeToUserInputChangesWithDebounce } from '@/store/projectStoreSubscriber';
 * import { calculateAmount } from '@/actions/calculateAmount';
 * import { useProjectStore } from '@/store/useProjectStore';
 *
 * const unsubscribe = subscribeToUserInputChangesWithDebounce(
 *   async (data) => {
 *     // バリデーション
 *     if (!data.firePreventionArea || data.floors <= 0) {
 *       console.log('入力が不完全です');
 *       return;
 *     }
 *
 *     // Server Actionを呼び出し
 *     try {
 *       const result = await calculateAmount(data);
 *       if (result.success) {
 *         useProjectStore.getState().setAmount(result.amount);
 *         console.log('金額を更新しました:', result.amount);
 *       }
 *     } catch (error) {
 *       console.error('計算エラー:', error);
 *     }
 *   },
 *   500 // 500msのデバウンス
 * );
 * ```
 *
 * @example
 * ```tsx
 * // カスタムデバウンス時間（1秒）
 * const unsubscribe = subscribeToUserInputChangesWithDebounce((data) => {
 *   console.log('1秒後に実行:', data);
 * }, 1000);
 * ```
 *
 * @see {@link subscribeToUserInputChanges} - デバウンスなしの監視関数
 * @see {@link ProjectStoreProvider} - この関数を使用しているプロバイダー
 */
export function subscribeToUserInputChangesWithDebounce(
    callback: (data: {
        firePreventionArea: string;
        floors: number;
        span: number;
        depth: number;
    }) => void,
    debounceMs: number = 500
) {
    let debounceTimer: NodeJS.Timeout | null = null;

    const unsubscribe = subscribeToUserInputChanges((data) => {
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }
        debounceTimer = setTimeout(() => {
            callback(data);
        }, debounceMs);
    });

    // 購読解除時にタイマーもクリア
    return () => {
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }
        unsubscribe();
    };
}
