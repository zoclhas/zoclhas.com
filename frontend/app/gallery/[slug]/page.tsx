import { Term } from "@/components/ui/term";
import { meta } from "@/lib/meta";
import { ImageModal } from "@/lib/render/image";
import { Doc, Gallery } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getImageDetails(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/gallery?where[or][0][and][0][slug][equals]=${slug}`,
    { method: "GET", next: { revalidate: 60 } },
  );

  const data: Doc<Gallery> = await res.json();
  if (data.totalDocs === 0) {
    notFound();
  }

  return data.docs[0];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = await params;
  const image = await getImageDetails(p.slug);

  return meta({
    title: `${image.title} - Gallery`,
    description: image.alt,
    card: true,
    image: process.env.NEXT_PUBLIC_API + image.image.url!,
  });
}

export default async function GallerySlug({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const image = await getImageDetails((await params).slug);

  return (
    <>
      <section>
        <Term
          command={
            <Link href="/gallery" className="underline">
              cd ..
            </Link>
          }
          dir={image.slug!}
        />
      </section>

      <section>
        <Term command="glow image.md" dir={image.slug!} />
        <article className="mt-0.5">
          <ImageModal image={image.image} gallery />
          <h1 className="text-2xl md:text-3xl">
            <span className="opacity-50">#</span> {image.title}
          </h1>
          <p>{image.alt}</p>

          {image.alterantes?.length ? (
            <div className="mt-8">
              <h3 className="text-xl md:text-lg">
                <span className="opacity-50">###</span> Alternate Images
              </h3>

              <ul className="mt-4 flex flex-col gap-2">
                {image.alterantes.map((img) => (
                  <li key={img.id}>
                    <ImageModal image={img.alterante} gallery />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </article>
      </section>
    </>
  );
}

export async function generateStaticParams() {
  const posts: Doc<Gallery> = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/gallery`,
    {
      next: { revalidate: 60 },
    },
  ).then((res) => res.json());

  return posts.docs.map((post) => ({ slug: post.slug }));
}
