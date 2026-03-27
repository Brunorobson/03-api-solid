import type { CheckInsRepository } from "@/repositories/check-ins-repository.js"

interface GetUserMetricsUseCaseRequest {
    userId: string
}

interface GetUserMetricsUseCaseResponse{
    checkInsCount: number
}

export class GetUserMetricsUseCase{
    constructor(private CheckInsRepository: CheckInsRepository){}

    async execute({
        userId,
    }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse>{
        const checkInsCount = await this.CheckInsRepository.countByUserId(userId)
        
        return{
            checkInsCount,
        }
    }
}