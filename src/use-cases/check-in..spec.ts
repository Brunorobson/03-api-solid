import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js'
import { CheckInUseCase } from './checkin.js'

let checkinRepository: InMemoryCheckInsRepository
let stu: CheckInUseCase
describe('Check-in use case', () => {
    beforeEach(() => {
        checkinRepository = new InMemoryCheckInsRepository
        stu = new CheckInUseCase(checkinRepository)

        vi.useFakeTimers()
    }

)

afterEach(() => {
    vi.useRealTimers
})
    it('should be able to check in', async() =>{
        const { checkIn } = await stu.execute({
            gymId: 'gym-01',
            userId: 'user-01',
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in twice in the same day', async() =>{

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        const { checkIn } = await stu.execute({
            gymId: 'gym-01',
            userId: 'user-01',
        })

        await expect(() => stu.execute({
            gymId: 'gym-01',
            userId: 'user-01',
        })).rejects.toBeInstanceOf(Error)
    })

    it('should be able to check in twice in different days', async() =>{

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        await stu.execute({
            gymId: 'gym-01',
            userId: 'user-01',
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))


        const { checkIn } = await stu.execute({
            gymId: 'gym-01',
            userId: 'user-01',
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })
})