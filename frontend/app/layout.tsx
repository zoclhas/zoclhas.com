import { cookies } from "next/headers";

import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { meta } from "@/lib/meta";

const jetBrainsMono = JetBrains_Mono({
  fallback: ["monospace"],
  subsets: ["latin"],
});

export const metadata: Metadata = meta({
  description:
    "An undergrad computer science student, doing web dev and material stuff.",
  image: "https://i.zaurastudios.com/zoch.dev.logo.jpg",
  card: true,
});
export const viewport: Viewport = {
  themeColor: "#fffae6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = cookies().get("theme");

  return (
    <html
      className={theme?.value || "light"}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.jpg" />
        <script
          async
          src={`${process.env.NEXT_PUBLIC_UMAMI_DOMAIN}/script.js`}
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_KEY}
        />
      </head>
      <body
        className={cn(
          "bg-paper text-black",
          "dark:bg-neutral-950 dark:text-white",
          jetBrainsMono.className,
        )}
      >
        <Navbar />
        <main className="max-w-xl px-4 py-12 text-sm min-[576px]:mx-auto md:py-24">
          {children}
        </main>
      </body>
    </html>
  );
}
