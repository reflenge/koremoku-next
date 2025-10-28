"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    ArrowDownIcon,
    LockClosedIcon,
    FileTextIcon,
    DiscIcon,
    CubeIcon,
    FileIcon,
    LockOpen1Icon,
    LightningBoltIcon,
    CheckIcon,
    ArrowRightIcon,
} from "@radix-ui/react-icons";

/**
 * TOPページ（ランディングページ）
 */
export default function TopPage() {
    return (
        <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
            {/* ヒーローセクション */}
            <section className="relative overflow-hidden">
                {/* 背景画像プレースホルダー */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://placehold.jp/3d4070/ffffff/1920x1080.png?text=Hero+Background+Image"
                        alt="ヒーローセクション背景画像"
                        title="ヒーローセクション背景画像（木造建築のイメージ画像）"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* オーバーレイ */}
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>
                </div>

                <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
                    <div className="text-center space-y-6">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                            これもく
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                            木造建築の概算を、
                            <br className="hidden md:block" />
                            4つの入力だけで簡単に確認
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                            <Button
                                asChild
                                size="lg"
                                className="text-lg px-8 py-6"
                            >
                                <Link href="/estimate">概算を作成する</Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="ghost"
                                className="text-base px-8 py-6 text-gray-600 hover:text-gray-900"
                            >
                                <Link href="#features">
                                    機能を見る{" "}
                                    <ArrowDownIcon className="w-4 h-4" />
                                </Link>
                            </Button>
                        </div>

                        {/* メイン画像プレースホルダー */}
                        <div className="mt-16 max-w-5xl mx-auto">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video">
                                <Image
                                    src="https://placehold.jp/2c3e50/ecf0f1/1920x1080.png?text=Application+Screen+Image"
                                    alt="アプリケーション画面のイメージ"
                                    title="これもくアプリケーションのメイン画面（概算入力と結果表示）"
                                    width={1920}
                                    height={1080}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 機能紹介セクション */}
            <section id="features" className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                        主な機能
                    </h2>
                    <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                        シンプルな操作で、高精度な概算を実現します
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* 機能1 */}
                        <Card className="border-blue-200 bg-blue-50/50 hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="mb-2">
                                    <FileTextIcon className="w-10 h-10 text-blue-600" />
                                </div>
                                <CardTitle>4つの項目を入力するだけ</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-700">
                                    防火地域等、階数、短手方向、長手方向の4つの値を選択・入力するだけで、概算金額を自動計算します。
                                </CardDescription>
                            </CardContent>
                        </Card>

                        {/* 機能2 */}
                        <Card className="border-green-200 bg-green-50/50 hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="mb-2">
                                    <DiscIcon className="w-10 h-10 text-green-600" />
                                </div>
                                <CardTitle>リアルタイムで金額表示</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-700">
                                    入力値を変更すると、自動的に概算金額が再計算されます。複雑な操作は不要です。
                                </CardDescription>
                            </CardContent>
                        </Card>

                        {/* 機能3 */}
                        <Card className="border-purple-200 bg-purple-50/50 hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="mb-2">
                                    <CubeIcon className="w-10 h-10 text-purple-600" />
                                </div>
                                <CardTitle>3Dモデルで視覚的に確認</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-700">
                                    入力した建物が3Dモデルで表示されるため、どんなものになるか一目で理解できます。
                                </CardDescription>
                            </CardContent>
                        </Card>

                        {/* 機能4 */}
                        <Card className="border-yellow-200 bg-yellow-50/50 hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="mb-2">
                                    <FileIcon className="w-10 h-10 text-yellow-600" />
                                </div>
                                <CardTitle>PDF出力機能</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-700">
                                    概算書をPDFとしてダウンロード可能。クライアントへの提案資料としてすぐに使えます。
                                </CardDescription>
                            </CardContent>
                        </Card>

                        {/* 機能5 */}
                        <Card className="border-red-200 bg-red-50/50 hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="mb-2">
                                    <LockOpen1Icon className="w-10 h-10 text-red-600" />
                                </div>
                                <CardTitle>簡単な入力だけで使える</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-700">
                                    お名前とメールアドレスだけで始められます。複雑な会員登録は不要です。
                                </CardDescription>
                            </CardContent>
                        </Card>

                        {/* 機能6 */}
                        <Card className="border-indigo-200 bg-indigo-50/50 hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="mb-2">
                                    <LightningBoltIcon className="w-10 h-10 text-indigo-600" />
                                </div>
                                <CardTitle>簡単・スピーディー</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-700">
                                    複雑な概算計算が、わずか数秒で完了。時間を大幅に短縮できます。
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <Separator className="my-0" />

            {/* 使い方セクション */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        使い方
                    </h2>

                    <div className="max-w-4xl mx-auto space-y-8">
                        {/* Step 1 */}
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent>
                                <div className="flex gap-4 items-start">
                                    <Badge
                                        variant="default"
                                        className="shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold"
                                    >
                                        1
                                    </Badge>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                                            防火地域等を選択
                                            <Badge
                                                variant="outline"
                                                className="text-xs"
                                            >
                                                必須
                                            </Badge>
                                        </h3>
                                        <p className="text-gray-600">
                                            建築予定地の防火地域の種類を選択します。
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Step 2 */}
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent>
                                <div className="flex gap-4 items-start">
                                    <Badge
                                        variant="default"
                                        className="shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold"
                                    >
                                        2
                                    </Badge>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                                            建物の規模を入力
                                            <Badge
                                                variant="outline"
                                                className="text-xs"
                                            >
                                                必須
                                            </Badge>
                                        </h3>
                                        <p className="text-gray-600">
                                            階数、短手方向（スパン）、長手方向（奥行き）を入力します。
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Step 3 */}
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent>
                                <div className="flex gap-4 items-start">
                                    <Badge
                                        variant="default"
                                        className="shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold"
                                    >
                                        3
                                    </Badge>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                                            概算金額を確認
                                            <Badge
                                                variant="secondary"
                                                className="text-xs"
                                            >
                                                自動
                                            </Badge>
                                        </h3>
                                        <p className="text-gray-600">
                                            自動的に計算された概算金額と、3Dモデルで建物のイメージを確認できます。
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Step 4 */}
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent>
                                <div className="flex gap-4 items-start">
                                    <Badge
                                        variant="default"
                                        className="shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold"
                                    >
                                        4
                                    </Badge>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                                            PDFで出力
                                            <Badge
                                                variant="outline"
                                                className="text-xs"
                                            >
                                                オプション
                                            </Badge>
                                        </h3>
                                        <p className="text-gray-600">
                                            必要に応じて、概算書をPDFとしてダウンロードできます。
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="text-center mt-12">
                        <Button asChild size="lg" className="text-lg px-8 py-6">
                            <Link href="/estimate">概算を試す</Link>
                        </Button>
                    </div>

                    {/* スクリーンショット例 */}
                    <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* 入力画面 */}
                        <Card className="overflow-hidden hover:shadow-xl transition-shadow bg-blue-50 pb-0">
                            <CardHeader className="">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">
                                        ステップ1-2: 入力画面
                                    </CardTitle>
                                    <Badge
                                        variant="default"
                                        className="bg-blue-600 text-white"
                                    >
                                        入力
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0 relative aspect-4/3">
                                <Image
                                    src="https://placehold.jp/3498db/ffffff/1200x900.png?text=Input+Form+Screen"
                                    alt="入力フォーム画面"
                                    title="4つの項目を入力する画面（防火地域等、階数、スパン、奥行き）"
                                    width={1200}
                                    height={900}
                                    className="w-full h-full object-cover"
                                />
                            </CardContent>
                        </Card>

                        {/* 結果画面 */}
                        <Card className="overflow-hidden hover:shadow-xl transition-shadow bg-green-50 pb-0">
                            <CardHeader className="">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">
                                        ステップ3: 結果表示画面
                                    </CardTitle>
                                    <Badge
                                        variant="default"
                                        className="bg-green-600 text-white"
                                    >
                                        結果
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0 relative aspect-4/3">
                                <Image
                                    src="https://placehold.jp/27ae60/ffffff/1200x900.png?text=Result+Screen+with+3D"
                                    alt="結果表示画面"
                                    title="概算金額と建物の3Dモデル表示画面"
                                    width={1200}
                                    height={900}
                                    className="w-full h-full object-cover"
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* 機能説明画像 */}
                    <div className="mt-16 max-w-4xl mx-auto">
                        <Card className="bg-linear-to-r from-purple-50 to-pink-50 border-purple-200 hover:shadow-xl transition-shadow">
                            <CardContent className="p-8 md:p-12">
                                <div className="grid md:grid-cols-2 gap-8 items-center">
                                    <div className="space-y-6">
                                        <div>
                                            <Badge
                                                variant="secondary"
                                                className="mb-3"
                                            >
                                                注目機能
                                            </Badge>
                                            <CardTitle className="text-2xl mb-3">
                                                3Dモデルでイメージを確認
                                            </CardTitle>
                                            <CardDescription className="text-gray-700 text-base">
                                                入力した建物の寸法が3Dモデルとして表示されるため、
                                                完成イメージを視覚的に確認できます。
                                            </CardDescription>
                                        </div>
                                        <Separator />
                                        <ul className="space-y-3 text-gray-700">
                                            <li className="flex items-center gap-3">
                                                <CheckIcon className="shrink-0 w-5 h-5 text-green-600" />
                                                <span>
                                                    リアルタイムで3Dモデルが更新
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <CheckIcon className="shrink-0 w-5 h-5 text-green-600" />
                                                <span>
                                                    角度を変えて確認可能
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <CheckIcon className="shrink-0 w-5 h-5 text-green-600" />
                                                <span>
                                                    寸法の視覚的な理解をサポート
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <Card className="overflow-hidden shadow-xl border-2 border-purple-300 p-0">
                                        <CardContent className="p-0 relative aspect-square">
                                            <Image
                                                src="https://placehold.jp/9b59b6/ffffff/800x800.png?text=3D+Model+View"
                                                alt="3Dモデル表示画面"
                                                title="建物の3Dビューを表示する画面（回転・ズーム可能）"
                                                width={800}
                                                height={800}
                                                className="w-full h-full object-cover"
                                            />
                                        </CardContent>
                                    </Card>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <Separator className="my-0" />

            {/* 個人情報の取扱セクション */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <LockClosedIcon className="w-6 h-6 text-blue-600" />
                        <h2 className="text-3xl md:text-4xl font-bold text-center">
                            個人情報の取扱について
                        </h2>
                    </div>

                    <Card className="bg-blue-50/50 border-blue-200">
                        <CardContent className="p-6 md:p-8">
                            <div className="space-y-6">
                                <div>
                                    <p className="text-gray-800 text-base leading-relaxed mb-6">
                                        本サービスでは、お客様の個人情報を適切に保護するため、以下の情報を収集・保存いたします：
                                    </p>

                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-start gap-3">
                                            <CheckIcon className="shrink-0 mt-0.5 w-5 h-5 text-blue-600" />
                                            <span className="text-gray-700">
                                                お客様のお名前
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckIcon className="shrink-0 mt-0.5 w-5 h-5 text-blue-600" />
                                            <span className="text-gray-700">
                                                メールアドレス
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckIcon className="shrink-0 mt-0.5 w-5 h-5 text-blue-600" />
                                            <span className="text-gray-700">
                                                建物の仕様情報（防火地域、階数、スパン、奥行き）
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                <Separator />

                                <div className="bg-white rounded-lg p-4 border border-gray-200">
                                    <p className="text-gray-800 text-base leading-relaxed">
                                        これらの情報は、概算の提供およびサービス改善の目的でのみ使用され、
                                        <strong className="text-gray-900">
                                            第三者に提供されることはありません
                                        </strong>
                                        。
                                    </p>
                                </div>

                                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                                    <div className="flex items-start gap-3">
                                        <Badge
                                            variant="default"
                                            className="shrink-0 text-lg p-2 bg-green-600"
                                        >
                                            <LockClosedIcon className="w-6 h-6" />
                                        </Badge>
                                        <div>
                                            <p className="text-gray-800 font-semibold mb-1">
                                                安全なデータ保護
                                            </p>
                                            <p className="text-gray-700 text-sm">
                                                最新のセキュリティ技術を採用し、お客様の情報を適切に保護いたします。
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* CTAセクション */}
            <section className="py-16 bg-linear-to-r from-blue-600 to-blue-700 text-white">
                <div className="container mx-auto px-4 text-center space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        木造建築の概算を今すぐ始めましょう
                    </h2>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        無料でご利用いただけます
                    </p>
                    <div className="pt-4">
                        <Button
                            asChild
                            size="lg"
                            variant="secondary"
                            className="text-lg px-8 py-6"
                        >
                            <Link href="/estimate">すぐに概算する <ArrowRightIcon className="w-4 h-4" /></Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* フッター */}
            <footer className="bg-gray-900 text-white py-8">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-400">
                        © 2024 これもく（KOREMOKU）. All rights reserved.
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        木造建築の概算アプリケーション
                    </p>
                </div>
            </footer>
        </div>
    );
}
