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
import { EllipsisVertical, Plus } from "lucide-react";
import { vehicles } from "@/lib/constants";
import { cn } from "../../../lib/utils";

const Vehicles = () => {

    return (
        <div className="flex h-full w-full flex-col gap-4">
            <div className="flex items-center pb-2">
                <h1 className="font-semibold text-lg md:text-2xl">Vehicles</h1>
                <Button className="ml-auto space-x-1 bg-[#000000] text-[#ffffff] rounded-[5px] hover:bg-[#000000]" size="sm">
                    <Plus />
                    <span>Add Vehicle</span>
                </Button>
            </div>
            <Table>
                <TableHeader className="sticky top-0 z-10 bg-white rounded-xl">
                    <TableRow className="flex py-3">
                        <TableHead className="w-[140px] h-full">ID</TableHead>
                        <TableHead className="lg:min-w-[150px] lg:text-left text-center flex-1 h-full">License No.</TableHead>
                        <TableHead className="hidden md:table-cell flex-1 h-full">Brand</TableHead>
                        <TableHead className="hidden md:table-cell flex-1 h-full">Model</TableHead>
                        <TableHead className="hidden sm:table-cell text-center flex-1 h-full">Status</TableHead>
                        <TableHead className="hidden sm:table-cell text-center flex-1 h-full">Fuel Efficiency</TableHead>
                        <TableHead className="text-right h-full">Actions</TableHead>
                    </TableRow>
                </TableHeader>
            </Table>
            <div className="border-none shadow-sm rounded-lg max-h-[69vh] overflow-auto">
                <Table>
                    <TableBody className="w-full">
                        {
                            vehicles.map((vehicle, i) => (
                                <TableRow key={i} className="flex items-center">
                                    <TableCell className="w-[140px] font-medium">{vehicle.id}</TableCell>
                                    <TableCell className="lg:min-w-[150px] lg:text-left text-center flex-1 h-full">{vehicle.licensePlate}</TableCell>
                                    <TableCell className="hidden md:table-cell flex-1 h-full">{vehicle.make}</TableCell>
                                    <TableCell className="hidden md:table-cell flex-1 h-full">{vehicle.model}</TableCell>
                                    <TableCell className="hidden sm:table-cell text-center flex-1 h-full">
                                        <span className={cn(
                                            'rounded-full px-3 text-xs py-1 bg-orange-200',
                                            vehicle.status.toLowerCase() === 'active' && 'bg-green-200'
                                        )}>{vehicle.status}</span>
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
        </div>
    )
}

export default Vehicles;
