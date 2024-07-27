import { Folder } from "lucide-react";

export const Term: React.FC<TermProps> = ({ command, dir = "~" }) => {
  return (
    <div>
      <strong className="inline font-medium">
        <span className="text-green-800 dark:text-green-500">&lt;zoc</span>@
        <span className="text-green-800 dark:text-green-500">zoch.dev&gt;</span>
      </strong>{" "}
      <span className="inline-flex items-center gap-1.5 text-cyan-500">
        <Folder className="size-3" fill="currentColor" />
        {dir}
      </span>{" "}
      <span className="inline">&gt;===&gt;</span>{" "}
      <strong className="inline font-normal">{command}</strong>
    </div>
  );
};

interface TermProps {
  command: React.ReactNode;
  dir?: string;
}
