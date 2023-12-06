import { RenderBlocks } from "@/components/render-content";
import { Posts, Project } from "@/payload-types";
import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const slug = params.slug;

  const project: { docs: Project[] } = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/posts?where[or][0][and][0][slug][equals]=${slug}`,
    { method: "GET", next: { revalidate: 60 } },
  ).then((res) => res.json());
  const details = project.docs[0];

  return {
    title: `${details.title} | Writings | zoclhas.com`,
    description: `${details.updatedAt.slice(0, 10)} - ${details.subtitle}`,
    authors: [
      {
        name: "zoclhas",
        url: "https://zoclhas.com",
      },
    ],
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
    <main>
      <article className="prose dark:prose-invert prose-pre">
        <h1>{postDetails.title}</h1>
        <RenderBlocks layout={postDetails.layout} />
      </article>
    </main>
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
