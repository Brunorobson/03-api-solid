import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history.js";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository.js";

export function makeFetchUserCheckInsHistoryUseCase(){
    const checkinsRepository = new PrismaCheckInsRepository()
    const UseCase = new FetchUserCheckInsHistoryUseCase(checkinsRepository)

    return UseCase
}