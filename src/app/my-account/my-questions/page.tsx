import { GetQuestionsByUser } from "@/utils/questions/getQuestions";
import { Question } from "@prisma/client";
interface ReturnProps {
  success: boolean;
  message: string;
  data: Question[];
}
export default async function Page() {
  const questions: ReturnProps = await GetQuestionsByUser();
  // console.log(questions);
  return (
    <div>
      <h1>My Questions</h1>
    </div>
  );
}
