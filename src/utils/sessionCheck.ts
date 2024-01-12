'use server'
import { cookies } from 'next/headers'

export default async function SessionCheck() {
    const cookieStore = cookies()
    const user = cookieStore.get('user') || {name: 'untitled', value: 'untitled'}
    return user;
  }