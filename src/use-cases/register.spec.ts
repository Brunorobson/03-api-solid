import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register.js'
import { compare } from 'bcryptjs'

describe('Register use case', () => {
    it('should hash user password upon registration', async() =>{
        const registersUseCase = new RegisterUseCase({
            async findByEmail(email) {
                return null
            },

            async create(data){
                return{
                    id: 'user-1',
                    name: data.name,
                    email: data.email,
                    password_hash: data.password_hash,
                    created_at: new Date(),
                }
            },
        })

        const { user } = await registersUseCase.execute({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '12345678',
        })

        const isPassworsCorrectlyHashed = await compare(
            '123456',
            user.password_hash,
        )

        expect(isPassworsCorrectlyHashed).toBe(true)
    })
})