import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";

import { Spotify } from "@/components/spotify";

import type { Metadata } from "next";
import { HomeProps } from "@/payload-types";
export const metadata: Metadata = {
  metadataBase: new URL("https://zoclhas.com"),
  openGraph: {
    images: "/meta-img.png",
  },
};

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
      <section
        id="hero"
        className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-[40rem] flex-col items-center justify-center gap-2 px-4"
        data-scroll-section
      >
        <Hero />
      </section>
      <section id="about" className=" relative" data-scroll-section>
        <div className="mx-auto flex min-h-screen max-w-[40rem] flex-col items-center justify-center gap-2 px-4">
          <About about={about} posts={posts} />
        </div>
        <div className="absolute bottom-4 right-4 max-md:relative max-md:bottom-0 max-md:right-0 max-md:hidden">
          <Spotify />
        </div>
      </section>
      <section
        id="projects"
        className="relative px-4 py-20 max-md:py-6"
        data-scroll-section
      >
        <Projects projects={projects} />
      </section>
      <section
        id="contact"
        className="relative mx-auto flex h-[80vh] max-w-[40rem] flex-col items-center justify-center gap-2 px-4"
        data-scroll-section
      >
        <Contact />
      </section>
    </main>
  );
}
