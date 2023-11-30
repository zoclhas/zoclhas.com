import "./globals.css";
import { Poppins } from "next/font/google";

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
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
