import React from "react";
import { Component as content } from "./rich-text";
import { CodeBlock } from "./code";

const components = { content };

type Props = {
  layout: any;
  className?: string;
};

const RenderBlocks: React.FC<Props> = ({ layout, className }) => (
  <div>
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
  </div>
);

export default RenderBlocks;
