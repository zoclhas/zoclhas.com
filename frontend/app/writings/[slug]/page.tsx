import { redirect } from "next/navigation";
import { Posts } from "../types";
import { Reveal } from "@/components/reveal";
import RenderBlocks from "@/components/render-content";

import type { Metadata, ResolvingMetadata } from "next";
import { LinkButton } from "@/components/button/link-button";
export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const slug = params.slug;

  const post: Posts = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/posts?where[or][0][and][0][slug][equals]=${slug}`,
    { method: "GET", next: { revalidate: 60 } },
  ).then((res) => res.json());
  const details = post.docs[0];

  return {
    title: `${details.title} | Zoclhas`,
    description: `${details.updatedAt.slice(0, 10)} - ${details.subtitle}`,
  };
}

const getPostDetail = async (slug: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/posts?where[or][0][and][0][slug][equals]=${slug}`,
    { method: "GET", next: { revalidate: 60 } },
  );

  const data: Posts = await res.json();
  if (data.docs.length === 0) {
    redirect("/writings");
  }

  return data;
};

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostDetail(params.slug);
  const postDetails = post.docs[0];

  return (
    <Reveal as="article">
      <div className="mt-4 flex flex-col">
        <LinkButton href="/writings" fill className="mb-4">
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
          Back to Writings
        </LinkButton>
        <h1 className="text-5xl md:text-6xl">{postDetails.title}</h1>
      </div>
      <div className="prose md:prose-lg">
        <RenderBlocks
          layout={postDetails.layout}
          date={postDetails.createdAt}
        />
      </div>
    </Reveal>
  );
}

export async function generateStaticParams() {
  const posts: Posts = await fetch(`${process.env.NEXT_PUBLIC_API}/api/posts`, {
    next: { revalidate: 60 },
  }).then((res) => res.json());

  return posts.docs.map((post) => ({ slug: post.slug }));
}
