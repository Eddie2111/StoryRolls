"use server";
import { CategoriesProps } from "@/types/BlogPost.d";
import { BlogPost } from "@prisma/client";
import Prisma from "@/lib/prisma";

interface ReturnProps {
    message: string;
    error: string;
    data: BlogPost | null;
}

interface ManyReturnProps {
    message: string;
    error: string;
    data: BlogPost[] | null;
}

export async function getBlogsByID(id: string): Promise<ManyReturnProps> {
    try {
        const convertIDtoInt = parseInt(id || "0") || 0;
        const blogsByUser: any = await Prisma.blogPost.findMany({
            where: {
                userID: convertIDtoInt,
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 10,
            select: {
                title: true,
                tags: true,
                category: true,
                createdAt: true,
                likes: true,
                dislikes: true,
            },
        });
        if (blogsByUser) {
            return {
                message: "Blog found",
                error: "",
                data: blogsByUser,
            };
        } else {
            return {
                message: "Wrong blog",
                error: "Wrong blog",
                data: null,
            };
        }
    } catch (err) {
        return {
            message: "Error retrieving blog, try again?",
            error: "Error retrieving blog, connection failure.",
            data: null,
        };
    }
}

export async function getBlogByID(id: string): Promise<ReturnProps> {
    try {
        const convertIDtoInt = parseInt(id || "0") || 0;
        const oneBlog = await Prisma.blogPost.findUnique({
            where: {
                id: convertIDtoInt || 0,
            },
        });
        if (oneBlog) {
            return {
                message: "Blog found",
                error: "",
                data: oneBlog,
            };
        } else {
            return {
                message: "Wrong blog",
                error: "Wrong blog",
                data: null,
            };
        }
    } catch (err) {
        return {
            message: "Error retrieving blog, try again?",
            error: "Error retrieving blog, connection failure.",
            data: null,
        };
    }
}

export async function getBlogsCategory(): Promise<CategoriesProps> {
    try {
        const blogsByCategory: { category: string }[] | null = await Prisma.blogPost.findMany({
            select: {
                category: true,
            },
            distinct: ["category"],
        });
        if (blogsByCategory) {
            return {
                message: "Blog found",
                error: "",
                data: blogsByCategory,
            };
        } else {
            return {
                message: "Wrong blog",
                error: "Wrong blog",
                data: null,
            };
        }
    } catch (err) {
        return {
            message: "Error retrieving blog, try again?",
            error: "Error retrieving blog, connection failure.",
            data: null,
        };
    }
}

export async function getBlogsBySearching(search: string): Promise<ManyReturnProps> {
    try {
        const blogsBySearch: BlogPost[] = await Prisma.blogPost.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: search,
                        },
                    },
                    {
                        category: {
                            contains: search,
                        },
                    },
                    {
                        tags: {
                            contains: search,
                        },
                    },
                ],
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 10,
        });
        if (blogsBySearch) {
            return {
                message: "Blog found",
                error: "",
                data: blogsBySearch,
            };
        } else {
            return {
                message: "Wrong blog",
                error: "Wrong blog",
                data: null,
            };
        }
    } catch (err) {
        console.log(err);
        return {
            message: "Error retrieving blog, try again?",
            error: "Error retrieving blog, connection failure.",
            data: null,
        };
    }
}
