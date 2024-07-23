'use server'

import { createVehicleSchema } from "@/schemas/vehicle";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const getVehicles = async (params: Record<string, any>) => {
    try {
        const total = await prisma.vehicle.count();
        const result = await prisma.vehicle.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return {
            success: true,
            total,
            result
        };
    } catch (error) {

        return {
            success: false,
            message: 'Failed to get vehicles.',
            result: []
        };
    }
}

export const createVehicle = async (
    data: z.infer<typeof createVehicleSchema>
) => {
    try {

        const validation = createVehicleSchema.safeParse(data);

        if (!validation.success) return { message: "Invalid Field", success: false };

        const {
            licensePlate,
            make,
            model,
            year,
            color,
            status,
            fuelEfficiency,
        } = validation.data;

        const result = await prisma.vehicle.create({
            data: {
                licensePlate,
                make,
                model,
                year,
                color,
                status,
                fuelEfficiency
            },
        });
        console.log('result:', result);
        revalidatePath("/vehicles");

        return {
            success: true,
            result: result
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'Failed to create vehicl.',
            error
        };
    }
};

export const updateVehicle = async (
    id: string,
    data: z.infer<typeof createVehicleSchema>
) => {
    try {

        const validation = createVehicleSchema.safeParse(data);

        if (!validation.success) return { message: "Invalid Field", success: false };

        const {
            licensePlate,
            make,
            model,
            year,
            color,
            status,
            fuelEfficiency,
        } = validation.data;

        const result = await prisma.vehicle.create({
            data: {
                licensePlate,
                make,
                model,
                year,
                color,
                status,
                fuelEfficiency
            },
        });
        console.log('result:', result);
        revalidatePath("/vehicles");

        return {
            success: true,
            result: result
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'Failed to create vehicl.',
            error
        };
    }
};

export const deleteVehicle = async (id: string) => {
    try {

        await prisma.vehicle.delete({
            where: { id }
        });
        revalidatePath('/vehicles')
        return {
            success: true,
            message: 'Vehicle deleted successful.'
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'Failed to delete vehicle.',
        };
    }
}
