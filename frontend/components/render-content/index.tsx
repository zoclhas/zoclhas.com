"use client";

import React, { useRef } from "react";
import useReadingTime from "use-reading-time";
import { Component as content } from "./rich-text";
import { CodeBlock } from "./code";

const components = { content };

type Props = {
  layout: any;
  className?: string;
  date: string;
};

const RenderBlocks: React.FC<Props> = ({ layout, className, date }) => {
  const post = useRef(null);
  const { readingTime } = useReadingTime(post, 220);

  return (
    <div ref={post}>
      <div className="flex justify-between font-bold text-[rgb(var(--secondary-rgb),0.8)]">
        {date.slice(0, 10)}

        <span>{readingTime} minutes</span>
      </div>

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
};

export const NormalRenderBlocks = ({
  layout,
}: {
  layout: {
    [k: string]: unknown;
  }[];
}) => {
  console.log(layout.map((block) => console.log(block)));
  return (
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
};

export default RenderBlocks;
