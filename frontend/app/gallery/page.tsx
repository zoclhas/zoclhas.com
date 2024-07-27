import { Term } from "@/components/ui/term";
import { meta } from "@/lib/meta";
import { Doc, Gallery as GalleryProp } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";

async function getImages() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/gallery?limit=100&page=1`,
    { next: { revalidate: 60 } },
  );

  return res.json();
}

export async function generateMetadata() {
  const data: Doc<GalleryProp> = await getImages();
  const images = data.docs;

  return meta({
    title: "Gallery",
    description: "Some pictures I take.",
    card: true,
    image: process.env.NEXT_PUBLIC_API + images[0].image.url!,
  });
}

export default async function Gallery() {
  const data: Doc<GalleryProp> = await getImages();
  const images = data.docs;

  return (
    <>
      <section>
        <Term command="ls" dir="gallery" />
        <ul className="mt-4 flex flex-col gap-2">
          {images.map((img) => (
            <li key={img.id}>
              <Link href={`/gallery/${img.slug}`}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_API}${
                    img.image.sizes?.gallery_card?.url || img.image.url
                  }`}
                  alt={img.image.alt}
                  height={
                    img.image.sizes?.gallery_card?.height || img.image.height
                  }
                  width={
                    img.image.sizes?.gallery_card?.width || img.image.width
                  }
                  quality={100}
                />
              </Link>

              <Link href={`/gallery/${img.slug}`} className="flex justify-end">
                <strong>{img.title}</strong>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
