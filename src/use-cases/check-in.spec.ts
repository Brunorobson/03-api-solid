import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js'
import { CheckInUseCase } from './checkin.js'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository.js'
import { Decimal } from '@prisma/client/runtime/client'

let checkInsRepositories: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let stu: CheckInUseCase



describe('Check-in use case', () => {
    beforeEach(() => {
        checkInsRepositories = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        stu = new CheckInUseCase(checkInsRepositories, gymsRepository)

        gymsRepository.items.push({
            id: 'gym-01',
            title:'teesteadno',
            description: '',
            phone: '',
            latitude: new Decimal(-27.2092052),
            logitude: new Decimal(-49.6401091),
        })

        vi.useFakeTimers()
    }

)

afterEach(() => {
    vi.useRealTimers()
})
    it('should be able to check in', async() =>{

        const { checkIn } = await stu.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091,
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in twice in the same day', async() =>{

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        await stu.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091,
        })

        await expect(stu.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091,
        })).rejects.toBeInstanceOf(Error)
    })

    it('should be able to check in twice in different days', async() =>{

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        await stu.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091,
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))


        const { checkIn } = await stu.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091,
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in on distant gym', async() =>{

        gymsRepository.items.push({
            id: 'gym-02',
            title: 'JavaScript Gym',
            description: '',
            phone: '',
            latitude: new Decimal(-27.0747279),
            logitude: new Decimal(-49.4889672),
        })
        await expect(stu.execute({
            gymId: 'gym-02',
            userId: 'user-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091,
        })).rejects.toBeInstanceOf(Error)

        
    })
})
