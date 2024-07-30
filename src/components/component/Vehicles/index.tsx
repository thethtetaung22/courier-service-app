import React from "react";
import VehicleTable from "./VehicleTable";
import TableTemplate from "../TableTemplate";
import AddNewVehicleDialog from "./AddNewVehicleDialog";
import { Vehicle } from "@prisma/client";

const Vehicles = ({
    total,
    vehicles
}: {
    total?: number,
    vehicles: Array<Vehicle>
}) => {

    return (
        <TableTemplate title="Vehicles" actionButtons={<AddNewVehicleDialog />}>
            <VehicleTable total={total} vehicles={vehicles} />
        </TableTemplate>
    )
}

export default Vehicles;
