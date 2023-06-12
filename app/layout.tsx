"use client";

import "@/styles/globals.scss";

import { PageLoad } from "@/components/page-load";
import { NavBar } from "@/components/navbar";

import { ThemeProvider } from "next-themes";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <ThemeProvider defaultTheme="green" attribute="data-color">
                    <NavBar />
                    <PageLoad />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
