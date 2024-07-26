'use client'

import React, { useState } from 'react'
import {
    Button,
    Calendar,
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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui'
import { CalendarIcon, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { SCHEDULE_STATUS } from '@/lib/enums';
import { Schedule, Vehicle } from '@prisma/client';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { createScheduleSchema, updateScheduleSchema } from '@/schemas/schedule';
import { format } from "date-fns"

const AddNewScheduleDialog = ({
    isEdit,
    schedule,
    trigger
}: {
    isEdit?: boolean,
    schedule?: Schedule,
    trigger?: React.ReactNode
}) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [color, setColor] = useState('');
    const { toast } = useToast();

    const form = useForm<z.infer<typeof createScheduleSchema>>({
        resolver: zodResolver(createScheduleSchema),
        defaultValues: {
            serviceDate: schedule?.serviceDate ? new Date(schedule?.serviceDate) : new Date(),
            status: schedule?.status ? SCHEDULE_STATUS[schedule?.status] : SCHEDULE_STATUS.SCHEDULED,
            detail: schedule?.detail || '',
            vehicleId: schedule?.vehicleId || ''
        },
    });

    const onSubmit = async (data: z.infer<typeof createScheduleSchema | typeof updateScheduleSchema>) => {
        const payload = {
            ...data,
        } as any;

        if (isEdit && schedule?.id) {
            // const result = await updateVehicle(vehicle.id, payload);

            // if (result?.success) {
            //     setOpen(false);
            //     form.reset();
            // }
            // router.refresh();

            // toast({
            //     title: result?.message,
            //     style: {
            //         background: result?.success ? 'green' : 'red',
            //         color: 'white'
            //     }
            // });
        } else {
            // const result = await createSchedule(payload);

            // if (result?.success) {
            //     setOpen(false);
            //     form.reset();
            // }

            // toast({
            //     title: result.message,
            //     style: {
            //         background: result?.success ? 'green' : 'red',
            //         color: 'white'
            //     }
            // });
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {
                    trigger || (
                        <Button className="ml-auto space-x-1 bg-[#000000] text-[#ffffff] rounded-[5px] hover:bg-[#000000]" size="sm">
                            <Plus />
                            <span>Add Schedule</span>
                        </Button>
                    )
                }
            </DialogTrigger>
            <DialogContent className='bg-white max-w-xl w-full p-4 space-y-4 rounded-xl max-h-[80vh] overflow-auto'>
                <DialogHeader>
                    <DialogTitle>{isEdit ? 'Edit' : 'Add New'} Schedule</DialogTitle>
                    <DialogDescription>{isEdit ? 'Edit the vehicle' : 'Add the vehicle '} schedule details here.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>

                        <FormField
                            control={form.control}
                            name="serviceDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col w-full">
                                    <FormLabel>Service Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                    <FormDescription>{field.value.toLocaleDateString()}</FormDescription>
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

export default AddNewScheduleDialog;
