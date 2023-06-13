import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";

import { Spotify } from "@/components/spotify";

export default function Home() {
    return (
        <>
            <section
                id="hero"
                className="h-screen flex flex-col gap-2 justify-center px-4 items-center max-w-[40rem] mx-auto relative"
                data-scroll-section
            >
                <Hero />
            </section>
            <section id="about" className=" relative" data-scroll-section>
                <div className="h-screen flex flex-col gap-2 justify-center px-4 items-center max-w-[40rem] mx-auto">
                    <About />
                </div>
                <div className="absolute bottom-4 right-4 max-md:relative max-md:bottom-0 max-md:right-0 max-md:hidden">
                    <Spotify />
                </div>
            </section>
            <section
                id="projects"
                className="min-h-screen flex flex-col gap-2 justify-center px-4 items-center max-w-[40rem] mx-auto relative"
                data-scroll-section
            ></section>
        </>
    );
}
