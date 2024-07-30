import React, { Suspense } from 'react';
import Vehicles from '@/components/component/Vehicles';
import { getVehicles } from '@/actions/vehicle';

const VehiclesPage = async ({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    const vehicles = await getVehicles({ ...searchParams });

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Vehicles total={vehicles.total} vehicles={vehicles.result} />
        </Suspense>
    )
}

export default VehiclesPage;
