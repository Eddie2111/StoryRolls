'use server'
import Prisma from '@/lib/prisma'
import {UserProps} from '@/types/user.d'

async function createUser({email,name,password}:UserProps) {
    try {
        const newUser = await Prisma.user.create({
            data: {
                email: email,
                name: name,
                password: password,
            },
        });
        return true
    } catch (error) {
        console.log('Error creating user:', error);
        return false
    }
}
export {
    createUser
}