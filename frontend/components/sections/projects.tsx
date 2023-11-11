import { GitHub, ExternalLink, Cross } from "@/components/icons";
import { IconButton } from "@/components/icon-button";
import { Button } from "../button";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Project } from "@/payload-types";

export const Projects = ({ projects }: { projects: { docs: Project[] } }) => {
  return (
    <>
      <Link
        href="/projects"
        className="group flex w-max items-center gap-4 transition-opacity ease-in hover:opacity-80"
      >
        <h1 className="text-6xl max-sm:text-4xl">Projects</h1>
        <ChevronRight />
      </Link>
      <ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {projects.docs.map((project) => (
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
        <li>
          <div className="rounded-2xl bg-[rgb(var(--secondary-rgb),0.1)] px-4 py-4 text-xl">
            &nbsp;
          </div>
        </li>
        <li>
          <Link
            href="/projects"
            className="flex items-center justify-center rounded-2xl bg-[rgb(var(--secondary-rgb),0.1)] px-4 py-4 text-center text-xl shadow-xl transition-all ease-in hover:-translate-y-1 hover:bg-[rgb(var(--secondary-rgb),0.15)] hover:shadow-2xl"
          >
            View More
          </Link>
        </li>
      </ul>
    </>
  );
};
