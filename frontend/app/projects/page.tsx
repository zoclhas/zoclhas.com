import { Project } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Projects | zoclhas",
  description: "Previews work and projects that I've worked on.",
};

const getProjects = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/projects?limit=100&page=1`,
    { method: "GET", next: { revalidate: 60 } },
  );

  return res.json();
};

export default async function Projects() {
  const projects: { docs: Project[] } = await getProjects();

  return (
    <main>
      <ul className="mt-1 grid gap-2 md:grid-cols-2">
        {projects.docs.map((project) => (
          <li key={project.id}>
            <Link
              href={"/projects/" + project.slug}
              className="bg-sand3 flex h-full flex-col rounded-xl p-2 shadow-sm dark:bg-transparent dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-900/20"
            >
              <Image
                src={
                  process.env.NEXT_PUBLIC_API +
                  (project.meta.image.sizes?.card?.url ||
                    project.meta.image.url)
                }
                alt={project.meta.image.alt}
                height={project.meta.image.height}
                width={project.meta.image.width}
                className="rounded-lg shadow-lg"
              />
              <div className="mt-4 flex grow flex-col justify-between gap-2">
                <div>
                  <h2 className="text-xl font-medium underline">
                    {project.title}
                  </h2>
                  <p>{project.subtitle}</p>
                </div>

                <ul className="flex flex-wrap gap-1">
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
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
