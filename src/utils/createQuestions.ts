import Prisma from '@/lib/prisma';
import {Question} from '@prisma/client'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

interface ReturnProps {
    message: string;
    data: string
    state: boolean;
}
const jwtsecret = process.env.JWT_SECRET as string || 'Untitled'

export default async function CreateQuestion(data:Question): Promise<ReturnProps> {
    const {title='', body='', category=''} = data || {title:'', body:'', category:'' };
    const cookieStore = cookies();
    const token = cookieStore.get('user') || {name:'', value:''};
    try{
        const decoded = jwt.verify(token.value, jwtsecret) as {id: number, iat: number, exp: number} || {id: 0, iat: 0, exp: 0};
          const question = await Prisma.question.create({
            data: {
              title: data.title || 'Untitled',
              body: data.body || 'Untitled',
              category: data.category || 'Untitled',
              authorId: decoded.id || 0,
            },
          });
        return {
            message: 'Question created',
            data: "Question created",
            state: true
        }
    } catch(err) {
        console.log(err)
        return {
            message: 'Error creating question',
            data: "Error creating question",
            state: false
        }
    }
}