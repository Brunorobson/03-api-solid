import { expect, describe, it, beforeEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js'
import { GetUserMetricsUseCase } from './get-user-metrics.js'

let checkInsRepositories: InMemoryCheckInsRepository
let stu: GetUserMetricsUseCase

describe('Fetch User Metrics Use case', () => {
    beforeEach(async () => {
        checkInsRepositories = new InMemoryCheckInsRepository()
        stu = new GetUserMetricsUseCase(checkInsRepositories)
    }

)
    it('should be able to get check ins count from metrics', async() =>{

        await checkInsRepositories.create({
            gym_id: 'gym 01',
            user_id: 'user-01'
        })

        await checkInsRepositories.create({
            gym_id: 'gym 02',
            user_id: 'user-01'
        })

        const { checkInsCount } = await stu.execute({
            userId: 'user-01',
        })

        expect(checkInsCount).toBe(2)
        
    })

})
