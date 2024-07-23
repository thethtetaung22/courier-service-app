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
import { schedules } from "@/lib/constants";
import { cn } from "../../../lib/utils";

const ScheduleTable = () => {
    return (
        <>
            <div>
                <Table>
                    <TableHeader className="sticky top-0 z-10 bg-white rounded-xl">
                        <TableRow className="flex py-3">
                            <TableHead className="w-[140px] h-full">ID</TableHead>
                            <TableHead className="w-[140px] font-medium h-full">Vehicle ID</TableHead>
                            <TableHead className="lg:min-w-[150px] lg:text-left text-center flex-1 h-full">Vehicle No.</TableHead>
                            <TableHead className="hidden md:table-cell flex-1 h-full">Last Service</TableHead>
                            <TableHead className="hidden md:table-cell flex-1 h-full">Next Service</TableHead>
                            <TableHead className="hidden sm:table-cell flex-1 h-full">Maintenance Type</TableHead>
                            <TableHead className="text-right h-full">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
                <div className="border-none shadow-sm rounded-lg max-h-[68vh] overflow-auto">
                    <Table>
                        <TableBody className="w-full">
                            {
                                schedules.map((schedule, i) => (
                                    <TableRow key={i} className={cn(
                                        "flex items-center hover:bg-gray-200",
                                        i % 2 === 0 && 'bg-sky-100'
                                    )}>
                                        <TableCell className="w-[140px] font-medium h-full">{schedule.id}</TableCell>
                                        <TableCell className="w-[140px] font-medium h-full">{schedule.vehicleId}</TableCell>
                                        <TableCell className="hidden md:table-cell flex-1 h-full">{schedule.vehicle.licensePlate}</TableCell>
                                        <TableCell className="hidden md:table-cell flex-1 h-full">{schedule.lastService.toLocaleDateString()}</TableCell>
                                        <TableCell className="hidden md:table-cell flex-1 h-full">{schedule.nextService.toLocaleDateString()}</TableCell>
                                        <TableCell className="hidden md:table-cell flex-1 h-full">{schedule.type}</TableCell>
                                        <TableCell className="text-right">
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