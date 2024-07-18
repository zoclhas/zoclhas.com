import { Folder } from "lucide-react";

export const Term: React.FC<TermProps> = ({ command, dir = "~" }) => {
  return (
    <div className="flex items-center gap-2">
      <strong className="font-medium">
        <span className="text-green-800 dark:text-green-500">&lt;zoc</span>@
        <span className="text-green-800 dark:text-green-500">zoch.dev&gt;</span>
      </strong>

      <span className="flex items-center gap-1.5 text-cyan-500">
        <Folder className="size-3" fill="currentColor" />
        {dir}
      </span>

      <span>&gt;===&gt;</span>

      <strong className="font-normal">{command}</strong>
    </div>
  );
};

interface TermProps {
  command: React.ReactNode;
  dir?: string;
}
