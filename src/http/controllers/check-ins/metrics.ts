import { makeFetchUserCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case.js";
import { makeGetUserMetricsUseCase } from "@/use-cases/factories/make-get-user-metrics-use-case.js";
import { GetUserMetricsUseCase } from "@/use-cases/get-user-metrics.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
    const getUserMetricsUseCase = makeGetUserMetricsUseCase()

    const { checkInsCount } = await getUserMetricsUseCase.execute({
        userId: request.user.sub
    })
    return reply.status(200).send({ checkInsCount })
    
}