"use server";
import { GetUserByCookie } from "@/utils/users/getUser";
import Prisma from "@/lib/prisma";

interface BlogCommentProps {
    body: string;
    blogPostId: number;
}
interface ReturnProps {
    message: string;
    status: number;
    data: boolean;
}
export async function CreateBlogComments(data: BlogCommentProps) {
    try {
        const user = await GetUserByCookie();
        if (user?.data?.id) {
            const dataset = {
                body: data.body || " ",
                authorId: user?.data?.id || 0,
                blogPostId: data.blogPostId,
            };
            const response = await Prisma.blogComments.create({ data: dataset });
            console.log(response);
            return {
                message: "Your comment has been posted",
                status: 200,
                data: true,
            };
        } else {
            return {
                message: "Please login in to comment",
                status: 302,
                data: false,
            };
        }
    } catch (err: unknown) {
        console.log(err);
        return {
            message: "Error occured, try again later perhaps?",
            status: 400,
            data: false,
        };
    }
}

export { type ReturnProps };
