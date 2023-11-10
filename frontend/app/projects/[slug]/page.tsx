import { Project } from "@/payload-types";

import type { Metadata, ResolvingMetadata } from "next";
import { LinkButton } from "@/components/button/link-button";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import RenderBlocks, { NormalRenderBlocks } from "@/components/render-content";
export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const slug = params.slug;

  const project: { docs: Project[] } = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/projects?where[or][0][and][0][slug][equals]=${slug}`,
    { method: "GET", next: { revalidate: 60 } },
  ).then((res) => res.json());
  const details = project.docs[0];

  return {
    title: `${details.title} | Zoclhas`,
    description: `${details.updatedAt.slice(0, 10)} - ${details.subtitle}`,
  };
}

const getProjectDetail = async (slug: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/projects?where[or][0][and][0][slug][equals]=${slug}`,
    { method: "GET", next: { revalidate: 60 } },
  );

  const data: { docs: Project[] } = await res.json();
  if (data.docs.length === 0) {
    redirect("/projects");
  }

  return data.docs[0];
};

export default async function Project({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProjectDetail(params.slug);

  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-2xl">
        <Image
          src={process.env.NEXT_PUBLIC_API + project.meta.image.url}
          alt={project.meta.image.alt}
          height={project.meta.image.height}
          width={project.meta.image.width}
          className="aspect-video w-full rounded-lg object-cover object-center"
        />
        <div className="gradient-blur-project max-md:hidden">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="bottom-0 left-0 z-[20] w-full bg-gradient-to-t from-[var(--primary)] max-sm:mt-4 sm:p-4 md:absolute">
          <h1 className="text-6xl max-sm:text-4xl">{project.title}</h1>
          <p className="text-xl max-sm:text-lg">{project.subtitle}</p>
        </div>
      </div>

      <div className="prose md:prose-lg mt-8">
        <NormalRenderBlocks layout={project.layout as any} />
      </div>
    </Reveal>
  );
}

export async function generateStaticParams() {
  const posts: { docs: Project[] } = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/projects`,
    {
      next: { revalidate: 60 },
    },
  ).then((res) => res.json());

  return posts.docs.map((post) => ({ slug: post.slug }));
}
