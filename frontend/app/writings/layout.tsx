import type { Metadata } from "next";
export const metadata: Metadata = {
  metadataBase: new URL("https://zoclhas.com"),
  title: "Zoclhas - Writings",
  description: "Just a few things I write.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="mx-auto mb-4 max-w-[60rem] px-4">{children}</main>;
}
