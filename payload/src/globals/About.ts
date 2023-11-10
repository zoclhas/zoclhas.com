import { GlobalConfig } from "payload/types";
import { Content } from "../blocks/content";

const About: GlobalConfig = {
  access: { read: () => true },
  slug: "about",
  fields: [
    {
      name: "content",
      type: "blocks",
      blocks: [Content],
      required: true,
    },
    {
      name: "tech",
      type: "json",
      required: true,
    },
  ],
};

export default About;
