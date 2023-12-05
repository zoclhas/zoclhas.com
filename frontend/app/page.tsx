import { Button } from "@/components/button";
import { Discord, GitHub, Twitter } from "@/components/icons";
import { NormalRenderBlocks } from "@/components/render-content";

import { HomeProps } from "@/payload-types";

const getPosts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/home`, {
    method: "GET",
    next: { revalidate: 60 },
  });

  return res.json();
};

export default async function Home() {
  const { about, posts, projects }: HomeProps = await getPosts();

  return (
    <main>
      <section id="hero" className="flex justify-center pt-12 sm:pt-32">
        <div>
          <span className="block text-lg leading-[1.125rem]">Hi, I&apos;m</span>
          <h1 className="text-[clamp(4rem,6vw,15rem)] uppercase leading-[clamp(4rem,6vw,15rem)]">
            Zoclhas
          </h1>
          <h2 className="text-center">Web Dev | Material Artist</h2>
          <div className="mt-8 flex items-center justify-between">
            <Button href="/writings">Writings</Button>
            <div className="flex items-center gap-2">
              <Button
                href="https://github.com/zoclhas"
                target="_blank"
                isIcon
                className="github-button"
                aria-label="Zoclhas's GitHub profile button"
              >
                <GitHub />
              </Button>
              <Button
                href="https://twitter.com/zoclhas"
                target="_blank"
                isIcon
                className="twitter-button"
                aria-label="Zoclhas's Twitter profile button"
              >
                <Twitter />
              </Button>
              <Button
                href="https://discord.com/users/301347642682900481"
                target="_blank"
                isIcon
                className="discord-button"
                aria-label="Zoclhas's Discord profile button"
              >
                <Discord />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="mt-32">
        <h1 className="text-3xl font-semibold">About</h1>
        <div className="mt-4 text-xl">
          <NormalRenderBlocks layout={about.content} />
        </div>
        <h3 className="mt-4 text-xl font-medium">Technologies:</h3>
        <ul className="mt-1 flex flex-wrap gap-1">
          {about.tech.map((t, i) => (
            <li
              key={i}
              className="flex grow items-center justify-center rounded-md bg-gradient-to-b from-gray-100 to-gray-200/70 px-4 py-2 text-center dark:from-gray-900 dark:to-gray-900/50"
            >
              {t}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
