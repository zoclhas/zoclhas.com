import { UnsubError } from "@/payload-types";
import { redirect } from "next/navigation";
import { Button } from "@/components/button";
import { Check, Plus } from "lucide-react";

export default async function UnSub({
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
    <main className="flex min-h-[75vh] flex-col items-center justify-center gap-8">
      {message && (
        <div className="flex gap-1">
          <aside className="button after:from-priamry-100 after:to-priamry-50 dark:after:from-priamry-300 dark:after:to-priamry-200 dark:text-sand12 before:to-priamry-50 before:from-priamry-300 dark:before:to-priamry-200 dark:before:from-priamry-200 relative w-full justify-start rounded-2xl border p-4 text-start font-medium before:shadow-none">
            {message.split("+").join(" ")}
          </aside>
          <Button href="/" isIcon aria-label="Close alert button">
            <Plus className="rotate-45" />
          </Button>
        </div>
      )}
      <form
        action={unsub}
        method="PATCH"
        className="flex items-center max-sm:flex-col"
      >
        <h1 className="group relative max-w-[458px] flex-col gap-4 rounded-2xl bg-[rgb(var(--secondary-rgb),0.1)] p-4 text-2xl">
          Are you sure you want to unsubcribe?
        </h1>
        <div className="mt-4 flex justify-end">
          <Button type="submit" aria-label="Confirm">
            <Check className="stroke-sand1" />
          </Button>
        </div>
      </form>
    </main>
  );
}
