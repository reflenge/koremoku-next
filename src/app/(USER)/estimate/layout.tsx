"use client";

import React, { useEffect } from "react";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        function scalePdfArea() {
            const designWidth = 785; // pdf-areaの実際の幅に合わせる
            const windowWidth = Math.max(
                document.documentElement.clientWidth,
                window.innerWidth || 0
            );
            const scale = Math.min(
                Math.floor((windowWidth / designWidth) * 1000) / 1000,
                1
            ); // 小数第3位で切り捨て、最大スケールを1に制限
            const mainElement = document.querySelector(
                "#pdf-area"
            ) as HTMLElement;
            mainElement.style.transform = `scale(${scale})`;
            mainElement.style.transformOrigin = "top left";
            // スケール後の高さに合わせてbodyの高さを調整
            // const scaledHeight = mainElement.offsetHeight * scale;
            // mainElement.style.minHeight = `${scaledHeight}px`;
        }

        scalePdfArea();
        window.addEventListener("resize", scalePdfArea);

        return () => {
            window.removeEventListener("resize", scalePdfArea);
        };
    }, []);

    return (
        <>
            <main
                className="relative mx-auto px-4 overflow-x-hidden overflow-y-hidden"
                id="pdf-area"
                style={{ width: "785px", transformOrigin: "top left" }}
            >
                {children}
            </main>
            <nav
                style={{
                    position: "fixed",
                    bottom: "24px",
                    right: "24px",
                    zIndex: 1000,
                }}
                className="flex flex-col gap-2 items-end"
            >
                <Link
                    href="/estimate"
                    className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
                >
                    見積もり
                </Link>
                <Link
                    href="/estimate/history"
                    className="bg-gray-700 text-white px-4 py-2 rounded shadow hover:bg-gray-800 transition"
                >
                    見積もり履歴
                </Link>
            </nav>
        </>
    );
};

export default Layout;
