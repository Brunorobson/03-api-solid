
import { hash } from "bcryptjs"
import type { usersRepository } from "@/repositories/users-repository.js"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error.js"

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
}

export class RegisterUseCase {
    constructor(private usersRepository: usersRepository) {}

    async execute({ name, email, password }: RegisterUseCaseRequest) {
      const password_hash = await hash(password, 6)
      
      const userWithSamEmail = await this.usersRepository.findByEmail(email)
      
      if (userWithSamEmail) {
        throw new UserAlreadyExistsError()
      }
      
      await this.usersRepository.create({
        name,
        email,
        password_hash
      })
    }
}
