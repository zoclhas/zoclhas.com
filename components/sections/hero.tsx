import { WavyText } from "../wavy-text";

export const Hero = () => {
    return (
        <>
            <div>
                <p>Hi, I'm</p>
                <WavyText
                    text="zoclhas"
                    replay={true}
                    className="text-[clamp(4.5rem,8vw,20rem)] uppercase leading-[clamp(4.5rem,8vw,20rem)]"
                    delay={1.5}
                />
            </div>
        </>
    );
};
