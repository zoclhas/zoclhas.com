"use client";

import { CodeBlock } from "./code";
import { Component as content } from "./rich-text";

interface Props {
  layout?:
    | (
        | {
            content?:
              | {
                  [k: string]: unknown;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "content";
          }
        | {
            language:
              | "javascript"
              | "typescript"
              | "html"
              | "css"
              | "python"
              | "rust"
              | "bash"
              | "env";
            show_line_numbers?: boolean | null;
            code: string;
            id?: string | null;
            blockName?: string | null;
            blockType: "code_block";
          }
      )[]
    | null;
}

export const RenderBlocks: React.FC<Props> = ({ layout }) => {
  if (!layout) return null;

  return layout.map((block: any, i: number) => {
    if (block.blockType === "code_block") {
      return <CodeBlock {...block} key={i} />;
    }

    // @ts-ignore
    const Block: React.FC<any> = content;

    if (Block) {
      return <Block {...block} key={i} />;
    }

    return null;
  });
};
