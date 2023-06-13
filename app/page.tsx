import { Hero } from "@/components/sections/hero";

export default function Home() {
    return (
        <>
            <section
                id="hero"
                className="h-screen flex flex-col gap-4 justify-center px-4 items-center"
            >
                <Hero />
            </section>
        </>
    );
}
