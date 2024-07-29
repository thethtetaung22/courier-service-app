import React from "react";
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
import { EllipsisVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScheduleInterface } from "@/lib/interfaces";
import { format } from "date-fns";

const ScheduleTable = ({
    total,
    schedules
}: {
    total?: number;
    schedules: ScheduleInterface[];
}) => {

    return (
        <>
            <div>
                <div className="border-none shadow-sm rounded-lg max-h-[68vh] max-w-[90vw] overflow-auto">
                    <Table>
                        <TableHeader className="sticky top-0 z-10 bg-white rounded-xl">
                            <TableRow className="flex py-3">
                                <TableHead className="hidden md:table-cell w-[140px] lg:w-max lg:min-w-[160px] h-full flex-1">ID</TableHead>
                                <TableHead className="hidden md:table-cell w-[140px] lg:w-max lg:min-w-[160px] font-medium h-full flex-1">Vehicle ID</TableHead>
                                <TableHead className="lg:min-w-[150px] lg:text-left text-center flex-1 h-full">Vehicle No.</TableHead>
                                <TableHead className="lg:min-w-[150px] lg:text-left text-center flex-1 h-full">Vehicle Brand</TableHead>
                                <TableHead className="flex-1 h-full">Service Date</TableHead>
                                <TableHead className="hidden sm:table-cell flex-1 h-full">Maintenance Type</TableHead>
                                <TableHead className="text-center h-full w-[40px] lg:w-auto">
                                    <span className="hidden md:flex">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="w-full">
                            {
                                schedules?.map((schedule, i) => (
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

export default ScheduleTable