import React from 'react'
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Input
} from '@/components/ui';
import {
    ActivityIcon,
    FilterIcon,
    FuelIcon,
    TruckIcon,
    WrenchIcon
} from 'lucide-react';
import VehicleBarChart from './components/Barchart';
import DonutChart from './components/DonutChart';

const Dashboard = () => {
    return (
        <main className="flex-1 flex flex-col gap-6 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 h-max">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
                        <TruckIcon className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{'6'}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Active Vehicles</CardTitle>
                        <ActivityIcon className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{'4'}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Maintenance Required</CardTitle>
                        <WrenchIcon className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{'2'}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Fuel Efficiency</CardTitle>
                        <FuelIcon className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{'27.0'} MPG</div>
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-max">
                <VehicleBarChart />
                <DonutChart />
            </div>
        </main>
    )
}

export default Dashboard;
