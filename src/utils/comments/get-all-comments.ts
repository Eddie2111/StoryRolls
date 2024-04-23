"use server";
import { BlogComments } from "@prisma/client";
import Prisma from "@/lib/prisma";

interface ManyReturnProps {
    message: string;
    error: string;
    data: Partial<(BlogComments | undefined)[]> | null;
}

export async function GetCommentsByPost(blogID: string): Promise<ManyReturnProps> {
    try {
        const response: any = await Prisma.blogComments.findMany({
            where: {
                blogPostId: parseInt(blogID) || 0,
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 10,
            select: {
                body: true,
                createdAt: true,
                authorId: true,
            },
        });
        if (response) {
            return {
                message: "Comments found",
                error: " ",
                data: response,
            };
        } else {
            return {
                message: "Error reading data",
                error: "Wrong blog ID provided",
                data: null,
            };
        }
    } catch (err: unknown) {
        console.log(err);
        return {
            message: "Error reading data",
            error: "Error retrieving blog, connection failure.",
            data: null,
        };
    }
}

export async function GetAllCommentsByPosts(blogID: string): Promise<ManyReturnProps> {
    try {
        const response: any = await Prisma.blogComments.findMany({
            where: {
                blogPostId: parseInt(blogID) || 0,
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 10,
            select: {
                body: true,
                createdAt: true,
                authorId: true,
            },
        });
        if (response) {
            return {
                message: "Comments found",
                error: " ",
                data: response,
            };
        } else {
            return {
                message: "Error reading data",
                error: "Wrong blog ID provided",
                data: null,
            };
        }
    } catch (err: unknown) {
        console.log(err);
        return {
            message: "Error reading data",
            error: "Error retrieving blog, connection failure.",
            data: null,
        };
    }
}
