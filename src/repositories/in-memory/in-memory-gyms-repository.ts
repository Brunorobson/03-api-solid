import type { Gym } from "@prisma/client";
import type { gymsRepository } from "../gyms-repository.js";

export class InMemoryGymsRepository implements gymsRepository{
    public items: Gym[] = []

    async findById(id: string) {
        const gym = this.items.find((item) => item.id === id)

        if(!gym) {
            return null
        }

        return gym
    }
}