import { CollectionConfig } from "payload/types";
import payload from "payload";
import { formatSlug } from "../utils/format";

import { Content } from "../blocks/content";
import { Code } from "../blocks/code";

const Projects: CollectionConfig = {
  access: { read: () => true },
  slug: "projects",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "subtitle",
      label: "Subtitle",
      type: "text",
      required: true,
      admin: {
        position: "sidebar",
      },
    },

    {
      name: "stacks",
      label: "Stacks",
      type: "array",
      minRows: 1,
      fields: [
        {
          name: "stack",
          label: "Stack",
          type: "text",
          required: true,
        },
      ],
      required: true,
    },

    {
      name: "layout",
      label: "Content",
      type: "blocks",
      minRows: 1,
      blocks: [Content, Code],
    },

    {
      name: "slug",
      label: "Project Slug",
      type: "text",
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [formatSlug("title")],
      },
    },
    {
      name: "is_draft",
      label: "Draft",
      type: "checkbox",
      defaultValue: true,
      admin: {
        position: "sidebar",
      },
    },
  ],
};

export default Projects;
