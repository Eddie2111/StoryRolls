"use server";
import Prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

interface ReturnProps {
  message: string;
  error: string;
  data: {
    id: number;
    email: string;
    name: string;
  } | null;
}
interface SingleUserReturnProps {
  message: string;
  error: string;
  data: {
    id: number;
    email: string;
    name: string;
  } | null;
}
export async function GetUserbyID(id: number): Promise<ReturnProps> {
  try {
    const convertID = id || 0;
    const oneUser = await Prisma.user.findUnique({
      where: {
        id: convertID || 0,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    if (oneUser) {
      return {
        message: "User found",
        error: "",
        data: oneUser,
      };
    }
    return {
      message: "Wrong email",
      error: "Wrong email",
      data: null,
    };
  } catch (error) {
    return {
      message: "Error retriving user, try again?",
      error: "Error retriving user, connection failure.",
      data: null,
    };
  }
}

export async function GetUserByCookie(): Promise<ReturnProps> {
  try {
    const jwtsecret = (process.env.JWT_SECRET as string) || "Untitled";
    const cookieStore = cookies();
    const userToken = (await cookieStore.get("user")) || { name: "untitled", value: "untitled" };
    const decoded = (jwt.verify(userToken.value, jwtsecret) as {
      id: number;
      iat: number;
      exp: number;
    }) || { id: 0, iat: 0, exp: 0 };
    const user = await await Prisma.user.findUnique({
      where: {
        id: decoded.id || 0,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    return {
      message: "User found",
      error: "",
      data: user,
    };
  } catch (err) {
    return {
      message: "Error retriving user, try again?",
      error: "Error retriving user, connection failure.",
      data: null,
    };
  }
}
