import { Button } from "@/components/button";
import { Discord, GitHub, Twitter } from "@/components/icons";
import Image from "next/image";

export default function Home() {
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
                href="https://github.com/zoclhas"
                target="_blank"
                isIcon
                className="twitter-button"
                aria-label="Zoclhas's GitHub profile button"
              >
                <Twitter />
              </Button>
              <Button
                href="https://github.com/zoclhas"
                target="_blank"
                isIcon
                className="discord-button"
                aria-label="Zoclhas's GitHub profile button"
              >
                <Discord />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
