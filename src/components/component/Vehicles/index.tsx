import React from "react";
import { Button } from "@/components/ui";
import { Plus } from "lucide-react";
import VehicleTable from "./VehicleTable";
import TableTemplate from "../TableTemplate";
import AddNewVehicleDialog from "./AddNewVehicleDialog";
import { Vehicle } from "@prisma/client";

const actionButtons = () => (
    <div className="flex gap-4">
        <Button className="ml-auto space-x-1 bg-[#000000] text-[#ffffff] rounded-[5px] hover:bg-[#000000]" size="sm">
            <Plus />
            <span>Add Vehicle</span>
        </Button>
    </div>
)

const Vehicles = ({
    total,
    vehicles
}: {
    total?: number,
    vehicles: Array<Vehicle>
}) => {

    return (
        <TableTemplate actionButtons={<AddNewVehicleDialog />}>
            <VehicleTable total={total} vehicles={vehicles} />
        </TableTemplate>
    )
}

export default Vehicles;
