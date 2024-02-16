import { GetUserByCookie } from "@/utils/users/getUser";
import { getBlogsByID } from "@/utils/blogs/getBlogs";
import ContentCard from "@/components/contents/card";
import { BlogPost } from "@prisma/client";
import Link from "next/link";
interface ReturnProps {
    // from blogpost.tsx
    message: string;
    error: string;
    data: BlogPost[] | null;
}
interface SingleUserReturnProps {
    message: string;
    error: string;
    data: {
        id: number;
        email: string;
        name: string;
    } | null;
}

export default async function Page() {
    const user: SingleUserReturnProps = await GetUserByCookie();
    const userID = user?.data?.id || 0;
    const blog: ReturnProps = await getBlogsByID(userID.toString() || "0");
    const Image1: string = `https://images.unsplash.com/photo-1703672141188-117ba6518b12?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`;
    if (!blog) {
        return <div>loading...</div>;
    }
    return (
        <div className="container my-10">
            <div className="mb-10">
                <span className="text-md">
                    <Link href="/my-account" className="text-md underline underline-offset-2">
                        My Account{" "}
                    </Link>{" "}
                    / My Blogs
                </span>
            </div>
            <div className="grid grid-cols-1 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-8">
                {blog?.data?.map((blog: BlogPost, index: number) => (
                    <ContentCard
                        key={index}
                        title={(blog?.title as string) || "title"}
                        category={(blog?.category as string) || "category"}
                        id={(blog?.id as number) || 0}
                        author={(user.data?.name as string) || "author"}
                        tags={(blog?.tags as string) || "tags"}
                        createdAt={(blog?.createdAt.toString() as string) || "Sun Jan 10 2020"}
                    />
                ))}
                {blog?.data?.length === 0 ? (
                    <div>
                        <h1>No Blogs Found</h1>
                        <Link
                            className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-gray-300 text-black bg-white dark:text-black dark:bg-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white duration-300"
                            href="/blogs/create"
                        >
                            Write one?
                        </Link>
                    </div>
                ) : (
                    <span>&nbsp;</span>
                )}
            </div>
        </div>
    );
}
