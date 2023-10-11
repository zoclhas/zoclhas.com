import { CollectionConfig } from "payload/types";

export const admins = ({ req: { user } }) => user.canAccessAdmin;

const NewsletterEmails: CollectionConfig = {
  slug: "newsletter-emails",
  access: {
    admin: admins,
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: () => true,
  },
  admin: {
    useAsTitle: "email",
  },
  fields: [
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "unsub",
      label: "Unsubbed",
      type: "checkbox",
      defaultValue: false,
    },
  ],
};

export default NewsletterEmails;
