import { Term } from "@/components/ui/term";
import { GitHubIcon } from "@/lib/icons";
import { meta } from "@/lib/meta";
import { RenderBlocks } from "@/lib/render";
import { Doc, Project } from "@/payload-types";
import { Layers, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

async function getProject(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/projects?where[or][0][and][0][slug][equals]=${slug}`,
    { next: { revalidate: 60 } },
  );

  const data: Doc<Project> = await res.json();
  if (!data.totalDocs) {
    notFound();
  }

  return data.docs[0];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = await getProject((await params).slug);

  return meta({
    title: `${project.title} - Projects`,
    description: project.subtitle,
    card: true,
    image: process.env.NEXT_PUBLIC_API + project.meta.image.url!,
  });
}

export default async function ProjectSlug({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = await getProject((await params).slug);

  return (
    <>
      <section>
        <Term
          command={
            <Link href="/projects" className="underline">
              cd ..
            </Link>
          }
          dir={project.slug!}
        />
      </section>

      <section className="mt-4">
        <Term command="glow project.md" dir={project.slug!} />
        <article className="mt-0.5">
          <Image
            src={process.env.NEXT_PUBLIC_API + project.meta.image.url!}
            alt={project.meta.image.alt}
            height={project.meta.image.height}
            width={project.meta.image.width}
            className="aspect-square w-full object-cover object-center"
          />
          <h1 className="mt-2 text-2xl md:text-3xl">
            <span className="opacity-50">#</span> {project.title}
          </h1>
          <RenderBlocks layout={project.layout as any} />

          <p className="mt-2">
            <strong className="mr-2 font-medium text-pink-700 dark:text-pink-500">
              <Layers className="mr-1 inline size-4" fill="currentColor" />
              Stack(s):
            </strong>
            {project.stacks.map((t, i) => (
              <React.Fragment key={t}>
                {t}
                {i + 1 < project.stacks.length ? " | " : ""}
              </React.Fragment>
            ))}
          </p>
        </article>
      </section>

      <section className="mt-4">
        <Term command="cat links.md" dir={project.slug!} />
        <ul className="mt-0.5">
          {project.git_link && (
            <li className="group w-max">
              <div className="relative inline">
                <span className="font-bold group-hover:opacity-0">&#183;</span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100">
                  -
                </span>
              </div>{" "}
              <a
                href={project.git_link}
                target="_blank"
                rel="noreferrer"
                className="text-neutral-800 dark:text-neutral-200"
              >
                <span className="opacity-40">[</span>
                <span>
                  <GitHubIcon className="inline size-4" />{" "}
                  <strong className="underline">GitHub Link</strong>
                </span>
                <span className="opacity-40">]</span>
                <span className="opacity-0 max-sm:hidden sm:group-hover:opacity-50">
                  <span className="opacity-40">(</span>
                  <span className="underline decoration-wavy">
                    {project.git_link}
                  </span>
                  <span className="opacity-40">)</span>
                </span>
              </a>
            </li>
          )}
          <li className="group w-max">
            <div className="relative inline">
              <span className="font-bold group-hover:opacity-0">&#183;</span>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100">
                -
              </span>
            </div>{" "}
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="text-sky-800 dark:text-sky-200"
            >
              <span className="opacity-40">[</span>
              <span>
                <LinkIcon className="inline size-4" />{" "}
                <strong className="underline">Website</strong>
              </span>
              <span className="opacity-40">]</span>
              <span className="opacity-0 max-sm:hidden sm:group-hover:opacity-50">
                <span className="opacity-40">(</span>
                <span className="underline decoration-wavy">
                  {project.link}
                </span>
                <span className="opacity-40">)</span>
              </span>
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}

export async function generateStaticParams() {
  const posts: Doc<Project> = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/projects`,
    {
      next: { revalidate: 60 },
    },
  ).then((res) => res.json());

  return posts.docs.map((post) => ({ slug: post.slug }));
}
