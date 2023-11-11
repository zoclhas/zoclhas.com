import "./globals.scss";

import Providers from "./providers";

import type { Metadata, Viewport } from "next";
export const metadata: Metadata = {
  title: "Zoclhas",
  description:
    "Web Dev | Material Artist - Heya! This is my portfolio site, checkout my projects and so on!",
};
export const viewport: Viewport = {
  themeColor: "#2c4141",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-color="green" suppressHydrationWarning>
      <head>
        <script
          async
          src={`${process.env.NEXT_PUBLIC_UMAMI_DOMAIN}/script.js`}
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_KEY}
        />
      </head>
      <body style={{ overflowY: "hidden" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
