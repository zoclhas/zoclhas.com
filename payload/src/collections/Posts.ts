import { CollectionConfig } from "payload/types";
import payload from "payload";
import { formatSlug } from "../utils/format";

import { Content } from "../blocks/content";
import { Code } from "../blocks/code";
import { EmailHtml } from "../email";

const Posts: CollectionConfig = {
  access: { read: () => true },
  slug: "posts",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "subtitle",
      label: "Subtitle",
      type: "text",
      required: true,
      admin: {
        position: "sidebar",
      },
    },

    {
      name: "layout",
      label: "Content",
      type: "blocks",
      minRows: 1,
      blocks: [Content, Code],
    },

    {
      name: "slug",
      label: "Post Slug",
      type: "text",
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [formatSlug("title")],
      },
    },
    {
      name: "is_draft",
      label: "Draft",
      type: "checkbox",
      defaultValue: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "send_mail",
      label: "Send mail after save",
      type: "checkbox",
      defaultValue: true,
      admin: {
        position: "sidebar",
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc }) => {
        if (!doc.is_draft && doc.send_mail) {
          const { slug, title, subtitle } = doc;

          const emails = await payload
            .find({
              collection: "newsletter-emails",
              where: {
                and: [
                  {
                    unsub: {
                      equals: false,
                    },
                  },
                ],
              },
              limit: 9999,
            })
            .then((res) => res.docs);

          emails.forEach((email) => {
            const html = EmailHtml({
              slug: slug,
              title: title,
              subtitle: subtitle,
              email: email.email,
              id: email.id,
            });
            payload.sendEmail({
              from: `${process.env.FROM_NAME} <${process.env.FROM_ADDRESS}>`,
              to: email.email,
              subject: `Out now: ${title}`,
              html: html,
            });
          });
        }
      },
    ],
  },
};

export default Posts;
