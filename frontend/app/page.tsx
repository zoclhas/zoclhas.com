import { Term } from "@/components/ui/term";
import { Fingerprint, Layers, User } from "lucide-react";
import Image from "next/image";
import { HomeProps } from "@/payload-types";
import { PostCard } from "@/components/ui/post-card";
import React from "react";

async function getHomeData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/home`, {
    next: { revalidate: 60 },
  });

  return res.json();
}

export default async function Home() {
  const { about, posts, projects }: HomeProps = await getHomeData();

  return (
    <>
      <section>
        <Term command="whoami" />
        <div className="mt-0.5">
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
            A undergard computer science student, doing web dev (freelancing)
            and material stuff (
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
              <React.Fragment key={t}>
                {t}
                {i + 1 < about.tech.length ? " | " : ""}
              </React.Fragment>
            ))}
          </p>
        </div>
      </section>

      <section className="mt-4">
        <Term command="ls -a recent-writes/" />
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
