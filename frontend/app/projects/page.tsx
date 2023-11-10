import { Reveal } from "@/components/reveal";
import { Project } from "@/payload-types";
import { GitHub, ExternalLink } from "@/components/icons";
import Link from "next/link";
import Image from "next/image";

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
    <Reveal>
      <h1 className="mb-4 text-4xl">Projects</h1>
      <ul className="mt-8 flex flex-col gap-4">
        {projects.docs.map((project, i) => (
          <li
            key={project.id}
            className="group grid w-full grid-cols-1 grid-rows-1 overflow-hidden rounded-2xl bg-[rgb(var(--secondary-rgb),0.1)] shadow-xl transition-all ease-in hover:-translate-y-1 hover:bg-[rgb(var(--secondary-rgb),0.15)] hover:shadow-2xl md:grid-cols-2"
          >
            <div className="relative">
              <Link href={"/projects/" + project.slug} className="block p-2">
                <Image
                  src={
                    process.env.NEXT_PUBLIC_API +
                    (project.meta.image.sizes?.card?.url ||
                      project.meta.image.url)
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
                  className="rounded-lg object-cover object-center"
                  loading={i < 3 ? "eager" : "lazy"}
                />
              </Link>

              <div className="absolute bottom-1 right-1 flex gap-1">
                {project.git_link && (
                  <Link
                    className="grid h-[42px] w-[42px] items-center justify-center rounded-lg bg-[rgb(var(--secondary-rgb),0.2)] p-3 backdrop-blur-md transition-colors hover:bg-[rgb(var(--secondary-rgb),0.1)]"
                    href={project.git_link}
                    target="_blank"
                  >
                    <GitHub fill="#fff" height={1.1} />
                  </Link>
                )}
                <Link
                  className="grid h-[42px] w-[42px] items-center justify-center rounded-lg bg-[rgb(var(--secondary-rgb),0.2)] p-3 backdrop-blur-md transition-colors hover:bg-[rgb(var(--secondary-rgb),0.1)]"
                  href={project.link}
                  target="_blank"
                >
                  <ExternalLink fill="#fff" height={0.9} />
                </Link>
              </div>
            </div>

            <Link
              href={"/projects/" + project.slug}
              className="flex flex-col justify-between gap-4 p-4"
            >
              <div className="flex flex-col">
                <h2 className="text-4xl">{project.title}</h2>
                <p className="text-xl leading-5">{project.subtitle}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.stacks.slice(0, 5).map((stack, i) => (
                  <div
                    key={project.id + String(i)}
                    className="max-h-8 grow overflow-hidden rounded-xl bg-[rgb(var(--primary-rgb),0.2)] px-2 py-1 text-center"
                  >
                    {stack}
                  </div>
                ))}
                <button className="block w-max grow cursor-pointer justify-self-end rounded-2xl bg-[rgb(var(--secondary-rgb),0.2)] px-4 py-1 text-center font-bold transition-colors ease-in hover:bg-[rgb(var(--secondary-rgb),0.3)]">
                  More Info
                </button>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
