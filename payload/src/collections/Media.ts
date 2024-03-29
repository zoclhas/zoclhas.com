import { CollectionConfig } from "payload/types";

export type MediaType = {
  filename: string;
  width: number;
  height: number;
  alt: string;
  sizes: {
    card?: {
      filename: string;
      width: number;
      height: number;
    };
    feature?: {
      filename: string;
      width: number;
      height: number;
    };
  };
};

const Media: CollectionConfig = {
  slug: "media",
  access: { read: () => true },
  upload: {
    adminThumbnail: "card",
    imageSizes: [
      {
        name: "card",
        width: 640,
        height: 480,
      },
      {
        name: "feature",
        width: 1024,
        height: 576,
      },
      {
        name: "gallery_card",
        width: 1440,
        height: 810,
      },
    ],
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

export default Media;
