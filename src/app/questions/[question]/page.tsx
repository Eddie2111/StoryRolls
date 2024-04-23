import type {
  Metadata,
  ResolvingMetadata,
} from 'next';

import {
  CommentLists,
} from '@/components/comment/QuestionComments/comment-lists';
import CommentBox from '@/components/comment/QuestionComments/single-comment';
import { GetOneQuestion } from '@/utils/questions/getQuestions';
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
type Props = {
    params: { question: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const questionString = parseInt(params?.question) || 0;
    const question: ReturnProps = await GetOneQuestion(questionString as number);
    const questionData: Array<Partial<Question>> = question?.data as Array<Partial<Question>>;
    return {
        title: questionData[0]?.title || "Storyrolls on your Journey",
        description: questionData[0]?.title || "Storyrolls on your Journey",
    };
}

export default async function Page({ params }: { params: { question: string } }) {
    const questionString = parseInt(params?.question) || 0;
    const question: ReturnProps = await GetOneQuestion(questionString as number);
    const questionData: Array<Partial<Question>> = question?.data as Array<Partial<Question>>;

    const author: GetUserProps = await GetUserbyID(questionData[0]?.authorId || 0);
    const authorName = author?.data?.name || "";
    const date = new Date(questionData[0]?.createdAt || "");
    const splittedDate = date.toDateString() || "Sun Jan 0 2020";

    const questionBody = question?.data?.[0]?.body || "";
    const convertedBody = questionBody.toString() || "";
    return (
        <div className="container mx-auto my-10">
            <h1 className="text-3xl font-bold">{questionData[0]?.title}</h1>
            <div className="my-10">
                <p className="text-gray-500 dark:text-gray-400 text-right">
                    Asked by: <span className="text-bold text-black">{authorName}</span>
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-right">
                    Posted At: <span className="text-bold text-black">{splittedDate || " "}</span>
                </p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: convertedBody || "" }}></div>

            <div className="mt-10">
                <CommentBox id={params.question || "0"} />
                <CommentLists id={params.question || "0"} />
            </div>
        </div>
    );
}
