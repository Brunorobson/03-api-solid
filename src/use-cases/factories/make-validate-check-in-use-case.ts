import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository.js";
import { ValidateCheckInUseCase } from "../validate-check-in.js";

export function makeValidateCheckInUseCase(){
    const checkinsRepository = new PrismaCheckInsRepository()
    const UseCase = new ValidateCheckInUseCase(checkinsRepository)

    return UseCase
}