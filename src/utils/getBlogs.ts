'use server'
import Prisma from '@/lib/prisma'
import { cookies } from 'next/headers'
import { BlogPost } from '@prisma/client';

interface ReturnProps {
    message: string,
    error: string,
    data: BlogPost | null
}

export async function getBlogByID(id:string):Promise<ReturnProps>{
    try{
        const convertIDtoInt = parseInt(id || '0') || 0
        const oneBlog = await Prisma.blogPost.findUnique({
            where: {
                id: convertIDtoInt || 0,
            },
        });
        if (oneBlog) {
        return {
            message: 'Blog found',
            error: '',
            data: oneBlog
            }
        }
        else {
            return {
                message: 'Wrong blog',
                error: 'Wrong blog',
                data: null
            }
        }
    }
    catch(err){
        return {
            message: 'Error retriving blog, try again?',
            error: 'Error retriving blog, connection failure.',
            data: null
        }
    }
}