import request from 'supertest'
import { app } from '@/app.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'



describe('Authenticate E2e', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to authenticate', async () => {
        await request(app.server).post('/users').send({
            name: 'Bruno',
            email: 'bruno@robson.com',
            password: '12345678'
        })

        const response = await request(app.server)
        .post('/sessions').send({
            email: 'bruno@robson.com',
            password: '12345678'
        })

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({ token: expect.any(String) })
    })
})