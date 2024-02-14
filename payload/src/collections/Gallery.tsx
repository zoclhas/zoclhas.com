import { CollectionConfig } from "payload/types";

const Gallery: CollectionConfig = {
  slug: "gallery",
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
      relationTo: "media",
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
      required: true,
      admin: {
        position: "sidebar",
      },
    },
  ],
};

export default Gallery;
