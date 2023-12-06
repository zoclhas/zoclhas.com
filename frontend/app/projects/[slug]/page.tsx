import { Project } from "@/payload-types";
import { redirect } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";

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
  return <main></main>;
}
