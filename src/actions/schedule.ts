'use server'

import { z } from "zod";
import { createScheduleSchema } from "@/schemas/schedule";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
