import { WavyText } from "../wavy-text";

export const Hero = () => {
    return (
        <>
            <WavyText
                text="zoclhas"
                replay={true}
                className="text-[clamp(2rem,8vw,20rem)] uppercase"
                delay={1.5}
            />
        </>
    );
};
