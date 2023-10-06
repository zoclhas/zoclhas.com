import { Posts } from "./types";

const getPosts = async (page: number) => {
  console.log(`${process.env.NEXT_PUBLIC_API}/api/posts?limit=10&page=${page}`);
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
  console.log(posts);

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-3xl bg-[rgb(var(--secondary-rgb),0.2)]"></div>
    </div>
  );
}
