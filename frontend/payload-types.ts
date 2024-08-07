/* tslint:disable */
/* eslint-disable */

export interface Config {
  collections: {
    users: User;
    "newsletter-emails": NewsletterEmail;
    posts: Post;
    projects: Project;
    media: Media;
    "payload-preferences": PayloadPreference;
    "payload-migrations": PayloadMigration;
  };
  globals: {
    about: About;
  };
}
export interface User {
  id: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}
export interface NewsletterEmail {
  id: string;
  email: string;
  unsub?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
export interface Post {
  id: string;
  title: string;
  subtitle: string;
  layout?:
    | (
        | {
            content?:
              | {
                  [k: string]: unknown;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "content";
          }
        | {
            language:
              | "javascript"
              | "typescript"
              | "html"
              | "css"
              | "python"
              | "rust"
              | "bash"
              | "env";
            show_line_numbers?: boolean | null;
            code: string;
            id?: string | null;
            blockName?: string | null;
            blockType: "code_block";
          }
      )[]
    | null;
  slug?: string | null;
  is_draft?: boolean | null;
  send_mail?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  link: string;
  git_link?: string;
  stacks: string[];
  layout?:
    | (
        | {
            content?:
              | {
                  [k: string]: unknown;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "content";
          }
        | {
            language:
              | "javascript"
              | "typescript"
              | "html"
              | "css"
              | "python"
              | "rust"
              | "bash"
              | "env";
            show_line_numbers?: boolean | null;
            code: string;
            id?: string | null;
            blockName?: string | null;
            blockType: "code_block";
          }
      )[]
    | null;
  slug?: string;
  is_draft?: boolean | null;
  meta: {
    title: string;
    desc: string;
    image: Media;
  };
  updatedAt: string;
  createdAt: string;
}
export interface Media {
  id: string;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width: number;
  height: number;
  sizes?: {
    card?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    feature?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    gallery_card?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: "users";
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
export interface About {
  id: string;
  content: {
    [k: string]: unknown;
  }[];
  tech: string[];
  updatedAt?: string | null;
  createdAt?: string | null;
}
export interface Gallery {
  id: string;
  image: Media;
  alterantes?: { id: string; alterante: Media }[];
  alt: string;
  title: string;
  description: {
    [k: string]: unknown;
  }[];
  slug?: string;
  updatedAt: string;
  createdAt: string;
}

export interface HomeProps {
  about: About;
  posts: {
    docs: Post[];
  };
  projects: {
    docs: Project[];
  };
}

export interface Doc<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: any;
  nextPage: any;
}
