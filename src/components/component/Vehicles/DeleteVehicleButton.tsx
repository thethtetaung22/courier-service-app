'use client'

import React from 'react'
import { deleteVehicle } from '@/actions/vehicle'
import { useToast } from '../../ui/use-toast'

const DeleteVehicleButton = ({
    id
}: {
    id: string
}) => {
    const { toast } = useToast();

    const handleDelete = async () => {
        const result = await deleteVehicle(id);
        const message = result?.success ? 'Vehicle deleted successful.' : 'Failed to delete vehicle.';
        toast({
            title: message,
            style: {
                background: result?.success ? 'green' : 'red',
                color: 'white'
            }
        });
    }

    return (
        <div onClick={handleDelete} className="w-full py-1 cursor-pointer">
            <span className="text-left w-full text-red-600">Delete</span>
        </div>
    )
}

export default DeleteVehicleButton