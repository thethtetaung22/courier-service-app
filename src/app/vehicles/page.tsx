import React, { Suspense } from 'react'
import Vehicles from '@/components/component/Vehicles'

const VehiclesPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Vehicles />
        </Suspense>
    )
}

export default VehiclesPage