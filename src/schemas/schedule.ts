import { z } from "zod";
import { SCHEDULE_STATUS, VEHICLE_STATUS } from "@/lib/enums";

export const createSchema = z.object({
    serviceDate: z.date(),
    status: z.enum([SCHEDULE_STATUS.COMPLETED, SCHEDULE_STATUS.SCHEDULE]),
    type: z.string(),
    vehicleId: z.string()
});

export const updateScheduleSchema = z.object({
    licensePlate: z.string().min(3, { message: "Enter license plate." }).optional(),
    make: z.string().min(2, { message: "Enter brand name." }).optional(),
    model: z.string().min(2, { message: 'Enter model.' }).optional(),
    year: z.string().optional(),
    color: z.string().optional(),
    status: z.enum([VEHICLE_STATUS.Active, VEHICLE_STATUS.Maintenance_Required], { message: "Status must be 'Active' or 'Maintenance_Required'" }).optional(),
    fuelEfficiency: z.number().optional(),
});
