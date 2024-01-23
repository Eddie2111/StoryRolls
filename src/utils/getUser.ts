'use server'
import Prisma from '@/lib/prisma'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
interface ReturnProps {
    message: string,
    error: string,
    data: {
        id: number,
        email: string,
        name: string,
    } | null
}
export async function GetUserbyID(id:string){
    try {
        const convertID = parseInt(id || '0') || 0
        const oneUser = await Prisma.user.findUnique({
            where: {
                id: convertID || 0,
            },
            select: {
                id: true,
                email: true,
                name: true,
            }
        });
        if(oneUser){
            return {
                message: 'User found',
                error: '',
                data: oneUser
            }
        }
        return {
            message: 'Wrong email',
            error: 'Wrong email',
            data: null
        }
    } catch (error) {
        return {
            message: 'Error retriving user, try again?',
            error: 'Error retriving user, connection failure.',
            data: null
        }
    }
}