
import { hash } from "bcryptjs"
import type { usersRepository } from "@/repositories/users-repository.js"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error.js"
import type { User } from "@prisma/client"

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
}

interface RegisterUseCaseResponse{
  user: User
}

export class RegisterUseCase {
    constructor(private usersRepository: usersRepository) {}

    async execute({ name, email, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
      const password_hash = await hash(password, 6)
      
      const userWithSamEmail = await this.usersRepository.findByEmail(email)
      
      if (userWithSamEmail) {
        throw new UserAlreadyExistsError()
      }
      
      const user = await this.usersRepository.create({
        name,
        email,
        password_hash
      })
      return {
        user,
      }
    }

}
