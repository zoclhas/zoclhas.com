import "./globals.scss";
import "locomotive-scroll/dist/locomotive-scroll.css";

import Providers from "./providers";
import { NavBar } from "@/components/navbar";
import { PageLoad } from "@/components/page-load";
import Footer from "@/components/footer";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Zoclhas",
  description:
    "Web Dev | Material Artist - Heya! This is my portfolio site, checkout my projects and so on!",
  openGraph: {
    images: "https://zoclhas.com/meta-img.png",
  },
  themeColor: "#2c4141",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <PageLoad />
          <NavBar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
