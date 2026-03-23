import type { CheckInsRepository } from "@/repositories/check-ins-repository.js"
import type { checkIn } from "@prisma/client"

interface CheckInUseCaseRequest {
    userId: string
    gymId: string
}

interface CheckInUseCaseResponse {
    checkIn: checkIn
}

export class CheckInUseCase{
    constructor(private CheckInsRepository: CheckInsRepository){
    }

    
async execute({
    userId,
    gymId
}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse>{
    const checkIn = await this.CheckInsRepository.create({
        gym_id: gymId,
        user_id: userId
    })

    return {
        checkIn,
    }
}

}
