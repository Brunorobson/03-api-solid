import request from 'supertest'
import { app } from '@/app.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'



describe('Refresh Token E2e', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to refresh a token', async () => {
        await request(app.server).post('/users').send({
            name: 'Bruno',
            email: 'bruno@robson.com',
            password: '12345678'
        })

        const authResponse = await request(app.server)
        .post('/sessions').send({
            email: 'bruno@robson.com',
            password: '12345678'
        })

        const cookies = authResponse.get('Set-Cookie')

        if (!cookies) {
            throw new Error('Expected refresh cookie to be set')
        }

        const response = await request(app.server)
        .patch('/token/refresh')
        .set('Cookie', cookies)
        .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({ token: expect.any(String) })

        expect(response.get('Set-Cookie')).toEqual([
            expect.stringContaining('refreshToken=')
        ])
    })
})
