"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    window.location.href = "https://koremoku.mosunset.com";
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-dvh flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 px-4">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <div className="text-center space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                            サイト準備中
                        </h1>
                        <div className="h-1 w-20 bg-indigo-600 mx-auto rounded-full" />
                    </div>

                    <div className="space-y-4 text-gray-700 leading-relaxed">
                        <p className="text-lg">新しい環境は現在準備中です。</p>
                        <p>
                            <span className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 font-bold text-xl rounded-full mb-2">
                                {countdown}
                            </span>
                            <br />
                            {countdown > 0 ? (
                                <>
                                    秒後に現在稼働中のサイトへ自動的にリダイレクトされます。
                                </>
                            ) : (
                                <>リダイレクト中...</>
                            )}
                            <br />
                            自動的に移動しない場合は、下記のボタンをクリックしてください。
                        </p>
                    </div>

                    <div className="pt-4">
                        <Link
                            href="https://koremoku.mosunset.com"
                            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                        >
                            現在稼働中のサイトへ移動
                        </Link>
                    </div>

                    <div className="pt-6 mt-6 -mx-4 px-6 py-6 bg-linear-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-400 shadow-inner">
                        <div className="flex items-start gap-3">
                            <div className="shrink-0 mt-1">
                                <svg
                                    className="w-6 h-6 text-amber-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <p className="text-lg font-bold text-amber-900 mb-2">
                                    ⚠️ ブックマーク・お気に入り登録のお願い
                                </p>
                                <p className="text-base text-amber-800 leading-relaxed">
                                    今後のアクセスには、以下のURLをご登録ください
                                </p>
                                <Link
                                    href="https://koremoku.reegle.jp"
                                    className="inline-block mt-3 text-xl font-bold text-amber-700 hover:text-amber-900 underline decoration-2 underline-offset-4 decoration-amber-500 hover:decoration-amber-700 transition-colors"
                                >
                                    https://koremoku.reegle.jp
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
