import { Term } from "@/components/ui/term";
import { meta } from "@/lib/meta";
import { RenderBlocks } from "@/lib/render";
import { formatDate } from "@/lib/utils";
import { Doc, Post } from "@/payload-types";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getPost(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/posts?where[or][0][and][0][slug][equals]=${slug}`,
    { method: "GET", next: { revalidate: 60 } },
  );

  const data: Doc<Post> = await res.json();
  if (!data.totalDocs) {
    notFound();
  }

  return data.docs[0];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await getPost((await params).slug);

  return meta({
    title: `${post.title} - Writings`,
    description: post.subtitle,
  });
}

export default async function WritingsSlug({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await getPost((await params).slug);

  const views: ViewProps = await getViews((await params).slug, post.createdAt);
  const showViews = views.length > 0 && views[0].y && views[0].y > 0;

  return (
    <>
      <section>
        <Term
          command={
            <Link href="/writings" className="underline">
              cd ..
            </Link>
          }
          dir={post.slug!}
        />
      </section>

      <section className="mt-4">
        <Term command="cat info.md" dir={post.slug!} />
        <div className="mt-0.5">
          <h1 className="text-2xl font-bold md:text-3xl">
            <span className="opacity-50">#</span> {post.title}
          </h1>
          <ul>
            <li className="group">
              <div className="relative inline">
                <span className="font-bold group-hover:opacity-0">&#183;</span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100">
                  -
                </span>
              </div>{" "}
              <p className="inline">
                <span>
                  <strong className="inline font-medium">Subtitle:</strong>{" "}
                  <span>{post.subtitle}</span>
                </span>
              </p>
            </li>

            <li className="group">
              <div className="relative inline">
                <span className="font-bold group-hover:opacity-0">&#183;</span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100">
                  -
                </span>
              </div>{" "}
              <p className="inline">
                <span>
                  <strong className="inline font-medium">Created:</strong>{" "}
                  <span>{formatDate(post.createdAt)}</span>
                </span>
              </p>
            </li>

            {showViews && (
              <li className="group">
                <div className="relative inline">
                  <span className="font-bold group-hover:opacity-0">
                    &#183;
                  </span>
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100">
                    -
                  </span>
                </div>{" "}
                <p className="inline">
                  <span>
                    <strong className="inline font-medium">Views:</strong>{" "}
                    <span>{views[0].y}</span>
                  </span>
                </p>
              </li>
            )}
          </ul>
        </div>
      </section>

      <section className="mt-4">
        <Term command="glow post.md" dir={post.slug!} />
        <article className="prose prose-neutral dark:prose-invert mt-4">
          <RenderBlocks layout={post.layout} />
        </article>
      </section>
    </>
  );
}

async function getViews(slug: string, createDate: string) {
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
}

export async function generateStaticParams() {
  const posts: Doc<Post> = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/posts`,
    {
      next: { revalidate: 60 },
    },
  ).then((res) => res.json());

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
