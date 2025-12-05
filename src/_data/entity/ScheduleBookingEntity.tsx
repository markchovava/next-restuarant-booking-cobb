import { LocationEntity, LocationInterface } from "./LocationEntity"
import { ScheduleEntity, ScheduleInterface } from "./ScheduleEntity"
import { TableEntity, TableInterface } from "./TableEntity"
import { UserEntity, UserInterface } from "./UserEntity"

export interface BookingInputInterface{
    name: string,
    phone: string,
    email: string,
    notes: string,
    selectedTableInput: string,
}


export const BookingInputEntity = {
    name: '',
    phone: '',
    email: '',
    notes: '',
    selectedTableInput: "",
}



export interface ScheduleBookingInterface{
    id: number | string,
    userId: number| string,
    locationId: number | string,
    tableId: number | string,
    scheduleId: number | string,
    locationName: string,
    tableName: string,
    quantity: number | string,
    taken: string | number,
    date: string,
    time: string,
    status: string,
    createdAt: string,
    updatedAt: string,
    user?: UserInterface,
    location?: LocationInterface,
    table?: TableInterface,
    schedule?: ScheduleInterface,
}


export const ScheduleBookingEntity: ScheduleBookingInterface = {
    id: "",
    userId: "",
    locationId: "",
    tableId: "",
    scheduleId: "",
    locationName: "",
    tableName: "",
    quantity: "",
    date: "",
    time: "",
    status: "",
    taken: "",
    createdAt: "",
    updatedAt: "",
    user: UserEntity,
    location: LocationEntity,
    table: TableEntity,
    schedule: ScheduleEntity,
}