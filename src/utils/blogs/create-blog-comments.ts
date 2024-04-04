"use server";
import { GetUserByCookie } from "@/utils/users/getUser";
import Prisma from "@/lib/prisma";

interface BlogCommentProps {
    body: string;
    blogPostId: number;
}

export async function CreateBlogComments(data: BlogCommentProps) {
    try {
        const user = await GetUserByCookie();

        const dataset = {
            id: 1,
            body: data.body || " ",
            authorId: user?.data?.id || 0,
            blogPostId: data.blogPostId,
        };
        const response = await Prisma.blogComments.create({ data: dataset });
        console.log(response);
        return dataset;
    } catch (err) {
        return {
            data: null,
        };
    }
}
