import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository.js'
import { expect, describe, it, beforeEach} from 'vitest'
import { SearchGymsUseCase } from './search-gyms.js'

let gymsRepository: InMemoryGymsRepository
let stu: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        stu = new SearchGymsUseCase(gymsRepository)
    }
)
    it('should be able to search for gyms', async() =>{

        await gymsRepository.create({
            title: 'JsGym',
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.64401091,
        })

        await gymsRepository.create({
            title: 'TsGym',
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.64401091,
        })

        const { gyms } = await stu.execute({
            query: 'JsGym',
            page: 1,
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'JsGym'}),
        ])
    })

    it('should be able to fetch paginated gyms search', async () => {
            for (let i = 1; i <= 22; i++){
                await gymsRepository.create({
                    title: `JsGym-${i}`,
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.64401091,
                })
            }
    
            const { gyms } = await stu.execute({
                query: 'JsGym',
                page:2,
            })
    
            expect(gyms).toHaveLength(2)
            expect(gyms).toEqual([
                expect.objectContaining({ title: 'JsGym-21' }),
                expect.objectContaining({ title: 'JsGym-22' })
            ])
        })
})
