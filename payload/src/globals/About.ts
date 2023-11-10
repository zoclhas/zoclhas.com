import { GlobalConfig } from "payload/types";

const About: GlobalConfig = {
  access: { read: () => true },
  slug: "about",
  fields: [
    {
      name: "content",
      type: "richText",
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
