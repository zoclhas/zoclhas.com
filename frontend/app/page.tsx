import { Term } from "@/components/ui/term";
import { Fingerprint, Layers, User } from "lucide-react";
import Image from "next/image";
import { HomeProps } from "@/payload-types";

async function getHomeData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/home`, {
    next: { revalidate: 60 },
  });

  return res.json();
}

export default async function Home() {
  const { about, posts, projects }: HomeProps = await getHomeData();

  return (
    <section>
      <div>
        <Term command="whoami" />
        <p>
          <strong className="mr-2 font-medium text-purple-600">
            <User className="mr-1 inline size-4" fill="currentColor" />
            User:
          </strong>
          Zoclhas
        </p>
        <p>
          <strong className="mr-2 font-medium text-red-600">
            <Fingerprint className="mr-1 inline size-4" />
            About:
          </strong>
          A undergard computer science student, doing web dev (freelancing) and
          material stuff (
          <a
            href="https://zaura.net"
            className="text-[#a94d4a] underline decoration-wavy"
          >
            zaura.net
          </a>
          ).
        </p>
        <p>
          <strong className="mr-2 font-medium text-pink-700 dark:text-pink-500">
            <Layers className="mr-1 inline size-4" fill="currentColor" />
            Stack(s):
          </strong>
          {about.tech.map((t, i) => (
            <>
              {t}
              {i + 1 < about.tech.length ? " | " : ""}
            </>
          ))}
        </p>
      </div>
    </section>
  );
}
