"use client";

import { ThemeProvider } from "next-themes";
import { useRef } from "react";
import { LocomotiveScrollProvider as RLSProvider } from "react-locomotive-scroll";
import Footer from "@/components/footer";
import { NavBar } from "@/components/navbar";
import { PageLoad } from "@/components/page-load";

function Providers({ children }: { children: React.ReactNode }) {
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
          multiplier: 0.8,
        }}
        containerRef={containerRef}
      >
        <PageLoad />
        <NavBar />
        <main data-scroll-container ref={containerRef}>
          {children}
        </main>
        <Footer />
      </RLSProvider>
    </ThemeProvider>
  );
}

export default Providers;
