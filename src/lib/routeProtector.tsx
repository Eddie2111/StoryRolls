"use client";
import {useEffect} from "react";
import {usePathname} from "next/navigation";
import {useRouter} from "next/navigation";
import SessionCheck from "@/utils/sessionCheck";

interface ResponseProps {
  name?: string;
  value?: string;
}

export default function RouteProtector(): JSX.Element {
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    async function GetProps() {
      const protectedRoutes: string[] = [
        "/my-account",
        "/my-account/forgot-password",
        "/my-account/reset-password",
        "/my-account/create-blog",
        "/my-account/edit-blog",
        "/my-account/edit-profile",
        "/my-account/my-blogs",
        "/my-account/create-question",
        "/my-account/edit-question",
        "/my-account/my-questions",
      ];
      const isProtectedRoute = protectedRoutes.includes(pathname);
      const response: ResponseProps = await SessionCheck();
      if (isProtectedRoute) {
        console.log(isProtectedRoute);
        if (response?.name) {
          return;
        } else {
          router.push("/my-account");
        }
      }
      return response;
    }
    GetProps();
  }, [pathname, router]);
  return <></>;
}
