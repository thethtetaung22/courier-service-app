import { Vehicle } from '@prisma/client';
import React from 'react'
import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui';

const ViewVehicleDetailsDialog = ({
    vehicle
}: {
    vehicle: Vehicle
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'ghost'} className="w-full p-0 px-2">
                    <span className="text-left w-full">View Details</span>
                </Button>
            </DialogTrigger>
            <DialogContent className='bg-white max-w-xl w-full p-4 space-y-4 rounded-xl max-h-[80vh] overflow-auto'>
                <DialogHeader>
                    <DialogTitle>Vehicle Details</DialogTitle>
                    <DialogDescription>Check vehicle details here.</DialogDescription>
                </DialogHeader>
                <div className='grid grid-cols-2 gap-4'>
                    <b className='w-max'>ID:</b>
                    <b className='text-blue-500'>{vehicle.id}</b>
                    <b className='w-max'>License Plate:</b>
                    <b className='text-blue-500'>{vehicle.licensePlate}</b>
                    <b className='w-max'>Color:</b>
                    <b className='text-blue-500'>{vehicle.color}</b>
                    <b className='w-max'>Brand:</b>
                    <b className='text-blue-500'>{vehicle.make}</b>
                    <b className='w-max'>Model:</b>
                    <b className='text-blue-500'>{vehicle.model}</b>
                    <b className='w-max'>Manufactured Year:</b>
                    <b className='text-blue-500'>{vehicle.year}</b>
                    <b className='w-max'>Status:</b>
                    <b className='text-blue-500'>{vehicle.status}</b>
                    <b className='w-max'>Fuel Efficiency:</b>
                    <b className='text-blue-500'>{vehicle.fuelEfficiency?.toFixed(1)}</b>
                    <b className='w-max'>Created Date:</b>
                    <b className='text-blue-500'>{new Date(vehicle.createdAt).toLocaleString()}</b>
                </div>
                <DialogFooter>
                    <DialogClose>
                        <Button>Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ViewVehicleDetailsDialog;
