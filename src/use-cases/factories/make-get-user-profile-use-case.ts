import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js";
import { GetUserProfileUseCase } from "../get-user-profile.js";

export function makeGetUserProfileUseCase(){
    const usersRepository = new PrismaUsersRepository()
    const UseCase = new GetUserProfileUseCase(usersRepository)

    return UseCase
}