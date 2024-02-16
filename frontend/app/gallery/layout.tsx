import type { Metadata } from "next";
export const metadata: Metadata = {
  metadataBase: new URL("https://zoclhas.com"),
  title: "Zoclhas - Gallery",
  description: "A collection of pictures I've took",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="mx-auto mb-4 max-w-[80rem] px-4">{children}</main>;
}
