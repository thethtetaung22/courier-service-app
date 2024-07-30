import React from 'react'
import { VehicleInterface } from '@/lib/interfaces'
import ScheduleTableView from '../Maintenance/ScheduleTableView'

const VehicleDetails = ({
    vehicles,
    vehicle
}: {
    vehicles: any[];
    vehicle: VehicleInterface;
}) => {
    return (
        <div className="flex h-full w-full flex-col gap-4 overflow-x-hidden">
            <div className="flex flex-col justify-between py-4 gap-4">
                <h1 className="font-semibold text-lg md:text-2xl">Vehicle: {vehicle.licensePlate}</h1>
                <div className='grid grid-cols-2 gap-2 border p-2'>

                    <div className='flex gap-2'>
                        <b className='w-max'>ID:</b>
                        <b className='text-blue-500'>{vehicle.id}</b>
                    </div>

                    <div className='flex gap-2'>
                        <b className='w-max'>Color:</b>
                        <b className='text-blue-500'>{vehicle.color}</b>
                    </div>

                    <div className='flex gap-2'>
                        <b className='w-max'>Brand:</b>
                        <b className='text-blue-500'>{vehicle.make}</b>
                    </div>

                    <div className='flex gap-2'>
                        <b className='w-max'>Model:</b>
                        <b className='text-blue-500'>{vehicle.model}</b>
                    </div>

                    <div className='flex gap-2'>
                        <b className='w-max'>Manufactured Year:</b>
                        <b className='text-blue-500'>{vehicle.year}</b>
                    </div>

                    <div className='flex gap-2'>
                        <b className='w-max'>Status:</b>
                        <b className='text-blue-500'>{vehicle.status}</b>
                    </div>

                    <div className='flex gap-2'>
                        <b className='w-max'>Fuel Efficiency:</b>
                        <b className='text-blue-500'>{vehicle.fuelEfficiency?.toFixed(1)}</b>
                    </div>

                    <div className='flex gap-2'>
                        <b className='w-max'>Created Date:</b>
                        <b className='text-blue-500'>{new Date(vehicle.createdAt).toLocaleString()}</b>
                    </div>
                </div>

                <h1 className="font-semibold text-lg md:text-2xl mt-4">Maintenance:</h1>
                {
                    vehicle?.schedules?.length > 0 ? (
                        <ScheduleTableView
                            vehicles={vehicles}
                            schedules={vehicle?.schedules?.map(schedule => ({ ...schedule, vehicle: { licensePlate: vehicle.licensePlate, make: vehicle.make } }))}
                        />
                    ) : (
                        <div className='flex h-[200px] justify-center items-center'>
                            <span>No Maintenance!</span>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default VehicleDetails