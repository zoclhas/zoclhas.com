import { CollectionConfig } from "payload/types";
import { formatSlug } from "../utils/format";
import { Content } from "../blocks/content";

const Posts: CollectionConfig = {
  slug: "posts",
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
      name: "layout",
      label: "Content",
      type: "blocks",
      minRows: 1,
      blocks: [Content],
    },
    
    {
      name: "slug",
      label: "Post Slug",
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
}

export default Posts;