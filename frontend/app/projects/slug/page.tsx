import { Project } from "@/payload-types";

export async function generateStaticParams() {
  const posts: { docs: Project[] } = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/projects`,
    {
      next: { revalidate: 60 },
    },
  ).then((res) => res.json());

  return posts.docs.map((post) => ({ slug: post.slug }));
}
