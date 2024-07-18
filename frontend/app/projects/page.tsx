import { Term } from "@/components/ui/term";
import { Doc, Project } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";

async function getProjects() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/projects?limit=100&page=1`,
    { method: "GET", next: { revalidate: 60 } },
  );

  return res.json();
}
export default async function Projects() {
  const data: Doc<Project> = await getProjects();
  const projects = data.docs;

  return (
    <>
      <section>
        <Term command="ls" dir="projects" />
        <ul className="mt-0.5 flex flex-col gap-4">
          {projects.map((project, i) => (
            <li key={project.id}>
              <div className="flex justify-between gap-1">
                <div className="flex grow flex-col justify-between gap-1">
                  <div>
                    <Link href={`/projects/${project.slug}`}>
                      <h2 className="text-xl font-semibold">{project.title}</h2>
                    </Link>
                    <p>{project.subtitle}</p>
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="h-5 bg-amber-200 px-2 text-center hover:bg-amber-100 dark:bg-neutral-800 dark:hover:bg-neutral-900"
                  >
                    Learn More
                  </Link>
                </div>
                <Link href={`/projects/${project.slug}`}>
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_API +
                      (project.meta.image.sizes?.card?.url ||
                        project.meta.image.url!)
                    }
                    alt={project.meta.image.alt}
                    height={
                      project.meta.image.sizes?.card?.height ||
                      project.meta.image.height
                    }
                    width={
                      project.meta.image.sizes?.card?.width ||
                      project.meta.image.width
                    }
                    className="aspect-square w-full min-w-32 max-w-32 object-cover object-center md:min-w-44 md:max-w-44"
                    loading={i < 3 ? "eager" : "lazy"}
                  />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
