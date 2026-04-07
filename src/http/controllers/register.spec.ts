import request from 'supertest'
import { app } from '@/app.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'



describe('Register E2e', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to register', async () => {
        const response = await request(app.server)
        .post('/users').send({
            name: 'Bruno',
            email: 'bruno@example.com',
            password: '12345678'
        })

        expect(response.status).toBe(201)
    })
})