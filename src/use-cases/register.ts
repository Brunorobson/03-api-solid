
import { prisma } from "@/lib/prisma.js"
import { hash } from "bcryptjs"
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository.js"

interface registerUseCaseRequest{
    name: string
    email: string
    password: string
}

export async function registerUseCase(
    {name,
    email,
    password}: registerUseCaseRequest ){
    const password_hash = await hash(password, 6)

    const userWithSamEmail = await prisma.user.findUnique({
        where: {
            email,
        },
      })
    
      if (userWithSamEmail){
        throw new Error('E-mail already exists')
      }
    
      const PrismaUsersRepository = new PrismaUsersRepository
}