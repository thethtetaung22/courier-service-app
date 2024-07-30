import { z } from "zod";
import { SCHEDULE_STATUS } from "@/lib/enums";

export const createScheduleSchema = z.object({
    serviceDate: z.date(),
    status: z.enum([SCHEDULE_STATUS.COMPLETED, SCHEDULE_STATUS.SCHEDULED]),
    detail: z.string(),
    vehicleId: z.string()
});

export const updateScheduleSchema = z.object({
    id: z.string(),
    serviceDate: z.date().optional(),
    status: z.enum([SCHEDULE_STATUS.COMPLETED, SCHEDULE_STATUS.SCHEDULED]).optional(),
    detail: z.string().optional(),
    vehicleId: z.string().optional()
});
