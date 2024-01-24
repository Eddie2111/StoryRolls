'use server';
import Prisma from '@/lib/prisma';
interface ReturnProps {
  message: string;
  error: string;
  data: {
    id: number;
    email: string;
    name: string;
  } | null;
}
export async function GetUserbyID(id: number): Promise<ReturnProps> {
  try {
    const convertID = id || 0;
    const oneUser = await Prisma.user.findUnique({
      where: {
        id: convertID || 0,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    if (oneUser) {
      return {
        message: 'User found',
        error: '',
        data: oneUser,
      };
    }
    return {
      message: 'Wrong email',
      error: 'Wrong email',
      data: null,
    };
  } catch (error) {
    return {
      message: 'Error retriving user, try again?',
      error: 'Error retriving user, connection failure.',
      data: null,
    };
  }
}
