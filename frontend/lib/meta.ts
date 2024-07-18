import { Metadata } from "next";

export function meta({
  title,
  description,
  image = "https://i.zaurastudios.com/zoch.dev.logo.jpg",
  card,
}: Meta): Metadata {
  title = title ? title + " | zoch.dev" : "zoch.dev";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image,
    },
    twitter: {
      title,
      description,
      card: card ? "summary_large_image" : undefined,
    },
  };
}

interface Meta {
  title?: string;
  description: string;
  image?: string;
  card?: boolean;
}
