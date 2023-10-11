import { Block } from "payload/types";

export type ContentType = {
  blockType: "content";
  blockName?: string;
  content: unknown;
};

export const Content: Block = {
  slug: "content",
  labels: {
    singular: "Content",
    plural: "Content Blocks",
  },
  fields: [
    {
      name: "content",
      type: "richText",
      admin: {
        elements: [
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "textAlign",
          "upload",
          "ol",
          "ul",
          "link",
          "relationship",
          "blockquote",
          "indent",
        ],
        link: {
          fields: [
            {
              name: "rel",
              label: "Rel Attribute",
              type: "select",
              hasMany: true,
              options: ["noopener", "noreferrer", "nofollow"],
            },
            {
              name: "target",
              label: "Target",
              type: "checkbox",
              defaultValue: false,
            },
          ],
        },
      },
    },
  ],
};
