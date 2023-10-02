import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";

import { Spotify } from "@/components/spotify";

export default function Home() {
  return (
    <>
      <section
        id="hero"
        className="relative mx-auto flex h-screen max-w-[40rem] flex-col items-center justify-center gap-2 px-4"
        data-scroll-section
      >
        <Hero />
      </section>
      <section id="about" className=" relative" data-scroll-section>
        <div className="mx-auto flex h-screen max-w-[40rem] flex-col items-center justify-center gap-2 px-4">
          <About />
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
        <Projects />
      </section>
      <section
        id="contact"
        className="relative mx-auto flex h-[80vh] max-w-[40rem] flex-col items-center justify-center gap-2 px-4"
        data-scroll-section
      >
        <Contact />
      </section>
    </>
  );
}
