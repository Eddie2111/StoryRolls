import { PrismaClient } from "@prisma/client";
const prismaClientSingleton = () => {
    return new PrismaClient();
};

// global type here
declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();
export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

// !import example
/*
import prisma from './db'
async function main() {
  const allUsers = await prisma.user.findMany({
    include: { posts: true },
  })
  console.dir(allUsers, { depth: null })
}
*/
