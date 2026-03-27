import { expect, describe, it, beforeEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history.js'

let checkInsRepositories: InMemoryCheckInsRepository
let stu: FetchUserCheckInsHistoryUseCase

describe('Fetch User Check-in History Use case', () => {
    beforeEach(async () => {
        checkInsRepositories = new InMemoryCheckInsRepository()
        stu = new FetchUserCheckInsHistoryUseCase(checkInsRepositories)
    }

)
    it('should be able to check in', async() =>{

        await checkInsRepositories.create({
            gym_id: 'gym 01',
            user_id: 'user-01'
        })

        await checkInsRepositories.create({
            gym_id: 'gym 02',
            user_id: 'user-01'
        })

        const { checkIns } = await stu.execute({
            userId: 'user-01',
            page: 1,
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym 01'}),
            expect.objectContaining({ gym_id: 'gym 02'}),
        ])
    })

    it('should be able to fetch paginated check-in history', async () => {
        for (let i = 1; i <= 22; i++){
            await checkInsRepositories.create({
                gym_id: `gym-${i}`,
                user_id: 'user-01'
            })
        }

        const { checkIns } = await stu.execute({
            userId: 'user-01',
            page:2,
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym-21' }),
            expect.objectContaining({ gym_id: 'gym-22' })
        ])
    })
})
