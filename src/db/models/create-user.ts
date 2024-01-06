'use server'
import Prisma from '@/lib/prisma'
import {UserProps} from '@/types/user.d'

async function createUser(email, name, password) {
    try {
        const newUser = await prisma.user.create({
            data: {
                email: email,
                name: name,
                password: password,
            },
        });
        console.log('New user created:', newUser);
        return true
    } catch (error) {
        console.log('Error creating user:', error);
        return false
    }
}
