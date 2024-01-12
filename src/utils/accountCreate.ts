'use server'
import {createUser} from '@/db/models/create-user'
import { UserProps } from '@/types/user.d';
import argon2 from 'argon2'

async function createAccount (data: UserProps): boolean {
    const {email, name, password} = data
    try{
        const userCreated = {
            email: email.toLowerCase().trim(),
            name: name.trim(),
            password: await argon2.hash(password),
        }
        const pushData = await createUser(userCreated)
        console.log(userCreated)
        if (!userCreated) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        console.log('Error creating user:', error);
    }
}

export {
    createAccount
}

// validify password like this:
/*
const validify = {
    password: await argon2.verify(userCreated.password, password)
}
*/