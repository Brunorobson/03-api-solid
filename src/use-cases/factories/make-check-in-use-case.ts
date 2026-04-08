import { CheckInUseCase } from "../checkin.js";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository.js";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository.js";

export function makeCheckInUseCase(){
    const checkinsRepository = new PrismaCheckInsRepository()
    const gymsRepository = new PrismaGymsRepository()
    const UseCase = new CheckInUseCase(checkinsRepository, gymsRepository)

    return UseCase
}
