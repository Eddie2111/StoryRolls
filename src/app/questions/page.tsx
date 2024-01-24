import GetQuestions from '@/utils/questions/getQuestions'
import {Question} from '@prisma/client'
interface ReturnProps {
    success: boolean;
    message: string;
    data: Question[];
}
export default async function Page() {
    const questions:ReturnProps = await GetQuestions()
    if(questions){
        return (
            <div>
                {
                    questions && questions?.data?.map((question:Question) => (
                        <div key={question.id}>
                            <p>{question.title}</p>
                            <p>{question.body}</p>
                            <p>{question.category}</p>
                        </div>
                    ))
                }
            </div>
        )
    }
    return (
        <div>
            <p>Questions: Loading...</p>
        </div>
    )
}