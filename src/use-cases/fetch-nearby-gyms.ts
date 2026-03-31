import type { Gym } from "@prisma/client"
import type { gymsRepository } from "@/repositories/gyms-repository.js"
import type { FetchTimingInfo } from "node:perf_hooks"

interface FetchNearbyGynsUseCaseRequest {
    userLatitude: number
    userLongitude:number
}

interface FetchNearbyGynsUseCaseResponse{
  gyms: Gym[]
}

export class FetchNearbyGynsUseCase {
    constructor(private gymsRepository: gymsRepository) {}

    async execute({ 
    userLatitude,
    userLongitude
     }: FetchNearbyGynsUseCaseRequest): Promise<FetchNearbyGynsUseCaseResponse> {
     
         const gyms = await this.gymsRepository.findManyNearby({
         latitude: userLatitude,
         longintude: userLongitude,
    }
      )
      return {
        gyms,
      }
    }

}
