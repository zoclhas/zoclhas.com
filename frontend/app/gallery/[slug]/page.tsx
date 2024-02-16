import { Reveal } from "@/components/reveal";

import { NormalRenderBlocks } from "@/components/render-content";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Gallery } from "@/payload-types";
import { ImageLightbox } from "@/components/render-content/image";
import { LinkButton } from "@/components/button/link-button";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug;

  const gallery: { docs: Gallery[] } = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/gallery?where[or][0][and][0][slug][equals]=${slug}`,
    { method: "GET", next: { revalidate: 60 } },
  ).then((res) => res.json());
  const details = gallery.docs[0];

  const description = details.description
    // @ts-ignore
    .map((item) => item.children.map((child) => child.text).join(""))
    .join(" ");

  return {
    title: `${details.title} | Zoclhas - Gallery`,
    description,
  };
}

const getImageDetails = async (slug: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/gallery?where[or][0][and][0][slug][equals]=${slug}`,
    { method: "GET", next: { revalidate: 60 } },
  );

  const data: { docs: Gallery[]; totalDocs: number } = await res.json();
  if (data.totalDocs === 0) {
    redirect("/projects");
  }

  return data.docs[0];
};

export default async function GalleryImage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getImageDetails(params.slug);

  return (
    <Reveal className="mx-auto max-w-[60rem]">
      <LinkButton href="/gallery" fill className="mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="-scale-x-100"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
        Back to Gallery
      </LinkButton>

      <h1 className="text-5xl">{data.title}</h1>
      <ImageLightbox
        node={{
          children: [],
          relationTo: "",
          type: "image",
          value: data.image,
        }}
      />
      <article className="prose prose-lg">
        <NormalRenderBlocks
          layout={[{ content: data.description, blockType: "content" }]}
        />
      </article>

      {data.alterantes?.length ? (
        <div>
          <h2 className="text-2xl">Alternate Shots</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.alterantes.map((alt) => (
              <ImageLightbox
                key={alt.id}
                node={{
                  children: [],
                  relationTo: "",
                  type: "image",
                  value: alt.alterante,
                }}
              />
            ))}
          </div>
        </div>
      ) : null}
    </Reveal>
  );
}
