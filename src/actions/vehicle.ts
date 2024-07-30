'use server'

import { createVehicleSchema, updateVehicleSchema } from "@/schemas/vehicle";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const getVehicles = async (params: Record<string, any>) => {
    try {
        let where: Record<string, any> = {};

        if (params?.query) {
            const queryStr = String(params.query);

            where = {
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
        };

        const total = await prisma.vehicle.count();
        const result = await prisma.vehicle.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: 10,
            skip: params?.page ? Number(params.page) * 10 : 0
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
                year: Number(year),
                color,
                status,
                fuelEfficiency: Number(fuelEfficiency)
            },
        });

        revalidatePath("/vehicles");

        return {
            success: true,
            message: 'Vehicle created successful.',
            result: result
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'Failed to create vehicle.',
            error
        };
    }
};

export const updateVehicle = async (
    id: string,
    data: z.infer<typeof updateVehicleSchema>
) => {
    try {

        const validation = updateVehicleSchema.safeParse(data);
        console.log(validation?.error);
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

        let payload = {} as Record<string, any>;

        if (licensePlate) {
            payload['licensePlate'] = licensePlate;
        }

        if (make) {
            payload['make'] = make;
        }

        if (model) {
            payload['model'] = model;
        }

        if (year) {
            payload['year'] = Number(year);
        }

        if (color) {
            payload['color'] = color;
        }

        if (status) {
            payload['status'] = status;
        }

        if (fuelEfficiency) {
            payload['fuelEfficiency'] = Number(fuelEfficiency);
        }

        const result = await prisma.vehicle.update({
            where: { id },
            data: { ...payload },
        });

        revalidatePath("/vehicles");

        return {
            success: true,
            message: 'Vehicle updated successful.',
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'Failed to update vehicle.',
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

export const getVehiclesForSchedule = async () => {
    try {
        const result = await prisma.vehicle.findMany({
            select: {
                id: true,
                licensePlate: true,
                make: true,
                model: true,
            },
            orderBy: {
                licensePlate: 'desc'
            }
        });

        return {
            success: true,
            result
        };
    } catch (error) {
        return {
            success: false,
            result: []
        }
    }
}
