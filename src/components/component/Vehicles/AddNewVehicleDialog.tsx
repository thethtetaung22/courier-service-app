'use client'

import React, { useState } from 'react'
import {
    Button,
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui'
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn, getYears } from '@/lib/utils';
import { VEHICLE_STATUS } from '@/lib/enums';
import { colors } from '@/lib/constants';
import { createVehicle } from '../../../actions/vehicle';
import { Vehicle } from '@prisma/client';
import { useToast } from '@/components/ui/use-toast';
import { createVehicleSchema } from '../../../schemas/vehicle';

const AddNewVehicleDialog = ({
    isEdit,
    vehicle,
    trigger
}: {
    isEdit?: boolean,
    vehicle?: Vehicle,
    trigger?: React.ReactNode
}) => {
    const [open, setOpen] = useState(false);
    const [color, setColor] = useState('');
    const { toast } = useToast();

    const form = useForm<z.infer<typeof createVehicleSchema>>({
        resolver: zodResolver(createVehicleSchema),
        defaultValues: {
            licensePlate: vehicle?.licensePlate || '',
            make: vehicle?.make || '',
            model: vehicle?.model || '',
            color: vehicle?.color || 'White',
            year: vehicle?.year?.toString() || '2024',
            status: vehicle?.status ? VEHICLE_STATUS[vehicle?.status] : VEHICLE_STATUS.Active,
            fuelEfficiency: vehicle?.fuelEfficiency || 27.0,
        },
    });

    const onSubmit = async (data: z.infer<typeof createVehicleSchema>) => {
        if (isEdit) {
            form.reset();
        } else {
            const payload = {
                ...data,
                year: data?.year,
                color: data?.color === 'Other' ? color : data?.color
            }
            const result = await createVehicle(payload);

            if (result?.success) {
                setOpen(false);
                form.reset();
            }

            toast({
                title: result?.success ? 'Vehicle created successful.' : 'Failed to create vehicle.',
                style: {
                    background: result?.success ? 'green' : 'red',
                    color: 'white'
                }
            });
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {
                    trigger || (
                        <Button className="ml-auto space-x-1 bg-[#000000] text-[#ffffff] rounded-[5px] hover:bg-[#000000]" size="sm">
                            <Plus />
                            <span>Add Vehicle</span>
                        </Button>
                    )
                }
            </DialogTrigger>
            <DialogContent className='bg-white max-w-2xl w-full p-4 space-y-4 rounded-xl max-h-[80vh] overflow-auto'>
                <DialogHeader>
                    <DialogTitle>{isEdit ? 'Edit' : 'Add New'} Vehicle</DialogTitle>
                    <DialogDescription>{isEdit ? 'Edit the vehicle' : 'Add the vehicle '} details here.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
                        <FormField
                            control={form.control}
                            name="licensePlate"
                            render={({ field }) => (
                                <FormItem className='flex items-start flex-col'>
                                    <FormLabel className='text-gray-600 ml-1 text-left'>License Plate Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ABC123" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="make"
                            render={({ field }) => (
                                <FormItem className='flex items-start flex-col'>
                                    <FormLabel className='text-gray-600 ml-1 text-left'>Brand Name (Make)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Toyota" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="model"
                            render={({ field }) => (
                                <FormItem className='flex items-start flex-col'>
                                    <FormLabel className='text-gray-600 ml-1 text-left'>Model</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Corolla" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="color"
                            render={({ field }) => (
                                <FormItem className='flex items-start flex-col'>
                                    <FormLabel className='text-gray-600 ml-1 text-left'>Color</FormLabel>
                                    <FormControl>
                                        <div className='w-full grid gap-2'>
                                            <Select
                                                {...field}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className="w-full text-gray-800">
                                                    <SelectValue placeholder="Select Color" className='text-gray-800'>{field.value}</SelectValue>
                                                </SelectTrigger>
                                                <SelectContent className="overflow-auto max-h-[30vh] bg-gray-200">
                                                    {
                                                        colors?.map((color: any, i: number) => (
                                                            <SelectItem key={i} value={color.label}>
                                                                <div className='flex gap-2 items-center'>
                                                                    <div className={cn(`${color.bgColor} h-4 w-4 border-gray-300 border`)} />
                                                                    <span>{color.label}</span>
                                                                </div>
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                            {field.value === 'Other' && <Input placeholder="Other color" value={color} onChange={(e: any) => setColor(e.target.value)} />}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="year"
                            render={({ field }) => (
                                <FormItem className='flex items-start flex-col'>
                                    <FormLabel className='text-gray-600 ml-1 text-left'>Year</FormLabel>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className="w-full text-gray-800">
                                                <SelectValue placeholder="Select Year" className='text-gray-800'>{field.value}</SelectValue>
                                            </SelectTrigger>
                                            <SelectContent className="overflow-auto max-h-[30vh]">
                                                {
                                                    getYears()?.map((year: any) => (
                                                        <SelectItem key={year} value={year}>{year}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem className='flex items-start flex-col'>
                                    <FormLabel className='text-gray-600 ml-1 text-left'>Status</FormLabel>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className="w-full text-gray-800">
                                                <SelectValue placeholder="Select status" className='text-gray-800'>{field.value?.replace('_', ' ')}</SelectValue>
                                            </SelectTrigger>
                                            <SelectContent className="overflow-auto max-h-[30vh]">
                                                {
                                                    Object.entries(VEHICLE_STATUS).map((status: any) => (
                                                        <SelectItem key={status[0]} value={status[0]}>{status[1]}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="fuelEfficiency"
                            render={({ field }) => (
                                <FormItem className='flex items-start flex-col'>
                                    <FormLabel className='text-gray-600 ml-1 text-left'>Fuel Efficiency (MPG)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="27.0" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant={'link'}>Cancel</Button>
                            </DialogClose>
                            <Button type="submit">{isEdit ? 'Save' : 'Create'}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    )
}

export default AddNewVehicleDialog;
