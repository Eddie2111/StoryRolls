"use server";
import Prisma from "@/lib/prisma";
import {UserProps} from "@/types/user.d";

async function createUser({email, name, password}: UserProps) {
  try {
    await Prisma.user.create({
      data: {
        email: email || "Untitled",
        name: name || "Untitled",
        password: password || "Untitled",
      },
    });
    return true;
  } catch (error) {
    console.log("Error creating user:", error);
    return false;
  }
}
export {createUser};
