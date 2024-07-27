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
      <Term command="cat message.md" dir="404-not-found" />
      <strong className="mt-0.5 block">
        <span className="opacity-50">**</span>
        404 Not Found
        <span className="opacity-50">**</span>
      </strong>
      <p>Could not find requested resource.</p>
      <Link href="/" className="group">
        <span className="opacity-40">[</span>
        <span>
          <strong className="underline">Return Home</strong>
        </span>
        <span className="opacity-40">]</span>
        <span className="opacity-0 max-sm:hidden sm:group-hover:opacity-50">
          <span className="opacity-40">(</span>
          <span className="underline decoration-wavy">/</span>
          <span className="opacity-40">)</span>
        </span>
      </Link>
    </section>
  );
}
