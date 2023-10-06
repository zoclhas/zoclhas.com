export interface Posts {
  docs: Post[];
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

export interface Post {
  id: string;
  title: string;
  subtitle: string;
  layout?: {
    content?: {
      [k: string]: unknown;
    }[];
    id?: string;
    blockName?: string;
    blockType: "content";
  }[];
  slug?: string;
  is_draft?: boolean;
  updatedAt: string;
  createdAt: string;
}
