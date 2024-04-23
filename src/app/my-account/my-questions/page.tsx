import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { GetQuestionsByUser } from '@/utils/questions/getQuestions';
import { GetUserbyID } from '@/utils/users/getUser';
import { Question } from '@prisma/client';

interface ReturnProps {
    success: boolean;
    message: string;
    data: Question[];
}
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
    const questions: ReturnProps = await GetQuestionsByUser();
    return (
        <div>
            <h1>My Questions</h1>
            <div className="container md:mx-10 mx-10">
                <div className="grid grid-flow-row xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1">
                    {questions &&
                        questions?.data.map((items:Partial<Question>, index: number) => {
                            return (
                                <CustomCard
                                    key={index}
                                    id={items?.id || 0}
                                    title={items?.title || " "}
                                    createdAt={"Sun Jan 10 2020"}
                                    category={items?.category || " "}
                                    authorId={items?.authorId || 0}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

async function CustomCard({
    id,
    title,
    category,
    createdAt,
    authorId,
}: {
    id: number;
    title: string;
    category?: string;
    createdAt?: string;
    authorId?: number;
}) {
    const author: GetUserProps = await GetUserbyID((authorId as number) || 0);
    return (
        <Card className="w-[20rem] mx-4 my-12 p-2">
            <CardContent className="flex flex-col justify-center space-y-4 mt-5 gap-6">
                <h3 className="text-lg font-bold h-6 ">{title}</h3>
                <div className="flex flex-row gap-2">
                    <Badge className="block ">{category}</Badge>
                </div>
                <div className="flex flex-col">
                    <p className="text-gray-500 font-extrabold dark:text-gray-400 ">Published By: {author?.data?.name || "author"}</p>
                    <p className="text-gray-500 dark:text-gray-400 ">Published At: {createdAt}</p>
                </div>
                <Link
                    className="text-center h-9 bottom-10 rounded-md px-4 py-2 text-sm font-medium text-black bg-white dark:text-black dark:bg-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white shadow-md shadow-slate-400 duration-300"
                    href={"/questions/" + id}
                >
                    Read More
                </Link>
            </CardContent>
        </Card>
    );
}
