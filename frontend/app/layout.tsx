import "./globals.scss";

import Providers from "./providers";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Zoclhas",
  description:
    "Web Dev | Material Artist - Heya! This is my portfolio site, checkout my projects and so on!",
  themeColor: "#2c4141",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ overflowY: "hidden" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
