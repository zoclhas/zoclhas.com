"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus as theme } from "react-syntax-highlighter/dist/esm/styles/prism";

export const CodeBlock = (props: any) => {
  const { language, code, id, show_line_numbers }: CodeBlockProps = props;
  return (
    <SyntaxHighlighter
      language={language}
      style={theme}
      showLineNumbers={show_line_numbers}
      lineProps={{ style: { wordBreak: "break-all", whiteSpace: "pre-wrap" } }}
      wrapLines={true}
      lineNumberStyle={{ minWidth: "2rem" }}
    >
      {code}
    </SyntaxHighlighter>
  );
};
interface CodeBlockProps {
  language:
    | "typescript"
    | "javascript"
    | "html"
    | "css"
    | "python"
    | "rust"
    | "bash";
  code: string;
  id: string;
  show_line_numbers: boolean;
}
