import fastify from 'fastify'
import { check, ZodError } from 'zod'
import env from './env/index.js'
import fastifyJwt from '@fastify/jwt'
import { usersRoutes } from './http/controllers/users/routes.js'
import { gymsRoutes } from './http/controllers/gyms/routes.js'
import { checkInRoutes } from './http/controllers/check-ins/routes.js'

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
})
app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInRoutes)

app.setErrorHandler((error, _, reply)=>{
    if (error instanceof ZodError) {
        return reply
        .status(400)
        .send({message: 'Validation error.', issues: error.format()})
    }

    if (env.NODE_ENV !== 'production' ){
        console.error(error)
        }else{
            // log para ferramenta externa
    }

    return reply.status(500).send({message: 'Internal server error'})
})
