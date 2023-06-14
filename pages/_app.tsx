// For locomotive scroll -> https://github.com/brunos3d/nextjs-with-locomotive-scroll-example/tree/main

import "../styles/globals.scss";
import "locomotive-scroll/dist/locomotive-scroll.css";

import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

import { ThemeProvider } from "next-themes";
import { useRef } from "react";
import { LocomotiveScrollProvider as RLSProvider } from "react-locomotive-scroll";

import { PageLoad } from "@/components/page-load";
import { NavBar } from "@/components/navbar";
import Head from "next/head";

const Footer = dynamic(() => import("@/components/footer"), {
    ssr: false,
});

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
                <Head>
                    <title>Zoclhas</title>
                    <link
                        rel="shortcut icon"
                        href="fav.ico"
                        type="image/x-icon"
                    />
                    <meta name="title" content="Zoclhas" />
                    <meta
                        name="description"
                        content="Web Dev | Material Artist - Heya! This is my portfolio site, checkout my projects and so on!"
                    />

                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://zoclhas.com/" />
                    <meta property="og:title" content="Zoclhas" />
                    <meta
                        property="og:description"
                        content="Web Dev | Material Artist - Heya! This is my portfolio site, checkout my projects and so on!"
                    />
                    <meta
                        property="og:image"
                        content="https://zoclhas.com/meta-img.png"
                    />

                    <meta
                        property="twitter:card"
                        content="summary_large_image"
                    />
                    <meta
                        property="twitter:url"
                        content="https://zoclhas.com/"
                    />
                    <meta property="twitter:title" content="Zoclhas" />
                    <meta
                        property="twitter:description"
                        content="Web Dev | Material Artist - Heya! This is my portfolio site, checkout my projects and so on!"
                    />
                    <meta
                        property="twitter:image"
                        content="https://zoclhas.com/meta-img.png"
                    />
                </Head>
                <NavBar />
                <PageLoad />
                <main data-scroll-container ref={containerRef}>
                    <Component {...pageProps} />
                </main>
                <Footer />
            </RLSProvider>
        </ThemeProvider>
    );
}
