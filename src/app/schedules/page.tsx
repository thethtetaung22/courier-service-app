import React, { Suspense } from 'react'
import Schedules from '@/components/component/Schedules';

const SchedulesPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Schedules />
        </Suspense>
    )
}

export default SchedulesPage;
