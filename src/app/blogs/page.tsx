import {GetBlogs} from '@/db/models/getBlogs'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import {BlogPostProps} from '@/types/BlogPost.d'
import {GetUserbyID} from '@/utils/getUser'
import { BlogPost } from '@prisma/client';
interface GetUserProps {
    data: {
        id: string
        name: string
        email: string
    }
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
        const Blogs:GetBlogsProps = await GetBlogs()
        if (!Blogs.data) {
            // Handle the case when data is null or undefined
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
                    {Blogs.data.map((blog:BlogPost, index:number) => {
                        return (
                            <Card key={index} className="w-full md:w-1/2 lg:w-1/3">
                                <p>author: {blog?.userID}</p>
                                <p>title: {blog?.title}</p>
                                <p>tags: {blog?.tags}</p>
                                <p>created at: {blog?.createdAt.toString()}</p>
                                <p>category: {blog?.category}</p>
                            </Card>
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