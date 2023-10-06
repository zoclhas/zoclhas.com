// https://payloadcms.com/community-help/discord/use-the-value-from-another-field-inside-a-block

import { useFormFields } from "payload/components/forms";
import CodeField from "payload/dist/admin/components/forms/field-types/Code";
import type { Block, SelectField } from "payload/types";
import { createElement } from "react";
import type { Entries } from "type-fest";

const LANGUAGES = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  html: "HTML",
  css: "CSS",
  python: "Python",
  rust: "Rust",
  bash: "Bash",
};

export const Code: Block = {
  slug: "code_block",
  labels: {
    singular: "Code Block",
    plural: "Code Blocks",
  },
  fields: [
    {
      name: "language",
      options: (Object.entries(LANGUAGES) as Entries<typeof LANGUAGES>).map(
        ([key, value]) => ({
          label: value,
          value: key,
        }),
      ),
      required: true,
      type: "select",
    },
    {
      name: "code",
      required: true,
      type: "code",
      admin: {
        components: {
          Field(field: SelectField & { path?: string }) {
            const language = useFormFields(
              ([fields]) =>
                fields[`${field.path?.replace("code", "language")}`],
            );
            const value = language.value as keyof typeof LANGUAGES;

            if (LANGUAGES[value] === undefined) {
              return null;
            }

            return createElement(CodeField, {
              admin: {
                language: value,
              },
              name: field.name,
              path: field.path,
            });
          },
        },
        language: "typescript",
        editorOptions: {
          autoIndent: "advanced",
          autoClosingBrackets: "always",
          smoothScrolling: true,
          cursorSmoothCaretAnimation: "on",
        },
      },
    },
  ],
};
