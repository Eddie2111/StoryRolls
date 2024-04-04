import { BlogPost } from "@prisma/client";

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
interface GetBlogsProps {
    data?: BlogPost[] | null;
    message: string;
    error: string;
}
interface CategoriesProps {
    message: string;
    error: string;
    data: { category: string }[] | null;
}
interface CategoriesDataProps {
    category: string;
}
interface ManyReturnProps {
    message: string;
    error: string;
    data: BlogPost[] | null;
}
interface ReturnProps {
    message: string;
    error: string;
    data: BlogPost | null;
}

export { BlogPostProps, GetBlogsProps, CategoriesProps, CategoriesDataProps, ManyReturnProps, ReturnProps };
