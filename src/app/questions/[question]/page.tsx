import { GetOneQuestion } from "@/utils/questions/getQuestions";
import { Question } from "@prisma/client";
interface ReturnProps {
    success: boolean;
    message: string;
    data: Question[];
}
export default async function Page({ params }: { params: { question: string } }) {
    const questionString = parseInt(params?.question) || 0;
    const question: ReturnProps = await GetOneQuestion(questionString as number);

    const questionBody = question?.data?.[0]?.body || "";
    const convertedBody = questionBody.toString() || "";
    return (
        <div>
            <p>Question: {question?.data?.[0]?.title || "Loading..."}</p>
            <div dangerouslySetInnerHTML={{ __html: convertedBody || "" }}></div>
        </div>
    );
}
