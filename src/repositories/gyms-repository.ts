import type { Gym, Prisma } from "@prisma/client";

export interface findManyNearbyParams{
    latitude: number
    longintude: number
}

export interface gymsRepository{
    findById(id: string): Promise<Gym | null>
    create(data: Prisma.GymCreateInput): Promise<Gym>
    searchMany(query: string, page: number): Promise<Gym[]>
    findManyNearby(params: findManyNearbyParams): Promise<Gym[]>
}