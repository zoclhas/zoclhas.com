import { FieldHook } from "payload/types";

const formatPageSlug = (val: string): string =>
  val
    .replace(/ /g, "-")
    .replace(/[^\w-/]+/g, "")
    .toLowerCase();

export const formatSlug =
  (fallback: string): FieldHook =>
  ({ value, originalDoc, data }) => {
    if (typeof value === "string") {
      return formatPageSlug(value);
    }
    const fallbackData =
      (data && data[fallback]) || (originalDoc && originalDoc[fallback]);

    if (fallbackData && typeof fallbackData === "string") {
      return formatPageSlug(fallbackData);
    }

    return value;
  };