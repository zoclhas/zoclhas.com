"use client";

import { Component as content } from "./rich-text";
import { CodeBlock } from "./code";

const components = { content };

type Props = {
  layout: any;
  className?: string;
};

export const RenderBlocks: React.FC<Props> = ({ layout, className }) => {
  return (
    <>
      {layout.map((block: any, i: number) => {
        if (block.blockType === "code_block") {
          return <CodeBlock {...block} key={i} />;
        }

        // @ts-ignore
        const Block: React.FC<any> = components[block.blockType];

        if (Block) {
          return <Block {...block} key={i} />;
        }

        return null;
      })}
    </>
  );
};

export const NormalRenderBlocks = ({
  layout,
}: {
  layout: {
    [k: string]: unknown;
  }[];
}) => {
  return (
    <div>
      {layout.map((block: any, i: number) => {
        // @ts-ignore
        const Block: React.FC<any> = components[block.blockType];

        if (Block) {
          return <Block {...block} key={i} />;
        }

        return null;
      })}
    </div>
  );
};

// export default RenderBlocks;
