import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GetBlogsProps, CategoriesProps, CategoriesDataProps } from "@/types/BlogPost.d";
import { getBlogsCategory } from "@/utils/blogs/getBlogs";
import ContentCard from "@/components/contents/card";
import { GetUserbyID } from "@/utils/users/getUser";
import { GetBlogs } from "@/db/models/getBlogs";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@prisma/client";
import Search from "@/components/search";
import Link from "next/link";
interface GetUserProps {
    data?: {
        id: number;
        name: string;
        email: string;
    } | null;
    message: string;
    error: string;
}

export default async function Page() {
    try {
        const Blogs: GetBlogsProps = await GetBlogs();
        const Categories: CategoriesProps = await getBlogsCategory();
        if (!Blogs.data) {
            return (
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-4xl font-bold">Loading...</h1>
                </div>
            );
        }
        return (
            <div className="container flex-col justify-center items-center">
                <h1 className="text-4xl font-bold">Blogs</h1>
                <p className="text-lg text-gray-500">Here are the list of blogs</p>
                <Search />
                <div className="flex mx-auto px-auto">
                    <div className="flex flex-row gap-2">
                        {Categories &&
                            Categories?.data?.map((category: CategoriesDataProps, index: number) => {
                                return (
                                    <Badge
                                        key={index}
                                        className="block text-md bg-black text-white hover:bg-white hover:text-black duration-300"
                                    >
                                        {" "}
                                        {category.category || " "}
                                    </Badge>
                                );
                            })}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5 w-full">
                    {Blogs.data.map(async (blog: BlogPost, index: number) => {
                        return (
                            <BlogCard
                                key={index}
                                id={(blog?.id as number) || 0}
                                authorID={(blog?.userID as number) || 0}
                                title={(blog?.title as string) || "title"}
                                tags={(blog?.tags as string) || "tags"}
                                createdAt={(blog?.createdAt.toString() as string) || "createdAt"}
                                category={(blog?.category as string) || "category"}
                            />
                        );
                    })}
                </div>
            </div>
        );
    } catch (err) {
        console.log(err);
        return (
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold">Error</h1>
                <p className="text-lg text-gray-500">An error occured while fetching the blogs</p>
            </div>
        );
    }
}
async function BlogCard({
    id,
    authorID,
    title,
    tags,
    createdAt,
    category,
}: {
    id: number;
    authorID: number;
    title: string;
    tags: string;
    createdAt: string;
    category: string;
}): Promise<JSX.Element> {
    const author: GetUserProps = await GetUserbyID((authorID as number) || 0);
    return (
        <div>
            <ContentCard
                title={title}
                tags={tags}
                createdAt={createdAt}
                category={category}
                author={author?.data?.name || "author"}
                id={id}
            />
        </div>
    );
}
