import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository.js";
import { SearchGymsUseCase } from "../search-gyms.js";

export function makeSearchGymsUseCase(){
    const gymsRepository = new PrismaGymsRepository()
    const UseCase = new SearchGymsUseCase(gymsRepository)

    return UseCase
}