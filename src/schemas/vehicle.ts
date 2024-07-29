import { z } from "zod";
import { VEHICLE_STATUS } from "../lib/enums";

export const createVehicleSchema = z.object({
    licensePlate: z.string().min(3, { message: "Enter license plate." }),
    make: z.string().min(2, { message: "Enter brand name." }),
    model: z.string().min(2, { message: 'Enter model.' }),
    year: z.string(),
    color: z.string(),
    status: z.enum([VEHICLE_STATUS.Active, VEHICLE_STATUS.Maintenance_Required], { message: "Status must be 'Active' or 'Maintenance_Required'" }),
    fuelEfficiency: z.string(),
});

export const updateVehicleSchema = z.object({
    licensePlate: z.string().min(3, { message: "Enter license plate." }).optional(),
    make: z.string().min(2, { message: "Enter brand name." }).optional(),
    model: z.string().min(2, { message: 'Enter model.' }).optional(),
    year: z.string().optional(),
    color: z.string().optional(),
    status: z.enum([VEHICLE_STATUS.Active, VEHICLE_STATUS.Maintenance_Required], { message: "Status must be 'Active' or 'Maintenance_Required'" }).optional(),
    fuelEfficiency: z.number().optional(),
});
