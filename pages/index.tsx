import { Hero } from "@/components/sections/hero";

export default function Home() {
    return (
        <>
            <section
                id="hero"
                className="h-screen flex flex-col gap-2 justify-center px-4 items-center max-w-[40rem] mx-auto"
                data-scroll-section
            >
                <Hero />
            </section>
        </>
    );
}
