import { create } from "zustand";

/**
 * プロジェクト情報を管理するZustandストアの状態型定義
 *
 * @interface ProjectState
 * @description
 * プロジェクトの見積もりに必要な情報を一元管理します。
 * - 金額: Server Actionから取得した計算結果を保持
 * - ユーザー入力: 4つの項目（防火地域等、階数、スパン、奥行き）をユーザーが入力
 *
 * @example
 * ```tsx
 * // ストアから値を取得
 * const amount = useProjectStore((state) => state.amount);
 *
 * // 値を更新
 * const setFloors = useProjectStore((state) => state.setFloors);
 * setFloors(3);
 * ```
 */
interface ProjectState {
    /**
     * 金額（円単位）
     * @description
     * Server Actionによって計算された見積もり金額。
     * ユーザーが4つの入力値を変更すると、自動的に再計算されて更新されます。
     * @type {number}
     * @default 0
     */
    amount: number;

    /**
     * 防火地域等の区分
     * @description
     * 建築基準法に基づく防火地域等の指定区分。
     * 例: "防火地域", "準防火地域", "22条地域", "指定なし"
     * @type {string}
     * @default ""
     */
    firePreventionArea: string;

    /**
     * 階数
     * @description
     * 建物の階数。地上階のみを想定。
     * @type {number}
     * @default 1
     * @minimum 1
     */
    floors: number;

    /**
     * 短手方向（スパン）[m]
     * @description
     * 建物の短手方向の長さ（メートル単位）。
     * 建築面積の計算に使用されます（スパン × 奥行き）。
     * @type {number}
     * @default 0
     * @minimum 0
     */
    span: number;

    /**
     * 長手方向（奥行き）[m]
     * @description
     * 建物の長手方向の長さ（メートル単位）。
     * 建築面積の計算に使用されます（スパン × 奥行き）。
     * @type {number}
     * @default 0
     * @minimum 0
     */
    depth: number;

    /**
     * PDF生成中フラグ
     * @description
     * PDF生成中かどうかを示すフラグ。
     * trueの場合、UI要素（ボタン、入力フォームなど）を非表示にすることで、
     * PDF出力用のクリーンな表示を実現します。
     *
     * ## 使用目的
     * - PDF生成時に不要なUI要素を隠す
     * - 印刷用のレイアウトに切り替える
     * - インタラクティブな要素を非表示にする
     *
     * ## 隠すべき要素の例
     * - ボタン（保存、計算、編集など）
     * - 入力フォーム
     * - ナビゲーションバー
     * - サイドバー
     * - ツールチップ
     * - ホバー効果
     *
     * @type {boolean}
     * @default false
     */
    isGeneratingPDF: boolean;

    /**
     * 金額を更新する関数
     * @description
     * Server Actionから取得した計算結果を設定する際に使用します。
     * 通常はProjectStoreProviderによって自動的に呼び出されます。
     * @param {number} amount - 更新する金額（円単位）
     * @returns {void}
     * @example
     * ```tsx
     * useProjectStore.getState().setAmount(1234567);
     * ```
     */
    setAmount: (amount: number) => void;

    /**
     * 防火地域等を更新する関数
     * @description
     * ユーザー入力により防火地域等の区分を更新します。
     * 更新後、500ms後に自動的にServer Actionが呼び出され金額が再計算されます。
     * @param {string} area - 防火地域等の区分
     * @returns {void}
     * @example
     * ```tsx
     * const setFirePreventionArea = useProjectStore((state) => state.setFirePreventionArea);
     * setFirePreventionArea("防火地域");
     * ```
     */
    setFirePreventionArea: (area: string) => void;

    /**
     * 階数を更新する関数
     * @description
     * ユーザー入力により階数を更新します。
     * 更新後、500ms後に自動的にServer Actionが呼び出され金額が再計算されます。
     * @param {number} floors - 階数（1以上の整数）
     * @returns {void}
     * @example
     * ```tsx
     * const setFloors = useProjectStore((state) => state.setFloors);
     * setFloors(3);
     * ```
     */
    setFloors: (floors: number) => void;

