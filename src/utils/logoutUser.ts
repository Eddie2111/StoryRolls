'use server'
import { cookies } from 'next/headers'
export default async function LogOut(): Promise<boolean>{
    try{
        const user = cookies().delete('user') || 'Untitled'
        return true;
    } catch (error) {
        return false;
    }
}