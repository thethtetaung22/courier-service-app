'use server'

import { z } from "zod";
import { createScheduleSchema, updateScheduleSchema } from "@/schemas/schedule";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { SCHEDULE_STATUS } from "@/lib/enums";

export const createSchedule = async (
    data: z.infer<typeof createScheduleSchema>
) => {
    try {

        const validation = createScheduleSchema.safeParse(data);

        if (!validation.success) return { message: "Invalid Field", success: false };

        const {
            serviceDate,
            vehicleId,
            detail
        } = validation.data;

        const result = await prisma.schedule.create({
            data: {
                serviceDate,
                vehicleId,
                detail
            } as any
        });
        console.log('Schedule Cretaed:', result);
        revalidatePath("/schedules");

        return {
            success: true,
            message: 'Schedule created successful.'
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Failed to create schedule.'
        };
    }
};

export const updateSchedule = async (
    data: z.infer<typeof updateScheduleSchema>
) => {
    try {

        const validation = updateScheduleSchema.safeParse(data);
        if (!validation.success) return { message: "Invalid Field", success: false };
        const {
            id,
            serviceDate,
            vehicleId,
            detail
        } = validation.data;

        const result = await prisma.schedule.update({
            where: {
                id
            },
            data: {
                serviceDate,
                vehicleId,
                detail
            }
        });
        console.log('Schedule Updated:', result);

        revalidatePath("/schedules");

        return {
            success: true,
            message: 'Schedule updated successful.',
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Failed to update schedule.'
        };
    }
};

export const deleteSchedule = async (id: string) => {
    try {

        await prisma.schedule.update({
            where: {
                id
            },
            data: {
                isDeleted: true
            }
        });

        revalidatePath("/schedules");

        return {
            success: true,
            message: 'Schedule deleted successful.',
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Failed to delete schedule.'
        };
    }
};

export const getSchedules = async (params: Record<string, any>) => {
    try {

        let where: Record<string, any> = {};
        const take = 8, skip = params?.page > 1 ? ((Number(params.page) - 1) * take) : 0;

        if (params?.query) {
            const queryStr = String(params.query);

            where = {
                OR: [
                    {
                        vehicle: {
                            OR: [
                                {
                                    licensePlate: {
                                        contains: queryStr,
                                        mode: 'insensitive'
                                    }
                                },
                                {
                                    color: {
                                        contains: queryStr,
                                        mode: 'insensitive'
                                    }
                                },
                                {
                                    make: {
                                        contains: queryStr,
                                        mode: 'insensitive'
                                    }
                                },
                                {
                                    model: {
                                        contains: queryStr,
                                        mode: 'insensitive'
                                    }
                                },
                                {
                                    year: {
                                        equals: Number(queryStr) || undefined
                                    }
                                },
                                {
                                    fuelEfficiency: {
                                        equals: Number(queryStr) || undefined
                                    }
                                },
                            ]
                        }
                    },
                    {
                        detail: {
                            contains: queryStr,
                            mode: 'insensitive'
                        }
                    },
                    {
                        ...(queryStr === SCHEDULE_STATUS.COMPLETED || queryStr === SCHEDULE_STATUS.SCHEDULED ?
                            {
                                status: queryStr
                            } : {}
                        )
                    },

                ]
            }
        };

        const total = await prisma.schedule.count();
        const result = await prisma.schedule.findMany({
            where: {
                AND: [
                    {
                        isDeleted: false,
                    },
                    {
                        vehicle: {
                            isDeleted: false
                        }
                    },
                    where,
                ]
            },
            include: {
                vehicle: true
            } as any,
            orderBy: {
                createdAt: 'desc'
            } as any,
            take,
            skip,
        });

        return {
            success: true,
            total,
            result
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Failed to get schedules.',
            result: []
        };
    }
}
