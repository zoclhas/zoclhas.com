import { Check } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Unsub({
  searchParams,
}: {
  searchParams: { uid: string; message: string };
}) {
  const uid = searchParams.uid;
  const message = searchParams.message;
  if (!uid) {
    redirect("/");
  }

  const unsub = async () => {
    "use server";

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/newsletter-emails/${uid}`,
      {
        method: "PATCH",
        body: JSON.stringify({ unsub: true }),
        cache: "no-store",
      },
    );

    if (!res.ok) {
      const data: UnsubError = await res.json();
      try {
        const errorMessage = data.errors[0].data[0].message
          .split(" ")
          .join("+");
        redirect(`/unsub?uid=${uid}&message=${errorMessage}`);
      } catch {
        const errorMessage = data.errors[0].message.split(" ").join("+");
        redirect(`/unsub?uid=${uid}&message=${errorMessage}`);
      }
    }

    redirect(`/unsub?uid=${uid}&message=You+have+been+unsubscribed.`);
  };

  return (
    <section className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center gap-8 ">
      {message && message.length > 5 && (
        <div className="mb-4 w-full max-w-[458px] overflow-hidden rounded-xl bg-[rgb(var(--secondary-rgb),0.1)] p-4">
          {message}
        </div>
      )}
      <form action={unsub} method="PATCH">
        <h1 className="group relative max-w-[458px] flex-col gap-4 rounded-2xl bg-[rgb(var(--secondary-rgb),0.1)] p-4 text-2xl">
          Are you sure you want to unsubcribe?
        </h1>
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[rgb(var(--secondary-rgb),0.2)] px-6 py-2 text-center transition-colors ease-in hover:bg-[rgb(var(--secondary-rgb),0.1)]"
            aria-label="Confirm"
          >
            <Check />
          </button>
        </div>
      </form>
    </section>
  );
}

interface UnsubError {
  errors: Error[];
}

interface Error {
  name: string;
  message: string;
  data: Daum[];
}

interface Daum {
  message: string;
  field: string;
}

interface UnsubSuccess {
  message: string;
  doc: Doc;
}

interface Doc {
  id: string;
  email: string;
  unsub: boolean;
  createdAt: string;
  updatedAt: string;
}
