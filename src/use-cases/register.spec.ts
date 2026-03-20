import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register.js'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { UserAlreadyExistsError } from './errors/user-already-exists-error.js'

let usersRepository: InMemoryUsersRepository
let stu: RegisterUseCase
describe('Register use case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository
        stu = new RegisterUseCase(usersRepository)
    }

)
    it('should be able to register', async() =>{


        const { user } = await stu.execute({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '12345678',
        })


        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async() =>{

        const { user } = await stu.execute({
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

        const email = 'johndoe@example.com'
        const { user } = await stu.execute({
            name: 'Jonh Doe',
            email,
            password: '12345678',
        })

        await expect(() => 
            stu.execute({
                name: 'John Doe',
                email,
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})