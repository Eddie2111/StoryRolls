interface BlogPostProps {
  title?: string;
  body?: JSON | string | null | undefined;
  category?: string;
  tags?: string;
  createdAt?: Date;
  updatedAt?: Date;
  published?: boolean;
  author?: string;
  authorId?: number;
  userID?: number;
  data?: {
    title?: string;
    body?: JSON | string | null | undefined;
    category?: string;
    tags?: string;
    createdAt?: Date;
    updatedAt?: Date;
    published?: boolean;
    author?: string;
    authorId?: number;
    userID?: number;
  };
}

export {BlogPostProps};
