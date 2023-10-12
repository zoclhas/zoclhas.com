import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import {
  BlocksFeature,
  LinkFeature,
  UploadFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { buildConfig } from "payload/config";
import path from "path";

import collections from "./collections";
import { Code } from "./blocks/code";

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

  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      LinkFeature({
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
      }),
      UploadFeature({
        collections: {
          uploads: {
            fields: [
              {
                name: "alt",
                label: "Caption",
                type: "text",
              },
            ],
          },
        },
      }),
      BlocksFeature({
        blocks: [Code],
      }),
    ],
  }),
});
