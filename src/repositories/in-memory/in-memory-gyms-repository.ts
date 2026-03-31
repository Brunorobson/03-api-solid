import { Prisma, type Gym } from "@prisma/client";
import type { findManyNearbyParams, gymsRepository } from "../gyms-repository.js";
import { randomUUID } from "node:crypto";
import { getDistanceBetweenCoordinates } from "@/use-cases/utils/get-distance-between-coordinates.js";

export class InMemoryGymsRepository implements gymsRepository{
    
    public items: Gym[] = []

    async findById(id: string) {
        const gym = this.items.find((item) => item.id === id)

        if(!gym) {
            return null
        }

        return gym
    }

    async create(data: Prisma.GymCreateInput){
        const gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            logitude: new Prisma.Decimal(data.logitude.toString()),
            created_at: new Date(),
        }

        this.items.push(gym)

        return gym
    }

    async searchMany(query: string, page: number) {
        return this.items
        .filter((item) => item.title.includes(query))
        .slice((page-1)*20, page *20)
    }

    async findManyNearby(params: findManyNearbyParams) {
        return this.items.filter((item) => {
            const distance = getDistanceBetweenCoordinates(
                { latitude: params.latitude, longitude: params.longintude},
                {
                    latitude: item.latitude.toNumber(),
                    longitude: item.logitude.toNumber(),
                }
            )

            return distance < 10
        })
    }
}