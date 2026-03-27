import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository.js'
import { expect, describe, it, beforeEach} from 'vitest'
import { FetchNearbyGynsUseCase } from './fetch-nearby-gyms.js'

let gymsRepository: InMemoryGymsRepository
let stu: FetchNearbyGynsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        stu = new FetchNearbyGynsUseCase(gymsRepository)
    }
)
    it('should be able to search for gyms', async() =>{

        await gymsRepository.create({
            title: 'near JsGym',
            description: null,
            phone: null,
            latitude: -27.2092052,
            logitude: -49.64401091,
        })

        await gymsRepository.create({
            title: 'for TsGym',
            description: null,
            phone: null,
            latitude: -27.0610928,
            logitude: -49.5229501,
        })

        const { gyms } = await stu.execute({
            userLatitude: -27.0610928,
            userLongitude: -49.5229501,
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'near JsGym'}),
        ])
    })

})
