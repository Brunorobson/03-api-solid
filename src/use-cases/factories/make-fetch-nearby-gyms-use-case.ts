import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository.js";
import { FetchNearbyGynsUseCase } from "../fetch-nearby-gyms.js";

export function makeFetchNearbyGymsUseCase(){
    const gymsRepository = new PrismaGymsRepository()
    const UseCase = new FetchNearbyGynsUseCase(gymsRepository)

    return UseCase
}