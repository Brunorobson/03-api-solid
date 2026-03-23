import { Prisma, type checkIn, type User } from "@prisma/client";
import type { CheckInsRepository } from "../check-ins-repository.js";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInsRepository implements CheckInsRepository{
    public items: checkIn[] = []

    async create(data: Prisma.checkInUncheckedCreateInput){
        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at: new Date(),
        }

        this.items.push(checkIn)

        return checkIn
    }
}