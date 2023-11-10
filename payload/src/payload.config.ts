import { buildConfig } from "payload/config";
import path from "path";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import { webpackBundler } from "@payloadcms/bundler-webpack";

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
    collections.Projects,
    collections.Media,
  ],
  editor: slateEditor({}),
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI,
  }),
});
