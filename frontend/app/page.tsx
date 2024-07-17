import { Term } from "@/components/ui/term";
import Image from "next/image";

export default function Home() {
  return (
    <section className="h-full">
      <div>
        <Term command="whoami" />
      </div>
    </section>
  );
}
