import Link from "next/link";
import { Posts } from "./types";
import { Reveal } from "@/components/reveal";

const getPosts = async (page: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/posts?limit=10&page=${page}`,
    { method: "GET", next: { revalidate: 60 } },
  );

  return res.json();
};

export default async function Writings({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  let page = searchParams.page;
  if (typeof page !== "number") {
    page = 1;
  }
  const posts: Posts = await getPosts(Number(page));

  return (
    <Reveal className="flex flex-col gap-4">
      <h1 className="mb-4 text-4xl">Writings</h1>
      {posts.docs.map((post) => {
        if (!post.is_draft) {
          return (
            <div key={post.id} className="flex flex-col">
              <span className="ml-4 text-sm font-bold text-[rgb(var(--secondary-rgb),0.8)]">
                {post.updatedAt.slice(0, 10)}
              </span>
              <Link
                href={`/writings/${post.slug}`}
                className="group relative rounded-2xl bg-[rgb(var(--secondary-rgb),0.1)] p-4 transition-colors ease-in hover:bg-[rgb(var(--secondary-rgb),0.15)]"
              >
                <h2 className="flex justify-between gap-2 text-2xl">
                  {post.title}
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
                    className="transition-transform ease-in group-hover:translate-x-1"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </h2>
                <p>{post.subtitle}</p>
              </Link>
            </div>
          );
        }
      })}
    </Reveal>
  );
}
