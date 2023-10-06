import { CollectionConfig } from 'payload/types';

const NewsletterEmails: CollectionConfig = {
  slug: 'newsletter-emails',
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
    }
  ],
};

export default NewsletterEmails;