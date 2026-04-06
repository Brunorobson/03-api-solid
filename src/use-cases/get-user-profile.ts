import type { usersRepository } from "@/repositories/users-repository.js";
import type { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";

interface GetUserProfileUseCaseRequest{
    userId: string
}

interface GetUserProfileUseCaseResponse {
    user: User
}

export class GetUserProfileUseCase {
    constructor(private usersRepository: usersRepository) {}

    async execute({
        userId
    }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
        const user = await this.usersRepository.findById(userId)

        if(!user){
            throw new ResourceNotFoundError()
        }

    return {
        user
    }
    }
}
