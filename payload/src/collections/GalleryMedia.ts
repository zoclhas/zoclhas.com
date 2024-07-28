import { CollectionConfig } from "payload/types";

const GalleryMedia: CollectionConfig = {
  slug: "gallery-media",
  access: { read: () => true },
  upload: {
    adminThumbnail: "card",
    imageSizes: [
      {
        name: "card",
        width: 640,
        height: 480,
        formatOptions: {
          format: "jpg",
        },
      },
      {
        name: "feature",
        width: 1024,
        height: 576,
        formatOptions: {
          format: "jpg",
        },
      },
      {
        name: "gallery_card",
        width: 1440,
        height: 810,
        formatOptions: {
          format: "jpg",
        },
      },
    ],
    formatOptions: {
      format: "jpg",
    },
  },
  fields: [
    {
      name: "alt",
      label: "Alt Text",
      type: "text",
      required: true,
    },
  ],
};

export default GalleryMedia;
