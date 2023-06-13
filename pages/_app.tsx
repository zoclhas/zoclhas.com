import "../styles/globals.scss";

import type { AppProps } from "next/app";

import { ThemeProvider } from "next-themes";
import { useRef } from "react";
import { useRouter } from "next/router";
import { LocomotiveScrollProvider as RLSProvider } from "react-locomotive-scroll";

import { PageLoad } from "@/components/page-load";
import { NavBar } from "@/components/navbar";

export default function App({ Component, pageProps, ...rest }: AppProps) {
    const { asPath: pathname } = useRouter();
    const containerRef = useRef(null);

    return (
        <ThemeProvider defaultTheme="green" attribute="data-color">
            <RLSProvider
                options={{
                    smooth: true,
                }}
                location={pathname}
                onLocationChange={(scroll: any) =>
                    scroll.scrollTo(0, {
                        duration: 0,
                        disableLerp: true,
                    })
                }
                containerRef={containerRef}
            >
                <NavBar />
                <PageLoad />
                <main data-scroll-container ref={containerRef}>
                    <Component {...pageProps} />
                </main>
            </RLSProvider>
        </ThemeProvider>
    );
}
