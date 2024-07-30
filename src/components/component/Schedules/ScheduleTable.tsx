'use client'

import React, { useEffect, useState } from "react";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui";
import { ArrowDownNarrowWide, ArrowUpWideNarrow, EllipsisVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScheduleInterface } from "@/lib/interfaces";
import { format } from "date-fns";
import TablePagination from "../Pagination";

const ScheduleTable = ({
    total,
    schedules
}: {
    total?: number;
    schedules: ScheduleInterface[];
}) => {
    const [data, setData] = useState(schedules);
    const [sortBy, setSortBy] = useState<string | null>(null);
    const [order, setOrder] = useState<string | null>('asc');

    const handleSort = (name: string, isVehicle = false) => {
        setSortBy(name);
        setData([...data.sort((a: Record<string, any>, b: Record<string, any>) => {
            if (isVehicle ? a.vehicle?.[name] < b.vehicle?.[name] : a[name] < b[name]) {
                return order === 'asc' ? 1 : -1;
            }
            if (isVehicle ? a.vehicle?.[name] > b.vehicle?.[name] : a[name] > b[name]) {
                return order === 'asc' ? -1 : 1;
            }
            return 0;
        })]);

        setOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    }

    useEffect(() => {
        setData(schedules);
    }, [schedules]);

    return (
        <>
            <div>
                <div className="border-none shadow-sm rounded-lg max-h-[68vh] max-w-[90vw] overflow-auto">
                    <Table>
                        <TableHeader className="sticky top-0 z-10 bg-white rounded-xl">
                            <TableRow className="flex py-3 items-center">
                                <TableHead className="w-[140px] lg:w-max lg:min-w-[160px] h-full flex-1 flex items-center">
                                    <span>ID</span>
                                    <Button variant={'ghost'} className="px-2" onClick={() => handleSort('id')}>
                                        {
                                            sortBy === 'id' ? order === 'asc' ? (
                                                < ArrowDownNarrowWide size={17} className="text-black p-0" />
                                            ) : (
                                                <ArrowUpWideNarrow size={17} className="text-black p-0" />
                                            ) : (
                                                < ArrowDownNarrowWide size={17} className="text-black p-0" />
                                            )
                                        }
                                    </Button>
                                </TableHead>
                                <TableHead className="hidden md:flex items-center w-[140px] lg:w-max lg:min-w-[160px] font-medium h-full flex-1">
                                    <span>Vehicle ID</span>
                                    <Button variant={'ghost'} className="px-2" onClick={() => handleSort('vehicleId')}>
                                        {
                                            sortBy === 'vehicleId' ? order === 'asc' ? (
                                                < ArrowDownNarrowWide size={17} className="text-black p-0" />
                                            ) : (
                                                <ArrowUpWideNarrow size={17} className="text-black p-0" />
                                            ) : (
                                                < ArrowDownNarrowWide size={17} className="text-black p-0" />
                                            )
                                        }
                                    </Button>
                                </TableHead>
                                <TableHead className="lg:min-w-[150px] lg:text-left  flex items-center flex-1 h-full">
                                    <span>Vehicle No.</span>
                                    <Button variant={'ghost'} className="px-2" onClick={() => handleSort('licensePlate', true)}>
                                        {
                                            sortBy === 'licensePlate' ? order === 'asc' ? (
                                                < ArrowDownNarrowWide size={17} className="text-black p-0" />
                                            ) : (
                                                <ArrowUpWideNarrow size={17} className="text-black p-0" />
                                            ) : (
                                                < ArrowDownNarrowWide size={17} className="text-black p-0" />
                                            )
                                        }
                                    </Button>
                                </TableHead>
                                <TableHead className="lg:min-w-[150px] lg:text-left flex items-center flex-1 h-full">
                                    <span>Vehicle Brand</span>
                                    <Button variant={'ghost'} className="px-2" onClick={() => handleSort('make', true)}>
                                        {
                                            sortBy === 'make' ? order === 'asc' ? (
                                                < ArrowDownNarrowWide size={17} className="text-black p-0" />
                                            ) : (
                                                <ArrowUpWideNarrow size={17} className="text-black p-0" />
                                            ) : (
                                                < ArrowDownNarrowWide size={17} className="text-black p-0" />
                                            )
                                        }
                                    </Button>
                                </TableHead>
                                <TableHead className="flex-1 h-full flex items-center">
                                    <span>Service Date</span>
                                    <Button variant={'ghost'} className="px-2" onClick={() => handleSort('serviceDate')}>
                                        {
                                            sortBy === 'serviceDate' ? order === 'asc' ? (
                                                < ArrowDownNarrowWide size={17} className="text-black p-0" />
                                            ) : (
                                                <ArrowUpWideNarrow size={17} className="text-black p-0" />
                                            ) : (
                                                < ArrowDownNarrowWide size={17} className="text-black p-0" />
                                            )
                                        }
                                    </Button>
                                </TableHead>
                                <TableHead className="hidden sm:flex items-center flex-1 h-full">
                                    <span>Maintenance Type</span>
                                    <Button variant={'ghost'} className="px-2" onClick={() => handleSort('detail')}>
                                        {
                                            sortBy === 'detail' ? order === 'asc' ? (
                                                < ArrowDownNarrowWide size={17} className="text-black p-0" />
                                            ) : (
                                                <ArrowUpWideNarrow size={17} className="text-black p-0" />
                                            ) : (
                                                < ArrowDownNarrowWide size={17} className="text-black p-0" />
                                            )
                                        }
                                    </Button>
                                </TableHead>
                                <TableHead className="h-full w-[40px] lg:w-auto hidden md:flex items-center">
                                    <span className="">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="w-full">
                            {
                                data?.map((schedule, i) => (
                                    <TableRow key={i} className={cn(
                                        "flex items-center hover:bg-gray-200",
                                        i % 2 === 0 && 'bg-sky-100'
                                    )}>
                                        <TableCell className="hidden md:table-cell w-[140px] font-medium lg:w-max lg:min-w-[160px] h-full flex-1 overflow-hidden text-ellipsis flex-nowrap whitespace-nowrap text-nowrap">{schedule.id}</TableCell>
                                        <TableCell className="hidden md:table-cell w-[140px] font-medium lg:w-max lg:min-w-[160px] h-full flex-1 overflow-hidden text-ellipsis flex-nowrap whitespace-nowrap text-nowrap">{schedule?.vehicleId}</TableCell>
                                        <TableCell className="flex-1 h-full">{schedule?.vehicle?.licensePlate}</TableCell>
                                        <TableCell className="flex-1 h-full">{schedule?.vehicle?.make}</TableCell>
                                        <TableCell className="flex-1 h-full w-max">{format(schedule.serviceDate, 'PPpp')}</TableCell>
                                        <TableCell className="hidden md:table-cell flex-1 h-full">{schedule.detail?.replace('_', ' ')}</TableCell>
                                        <TableCell className="text-center w-[40px] lg:w-auto">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild className="p-0">
                                                    <Button variant="ghost" size="icon" className="p-0">
                                                        <EllipsisVertical />
                                                        <span className="sr-only">Actions</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-[#ffffff] border-gray-300 shadow-xl">
                                                    <DropdownMenuItem className="hover:bg-[#bbb]">View Details</DropdownMenuItem>
                                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
            <TablePagination total={total} />
        </>
    )
}

export default ScheduleTable