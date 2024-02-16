import { Reveal } from "@/components/reveal";
import { Gallery } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";

const getImages = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/gallery?limit=100&page=1`,
    { method: "GET", next: { revalidate: 60 } },
  );

  return res.json();
};

export default async function GalleryPage() {
  const data: { docs: Gallery[] } = await getImages();

  return (
    <Reveal>
      <div className="mx-auto max-w-[60rem]">
        <h1 className="mb-4 text-4xl">Gallery</h1>
      </div>
      <ul className="mt-8 grid grid-cols-1 flex-col gap-4 md:grid-cols-2">
        {data.docs.map((image) => (
          <Link
            key={image.id}
            href={`/gallery/${image.slug}`}
            className="group relative isolate block"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_API}${
                image.image.sizes?.gallery_card?.url || image.image.url
              }`}
              alt={image.image.alt}
              height={
                image.image.sizes?.gallery_card?.height || image.image.height
              }
              width={
                image.image.sizes?.gallery_card?.width || image.image.width
              }
              quality={100}
              className="size-full rounded-2xl object-cover object-center shadow-xl transition-shadow group-hover:shadow-2xl"
            />
            <div className="size-full absolute inset-0 rounded-2xl bg-[rgb(var(--primary-rgb),1)] opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
          </Link>
        ))}
      </ul>
    </Reveal>
  );
}
