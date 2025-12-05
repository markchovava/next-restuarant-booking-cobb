import { LocationEntity, LocationInterface } from "./LocationEntity"
import { ScheduleBookingInterface } from "./ScheduleBookingEntity"
import { UserEntity, UserInterface } from "./UserEntity"


export interface ScheduleInterface{
    id: number | string,
    userId: number | string,
    locationId: number | string,
    locationName: string,
    guests: string | number,
    status: string,
    date: string,
    time: string,
    description: string,
    tablesTotal: number | string,
    tablesTaken: number | string,
    createdAt: string,
    updatedAt: string
    user?: UserInterface,
    location?: LocationInterface,
    scheduleBookings?: ScheduleBookingInterface[] 
}


export const ScheduleEntity: ScheduleInterface = {
    id: "",
    userId: "",
    locationId: "",
    locationName: "",
    status: "",
    date: "",
    time: "",
    guests: "",
    description: "",
    tablesTotal: "",
    tablesTaken: "",
    createdAt: "",
    updatedAt: "",
    user: UserEntity,
    location: LocationEntity,
    scheduleBookings: []

}