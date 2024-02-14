"use server";
import Prisma from "@/lib/prisma";
import { BlogComments } from "@prisma/client";
import {GetUserByCookie} from "@/utils/users";
interface BlogCommentProps {
    body: string
    postId: string

}
export async function CreateBlogComments(data:BlogCommentProps) {
    const user = await GetUserByCookie();
    const data = await Prisma.BlogComments.create({
        data: {
            body: data.body,
            authorId: 
        }
    })
}