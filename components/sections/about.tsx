export const About = () => {
    const stacks = [
        "JavaScript",
        "TypeScript",
        "Next.js",
        "React",
        "TailwindCSS",
        "CSS",
        "SCSS",
        "Python",
        "Django",
        "Flutter",
    ];

    return (
        <>
            <div className="flex flex-col mt-4">
                <h3>Tech Stack:</h3>
                <div className="flex gap-2">
                    {stacks.map((stack) => (
                        <div
                            className="px-4 py-2 bg-[rgb(var(--secondary-rgb),0.2)] rounded-lg"
                            key={stack}
                        >
                            {stack}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
