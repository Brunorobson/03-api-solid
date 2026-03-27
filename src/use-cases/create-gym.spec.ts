import { describe, beforeEach, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository.js'
import { CreateGymUseCase } from './create-gym.js'

let createGymRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create gym use case', () => {
    beforeEach(() => {
        createGymRepository = new InMemoryGymsRepository
        sut = new CreateGymUseCase(createGymRepository)
    })

    it('should be able to create gym'), async () => {
        const { gym } = await sut.execute({
            title: 'JavaScript gym',
            description: null,
            phone: null,
            latitude: -27.2092052,
            logitude: -49.64401091,
        })

        expect(gym.id).toEqual(expect.any(String))
    }
})