const getPosts = async ({ page = 1 }: { page: number }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/posts?limit=10&page=${page}`,
    { next: { revalidate: 60 } },
  );

  return res.json();
};

export default async function Writings({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  return <div>ff</div>;
}
