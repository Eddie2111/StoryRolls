"use server";

import Prisma from "@/lib/prisma";
import { Question } from "@prisma/client";
import { GetUserByCookie } from "@/utils/getUser";

interface ReturnProps {
  success: boolean;
  message: string;
  data: Question[];
}
interface CategoriesReturnProps {
  success: boolean;
  message: string;
  data: Array<{
    category: string;
  }> | null;
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
export async function GetQuestions(): Promise<ReturnProps> {
  try {
    // only get first 10 questions
    const questions: Question[] = await Prisma.question.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });
    return {
      success: true,
      message: "Questions found",
      data: questions,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error getting questions",
      data: [],
    };
  }
}

export async function GetQuestionCategories(): Promise<CategoriesReturnProps> {
  try {
    const categories = await Prisma.question.findMany({
      select: {
        category: true,
      },
      distinct: ["category"],
    });
    return {
      success: true,
      message: "Categories found",
      data: categories,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error getting categories",
      data: [],
    };
  }
}

export async function GetOneQuestion(id: number): Promise<ReturnProps> {
  try {
    const question: Question | null = await Prisma.question.findUnique({
      where: {
        id,
      },
    });
    if (!question) {
      return {
        success: false,
        message: "Question not found",
        data: [],
      };
    }
    return {
      success: true,
      message: "Question found",
      data: [question],
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error getting question",
      data: [],
    };
  }
}

export async function GetQuestionsByUser(): Promise<ReturnProps> {
  try {
    const userID: SingleUserReturnProps = await GetUserByCookie();
    const questions: Question[] = await Prisma.question.findMany({
      where: {
        authorId: userID?.data?.id || 0,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return {
      success: true,
      message: "Questions found",
      data: questions,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error getting questions",
      data: [],
    };
  }
}
