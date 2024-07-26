import React from "react";
import { Button } from "@/components/ui";
import { Plus } from "lucide-react";
import ScheduleTable from "./ScheduleTable";
import TableTemplate from "../TableTemplate";
import AddNewScheduleDialog from "./AddNewScheduleDialog";


const actionButtons = () => (
    <div className="flex gap-4">
        <Button className="ml-auto space-x-1 bg-[#000000] text-[#ffffff] rounded-[5px] hover:bg-[#000000]" size="sm">
            <Plus />
            <span>Add Schedule</span>
        </Button>
    </div>
)


const Schedules = () => {

    return (
        <TableTemplate title="Schedules" actionButtons={<AddNewScheduleDialog />}>
            <ScheduleTable />
        </TableTemplate>
    )
}

export default Schedules;
