import CommentBox from "@/components/comment/single-comment";

import { getBlogByID } from "@/utils/blogs/getBlogs";
import { GetUserbyID } from "@/utils/users/getUser";

// Return types
import type { Metadata, ResolvingMetadata } from "next";
import { ReturnProps } from "@/types/BlogPost.d";
import { BlogPost, User } from "@prisma/client";

interface GetUserProps {
    data?: {
        id: number;
        name: string;
        email: string;
    } | null;
    message: string;
    error: string;
}

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const id = params.blog;
    const blog: ReturnProps = await getBlogByID(params.blog);
    return {
        title: blog?.data?.title || "Storyrolls on your Journey",
        description: blog?.data?.title || "Storyrolls on your Journey",
    };
}

export default async function Page({ params }: { params: { blog: string } }) {
    const blog: ReturnProps = await getBlogByID(params.blog);
    const author: GetUserProps = await GetUserbyID(blog?.data?.userID || 0);
    const blogBody = blog?.data?.body || "";
    const authorName = author?.data?.name || "";
    const convertedBody = blogBody.toString() || "";
    const date = new Date(blog?.data?.createdAt || "");
    const splittedDate = date.toDateString() || "Sun Jan 0 2020";
    if (!blog) return <div>loading</div>;
    if (!blog.data) return <div>No Blogs Found</div>;
    return (
        <div className="container mx-auto my-10">
            <h1 className="text-3xl font-bold">{blog.data.title}</h1>
            <div className="my-10">
                <p className="text-gray-500 dark:text-gray-400 text-right">
                    Written by: <span className="text-bold text-black">{authorName}</span>
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-right">
                    Published At: <span className="text-bold text-black">{splittedDate || " "}</span>
                </p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: convertedBody || "" }}></div>
            <div className="my-10">
                Keywords: <span className="text-bold text-black font-bold">{blog?.data?.tags || " "}</span>
            </div>
            <div className="mt-10">
                <CommentBox />
            </div>
        </div>
    );
}
