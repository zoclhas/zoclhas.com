"use client";

import { Project } from "@/payload-types";
import { LinkButton } from "@/components/button/link-button";
import Link from "next/link";
import Image from "next/image";
import { NormalRenderBlocks } from "@/components/render-content";
import Modal from "@/components/modal";
import { useRouter } from "next/navigation";

export const Index = ({ project }: { project: Project }) => {
  const router = useRouter();
  const dismiss = () => {
    router.back();
    document.body.style.overflowY = "scroll";
  };

  return (
    <Modal>
      <LinkButton
        href="/projects"
        fill
        className="mb-4"
        onClick={(e) => {
          e.preventDefault();
          dismiss();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="-scale-x-100"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
        Back
      </LinkButton>
      <div className="relative overflow-hidden rounded-2xl">
        <Image
          src={process.env.NEXT_PUBLIC_API + project.meta.image.url}
          alt={project.meta.image.alt}
          height={project.meta.image.height}
          width={project.meta.image.width}
          className="aspect-video w-full rounded-lg object-cover object-center"
        />
        <div className="bottom-0 left-0 z-[20] w-full bg-gradient-to-t from-[var(--primary)] to-[rgb(var(--primary-rgb),0.7)] backdrop-blur-lg max-sm:mt-4 sm:p-4 md:absolute">
          <h1 className="text-6xl max-sm:text-4xl">{project.title}</h1>
          <p className="text-xl max-sm:text-lg">{project.subtitle}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col">
        <h2>Technologies:</h2>
        <div className="flex flex-wrap gap-2">
          {project.stacks.map((stack) => (
            <div
              className="grow select-none rounded-lg bg-[rgb(var(--secondary-rgb),0.2)] px-6 py-2 text-center"
              key={stack}
            >
              {stack}
            </div>
          ))}
        </div>
      </div>

      <div className="prose md:prose-lg mt-8">
        <NormalRenderBlocks layout={project.layout as any} />
      </div>

      <div className="mt-4 flex flex-col">
        <h2>Links:</h2>
        <div className="flex flex-col gap-2">
          <div className="break-words rounded-lg bg-[rgb(var(--secondary-rgb),0.2)] px-6 py-2">
            Visit the website here:{" "}
            <Link href={project.link} target="_blank" className="underline">
              {project.link}
            </Link>
          </div>
          {project.git_link && (
            <div className="select-none break-words rounded-lg bg-[rgb(var(--secondary-rgb),0.2)] px-6 py-2">
              Visit the GitHub repo here:{" "}
              <Link
                href={project.git_link}
                target="_blank"
                className="underline"
              >
                {project.git_link}
              </Link>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
