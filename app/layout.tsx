import type { Metadata } from "next";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./globals.css";

import Header from "./components/Header";

export const metadata: Metadata = {
    title: "Travel Planner",
    description: "AIを活用して旅行計画を作成、整理、保存できるトラベルプランニングアプリです。",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body className="bg-white text-slate-900 antialiased">
                <Header />
                <main className="container mx-auto p-4">
                    {children}
                </main>
            </body>
        </html>
    );
}
