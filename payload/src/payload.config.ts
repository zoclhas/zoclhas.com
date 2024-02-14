import { buildConfig } from "payload/config";
import path from "path";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import { webpackBundler } from "@payloadcms/bundler-webpack";

import collections from "./collections";
import About from "./globals/About";
import payload from "payload";

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
    collections.Gallery,
    collections.Media,
  ],
  globals: [About],
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
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI,
  }),
  endpoints: [
    {
      path: "/home",
      method: "get",
      handler: async (req, res, next) => {
        try {
          const posts = await payload.find({
            collection: "posts",
            limit: 2,
            page: 1,
            sort: "-createdAt",
            where: {
              is_draft: {
                equals: false,
              },
            },
          });
          const about = await payload.findGlobal({
            slug: "about",
            draft: false,
            depth: 1,
            locale: undefined,
          });
          const projects = await payload.find({
            collection: "projects",
            limit: 4,
            page: 1,
            sort: "-createdAt",
          });

          res.status(200).json({
            posts,
            about,
            projects,
          });
        } catch (err) {
          console.error(err);
          res
            .status(500)
            .json("Failed to fetch latest posts and about details.");
        }
      },
    },
  ],
});
