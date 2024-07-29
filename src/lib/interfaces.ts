import { Schedule, Vehicle } from "@prisma/client";

export interface ScheduleInterface extends Schedule {
    vehicle: Vehicle
}