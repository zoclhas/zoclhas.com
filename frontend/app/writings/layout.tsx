import type { Metadata } from "next";
export const metadata: Metadata = {
  metadataBase: new URL("https://zoclhas.com"),
  title: "Zoclhas - Writings",
  description: "Just a few things I write.",
  themeColor: "#2c4141",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="mx-auto mb-4 max-w-[40rem] px-4">{children}</main>;
}
