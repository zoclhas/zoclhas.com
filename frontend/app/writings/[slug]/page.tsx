import { redirect } from "next/navigation";
import { Posts } from "../types";
import { Reveal } from "@/components/reveal";
import RenderBlocks from "@/components/render-content";

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
      <div className="flex flex-col mt-4">
        <h1 className="md:text-6xl text-5xl">{postDetails.title}</h1>
        <span className="text-[rgb(var(--secondary-rgb),0.8)] font-bold">
          {postDetails.createdAt.slice(0, 10)}
        </span>
      </div>
      <div className="prose md:prose-lg">
        <RenderBlocks layout={postDetails.layout} />
      </div>
    </Reveal>
  );
}
