interface BlogPostProps {
    title: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    coverImage: string;
    published: boolean;
    author: string;
    authorId: number;
}

export {
    BlogPostProps
}