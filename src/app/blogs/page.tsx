import {GetBlogs} from '@/db/models/getBlogs'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import {BlogPostProps} from '@/types/BlogPost.d'
import {GetUserbyID} from '@/utils/getUser'
import { BlogPost } from '@prisma/client';
interface GetUserProps {
    data?: {
        id: number
        name: string
        email: string
    } | null;
    message: string;
    error: string;
}
interface GetBlogsProps {
    data?: BlogPost[] | null;
    message: string;
    error: string;
}

export default async function Page(){
    try{
        const Blogs:GetBlogsProps = await GetBlogs();
        if (!Blogs.data) {
            return (
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-4xl font-bold">Loading...</h1>
                </div>
            );
        }
        return (
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold">Blogs</h1>
                <p className="text-lg text-gray-500">Here are the list of blogs</p>
                <div className="flex flex-col justify-center items-center mt-8">
                    {Blogs.data.map(async(blog:BlogPost, index:number) => {
                        return (
                            <BlogCard
                                key={index}
                                authorID={blog?.userID as number || 0}
                                title={blog?.title as string || 'title'}
                                tags={blog?.tags as string || 'tags'}
                                createdAt={blog?.createdAt.toString() as string || 'createdAt'}
                                category={blog?.category as string || 'category'}
                            />
                        )
                    })}
                </div>
            </div>
        )
    } catch(err) {
        console.log(err)
        return (
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold">Error</h1>
                <p className="text-lg text-gray-500">An error occured while fetching the blogs</p>
            </div>
        )
    }
}
async function BlogCard(
    { authorID, title, tags, createdAt, category } :
    { authorID: number, title: string, tags: string, createdAt: string, category: string }) : Promise<JSX.Element> {
    let author:GetUserProps = await GetUserbyID(authorID as number || 0);
    return (
        <Card className="w-full md:w-1/2 lg:w-1/3">
            <p>author: {author?.data?.name}</p>
            <p>title: {title || 'title'}</p>
            <p>tags: {tags || 'tags'}</p>
            <p>created at: {createdAt || '1-1-24'}</p>
            <p>category: {category || 'category'}</p>
        </Card>
    )
}