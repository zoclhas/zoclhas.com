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

const getViews = async (slug: string, createDate: string) => {
  "use server";

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const authBody = JSON.stringify({
    username: process.env.UMAMI_USER,
    password: process.env.UMAMI_PASS,
  });
  const authRes = await fetch(
    `${process.env.NEXT_PUBLIC_UMAMI_DOMAIN}/api/auth/login`,
    {
      method: "POST",
      headers: myHeaders,
      body: authBody,
      next: {
        revalidate: 3600,
      },
    },
  );
  const auth: AuthParams = await authRes.json();

  const createdAt = Date.parse(createDate);
  const params = `startAt=${createdAt}&endAt=${Date.now()}&type=url&url=/writings/${slug}`;
  myHeaders.append("Authorization", `Bearer ${auth.token}`);

  const slugViews = await fetch(
    `${process.env.NEXT_PUBLIC_UMAMI_DOMAIN}/api/websites/${process.env.NEXT_PUBLIC_UMAMI_KEY}/metrics?${params}`,
    {
      method: "GET",
      headers: myHeaders,
      next: {
        revalidate: 60,
      },
    },
  );

  return slugViews.json();
};

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostDetail(params.slug);
  const postDetails = post.docs[0];

  const views: ViewProps = await getViews(params.slug, postDetails.createdAt);
  const showViews = views.length > 0 && views[0].y && views[0].y > 0;

  return (
    <Reveal as="article">
      <div className="mt-4 flex flex-col">
        <div className="flex justify-between gap-2">
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
          {showViews && (
            <div className="flex items-center justify-end gap-1 font-bold text-[rgb(var(--secondary-rgb),0.8)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                  className="fill-[rgb(var(--secondary-rgb),0.8)]"
                />
              </svg>
              <span>{views[0].y}</span>
            </div>
          )}
        </div>
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

interface AuthParams {
  token: string;
  user: {
    id: string;
    username: string;
    role: string;
    createdAt: string;
  };
}

export type ViewProps = { x: string; y: number }[];
