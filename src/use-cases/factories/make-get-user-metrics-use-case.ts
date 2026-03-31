import { GetUserMetricsUseCase } from "../get-user-metrics.js";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository.js";

export function makeGetUserMetricsUseCase(){
    const checkinsRepository = new PrismaCheckInsRepository()
    const UseCase = new GetUserMetricsUseCase(checkinsRepository)

    return UseCase
}