import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js";
import { AuthenticateUseCase } from "@/use-cases/authenticate.js";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error.js";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
    await request.jwtVerify({ onlyCookie: true })

    const { role } = await request.user

        const token = await reply.jwtSign({ role }, {sign: {sub: request.user.sub}})
        const refreshToken = await reply.jwtSign({}, {sign: {sub: request.user.sub, expiresIn: '7d'}})

        return reply
        .setCookie('refreshToken', refreshToken, {
            path: '/',
            secure: true,
            sameSite: true,
            httpOnly: true,
        
        })
        .status(200).send({ token,})

    
}