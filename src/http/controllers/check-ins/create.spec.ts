import request from 'supertest'
import { app } from '@/app.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/use-cases/utils/test/create-and-authenticate-user.js'
import { prisma } from '@/lib/prisma.js'

describe('Create Check-in E2e', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create a check-in', async () => {
        const token = await createAndAuthenticateUser(app)

        const gym = await prisma.gym.create({
            data: {
                title: 'Javascript Gym',
                description: 'Some description',
                phone: '11999999999',
                latitude: -23.6821608,
                longitude: -46.5957692,
            }
        })

        const response = await request(app.server)
        .post(`/gyms/${gym.id}./check-ins`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            title: 'Javascript Gym',
            description: 'Some description',
            phone: '11999999999',
            latitude: -23.6821608,
            longitude: -46.5957692,
        })

        expect(response.statusCode).toEqual(201)
    })
})
