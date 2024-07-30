'use server'

import { z } from "zod";
import { createScheduleSchema } from "@/schemas/schedule";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { SCHEDULE_STATUS } from "../lib/enums";

export const createSchedule = async (
    data: z.infer<typeof createScheduleSchema>
) => {
    try {

        const validation = createScheduleSchema.safeParse(data);
        console.log(validation);
        if (!validation.success) return { message: "Invalid Field", success: false };
        console.log('Data:', validation.data);
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
            }
        });
        console.log('Schedule Cretaed:', result);
        revalidatePath("/schedules");

        return {
            success: true,
            message: 'Schedule created successful.',
            result: result
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Failed to create schedule.',
            error
        };
    }
};

export const getSchedules = async (params: Record<string, any>) => {
    try {

        let where: Prisma.ScheduleWhereInput | undefined = {};
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
            where,
            take,
            skip,
            include: {
                vehicle: true
            },
            orderBy: {
                createdAt: 'desc'
            },
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