    /**
     * 短手方向（スパン）を更新する関数
     * @description
     * ユーザー入力によりスパンを更新します。
     * 更新後、500ms後に自動的にServer Actionが呼び出され金額が再計算されます。
     * @param {number} span - 短手方向の長さ（メートル単位、0以上）
     * @returns {void}
     * @example
     * ```tsx
     * const setSpan = useProjectStore((state) => state.setSpan);
     * setSpan(10.5);
     * ```
     */
    setSpan: (span: number) => void;

    /**
     * 長手方向（奥行き）を更新する関数
     * @description
     * ユーザー入力により奥行きを更新します。
     * 更新後、500ms後に自動的にServer Actionが呼び出され金額が再計算されます。
     * @param {number} depth - 長手方向の長さ（メートル単位、0以上）
     * @returns {void}
     * @example
     * ```tsx
     * const setDepth = useProjectStore((state) => state.setDepth);
     * setDepth(15.0);
     * ```
     */
    setDepth: (depth: number) => void;

    /**
     * ユーザー入力データを一括更新する関数
     * @description
     * 複数のユーザー入力値を一度に更新します。
     * 指定しなかった項目は変更されません（部分更新）。
     * 更新後、500ms後に自動的にServer Actionが呼び出され金額が再計算されます。
     * @param {Object} data - 更新するデータ（全てオプショナル）
     * @param {string} [data.firePreventionArea] - 防火地域等
     * @param {number} [data.floors] - 階数
     * @param {number} [data.span] - 短手方向
     * @param {number} [data.depth] - 長手方向
     * @returns {void}
     * @example
     * ```tsx
     * const setUserInputData = useProjectStore((state) => state.setUserInputData);
     * setUserInputData({
     *   firePreventionArea: "防火地域",
     *   floors: 3,
     *   span: 10.5,
     *   depth: 15.0
     * });
     * ```
     */
    setUserInputData: (data: {
        firePreventionArea?: string;
        floors?: number;
        span?: number;
        depth?: number;
    }) => void;

    /**
     * PDF生成モードを設定する関数
     * @description
     * PDF生成中かどうかのフラグを設定します。
     * trueに設定すると、条件付きレンダリングで不要なUI要素を隠すことができます。
     *
     * ## 使用フロー
     * 1. PDF生成開始前に `setIsGeneratingPDF(true)` を呼ぶ
     * 2. 不要な要素が非表示になる
     * 3. PDF生成処理を実行
     * 4. PDF生成完了後に `setIsGeneratingPDF(false)` を呼ぶ
     * 5. UI要素が再表示される
     *
     * @param {boolean} isGenerating - PDF生成中フラグ（true: PDF生成中、false: 通常表示）
     * @returns {void}
     * @example
     * ```tsx
     * // PDF生成開始
     * const setIsGeneratingPDF = useProjectStore((state) => state.setIsGeneratingPDF);
     * setIsGeneratingPDF(true);
     *
     * // PDF生成処理...
     *
     * // PDF生成完了
     * setIsGeneratingPDF(false);
     * ```
     * @example
     * ```tsx
     * // コンポーネント内での条件付きレンダリング
     * const isGeneratingPDF = useProjectStore((state) => state.isGeneratingPDF);
     *
     * return (
     *   <div>
     *     <h1>見積書</h1>
     *     {!isGeneratingPDF && (
     *       <button>編集</button> // PDF生成中は非表示
     *     )}
     *   </div>
     * );
     * ```
     */
    setIsGeneratingPDF: (isGenerating: boolean) => void;

    /**
     * 全ての状態を初期値にリセットする関数
     * @description
     * ストア内の全ての値を初期状態に戻します。
     * - amount: 0
     * - firePreventionArea: ""
     * - floors: 1
     * - span: 0
     * - depth: 0
     * - isGeneratingPDF: false
     * @returns {void}
     * @example
     * ```tsx
     * const reset = useProjectStore((state) => state.reset);
     * reset(); // 全ての値が初期化される
     * ```
     */
    reset: () => void;
}

