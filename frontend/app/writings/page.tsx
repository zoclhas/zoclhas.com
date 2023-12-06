import { Button } from "@/components/button";
import { Posts, SignUpError } from "@/payload-types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Writings | zoclhas",
  description: "My thoughts here and there.",
};

const getPosts = async (page: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/posts?limit=100&page=${page}&sort=-createdAt&where[or][0][and][0][is_draft][equals]=false`,
    { method: "GET", next: { revalidate: 60 } },
  );

  return res.json();
};

export default async function Writings({
  searchParams,
}: {
  searchParams: { page?: number; message?: string };
}) {
  let page = searchParams.page;
  if (typeof page !== "number") {
    page = 1;
  }
  const posts: Posts = await getPosts(Number(page));

  const signUp = async (formData: FormData) => {
    "use server";

    const email = formData.get("email");
    const bodyFormData = new FormData();
    bodyFormData.append("email", String(email));
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/newsletter-emails`,
      {
        method: "POST",
        body: bodyFormData,
        cache: "no-store",
      },
    );

    if (!res.ok) {
      const data: SignUpError = await res.json();
      const errorMessage = data.errors[0].data[0].message;

      if (errorMessage === "Value must be unique") {
        revalidatePath("/");
        redirect("/writings?message=You+are+already+subscribed.");
      } else {
        revalidatePath("/");
        redirect(`/writings?message=${errorMessage.split(" ").join("+")}`);
      }
    }

    redirect("/writings?message=Thanks+for+signing+up!");
  };

  const message = searchParams.message;

  return (
    <main className="lg:min-h-[70vh]">
      {message && (
        <div className="flex gap-1">
          <aside className="button after:from-priamry-100 after:to-priamry-50 dark:after:from-priamry-300 dark:after:to-priamry-200 dark:text-sand12 before:to-priamry-50 before:from-priamry-300 dark:before:to-priamry-200 dark:before:from-priamry-200 relative w-full justify-start rounded-2xl border p-4 text-start font-medium before:shadow-none">
            {message.split("+").join(" ")}
          </aside>
          <Button href="/writings" isIcon aria-label="Close alert button">
            <Plus className="rotate-45" />
          </Button>
        </div>
      )}

      <ul className="mt-4 flex flex-col gap-6">
        {posts.docs.map((post) => (
          <li key={post.id}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
              <span className="text-sand12/80 dark:text-sand8 font-mono text-lg max-sm:leading-[1.125rem]">
                {post.createdAt.slice(0, 10)}
              </span>
              <Link
                href={"/writings/" + post.slug}
                className="text-lg font-semibold underline max-sm:leading-[1.125rem]"
              >
                {post.title}
              </Link>
            </div>
            <span className="hidden font-mono text-lg max-sm:leading-[1.125rem]">
              {post.createdAt.slice(0, 10)}
            </span>
            <p className="text-sand12/80 dark:text-sand8">{post.subtitle}</p>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col rounded-xl">
        <h2 className="text-lg">Never miss an update</h2>
        <form
          action={signUp}
          className="mt-2 flex gap-1 max-sm:flex-col max-sm:gap-2"
          method="POST"
        >
          <label
            htmlFor="email"
            className="button github-button !shadow-default relative grow !rounded-3xl !p-3"
          >
            <span className="sr-only">Email</span>
            <input
              name="email"
              type="email"
              className="text-sand1 min-w-none grow rounded-lg bg-transparent"
              placeholder="Enter your email..."
              required
            />
          </label>
          <Button type="submit">Sign Up</Button>
        </form>
      </div>
    </main>
  );
}
