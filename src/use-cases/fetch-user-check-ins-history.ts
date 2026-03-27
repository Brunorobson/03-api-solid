import type { checkIn } from "@prisma/client"
import type { CheckInsRepository } from "@/repositories/check-ins-repository.js"

interface FetchUserCheckInsHistoryUseCaseRequest {
    userId: string
    page: number
}

interface FetchUserCheckInsHistoryUseCaseResponse {
    checkIns: checkIn[]
}

export class FetchUserCheckInsHistoryUseCase{
    constructor(
        private ChechInsRepository: CheckInsRepository,
        ){}

async execute({
    userId,
    page
}: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse>{

    const checkIns = await this.ChechInsRepository.findManyByUserId(userId, page)

    return {
        checkIns,
    }
}

}
