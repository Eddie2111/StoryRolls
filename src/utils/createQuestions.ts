import Prisma from '@/lib/prisma';
import {Question} from '@prisma/client'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

interface ReturnProps {
    message: string;
    data: Question | null;
    state: boolean;
}
const jwtsecret = process.env.JWT_SECRET as string || 'Untitled'

export default async function CreateQuestion(data:Question): Promise<ReturnProps> {
    const cookieStore = cookies();
    const token = cookieStore.get('user') || {name:'', value:''};
    try{
        const decoded = jwt.verify(token.value, jwtsecret) as {id: number, iat: number, exp: number} || {id: 0, iat: 0, exp: 0};
        const user = await Prisma.user.findUnique({
            where: {
              id: decoded.id,
            },
          });
          if (!user) {
            console.error('User not found');
            return {
                message: 'User not found',
                data: null,
                state: false
            }
          }
          const question = await Prisma.question.create({
            data: {
              title: data.title,
              body: data.body,
              category: data.category,
              authorId: user.id,
            },
          });
        return {
            message: 'Question created',
            data: question,
            state: true
        }
    } catch(err) {
        console.log(err)
        return {
            message: 'Error creating question',
            data: null,
            state: false
        }
    }
}