import React, { Suspense } from 'react'
import Schedules from '@/components/component/Schedules';
import { getVehiclesForSchedule } from '../../actions/vehicle';

const SchedulesPage = async ({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    const vehicles = await getVehiclesForSchedule();
    
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Schedules vehicles={vehicles.result}/>
        </Suspense>
    )
}

export default SchedulesPage;
