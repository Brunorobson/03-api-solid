import type { checkIn, Prisma } from "@prisma/client";

export interface CheckInsRepository{
    findById(id: string): Promise<checkIn | null>
    create(data: Prisma.checkInUncheckedCreateInput): Promise<checkIn>
    findByUserIdOnDate(userId: string, date: Date): Promise<checkIn | null>
    findManyByUserId(user_id: string, page: number): Promise<checkIn[]>
    countByUserId(userId: string): Promise<number>
    save(checkIn: checkIn): Promise<checkIn>
}