'use server';

import Prisma from '@/lib/prisma';
import {Question} from '@prisma/client';

interface ReturnProps {
  success: boolean;
  message: string;
  data: Question[];
}

export default async function GetQuestions(): Promise<ReturnProps> {
  try {
    // only get first 10 questions
    const questions: Question[] = await Prisma.question.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return {
      success: true,
      message: 'Questions found',
      data: questions,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: 'Error getting questions',
      data: [],
    };
  }
}
