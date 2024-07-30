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
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui";
import { ArrowDownNarrowWide, ArrowDownUp, ArrowUpWideNarrow, EllipsisVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import AddNewVehicleDialog from "./AddNewVehicleDialog";
import { Vehicle } from "@prisma/client";
import DeleteVehicleButton from "./DeleteVehicleButton";
import ViewVehicleDetailsDialog from "./ViewVehicleDetailsDialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const VehicleTable = ({
    total,
    vehicles
}: {
    total?: number,
    vehicles: Array<Vehicle>
}) => {
    const [data, setData] = useState(vehicles);
    const [sortBy, setSortBy] = useState<string | null>(null);
    const [order, setOrder] = useState<string | null>('asc');

    const handleSort = (name: string) => {
        setSortBy(name);
        setData([...data.sort((a: Record<string, any>, b: Record<string, any>) => {
            if (a[name] < b[name]) {
                return order === 'asc' ? 1 : -1;
            }
            if (a[name] > b[name]) {
                return order === 'asc' ? -1 : 1;
            }
            return 0;
        })]);

        setOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    }

    useEffect(() => {
        setData(vehicles);
    }, [vehicles]);

    return (
        <>
            <div>
                <div className="border-none shadow-sm rounded-lg max-h-[68vh] overflow-auto">
                    <Table>
                        <TableHeader className="sticky top-0 z-10 bg-white rounded-xl">
                            <TableRow className="flex items-center py-3">
                                <TableHead className="w-[160px] lg:w-[300px] flex h-full items-center">
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
                                <TableHead className="lg:min-w-[150px] lg:text-left text-center flex-1 h-full flex items-center">
                                    <span>License No.</span>
                                    <Button variant={'ghost'} className="px-2" onClick={() => handleSort('licensePlate')}>
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
                                <TableHead className="hidden flex-1 h-full md:flex items-center">
                                    <span>Brand</span>
                                    <Button variant={'ghost'} className="px-2" onClick={() => handleSort('make')}>
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
                                <TableHead className="hidden flex-1 h-full md:flex items-center">
                                    <span>Model</span>
                                    <Button variant={'ghost'} className="px-2" onClick={() => handleSort('model')}>
                                        {
                                            sortBy === 'model' ? order === 'asc' ? (
                                                < ArrowDownNarrowWide size={17} className="text-black p-0" />
                                            ) : (
                                                <ArrowUpWideNarrow size={17} className="text-black p-0" />
                                            ) : (
                                                < ArrowDownNarrowWide size={17} className="text-black p-0" />
                                            )
                                        }
                                    </Button>
                                </TableHead>
                                <TableHead className="hidden flex-1 h-full md:flex items-center">
                                    <span>Year</span>
                                    <Button variant={'ghost'} className="px-2" onClick={() => handleSort('year')}>
                                        {
                                            sortBy === 'year' ? order === 'asc' ? (
                                                < ArrowDownNarrowWide size={17} className="text-black p-0" />
                                            ) : (
                                                <ArrowUpWideNarrow size={17} className="text-black p-0" />
                                            ) : (
                                                < ArrowDownNarrowWide size={17} className="text-black p-0" />
                                            )
                                        }
                                    </Button>
                                </TableHead>
                                <TableHead className="hidden md:flex text-center flex-1 h-full items-center justify-center">
                                    <span>Status</span>
                                    <Button variant={'ghost'} className="px-2" onClick={() => handleSort('status')}>
                                        {
                                            sortBy === 'status' ? order === 'asc' ? (
                                                < ArrowDownNarrowWide size={17} className="text-black p-0" />
                                            ) : (
                                                <ArrowUpWideNarrow size={17} className="text-black p-0" />
                                            ) : (
                                                < ArrowDownNarrowWide size={17} className="text-black p-0" />
                                            )
                                        }
                                    </Button>
                                </TableHead>
                                <TableHead className="hidden text-center flex-1 h-full md:flex items-center">
                                    <span>Fuel Efficiency</span>
                                    <Button variant={'ghost'} className="px-2" onClick={() => handleSort('fuelEfficiency')}>
                                        {
                                            sortBy === 'fuelEfficiency' ? order === 'asc' ? (
                                                < ArrowDownNarrowWide size={17} className="text-black p-0" />
                                            ) : (
                                                <ArrowUpWideNarrow size={17} className="text-black p-0" />
                                            ) : (
                                                < ArrowDownNarrowWide size={17} className="text-black p-0" />
                                            )
                                        }
                                    </Button>
                                </TableHead>
                                <TableHead className="text-right h-full">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="w-full">
                            {
                                data?.map((vehicle, i) => (
                                    <TableRow key={i} className={cn(
                                        "flex items-center hover:bg-gray-200 cursor-pointer",
                                        i % 2 === 0 && 'bg-sky-100'
                                    )}>
                                        <TableCell className="w-[160px] lg:w-[300px] font-medium flex overflow-hidden text-ellipsis flex-nowrap whitespace-nowrap text-nowrap">{vehicle.id}</TableCell>
                                        <TableCell className="lg:min-w-[150px] lg:text-left text-center flex-1 h-full">{vehicle.licensePlate}</TableCell>
                                        <TableCell className="hidden md:table-cell flex-1 h-full">{vehicle.make}</TableCell>
                                        <TableCell className="hidden md:table-cell flex-1 h-full">{vehicle.model}</TableCell>
                                        <TableCell className="hidden md:table-cell flex-1 h-full">{vehicle.year?.toString()}</TableCell>
                                        <TableCell className="hidden sm:table-cell text-center flex-1 h-full">
                                            <span className={cn(
                                                'rounded-full px-3 text-xs py-1 bg-orange-200',
                                                vehicle.status.toLowerCase() === 'active' && 'bg-green-200'
                                            )}>{vehicle.status.replace('_', ' ')}</span>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell text-center flex-1 h-full">
                                            {vehicle.fuelEfficiency}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild className="p-0">

                                                    <Button variant="ghost" size="icon" className="p-0">
                                                        <EllipsisVertical />
                                                        <span className="sr-only">Actions</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-[#ffffff] border-gray-300 shadow-xl">

                                                    <DropdownMenuItem className="hover:bg-[#bbb]" asChild>
                                                        <ViewVehicleDetailsDialog vehicle={vehicle} />
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem asChild>
                                                        <AddNewVehicleDialog
                                                            isEdit={true}
                                                            vehicle={vehicle}
                                                            trigger={
                                                                <Button variant={'ghost'} className="w-full p-0 px-2">
                                                                    <span className="text-left w-full">Edit</span>
                                                                </Button>
                                                            }
                                                        />
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem>
                                                        <DeleteVehicleButton id={vehicle.id} />
                                                    </DropdownMenuItem>
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
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationLink href="#">10</PaginationLink>

                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    )
}

export default VehicleTable;
