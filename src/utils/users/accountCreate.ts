"use server";
import {createUser} from "@/db/models/create-user";
import {UserProps} from "@/types/user.d";
import argon2 from "argon2";

async function createAccount(data: UserProps): Promise<boolean> {
  const {email = "", name = "", password = ""} = data;
  try {
    const userCreated = {
      email: email.toLowerCase().trim() || "Untitled",
      name: name.trim() || "Untitled",
      password: (await argon2.hash(password)) || "Untitled",
    };
    const pushData = await createUser(userCreated);
    if (!pushData) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log("Error creating user:", error);
    return false;
  }
}

export {createAccount};

// validify password like this:
/*
const validify = {
    password: await argon2.verify(userCreated.password, password)
}
*/
