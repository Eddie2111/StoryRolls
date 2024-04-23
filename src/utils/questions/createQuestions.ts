"use server";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

import Prisma from '@/lib/prisma';

export interface ReturnProps {
    message: string;
    data: boolean;
    error?: string;
}
const jwtsecret = (process.env.JWT_SECRET as string) || "Untitled";

export async function CreateQuestion(data: { title: string; body: string; category: string }): Promise<ReturnProps> {
    const cookieStore = cookies();
    if (cookieStore.has("user")) {
        const { title = "", body = "", category = "" } = data || { title: "", body: "", category: "" };
        const token = cookieStore.get("user") || { name: "", value: "" };
        try {
            const decoded = (jwt.verify(token.value, jwtsecret) as {
                id: number;
                iat: number;
                exp: number;
            }) || { id: 0, iat: 0, exp: 0 };
            await Prisma.question.create({
                data: {
                    title: title || "Untitled",
                    body: body || "Untitled",
                    category: category || "Untitled",
                    authorId: decoded.id || 0,
                },
            });
            return {
                message: "Question created",
                data: true,
                error: " ",
            };
        } catch (err: any) {
            console.log(err);
            return {
                message: "Error creating question",
                data: false,
                error: err.message,
            };
        }
    } else {
        return {
            message: "Please login to ask a question",
            data: false,
            error: "User not logged in",
        };
    }
}
