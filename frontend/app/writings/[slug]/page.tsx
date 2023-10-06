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
    <Reveal as="article" className="prose">
      <h1>{postDetails.title}</h1>
      <RenderBlocks layout={postDetails.layout} />
    </Reveal>
  );
}
