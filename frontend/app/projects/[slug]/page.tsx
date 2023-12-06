import { Project } from "@/payload-types";
import { redirect } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { RenderBlocks } from "@/components/render-content";
import { Button } from "@/components/button";
import { GitHub } from "@/components/icons";
import { ExternalLink } from "lucide-react";

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
    title: `${details.title} | Projects | zoclhas.com`,
    description: details.subtitle,
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
    <main>
      <div className="flex gap-1">
        {project.git_link && (
          <Button
            href={project.git_link}
            target="_blank"
            className="github-button text-sand1"
          >
            <GitHub /> Visit Repo
          </Button>
        )}
        {project.link && (
          <Button href={project.link} target="_blank">
            <ExternalLink /> Visit Site
          </Button>
        )}
      </div>

      <Image
        src={process.env.NEXT_PUBLIC_API + project.meta.image.url}
        alt={project.meta.image.alt}
        height={project.meta.image.height}
        width={project.meta.image.width}
        className="mt-4 aspect-video w-full rounded-2xl object-cover object-center shadow-xl"
        loading="eager"
      />

      <h1 className="mt-4 text-4xl font-medium">{project.title}</h1>
      <p>{project.subtitle}</p>

      <div className="mt-4">
        <h2>Technologies:</h2>
        <ul className="mt-1 flex flex-wrap gap-1">
          {project.stacks.map((t, i) => (
            <li
              key={i}
              className="flex grow items-center justify-center rounded-md bg-gradient-to-b from-gray-100 to-gray-200/70 px-4 py-2 text-center dark:from-gray-900 dark:to-gray-900/50"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>

      <article className="prose dark:prose-invert mt-4">
        <RenderBlocks layout={project.layout} />
      </article>
    </main>
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
