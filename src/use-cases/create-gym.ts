import type { Gym } from "@prisma/client"
import type { gymsRepository } from "@/repositories/gyms-repository.js"

interface CreateGymUseCaseRequest {
    title: string
    description: string | null
    phone: string | null
    latitude: number
    logitude: number
}

interface CreateGymUseCaseResponse{
  gym: Gym
}

export class CreateGymUseCase {
    constructor(private gymsRepository: gymsRepository) {}

    async execute({ 
        title,
        description,
        phone,
        latitude,
        logitude,
     }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
     
      const gym = await this.gymsRepository.create({
        title,
        description,
        phone,
        latitude,
        logitude,
      })
      return {
        gym,
      }
    }

}
