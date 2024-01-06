interface BlogPostProps {
    title?: string;
    body?: string;
    category?: string;
    tags?: string;
    createdAt?: Date;
    updatedAt?: Date;
    published?: boolean;
    author?: string;
    authorId?: number;
    userID?: number;
}

export {
    BlogPostProps
}