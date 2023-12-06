import "./globals.scss";
import { Poppins } from "next/font/google";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Providers } from "./providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

import type { Metadata, Viewport } from "next";
export const metadata: Metadata = {
  title: "zoclhas.com",
  description:
    "Hello! I'm Zoclhas, a web developer and material artist, and this is my humble abode- on the internet! ",
  metadataBase: new URL("https://zoclhas.com"),
  openGraph: {
    images: "/meta.png",
  },
};
export const viewport: Viewport = {
  themeColor: "#e5a50a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
