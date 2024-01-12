'use server'

import Prisma from '@/lib/prisma'
import {UserProps} from '@/types/user.d'
import { AuthResponseProps } from '@/types/Response.d'
import argon2 from 'argon2'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

async function LoginUser(data: UserProps):AuthResponseProps {
    const cookieStore = cookies()
    try {
        const oneUser = await Prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });
        if(oneUser){
            const validify = {
                password: await argon2.verify(oneUser.password, data.password)
            }
            if(validify.password){
                console.log(oneUser,validify)
                const token = jwt.sign({ id: oneUser.id }, process.env.JWT_SECRET, {
                    expiresIn: '1d',
                })
                cookieStore.set('user', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 86400,
                    path: '/',
                })
                return {
                    message: 'Log in successful',
                    error: ''
                }
            } else {
                console.log('wrong password')
                return {
                    message: 'Wrong password',
                    error: 'Wrong password'
                }
            }
        }
        return false
    } catch (error) {
        console.log('Error retriving user:', error);
        return {
            message: 'Error retriving user, try again?',
            error: 'Error retriving user, connection failure.'
        }
    }
}
export {
    LoginUser
}