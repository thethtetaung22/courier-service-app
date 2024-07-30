import React from 'react';
import VehicleDetails from '@/components/component/Vehicles/VehicleDetails';
import { getVehicleById, getVehiclesForSchedule } from '@/actions/vehicle';


interface Props {
    params: { id: string }
}

const VehicleDetailsPage = async ({ params: { id } }: Props) => {
    const result = await getVehicleById(id);
    const vehicles = await getVehiclesForSchedule();

    return (
        <>
            {
                result?.vehicle && <VehicleDetails vehicles={vehicles.result} vehicle={result?.vehicle} />
            }
        </>
    )
}

export default VehicleDetailsPage