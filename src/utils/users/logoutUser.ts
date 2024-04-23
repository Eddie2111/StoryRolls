"use server";
import { cookies } from "next/headers";

export async function LogOut(): Promise<boolean> {
    try {
        (await cookies().delete("user")) || "Untitled";
        return true;
    } catch (error) {
        return false;
    }
}
