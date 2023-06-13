// For locomotive scroll -> https://github.com/brunos3d/nextjs-with-locomotive-scroll-example/tree/main

import "../styles/globals.scss";
import "locomotive-scroll/dist/locomotive-scroll.css";

import type { AppProps } from "next/app";

import { ThemeProvider } from "next-themes";
import { useRef } from "react";
import { LocomotiveScrollProvider as RLSProvider } from "react-locomotive-scroll";

import { PageLoad } from "@/components/page-load";
import { NavBar } from "@/components/navbar";

export default function App({ Component, pageProps, ...rest }: AppProps) {
    const containerRef = useRef(null);

    return (
        <ThemeProvider
            defaultTheme="green"
            attribute="data-color"
            storageKey="color"
        >
            <RLSProvider
                options={{
                    smooth: true,
                }}
                containerRef={containerRef}
            >
                <NavBar />
                <PageLoad />
                <main
                    data-scroll-container
                    ref={containerRef}
                    className="overflow-y-hidden p-0"
                >
                    <Component {...pageProps} />
                </main>
            </RLSProvider>
        </ThemeProvider>
    );
}
