import type { Gym, Prisma } from "@prisma/client";
import type { findManyNearbyParams, gymsRepository } from "../gyms-repository.js";
import { prisma } from "@/lib/prisma.js";

export class PrismaGymsRepository implements gymsRepository{
    async findById(id: string){
        const gym = await prisma.gym.findUnique({
            where: {
                id,
            },
        })
        return gym
    }
    async create(data: Prisma.GymCreateInput) {
        const gym = await prisma.gym.create({
            data
        })
        return gym
    }
    searchMany(query: string, page: number) {
        const gyms = prisma.gym.findMany({
            where: {
                title: {
                    contains: query,
                }
            },
            take: 20,
            skip: (page - 1) * 20
        })
        return gyms
    }
    async findManyNearby({ latitude, longitude }: findManyNearbyParams){
        const gyms = await prisma.$queryRaw<Gym[]>`
        SELECT * from gyms
        WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
        `
        return gyms
    }

}
