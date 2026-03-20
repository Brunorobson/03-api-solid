import { prisma } from "@/lib/prisma.js";
import { Prisma, type User } from "@prisma/client";
import type { usersRepository } from "../users-repository.js";

export class PrismaUsersRepository implements usersRepository{
    findById(id: string): Promise<User | null> {
      throw new Error("Method not implemented.");
    }
    
    async findByEmail(email: string){
        const user = await prisma.user.findUnique({
            where: {
              email,
            },
          })
          return user
    }
    async create(data: Prisma.UserCreateInput){
        const user = await prisma.user.create({
            data
          })

          return user
    }
}