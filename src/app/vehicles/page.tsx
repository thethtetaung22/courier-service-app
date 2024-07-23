import React, { Suspense } from 'react'
import Vehicles from '@/components/component/Vehicles'

const VehiclesPage = ({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Vehicles />
        </Suspense>
    )
}

export default VehiclesPage