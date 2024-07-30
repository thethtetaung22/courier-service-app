'use client'

import React from "react";
import { ScheduleInterface } from "@/lib/interfaces";
import TablePagination from "../Pagination";
import ScheduleTableView from "./ScheduleTableView";

const ScheduleTable = ({
    total,
    schedules,
    vehicles
}: {
    total?: number;
    schedules: ScheduleInterface[];
    vehicles: any[];
}) => {
    return (
        <>
            <div>
                <div className="border-none shadow-sm rounded-lg max-h-[62vh] max-w-[90vw] overflow-auto">
                    <ScheduleTableView schedules={schedules} vehicles={vehicles} />
                </div>
            </div>
            <TablePagination total={total} />
        </>
    )
}

export default ScheduleTable