'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { cookies } from 'next/headers'
import { useRouter } from 'next/navigation'
import SessionCheck from '@/utils/sessionCheck'
export default function RouteProtector():JSX.Element {
    const pathname = usePathname()
    const router = useRouter()
    useEffect(() => {
        async function GetProps(){
            const response = await SessionCheck();
            return response;
        }
        const token = GetProps()
        isProtectedRoute(pathname,token)
    }, [pathname])
    return (<></>)
}

function isProtectedRoute(pathname:string,token:string):void {
    if (pathname === '/my-account/login' || pathname === '/my-account/signup') {
        if (token) {
            router.push('/my-account')
        } else {
            return
        }
    }
    if (pathname === '/my-account/login' || pathname === '/my-account/signup') {
        if (token) {
            return
        } else {
            router.push('/my-account')
        }
    }
}