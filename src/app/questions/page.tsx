import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GetQuestions, GetQuestionCategories } from "@/utils/questions/getQuestions";
import { GetUserbyID } from "@/utils/users/getUser";
import { Badge } from "@/components/ui/badge";
import { Question } from "@prisma/client";
import Link from "next/link";
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
interface CategoriesReturnProps {
    success: boolean;
    message: string;
    data: Array<{
        category: string;
    }> | null;
}
export default async function Page() {
    try {
        const questions: ReturnProps = await GetQuestions();
        const categories: CategoriesReturnProps = await GetQuestionCategories();
        if (questions && categories) {
            return (
                <div className="container mx-20">
                    <div className="flex flex-row gap-4 justify-center my-10">
                        {categories &&
                            categories?.data?.map((category, index) => <Badge key={index}>{category?.category || "category"}</Badge>)}
                    </div>
                    {questions &&
                        questions?.data?.map((question: Question, index: number) => (
                            <QuestionCard
                                key={index}
                                id={question?.id || 0}
                                authorID={question?.authorId || 0}
                                title={question?.title || "title"}
                                createdAt={question?.createdAt.toString() || "createdAt"}
                                category={question?.category || "category"}
                            />
                        ))}
                </div>
            );
        }
        return (
            <div>
                <p>Questions: Loading...</p>
            </div>
        );
    } catch (err) {
        return (
            <div>
                <span>
                    Error loading question, <Link href="/questions">Reload?</Link>
                </span>
            </div>
        );
    }
}

async function QuestionCard({
    id,
    authorID,
    title,
    createdAt,
    category,
}: {
    id: number;
    authorID: number;
    title: string;
    createdAt: string;
    category: string;
}) {
    const user: GetUserProps = await GetUserbyID((authorID as number) || 0);
    return (
        <Card className="cursor-pointer w-2/6">
            <Link href={`/questions/${id}`}>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>Asked by: {user?.data?.name || ""}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Badge>{category}</Badge>
                </CardContent>
                <CardFooter>
                    <p>{createdAt}</p>
                </CardFooter>
            </Link>
        </Card>
    );
}
