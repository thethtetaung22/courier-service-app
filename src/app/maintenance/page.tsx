import React, { Suspense } from 'react'
import Schedules from '@/components/component/Maintenance';
import { getVehiclesForSchedule } from '@/actions/vehicle';
import { getSchedules } from '@/actions/schedule';

const MaintenancePage = async ({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    const vehicles = await getVehiclesForSchedule();
    const schedules = await getSchedules({ ...searchParams }) as any;

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Schedules vehicles={vehicles?.result} schedules={schedules?.result} total={schedules?.total} />
        </Suspense>
    )
}

export default MaintenancePage;
