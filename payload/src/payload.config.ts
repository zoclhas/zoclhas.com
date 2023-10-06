import { buildConfig } from 'payload/config';
import path from 'path';

import collections from './collections'; 

export default buildConfig({
  admin: {
    user: collections.Users.slug,
  },
  collections: [
    collections.Users,
    collections.NewsletterEmails
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});
