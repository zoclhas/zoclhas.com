import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";

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
            <section
                id="about"
                className="h-screen flex flex-col gap-2 justify-center px-4 items-center max-w-[40rem] mx-auto"
                data-scroll-section
            >
                <About />
            </section>
        </>
    );
}
