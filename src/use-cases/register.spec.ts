import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register.js'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { UserAlreadyExistsError } from './errors/user-already-exists-error.js'

describe('Register use case', () => {
    it('should be able to register', async() =>{
        const usersRepository = new InMemoryUsersRepository
        const registersUseCase = new RegisterUseCase(usersRepository)

        const { user } = await registersUseCase.execute({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '12345678',
        })


        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async() =>{
        const usersRepository = new InMemoryUsersRepository
        const registersUseCase = new RegisterUseCase(usersRepository)

        const { user } = await registersUseCase.execute({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '12345678',
        })

        const isPassworsCorrectlyHashed = await compare(
            '12345678',
            user.password_hash,
        )

        expect(isPassworsCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async() =>{
        const usersRepository = new InMemoryUsersRepository
        const registersUseCase = new RegisterUseCase(usersRepository)

        const email = 'johndoe@example.com'
        const { user } = await registersUseCase.execute({
            name: 'Jonh Doe',
            email,
            password: '12345678',
        })

        await expect(() => 
            registersUseCase.execute({
                name: 'John Doe',
                email,
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})