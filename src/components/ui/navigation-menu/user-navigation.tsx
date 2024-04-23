"use client";
import React from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { GetUserByCookie } from "@/utils/users/getUser";
import { LogOut } from "@/utils/users/logoutUser"; // Import your logout function from proper location

export function UserLogout() {
    const router = useRouter();
    const [user, setUser] = React.useState<boolean>(false);

    React.useEffect(() => {
        async function getUser() {
            try {
                const response: any = await GetUserByCookie();
                if (response?.data) {
                    setUser(true);
                }
            } catch (error) {
                console.error("Error getting user:", error);
                setUser(false);
            }
        }

        getUser();
    }, []);

    async function loggOut() {
        try {
            const response: boolean = await LogOut();
            console.log(response);
            if (response) {
                toast.success("You logged out.");
                router.push("/");
            } else {
                toast.warning("Failed to logout, refresh?");
            }
        } catch (error) {
            console.error("Error logging out:", error);
            toast.error("Failed to logout, refresh?");
        }
    }

    if (user) {
        return <DropdownMenuItem onClick={loggOut}>Logout</DropdownMenuItem>;
    } else {
        return <DropdownMenuItem>&nbsp;</DropdownMenuItem>;
    }
}
