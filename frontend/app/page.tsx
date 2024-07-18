import { PostCard } from "@/components/ui/post-card";
import { Term } from "@/components/ui/term";
import { DiscordIcon, GitHubIcon, TwitterIcon } from "@/lib/icons";
import { HomeProps } from "@/payload-types";
import { Fingerprint, Layers, User } from "lucide-react";
import Link from "next/link";
import React from "react";

async function getHomeData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/home`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch data");

  return res.json();
}

export default async function Home() {
  const { about, posts }: HomeProps = await getHomeData();
  const links: { l: string; h: string }[] = [
    {
      l: "gallery/",
      h: "/gallery",
    },
    {
      l: "projects/",
      h: "/projects",
    },
    {
      l: "writings/",
      h: "/writings",
    },
  ];

  const socials: Social[] = [
    {
      social: "GitHub",
      href: "https://github.com/zoclhas",
      className: "text-neutral-800 dark:text-neutral-200",
      icon: GitHubIcon,
    },
    {
      social: "Twitter",
      href: "https://twitter.com/zoclhas",
      className: "text-sky-600 dark:text-sky-400",
      icon: TwitterIcon,
    },
    {
      social: "Discord",
      href: "https://discord.com/users/301347642682900481",
      className: "text-indigo-600 dark:text-indigo-400",
      icon: DiscordIcon,
    },
  ];

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
              target="_blank"
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
        <Term command="ls links/" />
        <ul className="mt-0.5 grid grid-cols-3 gap-2">
          {links.map((l) => (
            <li key={l.h}>
              <Link
                href={l.h}
                className="font-medium text-sky-700 underline dark:text-sky-300"
              >
                {l.l}
              </Link>
            </li>
          ))}
        </ul>
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

      <section className="mt-4">
        <Term command="cat socials.md" />
        <ul className="mt-0.5">
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.href} className="group w-max">
                <div className="relative inline">
                  <span className="font-bold group-hover:opacity-0">
                    &#183;
                  </span>
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100">
                    -
                  </span>
                </div>{" "}
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className={s.className}
                >
                  <span className="opacity-40">[</span>
                  <span>
                    <Icon className="inline size-4" />{" "}
                    <strong className="underline">{s.social}</strong>
                  </span>
                  <span className="opacity-40">]</span>
                  <span className="opacity-0 max-sm:hidden sm:group-hover:opacity-50">
                    <span className="opacity-40">(</span>
                    <span className="underline decoration-wavy">{s.href}</span>
                    <span className="opacity-40">)</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

interface Social {
  social: string;
  href: string;
  className: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}
