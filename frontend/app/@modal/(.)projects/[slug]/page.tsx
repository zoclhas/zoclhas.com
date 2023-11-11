import { Project } from "@/payload-types";

import type { Metadata, ResolvingMetadata } from "next";
import { LinkButton } from "@/components/button/link-button";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import RenderBlocks, { NormalRenderBlocks } from "@/components/render-content";
import Modal from "@/components/modal";
import { motion } from "framer-motion";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { Index } from ".";

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

  return <Index project={project} />;
}
