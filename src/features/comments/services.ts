import prisma, { Prisma } from "../../../lib/prisma";

  export async function getAllComments() {
    return await prisma.comment.findMany();
  }