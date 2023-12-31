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
      type: "textarea",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "link",
      label: "Link",
      type: "text",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "git_link",
      label: "GitHub Repo",
      type: "text",
      admin: {
        position: "sidebar",
      },
    },

    {
      name: "layout",
      label: "Content",
      type: "blocks",
      minRows: 1,
      blocks: [Content, Code],
    },
    {
      name: "stacks",
      label: "Stacks",
      type: "json",
      required: true,
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

    {
      name: "meta",
      label: "Meta",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "desc",
          type: "textarea",
          required: true,
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};

export default Projects;
