import Link from "next/link";
import { Posts } from "./types";
import { Reveal } from "@/components/reveal";
import { LayoutSwitch, MotionDivWrapper } from "@/components/min-max";
import { LayoutWrapper } from "@/components/min-max/layout-wrapper";

const getPosts = async (page: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/posts?limit=100&page=${page}&sort=-updatedAt&where[or][0][and][0][is_draft][equals]=false`,
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
      <div className="flex items-center justify-between gap-2">
        <h1 className="mb-4 text-4xl">Writings</h1>
        <LayoutSwitch />
      </div>
      <LayoutWrapper posts={posts} />
    </Reveal>
  );
}
