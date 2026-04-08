import request from 'supertest'
import { app } from '@/app.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/use-cases/utils/test/create-and-authenticate-user.js'

describe('Nearby a Gym E2e', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to nearby a gym', async () => {
        const token = await createAndAuthenticateUser(app)

        await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
            title: 'Javascript Gym',
            description: 'Some description',
            phone: '11999999999',
            latitude: -23.6821608,
            longitude: -46.5957692,
        })

        await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
            title: 'TypeScript Gym',
            description: 'Some description',
            phone: '11999999999',
            latitude: -23.6821608,
            longitude: -46.5957692,
        })

        const response = await request(app.server)
        .get('/gyms/nearby')
        .query({
            latitude: -23.6821608,
            longitude: -46.5957692,
        })
        .set('Authorization', `Bearer ${token}`)
        .send()


        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'TypeScript Gym',
            }),
        ])
    })
})
