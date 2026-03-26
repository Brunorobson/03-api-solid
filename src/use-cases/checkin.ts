import type { CheckInsRepository } from "@/repositories/check-ins-repository.js"
import type { gymsRepository } from "@/repositories/gyms-repository.js"
import type { checkIn } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js"
import { getDistanceBetweenCoordinates } from "./utils/get-distance-between-coordinates.js"

interface CheckInUseCaseRequest {
    userId: string
    gymId: string
    userLatitude: number
    userLongitude: number
}

interface CheckInUseCaseResponse {
    checkIn: checkIn
}

export class CheckInUseCase{
    constructor(
        private CheckInsRepository: CheckInsRepository,
        private gymsRepository:gymsRepository
        ){
    }

    
async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude
}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse>{

    const gym = await this.gymsRepository.findById(gymId)

    if(!gym){
        throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates(
        {latitude: userLatitude, longitude: userLongitude},
        {latitude: gym.latitude.toNumber(),
            longitude: gym.logitude.toNumber(),
        }
    )

    const MAX_DISTANCE_IN_KM = 0.1

    if (distance > MAX_DISTANCE_IN_KM){
        throw new Error()
    }

    const checkInOnSameDay = await this.CheckInsRepository.findByUserIdOnDate(
        userId,
        new Date(),
    )

    if (checkInOnSameDay){
        throw new Error()
    }

    const checkIn = await this.CheckInsRepository.create({
        gym_id: gymId,
        user_id: userId
    })

    return {
        checkIn,
    }
}

}
