"use client";

import { formatDate } from "@/lib/utils";
import { Post } from "@/payload-types";
import * as Tooltip from "@radix-ui/react-tooltip";
import Link from "next/link";

export const PostCard = (props: Post) => {
  const { title, slug, subtitle, createdAt } = props;
  const date = formatDate(createdAt);

  return (
    <Link href={`/writings/${slug}`} className="group">
      <strong className="font-medium text-emerald-900 dark:text-emerald-200">
        {date}
      </strong>{" "}
      <strong className="font-semibold decoration-wavy group-hover:underline">
        {title}
      </strong>{" "}
      <Tooltip.Provider delayDuration={0}>
        <Tooltip.Root>
          <Tooltip.Trigger className="max-sm:hidden">
            <span className="text-blue-800 opacity-50 dark:text-blue-300">
              (sub)
            </span>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className="border border-neutral-900 bg-amber-100 p-1 text-xs dark:border-amber-100 dark:bg-neutral-900"
              sideOffset={-1}
            >
              {subtitle}
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </Link>
  );
};
