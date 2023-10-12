import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { buildConfig } from "payload/config";
import path from "path";

import collections from "./collections";

export default buildConfig({
  admin: {
    user: collections.Users.slug,
    bundler: webpackBundler(),
  },
  collections: [
    collections.Users,
    collections.NewsletterEmails,
    collections.Posts,
    collections.Media,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI,
  }),
  editor: slateEditor({
    admin: {
      elements: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "textAlign",
        "upload",
        "ol",
        "ul",
        "link",
        "relationship",
        "blockquote",
        "indent",
      ],
      link: {
        fields: [
          {
            name: "rel",
            label: "Rel Attribute",
            type: "select",
            hasMany: true,
            options: ["noopener", "noreferrer", "nofollow"],
          },
          {
            name: "target",
            label: "Target",
            type: "checkbox",
            defaultValue: false,
          },
        ],
      },
    },
  }),
});
