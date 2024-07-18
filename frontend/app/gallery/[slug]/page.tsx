import { Term } from "@/components/ui/term";
import { ImageModal } from "@/lib/render/image";
import { Doc, Gallery } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getImageDetails(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/gallery?where[or][0][and][0][slug][equals]=${slug}`,
    { method: "GET", next: { revalidate: 60 } },
  );

  const data: Doc<Gallery> = await res.json();
  if (data.totalDocs === 0) {
    redirect("/projects");
  }

  return data.docs[0];
}

export default async function GallerySlug({
  params,
}: {
  params: { slug: string };
}) {
  const image = await getImageDetails(params.slug);

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
          <ImageModal image={image.image} />
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
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API}${
                        img.alterante.sizes?.gallery_card?.url ||
                        img.alterante.url
                      }`}
                      alt={img.alterante.alt}
                      height={
                        img.alterante.sizes?.gallery_card?.height ||
                        img.alterante.height
                      }
                      width={
                        img.alterante.sizes?.gallery_card?.width ||
                        img.alterante.width
                      }
                      quality={100}
                    />
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
