import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

const notoSansJP = Noto_Sans_JP({
    variable: "--font-noto-sans-jp",
    weight: ["400", "700"],
});

export const metadata: Metadata = {
    title: "コレモク",
    description: "KOREMOKUの公式サイトです。",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body className={cn(notoSansJP.variable, "antialiased")}>
                {children}
            </body>
        </html>
    );
}
