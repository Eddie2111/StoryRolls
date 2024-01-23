'use server'
import { cookies } from 'next/headers'

export default async function SessionCheck(): Promise<{name:string, value:string}>{
    const cookieStore = cookies()
    try{
      const user = await cookieStore.get('user') || {name: 'untitled', value: 'untitled'}
      return user;
    } catch (error) {
      const user = {name: 'untitled', value: 'untitled'}
      return user;
    }
  }