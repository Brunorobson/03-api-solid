import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js'
import { CheckInUseCase } from './checkin.js'

let checkinRepository: InMemoryCheckInsRepository
let stu: CheckInUseCase
describe('Check-in use case', () => {
    beforeEach(() => {
        checkinRepository = new InMemoryCheckInsRepository
        stu = new CheckInUseCase(checkinRepository)
    }

)
    it('should be able to check in', async() =>{


        const { checkIn } = await stu.execute({
            gymId: 'gym-01',
            userId: 'user-01',
        })


        expect(checkIn.id).toEqual(expect.any(String))
    })
})