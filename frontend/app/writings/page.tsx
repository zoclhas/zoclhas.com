import { PostCard } from "@/components/ui/post-card";
import { Term } from "@/components/ui/term";
import { meta } from "@/lib/meta";
import { cn } from "@/lib/utils";
import { Doc, Post } from "@/payload-types";
import { redirect } from "next/navigation";
import { Form } from "./form";

export const metadata = meta({
  title: "Writings",
  description: "Some things I write.",
});

async function getPosts(page: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/posts?limit=100&page=${page}&sort=-createdAt&where[or][0][and][0][is_draft][equals]=false`,
    { next: { revalidate: 60 } },
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  const data: Doc<Post> = await res.json();

  if (!data.totalDocs) redirect("/writings");

  return data;
}

export default async function Writings({
  searchParams,
}: {
  searchParams: { page?: string; message?: string; error?: string };
}) {
  let page = searchParams.page ?? "1";
  const posts = await getPosts(Number(page));

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
        redirect("/writings?message=You+are+already+subscribed.");
      } else {
        redirect(
          `/writings?message=${errorMessage.split(" ").join("+")}&error=true`,
        );
      }
    }

    redirect("/writings?message=Thanks+for+signing+up!");
  };

  return (
    <>
      <section>
        <Term command="./sign_up.sh" dir="writings" />
        <form action={signUp} className="mt-0.5 flex gap-1">
          <Form disabled={!!searchParams.message && !searchParams.error} />
        </form>
        {searchParams.message && (
          <strong
            className={cn(
              "text-green-600 dark:text-green-400",
              searchParams.error && "text-red-600 dark:text-red-400",
            )}
          >
            {searchParams.message}
          </strong>
        )}
      </section>

      <section className="mt-4">
        <Term command="ls -a" dir="writings" />

        <ul className="mt-0.5">
          {posts.docs.map((p) => (
            <li key={p.id}>
              <PostCard {...p} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

interface SignUpError {
  errors: Error[];
}

export interface Error {
  name: string;
  message: string;
  data: Daum[];
}

export interface Daum {
  message: string;
  field: string;
}

export interface SignUpSuccess {
  message: string;
  doc: SignUpDoc;
}

export interface SignUpDoc {
  id: string;
  email: string;
  unsub: boolean;
  createdAt: string;
  updatedAt: string;
}
