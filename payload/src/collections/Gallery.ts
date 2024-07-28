import { CollectionConfig } from "payload/types";
import { formatSlug } from "../utils/format";

const Gallery: CollectionConfig = {
  slug: "gallery",
  access: { read: () => true },
  labels: {
    singular: "Gallery",
    plural: "Gallery",
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "image",
      type: "relationship",
      relationTo: "gallery-media",
      required: true,
    },
    {
      name: "alterantes",
      type: "array",
      fields: [
        {
          name: "alterante",
          type: "relationship",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "alt",
      type: "text",
      required: true,
    },

    {
      name: "title",
      type: "text",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "description",
      type: "richText",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "slug",
      type: "text",
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [formatSlug("title")],
      },
    },
  ],
};

export default Gallery;
