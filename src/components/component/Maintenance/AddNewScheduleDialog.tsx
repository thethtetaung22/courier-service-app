'use client'

import React, { useEffect, useState } from 'react'
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
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui'
import { CalendarIcon, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { SCHEDULE_STATUS } from '@/lib/enums';
import { Schedule } from '@prisma/client';
import { useToast } from '@/components/ui/use-toast';
import { createScheduleSchema, updateScheduleSchema } from '@/schemas/schedule';
import { format } from "date-fns"
import { VehicleCombobox } from '../VehicleCombobox';
import { createSchedule, updateSchedule } from '@/actions/schedule';
import { useRouter } from 'next/navigation';

const AddNewScheduleDialog = ({
    isEdit,
    schedule,
    trigger,
    vehicles,
    vehicleId
}: {
    isEdit?: boolean,
    schedule?: Schedule,
    trigger?: React.ReactNode,
    vehicles: any[],
    vehicleId?: string
}) => {
    const { toast } = useToast();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [hour, setHour] = useState('06');
    const [minute, setMinute] = useState('00');
    const [detail, setDetail] = useState(schedule?.detail || '');

    const form = useForm<z.infer<typeof createScheduleSchema>>({
        resolver: zodResolver(createScheduleSchema),
        defaultValues: {
            serviceDate: schedule?.serviceDate ? new Date(schedule?.serviceDate) : new Date(),
            status: schedule?.status ? SCHEDULE_STATUS[schedule?.status] : SCHEDULE_STATUS.SCHEDULED,
            detail: schedule?.detail || 'Cleaning',
            vehicleId: ''
        },
    });

    const onSubmit = async (data: z.infer<typeof createScheduleSchema | typeof updateScheduleSchema>) => {
        let [day, month, year]: any = data?.serviceDate?.toLocaleDateString()?.split('/');

        const payload = {
            ...data,
            serviceDate: new Date(`${month}-${day}-${year} ${hour}:${minute}`)
        } as any;

        if (isEdit && schedule?.id) {
            const result = await updateSchedule({
                id: schedule.id,
                ...payload
            });

            if (result?.success) {
                setOpen(false);
                form.reset();
                router.refresh();
            }

            toast({
                title: result?.message,
                style: {
                    background: result?.success ? 'green' : 'red',
                    color: 'white'
                }
            });
        } else {
            const result = await createSchedule(payload);

            if (result?.success) {
                setOpen(false);
                form.reset();
                router.refresh();
            }

            toast({
                title: result.message,
                style: {
                    background: result?.success ? 'green' : 'red',
                    color: 'white'
                }
            });
        }
    }

    useEffect(() => {
        if (schedule?.serviceDate) {
            const h = schedule.serviceDate.getHours(), m = schedule?.serviceDate?.getMinutes();
            setHour(`${h < 10 ? '0' : ''}${h}`);
            setMinute(`${m < 10 ? '0' : ''}${m}`);
        }

        if (schedule?.vehicleId) {
            form.setValue('vehicleId', schedule.vehicleId)
        }

        if (vehicleId) {
            form.setValue('vehicleId', vehicleId)
        }
    }, [schedule])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {
                    trigger || (
                        <Button className="ml-auto space-x-1 bg-[#000000] text-[#ffffff] rounded-[5px] hover:bg-[#000000]" size="sm">
                            <Plus />
                            <span>Add Maintenance</span>
                        </Button>
                    )
                }
            </DialogTrigger>
            <DialogContent className='bg-white max-w-xl w-full p-4 space-y-4 rounded-xl max-h-[80vh] overflow-auto'>
                <DialogHeader>
                    <DialogTitle>{isEdit ? 'Edit' : 'Add New'} Maintenance</DialogTitle>
                    <DialogDescription>{isEdit ? 'Edit the vehicle' : 'Add the vehicle '} maintenance details here.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>

                        <div className='grid grid-cols-2 gap-2'>
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
                                                            "text-left font-normal",
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
                                                    disabled={(date) => date < new Date()}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormItem className="flex flex-col w-full">
                                <FormLabel>Service Time</FormLabel>
                                <div className='grid grid-cols-2 gap-2'>
                                    <Select onValueChange={setHour} defaultValue={hour}>
                                        <SelectTrigger className="">
                                            <SelectValue placeholder="Select hour" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    Array.from({ length: 15 }, (v, i) => (
                                                        <SelectItem key={i} value={`${(i + 6) < 10 ? '0' : ''}${(6 + i).toString()}`}>{(i + 6) < 10 && '0'}{6 + i}</SelectItem>
                                                    ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                    <Select onValueChange={setMinute} defaultValue={minute}>
                                        <SelectTrigger className="">
                                            <SelectValue placeholder="Select Minute" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    Array.from({ length: 60 }, (v, i) => (
                                                        <SelectItem key={i} value={`${i < 10 ? '0' : ''}${i}`}>{i < 10 && '0'}{i}</SelectItem>
                                                    ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </FormItem>

                        </div>

                        <FormField
                            control={form.control}
                            name="detail"
                            render={({ field }) => (
                                <FormItem className="flex flex-col w-full">
                                    <FormLabel>Service Detail</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="">
                                            <SelectValue placeholder="Select service detail" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value={'Cleaning'}>{'Cleaning'}</SelectItem>
                                                <SelectItem value={'Oil_Change'}>{'Oil Change'}</SelectItem>
                                                <SelectItem value={'Tire_Replacement'}>{'Tire Replacement'}</SelectItem>
                                                <SelectItem value={'Break_Service'}>{'Break Service'}</SelectItem>
                                                <SelectItem value={'other'}>{'Other'}</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {
                                        field.value === 'other' && <Input placeholder='Enter service detail' value={detail} onChange={e => setDetail(e.target.value)} />
                                    }
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="vehicleId"
                            render={({ field }) => (
                                <FormItem className="flex flex-col w-full">
                                    <FormLabel>Service Vehicle</FormLabel>
                                    <VehicleCombobox
                                        isDisable={!!vehicleId}
                                        vehicles={vehicles}
                                        selectedId={field.value}
                                        handleSelect={(id: string) => form.setValue('vehicleId', id)}
                                    />
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
