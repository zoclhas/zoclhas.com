import React from "react";
import { Component as content } from "./rich-text";

const components = { content };

type Props = {
  layout: any;
  className?: string;
};

const RenderBlocks: React.FC<Props> = ({ layout, className }) => (
  <div>
    {layout.map((block: any, i: number) => {
      // @ts-ignore
      const Block: React.FC<any> = components[block.blockType];

      if (block.blockType === "dl") {
        return null;
      }

      if (Block) {
        return (
          <section>
            <Block {...block} />
          </section>
        );
      }

      return null;
    })}
  </div>
);

export default RenderBlocks;
