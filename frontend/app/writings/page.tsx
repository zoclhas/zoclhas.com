import { Posts } from "./types";
import { Reveal } from "@/components/reveal";
import { LayoutSwitch } from "@/components/min-max";
import { LayoutWrapper } from "@/components/min-max/layout-wrapper";
import { redirect } from "next/navigation";

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
  searchParams: { page: number; message: string };
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
      },
    );

    if (!res.ok) {
      const data: SignUpError = await res.json();
      const errorMessage = data.errors[0].data[0].message;

      if (errorMessage === "Value must be unique") {
        redirect("/writings?message=You+are+already+subscribed.");
      } else {
        redirect(`/writings?message=${errorMessage.split(" ").join("+")}`);
      }
    }

    redirect("/writings?message=Thanks+for+signing+up!");
  };

  const message = searchParams.message;

  return (
    <Reveal className="flex flex-col gap-4">
      {message && message.length > 5 && (
        <div className="mb-4 overflow-hidden rounded-xl bg-[rgb(var(--secondary-rgb),0.1)] p-4">
          {message}
        </div>
      )}
      <div className="flex items-center justify-between gap-2">
        <h1 className="mb-4 text-4xl">Writings</h1>
        <LayoutSwitch />
      </div>
      <div className="mb-4 flex flex-col rounded-xl">
        <h2 className="text-xl">Never miss an update</h2>
        <form
          action={signUp}
          className="max-xs:flex-col flex gap-4"
          method="POST"
        >
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            name="email"
            type="email"
            className="grow rounded-xl bg-[rgb(var(--secondary-rgb),0.1)] p-3"
            placeholder="Enter your email..."
            required
          />
          <button
            type="submit"
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[rgb(var(--secondary-rgb),0.2)] px-6 py-2 text-center transition-colors ease-in hover:bg-[rgb(var(--secondary-rgb),0.1)]"
          >
            Sign Up
          </button>
        </form>
      </div>
      <LayoutWrapper posts={posts} />
    </Reveal>
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
  doc: Doc;
}

export interface Doc {
  id: string;
  email: string;
  unsub: boolean;
  createdAt: string;
  updatedAt: string;
}