/**
 * ストアの初期状態
 * @description
 * アプリケーション起動時およびreset()実行時に使用される初期値。
 */
const initialState = {
    amount: 0,
    firePreventionArea: "",
    floors: 1,
    span: 0,
    depth: 0,
    isGeneratingPDF: false,
};

/**
 * プロジェクト情報を管理するZustandストア
 *
 * @description
 * プロジェクトの見積もりに必要な情報（金額、防火地域等、階数、スパン、奥行き）を
 * グローバルに管理するためのZustandストアです。
 *
 * ## 主な機能
 * - **金額の自動計算**: ユーザー入力が変更されると、500ms後に自動的にServer Actionが
 *   呼び出され、金額が再計算されます（ProjectStoreProviderによって実現）
 * - **個別更新**: 各項目を個別に更新できます
 * - **一括更新**: 複数の項目を一度に更新できます
 * - **リセット**: 全ての値を初期状態に戻せます
 *
 * ## アーキテクチャ
 * - **監視**: ProjectStoreProvider（layout.tsxで読み込み）がグローバルに状態を監視
 * - **デバウンス**: 500msのデバウンスにより、連続入力時の無駄な処理を防止
 * - **バリデーション**: 全ての必須項目が入力されている場合のみServer Actionを呼び出し
 *
 * @example
 * ```tsx
 * // 基本的な使用例
 * import { useProjectStore } from '@/store/useProjectStore';
 *
 * function MyComponent() {
 *   // 値を取得（コンポーネントは自動的に再レンダリングされる）
 *   const amount = useProjectStore((state) => state.amount);
 *   const floors = useProjectStore((state) => state.floors);
 *
 *   // 更新関数を取得
 *   const setFloors = useProjectStore((state) => state.setFloors);
 *   const setSpan = useProjectStore((state) => state.setSpan);
 *
 *   return (
 *     <div>
 *       <p>金額: {amount.toLocaleString()}円</p>
 *       <input
 *         type="number"
 *         value={floors}
 *         onChange={(e) => setFloors(Number(e.target.value))}
 *       />
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // コンポーネント外から使用（getState）
 * import { useProjectStore } from '@/store/useProjectStore';
 *
 * async function someFunction() {
 *   // 現在の状態を取得
 *   const currentAmount = useProjectStore.getState().amount;
 *   const currentFloors = useProjectStore.getState().floors;
 *
 *   // 状態を更新
 *   useProjectStore.getState().setFloors(3);
 *   useProjectStore.getState().setAmount(1234567);
 * }
 * ```
 *
 * @example
 * ```tsx
 * // 一括更新
 * import { useProjectStore } from '@/store/useProjectStore';
 *
 * function MyComponent() {
 *   const setUserInputData = useProjectStore((state) => state.setUserInputData);
 *
 *   const handleSubmit = () => {
 *     setUserInputData({
 *       firePreventionArea: "防火地域",
 *       floors: 3,
 *       span: 10.5,
 *       depth: 15.0
 *     });
 *   };
 *
 *   return <button onClick={handleSubmit}>データを設定</button>;
 * }
 * ```
 *
 * @see {@link ProjectStoreProvider} - グローバル監視を行うプロバイダー
 * @see {@link calculateAmount} - 金額を計算するServer Action
 * @see {@link subscribeToUserInputChangesWithDebounce} - デバウンス付きグローバル監視関数
 */
export const useProjectStore = create<ProjectState>((set) => ({
    ...initialState,

    // 金額更新（Server Actionから）
    setAmount: (amount) => set({ amount }),

    // ユーザー入力更新
    setFirePreventionArea: (area) => set({ firePreventionArea: area }),
    setFloors: (floors) => set({ floors }),
    setSpan: (span) => set({ span }),
    setDepth: (depth) => set({ depth }),

    // ユーザー入力を一括更新
    setUserInputData: (data) => set(data),

    // PDF生成モード設定
    setIsGeneratingPDF: (isGenerating) =>
        set({ isGeneratingPDF: isGenerating }),

    // 全てリセット
    reset: () => set(initialState),
}));
