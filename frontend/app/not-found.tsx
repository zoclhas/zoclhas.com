import { Term } from "@/components/ui/term";
import { meta } from "@/lib/meta";
import Link from "next/link";

export const metadata = meta({
  title: "Not Found",
  description: "It is missing :(",
});

export default function NotFound() {
  return (
    <section>
      <Term
        command={
          <Link href="/projects" className="underline">
            cd ..
          </Link>
        }
        dir="404-not-found"
      />
      <strong className="mt-0.5 block">404 Not Found</strong>
      <p>Could not find requested resource</p>
      <Link href="/" className="underline decoration-wavy">
        Return Home
      </Link>
    </section>
  );
}
