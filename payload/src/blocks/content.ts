import {Block} from 'payload/types';

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
        link: {
          fields: [
            {
              name: "rel",
              label: "Rel Attribute",
              type: "select",
              hasMany: true,
              options: ["noopener", "noreferrer", "nofollow"],
            },
          ],
        },
      },
    },
  ],
};