import "./globals.scss";
import { Poppins } from "next/font/google";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Providers } from "./providers";

import type { Metadata } from "next";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "zoclhas.com",
  description: "It's me",
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
