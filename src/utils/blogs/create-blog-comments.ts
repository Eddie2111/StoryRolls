"use server";
import { GetUserByCookie } from "@/utils/users/getUser";
import { BlogComments } from "@prisma/client";
import Prisma from "@/lib/prisma";
interface BlogCommentProps {
    body: string;
    postId: string;
}
export async function CreateBlogComments(data: BlogCommentProps) {
    try {
        const user = await GetUserByCookie();

        const dataset = {
            id: 1,
            body: data.body || " ",
            authorId: user?.data?.id || 0,
            blogPostId: data.id,
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
